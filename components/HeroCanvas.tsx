"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { config } from "@/lib/config";

type HeroWindow = Window & { __mmHeroReady?: boolean };

const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Cover-fit around a focal point, optional camera window (pan and zoom), warm grade, vignette, grain.
// With no media loaded it draws a slow procedural weave in the palette instead.
const FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uHasTex;
uniform vec2 uRes;
uniform vec2 uTexRes;
uniform vec2 uFocal;
uniform vec2 uStart;
uniform float uWin;
uniform float uProgress;
uniform float uGrade;
uniform float uVignette;
uniform float uGrain;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

vec3 procedural(vec2 uv) {
  float asp = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(asp, 1.0);
  p += vec2(uProgress * 1.1, uProgress * 0.6);
  vec2 w = p * 44.0;
  float warp = 0.5 + 0.5 * sin(w.x * 6.2831);
  float weft = 0.5 + 0.5 * sin(w.y * 6.2831);
  float cell = mod(floor(w.x) + floor(w.y), 2.0);
  float weave = mix(warp, weft, cell);
  float folds = fbm(p * 2.1 + 3.0);
  float light = smoothstep(0.2, 0.85, folds + 0.3 * (0.5 - uv.y));
  vec3 shadow = vec3(0.170, 0.130, 0.095);
  vec3 mid = vec3(0.420, 0.325, 0.250);
  vec3 high = vec3(0.790, 0.680, 0.545);
  vec3 col = mix(shadow, mid, light);
  col = mix(col, high, pow(light, 3.0) * 0.55);
  return col * (0.84 + 0.16 * weave);
}

