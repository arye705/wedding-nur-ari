"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Gift } from "lucide-react";

const accounts = [
  {
    id: "bri",
    bank: "BRI",
    subtitle: "BANK RAKYAT INDONESIA",
    cardLabel: "BANK BRI",
    logo: "/images/bri.png",
    number: "229501006421508",
    displayNumber: "2295 0100 6421 508",
    name: "Nur Qamariah Helingo",
    theme: "brown",
  },
  {
    id: "sulselbar",
    bank: "Bank Sulselbar",
    subtitle: "BANK SULSELBAR",
    cardLabel: "BANK SULSELBAR",
    logo: "/images/sulselbar.png",
    number: "0772100000037171",
    displayNumber: "0772 1000 0003 7171",
    name: "Nur Qamariah Helingo",
    theme: "ivory",
  },
];

function CardLines({ brown }: { brown: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 260"
      preserveAspectRatio="xMidYMid slice"
      className={[
        "pointer-events-none absolute inset-0 h-full w-full",
        brown ? "text-[#F5DFC4]" : "text-[#A77961]",
      ].join(" ")}
      fill="none"
    >
      <circle
        cx="420"
        cy="0"
        r="165"
        stroke="currentColor"
        strokeOpacity="0.055"
      />
      <circle
        cx="420"
        cy="0"
        r="125"
        stroke="currentColor"
        strokeOpacity="0.045"
      />
      <path
        d="M-20 250C90 190 165 190 250 120C310 70 365 55 440 85"
        stroke="currentColor"
        strokeOpacity="0.045"
      />
    </svg>
  );
}

function FloralDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-3 text-[#B18A6B]"
    >
      <span className="h-px w-12 bg-[#C9A98D]/60 sm:w-16" />

      <svg
        viewBox="0 0 32 32"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 28V10" />
        <path d="M16 19C9 19 6 15 5 10C12 10 16 14 16 19Z" />
        <path d="M16 23C23 23 26 19 27 14C20 14 16 18 16 23Z" />
        <path d="M16 10C11 8 11 4 16 2C21 4 21 8 16 10Z" />
      </svg>

      <span className="h-px w-12 bg-[#C9A98D]/60 sm:w-16" />
    </div>
  );
}

