"use client";

import Image from "next/image";

export function HeroBanner() {
    return (
        <div className="w-full relative select-none">
            {/* Structural Metadata Overlay */}
            <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                    [FIG_01.0] VISUAL_LANDSCAPE
                </span>
                <span className="font-mono text-[11px] tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                    1040 × 310 PX
                </span>
            </div>

            {/* Banner Container with 1px border framing and 12px rounded corners */}
            <div className="relative w-full aspect-[3.4/1] min-h-[200px] sm:min-h-[280px] md:min-h-[310px] overflow-hidden rounded-[12px] border border-[var(--border)] bg-zinc-100 dark:bg-[#0c0c0c] transition-all duration-300">
                {/* Light mode banner image */}
                <Image
                    src="/hero-light.png"
                    alt="Hero landscape light banner"
                    fill
                    priority
                    sizes="(min-width: 1040px) 1040px, 100vw"
                    className="object-cover object-center dark:hidden show-in-light transition-opacity duration-500"
                />

                {/* Dark mode banner image */}
                <Image
                    src="/hero-dark.png"
                    alt="Hero landscape dark banner"
                    fill
                    priority
                    sizes="(min-width: 1040px) 1040px, 100vw"
                    className="object-cover object-center hidden dark:block show-in-dark scale-[1.05] origin-center transition-all duration-500"
                />

                {/* Subtle dark integration vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 dark:from-black/40 dark:to-transparent pointer-events-none" />
            </div>
        </div>
    );
}