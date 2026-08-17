"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter({ className = "" }: { className?: string }) {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        async function recordVisit() {
            try {
                const res = await fetch("/api/visitor", { method: "POST" });
                if (!res.ok) throw new Error();
                const data = await res.json();
                setCount(data.count);
            } catch {
                try {
                    const res = await fetch("/api/visitor");
                    if (res.ok) {
                        const data = await res.json();
                        setCount(data.count);
                    }
                } catch {
                    console.error("Failed to fetch visitor count");
                }
            }
        }
        recordVisit();
    }, []);

    if (count === null) return null;

    return (
        <div className={`inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm select-none ${className}`}>
            {/* Gray Visitor Label */}
            <span className="text-zinc-400 dark:text-zinc-500 font-normal uppercase tracking-wider text-[15px]">
                VISITORS
            </span>

            {/* Blue Visitor Number */}
            <span className="font-semibold text-[#3880ff] dark:text-[#3880ff] tracking-tight text-[15px]">
                {count.toLocaleString()}
            </span>
        </div>
    );
}
