"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./ui/Primitives";
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
import { HiOutlineExternalLink } from "react-icons/hi";
import { BsFillPinAngleFill } from "react-icons/bs";

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    status: "live" | "building" | "not_started" | string;
    techStack: string[];
    imageUrl?: string | null;
    videoUrl?: string | null;
    projectUrl?: string | null;
    githubUrl?: string | null;
    backendGithubUrl?: string | null;
    postUrl?: string | null;
    pinned?: boolean;
    order?: number;
}

// Icon helper mapping tech stack keys to react-icons
export const TECH_ICON_MAP: Record<string, { label: string; icon: React.ReactNode; color?: string }> = {
    nextjs: { label: "Next.js", icon: <SiNextdotjs className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    next: { label: "Next.js", icon: <SiNextdotjs className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    react: { label: "React", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
    reactjs: { label: "React", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
    typescript: { label: "TypeScript", icon: <SiTypescript className="w-4 h-4 text-[#3178C6]" /> },
    ts: { label: "TypeScript", icon: <SiTypescript className="w-4 h-4 text-[#3178C6]" /> },
    tailwind: { label: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" /> },
    tailwindcss: { label: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" /> },
    framer: { label: "Framer Motion", icon: <SiFramer className="w-4 h-4 text-[#0055FF]" /> },
    nodejs: { label: "Node.js", icon: <SiNodedotjs className="w-4 h-4 text-[#339933]" /> },
    node: { label: "Node.js", icon: <SiNodedotjs className="w-4 h-4 text-[#339933]" /> },
    mongodb: { label: "MongoDB", icon: <SiMongodb className="w-4 h-4 text-[#47A248]" /> },
    postgresql: { label: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 text-[#4169E1]" /> },
    postgres: { label: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 text-[#4169E1]" /> },
    prisma: { label: "Prisma", icon: <SiPrisma className="w-4 h-4 text-[#5A67D8]" /> },
    docker: { label: "Docker", icon: <SiDocker className="w-4 h-4 text-[#2496ED]" /> },
    redis: { label: "Redis", icon: <SiRedis className="w-4 h-4 text-[#DC382D]" /> },
    express: { label: "Express.js", icon: <SiExpress className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    expressjs: { label: "Express.js", icon: <SiExpress className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    threejs: { label: "Three.js", icon: <SiThreedotjs className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    openai: { label: "OpenAI", icon: <RiOpenaiFill className="w-4 h-4 text-[#10A37F]" /> },
    python: { label: "Python", icon: <SiPython className="w-4 h-4 text-[#3776AB]" /> },
    aws: { label: "AWS", icon: <FaAws className="w-4 h-4 text-[#FF9900]" /> },
    github: { label: "GitHub", icon: <SiGithub className="w-4 h-4 text-zinc-900 dark:text-white" /> },
    vite: { label: "Vite", icon: <SiVite className="w-4 h-4 text-[#646CFF]" /> },
    javascript: { label: "JavaScript", icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" /> },
    js: { label: "JavaScript", icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" /> },
    chrome: { label: "Manifest V3", icon: <SiGooglechrome className="w-4 h-4 text-[#4285F4]" /> },
};

const DEFAULT_PROJECTS: Project[] = [
    {
        id: 1,
        title: "Argus",
        slug: "argus",
        description: "Find open-source issues that actually fit you. Argus continuously scans GitHub repositories, uses Gemini AI to analyze every open issue for difficulty & required skills, and recommends matches tailored to your profile.",
        status: "live",
        techStack: ["nextjs", "react", "typescript", "tailwind", "express", "nodejs", "redis", "postgresql", "prisma", "docker"],
        imageUrl: "/argus-preview.png",
        videoUrl: null,
        projectUrl: "https://github.com/Tarun-saxena/Argus",
        githubUrl: "https://github.com/Tarun-saxena/Argus",
        postUrl: "https://x.com/Tarun__Saxena",
        pinned: true,
        order: 1,
    },
    {
        id: 2,
        title: "DraftlyAi",
        slug: "draftly-ai",
        description: "AI-powered Chrome extension (Manifest V3) that helps you write better comments without overthinking. Automatically detects active comment boxes on platforms like X, LinkedIn, Threads, and blogs, inserting human-like comment drafts.",
        status: "live",
        techStack: ["chrome", "react", "typescript", "tailwind", "javascript"],
        imageUrl: "/draftlyai-preview.png",
        videoUrl: null,
        projectUrl: "https://github.com/Tarun-saxena/DraftlyAi-ChromeExtension",
        githubUrl: "https://github.com/Tarun-saxena/DraftlyAi-ChromeExtension",
        backendGithubUrl: "https://github.com/Tarun-saxena/DraftlyAi-Backend",
        postUrl: "https://x.com/Tarun__Saxena",
        pinned: true,
        order: 2,
    },
];

export default function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch("/api/projects");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setProjects(data);
                        return;
                    }
                }
            } catch (err) {
                console.error("Failed to load projects API, using default list", err);
            }
            setProjects(DEFAULT_PROJECTS);
        }
        fetchProjects();
    }, []);

    const displayProjects = projects.length > 0 ? projects : DEFAULT_PROJECTS;

    const renderStatusBadge = (status: string) => {
        if (status === "live") {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-100/90 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-800/60">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live</span>
                </span>
            );
        }
        if (status === "building") {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-100/90 text-amber-800 border border-amber-300 dark:bg-amber-950/80 dark:text-amber-400 dark:border-amber-800/60">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Building</span>
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-300 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700/60">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                <span>Not Started</span>
            </span>
        );
    };

    return (
        <div className="w-full">
            <SectionHeader
                index="03 / PROJECTS"
                title="Projects"
                action={
                    <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                        {displayProjects.length.toString().padStart(2, "0")} SELECTED PROJECTS
                    </span>
                }
            />

            {/* 2-Column Grid Layout matching screenshot (compact max-width) */}
            <div className="max-w-[740px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {displayProjects.map((project) => (
                    <Link
                        key={project.id}
                        href={`/projects/${project.slug}`}
                        className="group flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-white/60 dark:bg-[#0c0c0e]/80 border border-zinc-200 dark:border-zinc-800/90 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm cursor-pointer select-none"
                    >
                        <div className="flex flex-col gap-3">
                            {/* Card Media Preview Container */}
                            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800/90 bg-zinc-900 group/img">
                                {project.imageUrl ? (
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                        loading="eager"
                                        className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 font-mono text-xs">
                                        No Preview
                                    </div>
                                )}

                                {/* Hover Play Overlay */}
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5">
                                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform group-hover/img:scale-110 transition-transform">
                                        <svg className="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                                        VIEW PROJECT
                                    </span>
                                </div>
                            </div>

                            {/* Card Title & Status Badge */}
                            <div className="flex items-center justify-between gap-2 mt-0.5">
                                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                                    {project.title}
                                </h3>
                                {renderStatusBadge(project.status)}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-2">
                                {project.description}
                            </p>
                        </div>

                        {/* Card Footer: Tech Stack Icons (React Icons) + View Project Link */}
                        <div className="flex items-end justify-between border-t border-zinc-200 dark:border-zinc-800/80 pt-3.5 mt-4 gap-2">
                            {/* Minimalist Tech Icons Row */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {project.techStack.map((techKey, idx) => {
                                    const techInfo = TECH_ICON_MAP[techKey.toLowerCase()];
                                    if (!techInfo) return null;
                                    return (
                                        <span
                                            key={idx}
                                            title={techInfo.label}
                                            className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                                        >
                                            {techInfo.icon}
                                        </span>
                                    );
                                })}
                            </div>

                            <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1 shrink-0 pb-0.5">
                                <span>View Project</span>
                                <HiOutlineExternalLink className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
