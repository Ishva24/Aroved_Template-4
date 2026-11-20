/** Shared, render-loop-friendly state for the Universe carousel (no three.js import — safe for the main bundle). */
export const universeState = {
  progress: 0,
  pointerX: 0,
  pointerY: 0,
  viewMode: "photo" as "photo" | "3d",
};
