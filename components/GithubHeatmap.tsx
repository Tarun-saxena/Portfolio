"use client";
import { useEffect, useState } from "react";

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
            <div className="py-12 flex flex-col items-center justify-center gap-3">
                <span className="w-6 h-6 rounded-full border-2 border-zinc-800 border-t-zinc-400 animate-spin"></span>
                <p className="text-zinc-500 text-xs">Loading contribution calendar...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="py-8 text-center text-xs text-rose-400">
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

    // Grayscale intensity scale to match reference image
    function cellClass(count: number) {
        if (count <= 0) return "bg-zinc-800/60";
        if (count <= 1) return "bg-zinc-600";
        if (count <= 3) return "bg-zinc-400";
        if (count <= 6) return "bg-zinc-200";
        return "bg-white";
    }

    const gridWidth = weeks.length * 12 - 3; // 12px per column (9px cell + 3px gap), minus trailing gap
    const containerWidth = gridWidth + 32;   // Extra padding at the end to prevent month name clipping

    return (
        <div className="w-full overflow-x-auto pb-2">
            <div style={{ width: `${containerWidth}px`, minWidth: `${containerWidth}px` }} className="flex flex-col gap-1.5 pr-8">
                {/* Header row — now scoped to grid width */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                    <h3 className="font-bold text-xl text-zinc-100">GitHub Activity</h3>
                    <p className="text-sm text-zinc-500">
                        {totalContributions.toLocaleString()} GitHub activities in the last year
                    </p>
                </div>

                {/* Month labels */}
                <div className="flex gap-[3px] mb-1.5 h-5 relative">
                    {weeks.map((week, wIdx) => {
                        const label = monthLabels.find((m) => m.colIndex === wIdx);
                        return (
                            <div key={wIdx} className="w-[9px] h-5 text-[11px] text-zinc-500 relative animate-fade-in">
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

                {/* Footer row — now scoped to grid width too */}
                <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                    <div className="h-5 flex items-center">
                        {hoveredDay ? (
                            <div className="text-xs text-zinc-300 flex items-center gap-1.5">
                                <span className="font-semibold text-zinc-100">
                                    {hoveredDay.contributionCount} activities
                                </span>
                                <span className="text-zinc-500">on</span>
                                <span>
                                    {new Date(hoveredDay.date).toLocaleDateString(undefined, {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 select-none">

                        <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-800/60" />
                        <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-600" />
                        <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-400" />
                        <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-200" />
                        <div className="w-2.5 h-2.5 rounded-[2px] bg-white" />
                        <span>More active</span>
                    </div>
                </div>
            </div>
        </div>
    );
}