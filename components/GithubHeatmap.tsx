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
            <div className="w-full py-10 flex flex-col items-center justify-center gap-3">
                <span className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-800 border-t-zinc-600 dark:border-t-zinc-400 animate-spin"></span>
                <p className="text-zinc-500 text-xs font-mono">Loading GitHub activity...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="w-full py-6 text-center text-xs font-mono text-rose-500 dark:text-rose-400">
                Failed to load GitHub activity data.
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
                if (!lastAddedLabel || colIdx - lastAddedLabel.colIndex >= 3) {
                    monthLabels.push({ text: months[month], colIndex: colIdx });
                    lastMonth = month;
                }
            }
        }
    });

    // Grayscale contribution scale
    function cellClass(count: number) {
        if (count <= 0) return "bg-[#f0f0f2] dark:bg-[#1b1b1d]";
        if (count <= 2) return "bg-[#d1d1d6] dark:bg-[#3a3a3e]";
        if (count <= 5) return "bg-[#9999a0] dark:bg-[#66666b]";
        if (count <= 9) return "bg-[#55555c] dark:bg-[#9a9a9f]";
        return "bg-[#18181b] dark:bg-[#f0f0f0]";
    }

    return (
        <section className="w-full min-w-0 overflow-hidden">
            {/* Activity Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-5">
                <h2 className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-white">
                    GitHub Activity
                </h2>
                <span className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    {totalContributions.toLocaleString()} GitHub activities in the last year
                </span>
            </div>

            {/* Full-Width Scrollable Heatmap Container */}
            <div className="w-full overflow-x-auto pb-1 scrollbar-none">
                <div className="w-full min-w-[700px] flex flex-col">
                    {/* Month Labels CSS Grid */}
                    <div
                        className="grid w-full mb-2 select-none"
                        style={{
                            gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                        }}
                    >
                        {monthLabels.map((m, idx) => (
                            <div
                                key={`${m.text}-${m.colIndex}-${idx}`}
                                className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 whitespace-nowrap"
                                style={{ gridColumnStart: m.colIndex + 1 }}
                            >
                                {m.text}
                            </div>
                        ))}
                    </div>

                    {/* Contribution Heatmap CSS Grid */}
                    <div
                        className="grid w-full"
                        style={{
                            gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`
                        }}
                    >
                        {weeks.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col items-center gap-[2px]">
                                {week.contributionDays.map((day, dIdx) => (
                                    <div
                                        key={dIdx}
                                        className={`w-[12px] h-[12px] rounded-[2px] transition-colors cursor-pointer shrink-0 ${cellClass(
                                            day.contributionCount
                                        )}`}
                                        onMouseEnter={() => setHoveredDay(day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tooltip & Legend Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                <div className="h-5 flex items-center font-mono text-xs text-zinc-600 dark:text-zinc-400">
                    {hoveredDay ? (
                        <span>
                            <strong className="font-semibold text-zinc-900 dark:text-white">
                                {hoveredDay.contributionCount} activities
                            </strong>{" "}
                            on{" "}
                            {new Date(hoveredDay.date).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    ) : null}
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto select-none">
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#f0f0f2] dark:bg-[#1b1b1d]" />
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#d1d1d6] dark:bg-[#3a3a3e]" />
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#9999a0] dark:bg-[#66666b]" />
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#55555c] dark:bg-[#9a9a9f]" />
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#18181b] dark:bg-[#f0f0f0]" />
                    <span className="font-sans text-xs text-zinc-400 dark:text-zinc-500 ml-1">More active</span>
                </div>
            </div>
        </section>
    );
}