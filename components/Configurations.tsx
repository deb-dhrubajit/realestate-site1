import { project } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Configurations() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          title="Two ways to invest in one address."
          body="Residential plots for the home you'll live in, commercial frontage for the business you're building."
        />

        <div className="grid gap-10 border-t border-green-950/10 pt-10 md:grid-cols-2 md:divide-x md:divide-green-950/10">
          <Reveal className="flex flex-col gap-5 md:pr-10">
            <h3 className="font-display text-2xl font-semibold text-green-950 md:text-3xl">
              Residential Plots
            </h3>
            <p className="max-w-md text-ink-soft">
              {project.totalPlots} plots across blocks A01 to A34, each sized at {project.plotUnit},
              ready for you to design and build your own home within a secured, landscaped campus.
            </p>
            <dl className="mt-2 flex gap-10">
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-faint">Total Plots</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-green-900">
                  {project.totalPlots}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-faint">Plot Size</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-green-900">
                  {project.plotUnit}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5 md:pl-10">
            <h3 className="font-display text-2xl font-semibold text-green-950 md:text-3xl">
              Commercial Plots
            </h3>
            <p className="max-w-md text-ink-soft">
              {project.commercialLand} set aside for retail and business frontage, right at the
              entrance of a growing, gated residential population.
            </p>
            <dl className="mt-2 flex gap-10">
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-faint">Land</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-green-900">
                  {project.commercialLand}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-faint">Built Area</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-green-900">
                  {project.commercialArea}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="text-ink-soft">
            Pricing varies by block and plot facing. Ask us when you book your visit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
