import React from "react";
import VisitorCounter from "./VisitorCounter";

export function Footer() {
    return (
        <footer className="w-full relative select-none font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {/* Structural Main Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6 border-b border-[var(--border)] relative">
                {/* Left: Copyright */}
                <div className="text-zinc-800 dark:text-zinc-200 font-medium">
                    &copy; {new Date().getFullYear()} Tarun Saxena
                </div>

                {/* Center: Location */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    <span>DELHI, INDIA</span>
                </div>

                {/* Right: Social Links */}
                <div className="flex items-center gap-4 text-xs font-sans">
                    <a
                        href="https://github.com/Tarun-saxena"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://x.com/Tarun__Saxena"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
                    >
                        X
                    </a>
                    <a
                        href="https://www.linkedin.com/in/tarun-saxena-aa46a523a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="mailto:tarunsaxena1712@gmail.com"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
                    >
                        Email
                    </a>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
                    >
                        Resume
                    </a>
                </div>
            </div>

            {/* Bottom Row: / END on Left, Visitor Counter on Right (below social links) */}
            <div className="py-6 flex items-center justify-between gap-4 text-[15px] text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">
                <span>/ END</span>
                <VisitorCounter />
            </div>
        </footer>
    );
}
