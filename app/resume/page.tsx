import React from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ThemeAudioDock } from "@/components/ThemeAudioDock";
import { SectionFrame, Crosshair } from "@/components/ui/Primitives";

export const metadata = {
    title: "Resume | Tarun Saxena",
    description: "Tarun Saxena's Resume - Full Stack Developer & DevOps Enthusiast",
};

export default function ResumePage() {
    return (
        <div className="min-h-screen bg-transparent text-zinc-900 dark:text-zinc-50 flex flex-col font-sans transition-colors duration-200">
            {/* Navigation Header space preserved without navbar links/buttons */}
            <header className="w-full border-b border-[var(--border)] bg-[#fafafa] dark:bg-[#090909] sticky top-0 z-40 transition-colors duration-200">
                <div className="max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8 h-[52px] relative">
                    {/* Left & Right 1px Vertical Boundary Lines through Header */}
                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[var(--border)] pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-[var(--border)] pointer-events-none" />

                    {/* Corner Crosshair Markers */}
                    <Crosshair className="-top-[5px] -left-[5px]" />
                    <Crosshair className="-top-[5px] -right-[5px]" />
                    <Crosshair className="-bottom-[5px] -left-[5px]" />
                    <Crosshair className="-bottom-[5px] -right-[5px]" />
                </div>
            </header>

            {/* Main Resume Content Container wrapped in SectionFrame */}
            <main className="w-full flex flex-col flex-1">
                <SectionFrame showTopCrosshairs={false} paddingClassName="py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8">
                    <div className="flex flex-col gap-6 w-full">
                        {/* Top Header Row: Back button + Page Title */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/70 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 shadow-xs shrink-0"
                                title="Back to Homepage"
                            >
                                <svg className="w-4 h-4 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Back</span>
                            </Link>

                            <div className="flex flex-col justify-center gap-0.5">
                                <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                    Resume
                                </h1>
                            </div>
                        </div>

                        {/* Card Container holding PDF Header & Inline Preview */}
                        <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800/90 bg-zinc-50/60 dark:bg-[#121212]/90 p-4 sm:p-6 space-y-5 shadow-sm relative overflow-hidden bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.02)_4px,rgba(0,0,0,0.02)_8px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.02)_4px,rgba(255,255,255,0.02)_8px)]">
                            {/* Card Header Row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
                                {/* File Icon / Logo of PDF only */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 shrink-0 shadow-xs">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Right Side Action Buttons matching socials row styling */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                    {/* Open in new tab */}
                                    <a
                                        href="/Tarun_Saxena_Resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors text-xs font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer"
                                    >
                                        <span>Open in new tab</span>
                                        <svg className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>

                                    {/* Download */}
                                    <a
                                        href="/Tarun_Saxena_Resume.pdf"
                                        download="Tarun_Saxena_Resume.pdf"
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors text-xs font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer"
                                    >
                                        <svg className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>Download</span>
                                    </a>
                                </div>
                            </div>

                            {/* Embedded Inline Preview of the PDF */}
                            <div className="w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-inner h-[650px] sm:h-[800px] md:h-[920px] relative">
                                <iframe
                                    src="/Tarun_Saxena_Resume.pdf"
                                    className="w-full h-full border-0"
                                    title="Tarun Saxena Resume PDF Preview"
                                />
                            </div>
                        </div>
                    </div>
                </SectionFrame>
            </main>

            {/* Footer */}
            <SectionFrame showTopCrosshairs={true} showBottomCrosshairs={true} noBottomBorder={true}>
                <Footer />
            </SectionFrame>

            {/* Theme & Background Music Dock */}
            <ThemeAudioDock />
        </div>
    );
}
