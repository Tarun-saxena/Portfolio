"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Crosshair } from "./ui/Primitives";

const NAV_ITEMS = [
    { id: "home", label: "Home", href: "#home" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "open-source", label: "Open Source", href: "#open-source" },
    { id: "skills", label: "Skills", href: "#skills" },
];

export function Nav() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        setMounted(true);

        const sectionElements = NAV_ITEMS.map((item) =>
            document.getElementById(item.id)
        ).filter(Boolean) as HTMLElement[];

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const section = sectionElements[i];
                if (section.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isDark = mounted ? (resolvedTheme || theme) === "dark" : true;

    const toggleTheme = () => {
        const isCurrentlyDark = document.documentElement.classList.contains("dark");
        const nextTheme = isCurrentlyDark ? "light" : "dark";
        setTheme(nextTheme);
    };

    return (
        <header className="w-full border-b border-[var(--border)] bg-[#fafafa] dark:bg-[#090909] sticky top-0 z-40 transition-colors duration-200">
            <div className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 h-[60px] flex items-center justify-between relative">
                {/* Left: Logo / Personal Mark */}
                <div className="flex items-baseline gap-4">
                    <a
                        href="#home"
                        className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-white hover:opacity-90 transition select-none"
                    >
                        Tarun
                    </a>

                    {/* Subtle Technical Metadata (Desktop) */}
                    <span className="hidden md:inline-block font-mono text-[10px] tracking-widest text-zinc-400 dark:text-zinc-500 uppercase select-none">
                        BUILD 2026 // SYS.01
                    </span>
                </div>

                {/* Center / Right: Navigation Links + Theme Toggle */}
                <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                    <nav className="flex items-center gap-3 sm:gap-6 md:gap-7">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`relative text-xs sm:text-sm font-sans font-medium transition-colors py-1 ${
                                        isActive
                                            ? "text-zinc-900 dark:text-[#f5f5f5]"
                                            : "text-zinc-500 dark:text-[#888888] hover:text-zinc-900 dark:hover:text-[#f5f5f5]"
                                    }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-zinc-900 dark:bg-[#f5f5f5]" />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Far Right: Technical Theme Toggle (36px x 36px) */}
                    <button
                        onClick={toggleTheme}
                        type="button"
                        className="w-[36px] h-[36px] flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer shrink-0"
                        aria-label="Toggle theme"
                        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDark ? (
                            /* Sun Icon with minimal yellow accent */
                            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        ) : (
                            /* Moon Icon */
                            <svg className="w-4 h-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Corner Crosshair Markers anchored to the 1040px frame line intersection */}
                <Crosshair className="-bottom-[5px] -left-[5px]" />
                <Crosshair className="-bottom-[5px] -right-[5px]" />
            </div>
        </header>
    );
}


