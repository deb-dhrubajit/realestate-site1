import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { galleryImages, project } from "@/lib/content";
import { Reveal } from "./Reveal";

const points = [
  "Ready to move, so you can start living here right away",
  "Choose from 220 residential and commercial plots, roomy enough for a joint family",
  "Step out to a landscaped lake and clubhouse for evening adda, not just a road",
  "Stay close to the city, 20 km out on the Baruipur Bypass",
];

export function Overview() {
  return (
    <section id="overview" className="bg-paper py-16 md:py-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <h2 className="font-display text-balance text-3xl font-semibold leading-[1.1] text-green-950 md:text-[2.6rem]">
            An address you can move into, not just plan around.
          </h2>
          <p className="max-w-xl text-balance leading-relaxed text-ink-soft md:text-lg">
            {project.fullName} in {project.locality} is finished and occupied
            today, not a promise on paper. You get the comfort of a planned,
            secured campus with the everyday convenience of banks, schools
            and markets already close by.
          </p>
          <ul className="flex flex-col gap-3.5 pt-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-ink-soft">
                <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-green-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={galleryImages.overview}
              alt="Sunlit residential neighbourhood surrounded by green hills"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <p className="flex items-baseline justify-between border-t border-green-950/10 pt-4 text-sm text-ink-faint">
            <span>Dedicated commercial space</span>
            <span className="font-display text-lg text-green-900">
              {project.commercialArea} / {project.commercialLand}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
