"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { phone } from "@/lib/content";
import { Reveal } from "./Reveal";

const PLOT_TYPES = ["Residential", "Commercial"] as const;
type PlotType = (typeof PLOT_TYPES)[number];

export function CTASection() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [plotType, setPlotType] = useState<PlotType>("Residential");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) {
      setError("Share your name and a mobile number so we can reach you.");
      return;
    }
    setError("");

    const text = [
      `Hi, I'm interested in Shantiban City.`,
      `Name: ${name.trim()}`,
      `Mobile: +91 ${mobile.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : "",
      `Looking for: ${plotType} plot`,
      message.trim() ? `Message: ${message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setSent(true);
    window.open(`https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const fieldCls =
    "w-full rounded-lg border border-green-950/15 bg-paper px-4 py-3.5 text-green-950 placeholder:text-ink-faint transition-colors focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/15";

  return (
    <section id="enquire" className="bg-paper py-16 md:py-24">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <Reveal className="flex max-w-lg flex-col gap-4">
            <h2 className="font-display text-balance text-3xl font-semibold leading-[1.1] text-green-950 md:text-[2.6rem]">
              Come see the lake for yourself.
            </h2>
            <p className="text-balance leading-relaxed text-ink-soft md:text-lg">
              Book a site visit or ask about plot availability. We&apos;ll get back to you within
              the day.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col gap-5 rounded-xl border border-green-950/10 bg-paper-alt p-6 md:p-8"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
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
                  <label htmlFor="mobile" className="text-sm font-medium text-green-900">
                    Mobile number
                  </label>
                  <div className="flex items-stretch rounded-lg border border-green-950/15 bg-paper transition-colors focus-within:border-green-800 focus-within:ring-2 focus-within:ring-green-800/15">
                    <span className="flex shrink-0 items-center gap-1.5 border-r border-green-950/15 px-3 text-sm text-ink-soft">
                      <span aria-hidden="true">🇮🇳</span> +91
                    </span>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="98300 50189"
                      className="w-full rounded-r-lg bg-transparent px-3 py-3.5 text-green-950 placeholder:text-ink-faint focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-green-900">
                  Email <span className="text-ink-faint">(optional)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={fieldCls}
                />
              </div>

              <fieldset className="flex flex-col gap-2.5">
                <legend className="mb-2.5 text-sm font-medium text-green-900">
                  What are you looking for?
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {PLOT_TYPES.map((type) => {
                    const active = plotType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPlotType(type)}
                        aria-pressed={active}
                        className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? "border-green-900 bg-green-900 text-paper"
                            : "border-green-950/20 bg-paper text-green-900 hover:border-green-900"
                        }`}
                      >
                        {type} plot
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-green-900">
                  Message <span className="text-ink-faint">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
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
                className="mt-auto self-start rounded-lg bg-green-900 px-7 py-3.5 font-medium text-paper transition-colors hover:bg-green-800 active:scale-[0.98]"
              >
                Book a Site Visit
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
