"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config } from "@/lib/config";

export default function Effects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.documentElement;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const on = (
      target: EventTarget,
      type: string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions | boolean,
    ) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    const kontakti = document.getElementById("kontakti");

    // Smooth scroll through Lenis, driven by the GSAP ticker.
    let lenis: Lenis | null = null;
    if (!still) {
      lenis = new Lenis({ lerp: config.lenis.lerp });
      lenis.on("scroll", ScrollTrigger.update);
      const tickLenis = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickLenis);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => gsap.ticker.remove(tickLenis));
    }

    // Anchor links go through Lenis with a header offset. The mobile menu closes on tap.
    on(document, "click", (ev) => {
      const target = ev.target as Element | null;
      const anchor = target?.closest?.('.mm a[href^="#"]') as HTMLAnchorElement | null;
      const menu = document.getElementById("mm-menu") as HTMLDetailsElement | null;
      if (menu?.open && (anchor || !target?.closest?.("#mm-menu"))) menu.open = false;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1) ?? "";
      const el = document.getElementById(id);
      if (!el) return;
      ev.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: id === "top" ? 0 : -76 });
      else el.scrollIntoView({ behavior: "auto", block: "start" });
    });

    // Header turns solid as soon as the page scrolls. The call bar hides while Kontakti is in view.
    const setSolid = () => root.classList.toggle("mm-solid", window.scrollY > 24);
    setSolid();
    on(window, "scroll", setSolid, { passive: true });
    const observers: IntersectionObserver[] = [];
    if ("IntersectionObserver" in window) {
      if (kontakti) {
        const nobar = new IntersectionObserver(
          (entries) => root.classList.toggle("mm-nobar", entries[0].isIntersecting),
          { threshold: 0.15 },
        );
        nobar.observe(kontakti);
        observers.push(nobar);
      }
    }

    if (still) {
      root.classList.add("mm-still");
    } else {
      root.classList.add("mm-anim");

      // Reveals: short fade-up with stagger, hairline draw. Content is visible without JS.
      if ("IntersectionObserver" in window) {
        const reveal = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("is-in");
                reveal.unobserve(e.target);
              }
            });
          },
          // Start the reveal just before a block scrolls into view, so it is never seen empty.
          { threshold: 0, rootMargin: "0px 0px 10% 0px" },
        );
        document.querySelectorAll(".mm-r").forEach((el) => reveal.observe(el));
        observers.push(reveal);
      } else {
        document.querySelectorAll(".mm-r").forEach((el) => el.classList.add("is-in"));
      }
    }

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh, refresh);
    on(window, "load", refresh);

    return () => {
      cleanups.forEach((fn) => fn());
      observers.forEach((o) => o.disconnect());
      lenis?.destroy();
      root.classList.remove("mm-anim", "mm-still", "mm-solid", "mm-nobar");
    };
  }, []);

  return null;
}
