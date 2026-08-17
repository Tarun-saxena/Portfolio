"use client";

import Image from "next/image";
import { SocialHoverCard } from "./SocialHoverCard";

export function ProfileHeader() {
    return (
        <div className="w-full flex flex-col gap-5 select-none py-2">
            {/* Header Row: Avatar + Name & Subtitle */}
            <div className="flex items-center gap-4 sm:gap-6">
                {/* Profile Avatar with Technical Hatch Background & Border */}
                <div className="relative p-1.5 rounded-[20px] border border-zinc-300 dark:border-zinc-800 bg-zinc-100/90 dark:bg-[#121212]/90 shadow-sm shrink-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.05)_4px,rgba(0,0,0,0.05)_8px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.05)_4px,rgba(255,255,255,0.05)_8px)]">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        <Image
                            src="/avatar.png"
                            alt="Tarun Saxena"
                            fill
                            priority
                            sizes="(min-width: 640px) 112px, 80px"
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Name & Subtitle */}
                <div className="flex flex-col justify-center gap-1 sm:gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Hey, I’m Tarun Saxena
                        </h1>
                    </div>

                    <p className="font-serif italic text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400">
                        19y · fullstack · devops
                    </p>
                </div>
            </div>

            {/* Bio Paragraph */}
            <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                I’m a{" "}
                <span className="font-semibold text-zinc-900 dark:text-white underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-500">
                    Full Stack Developer
                </span>{" "}
                & DevOps enthusiast. I use <span className="font-semibold text-zinc-900 dark:text-white">React</span> to build frontends, <span className="font-semibold text-zinc-900 dark:text-white">Express</span> and <span className="font-semibold text-zinc-900 dark:text-white">Node.js</span> for backends, <span className="font-semibold text-zinc-900 dark:text-white">Next.js</span> to create complete full-stack web apps, and by using modern databases like <span className="font-semibold text-zinc-900 dark:text-white">PostgreSQL</span> and <span className="font-semibold text-zinc-900 dark:text-white">MongoDB</span>.
            </p>

            {/* Book A Call Button */}
            <div>
                <a
                    href="https://cal.com/tarun-saxena/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-xs sm:text-sm font-medium text-zinc-900 dark:text-white shadow-sm cursor-pointer"
                >
                    <span>Book A Meet!</span>
                    <svg className="w-4 h-4 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-2.5 pt-2">
                <span className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Here are my <strong className="text-zinc-900 dark:text-white font-semibold">socials</strong>
                </span>

                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    {/* GitHub */}
                    <SocialHoverCard platform="github">
                        <a
                            href="https://github.com/Tarun-saxena"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors text-xs font-medium text-zinc-800 dark:text-zinc-200"
                        >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span>GitHub</span>
                        </a>
                    </SocialHoverCard>

                    {/* Twitter / X */}
                    <SocialHoverCard platform="twitter">
                        <a
                            href="https://x.com/Tarun__Saxena"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors text-xs font-medium text-zinc-800 dark:text-zinc-200"
                        >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span>Twitter</span>
                        </a>
                    </SocialHoverCard>

                    {/* LinkedIn */}
                    <SocialHoverCard platform="linkedin">
                        <a
                            href="https://www.linkedin.com/in/tarun-saxena-aa46a523a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors text-xs font-medium text-zinc-800 dark:text-zinc-200"
                        >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                            <span>LinkedIn</span>
                        </a>
                    </SocialHoverCard>

                    {/* Email */}
                    <a
                        href="mailto:tarunsaxena1712@gmail.com"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors text-xs font-medium text-zinc-800 dark:text-zinc-200"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Email</span>
                    </a>

                    {/* Resume */}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors text-xs font-medium text-zinc-800 dark:text-zinc-200"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Resume</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

