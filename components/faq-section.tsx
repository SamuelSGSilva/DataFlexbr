"use client";

import { useState } from "react";

interface FAQ {
  q: string;
  a: string;
}

export function FaqSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="mt-10 flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.q}
            className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
              isOpen
                ? "border-df-red/50 bg-gradient-to-br from-df-panel via-df-panel to-df-red/5 shadow-[0_0_24px_rgba(178,0,0,0.12)]"
                : "border-df-line bg-df-panel hover:border-white/15 hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            }`}
          >
            {/* Accent line left */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl transition-all duration-300 ${
                isOpen ? "bg-df-red" : "bg-transparent group-hover:bg-white/10"
              }`}
            />

            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-start gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              {/* Number badge */}
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold tabular-nums transition-all duration-300 mt-0.5 ${
                  isOpen
                    ? "bg-df-red text-white"
                    : "bg-white/8 text-df-muted group-hover:bg-white/12"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-200 ${
                  isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                }`}
              >
                {faq.q}
              </span>

              {/* Icon */}
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 mt-0.5 ${
                  isOpen
                    ? "border-df-red/60 bg-df-red/10 text-df-red rotate-45"
                    : "border-white/15 text-df-muted group-hover:border-white/25 group-hover:text-white/60"
                }`}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-3.5 w-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="8" y1="2" x2="8" y2="14" />
                  <line x1="2" y1="8" x2="14" y2="8" />
                </svg>
              </span>
            </button>

            {/* Answer panel */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 pl-16 text-sm leading-relaxed text-df-muted">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
