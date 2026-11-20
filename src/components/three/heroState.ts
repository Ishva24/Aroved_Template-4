/** Mutable state shared between DOM (GSAP / buttons) and the hero render loop — avoids React re-renders. */
export const heroState = {
  scroll: 0, // 0 → 1 as the hero scrolls out
  zoom: 1, // camera distance multiplier, driven by zoom buttons
  reducedMotion: false,
};
