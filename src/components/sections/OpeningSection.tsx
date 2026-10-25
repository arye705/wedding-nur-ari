"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";

export default function OpeningSection() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="opening"
      className="relative overflow-hidden bg-[#F7F0E9] px-5 py-14 sm:px-8 sm:py-20 lg:py-24"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-10 h-72 w-72 rounded-full bg-[#E8C9BC]/25 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-12 lg:gap-16">
        {/* POLAROID PHOTO */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30, rotate: -3 }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: -1.5,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={reduceMotion ? undefined : { rotate: 0, y: -5 }}
          className="relative mx-auto w-full max-w-[310px] sm:max-w-[340px]"
        >
          {/* Soft shadow */}
          <div
            aria-hidden="true"
            className="absolute inset-3 translate-y-3 bg-[#75503E]/15 blur-xl"
          />

          {/* Polaroid paper */}
          <div className="relative bg-[#FFFCF8] p-2.5 pb-5 shadow-[0_12px_35px_rgba(81,55,45,0.12)] sm:p-3 sm:pb-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#EBD7D1]">
              <Image
                src="/images/hero.jpg"
                alt="Foto prewedding Nur dan Ari"
                fill
                priority
                sizes="(max-width: 768px) 85vw, 340px"
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.035]"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#39251E]/10 via-transparent to-white/5"
              />
            </div>

            {/* Handwritten-style editorial caption */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <span className="h-px w-5 bg-[#B17D63]/60" />
              <p className="font-display text-2xl italic tracking-wide text-[#754D3B] sm:text-[27px]">
                Nur & Ari
              </p>
              <span className="h-px w-5 bg-[#B17D63]/60" />
            </div>
          </div>

          <p className="mt-4 text-center text-[9px] font-medium uppercase tracking-[0.3em] text-[#966D57]">
            A day to remember
          </p>
        </motion.div>

        {/* EDITORIAL TEXT */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.13,
              },
            },
          }}
          className="text-center md:text-left"
        >
          <motion.p
            variants={reveal}
            transition={{ duration: 0.65 }}
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#A16F55] sm:text-[11px]"
          >
            The Beginning of Forever
          </motion.p>

          <motion.h2
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="font-display text-[39px] leading-[1.08] tracking-[-0.035em] text-[#704936] sm:text-5xl lg:text-[54px]"
          >
            Dua cerita,
            <br />
            <span className="italic text-[#A16F55]">satu perjalanan.</span>
          </motion.h2>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.6 }}
            className="mx-auto my-5 flex items-center gap-2 md:mx-0"
          >
            <span className="h-px w-10 bg-[#B17D63]" />
            <span className="h-1 w-1 rounded-full bg-[#B17D63]" />
          </motion.div>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-md text-[13px] leading-7 text-[#765746] sm:text-sm sm:leading-[1.9] md:mx-0"
          >
            Dengan penuh rasa syukur, kami mengundang Bapak/Ibu, Saudara/i untuk
            menjadi bagian dari hari istimewa kami, saat dua hati dipersatukan
            dalam ikatan pernikahan.
          </motion.p>

          {/* DATE CARD */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-7 max-w-sm border-y border-[#B17D63]/30 py-5 md:mx-0"
          >
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <CalendarDays
                size={16}
                strokeWidth={1.6}
                className="text-[#A16F55]"
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#966D57]">
                Save the Date
              </span>
            </div>

            <p className="mt-2.5 font-display text-[29px] tracking-wide text-[#704936] sm:text-3xl">
              07 <span className="text-[#B17D63]">·</span> 12{" "}
              <span className="text-[#B17D63]">·</span> 2026
            </p>

            <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#966D57]">
              Senin · 10.00 WITA
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
