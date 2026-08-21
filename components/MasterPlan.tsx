"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MagnifyingGlassPlus, X } from "@phosphor-icons/react/dist/ssr";
import { project } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const specs = [
  { label: "Total Plots", value: `${project.totalPlots}` },
  { label: "Residential Plot Size", value: project.plotUnit },
  { label: "Commercial Land", value: project.commercialLand },
  { label: "Commercial Area", value: project.commercialArea },
];

export function MasterPlan() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="master-plan" className="bg-paper py-16 md:py-24">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          eyebrow="The Master Plan"
          title="Every plot placed around one landscaped lake."
          body="220 plots, laid out across blocks A01 to A34, wrap a central lake and clubhouse so daily amenities stay a short walk from every doorstep."
          align="center"
        />

        <Reveal delay={0.05} className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-green-950/10 pt-6 sm:grid-cols-4">
          {specs.map((spec) => (
            <div key={spec.label}>
              <div className="font-display text-xl font-semibold text-green-900 md:text-2xl">
                {spec.value}
              </div>
              <div className="mt-1 text-xs text-ink-faint">{spec.label}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative block w-full overflow-hidden"
            aria-label="Open the full master plan image"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
              <Image
                src="/images/plot-plan.jpg"
                alt="Shantiban City master plan showing plot blocks A01 to A34, the lake, clubhouse and amenity zones"
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-contain bg-paper-alt transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]"
              />
            </div>
            <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-green-950 px-4 py-2 text-xs font-medium text-paper">
              <MagnifyingGlassPlus size={15} />
              View full master plan
            </span>
          </button>
        </Reveal>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-green-950/92 p-4 backdrop-blur-sm md:p-10"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close master plan view"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/images/plot-plan.jpg"
                alt="Shantiban City master plan, full view"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
