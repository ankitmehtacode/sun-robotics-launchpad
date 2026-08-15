export type FrameSource = ImageBitmap | HTMLImageElement;

export function frameWidth(src: FrameSource): number {
  return "naturalWidth" in src ? src.naturalWidth : src.width;
}

export function frameHeight(src: FrameSource): number {
  return "naturalHeight" in src ? src.naturalHeight : src.height;
}

async function decodeFrame(url: string, signal?: AbortSignal): Promise<FrameSource> {
  const res = await fetch(url, { signal });
  const blob = await res.blob();
  if (typeof createImageBitmap === "function") {
    return createImageBitmap(blob);
  }
  const img = new Image();
  img.src = URL.createObjectURL(blob);
  await img.decode();
  return img;
}

interface LoadFrameSequenceOptions {
  basePath: string;
  filenames: string[];
  target: FrameSource[];
  onSparseReady: () => void;
  onFrameLoaded?: (index: number, loadedCount: number, total: number) => void;
  signal?: AbortSignal;
}

// Loads every 3rd frame first so scrubbing is interactive almost immediately,
// then backfills the rest in small parallel batches. Writes directly into
// `target` (in place) so callers reading it mid-load always see the latest
// state without waiting for the whole sequence to finish.
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

  const allIndices = filenames.map((_, i) => i);
  const sparseIndices = allIndices.filter((i) => i % 3 === 0);
  const restIndices = allIndices.filter((i) => i % 3 !== 0);

  await Promise.all(sparseIndices.map(loadOne));
  if (!signal?.aborted) onSparseReady();

  const batchSize = 6;
  for (let i = 0; i < restIndices.length; i += batchSize) {
    if (signal?.aborted) return;
    await Promise.all(restIndices.slice(i, i + batchSize).map(loadOne));
  }
}

export function nearestLoadedIndex(frames: FrameSource[], target: number): number {
  if (frames[target]) return target;
  for (let d = 1; d < frames.length; d++) {
    if (frames[target - d]) return target - d;
    if (frames[target + d]) return target + d;
  }
  return target;
}

export function formatTimecode(frameIndex: number, fps: number): string {
  const totalFrames = Math.max(0, frameIndex);
  const ff = totalFrames % fps;
  const totalSeconds = Math.floor(totalFrames / fps);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}
