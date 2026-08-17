"use client";

import { useEffect, useState, useRef } from "react";
import { Crosshair } from "./ui/Primitives";
import { NavigationMenuModal } from "./NavigationMenuModal";

const NAV_ITEMS = [
    { id: "home", label: "Home", href: "#home" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "open-source", label: "GitHub", href: "#open-source" },
];

export function Nav() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const [dotStyle, setDotStyle] = useState<{ left: number; opacity: number }>({ left: 0, opacity: 0 });

    useEffect(() => {
        const updateDotPosition = () => {
            if (!navRef.current) return;
            const activeEl = navRef.current.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement;
            if (activeEl) {
                const navRect = navRef.current.getBoundingClientRect();
                const activeRect = activeEl.getBoundingClientRect();
                const centerLeft = activeRect.left - navRect.left + activeRect.width / 2 - 2.5;
                setDotStyle({ left: centerLeft, opacity: 1 });
            }
        };

        updateDotPosition();
        window.addEventListener("resize", updateDotPosition);
        return () => window.removeEventListener("resize", updateDotPosition);
    }, [activeSection]);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;

            // 1. Force "open-source" (GitHub) active if at the very bottom of the document
            if (windowHeight + scrollY >= documentHeight - 30) {
                setActiveSection("open-source");
                return;
            }

            // 2. Iterate forward to activate whichever section has passed into upper 35% of viewport
            const navIds = ["home", "skills", "projects", "open-source"];
            let currentActive = "home";

            for (const id of navIds) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= windowHeight * 0.35) {
                        currentActive = id;
                    }
                }
            }

            setActiveSection(currentActive);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className="w-full border-b border-[var(--border)] bg-[#fafafa] dark:bg-[#090909] sticky top-0 z-40 transition-colors duration-200">
                <div className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 h-[52px] flex items-center justify-center relative">
                    {/* Left & Right 1px Vertical Boundary Lines through Navbar */}
                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[var(--border)] pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-[var(--border)] pointer-events-none" />

                    {/* Centered Navigation Links with Smooth Animated Dot */}
                    <nav ref={navRef} className="relative flex items-center gap-3 sm:gap-6 md:gap-8 py-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    data-nav-id={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`text-xs font-sans font-medium transition-colors py-1 ${isActive
                                        ? "text-zinc-900 dark:text-[#f5f5f5]"
                                        : "text-zinc-500 dark:text-[#888888] hover:text-zinc-900 dark:hover:text-[#f5f5f5]"
                                        }`}
                                >
                                    {item.label}
                                </a>
                            );
                        })}

                        {/* Smooth Sliding Active Dot Indicator */}
                        <span
                            className="absolute bottom-0 w-[5px] h-[5px] rounded-full bg-zinc-900 dark:bg-[#f5f5f5] transition-all duration-300 cubic-bezier(0.4,0,0.2,1) pointer-events-none"
                            style={{
                                transform: `translate3d(${dotStyle.left}px, 0, 0)`,
                                opacity: dotStyle.opacity,
                            }}
                        />
                    </nav>

                    {/* Right Side: Navigation Menu Button */}
                    <div className="absolute right-4 sm:right-6 md:right-8 flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/70 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 shadow-sm cursor-pointer"
                            title="Open Navigation Menu (K)"
                        >
                            <svg className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span>K</span>
                        </button>
                    </div>

                    {/* Corner Crosshair Markers anchored to the 1040px frame line intersections */}
                    <Crosshair className="-top-[5px] -left-[5px]" />
                    <Crosshair className="-top-[5px] -right-[5px]" />
                    <Crosshair className="-bottom-[5px] -left-[5px]" />
                    <Crosshair className="-bottom-[5px] -right-[5px]" />
                </div>
            </header>

            {/* Navigation Menu Modal */}
            <NavigationMenuModal
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onOpen={() => setIsMenuOpen(true)}
            />
        </>
    );
}


