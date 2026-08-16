"use client";

import React from "react";
import { SectionHeader } from "./ui/Primitives";

export function ContactSection() {
    return (
        <div className="w-full">
            <SectionHeader index="06 / CONTACT" title="Contact" />

            {/* Developer-Oriented Prompt */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed mb-8">
                Have a project, bug, idea or open-source collaboration in mind?
            </p>

            {/* Two-Column Contact Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left Column: Direct Technical Links & CTA */}
                <div className="flex flex-col justify-between gap-6 border border-[var(--border)] bg-[var(--card-bg)] rounded-lg p-6">
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wider uppercase border-b border-[var(--border)] pb-2.5 select-none">
                            DIRECT CHANNELS
                        </span>

                        <div className="flex flex-col gap-3 font-mono text-xs">
                            <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                                <span className="text-zinc-400 dark:text-zinc-500 uppercase">EMAIL</span>
                                <a
                                    href="mailto:tarunsaxena.dev@gmail.com"
                                    className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 transition"
                                >
                                    tarunsaxena.dev@gmail.com
                                </a>
                            </div>

                            <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                                <span className="text-zinc-400 dark:text-zinc-500 uppercase">GITHUB</span>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 transition"
                                >
                                    github.com →
                                </a>
                            </div>

                            <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                                <span className="text-zinc-400 dark:text-zinc-500 uppercase">LINKEDIN</span>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 transition"
                                >
                                    linkedin.com →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Simple Clean CTA Button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <a
                            href="mailto:tarunsaxena.dev@gmail.com"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-900 font-mono text-xs font-semibold hover:opacity-90 transition cursor-pointer shrink-0"
                        >
                            <span>GET IN TOUCH</span>
                            <span>→</span>
                        </a>

                        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 uppercase select-none">
                            DELHI, INDIA // UTC+5:30
                        </span>
                    </div>
                </div>

                {/* Right Column: Decorative Terminal Prompt Panel */}
                <div className="border border-[var(--border)] bg-zinc-950 dark:bg-black rounded-lg p-5 font-mono text-xs text-zinc-300 shadow-inner select-none flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-zinc-400">
                        <span className="text-zinc-300 font-bold">tarun@dev ~ $</span>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] text-emerald-400">ACTIVE</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 text-zinc-400 leading-relaxed">
                        <p className="text-emerald-400">ready_to_build=true</p>
                        <p className="text-emerald-400">open_source=true</p>
                        <p className="text-emerald-400">coffee_required=true</p>
                    </div>

                    <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                            STATUS // AVAILABLE FOR
                        </span>
                        <div className="flex flex-wrap gap-2 text-zinc-200">
                            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px]">
                                OPEN SOURCE
                            </span>
                            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px]">
                                INTERNSHIPS
                            </span>
                            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px]">
                                COLLABORATION
                            </span>
                        </div>
                    </div>

                    <div className="pt-1 text-emerald-400 font-bold animate-pulse">_</div>
                </div>
            </div>
        </div>
    );
}

