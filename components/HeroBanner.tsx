"use client";

import Image from "next/image";

export function HeroBanner() {
    return (
        <div className="w-full relative select-none">
            {/* Framed banner container with 4px gap from all sides and 8px rounded corners */}
            <div className="relative w-full aspect-[3.35/1] overflow-hidden rounded-[8px] border border-[var(--border)] bg-zinc-100 dark:bg-[#0c0c0c] transition-all duration-300">
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