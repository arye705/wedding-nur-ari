"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

const photos = [
  {
    src: "/images/JAVA-153.jpg",
    alt: "Momen Nur dan Ari di alam terbuka",
    caption: "A beautiful beginning",
  },
  {
    src: "/images/JAVA-141.jpg",
    alt: "Portrait Nur dengan rangkaian bunga",
    caption: "Her graceful moment",
  },
  {
    src: "/images/JAVA-71.jpg",
    alt: "Momen bersama Nur dan Ari",
    caption: "Together with you",
  },
  {
    src: "/images/JAVA-145.jpg",
    alt: "Detail cincin pernikahan",
    caption: "A promise forever",
  },
  {
    src: "/images/JAVA-65.jpg",
    alt: "Potret Nur dan Ari",
    caption: "Our favorite memory",
  },
  {
    src: "/images/JAVA-80.jpg",
    alt: "Kenangan bersama keluarga",
    caption: "Surrounded by love",
  },
  {
    src: "/images/JAVA-43.jpg",
    alt: "Portrait Nur dalam busana acara",
    caption: "A day to remember",
  },
  {
    src: "/images/JAVA-143.jpg",
    alt: "Detail tangan dalam momen istimewa",
    caption: "A little detail of love",
  },
  {
    src: "/images/JAVA-116.jpg",
    alt: "Foto Nur dan Ari dengan dekorasi",
    caption: "You and me",
  },
  {
    src: "/images/JAVA-60.jpg",
    alt: "Foto bersama keluarga dan sahabat",
    caption: "Our loved ones",
  },
  {
    src: "/images/JAVA-97.jpg",
    alt: "Potret pasangan",
    caption: "Side by side",
  },
  {
    src: "/images/JAVA-99.jpg",
    alt: "Momen bersama Nur dan Ari",
    caption: "A memory to keep",
  },
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const closeLightbox = () => setActiveIndex(null);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % photos.length,
    );
  };

  const rotations = [-0.8, 0.6, 0.4, -0.5];

  return (
    <section id="gallery" className="bg-[#F0E5DC] px-4 py-10 sm:px-7 sm:py-14">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mb-7 text-center sm:mb-9"
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <Images size={13} className="text-[#96664E]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#96664E] sm:text-[10px]">
              Moments to Remember
            </p>
          </div>

          <h2 className="font-display text-4xl leading-tight text-[#704936] sm:text-5xl">
            Galeri Kenangan
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-[#765746] sm:text-sm">
            Potongan cerita dan kenangan indah dalam perjalanan Nur dan Ari.
          </p>
        </motion.div>

        {/* POLAROID GRID */}
        <div className="grid grid-cols-2 items-start gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-5 lg:grid-cols-4 lg:gap-x-5">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Lihat foto: ${photo.alt}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : (index % 4) * 0.04,
              }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              className="group min-w-0 bg-[#FFFCF8] p-1.5 pb-3 text-left shadow-[0_4px_14px_rgba(81,55,45,0.07)] transition-shadow duration-300 hover:shadow-[0_7px_19px_rgba(81,55,45,0.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A16F55] focus-visible:ring-offset-2"
              style={{
                rotate: reduceMotion ? 0 : rotations[index % rotations.length],
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#E5D1C5]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 23vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
              </div>

              <p className="mt-2.5 text-center font-display text-sm italic leading-tight text-[#754D3B] sm:text-base">
                {photo.caption}
              </p>

              <p className="mt-1 text-center text-[7px] font-medium uppercase tracking-[0.18em] text-[#96664E] sm:text-[8px]">
                Nur & Ari
              </p>
            </motion.button>
          ))}
        </div>

        <p className="mt-7 text-center text-[10px] text-[#855A43] sm:mt-8">
          Setiap momen menyimpan cerita yang berharga.
        </p>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#241812]/95 p-4 sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Galeri foto"
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Tutup galeri"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>

            <motion.div
              key={activeIndex}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.18 }}
              className="relative h-[70vh] max-h-[740px] w-full max-w-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                fill
                sizes="(max-width: 768px) 90vw, 600px"
                className="object-contain"
                priority
              />

              <div className="absolute -bottom-9 left-0 right-0 text-center">
                <p className="font-display text-lg italic text-white">
                  {photos[activeIndex].caption}
                </p>

                <p className="mt-1 text-[10px] tracking-[0.18em] text-white/70">
                  {activeIndex + 1} / {photos.length}
                </p>
              </div>
            </motion.div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Foto berikutnya"
              className="absolute right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
