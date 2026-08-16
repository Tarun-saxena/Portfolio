import React from "react";

/**
 * Crosshair: 10px thin '+' marker anchored precisely at structural border intersections.
 */
export function Crosshair({ className = "" }: { className?: string }) {
    return (
        <div
            className={`absolute pointer-events-none z-20 text-zinc-400 dark:text-zinc-500 ${className}`}
            style={{ width: "10px", height: "10px" }}
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 10 10"
                className="w-2.5 h-2.5 overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5 0V10M0 5H10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                />
            </svg>
        </div>
    );
}

/**
 * TechnicalLabel: Monospace metadata tag (e.g., "03 / PROJECTS", "DEV.LOG / 2026").
 */
export function TechnicalLabel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`font-mono text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 ${className}`}
        >
            {children}
        </span>
    );
}

/**
 * StatusBadge: Live status indicator using green (#10b981 / emerald-500) for active/live.
 */
export function StatusBadge({
    status = "live",
    label,
}: {
    status?: "live" | "building" | "active";
    label?: string;
}) {
    const isLive = status === "live" || status === "active";
    const textLabel = label || (isLive ? "LIVE" : "BUILDING");

    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wide border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300">
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
            />
            {textLabel}
        </span>
    );
}

/**
 * TechBadge: Clean sans/mono technology stack tag.
 */
export function TechBadge({
    children,
    icon,
}: {
    children: React.ReactNode;
    icon?: React.ReactNode;
}) {
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 text-xs font-sans text-zinc-700 dark:text-zinc-300">
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{children}</span>
        </span>
    );
}

/**
 * SectionHeader: Editorial serif section heading paired with a monospace index prefix.
 */
export function SectionHeader({
    index,
    title,
    action,
}: {
    index?: string;
    title: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border)] pb-4 mb-8">
            <div className="flex items-baseline gap-3">
                {index && (
                    <span className="font-mono text-xs tracking-wider text-zinc-400 dark:text-zinc-500 select-none">
                        {index}
                    </span>
                )}
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {title}
                </h2>
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}

/**
 * SectionFrame: Container wrapper for section blocks that creates structural top/bottom borders
 * and places intersection crosshairs on top-left, top-right, bottom-left, bottom-right as needed.
 */
export function SectionFrame({
    children,
    id,
    className = "",
    showTopCrosshairs = true,
    showBottomCrosshairs = false,
    noBottomBorder = false,
}: {
    children: React.ReactNode;
    id?: string;
    className?: string;
    showTopCrosshairs?: boolean;
    showBottomCrosshairs?: boolean;
    noBottomBorder?: boolean;
}) {
    return (
        <section
            id={id}
            className={`w-full relative ${
                noBottomBorder ? "" : "border-b border-[var(--border)]"
            } ${className}`}
        >
            <div className="w-full max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 relative">
                {showTopCrosshairs && (
                    <>
                        <Crosshair className="-top-[5px] -left-[5px]" />
                        <Crosshair className="-top-[5px] -right-[5px]" />
                    </>
                )}
                {children}
                {showBottomCrosshairs && (
                    <>
                        <Crosshair className="-bottom-[5px] -left-[5px]" />
                        <Crosshair className="-bottom-[5px] -right-[5px]" />
                    </>
                )}
            </div>
        </section>
    );
}

/**
 * Divider: Horizontal 1px structural separator line.
 */
export function Divider({ className = "" }: { className?: string }) {
    return <div className={`w-full h-[1px] bg-[var(--border)] ${className}`} />;
}
