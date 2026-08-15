"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        async function recordVisit() {
            try {
                const res = await fetch("/api/visitor", { method: "POST" });
                if (!res.ok) throw new Error();
                const data = await res.json();
                setCount(data.count);
            } catch (err) {
                // Fallback to GET if POST fails
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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/30 text-xs font-mono text-zinc-400 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{count.toLocaleString()} unique visitors</span>
        </div>
    );
}
