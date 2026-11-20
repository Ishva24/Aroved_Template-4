"use client";

import { useEffect } from "react";

/**
 * Standard default OS cursor enforcement.
 * Clears any previously cached glove cursor class or preference.
 */
export function Cursor() {
  useEffect(() => {
    document.documentElement.classList.remove("glove-cursor");
    try {
      localStorage.removeItem("arosafe_cursor_mode");
    } catch (_) {}
  }, []);

  return null;
}

