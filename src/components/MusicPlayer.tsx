"use client";

import { useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";

type MusicPlayerProps = {
  shouldPlay: boolean;
};

export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function startMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
    } catch (error) {
      console.error("Musik gagal diputar:", error);
      setIsPlaying(false);
    }
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void startMusic();
    } else {
      audio.pause();
    }
  }

  if (!shouldPlay) return null;

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

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause musik" : "Play musik"}
        title={isPlaying ? "Pause musik" : "Play musik"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--ivory)] text-[var(--dark-brown)] shadow-lg transition-transform hover:scale-105"
      >
        {isPlaying ? <Pause size={18} /> : <Music2 size={19} />}
      </button>
    </>
  );
}
