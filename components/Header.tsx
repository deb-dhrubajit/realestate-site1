"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { List, X, Phone } from "@phosphor-icons/react/dist/ssr";
import { LogoMark, Wordmark } from "./Logo";
import { CTAButton } from "./Button";
import { phone } from "@/lib/content";

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#amenities", label: "Amenities" },
  { href: "#master-plan", label: "Master Plan" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const dark = solid || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500 ${
        solid ? "border-green-950/8 bg-paper" : "border-paper/15 bg-transparent"
      }`}
    >
      <div className="container-page flex h-[4.25rem] items-center justify-between md:h-[4.75rem]">
        <a href="#top" className="flex items-center gap-2.5">
          <LogoMark className={`h-7 w-7 ${dark ? "text-green-800" : "text-paper"}`} />
          <Wordmark tone={dark ? "dark" : "light"} />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                dark ? "text-ink-soft hover:text-green-900" : "text-green-100 hover:text-paper"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href={`tel:${phone.tel}`}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              dark ? "text-green-900" : "text-paper"
            }`}
          >
            <Phone size={15} weight="regular" />
            <span className="hidden xl:inline">{phone.display}</span>
          </a>
          <CTAButton href="#enquire" variant={dark ? "primary" : "on-dark"} className="!px-5 !py-2.5 text-sm">
            Book a Site Visit
          </CTAButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center lg:hidden ${dark ? "text-green-900" : "text-paper"}`}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[4.25rem] z-30 bg-green-950 lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-8 py-10">
              <div className="flex flex-col divide-y divide-paper/10 border-t border-paper/10">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="py-4 font-display text-2xl text-paper"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <motion.a
                href={`tel:${phone.tel}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 + navLinks.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 text-lg text-paper"
              >
                <Phone size={18} weight="regular" />
                {phone.display}
              </motion.a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
