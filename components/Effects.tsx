"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config } from "@/lib/config";

type HeroWindow = Window & { __mmHeroReady?: boolean };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function Effects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.documentElement;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia("(max-width: 760px)");
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

    const hero = document.getElementById("mm-hero");
    const kontakti = document.getElementById("kontakti");
    if (!hero) return;

    // Hero length per viewport class.
    const setHeroLength = () => {
      const vh = mobileQuery.matches ? config.hero.scrollLengthVh.mobile : config.hero.scrollLengthVh.desktop;
      root.style.setProperty("--hero-h", `${vh}vh`);
    };

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

    // Header turns solid after the hero. The call bar hides while Kontakti is in view.
    const observers: IntersectionObserver[] = [];
    if ("IntersectionObserver" in window) {
      const solid = new IntersectionObserver(
        (entries) => {
          root.classList.toggle("mm-solid", entries[0].boundingClientRect.bottom < 90);
        },
        { threshold: [0, 0.02, 0.1, 0.5, 1], rootMargin: "-80px 0px 0px 0px" },
      );
      solid.observe(hero);
      observers.push(solid);
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
      setHeroLength();
      on(mobileQuery, "change", () => {
        setHeroLength();
        ScrollTrigger.refresh();
      });
      root.classList.add("mm-live", "mm-anim");

      // Hero scrub: scroll progress drives the five beats and the media playhead.
      const beats = Array.from(hero.querySelectorAll<HTMLElement>(".mm-beat"));
      const n = beats.length;
      let target = 0;
      let cur = 0;
      let raf = 0;

      const paint = (p: number) => {
        const seg = 1 / n;
        const fade = seg * config.hero.beatFade;
        beats.forEach((b, i) => {
          const start = i * seg;
          const end = start + seg;
          const fadeIn = i === 0 ? 1 : clamp((p - start) / fade, 0, 1);
          const fadeOut = i === n - 1 ? 1 : clamp((end - p) / fade, 0, 1);
          const a = Math.min(fadeIn, fadeOut);
          b.style.opacity = a.toFixed(3);
          b.style.visibility = a < 0.02 ? "hidden" : "visible";
          b.style.transform = `translate3d(0,${(28 * (1 - fadeIn)).toFixed(2)}px,0)`;
        });
      };
      const tick = () => {
        const d = target - cur;
        cur = Math.abs(d) < 0.0004 ? target : cur + d * config.hero.beatSmoothing;
        paint(cur);
        raf = cur === target ? 0 : requestAnimationFrame(tick);
      };
      paint(0);

      const trigger = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          target = self.progress;
          window.dispatchEvent(new CustomEvent("mm:progress", { detail: target }));
          if (!raf) raf = requestAnimationFrame(tick);
        },
      });
      cleanups.push(() => {
        trigger.kill();
        cancelAnimationFrame(raf);
      });

      // Reveals: fade-up with stagger, image mask wipe, hairline draw. Content is visible without JS.
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
          { threshold: 0.14 },
        );
        document.querySelectorAll(".mm-r").forEach((el) => reveal.observe(el));
        observers.push(reveal);
      } else {
        document.querySelectorAll(".mm-r").forEach((el) => el.classList.add("is-in"));
      }
    }

    // Loader: follows real progress (fonts, hero media). Min 0.8 s, max 2.5 s, once per session.
    let seen = false;
    try {
      seen = sessionStorage.getItem("mm-loader") === "1";
    } catch {
      /* storage unavailable */
    }
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh, refresh);
    on(window, "load", refresh);

    let loaderRaf = 0;
    let leaveTimer: ReturnType<typeof setTimeout> | undefined;
    if (seen) {
      root.classList.remove("mm-loading");
    } else {
      const fill = document.getElementById("mm-pfill");
      const pct = document.getElementById("mm-pct");
      const t0 = performance.now();
      let done = 0;
      let shown = 0;
      let finished = false;
      const step = () => {
        done += 1;
      };
      root.classList.add("mm-loading");
      (document.fonts?.ready ?? Promise.resolve()).then(step, step);
      const heroWin = window as HeroWindow;
      if (heroWin.__mmHeroReady) step();
      else window.addEventListener("mm:hero-ready", step, { once: true });

      const frame = (now: number) => {
        const elapsed = now - t0;
        const goal = elapsed > config.loader.maxMs ? 1 : (done / 2) * Math.min(1, elapsed / config.loader.minMs);
        shown += (goal - shown) * 0.14;
        if (goal === 1 && shown > 0.995) shown = 1;
        if (fill) fill.style.transform = `scaleX(${shown.toFixed(3)})`;
        if (pct) pct.textContent = `${Math.round(shown * 100)}%`;
        if (shown < 1) {
          loaderRaf = requestAnimationFrame(frame);
          return;
        }
        if (finished) return;
        finished = true;
        try {
          sessionStorage.setItem("mm-loader", "1");
        } catch {
          /* storage unavailable */
        }
        root.classList.add("mm-leaving");
        leaveTimer = setTimeout(() => {
          root.classList.remove("mm-loading", "mm-leaving");
          ScrollTrigger.refresh();
        }, still ? 450 : 850);
      };
      loaderRaf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(loaderRaf);
      if (leaveTimer) clearTimeout(leaveTimer);
      cleanups.forEach((fn) => fn());
      observers.forEach((o) => o.disconnect());
      lenis?.destroy();
      root.style.removeProperty("--hero-h");
      root.classList.remove("mm-live", "mm-anim", "mm-still", "mm-solid", "mm-nobar", "mm-loading", "mm-leaving");
    };
  }, []);

  return null;
}
