import Image from "next/image";
import { Bank, GraduationCap, Storefront, FirstAid, Car } from "@phosphor-icons/react/dist/ssr";
import { locationItems, type LocationItem } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const categoryIcon: Record<LocationItem["category"], React.ElementType> = {
  Banking: Bank,
  Education: GraduationCap,
  Market: Storefront,
  Healthcare: FirstAid,
  Transit: Car,
};

const order: LocationItem["category"][] = ["Banking", "Education", "Market", "Healthcare", "Transit"];

export function LocationAdvantages() {
  return (
    <section id="location" className="bg-paper py-16 md:py-24">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          eyebrow="Location Advantages"
          title="Everyday life is already close by."
          body="Baruipur's social infrastructure sits within a short drive, with the city itself reachable in about 20 km via the bypass."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="relative aspect-[16/11] w-full overflow-hidden border border-green-950/8">
              <Image
                src="/images/location-map.png"
                alt="Map showing Shantiban City's connectivity to Tollygunge Metro, Baruipur Station, EM Bypass and nearby schools, banks and markets"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-contain bg-paper"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-7">
            {order.map((category) => {
              const items = locationItems.filter((i) => i.category === category);
              const Icon = categoryIcon[category];
              return (
                <div key={category}>
                  <div className="mb-3 flex items-center gap-2.5 text-green-800">
                    <Icon size={18} weight="bold" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">{category}</span>
                  </div>
                  <ul className="grid grid-cols-1 gap-x-6 gap-y-2 border-t border-green-950/8 pt-3 sm:grid-cols-2">
                    {items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-baseline justify-between gap-3 py-1.5 text-sm"
                      >
                        <span className="text-ink-soft">{item.name}</span>
                        <span className="shrink-0 font-medium text-green-800">{item.distance}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
