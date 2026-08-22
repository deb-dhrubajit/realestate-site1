"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { phone } from "@/lib/content";

/** How long the mascot holds at centre-screen before flying to the corner. */
const INTRO_HOLD_MS = 90;

/** Canvas working resolution. The source video is 720x1280 (9:16). */
const CANVAS_W = 360;
const CANVAS_H = 640;

/** White-knockout thresholds: fully clear above OPAQUE_MAX, feathered below. */
const CLEAR_AT = 250;
const FEATHER_AT = 242;

export function IntroMascot() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"intro" | "docked">("intro");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setPhase("docked");
      return;
    }
    const t = setTimeout(() => setPhase("docked"), INTRO_HOLD_MS);
    return () => clearTimeout(t);
  }, [reduce]);

  // The source video is H.264 with no alpha channel, so the mascot sits on a
  // baked-in white ground. Key that white out per frame onto a canvas, which
  // gives real transparency and keeps the mascot readable on dark sections.
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (video.readyState < 2) return;

      ctx.drawImage(video, 0, 0, CANVAS_W, CANVAS_H);
      const frame = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
      const d = frame.data;

      for (let i = 0; i < d.length; i += 4) {
        const min = Math.min(d[i], d[i + 1], d[i + 2]);
        if (min >= CLEAR_AT) {
          d[i + 3] = 0;
        } else if (min > FEATHER_AT) {
          d[i + 3] = Math.round((255 * (CLEAR_AT - min)) / (CLEAR_AT - FEATHER_AT));
        }
      }

      ctx.putImageData(frame, 0, 0);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const isIntro = phase === "intro";

  return (
    <>
      {/* A translucent veil, not a curtain: the site loads and stays readable
          underneath, just dimmed, while the mascot is centre-stage. */}
      <AnimatePresence>
        {isIntro ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[100] bg-white/75"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ aspectRatio: "720 / 1280" }}
        className={
          isIntro
            ? "pointer-events-none fixed left-1/2 top-1/2 z-[101] h-[76vh] -translate-x-1/2 -translate-y-1/2"
            : "fixed bottom-24 right-3 z-[101] h-28 md:bottom-6 md:right-6 md:h-40"
        }
      >
        <button
          type="button"
          onClick={() => {
            if (!isIntro) window.open(`https://wa.me/${phone.whatsapp}`, "_blank");
          }}
          aria-label={isIntro ? undefined : "Chat with Shantiban City on WhatsApp"}
          tabIndex={isIntro ? -1 : 0}
          className="relative block h-full w-full"
          style={{ cursor: isIntro ? "default" : "pointer" }}
        >
          {/* Decode source only: the canvas above is what the visitor sees. */}
          <video
            ref={videoRef}
            src="/videos/intro-mascot.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          />
          <canvas ref={canvasRef} className="relative h-full w-full" />
        </button>
      </motion.div>
    </>
  );
}
