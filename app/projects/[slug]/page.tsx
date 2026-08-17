import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ThemeAudioDock } from "@/components/ThemeAudioDock";
import { SectionFrame, Crosshair } from "@/components/ui/Primitives";
import { Project } from "@/components/ProjectsSection";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiGithub, FiFileText, FiArrowLeft } from "react-icons/fi";
import {
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiMongodb,
    SiPostgresql,
    SiPrisma,
    SiDocker,
    SiRedis,
    SiExpress,
    SiGithub,
    SiPython,
    SiThreedotjs,
    SiFramer,
    SiVite,
    SiJavascript,
    SiGooglechrome,
} from "react-icons/si";
import { FaReact, FaAws } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";

const STACK_MAP: Record<string, { label: string; icon: React.ReactNode }> = {
    chrome: { label: "Manifest V3", icon: <SiGooglechrome className="w-4 h-4 text-[#4285F4]" /> },
    react: { label: "React", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
    reactjs: { label: "React", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
    typescript: { label: "TypeScript", icon: <SiTypescript className="w-4 h-4 text-[#3178C6]" /> },
    ts: { label: "TypeScript", icon: <SiTypescript className="w-4 h-4 text-[#3178C6]" /> },
    tailwind: { label: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" /> },
    tailwindcss: { label: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" /> },
    javascript: { label: "JavaScript", icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" /> },
    js: { label: "JavaScript", icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" /> },
    nextjs: { label: "Next.js", icon: <SiNextdotjs className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    next: { label: "Next.js", icon: <SiNextdotjs className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    express: { label: "Express.js", icon: <SiExpress className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    expressjs: { label: "Express.js", icon: <SiExpress className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    nodejs: { label: "Node.js", icon: <SiNodedotjs className="w-4 h-4 text-[#339933]" /> },
    node: { label: "Node.js", icon: <SiNodedotjs className="w-4 h-4 text-[#339933]" /> },
    redis: { label: "Redis", icon: <SiRedis className="w-4 h-4 text-[#DC382D]" /> },
    postgresql: { label: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 text-[#4169E1]" /> },
    postgres: { label: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 text-[#4169E1]" /> },
    prisma: { label: "Prisma", icon: <SiPrisma className="w-4 h-4 text-[#5A67D8]" /> },
    docker: { label: "Docker", icon: <SiDocker className="w-4 h-4 text-[#2496ED]" /> },
    vite: { label: "Vite", icon: <SiVite className="w-4 h-4 text-[#646CFF]" /> },
    github: { label: "GitHub", icon: <SiGithub className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    framer: { label: "Framer Motion", icon: <SiFramer className="w-4 h-4 text-[#0055FF]" /> },
    mongodb: { label: "MongoDB", icon: <SiMongodb className="w-4 h-4 text-[#47A248]" /> },
    threejs: { label: "Three.js", icon: <SiThreedotjs className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    openai: { label: "OpenAI", icon: <RiOpenaiFill className="w-4 h-4 text-[#10A37F]" /> },
    python: { label: "Python", icon: <SiPython className="w-4 h-4 text-[#3776AB]" /> },
    aws: { label: "AWS", icon: <FaAws className="w-4 h-4 text-[#FF9900]" /> },
};

const PROJECTS_DATA: Record<string, Project> = {
    "argus": {
        id: 1,
        title: "Argus",
        slug: "argus",
        description: "Find open-source issues that actually fit you. Argus continuously scans GitHub repositories, uses AI (Google Gemini) to analyze every open issue for difficulty and required skills, and recommends the ones that genuinely match your experience — eliminating stale labels and manual issue searching.",
        status: "live",
        techStack: ["nextjs", "react", "typescript", "tailwind", "express", "nodejs", "redis", "postgresql", "prisma", "docker"],
        imageUrl: "/argus-preview.png",
        videoUrl: null,
        projectUrl: "https://github.com/Tarun-saxena/Argus",
        githubUrl: "https://github.com/Tarun-saxena/Argus",
        postUrl: "https://x.com/Tarun__Saxena",
        pinned: true,
    },
    "draftly-ai": {
        id: 2,
        title: "DraftlyAi",
        slug: "draftly-ai",
        description: "DraftlyAi is an AI-powered Chrome extension (Manifest V3) that helps you write better comments without overthinking. It automatically detects comment boxes on platforms like X, LinkedIn, Threads, and blogs, understands the surrounding context, and inserts human-like comment drafts instantly.",
        status: "live",
        techStack: ["chrome", "react", "typescript", "tailwind", "javascript"],
        imageUrl: "/draftlyai-preview.png",
        videoUrl: null,
        projectUrl: "https://github.com/Tarun-saxena/DraftlyAi-ChromeExtension",
        githubUrl: "https://github.com/Tarun-saxena/DraftlyAi-ChromeExtension",
        backendGithubUrl: "https://github.com/Tarun-saxena/DraftlyAi-Backend",
        postUrl: "https://x.com/Tarun__Saxena",
        pinned: true,
    },
};

interface Params {
    slug: string;
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;
    const project = PROJECTS_DATA[slug] || Object.values(PROJECTS_DATA).find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const renderStatusBadge = (status: string) => {
        if (status === "live") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-100/90 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-800/60">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live</span>
                </span>
            );
        }
        if (status === "building") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-100/90 text-amber-800 border border-amber-300 dark:bg-amber-950/80 dark:text-amber-400 dark:border-amber-800/60">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Building</span>
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-300 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700/60">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                <span>Not Started</span>
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-transparent text-zinc-900 dark:text-zinc-50 flex flex-col font-sans transition-colors duration-200">
            {/* Empty Header / Navbar Section Frame */}
            <header className="w-full border-b border-[var(--border)] bg-[#fafafa] dark:bg-[#090909] sticky top-0 z-40 transition-colors duration-200">
                <div className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 h-[52px] flex items-center relative">
                    {/* Left & Right 1px Vertical Boundary Lines */}
                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[var(--border)] pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-[var(--border)] pointer-events-none" />

                    <Crosshair className="-bottom-[5px] -left-[5px]" />
                    <Crosshair className="-bottom-[5px] -right-[5px]" />
                </div>
            </header>

            {/* Main Content Frame matching the 1040px architectural frame */}
            <main className="w-full flex-1">
                <SectionFrame showTopCrosshairs={false} showBottomCrosshairs={true}>
                    <div className="flex flex-col gap-5 sm:gap-6 py-2">
                        {/* Top Sub-Header & Breadcrumb Bar */}
                        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                            <Link
                                href="/#projects"
                                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 text-xs font-mono text-zinc-700 dark:text-zinc-300 transition-colors"
                            >
                                <FiArrowLeft className="w-3.5 h-3.5" />
                                <span>Back to Projects</span>
                            </Link>

                            <div className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                Projects / <span className="text-zinc-900 dark:text-white font-semibold">{project.title}</span>
                            </div>
                        </div>

                        {/* Video / Interactive Demo Embed Container */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800/90 bg-zinc-950/80 dark:bg-zinc-900/60 shadow-xl flex flex-col items-center justify-center">
                            {project.videoUrl ? (
                                <iframe
                                    src={project.videoUrl}
                                    title={project.title}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2 text-zinc-500 font-mono text-sm">
                                    <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400 dark:text-zinc-500">NO PREVIEW</span>
                                </div>
                            )}
                        </div>

                        {/* Action Links Row (Github, Extension Code, Backend Code) */}
                        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap border-b border-[var(--border)] pb-5">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 text-xs font-semibold text-zinc-900 dark:text-white transition-colors shadow-xs"
                                >
                                    <FiGithub className="w-3.5 h-3.5" />
                                    <span>{project.backendGithubUrl ? "Extension Repo (Frontend)" : "GitHub"}</span>
                                </a>
                            )}
                            {project.backendGithubUrl && (
                                <a
                                    href={project.backendGithubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 text-xs font-semibold text-zinc-900 dark:text-white transition-colors shadow-xs"
                                >
                                    <FiGithub className="w-3.5 h-3.5" />
                                    <span>Backend Repo</span>
                                </a>
                            )}
                        </div>

                        {/* Title & Status Header */}
                        <div className="flex items-center justify-between gap-4">
                            <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-zinc-900 dark:text-white">
                                {project.title}
                            </h1>
                            {renderStatusBadge(project.status)}
                        </div>

                        {/* Detailed Description */}
                        <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                            {project.description}
                        </p>

                        {/* Special README Content for Argus */}
                        {project.slug === "argus" && (
                            <div className="flex flex-col gap-6 pt-4 border-t border-[var(--border)]">
                                {/* Why Argus Exists */}
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Why Argus Exists
                                    </h3>
                                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                                        Contributing to open source sounds simple until you actually try it. Good-first-issue labels are often stale, already claimed, or quietly require deep codebase knowledge. Searching manually means opening dozens of repos, filtering by label, and reading through issue threads just to figure out if something is worth your time. Argus removes that friction — it does the searching, reading, and ranking for you.
                                    </p>
                                </div>

                                {/* Turborepo Architecture */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Monorepo Architecture
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
                                            <span className="font-mono text-xs font-bold text-emerald-500 block mb-1">web (Next.js 16)</span>
                                            <span className="text-xs text-zinc-600 dark:text-zinc-400">Frontend landing page, dashboard feed, repo management, settings, and triage UI.</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
                                            <span className="font-mono text-xs font-bold text-blue-400 block mb-1">http-server (Express)</span>
                                            <span className="text-xs text-zinc-600 dark:text-zinc-400">Express REST API handling GitHub OAuth, JWT session cookies, and database queries.</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
                                            <span className="font-mono text-xs font-bold text-amber-400 block mb-1">worker (BullMQ + Gemini)</span>
                                            <span className="text-xs text-zinc-600 dark:text-zinc-400">Standalone Node process polling GitHub ETag headers, running Gemini AI analysis, and scoring matches.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Core Features Grid */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Core Features
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                        <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30">
                                            <strong className="text-zinc-900 dark:text-white block mb-1">🤖 AI-Powered Analysis</strong>
                                            <span className="text-zinc-600 dark:text-zinc-400">Gemini scores difficulty (Beginner/Intermediate/Advanced) & summarizes issues.</span>
                                        </div>
                                        <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30">
                                            <strong className="text-zinc-900 dark:text-white block mb-1">🎯 Match Scoring (0–100)</strong>
                                            <span className="text-zinc-600 dark:text-zinc-400">Calculates personalized match scores based on language, skills & issue freshness.</span>
                                        </div>
                                        <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30">
                                            <strong className="text-zinc-900 dark:text-white block mb-1">⚡ ETag Polling</strong>
                                            <span className="text-zinc-600 dark:text-zinc-400">Background workers re-poll repos using GitHub ETag headers to preserve rate limits.</span>
                                        </div>
                                        <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30">
                                            <strong className="text-zinc-900 dark:text-white block mb-1">⌨️ Triage Keyboard Shortcuts</strong>
                                            <span className="text-zinc-600 dark:text-zinc-400">Move issues between Inbox → Bookmarked / Claimed / Ignored using J/K, B/C/I shortcuts.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Special README Content for DraftlyAi */}
                        {project.slug === "draftly-ai" && (
                            <div className="flex flex-col gap-6 pt-4 border-t border-[var(--border)]">
                                {/* Problem Solved */}
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        What Problem Does It Solve?
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                        <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
                                            <span className="font-semibold text-rose-500 block mb-1">🚫 Staring at blank inputs</span>
                                            <span className="text-zinc-600 dark:text-zinc-400">Eliminates writer's block when trying to engage on social posts or blogs.</span>
                                        </div>
                                        <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
                                            <span className="font-semibold text-amber-500 block mb-1">🔄 Endless rewriting</span>
                                            <span className="text-zinc-600 dark:text-zinc-400">Saves time spent tweaking and overthinking simple replies.</span>
                                        </div>
                                        <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
                                            <span className="font-semibold text-emerald-500 block mb-1">💡 Instant Drafts</span>
                                            <span className="text-zinc-600 dark:text-zinc-400">Provides high-quality starting drafts in seconds with 1-click DOM insertion.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Features & Extension Architecture */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Extension Features & Tooling
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30">
                                            <strong className="text-zinc-900 dark:text-white block mb-1">🧩 Manifest V3 Chrome Extension</strong>
                                            <span className="text-zinc-600 dark:text-zinc-400">Built with modern Manifest V3 standards using React, Vite & Tailwind CSS.</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30">
                                            <strong className="text-zinc-900 dark:text-white block mb-1">⚡ Automatic Comment Box Detection</strong>
                                            <span className="text-zinc-600 dark:text-zinc-400">Content script tracks active focused elements (`textarea` and `contenteditable`).</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30">
                                            <strong className="text-zinc-900 dark:text-white block mb-1">🌐 Multi-Platform Support</strong>
                                            <span className="text-zinc-600 dark:text-zinc-400">Works seamlessly across X (Twitter), LinkedIn, Threads, and blogs.</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30">
                                            <strong className="text-zinc-900 dark:text-white block mb-1">🔒 Zero Data Storage</strong>
                                            <span className="text-zinc-600 dark:text-zinc-400">DraftlyAi does NOT store comments or save user data locally — privacy first.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </SectionFrame>
            </main>

            {/* Bottom Stack used Section (Replaces Footer) */}
            <SectionFrame showTopCrosshairs={true} showBottomCrosshairs={true} noBottomBorder={true}>
                <div className="py-6 flex flex-col gap-4">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        STACK USED
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                        {project.techStack.map((techKey, idx) => {
                            const key = techKey.toLowerCase();
                            const techInfo = STACK_MAP[key] || {
                                label: techKey,
                                icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" />,
                            };
                            return (
                                <div
                                    key={idx}
                                    className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg font-sans font-semibold text-xs sm:text-sm bg-white text-[#111111] dark:bg-[#111111] dark:text-[#f5f5f5] border border-black/15 dark:border-white/12 shadow-[0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.25)] hover:-translate-y-[1px] transition-all select-none"
                                >
                                    <span className="shrink-0 flex items-center justify-center pointer-events-none">
                                        {techInfo.icon}
                                    </span>
                                    <span className="pointer-events-none">{techInfo.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </SectionFrame>

            {/* Floating Dock */}
            <ThemeAudioDock />
        </div>
    );
}
