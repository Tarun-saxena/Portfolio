"use client";

import Image from "next/image";
import VisitorCounter from "./VisitorCounter";

export function ProfileHeader() {
    return (
        <section className="w-full py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                {/* Avatar + Info stacked next to it */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    {/* Square Avatar (~150px, rounded corners, white bg) */}
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-white overflow-hidden shrink-0 shadow-md border border-zinc-200 dark:border-zinc-800">
                        <Image
                            src="/avatar.png"
                            alt="Tarun avatar"
                            fill
                            priority
                            sizes="(min-width: 640px) 144px, 128px"
                            className="object-cover"
                        />
                    </div>

                    {/* Stacked Name, Role, Location */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                Tarun
                            </h1>
                        </div>

                        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-sans font-medium">
                            Full Stack Developer, DevOps-leaning.
                        </p>

                        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-sans mt-0.5">
                            19, Delhi, IND
                        </p>
                    </div>
                </div>

                {/* View count on far right, vertically centered */}
                <div className="shrink-0 flex items-center pt-2 sm:pt-0">
                    <VisitorCounter />
                </div>
            </div>
        </section>
    );
}
