"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { heroScroll } from "@/lib/heroScroll";

/**
 * Hero 3D scene: a rotating "partner network" globe.
 *   - blue nodes + links  = Technology
 *   - gold nodes          = Success (revenue-generating partners)
 *   - gold packets moving along links between partners = Alliance
 *   - three orbit rings, one per letter of ATS
 *
 * GSAP tweens the three.js objects for the "assemble" intro, and the scroll
 * progress written by Hero's ScrollTrigger (lib/heroScroll) drives the camera,
 * globe position, spin speed and ring spread every frame.
 *
 * Loaded client-side only (see Hero). Pauses when off-screen or the tab is
 * hidden, renders a single still frame under prefers-reduced-motion, and
 * leaves the CSS fallback orb visible if WebGL is unavailable.
 */

const BLUE = new THREE.Color("#3b82f6");
const CYAN = new THREE.Color("#22d3ee");
const GOLD = new THREE.Color("#f5b942");

const NODE_COUNT = 200;
const RADIUS = 2;
const LINK_DIST = 0.6;
const PACKETS = 26;

/** Soft round sprite so points render as glowing dots instead of squares. */
function makeDotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.35, "rgba(255,255,255,.85)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Evenly distributed points on a sphere (Fibonacci lattice). */
function fibonacciSphere(n: number, r: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = i * golden;
    pts.push(new THREE.Vector3(Math.cos(th) * rad, y, Math.sin(th) * rad).multiplyScalar(r));
  }
  return pts;
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // no WebGL: CSS fallback stays
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(o: T) => (disposables.push(o), o);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.6);

    const world = new THREE.Group(); // receives pointer parallax
    const globe = new THREE.Group(); // spins
    world.add(globe);
    scene.add(world);
    world.rotation.x = 0.35;

    const dot = track(makeDotTexture());

    // --- Dark core so the back of the globe reads as depth ------------------
    const core = new THREE.Mesh(
      track(new THREE.SphereGeometry(RADIUS * 0.97, 48, 48)),
      track(new THREE.MeshBasicMaterial({ color: 0x07101f, transparent: true, opacity: 0.85 }))
    );
    globe.add(core);

    // Atmosphere halo
    const halo = new THREE.Sprite(
      track(
        new THREE.SpriteMaterial({
          map: dot, color: BLUE, transparent: true, opacity: 0.22,
          blending: THREE.AdditiveBlending, depthWrite: false,
        })
      )
    );
    halo.scale.setScalar(RADIUS * 2.9);
    world.add(halo);

    // --- Nodes ---------------------------------------------------------------
    const nodes = fibonacciSphere(NODE_COUNT, RADIUS);
    const isGold = nodes.map((_, i) => i % 8 === 3);

    const buildPoints = (filter: (i: number) => boolean, color: THREE.Color, size: number) => {
      const arr: number[] = [];
      nodes.forEach((p, i) => filter(i) && arr.push(p.x, p.y, p.z));
      const geo = track(new THREE.BufferGeometry());
      geo.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
      const mat = track(
        new THREE.PointsMaterial({
          size, map: dot, color, transparent: true, depthWrite: false,
          blending: THREE.AdditiveBlending, sizeAttenuation: true,
        })
      );
      const pts = new THREE.Points(geo, mat);
      globe.add(pts);
      return mat;
    };
    buildPoints((i) => !isGold[i], CYAN, 0.09);
    const goldMat = buildPoints((i) => isGold[i], GOLD, 0.2);

    // --- Links between nearby nodes -----------------------------------------
    const adjacency: number[][] = nodes.map(() => []);
    const linkPos: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i].distanceTo(nodes[j]) < LINK_DIST) {
          adjacency[i].push(j);
          adjacency[j].push(i);
          linkPos.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const linkGeo = track(new THREE.BufferGeometry());
    linkGeo.setAttribute("position", new THREE.Float32BufferAttribute(linkPos, 3));
    globe.add(
      new THREE.LineSegments(
        linkGeo,
        track(
          new THREE.LineBasicMaterial({
            color: BLUE, transparent: true, opacity: 0.28,
            blending: THREE.AdditiveBlending, depthWrite: false,
          })
        )
      )
    );

    // --- Packets travelling between partners (Alliance) ---------------------
    type Packet = { from: number; to: number; t: number; speed: number };
    const rnd = (n: number) => Math.floor(Math.random() * n);
    const nextTo = (from: number) => {
      const adj = adjacency[from];
      return adj.length ? adj[rnd(adj.length)] : from;
    };
    const packets: Packet[] = Array.from({ length: PACKETS }, () => {
      const from = rnd(NODE_COUNT);
      return { from, to: nextTo(from), t: Math.random(), speed: 0.5 + Math.random() * 0.7 };
    });
    const packetArr = new Float32Array(PACKETS * 3);
    const packetGeo = track(new THREE.BufferGeometry());
    packetGeo.setAttribute("position", new THREE.BufferAttribute(packetArr, 3));
    globe.add(
      new THREE.Points(
        packetGeo,
        track(
          new THREE.PointsMaterial({
            size: 0.16, map: dot, color: new THREE.Color("#ffd27a"), transparent: true,
            depthWrite: false, blending: THREE.AdditiveBlending,
          })
        )
      )
    );
    const tmp = new THREE.Vector3();
    const updatePackets = (dt: number) => {
      packets.forEach((p, k) => {
        p.t += dt * p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.from = p.to;
          p.to = nextTo(p.from);
        }
        tmp.lerpVectors(nodes[p.from], nodes[p.to], p.t);
        packetArr[k * 3] = tmp.x;
        packetArr[k * 3 + 1] = tmp.y;
        packetArr[k * 3 + 2] = tmp.z;
      });
      packetGeo.attributes.position.needsUpdate = true;
    };
    updatePackets(0);

    // --- Orbit rings: Alliance · Technology · Success -----------------------
    const rings = [
      { color: CYAN, r: RADIUS * 1.32, tilt: [1.2, 0.2], speed: 0.5 },
      { color: BLUE, r: RADIUS * 1.48, tilt: [1.75, -0.6], speed: -0.35 },
      { color: GOLD, r: RADIUS * 1.64, tilt: [1.45, 0.9], speed: 0.25 },
    ].map(({ color, r, tilt, speed }) => {
      const pivot = new THREE.Group();
      pivot.rotation.set(tilt[0], tilt[1], 0);
      const ring = new THREE.Mesh(
        track(new THREE.TorusGeometry(r, 0.006, 8, 220)),
        track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.45 }))
      );
      pivot.add(ring);
      const sat = new THREE.Sprite(
        track(
          new THREE.SpriteMaterial({
            map: dot, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
          })
        )
      );
      sat.scale.setScalar(0.32);
      pivot.add(sat);
      world.add(pivot);
      return { pivot, ring, sat, r, speed, angle: Math.random() * Math.PI * 2 };
    });

    // --- Distant stars -------------------------------------------------------
    const starArr: number[] = [];
    for (let i = 0; i < 420; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(9 + Math.random() * 10);
      starArr.push(v.x, v.y, v.z);
    }
    const starGeo = track(new THREE.BufferGeometry());
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starArr, 3));
    const stars = new THREE.Points(
      starGeo,
      track(
        new THREE.PointsMaterial({
          size: 0.05, map: dot, color: 0x9fb4d8, transparent: true, opacity: 0.7, depthWrite: false,
        })
      )
    );
    scene.add(stars);

    // --- Sizing ---------------------------------------------------------------
    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    onReady?.();

    if (reduce) {
      return () => {
        ro.disconnect();
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    // --- GSAP intro: the network assembles ------------------------------------
    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    intro
      .from(world.scale, { x: 0.35, y: 0.35, z: 0.35, duration: 2.4 }, 0)
      .from(globe.rotation, { y: -Math.PI * 1.2, duration: 2.8, ease: "power3.out" }, 0)
      .from(halo.material, { opacity: 0, duration: 2 }, 0.2)
      .from(rings.map((r) => r.pivot.scale), { x: 0, y: 0, z: 0, duration: 1.6, ease: "back.out(1.6)", stagger: 0.18 }, 0.6)
      .from(stars.material, { opacity: 0, duration: 2.5, ease: "power1.out" }, 0);

    // --- Pointer parallax ------------------------------------------------------
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // --- Loop (paused off-screen / hidden tab) --------------------------------
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const clock = { t: 0 };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock.t += dt;

      // scroll-driven: rise, zoom out, spin faster, rings spread
      const p = heroScroll.progress;
      const spread = 1 + p * 0.35;
      camera.position.z = 8.6 + p * 3.2;
      world.position.y = p * 1.5;
      globe.rotation.y += dt * (0.12 + p * 0.9);
      stars.rotation.y -= dt * 0.01;
      world.rotation.y += (target.x - world.rotation.y) * 0.04;
      world.rotation.x += (0.35 + target.y - world.rotation.x) * 0.04;

      goldMat.size = 0.2 + Math.sin(clock.t * 2.4) * 0.05;
      updatePackets(dt);
      rings.forEach((r) => {
        r.angle += dt * r.speed;
        r.ring.scale.setScalar(spread);
        r.sat.position.set(Math.cos(r.angle) * r.r * spread, Math.sin(r.angle) * r.r * spread, 0);
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(el);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      intro.kill();
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div ref={mount} className="hero-canvas" />;
}
