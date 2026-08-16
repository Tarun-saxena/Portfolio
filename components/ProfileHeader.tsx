"use client";

import Image from "next/image";
import VisitorCounter from "./VisitorCounter";

export function ProfileHeader() {
    return (
        <div className="w-full">
            {/* Document Index Tag & Coordinates */}
            <div className="flex items-center justify-between font-mono text-xs tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-5 select-none">
                <span>01 / PROFILE</span>
                <span className="hidden sm:inline-block">N 28.61° E 77.21°</span>
            </div>

            {/* Layer 2: Developer Identity Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6">
                {/* Left: Avatar + Center Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    {/* Profile Avatar (12px rounded, 1px border) */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[12px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden shrink-0 border border-[var(--border)] transition duration-200">
                        <Image
                            src="/avatar.png"
                            alt="Tarun avatar"
                            fill
                            priority
                            sizes="(min-width: 640px) 128px, 112px"
                            className="object-cover"
                        />
                    </div>

                    {/* Center Identity Info */}
                    <div className="flex flex-col gap-1.5">
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-[40px] font-bold tracking-tight text-zinc-900 dark:text-white leading-none">
                            Tarun
                        </h1>

                        <p className="text-sm sm:text-base font-sans font-medium text-zinc-700 dark:text-zinc-300">
                            Full Stack Developer · DevOps-focused
                        </p>

                        <div className="flex items-center gap-2 text-xs sm:text-sm font-sans text-zinc-500 dark:text-zinc-400">
                            <span>19 · Delhi, India</span>
                            <span>•</span>
                            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">N 28.61° E 77.21°</span>
                        </div>
                    </div>
                </div>


                {/* Right: Compact Status Block & Visitor Counter */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 border-[var(--border)] pt-4 lg:pt-0 shrink-0">
                    <div className="flex flex-col gap-2 lg:text-right">
                        <div className="flex flex-col">
                            <span className="font-mono text-[10px] tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                                OPEN TO
                            </span>
                            <span className="font-sans text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                Internships / Open Source
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-mono text-[10px] tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                                STATUS
                            </span>
                            <div className="inline-flex items-center gap-1.5 lg:justify-end">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="font-sans text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Building
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Integrated Visitor Counter */}
                    <div className="pt-1">
                        <VisitorCounter />
                    </div>
                </div>
            </div>

            {/* Unique Touch: Technical Terminal Annotation Line */}
            <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/40 border border-[var(--border)] rounded-md px-3.5 py-2 my-2 select-none flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&gt;</span>
                <span>shipping backend systems one commit at a time.</span>
            </div>

            {/* Layer 3: Technical Metadata Row */}
            <div className="mt-6 pt-5 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-wider text-zinc-400 dark:text-zinc-500 uppercase select-none">
                        CURRENTLY BUILDING
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
                        Argus
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-wider text-zinc-400 dark:text-zinc-500 uppercase select-none">
                        FOCUS
                    </span>
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                        Backend Systems · DevOps · Open Source
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-wider text-zinc-400 dark:text-zinc-500 uppercase select-none">
                        STACK
                    </span>
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                        TypeScript · Node.js · PostgreSQL · Redis
                    </span>
                </div>
            </div>
        </div>
    );
}


