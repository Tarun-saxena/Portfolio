"use client";

import React from "react";
import { SectionHeader } from "./ui/Primitives";

export function AboutSection() {
    return (
        <div className="w-full">
            <SectionHeader index="02 / ABOUT" title="About" />

            <div className="flex flex-col gap-4 max-w-2xl">
                {/* Editorial Introduction Paragraphs */}
                <div className="flex flex-col gap-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
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
                            AWS (EC2, Nginx, PM2)
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
                </div>

                {/* Framed Engineering Principle Note */}
                <div className="p-3 sm:p-3.5 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 select-none flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold tracking-wider text-emerald-500 uppercase">
                            ENGINEERING PRINCIPLE
                        </span>
                    </div>
                    <p className="font-serif italic text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
                        &ldquo;Ship it end-to-end. Then make it better.&rdquo;
                    </p>
                </div>
            </div>
        </div>
    );
}



