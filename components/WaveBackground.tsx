"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Site-wide 3D background: a field of glowing particles rolling like an ocean
 * surface, seen in perspective. Height drives colour (blue → cyan → gold).
 *  - the cursor sends ripples across the surface
 *  - page scroll glides the camera along the wave
 * All motion runs in the vertex shader, so the CPU cost is a few uniforms per
 * frame. Pauses with the tab; renders one still frame under reduced motion.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRipple;
  uniform float uPixelRatio;
  varying float vH;
  varying float vFade;

  void main() {
    vec3 p = position;
    float t = uTime * 0.55;
    float h = sin(p.x * 0.32 + t) * 0.45
            + sin(p.z * 0.48 + t * 1.25) * 0.35
            + sin((p.x + p.z) * 0.2 + t * 0.7) * 0.5;
    float d = distance(p.xz, uMouse);
    h += sin(d * 2.0 - uTime * 3.2) * 0.42 * exp(-d * 0.32) * uRipple;
    p.y += h;
    vH = h;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (2.2 + h * 0.9) * (16.0 / -mv.z) * uPixelRatio;
    vFade = smoothstep(58.0, 10.0, -mv.z) * smoothstep(0.0, 3.0, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBlue;
  uniform vec3 uCyan;
  uniform vec3 uGold;
  varying float vH;
  varying float vFade;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.05, r);
    float k = clamp((vH + 1.2) / 2.6, 0.0, 1.0);
    vec3 col = mix(uBlue, uCyan, smoothstep(0.15, 0.6, k));
    col = mix(col, uGold, smoothstep(0.68, 1.0, k));
    gl_FragColor = vec4(col, a * vFade * 0.85);
  }
`;

export function WaveBackground() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // no WebGL: the CSS gradient backdrop remains
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 720;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    const lookAt = new THREE.Vector3(0, 0, -14);

    // --- particle grid on the XZ plane ---------------------------------------
    const COLS = small ? 110 : 200;
    const ROWS = small ? 80 : 120;
    const WIDTH = 64, DEPTH = 56;
    const pos = new Float32Array(COLS * ROWS * 3);
    let k = 0;
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        pos[k++] = (i / (COLS - 1) - 0.5) * WIDTH;
        pos[k++] = 0;
        pos[k++] = -(j / (ROWS - 1)) * DEPTH + 6;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, -6) },
      uRipple: { value: 0 },
      uPixelRatio: { value: dpr },
      uBlue: { value: new THREE.Color("#1d4ed8") },
      uCyan: { value: new THREE.Color("#22d3ee") },
      uGold: { value: new THREE.Color("#f5b942") },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, vertexShader, fragmentShader,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(geo, mat));

    // --- sizing ----------------------------------------------------------------
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const placeCamera = (scrollFrac: number) => {
      camera.position.set(Math.sin(scrollFrac * Math.PI * 2) * 2.2, 3.4 - scrollFrac * 1.4, 9);
      camera.lookAt(lookAt);
    };
    placeCamera(0);

    if (reduce) {
      uniforms.uTime.value = 4;
      renderer.render(scene, camera);
      const onResize = () => {
        resize();
        renderer.render(scene, camera);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    // --- pointer → point on the wave plane ------------------------------------
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    const mouseTarget = new THREE.Vector2(0, -6);
    let rippleTarget = 0;
    const onPointer = (e: PointerEvent) => {
      ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) {
        mouseTarget.set(hit.x, hit.z);
        rippleTarget = 1;
      }
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // --- loop -------------------------------------------------------------------
    let raf = 0;
    let last = performance.now();
    let scroll = 0;
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      uniforms.uTime.value += dt;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const target = max > 0 ? window.scrollY / max : 0;
      scroll += (target - scroll) * 0.06;
      placeCamera(scroll);

      uniforms.uMouse.value.lerp(mouseTarget, 0.08);
      rippleTarget *= 0.995; // ripple fades when the pointer rests
      uniforms.uRipple.value += (rippleTarget - uniforms.uRipple.value) * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="wave-bg" aria-hidden="true" />;
}
