"use client";

import React from "react";
import { SectionHeader } from "./ui/Primitives";

const FOCUS_AREAS = [
    "BACKEND SYSTEMS",
    "DEVOPS",
    "OPEN SOURCE",
    "DISTRIBUTED SYSTEMS",
];

export function AboutSection() {
    return (
        <div className="w-full">
            <SectionHeader index="02 / ABOUT" title="About" />

            {/* Desktop Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Editorial Introduction & Paragraphs */}
                <div className="lg:col-span-2 flex flex-col gap-5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                    <p>
                        I&apos;m a{" "}
                        <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">
                            19-year-old full stack developer
                        </strong>{" "}
                        based in Delhi, India, with a strong lean toward{" "}
                        <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">
                            backend systems and DevOps
                        </strong>{" "}
                        — I care as much about how something runs in production as how it works in code.
                    </p>

                    <p>
                        My core stack centers around{" "}
                        <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">
                            TypeScript, Next.js, Node.js/Express, PostgreSQL, Prisma, BullMQ, and Redis
                        </strong>
                        , typically structured as{" "}
                        <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">
                            Turborepo monorepos
                        </strong>
                        . I&apos;m building hands-on experience with{" "}
                        <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">
                            AWS (EC2, nginx, PM2)
                        </strong>{" "}
                        and general DevOps workflows — managing deployments, process orchestration, and production infrastructure basics.
                    </p>

                    <p>
                        Currently a student, I prioritize learning by building{" "}
                        <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">
                            real, production-style projects
                        </strong>{" "}
                        rather than toy applications.
                    </p>

                    {/* Unique Touch: Framed Engineering Principle Note */}
                    <div className="mt-2 p-4 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] select-none">
                        <div className="font-mono text-[10px] tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-1">
                            ENGINEERING PRINCIPLE
                        </div>
                        <p className="font-serif italic text-sm text-zinc-900 dark:text-zinc-100">
                            &ldquo;Ship it end-to-end. Then make it better.&rdquo;
                        </p>
                    </div>
                </div>

                {/* Right Column: Compact Engineering Focus Block */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="border border-[var(--border)] bg-[var(--card-bg)] rounded-lg p-5 flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                            <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wider uppercase">
                                ENGINEERING FOCUS
                            </span>
                            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                                CORE
                            </span>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            {FOCUS_AREAS.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2.5 font-mono text-xs text-zinc-700 dark:text-zinc-300"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


