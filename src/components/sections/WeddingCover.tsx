"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { wedding } from "@/data/wedding";

type WeddingCoverProps = {
  onOpen: () => void;
};

export default function WeddingCover({ onOpen }: WeddingCoverProps) {
  const reduceMotion = useReducedMotion();
  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get("to")?.trim();

    if (recipient) {
      setGuestName(recipient.slice(0, 100));
    }
  }, []);

  const enterAnimation = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.65,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <main className="min-h-[100svh] overflow-hidden bg-[var(--ivory)]">
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        {/* Foto utama */}
        <motion.div
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                to bottom,
                rgba(247, 240, 233, 0) 0%,
                rgba(247, 240, 233, 0) 38%,
                rgba(247, 240, 233, 0.18) 47%,
                rgba(247, 240, 233, 0.65) 61%,
                rgba(247, 240, 233, 0.94) 75%,
                #F7F0E9 87%
              ),
              url("/images/hero.jpg")
            `,
            backgroundSize: "auto 100%",
            backgroundPosition: "center 0%",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#F7F0E9",
          }}
        />

        {/* Gradasi dinaikkan agar teks tidak tenggelam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[53%] bg-gradient-to-b from-transparent via-[#F7F0E9]/45 to-[#F7F0E9]"
        />

        {/* Konten cover */}
        <div className="relative z-10 mx-auto mt-auto flex min-h-[100svh] w-full max-w-xl flex-col items-center justify-end px-5 pb-7 pt-[43svh] text-center sm:pb-9 sm:pt-[46svh]">
          {/* Nama mempelai */}
          <motion.div {...enterAnimation(0.18)} className="w-full">
            <p className="text-[8px] font-medium uppercase tracking-[0.27em] text-[var(--dark-brown)] sm:text-[9px]">
              The wedding of
            </p>

            <h1 className="font-display mt-1.5 text-[3.3rem] leading-[0.94] tracking-[-0.045em] text-[var(--dark-brown)] sm:text-7xl">
              Nur <span className="italic">&</span> Ari
            </h1>

            <p className="font-display mx-auto mt-2 max-w-sm text-[11px] leading-relaxed text-[var(--dark-brown)] sm:text-sm">
              {wedding.bride.name}
              <span className="mx-1.5">&</span>
              {wedding.groom.name}
            </p>
          </motion.div>

          {/* Aksen minimalis */}
          <motion.div
            {...enterAnimation(0.28)}
            className="mt-3 flex items-center gap-2.5"
          >
            <span className="h-px w-7 bg-[#B58B75]/55" />
            <Heart size={11} strokeWidth={1.2} className="text-[#B58B75]" />
            <span className="h-px w-7 bg-[#B58B75]/55" />
          </motion.div>

          {/* Tanggal */}
          <motion.p
            {...enterAnimation(0.36)}
            className="mt-3 text-[8px] font-medium uppercase tracking-[0.17em] text-[var(--dark-brown)] sm:text-[10px] sm:tracking-[0.2em]"
          >
            {wedding.dateLabel}
          </motion.p>

          {/* Tombol buka undangan */}
          <motion.button
            type="button"
            onClick={onOpen}
            {...enterAnimation(0.45)}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="wedding-button mt-4 min-h-[43px] min-w-[158px] gap-2.5 px-5 text-[11px] shadow-[0_8px_22px_rgba(81,55,45,0.14)]"
          >
            <Mail size={14} strokeWidth={1.8} />
            <span>Buka Undangan</span>
          </motion.button>

          {/* Nama tamu */}
          <motion.div
            {...enterAnimation(0.52)}
            className="mt-3 max-w-full px-2"
          >
            <p className="text-[9px] text-[var(--muted)] sm:text-[10px]">
              Kepada Yth.
            </p>

            <p className="mt-0.5 max-w-[300px] break-words text-[11px] font-medium leading-relaxed text-[var(--dark-brown)] sm:text-xs">
              {guestName}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
