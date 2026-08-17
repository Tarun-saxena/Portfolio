"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export function ThemeAudioDock() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? (resolvedTheme || theme) === "dark" : true;

    const toggleTheme = () => {
        const isCurrentlyDark = document.documentElement.classList.contains("dark");
        const nextTheme = isCurrentlyDark ? "light" : "dark";
        setTheme(nextTheme);
    };

    const toggleAudio = () => {
        if (!iframeRef.current || !iframeRef.current.contentWindow) return;
        if (isPlaying) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
                "*"
            );
            setIsPlaying(false);
        } else {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: "playVideo", args: [] }),
                "*"
            );
            setIsPlaying(true);
        }
    };

    return (
        <aside className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center p-1 rounded-2xl border border-zinc-300/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#141416]/80 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/60 transition-all duration-300 select-none">
            {/* Hidden YouTube Iframe Audio Player for loO-KqvSZ6U */}
            <iframe
                ref={iframeRef}
                className="hidden pointer-events-none w-0 h-0 absolute opacity-0"
                src="https://www.youtube-nocookie.com/embed/loO-KqvSZ6U?enablejsapi=1&autoplay=0&loop=1&playlist=loO-KqvSZ6U"
                title="Background Music Player"
                allow="autoplay"
            />

            {/* Top Button: Theme Toggle (Rounded Square) */}
            <button
                onClick={toggleTheme}
                type="button"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-transparent hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer text-zinc-800 dark:text-zinc-200 active:scale-95"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle theme"
            >
                {isDark ? (
                    /* Moon Icon matching reference image */
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-zinc-800 dark:text-zinc-200"
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                ) : (
                    /* Sun Icon */
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-zinc-800 dark:text-zinc-200"
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                )}
            </button>

            {/* Middle Button: Book A Meet (Calendar Check) */}
            <a
                href="https://cal.com/tarun-saxena/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-transparent hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer text-zinc-800 dark:text-zinc-200 active:scale-95"
                title="Book A Meet"
                aria-label="Book A Meet"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-zinc-800 dark:text-zinc-200"
                >
                    <path d="M8 2v4M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="4" />
                    <path d="M3 10h18" />
                    <path d="m9 16 2 2 4-4" />
                </svg>
            </a>

            {/* Bottom Button: Sound Bars Audio (Rounded Square) */}
            <button
                onClick={toggleAudio}
                type="button"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-transparent hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer text-zinc-800 dark:text-zinc-200 active:scale-95"
                title={isPlaying ? "Pause Music" : "Play Music"}
                aria-label="Toggle background music"
            >
                <div className="flex items-end gap-[3px] h-4 px-0.5">
                    <span
                        className={`w-[2.5px] rounded-full bg-zinc-800 dark:bg-zinc-200 ${
                            isPlaying ? "animate-[bounce_0.8s_infinite_100ms] h-full" : "h-2/5"
                        }`}
                    />
                    <span
                        className={`w-[2.5px] rounded-full bg-zinc-800 dark:bg-zinc-200 ${
                            isPlaying ? "animate-[bounce_0.8s_infinite_300ms] h-full" : "h-full"
                        }`}
                    />
                    <span
                        className={`w-[2.5px] rounded-full bg-zinc-800 dark:bg-zinc-200 ${
                            isPlaying ? "animate-[bounce_0.8s_infinite_200ms] h-full" : "h-3/5"
                        }`}
                    />
                    <span
                        className={`w-[2.5px] rounded-full bg-zinc-800 dark:bg-zinc-200 ${
                            isPlaying ? "animate-[bounce_0.8s_infinite_400ms] h-full" : "h-4/5"
                        }`}
                    />
                    <span
                        className={`w-[2.5px] rounded-full bg-zinc-800 dark:bg-zinc-200 ${
                            isPlaying ? "animate-[bounce_0.8s_infinite_150ms] h-full" : "h-3/5"
                        }`}
                    />
                </div>
            </button>
        </aside>
    );
}

