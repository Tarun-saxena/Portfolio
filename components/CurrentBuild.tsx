"use client";

import React, { useState } from "react";
import { StatusBadge } from "./ui/Primitives";

const PIPELINE_STEPS = [
    {
        id: "INGEST",
        label: "INGEST",
        description: "GitHub Webhooks & OAuth Repository Events",
    },
    {
        id: "ANALYZE",
        label: "ANALYZE",
        description: "Gemini AI Contextual Issue Classifier",
    },
    {
        id: "MATCH",
        label: "MATCH",
        description: "Contributor Scoring Algorithm",
    },
    {
        id: "DELIVER",
        label: "DELIVER",
        description: "BullMQ & Redis Async Pipeline Dispatcher",
    },
];

export function CurrentBuild() {
    const [hoveredStep, setHoveredStep] = useState<string | null>(null);

    return (
        <div className="w-full">
            <div className="border border-[var(--border)] bg-[var(--card-bg)] rounded-lg p-5 sm:p-6 transition duration-200">
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-3 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                            CURRENT BUILD // ACTIVE SYSTEM
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 hidden sm:inline">
                            2026
                        </span>
                        <StatusBadge status="active" label="ACTIVE" />
                    </div>
                </div>

                {/* Main Identity */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
                    <div className="flex items-baseline gap-3">
                        <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            ARGUS
                        </h3>
                        <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
                            AI-Powered GitHub Issue Intelligence Platform
                        </span>
                    </div>
                    <a
                        href="#projects"
                        className="font-mono text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition underline underline-offset-4"
                    >
                        VIEW SPEC →
                    </a>
                </div>

                {/* Pipeline Flow Visualization */}
                <div className="w-full overflow-x-auto pb-1">
                    <div className="flex items-center gap-2 min-w-max">
                        {PIPELINE_STEPS.map((step, idx) => {
                            const isHovered = hoveredStep === step.id;
                            return (
                                <React.Fragment key={step.id}>
                                    <div
                                        onMouseEnter={() => setHoveredStep(step.id)}
                                        onMouseLeave={() => setHoveredStep(null)}
                                        className={`group relative px-3.5 py-2 rounded border transition-all duration-150 cursor-pointer ${
                                            isHovered
                                                ? "border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800/80"
                                                : "border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                                [{step.label}]
                                            </span>
                                        </div>

                                        {/* Subtle hover description tooltip */}
                                        {isHovered && (
                                            <div className="absolute left-0 -bottom-8 z-30 whitespace-nowrap px-2.5 py-1 rounded bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-mono text-[11px] shadow-md border border-zinc-700 dark:border-zinc-300 animate-fade-in pointer-events-none">
                                                {step.description}
                                            </div>
                                        )}
                                    </div>

                                    {idx < PIPELINE_STEPS.length - 1 && (
                                        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600 select-none">
                                            ──→
                                        </span>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
