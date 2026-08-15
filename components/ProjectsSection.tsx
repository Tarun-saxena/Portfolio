"use client";

import { useEffect, useState } from "react";

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

// Map techStack string keys to premium inline SVGs
const TECH_ICONS: Record<string, { icon: React.ReactNode; label: string }> = {
    nextjs: {
        label: "Next.js",
        icon: (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.892 18.069l-5.39-7.234-.047-.067v5.185h-1.564V8.406h1.492l5.056 6.828.047.067V8.406h1.564v9.663h-1.208zM12.062 12.08l-1.34-1.802v3.743h-1.564V8.406h1.564v1.872l1.34 1.802v3.743z" />
            </svg>
        ),
    },
    typescript: {
        label: "TypeScript",
        icon: (
            <svg className="w-5 h-5 fill-current text-[#3178C6]" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0zm22.034 15.968c-.148-.739-.612-1.375-1.405-1.722-.756-.343-1.637-.478-2.6-.339-.739.105-1.332.339-1.782.709-.432.348-.682.809-.75 1.378-.068.567.126 1.057.58 1.416.489.375 1.25.602 2.284.818 1.637.33 2.702.738 3.193 1.27.489.511.66 1.159.523 1.942-.148.908-.682 1.602-1.602 2.089-.908.477-2.079.625-3.511.455-1.602-.205-2.829-.75-3.692-1.636-.83-.875-1.125-2.057-1.102-3.511l2.432-.148c.023.773.284 1.386.773 1.817.489.432 1.182.602 2.079.489.875-.114 1.488-.386 1.84-.818.352-.432.443-.943.273-1.466-.17-.523-.693-.908-1.568-1.182l-2.011-.59c-1.42-.42-2.455-.898-3.08-1.432-.625-.545-.886-1.284-.783-2.204.114-.943.682-1.693 1.693-2.227 1.011-.534 2.272-.67 3.773-.477 1.42.193 2.511.682 3.284 1.443.761.761 1.023 1.704.909 2.829l-2.398.114zm-11.648-5.91h-7.61v2.329h2.466v11.239h2.682V12.387h2.466V10.058z" />
            </svg>
        ),
    },
    javascript: {
        label: "JavaScript",
        icon: (
            <svg className="w-5 h-5 fill-current text-[#F7DF1E]" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0zm22.034 18.268c-.156-.819-.741-1.468-1.744-1.815-.992-.351-2.128-.429-3.237-.176-.909.208-1.645.602-2.195 1.171-.539.563-.807 1.309-.817 2.228-.01.917.443 1.636 1.344 2.146.992.563 2.502.859 4.498 1.139 1.956.281 3.26.772 3.876 1.439.602.656.818 1.579.529 2.7-.354 1.36-1.391 2.302-3.037 2.766-1.634.469-3.567.319-5.187-.417-1.819-.824-2.824-2.261-2.973-4.227l3.633-.509c.148.972.671 1.643 1.554 1.996.883.353 1.942.306 2.802-.12.871-.433 1.189-1.053 1.002-1.865-.187-.803-.895-1.285-2.091-1.583l-2.738-.679c-2.046-.508-3.469-1.229-4.269-2.158-.795-.924-1.077-2.186-.889-3.567.247-1.792 1.402-3.003 3.324-3.593 1.921-.592 4.195-.371 6.136.634 1.455.753 2.385 1.921 2.766 3.498l-3.57.653zm-11.96-7.854H0v19.141h3.766V18.234H10.074v-3.766H3.766V14.18H10.074v-3.766z" />
            </svg>
        ),
    },
    tailwind: {
        label: "Tailwind CSS",
        icon: (
            <svg className="w-5 h-5 fill-current text-[#06B6D4]" viewBox="0 0 24 24">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
            </svg>
        ),
    },
    tailwindcss: {
        label: "Tailwind CSS",
        icon: (
            <svg className="w-5 h-5 fill-current text-[#06B6D4]" viewBox="0 0 24 24">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
            </svg>
        ),
    },
    prisma: {
        label: "Prisma",
        icon: (
            <svg className="w-5 h-5 fill-current text-[#2D3748] dark:text-[#5A67D8]" viewBox="0 0 24 24">
                <path d="M12 0L2.4 4.8v14.4L12 24l9.6-4.8V4.8L12 0zm7.2 17.6L12 21.2l-7.2-3.6V6.4L12 2.8l7.2 3.6v11.2z" />
            </svg>
        ),
    },
    postgres: {
        label: "PostgreSQL",
        icon: (
            <svg className="w-5 h-5 fill-current text-[#4169E1]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
        ),
    },
    postgresql: {
        label: "PostgreSQL",
        icon: (
            <svg className="w-5 h-5 fill-current text-[#4169E1]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
        ),
    },
    react: {
        label: "React",
        icon: (
            <svg className="w-5 h-5 fill-current text-[#61DAFB]" viewBox="0 0 24 24">
                <path d="M12 8.7C8 8.7 5.4 10 4 12.7c2-.2 3.8-.9 5-2.2 1.3-1.4 1.8-3.4 1.6-5.8.9.7 1.8 1.9 2.5 3.3.4.9.7 1.9.9 2.9-.6-.8-1.3-1.6-2-2.2zM12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm6.9 15.6c-.9 1.4-2.3 2.5-4 3-1.5.5-3 .5-4.4.1 1-.8 1.9-2 2.5-3.3.5-1.1.7-2.3.8-3.5 1 1 2 2.3 3.1 3.2.7.5 1.4.6 2 .5z" />
            </svg>
        ),
    },
    nodejs: {
        label: "Node.js",
        icon: (
            <svg className="w-5 h-5 fill-current text-[#339933]" viewBox="0 0 24 24">
                <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zm3.9 14.7l-3.9 2.3-3.9-2.3V10.1l3.9-2.3 3.9 2.3v6.1z" />
            </svg>
        ),
    },
    github: {
        label: "GitHub",
        icon: (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
        ),
    },
    vercel: {
        label: "Vercel",
        icon: (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 22.525H0L12 1.736l12 20.789z" />
            </svg>
        ),
    },
};

// Fallback Icon
function CodeIcon() {
    return (
        <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );
}

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

    if (isLoading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-violet-500 animate-spin"></span>
                <p className="text-zinc-500 text-sm">Loading projects showcase...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 text-center text-rose-400 text-sm">
                Failed to load projects. Please refresh.
            </div>
        );
    }

    // Standard order is already sorted by the GET /api/projects endpoint: Pinned desc, Order asc, CreatedAt desc.
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

    return (
        <div className="w-full">
            <div className="flex flex-col mb-8">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Projects
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayProjects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition duration-200"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between gap-2">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    {project.title}
                                </h3>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    {project.status === "live" ? "Live" : "Building"}
                                </span>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack Icons */}
                        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/60 flex flex-wrap gap-2 items-center">
                            {project.techStack.map((tech) => {
                                const normalized = tech.toLowerCase().trim();
                                const iconConfig = TECH_ICONS[normalized];
                                return (
                                    <div
                                        key={tech}
                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400"
                                    >
                                        {iconConfig?.icon || <CodeIcon />}
                                        <span>{iconConfig?.label || tech}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
