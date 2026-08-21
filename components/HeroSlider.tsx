"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { CTAButton } from "./Button";
import { heroSlides } from "@/lib/content";

const SLIDE_DURATION = 4200;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    timerRef.current = setInterval(advance, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reduce, advance, index]);

  const goTo = (i: number) => setIndex(i);

  return (
    <section
      id="top"
      role="region"
      aria-roledescription="carousel"
      aria-label="Shantiban City highlights"
      className="relative flex min-h-[100dvh] w-full items-end overflow-hidden bg-green-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <motion.div
              className="h-full w-full"
              animate={i === index && !reduce ? { scale: 1.08 } : { scale: 1 }}
              initial={{ scale: 1 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1.4, ease: "linear" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/85 via-green-950/45 to-green-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-transparent to-green-950/20" />
      </div>

      {/* Content */}
      <div className="container-page relative z-10 flex w-full flex-col gap-10 pb-16 pt-28 md:pb-20 md:pt-24">
        <div className="flex max-w-xl flex-col gap-5">
          <h1 className="font-display text-balance text-[2.75rem] font-semibold leading-[1.05] text-paper md:text-[4rem]">
            Shantiban City
          </h1>
          <p className="-mt-3 font-display text-lg text-green-200 md:text-xl" lang="bn">
            শান্তিবন সিটি
          </p>

          <p className="max-w-md text-balance text-base leading-relaxed text-green-100 md:text-lg">
            Your own plot beside a private lake in Baruipur, 20 km from your Kolkata. Move in
            today.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <CTAButton href="#enquire" variant="primary">
              Book a Site Visit
            </CTAButton>
          </div>
        </div>

        {/* Caption + controls row */}
        <div className="flex flex-col gap-5 border-t border-paper/15 pt-5 md:flex-row md:items-end md:justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-green-200">
                {heroSlides[index].eyebrow}
              </span>
              <p className="mt-1 font-display text-lg text-paper md:text-xl">
                {heroSlides[index].headline}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${slide.eyebrow}`}
                  aria-current={i === index}
                  className="group relative h-px w-9 overflow-hidden bg-paper/30"
                >
                  {i === index ? (
                    <motion.span
                      key={index}
                      className="absolute inset-y-0 left-0 bg-paper"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused || reduce ? 0.3 : SLIDE_DURATION / 1000, ease: "linear" }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper/10"
              >
                <CaretLeft size={16} />
              </button>
              <button
                type="button"
                onClick={advance}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper/10"
              >
                <CaretRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
