import React from "react";
import { Nav } from "@/components/Nav";
import { HeroBanner } from "@/components/HeroBanner";
import { ProfileHeader } from "@/components/ProfileHeader";
import { AboutSection } from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import GithubHeatmap from "@/components/GithubHeatmap";

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-50 flex flex-col font-sans transition-colors duration-200">
            {/* Top Navigation Bar with single thin horizontal bottom border */}
            <Nav />

            {/* Single clean vertical column, centered, max-width ~1000px */}
            <main className="w-full max-w-[1000px] mx-auto px-6 md:px-8 py-8 flex flex-col gap-8">
                {/* 1. Full-width banner image, rounded corners, NO border */}
                <HeroBanner />

                {/* 2. Profile Row with clear vertical spacing below banner */}
                <ProfileHeader />

                {/* Single thin horizontal divider line */}
                <div className="w-full border-b border-zinc-200 dark:border-zinc-800" />

                {/* 3. About Section */}
                <AboutSection />

                {/* Single thin horizontal divider line */}
                <div className="w-full border-b border-zinc-200 dark:border-zinc-800" />

                {/* 4. Projects Section */}
                <section id="projects" className="w-full py-4 scroll-mt-24">
                    <ProjectsSection />
                </section>

                {/* Single thin horizontal divider line */}
                <div className="w-full border-b border-zinc-200 dark:border-zinc-800" />

                {/* 5. Open Source Section */}
                <section id="open-source" className="w-full py-4 scroll-mt-24 flex flex-col gap-6">
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Open Source
                    </h2>
                    <div className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        <p>
                            Contributing to{" "}
                            <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4">
                                Twenty CRM
                            </strong>{" "}
                            (<code className="text-xs font-mono bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">twentyhq/twenty</code>), fixing a text field display bug that occurs after side panel resize, using Floating UI&apos;s size middleware for the fix.
                        </p>
                    </div>

                    <div className="mt-2">
                        <GithubHeatmap />
                    </div>
                </section>

                {/* Single thin horizontal divider line */}
                <div className="w-full border-b border-zinc-200 dark:border-zinc-800" />

                {/* 6. Skills Section */}
                <section id="skills" className="w-full py-4 scroll-mt-24 flex flex-col gap-6">
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Skills
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            {
                                category: "Languages & Frameworks",
                                items: ["TypeScript", "Next.js", "Node.js", "Express"]
                            },
                            {
                                category: "Databases & ORM",
                                items: ["PostgreSQL", "Prisma"]
                            },
                            {
                                category: "Infra & Queues",
                                items: ["Redis", "BullMQ"]
                            },
                            {
                                category: "DevOps & Cloud",
                                items: ["AWS (EC2)", "nginx", "PM2"]
                            },
                            {
                                category: "Tooling",
                                items: ["Turborepo", "Git", "WSL", "PowerShell"]
                            }
                        ].map((skill, idx) => (
                            <div
                                key={idx}
                                className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5"
                            >
                                <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-bold mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                    {skill.category}
                                </h3>
                                <ul className="flex flex-col gap-2">
                                    {skill.items.map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 py-8 px-6 text-center text-xs text-zinc-500 font-mono">
                &copy; {new Date().getFullYear()} Tarun. Built with Next.js App Router, Tailwind CSS, and Prisma.
            </footer>
        </div>
    );
}
