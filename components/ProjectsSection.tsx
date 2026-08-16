"use client";

import { useEffect, useState } from "react";
import { SectionHeader, StatusBadge, TechBadge } from "./ui/Primitives";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    status: string;
    techStack: string[];
    imageUrl: string | null;
    projectUrl: string | null;
    pinned: boolean;
    order: number;
}

// Map techStack string keys to clean labels and inline icons
const TECH_ICONS: Record<string, { icon: React.ReactNode; label: string }> = {
    nextjs: {
        label: "Next.js",
        icon: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.892 18.069l-5.39-7.234-.047-.067v5.185h-1.564V8.406h1.492l5.056 6.828.047.067V8.406h1.564v9.663h-1.208zM12.062 12.08l-1.34-1.802v3.743h-1.564V8.406h1.564v1.872l1.34 1.802v3.743z" />
            </svg>
        ),
    },
    typescript: {
        label: "TypeScript",
        icon: (
            <svg className="w-4 h-4 fill-current text-[#3178C6]" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0zm22.034 15.968c-.148-.739-.612-1.375-1.405-1.722-.756-.343-1.637-.478-2.6-.339-.739.105-1.332.339-1.782.709-.432.348-.682.809-.75 1.378-.068.567.126 1.057.58 1.416.489.375 1.25.602 2.284.818 1.637.33 2.702.738 3.193 1.27.489.511.66 1.159.523 1.942-.148.908-.682 1.602-1.602 2.089-.908.477-2.079.625-3.511.455-1.602-.205-2.829-.75-3.692-1.636-.83-.875-1.125-2.057-1.102-3.511l2.432-.148c.023.773.284 1.386.773 1.817.489.432 1.182.602 2.079.489.875-.114 1.488-.386 1.84-.818.352-.432.443-.943.273-1.466-.17-.523-.693-.908-1.568-1.182l-2.011-.59c-1.42-.42-2.455-.898-3.08-1.432-.625-.545-.886-1.284-.783-2.204.114-.943.682-1.693 1.693-2.227 1.011-.534 2.272-.67 3.773-.477 1.42.193 2.511.682 3.284 1.443.761.761 1.023 1.704.909 2.829l-2.398.114zm-11.648-5.91h-7.61v2.329h2.466v11.239h2.682V12.387h2.466V10.058z" />
            </svg>
        ),
    },
    javascript: {
        label: "JavaScript",
        icon: (
            <svg className="w-4 h-4 fill-current text-[#F7DF1E]" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0zm22.034 18.268c-.156-.819-.741-1.468-1.744-1.815-.992-.351-2.128-.429-3.237-.176-.909.208-1.645.602-2.195 1.171-.539.563-.807 1.309-.817 2.228-.01.917.443 1.636 1.344 2.146.992.563 2.502.859 4.498 1.139 1.956.281 3.26.772 3.876 1.439.602.656.818 1.579.529 2.7-.354 1.36-1.391 2.302-3.037 2.766-1.634.469-3.567.319-5.187-.417-1.819-.824-2.824-2.261-2.973-4.227l3.633-.509c.148.972.671 1.643 1.554 1.996.883.353 1.942.306 2.802-.12.871-.433 1.189-1.053 1.002-1.865-.187-.803-.895-1.285-2.091-1.583l-2.738-.679c-2.046-.508-3.469-1.229-4.269-2.158-.795-.924-1.077-2.186-.889-3.567.247-1.792 1.402-3.003 3.324-3.593 1.921-.592 4.195-.371 6.136.634 1.455.753 2.385 1.921 2.766 3.498l-3.57.653zm-11.96-7.854H0v19.141h3.766V18.234H10.074v-3.766H3.766V14.18H10.074v-3.766z" />
            </svg>
        ),
    },
    tailwind: {
        label: "Tailwind CSS",
        icon: (
            <svg className="w-4 h-4 fill-current text-[#06B6D4]" viewBox="0 0 24 24">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
            </svg>
        ),
    },
    tailwindcss: {
        label: "Tailwind CSS",
        icon: (
            <svg className="w-4 h-4 fill-current text-[#06B6D4]" viewBox="0 0 24 24">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
            </svg>
        ),
    },
    prisma: {
        label: "Prisma",
        icon: (
            <svg className="w-4 h-4 fill-current text-[#2D3748] dark:text-[#5A67D8]" viewBox="0 0 24 24">
                <path d="M12 0L2.4 4.8v14.4L12 24l9.6-4.8V4.8L12 0zm7.2 17.6L12 21.2l-7.2-3.6V6.4L12 2.8l7.2 3.6v11.2z" />
            </svg>
        ),
    },
    postgres: {
        label: "PostgreSQL",
        icon: (
            <svg className="w-4 h-4 fill-current text-[#4169E1]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
        ),
    },
    postgresql: {
        label: "PostgreSQL",
        icon: (
            <svg className="w-4 h-4 fill-current text-[#4169E1]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
        ),
    },
    nodejs: {
        label: "Node.js",
        icon: (
            <svg className="w-4 h-4 fill-current text-[#339933]" viewBox="0 0 24 24">
                <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 1.5zm3.9 14.7l-3.9 2.3-3.9-2.3V10.1l3.9-2.3 3.9 2.3v6.1z" />
            </svg>
        ),
    },
};

