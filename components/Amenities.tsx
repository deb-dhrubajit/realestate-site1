"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Baby,
  Footprints,
  Armchair,
  FlowerLotus,
  Waves,
  CookingPot,
  Fish,
  Basketball,
  Martini,
  HouseLine,
  Barbell,
} from "@phosphor-icons/react/dist/ssr";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { amenities, galleryImages, type Amenity } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

const iconMap: Record<Amenity["icon"], React.ElementType> = {
  baby: Baby,
  footprints: Footprints,
  personArmchair: Armchair,
  flowerLotus: FlowerLotus,
  waves: Waves,
  cookingPot: CookingPot,
  fish: Fish,
  basketball: Basketball,
  martini: Martini,
  houseLine: HouseLine,
  barbell: Barbell,
};

function AmenityCard({ amenity }: { amenity: Amenity }) {
  const Icon = iconMap[amenity.icon];
  const photo = amenity.image ? galleryImages[amenity.image] : null;

  return (
    <div
      className="amenity-card relative h-[24rem] w-[18rem] shrink-0 overflow-hidden sm:h-[27rem] sm:w-[20rem]"
      style={{ willChange: "opacity, transform" }}
    >
      {photo ? (
        <>
          <Image src={photo} alt={amenity.title} fill sizes="320px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950/85 via-green-950/10 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-paper-alt" />
      )}

      <div className="relative flex h-full flex-col justify-between p-6">
        <span className={`font-display text-sm ${photo ? "text-paper/70" : "text-gold-700"}`}>
          {amenity.code}
        </span>
        <div>
          <Icon
            size={22}
            weight="light"
            className={`mb-3 ${photo ? "text-paper" : "text-green-700"}`}
          />
          <h3
            className={`font-display text-xl font-semibold leading-snug ${
              photo ? "text-paper" : "text-green-950"
            }`}
          >
            {amenity.title}
          </h3>
          <p className={`mt-1.5 text-sm leading-relaxed ${photo ? "text-green-100" : "text-ink-soft"}`}>
            {amenity.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Amenities() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnhanced(desktop && !reduce);
  }, []);

  useEffect(() => {
    if (!enhanced || !wrapRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - wrap.clientWidth;
      const cards = gsap.utils.toArray<HTMLElement>(".amenity-card", track);

      const updateDepth = () => {
        const centerX = window.innerWidth / 2;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(cardCenter - centerX);
          const norm = Math.min(dist / (window.innerWidth * 0.62), 1);
          gsap.set(card, { opacity: 1 - norm * 0.65, scale: 1 - norm * 0.06 });
        });
      };

      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: updateDepth,
          },
        }
      );

      updateDepth();
    }, wrap);

    return () => ctx.revert();
  }, [enhanced]);

  return (
    <section id="amenities" className="bg-paper py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          title="Eleven amenities, mapped to a single campus."
          body="Every deck, court and garden on the master plan is built and ready for you today."
        />
      </div>

      <div ref={wrapRef} className="relative mt-12 overflow-hidden md:h-[70vh] md:min-h-[32rem]">
        <div
          ref={trackRef}
          className={
            enhanced
              ? "flex h-full items-center gap-px px-[6vw]"
              : "flex snap-x snap-mandatory gap-px overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          {amenities.map((amenity) => (
            <div key={amenity.code} className={enhanced ? "" : "snap-start"}>
              <AmenityCard amenity={amenity} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
