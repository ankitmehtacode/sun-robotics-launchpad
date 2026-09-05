export type FrameSource = ImageBitmap | HTMLImageElement;

export function frameWidth(src: FrameSource): number {
  return "naturalWidth" in src ? src.naturalWidth : src.width;
}

export function frameHeight(src: FrameSource): number {
  return "naturalHeight" in src ? src.naturalHeight : src.height;
}

/** Fetch + decode a single frame with a per-frame timeout so a silently
 *  hanging connection can never block the entire load pipeline.  */
async function decodeFrame(url: string, signal?: AbortSignal): Promise<FrameSource> {
  // Per-frame timeout — if a single image takes longer than 10 s it's
  // almost certainly a stalled TCP connection, not real latency.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  // Honour both the caller's signal AND our per-frame timeout.
  const onCallerAbort = () => controller.abort();
  signal?.addEventListener("abort", onCallerAbort, { once: true });

  try {
    const res = await fetch(url, { signal: controller.signal });
    const blob = await res.blob();
    if (typeof createImageBitmap === "function") {
      return createImageBitmap(blob);
    }
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    await img.decode();
    return img;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", onCallerAbort);
  }
}

interface LoadFrameSequenceOptions {
  basePath: string;
  filenames: string[];
  target: FrameSource[];
  onSparseReady: () => void;
  onFrameLoaded?: (index: number, loadedCount: number, total: number) => void;
  signal?: AbortSignal;
}

/**
 * Loads frames in two phases:
 *   1. **Sparse pass** — every 3rd frame, loaded in small batches (not all at
 *      once) to avoid saturating the browser's per-origin connection pool
 *      (typically 6 connections). As soon as this pass finishes, `onSparseReady`
 *      fires so the UI can become interactive.
 *   2. **Backfill pass** — remaining frames in small batches.
 *
 * Each individual frame fetch has a 10 s timeout so a single stalled TCP
 * connection can never block the whole pipeline.
 */
export async function loadFrameSequence({
  basePath,
  filenames,
  target,
  onSparseReady,
  onFrameLoaded,
  signal,
}: LoadFrameSequenceOptions): Promise<void> {
  let loadedCount = 0;

  const loadOne = async (i: number) => {
    if (signal?.aborted) return;
    try {
      target[i] = await decodeFrame(`${basePath}/${filenames[i]}`, signal);
      loadedCount++;
      onFrameLoaded?.(i, loadedCount, filenames.length);
    } catch {
      // Skip individual frame failures — the draw loop falls back to the
      // nearest already-loaded neighbor via nearestLoadedIndex.
    }
  };

  /** Load a list of indices in sequential batches of `size`. */
  const loadBatched = async (indices: number[], size: number) => {
    for (let i = 0; i < indices.length; i += size) {
      if (signal?.aborted) return;
      await Promise.all(indices.slice(i, i + size).map(loadOne));
    }
  };

  const allIndices = filenames.map((_, i) => i);
  const sparseIndices = allIndices.filter((i) => i % 3 === 0);
  const restIndices = allIndices.filter((i) => i % 3 !== 0);

  // Phase 1 — sparse frames in batches of 6 (matches typical browser
  // connection limit).  The old code fired all ~32 at once which
  // exhausted connection slots and caused silent hangs.
  await loadBatched(sparseIndices, 6);
  if (!signal?.aborted) onSparseReady();

  // Phase 2 — backfill the rest
  await loadBatched(restIndices, 6);
}

export function nearestLoadedIndex(frames: FrameSource[], target: number): number {
  if (frames[target]) return target;
  for (let d = 1; d < frames.length; d++) {
    if (frames[target - d]) return target - d;
    if (frames[target + d]) return target + d;
  }
  return target;
}
