import React, { useEffect, useRef, useState } from "react";

export interface GradientBlindsProps {
  /** First gradient accent color. Hex string (e.g. '#F97316') */
  color1?: string;
  /** Second gradient accent color. Hex string (e.g. '#534109') */
  color2?: string;
  /** Deepest backdrop color. Hex string (e.g. '#050608') */
  colorBackdrop?: string;
  /** Angle of the blinds in degrees. Default 35 */
  angle?: number;
  /** Number of blinds / slats across the canvas. Default 16 */
  blindCount?: number;
  /** Animation speed of the blinds & wave flow. Default 0.6 */
  speed?: number;
  /** Intensity of the noise/grain texture. Default 0.12 */
  noise?: number;
  /** Intensity of the spotlight effect. Default 1.2 */
  spotlightIntensity?: number;
  /** Whether the spotlight follows the user's cursor. Default true */
  interactive?: boolean;
  /** Additional container classes */
  className?: string;
  /** Style object */
  style?: React.CSSProperties;
}

function hexToRGB(hex: string): [number, number, number] {
  let cleaned = hex.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const intVal = parseInt(cleaned, 16);
  if (isNaN(intVal)) return [0.97, 0.45, 0.08]; // default orange
  return [
    ((intVal >> 16) & 255) / 255,
    ((intVal >> 8) & 255) / 255,
    (intVal & 255) / 255,
  ];
}

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = (position + 1.0) * 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_speed;
uniform float u_angle;
uniform float u_blind_count;
uniform float u_noise;
uniform float u_spotlight_intensity;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color_backdrop;

// Fast pseudorandom hash
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  vec2 uv = (vUv - 0.5) * aspect;

  float rad = radians(u_angle);
  mat2 rot = mat2(cos(rad), -sin(rad), sin(rad), cos(rad));
  vec2 rotUv = rot * uv;

  float t = u_time * u_speed;

  // Blinds coordinate calculation
  float stripPos = rotUv.y * u_blind_count;
  float stripFrac = fract(stripPos);
  float stripIdx = floor(stripPos);

  // Dynamic oscillation phase per blind slat
  float slatPhase = sin(t * 0.8 + stripIdx * 0.4 + rotUv.x * 2.0);
  float louverTilt = sin(t * 0.6 + stripIdx * 0.25) * 0.4 + 0.6;

  // Slat shading curve (3D louver depth with beveled crease)
  float slatProfile = smoothstep(0.0, 0.15, stripFrac) * (1.0 - smoothstep(0.85, 1.0, stripFrac));
  float slatShine = pow(stripFrac, 2.2) * louverTilt;
  float slatCrease = 1.0 - smoothstep(0.0, 0.1, stripFrac) * 0.5;

  // Base multi-stop gradient (from dark backdrop to color2 to vibrant color1)
  float gradY = clamp(vUv.y * 1.1 - vUv.x * 0.2 + slatPhase * 0.1, 0.0, 1.0);
  vec3 baseGradient = mix(u_color_backdrop, u_color2, smoothstep(0.0, 0.55, gradY));
  baseGradient = mix(baseGradient, u_color1, smoothstep(0.4, 0.95, gradY));

  // Interactive spotlight following cursor
  vec2 mDiff = (vUv - u_mouse) * aspect;
  float mDist = length(mDiff);
  float spot = exp(-mDist * 2.6) * u_spotlight_intensity;
  float ambientGlow = exp(-length(uv) * 1.5) * 0.4;

  // Combine colors with blinds 3D curvature and spotlight highlights
  vec3 color = baseGradient;
  
  // Apply blinds specular luster
  color = mix(color * 0.55, color * 1.45, slatShine);
  color += u_color1 * (slatProfile * 0.3 * (spot + ambientGlow));
  color += u_color2 * (slatShine * 0.4);

  // Spotlight illumination on slats
  color += (u_color1 * 0.8 + vec3(0.2)) * spot * slatProfile;

  // Slat edge crease shadow
  color *= slatCrease;

  // Micro grain / noise to eliminate color banding
  float n = (hash(vUv * 500.0 + fract(u_time * 0.1)) - 0.5) * u_noise;
  color += vec3(n);

  // Soft edge vignette for typography legibility
  float vignette = 1.0 - smoothstep(0.4, 1.4, length(vUv - 0.5) * 1.3);
  color *= (0.75 + 0.25 * vignette);

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

export const GradientBlinds: React.FC<GradientBlindsProps> = ({
  color1 = "#F97316",
  color2 = "#534109",
  colorBackdrop = "#050608",
  angle = 35,
  blindCount = 16,
  speed = 0.6,
  noise = 0.08,
  spotlightIntensity = 1.2,
  interactive = true,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const currentMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
      }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      setHasWebGL(false);
      return;
    }

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      setHasWebGL(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setHasWebGL(false);
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uSpeedLoc = gl.getUniformLocation(program, "u_speed");
    const uAngleLoc = gl.getUniformLocation(program, "u_angle");
    const uBlindCountLoc = gl.getUniformLocation(program, "u_blind_count");
    const uNoiseLoc = gl.getUniformLocation(program, "u_noise");
    const uSpotlightIntensityLoc = gl.getUniformLocation(program, "u_spotlight_intensity");
    const uColor1Loc = gl.getUniformLocation(program, "u_color1");
    const uColor2Loc = gl.getUniformLocation(program, "u_color2");
    const uColorBackdropLoc = gl.getUniformLocation(program, "u_color_backdrop");

    const c1 = hexToRGB(color1);
    const c2 = hexToRGB(color2);
    const cBackdrop = hexToRGB(colorBackdrop);

    gl.uniform3f(uColor1Loc, c1[0], c1[1], c1[2]);
    gl.uniform3f(uColor2Loc, c2[0], c2[1], c2[2]);
    gl.uniform3f(uColorBackdropLoc, cBackdrop[0], cBackdrop[1], cBackdrop[2]);

    gl.uniform1f(uSpeedLoc, prefersReducedMotion ? 0.05 : speed);
    gl.uniform1f(uAngleLoc, angle);
    gl.uniform1f(uBlindCountLoc, blindCount);
    gl.uniform1f(uNoiseLoc, noise);
    gl.uniform1f(uSpotlightIntensityLoc, spotlightIntensity);

    let animationFrameId: number;
    let isVisible = true;
    const startTime = performance.now();

    const handleResize = () => {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse.current = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const render = (time: number) => {
      if (isVisible) {
        currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
        currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

        const elapsedTime = (time - startTime) * 0.001;
        gl.uniform1f(uTimeLoc, elapsedTime);
        gl.uniform2f(uMouseLoc, currentMouse.current.x, currentMouse.current.y);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (program) gl.deleteProgram(program);
    };
  }, [
    color1,
    color2,
    colorBackdrop,
    angle,
    blindCount,
    speed,
    noise,
    spotlightIntensity,
    interactive,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        backgroundColor: colorBackdrop,
        ...style,
      }}
      aria-hidden="true"
    >
      {hasWebGL ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${angle}deg, ${color2} 0%, ${color1} 60%, ${colorBackdrop} 100%)`,
          }}
        />
      )}
    </div>
  );
};

export default GradientBlinds;
