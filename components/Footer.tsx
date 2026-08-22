import { MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { LogoMark } from "./Logo";
import { phone, project } from "@/lib/content";

const exploreLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#amenities", label: "Amenities" },
  { href: "#master-plan", label: "Master Plan" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-green-950 pb-28 pt-16 text-paper md:pb-16">
      <div className="container-page flex flex-col gap-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" tone="light" />
              <span className="font-display text-lg text-paper">
                Shantiban <span className="italic text-gold-400">City</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-green-200">
              A luxury gated community of {project.totalPlots} residential and commercial plots in{" "}
              {project.locality}, developed by {project.builder}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
              Explore
            </span>
            {exploreLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-green-100 transition-colors hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
              Get in Touch
            </span>
            <a
              href={`tel:${phone.tel}`}
              className="flex items-center gap-2.5 text-sm text-green-100 transition-colors hover:text-gold-300"
            >
              <Phone size={16} weight="fill" />
              {phone.display}
            </a>
            <a
              href={`https://wa.me/${phone.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-green-100 transition-colors hover:text-gold-300"
            >
              <WhatsappLogo size={16} weight="fill" />
              Chat on WhatsApp
            </a>
            <span className="flex items-start gap-2.5 text-sm text-green-100">
              <MapPin size={16} weight="fill" className="mt-0.5 shrink-0" />
              {project.locality}
            </span>
          </div>
        </div>

        <div className="border-t border-paper/10 pt-6 text-xs text-green-300">
          <p>
            &copy; {new Date().getFullYear()} {project.builder}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
