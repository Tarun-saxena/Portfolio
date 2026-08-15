"use client";

import Image from "next/image";

export function HeroBanner() {
    return (
        <div className="w-full">
            <div className="relative w-full aspect-[3.2/1] min-h-[160px] overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-100 dark:bg-zinc-900 transition-all duration-300">
                {/* Light mode banner image: active in light mode */}
                <Image
                    src="/hero-light.png"
                    alt="Hero landscape light banner"
                    fill
                    priority
                    sizes="(min-width: 1000px) 1000px, 100vw"
                    className="object-cover object-center dark:hidden show-in-light"
                />

                {/* Dark mode banner image: active in dark mode (zoomed 2% to align position) */}
                <Image
                    src="/hero-dark.png"
                    alt="Hero landscape dark banner"
                    fill
                    priority
                    sizes="(min-width: 1000px) 1000px, 100vw"
                    className="object-cover object-center hidden dark:block show-in-dark scale-[1.06] origin-center"
                />
            </div>
        </div>
    );
}