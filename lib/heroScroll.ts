/**
 * Shared, mutable scroll state for the hero. GSAP ScrollTrigger (in Hero)
 * writes `progress` (0 at the top of the page → 1 once the hero has scrolled
 * out of view); the Three.js render loop (HeroScene) reads it every frame.
 * A plain object avoids re-rendering React on every scroll tick.
 */
export const heroScroll = { progress: 0 };
