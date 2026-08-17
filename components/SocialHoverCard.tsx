"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface StatItem {
    label: string;
    value: string | number;
}

export interface SocialCardData {
    name: string;
    username: string;
    avatarUrl: string;
    bio: string;
    location?: string;
    verified?: boolean;
    onlineStatus?: string;
    stats?: StatItem[];
}

export const SOCIAL_DATA: Record<string, SocialCardData> = {
    github: {
        name: "Tarun Saxena",
        username: "Tarun-saxena",
        avatarUrl: "/avatar.png",
        bio: "19y • cs • ml • Full Stack Developer & DevOps enthusiast",
        location: "Delhi, India",
        stats: [
            { label: "Repositories", value: 27 },
        ],
    },
    twitter: {
        name: "Tarun Saxena",
        username: "@Tarun__Saxena",
        avatarUrl: "/avatar.png",
        bio: "19 | curiously human | WebDev | devOps",
        location: "Delhi, India",
        verified: false,
        stats: [
            { label: "Following", value: 139 },
            { label: "Followers", value: 30 },
        ],
    },
    linkedin: {
        name: "Tarun Saxena",
        username: "in/tarun-saxena-aa46a523a",
        avatarUrl: "/avatar.png",
        bio: "Full Stack Developer | React, Node.js, Next.js & DevOps",
        location: "Delhi, India",
        stats: [
            { label: "Connections", value: "100+" },
        ],
    },
};

interface SocialHoverCardProps {
    platform: "github" | "twitter" | "linkedin";
    children: React.ReactNode;
}

export function SocialHoverCard({ platform, children }: SocialHoverCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const data = SOCIAL_DATA[platform];

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, 100);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const formatVal = (val: string | number) => {
        if (typeof val === "number") {
            return val.toLocaleString();
        }
        return val;
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {/* Hover Preview Card */}
            {isVisible && data && (
                <div className="absolute bottom-full left-0 mb-3 z-50 w-72 sm:w-80 p-4 sm:p-4.5 rounded-[20px] bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800/90 shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 pointer-events-none select-none">
                    <div className="flex flex-col gap-2.5">
                        {/* Top Avatar & Name Header */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700/60 shrink-0">
                                <Image
                                    src={data.avatarUrl}
                                    alt={data.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                />
                                {data.onlineStatus && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c0c0e]" />
                                )}
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-sm text-zinc-900 dark:text-white tracking-tight">
                                        {data.name}
                                    </span>
                                    {data.verified && (
                                        <svg
                                            className="w-4 h-4 text-[#1d9bf0]"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.19.46-1.39.12-2.95-.91-3.98-1.03-1.03-2.59-1.37-3.98-.91C14.67 2.61 13.43 1.75 12 1.75s-2.67.86-3.19 2.17c-1.39-.46-2.95-.12-3.98.91-1.03 1.03-1.37 2.59-.91 3.98C2.61 9.33 1.75 10.57 1.75 12s.86 2.67 2.17 3.19c-.46 1.39-.12 2.95.91 3.98 1.03 1.03 2.59 1.37 3.98.91 1.03 1.03 2.59 1.37 3.98.91 1.03 1.03 2.59 1.37 3.98.91.52 1.31 1.76 2.19 3.19 2.19s2.67-.88 3.19-2.19c1.39.46 2.95.12 3.98-.91 1.03-1.03 1.37-2.59.91-3.98 1.31-.52 2.19-1.76 2.19-3.19zm-11.71 4.25l-3.54-3.54 1.41-1.41 2.13 2.12 5.66-5.66 1.41 1.41-7.07 7.08z" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-xs text-zinc-500 dark:text-zinc-500 font-sans mt-0.5">
                                    {data.username}
                                </span>
                            </div>
                        </div>

                        {/* Bio */}
                        {data.bio && (
                            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed mt-0.5">
                                {data.bio}
                            </p>
                        )}

                        {/* Discord Active Status */}
                        {data.onlineStatus ? (
                            <div className="flex flex-col gap-1 pt-1">
                                <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800/80 pt-2.5">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                                        <span className="font-semibold text-xs text-zinc-900 dark:text-white">
                                            {data.onlineStatus}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                                        ACTIVE STATUS
                                    </span>
                                </div>
                            </div>
                        ) : null}

                        {/* Location */}
                        {data.location && (
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500 font-sans mt-0.5">
                                <svg
                                    className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>{data.location}</span>
                            </div>
                        )}

                        {/* Stats Row */}
                        {data.stats && data.stats.length > 0 && (
                            <>
                                <div className="border-t border-zinc-200 dark:border-zinc-800/80 my-1" />
                                <div className="flex items-center gap-5 text-xs">
                                    {data.stats.map((stat, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5">
                                            <span className="font-bold text-zinc-900 dark:text-white text-sm">
                                                {formatVal(stat.value)}
                                            </span>
                                            <span className="text-zinc-500 dark:text-zinc-400">
                                                {stat.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