void main() {
  vec3 col;
  if (uHasTex > 0.5) {
    // Top-left origin: cover-fit around the focal point, then the camera window.
    vec2 t = vec2(vUv.x, 1.0 - vUv.y);
    vec2 ratio = vec2(
      min((uRes.x / uRes.y) / (uTexRes.x / uTexRes.y), 1.0),
      min((uRes.y / uRes.x) / (uTexRes.y / uTexRes.x), 1.0));
    vec2 c = t * ratio + (1.0 - ratio) * uFocal;
    vec2 uv = uStart + c * uWin;
    uv.y = 1.0 - uv.y;
    col = texture2D(uTex, uv).rgb;
  } else {
    col = procedural(vUv);
  }
  vec3 warm = col * vec3(1.06, 0.98, 0.88);
  col = mix(col, warm, uGrade);
  float d = distance(vUv, vec2(0.5));
  col *= 1.0 - smoothstep(0.35, 0.95, d) * uVignette;
  col += (hash(vUv * uRes) - 0.5) * uGrain;
  gl_FragColor = vec4(col, 1.0);
}
`;

function signalReady() {
  (window as HeroWindow).__mmHeroReady = true;
  window.dispatchEvent(new Event("mm:hero-ready"));
}

type Mode = "video" | "still" | "procedural";

export default function HeroCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const heroCfg = config.hero;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
    } catch {
      signalReady();
      return;
    }
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const canvas = renderer.domElement;
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms: Record<string, THREE.IUniform> = {
      uTex: { value: null },
      uHasTex: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uTexRes: { value: new THREE.Vector2(16, 9) },
      uFocal: { value: new THREE.Vector2(0.5, 0.5) },
      uStart: { value: new THREE.Vector2(0, 0) },
      uWin: { value: 1 },
      uProgress: { value: 0 },
      uGrade: { value: heroCfg.shader.gradeStrength },
      uVignette: { value: heroCfg.shader.vignette },
      uGrain: { value: heroCfg.shader.grain },
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader: VERTEX, fragmentShader: FRAGMENT });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    let mode: Mode = "procedural";
    let target = 0;
    let cur = 0;
    let video: HTMLVideoElement | null = null;
    let texture: THREE.Texture | null = null;
    let raf = 0;
    let visible = true;
    let disposed = false;

    const render = () => {
      if (disposed) return;
      uniforms.uProgress.value = cur;
      if (mode === "still" && !reduced) {
        // Camera move over the photo: starts closer at the top left, settles and drifts across.
        const { overscan, pan, zoom } = heroCfg.still;
        const s = 1 + zoom * (1 - cur);
        (uniforms.uStart.value as THREE.Vector2).set((pan * cur) / s, (pan * cur) / s);
        uniforms.uWin.value = 1 / (overscan * s);
      } else {
        (uniforms.uStart.value as THREE.Vector2).set(0, 0);
        uniforms.uWin.value = 1;
      }
      renderer.render(scene, camera);
    };

    const setSize = () => {
      const w = Math.max(1, host.clientWidth);
      const h = Math.max(1, host.clientHeight);
      const mobile = mobileQuery.matches;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? heroCfg.dprCap.mobile : heroCfg.dprCap.desktop);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      (uniforms.uRes.value as THREE.Vector2).set(w * dpr, h * dpr);
      const f = mobile ? heroCfg.focal.mobile : heroCfg.focal.desktop;
      (uniforms.uFocal.value as THREE.Vector2).set(f[0], f[1]);
      render();
    };

    const useTexture = (tex: THREE.Texture, w: number, h: number, look: { gradeStrength: number; vignette: number; grain: number }) => {
      tex.colorSpace = THREE.NoColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      texture = tex;
      uniforms.uTex.value = tex;
      uniforms.uHasTex.value = 1;
      uniforms.uGrade.value = look.gradeStrength;
      uniforms.uVignette.value = look.vignette;
      uniforms.uGrain.value = look.grain;
      (uniforms.uTexRes.value as THREE.Vector2).set(w, h);
      render();
    };

    const loadStill = (src: string) => {
      new THREE.TextureLoader().load(
        src,
        (tex) => {
          if (disposed) {
            tex.dispose();
            return;
          }
          const img = tex.image as { width: number; height: number };
          mode = "still";
          useTexture(tex, img.width, img.height, heroCfg.still.shader);
          signalReady();
        },
        undefined,
        () => signalReady(),
      );
    };

    // Media: scrub video if enabled, else the still photo with a camera move, else procedural.
    if (heroCfg.video.enabled && !reduced) {
      video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.crossOrigin = "anonymous";
      video.src = mobileQuery.matches ? heroCfg.video.mobile : heroCfg.video.desktop;
      video.addEventListener("loadeddata", () => {
        if (!video || disposed) return;
        mode = "video";
        useTexture(new THREE.VideoTexture(video), video.videoWidth, video.videoHeight, heroCfg.shader);
        signalReady();
      });
      video.addEventListener("error", () => {
        video = null;
        if (heroCfg.still.enabled) loadStill(heroCfg.still.src);
        else signalReady();
      });
      video.load();
    } else if (heroCfg.still.enabled) {
      loadStill(heroCfg.still.src);
    } else if (heroCfg.video.enabled && reduced) {
      new THREE.TextureLoader().load(
        heroCfg.video.poster,
        (tex) => {
          const img = tex.image as { width: number; height: number };
          useTexture(tex, img.width, img.height, heroCfg.shader);
          signalReady();
        },
        undefined,
        () => signalReady(),
      );
    } else {
      signalReady();
    }

    // Scroll progress drives the camera and the playhead: down plays forward, up plays backward, stop freezes.
    const onProgress = (e: Event) => {
      target = (e as CustomEvent<number>).detail;
    };
    if (!reduced) window.addEventListener("mm:progress", onProgress);

    let seeking = false;
    const onSeeked = () => {
      seeking = false;
    };
    video?.addEventListener("seeked", onSeeked);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      cur += (target - cur) * heroCfg.videoSmoothing;
      if (Math.abs(target - cur) < 0.0004) cur = target;
      if (video && video.duration && Number.isFinite(video.duration)) {
        const t = cur * Math.max(0, video.duration - 0.05);
        if (!seeking && Math.abs(video.currentTime - t) > 1 / 30) {
          seeking = true;
          video.currentTime = t;
        }
      }
      render();
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(host);
    setSize();

    let io: IntersectionObserver | null = null;
    if (!reduced) {
      io = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
      });
      io.observe(host);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mm:progress", onProgress);
      io?.disconnect();
      ro.disconnect();
      if (video) {
        video.removeEventListener("seeked", onSeeked);
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
      texture?.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} style={{ position: "absolute", inset: 0 }} aria-hidden="true" />;
}
