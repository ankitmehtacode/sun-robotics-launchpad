import React, { useEffect, useRef, useState } from "react";

export interface MoltenMetalProps {
  /** Speed of the molten flow animation. Default 0.6 */
  speed?: number;
  /** Intensity of fluid warp distortion. Default 1.2 */
  distortion?: number;
  /** Scale/density of the caustic filaments. Default 2.5 */
  density?: number;
  /** Strength of the glowing caustic filament lines. Default 1.6 */
  causticStrength?: number;
  /** Surface metallic specularity (0.0 to 1.0). Default 0.85 */
  metallic?: number;
  /** Overall brightness multiplier. Default 1.0 */
  brightness?: number;
  /** Whether the metal reacts to cursor movement. Default true */
  interactive?: boolean;
  /** Brand color palette stops (Hex strings) */
  colorBackdrop?: string; // Deepest void background
  colorDark?: string;     // Shadow / base molten tone
  colorMid?: string;      // Body liquid metal
  colorLight?: string;    // Radiant highlight
  colorHot?: string;      // White-hot caustic filament core
  /** Additional container classes */
  className?: string;
  /** Style object */
  style?: React.CSSProperties;
}

// Convert hex (#RRGGBB or #RGB) to normalized RGB [0..1, 0..1, 0..1]
function hexToRGB(hex: string): [number, number, number] {
  let cleaned = hex.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const intVal = parseInt(cleaned, 16);
  if (isNaN(intVal)) return [0.1, 0.05, 0.02];
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
uniform float u_distortion;
uniform float u_density;
uniform float u_caustic_strength;
uniform float u_metallic;
uniform float u_brightness;
uniform vec3 u_color_backdrop;
uniform vec3 u_color_dark;
uniform vec3 u_color_mid;
uniform vec3 u_color_light;
uniform vec3 u_color_hot;

// Simplex-style 2D noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Multi-octave FBM
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; ++i) {
    v += a * snoise(p);
    p = rot * p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

// Domain Warped Molten Fluid Heightfield
float heightField(vec2 uv, float t) {
  vec2 p = uv * u_density;
  
  // Mouse interaction ripple
  vec2 mDiff = uv - u_mouse;
  float mDist = length(mDiff);
  float mouseWave = sin(mDist * 16.0 - t * 3.0) * exp(-mDist * 3.5) * 0.25;
  
  // Domain warp layer 1
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + vec2(t * 0.15, t * 0.1)),
    fbm(p + vec2(5.2, 1.3) - vec2(t * 0.12, t * 0.08))
  );

  // Domain warp layer 2
  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + vec2(t * 0.2, -t * 0.15)),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) + vec2(-t * 0.1, t * 0.22))
  );

  vec2 warpedP = p + u_distortion * r + mDiff * mouseWave;
  float h = fbm(warpedP + vec2(t * 0.1));
  return h;
}

