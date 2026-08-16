"use client";

import { useEffect, useState } from "react";
import { SectionHeader, StatusBadge } from "./ui/Primitives";

interface ContributionDay {
    color: string;
    contributionCount: number;
    date: string;
    weekday: number;
}
interface ContributionWeek {
    contributionDays: ContributionDay[];
}
interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}
interface ApiResponse {
    provider: string;
    contributions: ContributionCalendar;
}

const FEATURED_CONTRIBUTION = {
    project: "Twenty CRM",
    repository: "twentyhq/twenty",
    contribution: "Bug fix / UI (Floating UI size middleware fix)",
    status: "IN PROGRESS",
    details:
        "Contributing to Twenty CRM (twentyhq/twenty), fixing a text field display bug that occurs after side panel resize using Floating UI's size middleware for the fix.",
};

const CONTRIBUTION_TIMELINE = [
    { step: "01", stage: "bug investigation", note: "side panel resize text field overflow analysis" },
    { step: "02", stage: "implementation", note: "Floating UI size middleware integration" },
    { step: "03", stage: "pull request", note: "submitted fix to twentyhq/twenty repository" },
];

export default function GithubHeatmap() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

    useEffect(() => {
        async function fetchContributions() {
            try {
                const res = await fetch("/api/github-contributions");
                if (!res.ok) throw new Error("Failed to fetch contribution data");
                const result = await res.json();
                setData(result);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setIsLoading(false);
            }
        }
        fetchContributions();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full py-12 flex flex-col items-center justify-center gap-3">
                <span className="w-6 h-6 rounded-full border-2 border-zinc-800 border-t-zinc-400 animate-spin"></span>
                <p className="text-zinc-500 text-xs font-mono">Loading open source activity metrics...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="w-full py-8 text-center text-xs font-mono text-rose-400">
                Failed to load contribution metrics.
            </div>
        );
    }

    const { totalContributions, weeks } = data.contributions;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthLabels: { text: string; colIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, colIdx) => {
        const firstDayDateStr = week.contributionDays[0]?.date;
        if (firstDayDateStr) {
            const date = new Date(firstDayDateStr);
            const month = date.getMonth();
            if (month !== lastMonth) {
                const lastAddedLabel = monthLabels[monthLabels.length - 1];
                if (!lastAddedLabel || colIdx - lastAddedLabel.colIndex >= 4) {
                    monthLabels.push({ text: months[month], colIndex: colIdx });
                    lastMonth = month;
                }
            }
        }
    });

    // Grayscale intensity scale (no bright rainbow colors)
    function cellClass(count: number) {
        if (count <= 0) return "bg-zinc-200/60 dark:bg-zinc-800/60";
        if (count <= 1) return "bg-zinc-400 dark:bg-zinc-600";
        if (count <= 3) return "bg-zinc-600 dark:bg-zinc-400";
        if (count <= 6) return "bg-zinc-800 dark:bg-zinc-200";
        return "bg-zinc-950 dark:bg-white";
    }

    const gridWidth = weeks.length * 12 - 3;
    const containerWidth = gridWidth + 32;

    return (
        <div className="w-full">
            <SectionHeader
                index="04 / OPEN SOURCE"
                title="Open Source"
                action={
                    <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                        OSS / 02
                    </span>
                }
            />

            {/* Concise Description */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans mb-6">
                Contributing to <strong className="text-zinc-900 dark:text-white font-semibold underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">Twenty CRM</strong>, working on frontend/editorial UI issues and production bugs.
            </p>

            {/* Featured Contribution Specification Block */}
            <div className="mb-8 border border-[var(--border)] bg-[var(--card-bg)] rounded-lg p-5 sm:p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 select-none">
                    <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wider uppercase">
                        FEATURED CONTRIBUTION // SPEC
                    </span>
                    <StatusBadge status="building" label={FEATURED_CONTRIBUTION.status} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">PROJECT</span>
                        <span className="font-bold text-zinc-900 dark:text-white">{FEATURED_CONTRIBUTION.project}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">REPOSITORY</span>
                        <span className="text-zinc-700 dark:text-zinc-300">{FEATURED_CONTRIBUTION.repository}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">CONTRIBUTION</span>
                        <span className="text-zinc-700 dark:text-zinc-300">{FEATURED_CONTRIBUTION.contribution}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">STATUS</span>
                        <span className="text-amber-600 dark:text-amber-400">{FEATURED_CONTRIBUTION.status}</span>
                    </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans pt-2 border-t border-[var(--border)]">
                    {FEATURED_CONTRIBUTION.details}
                </p>
            </div>

            {/* GitHub Activity Heatmap (Centerpiece) */}
            <div className="mb-8 border border-[var(--border)] bg-[var(--card-bg)] rounded-lg p-5 overflow-x-auto">
                <div style={{ width: `${containerWidth}px`, minWidth: `${containerWidth}px` }} className="flex flex-col gap-1.5 pr-8">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            {totalContributions.toLocaleString()} GitHub activities in the last year
                        </span>
                        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                            TELEMETRY AUDIT
                        </span>
                    </div>

                    {/* Month labels */}
                    <div className="flex gap-[3px] mb-1.5 h-5 relative select-none">
                        {weeks.map((week, wIdx) => {
                            const label = monthLabels.find((m) => m.colIndex === wIdx);
                            return (
                                <div key={wIdx} className="w-[9px] h-5 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 relative">
                                    {label && <span className="absolute left-0 top-0 whitespace-nowrap">{label.text}</span>}
                                </div>
                            );
                        })}
                    </div>

                    {/* Heatmap grid */}
                    <div className="flex gap-[3px]">
                        {weeks.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col gap-[3px]">
                                {week.contributionDays.map((day, dIdx) => (
                                    <div
                                        key={dIdx}
                                        className={`w-[9px] h-[9px] rounded-[2px] transition-colors cursor-crosshair ${cellClass(
                                            day.contributionCount
                                        )}`}
                                        onMouseEnter={() => setHoveredDay(day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Footer stats & legend */}
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-4 font-mono text-xs">
                        <div className="h-5 flex items-center">
                            {hoveredDay ? (
                                <div className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                        {hoveredDay.contributionCount} activities
                                    </span>
                                    <span className="text-zinc-400">on</span>
                                    <span>
                                        {new Date(hoveredDay.date).toLocaleDateString(undefined, {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-zinc-400">Hover over cells for activity timestamps</span>
                            )}
                        </div>

                        <div className="flex items-center gap-1.5 text-zinc-500 select-none">
                            <span>Less active</span>
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-200/60 dark:bg-zinc-800/60" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-400 dark:bg-zinc-600" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-600 dark:bg-zinc-400" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-800 dark:bg-zinc-200" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-950 dark:bg-white" />
                            <span>More active</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Unique Touch: Contribution Timeline (Changelog) */}
            <div className="p-5 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] flex flex-col gap-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 select-none">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                        2026 // CONTRIBUTION TIMELINE
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500">
                        twentyhq/twenty
                    </span>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                    {CONTRIBUTION_TIMELINE.map((item) => (
                        <div key={item.step} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
                            <span className="text-emerald-500 shrink-0">→</span>
                            <span className="font-bold text-zinc-800 dark:text-zinc-200 shrink-0">{item.stage}</span>
                            <span className="text-zinc-400 dark:text-zinc-500">({item.note})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}