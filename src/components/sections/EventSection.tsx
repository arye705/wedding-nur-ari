"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Clock3, MapPin, ArrowUpRight } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps?q=-2.0319297313690186,119.2894515991211&z=17&hl=id";

const VENUE_ADDRESS =
  "Lorong Pinrang Desa Tappilina, Kecamatan Topoyo, Kabupaten Mamuju Tengah, Sulawesi Barat";

const events = [
  {
    title: "Akad Nikah",
    time: "10.00 WITA",
    description: "Awal perjalanan kami dalam ikatan suci pernikahan.",
    subtitle: "The Ceremony",
  },
  {
    title: "Resepsi",
    time: "11.00 WITA",
    description: "Merayakan hari bahagia bersama keluarga dan sahabat.",
    subtitle: "The Celebration",
  },
];

export default function EventSection() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="events" className="bg-[#F7F0E9] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="text-center"
        >
          <motion.p
            variants={reveal}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#96664E]"
          >
            Save the Date
          </motion.p>

          <motion.h2
            variants={reveal}
            transition={{ duration: 0.6 }}
            className="mt-2 font-display text-4xl leading-tight text-[#704936] sm:text-5xl"
          >
            Hari Bahagia Kami
          </motion.h2>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.6 }}
            className="mt-4 inline-flex items-center gap-2 text-sm text-[#765746]"
          >
            <CalendarDays size={16} strokeWidth={1.7} />
            <span>Senin, 7 Desember 2026</span>
          </motion.div>
        </motion.div>

        {/* EVENT CARDS */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="group bg-[#FFFCF8] p-5 shadow-[0_5px_20px_rgba(81,55,45,0.045)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(81,55,45,0.10)] sm:p-6"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#96664E]">
                {event.subtitle}
              </p>

              <h3 className="mt-2 font-display text-3xl text-[#704936] sm:text-4xl">
                {event.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-[#765746]">
                {event.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-[#51372D]">
                <Clock3
                  size={16}
                  strokeWidth={1.7}
                  className="text-[#96664E]"
                />
                <span className="text-xs font-semibold">{event.time}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* LOCATION CARD */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={reveal}
          transition={{ duration: 0.7 }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          className="group relative mt-6 overflow-hidden border border-[#704936]/10 bg-[#FFFCF8] px-5 py-7 shadow-[0_6px_24px_rgba(81,55,45,0.045)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(81,55,45,0.09)] sm:mt-7 sm:px-8 sm:py-8"
        >
          {/* Subtle decorative accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#EBD7D1]/20 transition-colors duration-500 group-hover:bg-[#EBD7D1]/35"
          />

          <div className="relative text-center">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.07 }}
              transition={{ duration: 0.25 }}
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F0E9] text-[#704936]"
            >
              <MapPin size={19} strokeWidth={1.6} />
            </motion.div>

            <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#96664E]">
              Wedding Venue
            </p>

            <h3 className="mt-1 font-display text-3xl text-[#704936] sm:text-4xl">
              Lokasi Acara
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#51372D]">
              {VENUE_ADDRESS}
            </p>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-[#765746]">
              Buka lokasi melalui Google Maps untuk melihat titik acara dan
              mendapatkan petunjuk arah.
            </p>

            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="mt-5 inline-flex items-center gap-2 bg-[#704936] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FFFCF8] transition-colors duration-300 hover:bg-[#51372D]"
            >
              Buka Google Maps
              <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </motion.div>

        {/* CLOSING */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mt-9 text-center sm:mt-11"
        >
          <p className="font-display text-xl italic leading-relaxed text-[#704936] sm:text-2xl">
            Kehadiran dan doa restu Anda merupakan kebahagiaan bagi kami.
          </p>

          <p className="mt-2 text-[10px] text-[#96664E]">Nur & Ari</p>
        </motion.div>
      </div>
    </section>
  );
}