"use client";

import { useEffect } from "react";

// Scroll reveals for anything marked data-reveal (optional --reveal-i for a stagger).
// Only elements that start below the visible screen are hidden, so the first view is always complete,
// and each element reveals once. Nothing happens when reduced motion is on or the browser lacks
// IntersectionObserver: the content simply stays in place.
export default function ScrollReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const fold = window.innerHeight - 20;
    const waiting = [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter(
      (el) => el.getBoundingClientRect().top > fold,
    );
    waiting.forEach((el) => el.classList.add("reveal-waiting"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-waiting");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    waiting.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      waiting.forEach((el) => el.classList.remove("reveal-waiting"));
    };
  }, []);

  return null;
}
