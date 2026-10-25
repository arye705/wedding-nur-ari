"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { wedding } from "@/data/wedding";

export default function CoupleSection() {
  const reduceMotion = useReducedMotion();

  const people = [
    {
      role: "The Groom",
      name: wedding.groom.name,
      father: wedding.groom.father,
      mother: wedding.groom.mother,
      image: "/images/groom.jpg",
      delay: 0,
    },
    {
      role: "The Bride",
      name: wedding.bride.name,
      father: wedding.bride.father,
      mother: wedding.bride.mother,
      image: "/images/bride.jpg",
      delay: 0.12,
    },
  ];

  return (
    <section
      id="couple"
      className="relative overflow-hidden bg-[#F0E5DC] px-4 py-10 sm:px-6 sm:py-14"
    >
      <div className="relative mx-auto max-w-3xl">
        {/* HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-7 text-center sm:mb-9"
        >
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#96664E] sm:text-[10px] sm:tracking-[0.28em]">
            Two Hearts, One Promise
          </p>

          <h2 className="font-display text-[30px] leading-tight text-[#704936] sm:text-4xl md:text-5xl">
            Mengenal lebih dekat
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-[#765746] sm:text-[13px]">
            Dua cerita, dua pribadi, kini melangkah bersama menuju perjalanan
            seumur hidup.
          </p>
        </motion.div>

        {/* POLAROID GRID */}
        <div className="mx-auto grid max-w-xl grid-cols-2 items-stretch gap-3 sm:gap-7">
          {people.map((person) => (
            <motion.article
              key={person.role}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: person.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              className="flex min-w-0"
            >
              <div className="flex h-full w-full flex-col bg-[#FFFCF8] p-1.5 pb-3 shadow-[0_8px_22px_rgba(81,55,45,0.10)] transition-shadow duration-300 hover:shadow-[0_14px_28px_rgba(81,55,45,0.16)] sm:p-3 sm:pb-4">
                {/* PHOTO: IDENTICAL PROPORTIONS */}
                <div className="relative aspect-[4/4.5] shrink-0 overflow-hidden bg-[#E5D1C5]">
                  <Image
                    src={person.image}
                    alt={`Foto ${person.name}`}
                    fill
                    sizes="(max-width: 640px) 44vw, 280px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* CAPTION */}
                <div className="flex flex-1 flex-col px-0.5 pt-2.5 text-center sm:px-1 sm:pt-3">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#A16F55] sm:text-[9px] sm:tracking-[0.22em]">
                    {person.role}
                  </p>

                  {/* Reserve equal space for both names */}
                  <div className="mt-1 flex min-h-[42px] items-center justify-center sm:min-h-[52px]">
                    <h3 className="w-full break-words font-display text-[16px] leading-[1.25] text-[#704936] sm:text-xl">
                      {person.name}
                    </h3>
                  </div>

                  <div className="mx-auto my-2 h-px w-6 shrink-0 bg-[#B17D63]/70" />

                  {/* Keep family details aligned */}
                  <div className="text-[9px] leading-[1.65] text-[#51372D] sm:text-[11px] sm:leading-5">
                    <p>
                      {person.role === "The Groom"
                        ? "Putra dari"
                        : "Putri dari"}
                    </p>

                    <p className="mt-1 font-medium">Bapak {person.father}</p>

                    <p className="font-medium">dan Ibu {person.mother}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* VERSE */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mx-auto mt-8 max-w-md text-center sm:mt-10"
        >
          <div className="mx-auto mb-3 h-px w-10 bg-[#B17D63]/70" />

          <p className="font-display text-[16px] italic leading-[1.75] text-[#704936] sm:text-xl">
            “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri.”
          </p>

          <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#96664E]">
            Ar-Rum · 21
          </p>

          <a
            href="#events"
            className="group mt-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#855A43] transition-colors hover:text-[#A16F55] sm:mt-5 sm:text-[10px]"
          >
            Detail acara
            <ArrowDown
              size={13}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
