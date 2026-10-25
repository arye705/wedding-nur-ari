"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Pause } from "lucide-react";

import WeddingCover from "@/components/sections/WeddingCover";
import OpeningSection from "@/components/sections/OpeningSection";
import CoupleSection from "@/components/sections/CoupleSection";
import EventSection from "@/components/sections/EventSection";
import GallerySection from "@/components/sections/GallerySection";
import GiftSection from "@/components/sections/GiftSection";
import WishesSection from "@/components/sections/WishesSection";

export default function HomePage() {
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  async function handleOpen() {
    // Mulai musik langsung dari klik Buka Undangan
    const audio = audioRef.current;

    if (audio) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Musik gagal diputar:", error);
      }
    }

    setOpened(true);
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Musik gagal diputar:", error);
      }
    } else {
      audio.pause();
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bermuara.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {!opened ? (
        <WeddingCover onOpen={handleOpen} />
      ) : (
        <motion.main
          id="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="min-h-screen overflow-hidden bg-[var(--ivory)]"
        >
          <OpeningSection />
          <CoupleSection />
          <EventSection />
          <GallerySection />
          <GiftSection />
          <WishesSection />

          <footer className="border-t border-[var(--line)] px-5 py-10 text-center">
            <p className="font-display text-3xl text-[var(--dark-brown)]">
              Nur <span className="italic">&</span> Ari
            </p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
              7 Desember 2026
            </p>
          </footer>

          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? "Pause musik" : "Play musik"}
            title={isPlaying ? "Pause musik" : "Play musik"}
            className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--ivory)] text-[var(--dark-brown)] shadow-lg transition-transform hover:scale-105"
          >
            {isPlaying ? <Pause size={18} /> : <Music2 size={19} />}
          </button>
        </motion.main>
      )}
    </>
  );
}
