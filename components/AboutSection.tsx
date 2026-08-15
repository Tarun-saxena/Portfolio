"use client";

import React from "react";

export function AboutSection() {
    return (
        <section id="about" className="w-full py-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                About
            </h2>

            <ul className="flex flex-col gap-4 text-base text-zinc-600 dark:text-zinc-300 leading-relaxed list-disc pl-5">
                <li>
                    I&apos;m a{" "}
                    <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4">
                        19-year-old full stack developer
                    </strong>{" "}
                    based in Delhi, India, with a strong lean toward{" "}
                    <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4">
                        backend systems and DevOps
                    </strong>{" "}
                    — I care as much about how something runs in production as how it works in code.
                </li>
                <li>
                    My core stack is{" "}
                    <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4">
                        TypeScript, Next.js, Node.js/Express, PostgreSQL, Prisma, BullMQ, and Redis
                    </strong>
                    , usually structured as Turborepo monorepos. I&apos;m building hands-on experience with{" "}
                    <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4">
                        AWS (EC2, nginx, PM2)
                    </strong>{" "}
                    and general DevOps workflows — deployment, process management, and infrastructure basics.
                </li>
                <li>
                    I believe in shipping — getting a feature working end-to-end and committed before moving to the next, then iterating from there.
                </li>
                <li>
                    Currently a student, learning by building real, production-style projects rather than toy apps.
                </li>
            </ul>
        </section>
    );
}