void main() {
  vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  vec2 uv = (vUv - 0.5) * aspect + 0.5;
  
  float t = u_time * u_speed;
  
  // Compute normal via finite differences
  float eps = 0.003;
  float hCenter = heightField(uv, t);
  float hRight  = heightField(uv + vec2(eps, 0.0), t);
  float hUp     = heightField(uv + vec2(0.0, eps), t);
  
  vec3 normal = normalize(vec3((hRight - hCenter) / eps, (hUp - hCenter) / eps, 0.35));
  vec3 lightDir = normalize(vec3(0.5, 0.8, 1.2));
  vec3 viewDir  = vec3(0.0, 0.0, 1.0);
  
  // Lighting calculations
  float diff = clamp(dot(normal, lightDir), 0.0, 1.0);
  vec3 halfVec = normalize(lightDir + viewDir);
  float spec = pow(clamp(dot(normal, halfVec), 0.0, 1.0), 48.0) * u_metallic;
  float specHot = pow(clamp(dot(normal, halfVec), 0.0, 1.0), 12.0) * 0.5;
  
  // Fresnel glow at grazing angles
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
  
  // Caustic filament ridges: sharp high-contrast luminous veins
  float ridge = 1.0 - abs(hCenter);
  float caustic = pow(ridge, 4.0) * u_caustic_strength;
  float fineCaustic = pow(ridge, 8.0) * 1.8;

  // Normalized color mixing
  float val = clamp((hCenter + 1.0) * 0.5, 0.0, 1.0);
  
  // Gradient blend
  vec3 color = mix(u_color_backdrop, u_color_dark, smoothstep(0.0, 0.35, val));
  color = mix(color, u_color_mid, smoothstep(0.3, 0.7, val));
  color = mix(color, u_color_light, smoothstep(0.65, 0.92, val));
  
  // Add molten metallic luster
  color += u_color_mid * (diff * 0.45);
  color += u_color_light * (fresnel * 0.6);
  
  // Add white-hot caustic filaments & intense specular cores
  color = mix(color, u_color_hot, clamp(caustic * 0.8 + fineCaustic * 0.6 + specHot * 0.3, 0.0, 1.0));
  color += vec3(1.0) * (spec * 0.9);
  
  // Global brightness & soft vignette
  color *= u_brightness;
  
  // Subtle peripheral vignette to maintain foreground contrast
  float vig = 1.0 - smoothstep(0.5, 1.4, length(vUv - 0.5) * 1.3);
  color *= (0.75 + 0.25 * vig);

  gl_FragColor = vec4(color, 1.0);
}
`;

export const MoltenMetal: React.FC<MoltenMetalProps> = ({
  speed = 0.6,
  distortion = 1.2,
  density = 2.4,
  causticStrength = 1.5,
  metallic = 0.85,
  brightness = 1.0,
  interactive = true,
  // Sun Robotics & AI Theme Palette (Solar Amber, Copper Flame, Obsidian, Superheated White-Gold)
  colorBackdrop = "#050608",
  colorDark = "#1e1005",
  colorMid = "#c2410c",
  colorLight = "#f59e0b",
  colorHot = "#fffbeb",
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Mouse coordinate refs with smooth lerp
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const currentMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
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
        console.warn("Shader compile error:", glCtx.getShaderInfoLog(shader));
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
      console.warn("Program link error:", gl.getProgramInfoLog(program));
      setHasWebGL(false);
      return;
    }

    gl.useProgram(program);

    // Full screen quad geometry
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

    // Get Uniform Locations
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uSpeedLoc = gl.getUniformLocation(program, "u_speed");
    const uDistortionLoc = gl.getUniformLocation(program, "u_distortion");
    const uDensityLoc = gl.getUniformLocation(program, "u_density");
    const uCausticLoc = gl.getUniformLocation(program, "u_caustic_strength");
    const uMetallicLoc = gl.getUniformLocation(program, "u_metallic");
    const uBrightnessLoc = gl.getUniformLocation(program, "u_brightness");
    const uColorBackdropLoc = gl.getUniformLocation(program, "u_color_backdrop");
    const uColorDarkLoc = gl.getUniformLocation(program, "u_color_dark");
    const uColorMidLoc = gl.getUniformLocation(program, "u_color_mid");
    const uColorLightLoc = gl.getUniformLocation(program, "u_color_light");
    const uColorHotLoc = gl.getUniformLocation(program, "u_color_hot");

    // Colors
    const cBackdrop = hexToRGB(colorBackdrop);
    const cDark = hexToRGB(colorDark);
    const cMid = hexToRGB(colorMid);
    const cLight = hexToRGB(colorLight);
    const cHot = hexToRGB(colorHot);

    gl.uniform3f(uColorBackdropLoc, cBackdrop[0], cBackdrop[1], cBackdrop[2]);
    gl.uniform3f(uColorDarkLoc, cDark[0], cDark[1], cDark[2]);
    gl.uniform3f(uColorMidLoc, cMid[0], cMid[1], cMid[2]);
    gl.uniform3f(uColorLightLoc, cLight[0], cLight[1], cLight[2]);
    gl.uniform3f(uColorHotLoc, cHot[0], cHot[1], cHot[2]);

    gl.uniform1f(uSpeedLoc, prefersReducedMotion ? 0.05 : speed);
    gl.uniform1f(uDistortionLoc, distortion);
    gl.uniform1f(uDensityLoc, density);
    gl.uniform1f(uCausticLoc, causticStrength);
    gl.uniform1f(uMetallicLoc, metallic);
    gl.uniform1f(uBrightnessLoc, brightness);

    let animationFrameId: number;
    let isVisible = true;
    const startTime = performance.now();

    // Resize Handler
    const handleResize = () => {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // Pause rendering when outside viewport
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Mouse Move Listener
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

    // Render loop
    const render = (time: number) => {
      if (isVisible) {
        // Smooth mouse lerp
        currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
        currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;

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
    speed,
    distortion,
    density,
    causticStrength,
    metallic,
    brightness,
    interactive,
    colorBackdrop,
    colorDark,
    colorMid,
    colorLight,
    colorHot,
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
        // Fallback CSS glow if WebGL unavailable
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${colorLight}22 0%, ${colorMid}15 40%, ${colorBackdrop} 85%)`,
          }}
        />
      )}
    </div>
  );
};

export default MoltenMetal;