export default function GiftSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();

  async function copyAccount(id: string, number: string) {
    try {
      await navigator.clipboard.writeText(number);

      setCopiedId(id);
      setCopyError(null);

      window.setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2000);
    } catch {
      setCopyError(
        "Nomor rekening belum berhasil disalin. Silakan salin secara manual.",
      );
    }
  }

  return (
    <section
      id="wedding-gift"
      className="relative isolate overflow-hidden bg-[#F5E9DC] px-5 py-12 sm:px-8 sm:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_15%,rgba(255,252,246,0.92),transparent_68%)]"
      />

      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-8 max-w-lg text-center sm:mb-10"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-[#FFFCF7] text-[#855A43] shadow-[0_4px_14px_rgba(81,55,45,0.07)]">
            <Gift size={18} strokeWidth={1.4} />
          </div>

          <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#96664E]">
            A Token of Love
          </p>

          <h2 className="mt-1.5 font-display text-4xl leading-tight text-[#704936] sm:text-5xl">
            Wedding Gift
          </h2>

          <p className="mx-auto mt-3 max-w-md text-[13px] leading-6 text-[#765746] sm:text-sm">
            Doa restu Anda merupakan hadiah terindah bagi kami. Namun, apabila
            ingin berbagi tanda kasih, Anda dapat mengirimkannya melalui
            rekening berikut.
          </p>
        </motion.header>

        {/* Bank cards */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {accounts.map((account, index) => {
            const brown = account.theme === "brown";
            const copied = copiedId === account.id;
            const logoFailed = failedLogos[account.id] === true;

            return (
              <motion.article
                key={account.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.42, delay: index * 0.07 }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                className="min-w-0"
              >
                <div
                  className={[
                    "relative isolate flex aspect-[1.64/1] min-h-[195px] flex-col justify-between overflow-hidden rounded-[17px] border p-5 shadow-[0_9px_22px_rgba(81,55,45,0.12)] transition-shadow duration-300 hover:shadow-[0_12px_26px_rgba(81,55,45,0.15)] sm:p-6",
                    brown
                      ? "border-[#9C785B] bg-gradient-to-br from-[#A17A5B] via-[#80563C] to-[#69432D] text-[#FFFCF7]"
                      : "border-white/90 bg-gradient-to-br from-[#FFFCF8] via-[#F8EFE4] to-[#EAD8C4] text-[#51372D]",
                  ].join(" ")}
                >
                  <CardLines brown={brown} />

                  {/* Logo asli dan nama bank di sudut kanan */}
                  <div className="relative flex min-h-10 items-center justify-between gap-3 sm:min-h-11">
                    <div className="flex min-w-0 max-w-[65%] items-center">
                      {!logoFailed ? (
                        <img
                          src={account.logo}
                          alt={`Logo ${account.bank}`}
                          onError={() =>
                            setFailedLogos((previous) => ({
                              ...previous,
                              [account.id]: true,
                            }))
                          }
                          className="block h-auto max-h-9 w-auto max-w-full object-contain object-left sm:max-h-10"
                        />
                      ) : (
                        <span
                          className={[
                            "font-display text-xl sm:text-2xl",
                            brown ? "text-white" : "text-[#51372D]",
                          ].join(" ")}
                        >
                          {account.bank}
                        </span>
                      )}
                    </div>

                    <span
                      className={[
                        "shrink-0 text-right text-[7px] font-semibold uppercase tracking-[0.12em] sm:text-[8px]",
                        brown ? "text-white/80" : "text-[#96664E]",
                      ].join(" ")}
                    >
                      {account.cardLabel}
                    </span>
                  </div>

                  {/* Nomor rekening */}
                  <div className="relative mt-3">
                    <p
                      className={[
                        "text-[8px] font-medium uppercase tracking-[0.19em]",
                        brown ? "text-white/75" : "text-[#96664E]",
                      ].join(" ")}
                    >
                      Nomor Rekening
                    </p>

                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <p
                        className={[
                          "whitespace-nowrap font-sans text-[clamp(15px,2.25vw,21px)] font-semibold leading-tight tracking-[0.025em] tabular-nums",
                          brown ? "text-white" : "text-[#51372D]",
                        ].join(" ")}
                      >
                        {account.displayNumber}
                      </p>

                      <button
                        type="button"
                        onClick={() => copyAccount(account.id, account.number)}
                        aria-label={`Salin nomor rekening ${account.bank}`}
                        className={[
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A77961] focus-visible:ring-offset-2",
                          copied
                            ? "border-white/40 bg-white/25 text-white"
                            : brown
                              ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
                              : "border-[#D9C2AA] bg-white/50 text-[#704936] hover:bg-white/80",
                        ].join(" ")}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Nama pemilik rekening */}
                  <div
                    className={[
                      "relative mt-3 border-t pt-3",
                      brown ? "border-white/15" : "border-[#DCC9B8]/70",
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "text-[8px] font-medium uppercase tracking-[0.18em]",
                        brown ? "text-white/70" : "text-[#96664E]",
                      ].join(" ")}
                    >
                      Atas Nama
                    </p>

                    <p
                      className={[
                        "mt-1 font-display text-base leading-tight sm:text-lg",
                        brown ? "text-[#FFFCF7]" : "text-[#51372D]",
                      ].join(" ")}
                    >
                      {account.name}
                    </p>
                  </div>
                </div>

                {/* Tombol salin rekening */}
                <motion.button
                  type="button"
                  onClick={() => copyAccount(account.id, account.number)}
                  whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                  className={[
                    "mx-auto mt-3 flex min-h-9 w-[96%] items-center justify-center gap-2 rounded-full border px-3 py-2 text-[9px] font-medium uppercase tracking-[0.1em] shadow-[0_4px_10px_rgba(81,55,45,0.05)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A77961] focus-visible:ring-offset-2 sm:text-[10px]",
                    copied
                      ? "border-[#704936] bg-[#704936] text-white"
                      : "border-white/90 bg-[#FFF9F1] text-[#704936] hover:bg-white",
                  ].join(" ")}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Berhasil Disalin" : "Salin Nomor Rekening"}
                </motion.button>
              </motion.article>
            );
          })}
        </div>

        {/* Status salin */}
        <div aria-live="polite" className="mt-3 min-h-4 text-center">
          <AnimatePresence mode="wait">
            {copyError && (
              <motion.p
                key="copy-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] text-[#855A43]"
              >
                {copyError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Penutup */}
        <motion.footer
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-5 max-w-lg text-center"
        >
          <FloralDivider />

          <p className="mt-4 font-display text-lg italic leading-relaxed text-[#855A43] sm:text-xl">
            Terima kasih atas doa, perhatian, dan kasih sayang yang diberikan
            kepada kami.
          </p>

          <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#96664E]">
            With love, Nur & Ari
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
