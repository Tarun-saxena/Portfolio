"use client";

import React, { useState, useRef } from "react";
import {
    SiTypescript,
    SiNextdotjs,
    SiNodedotjs,
    SiMongodb,
    SiJavascript,
    SiExpress,
    SiRedis,
    SiDocker,
    SiTailwindcss,
    SiPrometheus,
    SiGrafana,
    SiPostgresql,
    SiKubernetes,
    SiPostman,
    SiPrisma,
    SiGithub,
} from "react-icons/si";
import { FaReact, FaAws } from "react-icons/fa";
import { GiChargingBull } from "react-icons/gi";

interface SkillItem {
    id: string;
    name: string;
    brandColor?: string;
    icon: React.ReactNode;
}

const ROW_1: SkillItem[] = [
    {
        id: "react",
        name: "React",
        brandColor: "#61DAFB",
        icon: <FaReact className="w-4 h-4 text-[#61DAFB]" />,
    },
    {
        id: "nextjs",
        name: "Next.js",
        icon: <SiNextdotjs className="w-4 h-4 text-zinc-900 dark:text-white" />,
    },
    {
        id: "typescript",
        name: "TypeScript",
        brandColor: "#3178C6",
        icon: <SiTypescript className="w-4 h-4 text-[#3178C6]" />,
    },
    {
        id: "nodejs",
        name: "Node.js",
        brandColor: "#339933",
        icon: <SiNodedotjs className="w-4 h-4 text-[#339933]" />,
    },
    {
        id: "mongodb",
        name: "MongoDB",
        brandColor: "#47A248",
        icon: <SiMongodb className="w-4 h-4 text-[#47A248]" />,
    },
    {
        id: "javascript",
        name: "JavaScript",
        brandColor: "#F7DF1E",
        icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" />,
    },
    {
        id: "prisma",
        name: "Prisma",
        brandColor: "#5A67D8",
        icon: <SiPrisma className="w-4 h-4 text-[#5A67D8]" />,
    },
];

const ROW_2: SkillItem[] = [
    {
        id: "bullmq",
        name: "BullMQ",
        brandColor: "#FF4500",
        icon: <GiChargingBull className="w-4 h-4 text-[#FF4500]" />,
    },
    {
        id: "redis",
        name: "Redis",
        brandColor: "#DC382D",
        icon: <SiRedis className="w-4 h-4 text-[#DC382D]" />,
    },
    {
        id: "docker",
        name: "Docker",
        brandColor: "#2496ED",
        icon: <SiDocker className="w-4 h-4 text-[#2496ED]" />,
    },
    {
        id: "tailwind",
        name: "Tailwind CSS",
        brandColor: "#06B6D4",
        icon: <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />,
    },
    {
        id: "aws",
        name: "AWS",
        brandColor: "#FF9900",
        icon: <FaAws className="w-4 h-4 text-[#FF9900]" />,
    },
    {
        id: "express",
        name: "Express.js",
        icon: <SiExpress className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />,
    },
    {
        id: "github",
        name: "GitHub",
        icon: <SiGithub className="w-4 h-4 text-zinc-900 dark:text-white" />,
    },
];

const ROW_3: SkillItem[] = [
    {
        id: "prometheus",
        name: "Prometheus",
        brandColor: "#E6522C",
        icon: <SiPrometheus className="w-4 h-4 text-[#E6522C]" />,
    },
    {
        id: "grafana",
        name: "Grafana",
        brandColor: "#F46800",
        icon: <SiGrafana className="w-4 h-4 text-[#F46800]" />,
    },
    {
        id: "postgresql",
        name: "PostgreSQL",
        brandColor: "#4169E1",
        icon: <SiPostgresql className="w-4 h-4 text-[#4169E1]" />,
    },
    {
        id: "kubernetes",
        name: "Kubernetes",
        brandColor: "#326CE5",
        icon: <SiKubernetes className="w-4 h-4 text-[#326CE5]" />,
    },
    {
        id: "postman",
        name: "Postman",
        brandColor: "#FF6C37",
        icon: <SiPostman className="w-4 h-4 text-[#FF6C37]" />,
    },
    {
        id: "sql",
        name: "SQL",
        brandColor: "#00758F",
        icon: (
            <svg className="w-4 h-4 fill-[#00758F]" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
        ),
    },
];

