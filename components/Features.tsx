import {
  Train,
  MapPin,
  RoadHorizon,
  Leaf,
  SpeakerSlash,
  Tree,
  FirstAid,
  GraduationCap,
  DoorOpen,
  ShieldCheck,
  Lightning,
  Buildings,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";
import { features, type Feature } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

const iconMap: Record<Feature["icon"], React.ElementType> = {
  train: Train,
  "map-pin": MapPin,
  "road-horizon": RoadHorizon,
  leaf: Leaf,
  "speaker-slash": SpeakerSlash,
  tree: Tree,
  "first-aid": FirstAid,
  "graduation-cap": GraduationCap,
  gate: DoorOpen,
  "shield-check": ShieldCheck,
  lightning: Lightning,
  buildings: Buildings,
  "trend-up": TrendUp,
};

const rowA = features.slice(0, 7);
const rowB = features.slice(7);

function MarqueeRow({
  items,
  startIndex,
  direction,
}: {
  items: Feature[];
  startIndex: number;
  direction: "left" | "right";
}) {
  const loop = [...items, ...items];
  return (
    <div className="group overflow-hidden py-2">
      <div
        className={`flex w-max items-stretch ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover:[animation-play-state:paused]`}
      >
        {loop.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          return (
            <div
              key={`${feature.title}-${i}`}
              className="flex w-[19rem] shrink-0 flex-col items-start gap-2.5 border-r border-green-950/10 px-7 py-5"
            >
              <Icon size={22} weight="light" className="text-green-700" />
              <span className="font-display text-xs text-gold-700">
                {String(startIndex + (i % items.length)).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base font-semibold leading-snug text-green-950">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-faint">{feature.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          title="Thirteen reasons to choose this address."
          body="From everyday convenience to long-term value, nothing important is more than a short drive away."
        />
      </div>

      <div className="mt-4 flex flex-col gap-10 border-y border-green-950/10">
        <MarqueeRow items={rowA} startIndex={1} direction="left" />
        <MarqueeRow items={rowB} startIndex={8} direction="right" />
      </div>
    </section>
  );
}
