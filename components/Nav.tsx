"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Nav() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? (resolvedTheme || theme) === "dark" : true;

    const toggleTheme = () => {
        const isCurrentlyDark = document.documentElement.classList.contains("dark");
        const nextTheme = isCurrentlyDark ? "light" : "dark";
        setTheme(nextTheme);
    };

    return (
        <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm transition-colors duration-200">
            <div className="max-w-[1000px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
                <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Tarun
                </span>
                {/* Nav links + Theme toggle - Right */}
                <nav className="flex items-center gap-6 md:gap-8">
                    <a href="#home" className="text-sm font-medium text-zinc-900 dark:text-white relative py-1">
                        Home
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                    </a>
                    <a
                        href="#projects"
                        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition py-1"
                    >
                        Projects
                    </a>
                    <a
                        href="#open-source"
                        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition py-1"
                    >
                        Open Source
                    </a>
                    <a
                        href="#skills"
                        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition py-1"
                    >
                        Skills
                    </a>

                    {/* Theme toggle button */}
                    <button
                        onClick={toggleTheme}
                        type="button"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                        aria-label="Toggle theme"
                        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDark ? (
                            /* Sun icon (currently dark mode, click to switch to light mode) */
                            <svg className="w-4.5 h-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        ) : (
                            /* Moon icon (currently light mode, click to switch to dark mode) */
                            <svg className="w-4.5 h-4.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
}