interface Position {
    x: number;
    y: number;
}

export function SkillsSection() {
    const [positions, setPositions] = useState<Record<string, Position>>({});
    const [activeId, setActiveId] = useState<string | null>(null);

    const dragStartRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);

    const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        try {
            target.setPointerCapture(e.pointerId);
        } catch {
            // Fallback
        }
        setActiveId(id);

        const currentPos = positions[id] || { x: 0, y: 0 };
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            startX: currentPos.x,
            startY: currentPos.y,
        };
    };

    const handlePointerMove = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
        const dragStart = dragStartRef.current;
        if (activeId !== id || !dragStart) return;

        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        const targetX = dragStart.startX + deltaX;
        const targetY = dragStart.startY + deltaY;

        setPositions((prev) => ({
            ...prev,
            [id]: {
                x: targetX,
                y: targetY,
            },
        }));
    };

    const handlePointerUp = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
        if (activeId === id) {
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
                // Ignore
            }
            setActiveId(null);
            dragStartRef.current = null;
            // Bounce back to original position (0, 0)
            setPositions((prev) => ({
                ...prev,
                [id]: { x: 0, y: 0 },
            }));
        }
    };

    const renderPill = (skill: SkillItem) => {
        const pos = positions[skill.id] || { x: 0, y: 0 };
        const isDragging = activeId === skill.id;

        return (
            <div
                key={skill.id}
                onPointerDown={(e) => handlePointerDown(skill.id, e)}
                onPointerMove={(e) => handlePointerMove(skill.id, e)}
                onPointerUp={(e) => handlePointerUp(skill.id, e)}
                onPointerCancel={(e) => handlePointerUp(skill.id, e)}
                style={{
                    transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) ${isDragging ? "scale(1.04) rotate(2deg)" : "scale(1)"
                        }`,
                    transition: isDragging
                        ? "none"
                        : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    touchAction: "none",
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-sans font-semibold text-xs cursor-grab active:cursor-grabbing select-none ${isDragging
                    ? "z-30 shadow-xl border-zinc-400 dark:border-zinc-500 bg-white dark:bg-[#181818]"
                    : "bg-white text-[#111111] dark:bg-[#111111] dark:text-[#f5f5f5] border border-black/15 dark:border-white/12 shadow-[0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.25)] hover:-translate-y-[2px] hover:border-zinc-400 dark:hover:border-zinc-500 hover:shadow-md"
                    }`}
            >
                <span className="shrink-0 flex items-center justify-center pointer-events-none">
                    {skill.icon}
                </span>
                <span className="pointer-events-none">{skill.name}</span>
            </div>
        );
    };

    return (
        <div className="w-full relative">
            {/* Top Index Metadata Tag */}
            <div className="font-mono text-[11px] tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-2 select-none">
                03 / SKILLS
            </div>

            {/* Header Row: Bold Clean Sans-serif Heading + "drag me!" annotation */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                <h2 className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-white">
                    Skills
                </h2>

                {/* "drag me!" annotation pointing down-left towards the skill pills */}
                <div className="font-serif italic text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 select-none self-end sm:self-auto pb-1 sm:pb-0">
                    <span className="font-sans not-italic text-xs sm:text-sm text-zinc-400 dark:text-zinc-500">🡧</span>
                    <span>drag me!</span>

                </div>
            </div>

            {/* 3 Structured Skill Rows (matching order and layout) */}
            <div className="w-full flex flex-col gap-2 sm:gap-2.5 py-1 select-none">
                {/* Row 1 */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 items-center">
                    {ROW_1.map((skill) => renderPill(skill))}
                </div>
                {/* Row 2 */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 items-center">
                    {ROW_2.map((skill) => renderPill(skill))}
                </div>
                {/* Row 3 */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 items-center">
                    {ROW_3.map((skill) => renderPill(skill))}
                </div>
            </div>
        </div>
    );
}





