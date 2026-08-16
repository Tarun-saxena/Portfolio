import React from "react";
import { Crosshair } from "./ui/Primitives";

export function Footer() {
    return (
        <footer className="w-full relative select-none font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {/* Structural Main Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6 border-b border-[var(--border)] relative">
                {/* Left: Copyright */}
                <div className="text-zinc-800 dark:text-zinc-200 font-medium">
                    &copy; {new Date().getFullYear()} Tarun Saxena
                </div>

                {/* Technical Metadata */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    <span>DELHI, INDIA</span>
                    <span>•</span>
                    <span>BUILT WITH NEXT.JS</span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 text-xs font-sans">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="mailto:tarunsaxena.dev@gmail.com"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
                    >
                        Email
                    </a>
                </div>

                {/* Intentional Crosshair at Top Right Border Intersection */}
                <Crosshair className="-top-[5px] -right-[5px]" />
            </div>

            {/* Bottom Row: Quiet Document End Marker */}
            <div className="py-6 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">
                <span>/ END</span>
                <span>DOCUMENT_VERIFIED // 2026</span>
            </div>
        </footer>
    );
}
