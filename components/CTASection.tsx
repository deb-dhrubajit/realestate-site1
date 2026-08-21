"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { phone } from "@/lib/content";
import { Reveal } from "./Reveal";

export function CTASection() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError("Share your name and a phone number so we can reach you.");
      return;
    }
    setError("");

    const text = [
      `Hi, I'm interested in Shantiban City.`,
      `Name: ${name.trim()}`,
      `Contact: ${contact.trim()}`,
      message.trim() ? `Message: ${message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setSent(true);
    window.open(`https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const fieldCls =
    "border-b border-green-950/20 bg-transparent py-3 text-green-950 placeholder:text-ink-faint focus:border-green-900 focus:outline-none";

  return (
    <section id="enquire" className="bg-paper py-16 md:py-24">
      <div className="container-page grid gap-14 border-t border-green-950/10 pt-16 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <h2 className="font-display text-balance text-3xl font-semibold leading-[1.1] text-green-950 md:text-[2.6rem]">
            Come see the lake for yourself.
          </h2>
          <p className="max-w-md text-balance leading-relaxed text-ink-soft md:text-lg">
            Book a site visit or ask about plot availability. We&apos;ll get back to you within the day.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-green-900">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={fieldCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact" className="text-sm font-medium text-green-900">
                Phone or email
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                autoComplete="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="98300 XXXXX"
                className={fieldCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-green-900">
                Message <span className="text-ink-faint">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I'd like to know about plot availability facing the lake."
                className={`resize-none ${fieldCls}`}
              />
            </div>

            {error ? <p className="text-sm font-medium text-gold-700">{error}</p> : null}
            {sent ? (
              <p className="flex items-center gap-2 text-sm font-medium text-green-700">
                <CheckCircle size={16} weight="fill" />
                Opening WhatsApp with your details.
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-2 self-start bg-green-900 px-7 py-3.5 font-medium text-paper transition-colors hover:bg-green-800 active:scale-[0.98]"
            >
              Book a Site Visit
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
