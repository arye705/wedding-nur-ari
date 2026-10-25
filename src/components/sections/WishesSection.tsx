"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  RefreshCw,
  Send,
  X,
} from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyXx5VFDvKhzFD7fAjdJpEAUD3laOsvRH-XZWIj0nzblJ2FCkD1Cd6JEIsS9oQb_Cgx/exec";

type Attendance = "Hadir" | "Tidak hadir";

type Wish = {
  id: string;
  timestamp: string;
  name: string;
  attendance: Attendance;
  message: string;
};

type ApiResponse = {
  success: boolean;
  wishes?: Wish[];
  message?: string;
};

const C = {
  bg: "#FBF7F2",
  surface: "#FFFCF9",
  text: "#49352B",
  muted: "#8B7669",
  accent: "#795541",
  border: "#E9DED4",
  soft: "#F3E9E0",
  success: "#426B50",
  successBg: "#EDF5EE",
  error: "#A64B3C",
  errorBg: "#FFF2EE",
};

function readWishes(): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    const callback = `wishes_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const script = document.createElement("script");
    let finished = false;

    const cleanup = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);
      script.remove();
      delete (window as unknown as Record<string, unknown>)[callback];
    };

    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Koneksi ucapan tidak merespons."));
    }, 15000);

    (window as unknown as Record<string, unknown>)[callback] = (
      data: ApiResponse,
    ) => {
      cleanup();

      if (!data || typeof data.success !== "boolean") {
        reject(new Error("Respons server tidak valid."));
        return;
      }

      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Ucapan gagal dimuat. Periksa Apps Script."));
    };

    script.src = `${SCRIPT_URL}?${new URLSearchParams({
      callback,
      t: String(Date.now()),
    })}`;

    script.async = true;
    document.body.appendChild(script);
  });
}

function formatDate(value: string) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function WishesSection() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [notice, setNotice] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadWishes = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);

    try {
      const result = await readWishes();

      if (!result.success) {
        throw new Error(result.message || "Gagal memuat ucapan.");
      }

      setWishes(Array.isArray(result.wishes) ? result.wishes : []);
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Ucapan gagal dimuat.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWishes(true);
  }, [loadWishes]);

  useEffect(() => {
    if (!selectedWish) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedWish(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedWish]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !attendance || !cleanMessage) {
      setNotice({
        type: "error",
        text: "Lengkapi nama, kehadiran, dan ucapan terlebih dahulu.",
      });
      return;
    }

    if (cleanName.length > 80 || cleanMessage.length > 500) {
      setNotice({
        type: "error",
        text: "Nama maksimal 80 karakter dan ucapan maksimal 500 karakter.",
      });
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      const before = await readWishes();

      if (!before.success) {
        throw new Error("Daftar ucapan belum dapat diverifikasi.");
      }

      const previousIds = new Set((before.wishes || []).map((wish) => wish.id));

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          action: "submit",
          name: cleanName,
          attendance,
          message: cleanMessage,
        }),
      });

      let saved = false;
      let latestWishes: Wish[] = [];

      for (let attempt = 0; attempt < 8; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const result = await readWishes();
        if (!result.success) continue;

        latestWishes = result.wishes || [];

        saved = latestWishes.some(
          (wish) =>
            !previousIds.has(wish.id) &&
            wish.name.trim() === cleanName &&
            wish.message.trim() === cleanMessage &&
            wish.attendance === attendance,
        );

        if (saved) break;
      }

      setWishes(latestWishes);

      if (!saved) {
        setNotice({
          type: "error",
          text: "Ucapan belum terverifikasi tersimpan. Periksa Google Sheets.",
        });
        return;
      }

      setName("");
      setAttendance("");
      setMessage("");

      setNotice({
        type: "success",
        text: "Ucapan berhasil dikirim.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Gagal mengirim ucapan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    borderColor: C.border,
    color: C.text,
    background: "#FFFFFF",
  };

  return (
    <section
      id="ucapan"
      className="px-4 py-10 sm:px-6 sm:py-12"
      style={{ background: C.bg, color: C.text }}
    >
      <div className="mx-auto w-full max-w-2xl">
        {/* Section heading */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center sm:mb-7"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-[#FFFCF7] text-[#855A43] shadow-[0_4px_14px_rgba(81,55,45,0.07)]">
            <MessageCircle size={17} strokeWidth={1.3} />
          </div>

          <p
            className="mt-3 text-[9px] font-medium uppercase tracking-[0.22em]"
            style={{ color: "#96664E" }}
          >
            A Note of Love
          </p>

          <h2 className="mt-1.5 font-display text-3xl leading-tight text-[#704936] sm:text-4xl">
            Ucapan &amp; Doa
          </h2>

          <p className="mx-auto mt-2.5 max-w-none text-[12px] leading-5 sm:text-[13px]">
            Doa dan harapan terbaik Anda merupakan hadiah terindah bagi Nur &
            Ari.
          </p>

          <div
            className="mx-auto mt-4 h-px w-8"
            style={{ background: C.accent }}
          />
        </motion.header>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border p-4 sm:p-5"
          style={{
            background: C.surface,
            borderColor: C.border,
            boxShadow: "0 8px 26px rgba(91,65,46,0.035)",
          }}
        >
          <div className="mb-4 flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: C.soft, color: C.accent }}
            >
              <MessageCircle size={15} strokeWidth={1.3} />
            </div>

            <div>
              <h3 className="font-display text-lg leading-tight text-[#704936]">
                Kirim Ucapan
              </h3>

              <p className="mt-0.5 text-[12px] leading-5 text-[#765746]">
                Setiap doa berarti bagi kami.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label
                htmlFor="wish-name"
                className="mb-1.5 block text-[12px] font-normal leading-5"
              >
                Nama lengkap
              </label>

              <input
                id="wish-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Masukkan nama Anda"
                maxLength={80}
                autoComplete="name"
                disabled={isSubmitting}
                required
                className="w-full rounded-lg border px-3 py-2.5 text-[13px] font-normal leading-5 outline-none transition placeholder:text-[#B49E8D] focus:border-[#795541] focus:ring-2 focus:ring-[#795541]/10 disabled:opacity-60"
                style={inputStyle}
              />
            </div>

            <fieldset>
              <legend className="mb-1.5 block text-[12px] font-normal leading-5">
                Konfirmasi kehadiran
              </legend>

              <div className="grid grid-cols-2 gap-2.5">
                {(["Hadir", "Tidak hadir"] as Attendance[]).map((option) => {
                  const selected = attendance === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      disabled={isSubmitting}
                      onClick={() => setAttendance(option)}
                      className="min-h-9 rounded-lg border px-3 py-2 text-[13px] font-normal leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795541] focus-visible:ring-offset-2 disabled:opacity-60"
                      style={{
                        background: selected ? C.accent : "#FFFFFF",
                        borderColor: selected ? C.accent : C.border,
                        color: selected ? "#FFFFFF" : C.text,
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <label
                  htmlFor="wish-message"
                  className="text-[12px] font-normal leading-5"
                >
                  Ucapan dan doa
                </label>

                <span
                  className="text-[11px] font-normal tabular-nums"
                  style={{ color: C.muted }}
                >
                  {message.length}/500
                </span>
              </div>

              <textarea
                id="wish-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tuliskan doa dan harapan terbaik..."
                maxLength={500}
                rows={3}
                disabled={isSubmitting}
                required
                className="w-full resize-y rounded-lg border px-3 py-2.5 text-[13px] font-normal leading-6 outline-none transition placeholder:text-[#B49E8D] focus:border-[#795541] focus:ring-2 focus:ring-[#795541]/10 disabled:opacity-60"
                style={{ ...inputStyle, minHeight: 84 }}
              />
            </div>

            <AnimatePresence mode="wait">
              {notice && (
                <motion.div
                  key={notice.text}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  role="status"
                  aria-live="polite"
                  className="flex items-start gap-2 rounded-lg border px-3 py-2.5 text-[12px] font-normal leading-[1.65] sm:text-[13px]"
                  style={{
                    background:
                      notice.type === "success" ? C.successBg : C.errorBg,
                    borderColor:
                      notice.type === "success" ? "#D5E7D8" : "#F0CCC2",
                    color: notice.type === "success" ? C.success : C.error,
                  }}
                >
                  {notice.type === "success" ? (
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  )}
                  <span>{notice.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.09em] text-white transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795541] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              style={{ background: C.accent, color: "#FFFFFF" }}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={14} className="animate-spin" />
                  <span>Menyimpan ucapan...</span>
                </>
              ) : (
                <>
                  <Send size={14} strokeWidth={1.4} />
                  <span>Kirim Ucapan</span>
                </>
              )}
            </button>

            <p
              className="pt-0.5 text-center text-[11px] font-normal leading-5"
              style={{ color: C.muted }}
            >
              Terima kasih telah menjadi bagian dari kebahagiaan kami.
            </p>
          </form>
        </motion.div>

        {/* Wishes list */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-9"
        >
          <div
            className="flex items-center justify-between gap-3 border-b pb-4"
            style={{ borderColor: C.border }}
          >
            <div>
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#96664E]">
                With Warm Wishes
              </p>

              <h3 className="font-display text-2xl leading-tight text-[#704936] sm:text-2xl">
                Doa dari Anda
              </h3>

              <p className="mt-1 text-[12px] leading-5 text-[#765746] sm:text-[13px]">
                Pesan hangat untuk Nur &amp; Ari
              </p>
            </div>

            <button
              type="button"
              aria-label="Muat ulang ucapan"
              title="Muat ulang ucapan"
              onClick={() => void loadWishes(true)}
              disabled={isLoading || isSubmitting}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition hover:bg-[#F3E9E0] disabled:opacity-60"
              style={{ borderColor: C.border, color: C.text }}
            >
              <RefreshCw
                size={14}
                className={isLoading ? "animate-spin" : ""}
              />
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {isLoading ? (
              <div
                className="flex items-center justify-center gap-2 rounded-xl border px-4 py-8 text-[13px] font-normal"
                style={{
                  background: C.surface,
                  borderColor: C.border,
                  color: C.muted,
                }}
              >
                <LoaderCircle size={16} className="animate-spin" />
                Memuat ucapan...
              </div>
            ) : wishes.length === 0 ? (
              <div
                className="flex flex-col items-center rounded-xl border border-dashed px-5 py-8 text-center sm:py-9"
                style={{ borderColor: C.border }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border"
                  style={{ borderColor: C.border, color: C.accent }}
                >
                  <BookOpen size={17} strokeWidth={1.3} />
                </div>

                <h4 className="mt-3 font-display text-xl leading-tight text-[#704936]">
                  Jadilah yang pertama
                </h4>

                <p
                  className="mt-2 max-w-sm text-[13px] font-normal leading-[1.75]"
                  style={{ color: C.muted }}
                >
                  Belum ada ucapan yang ditampilkan. Kirimkan doa terbaikmu
                  untuk Nur &amp; Ari.
                </p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {wishes.slice(0, visibleCount).map((wish, index) => (
                  <motion.article
                    key={wish.id || `${wish.name}-${wish.timestamp}-${index}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Baca ucapan dari ${wish.name}`}
                    onClick={() => setSelectedWish(wish)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedWish(wish);
                      }
                    }}
                    className="group cursor-pointer rounded-xl border p-3.5 outline-none transition duration-200 hover:-translate-y-0.5 hover:border-[#D5BDAA] hover:shadow-[0_8px_24px_rgba(91,65,46,0.07)] focus-visible:ring-2 focus-visible:ring-[#795541] focus-visible:ring-offset-2 sm:p-4"
                    style={{
                      background: C.surface,
                      borderColor: C.border,
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-base"
                        style={{ background: C.soft, color: C.accent }}
                      >
                        {(wish.name || "?").trim().charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <h4
                            className="break-words text-[13px] font-medium leading-5 sm:text-[14px]"
                            style={{ color: C.text }}
                          >
                            {wish.name}
                          </h4>

                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-normal leading-4"
                            style={{
                              background:
                                wish.attendance === "Hadir"
                                  ? C.successBg
                                  : C.soft,
                              color:
                                wish.attendance === "Hadir"
                                  ? C.success
                                  : C.muted,
                            }}
                          >
                            {wish.attendance}
                          </span>
                        </div>

                        <p
                          className="mt-0.5 text-[10px] font-normal leading-4"
                          style={{ color: C.muted }}
                        >
                          {formatDate(wish.timestamp)}
                        </p>

                        <p
                          className="mt-2 whitespace-pre-wrap break-words text-[13px] font-normal leading-[1.75] sm:text-[14px]"
                          style={{ color: C.text }}
                        >
                          {wish.message}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[10px] tracking-wide text-[#9A7A65] opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                          Baca ucapan <span aria-hidden="true">↗</span>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            )}
          </div>

          {!isLoading && wishes.length > 0 && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-[11px] leading-4 text-[#8B7669]">
                Menampilkan {Math.min(visibleCount, wishes.length)} dari{" "}
                {wishes.length} ucapan
              </p>

              {visibleCount < wishes.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((current) => current + 5)}
                  className="rounded-full border border-[#DCC9B8] bg-[#FFFCF9] px-4 py-2 text-[11px] font-medium text-[#704936] transition hover:bg-[#F3E9E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A77961] focus-visible:ring-offset-2"
                >
                  Tampilkan ucapan lainnya
                </button>
              )}

              {visibleCount > 5 && (
                <button
                  type="button"
                  onClick={() => {
                    setVisibleCount(5);
                    document.getElementById("ucapan")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="px-3 py-1 text-[11px] text-[#8B7669] underline underline-offset-4 transition hover:text-[#704936]"
                >
                  Tampilkan lebih sedikit
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Minimal quote modal */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#2D211B]/45 px-4 py-5 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedWish(null);
            }}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="wish-quote-name"
              aria-describedby="wish-quote-message"
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.99 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative my-auto w-full max-w-md rounded-2xl border px-5 py-7 text-center shadow-lg sm:px-7 sm:py-8"
              style={{ background: C.surface, borderColor: C.border }}
            >
              <button
                type="button"
                onClick={() => setSelectedWish(null)}
                aria-label="Tutup ucapan"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#F3E9E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795541]"
                style={{ color: C.accent }}
              >
                <X size={16} strokeWidth={1.5} />
              </button>

              <blockquote
                id="wish-quote-message"
                className="whitespace-pre-wrap break-words font-display text-lg leading-relaxed text-[#704936] sm:text-xl"
              >
                “{selectedWish.message}”
              </blockquote>

              <h3
                id="wish-quote-name"
                className="mt-5 font-display text-base leading-tight text-[#704936] sm:text-lg"
              >
                {selectedWish.name}
              </h3>

              <span
                className="mt-3 inline-flex rounded-full px-2.5 py-1 text-[10px] leading-4"
                style={{
                  background:
                    selectedWish.attendance === "Hadir" ? C.successBg : C.soft,
                  color:
                    selectedWish.attendance === "Hadir" ? C.success : C.muted,
                }}
              >
                {selectedWish.attendance}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
