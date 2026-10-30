"use client";

import React, { useState } from "react";
import { Mail, Calendar, ArrowUpRight, CheckCircle2, Phone, MapPin } from "lucide-react";
import { portfolio } from "@/lib/data";
import { play } from "@/lib/sound";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const titleLetters = "say hi".split("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setLoading(true);
    setStatus("idle");
    play("click");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        play("chime");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Submission error.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again or use direct email.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="rule-t relative bg-paper-sunk py-12 sm:py-16"
    >
      <div className="frame-wide px-5 sm:px-8">
        {/* Section Heading */}
        <div className="mb-10 flex items-baseline gap-3">
          <h2
            id="contact-title"
            className="t-display text-lg text-ink font-semibold"
          >
            {titleLetters.map((char, i) => (
              <span
                key={i}
                className="stagger-ch inline-block cursor-default"
                onMouseEnter={() => play("tick")}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <span className="t-meta text-xs text-ink-3">/ get in touch</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-rule bg-paper p-6 sm:p-8">
              <h3 className="t-name text-lg font-bold text-ink mb-1">
                Send a message
              </h3>
              <p className="t-prose text-xs text-ink-3 mb-6">
                Have a question, proposal, or want to collaborate? Leave a note.
              </p>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="size-12 text-live mb-3 animate-bounce" />
                  <p className="t-prose text-base font-semibold text-ink">
                    Message sent successfully!
                  </p>
                  <p className="t-meta text-xs text-ink-3 mt-1">
                    Thanks for reaching out. I will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-5 t-meta rounded-chip border border-rule px-4 py-1.5 text-xs text-ink hover:border-ink"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="t-meta block text-xs text-ink-2 mb-1.5 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full rounded border border-rule bg-paper-sunk px-3.5 py-2 text-sm text-ink placeholder:text-ink-3/60 focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="t-meta block text-xs text-ink-2 mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. maya@example.com"
                      className="w-full rounded border border-rule bg-paper-sunk px-3.5 py-2 text-sm text-ink placeholder:text-ink-3/60 focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="t-meta block text-xs text-ink-2 mb-1.5 font-medium">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are you working on? How can we collaborate?"
                      className="w-full rounded border border-rule bg-paper-sunk px-3.5 py-2 text-sm text-ink placeholder:text-ink-3/60 focus:border-ink focus:outline-none transition-colors resize-y"
                    />
                  </div>

                  {status === "error" && (
                    <p className="t-meta text-xs text-danger">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 relative inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-chip border border-ink bg-ink px-6 py-2.5 text-sm text-paper font-medium transition-all duration-150 hover:bg-ink-2 hover:border-ink-2 active:translate-y-px disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Submit message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Info & Booking */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Direct Contact Card */}
            <div className="rounded-lg border border-rule bg-paper p-6 transition-colors hover:border-ink-3">
              <h3 className="t-meta font-bold uppercase text-xs tracking-wider text-ink mb-4 flex items-center gap-2">
                <Mail className="size-4" />
                <span>Direct Contact</span>
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <span className="t-meta text-[11px] text-ink-3">Email</span>
                  <a
                    href={`mailto:${portfolio.links.email}`}
                    onClick={() => play("click")}
                    className="t-prose text-sm font-semibold text-ink hover:underline break-all"
                  >
                    {portfolio.links.email}
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="t-meta text-[11px] text-ink-3">Phone</span>
                  <a
                    href={`tel:${portfolio.links.phone}`}
                    onClick={() => play("click")}
                    className="t-prose text-sm text-ink-2 hover:underline flex items-center gap-1.5"
                  >
                    <Phone className="size-3.5 text-ink-3" />
                    <span>{portfolio.links.phone}</span>
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="t-meta text-[11px] text-ink-3">Location</span>
                  <span className="t-prose text-sm text-ink-2 flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-ink-3" />
                    <span>Vadodara, Gujarat, India</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Book a Slot */}
            <div className="rounded-lg border border-rule bg-paper p-6 transition-colors hover:border-ink-3">
              <h3 className="t-meta font-bold uppercase text-xs tracking-wider text-ink mb-2 flex items-center gap-2">
                <Calendar className="size-4" />
                <span>Schedule a Call</span>
              </h3>
              <p className="t-prose text-xs text-ink-3 mb-4">
                Pick a slot that suits your timezone.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={`https://cal.com/${portfolio.booking.short.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => play("click")}
                  className="group flex items-center justify-between rounded border border-rule bg-paper-sunk px-4 py-2.5 transition-all hover:border-ink hover:bg-paper"
                >
                  <div className="flex flex-col">
                    <span className="t-prose text-xs font-semibold text-ink">
                      {portfolio.booking.short.label}
                    </span>
                    <span className="t-meta text-[11px] text-ink-3">
                      {portfolio.booking.short.minutes} minutes introductory sync
                    </span>
                  </div>
                  <ArrowUpRight className="size-4 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </a>

                <a
                  href={`https://cal.com/${portfolio.booking.long.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => play("click")}
                  className="group flex items-center justify-between rounded border border-rule bg-paper-sunk px-4 py-2.5 transition-all hover:border-ink hover:bg-paper"
                >
                  <div className="flex flex-col">
                    <span className="t-prose text-xs font-semibold text-ink">
                      {portfolio.booking.long.label}
                    </span>
                    <span className="t-meta text-[11px] text-ink-3">
                      {portfolio.booking.long.minutes} minutes technical deep-dive
                    </span>
                  </div>
                  <ArrowUpRight className="size-4 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
