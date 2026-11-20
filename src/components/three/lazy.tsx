"use client";

import dynamic from "next/dynamic";

/** Client-only, code-split entry points for the WebGL views (three.js never runs on the server). */
export const LazyProductViewer = dynamic(() => import("./ProductViewer"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-[inherit] bg-gradient-to-br from-white to-ice" />,
});