function CodeIcon() {
    return (
        <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );
}

const ARGUS_BUILD_LOG = [
    { step: "01", task: "GitHub ingestion pipeline & OAuth webhooks" },
    { step: "02", task: "Contextual issue analysis using Gemini AI" },
    { step: "03", task: "Developer contributor scoring & matching engine" },
    { step: "04", task: "AWS EC2 infrastructure deployment (nginx + PM2)" },
];

export default function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch("/api/projects");
                if (!res.ok) throw new Error("Failed to load projects");
                const data = await res.json();
                setProjects(data);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setIsLoading(false);
            }
        }
        fetchProjects();
    }, []);

    const DEFAULT_PROJECTS: Project[] = [
        {
            id: 1,
            title: "Argus",
            slug: "argus",
            description: "An AI-powered GitHub issue matching platform. Built as a Turborepo monorepo (Next.js + Express + BullMQ + Prisma/Neon + Redis), with GitHub OAuth, Gemini-powered issue analysis, and a scoring algorithm that matches contributors to issues. Deployed to AWS EC2 with nginx and PM2.",
            status: "live",
            techStack: ["nextjs", "typescript", "nodejs", "prisma", "postgres"],
            imageUrl: null,
            projectUrl: "https://github.com",
            pinned: true,
            order: 1
        },
        {
            id: 2,
            title: "Portfolio site",
            slug: "portfolio-site",
            description: "This site. Built with Next.js App Router, Prisma/Neon, featuring a unique-visitor counter with IP hashing for privacy, a full project management admin panel, and a live GitHub activity heatmap.",
            status: "live",
            techStack: ["nextjs", "typescript", "tailwind", "prisma", "postgres"],
            imageUrl: null,
            projectUrl: "https://github.com",
            pinned: true,
            order: 2
        }
    ];

    const displayProjects = projects.length > 0 ? projects : DEFAULT_PROJECTS;
    
    // Separate Argus (Featured Primary Project) from secondary projects
    const featuredProject = displayProjects.find((p) => p.slug === "argus" || p.title.toLowerCase().includes("argus")) || displayProjects[0];
    const secondaryProjects = displayProjects.filter((p) => p.id !== featuredProject.id);

    if (isLoading) {
        return (
            <div className="w-full py-12 flex flex-col items-center justify-center gap-3">
                <span className="w-6 h-6 rounded-full border-2 border-zinc-800 border-t-zinc-400 animate-spin"></span>
                <p className="text-zinc-500 text-xs font-mono">Loading projects spec...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 text-center text-rose-400 text-xs font-mono">
                Failed to load projects specification.
            </div>
        );
    }

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

            {/* FEATURED DOMINANT PROJECT #01: ARGUS */}
            {featuredProject && (
                <div className="group mb-8 border border-[var(--border)] bg-[var(--card-bg)] rounded-lg p-6 sm:p-8 relative hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40 transition-all duration-200">
                    <div className="flex flex-col gap-6">
                        {/* Top Row: Index + Title on Left, Status + Links on Right */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                            <div className="flex items-baseline gap-3">
                                <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform duration-200">
                                    01
                                </span>
                                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                    {featuredProject.title}
                                </h3>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <StatusBadge status={featuredProject.status === "live" ? "live" : "building"} />
                                {featuredProject.projectUrl && (
                                    <a
                                        href={featuredProject.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-xs font-semibold text-zinc-900 dark:text-white hover:underline underline-offset-4 flex items-center gap-1"
                                    >
                                        <span>GITHUB</span>
                                        <span>→</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Detailed Description */}
                        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                            {featuredProject.description}
                        </p>

                        {/* Project Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded border border-[var(--border)] bg-zinc-50/80 dark:bg-zinc-900/50">
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                                    STATUS
                                </span>
                                <span className="font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                    ● LIVE (AWS DEPLOYED)
                                </span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                                    LATEST BUILD
                                </span>
                                <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                                    v0.1.0 // AUG 2026
                                </span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                                    STACK
                                </span>
                                <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                                    Next.js · TypeScript · Node.js · PostgreSQL · Redis
                                </span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                                    INFRA
                                </span>
                                <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                                    AWS (EC2) · nginx · PM2
                                </span>
                            </div>
                        </div>

                        {/* Unique Touch: Build Log Element */}
                        <div className="p-4 rounded border border-[var(--border)] bg-zinc-100/50 dark:bg-zinc-950/50 flex flex-col gap-2.5">
                            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 select-none">
                                <span className="font-mono text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                                    BUILD LOG // ENGINEERING STEPS
                                </span>
                                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                                    VERIFIED
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {ARGUS_BUILD_LOG.map((log) => (
                                    <div key={log.step} className="flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                                        <span className="text-zinc-400 dark:text-zinc-500">{log.step} /</span>
                                        <span>{log.task}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tech Stack Badges */}
                        <div className="pt-1 flex flex-wrap gap-2 items-center">
                            {featuredProject.techStack.map((tech) => {
                                const normalized = tech.toLowerCase().trim();
                                const iconConfig = TECH_ICONS[normalized];
                                return (
                                    <TechBadge key={tech} icon={iconConfig?.icon || <CodeIcon />}>
                                        {iconConfig?.label || tech}
                                    </TechBadge>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* SECONDARY PROJECTS SUB-GRID */}
            {secondaryProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {secondaryProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="group border border-[var(--border)] bg-[var(--card-bg)] rounded-lg p-6 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40 transition-all duration-200"
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform duration-200">
                                            0{idx + 2}
                                        </span>
                                        <h4 className="font-sans text-lg font-bold text-zinc-900 dark:text-white">
                                            {project.title}
                                        </h4>
                                    </div>
                                    <StatusBadge status={project.status === "live" ? "live" : "building"} />
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tech Stack & Link */}
                            <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap gap-2 items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => {
                                        const normalized = tech.toLowerCase().trim();
                                        const iconConfig = TECH_ICONS[normalized];
                                        return (
                                            <TechBadge key={tech} icon={iconConfig?.icon || <CodeIcon />}>
                                                {iconConfig?.label || tech}
                                            </TechBadge>
                                        );
                                    })}
                                </div>
                                {project.projectUrl && (
                                    <a
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition flex items-center gap-1 shrink-0"
                                    >
                                        <span>GITHUB</span>
                                        <span>→</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


