"use client";

import React, { useState, useEffect, useRef } from "react";

interface NavigationMenuModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen?: () => void;
}

interface ActionItem {
    id: string;
    label: string;
    shortcut: string;
    category: "Sections" | "General";
    icon: React.ReactNode;
    action: () => void;
}

export function NavigationMenuModal({ isOpen, onClose, onOpen }: NavigationMenuModalProps) {
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToSection = (id: string) => {
        onClose();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const copyLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            onClose();
        }
    };

    const actions: ActionItem[] = [
        {
            id: "experience",
            label: "Experience",
            shortcut: "shift + E",
            category: "Sections",
            icon: (
                <svg className="w-4.5 h-4.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            action: () => scrollToSection("home"),
        },
        {
            id: "skills",
            label: "Skills",
            shortcut: "shift + S",
            category: "Sections",
            icon: (
                <svg className="w-4.5 h-4.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            action: () => scrollToSection("skills"),
        },
        {
            id: "projects",
            label: "Projects",
            shortcut: "shift + P",
            category: "Sections",
            icon: (
                <svg className="w-4.5 h-4.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            action: () => scrollToSection("projects"),
        },
        {
            id: "github",
            label: "GitHub",
            shortcut: "shift + G",
            category: "Sections",
            icon: (
                <svg className="w-4.5 h-4.5 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
            ),
            action: () => scrollToSection("open-source"),
        },
        {
            id: "copy-link",
            label: copied ? "Link Copied!" : "Copy Link",
            shortcut: "shift + C",
            category: "General",
            icon: (
                <svg className="w-4.5 h-4.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
            action: copyLink,
        },
    ];

    const filteredActions = actions.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setSelectedIndex(0);
        } else {
            setSearch("");
        }
    }, [isOpen]);

    // Keyboard navigation & global shortcuts (runs ALWAYS so 'k' or 'Cmd+K' opens modal)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const activeTag = document.activeElement?.tagName.toLowerCase();
            const isTyping = activeTag === "input" || activeTag === "textarea" || (document.activeElement as HTMLElement)?.isContentEditable;

            // Toggle Modal when 'k' or 'Cmd+K' / 'Ctrl+K' is pressed
            if (e.key.toLowerCase() === "k" && (!isTyping || e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                if (isOpen) {
                    onClose();
                } else if (onOpen) {
                    onOpen();
                }
                return;
            }

            // Global Shift shortcuts when typing is not active
            if (e.shiftKey && !e.ctrlKey && !e.metaKey && !isTyping) {
                if (e.key.toUpperCase() === "E") {
                    e.preventDefault();
                    scrollToSection("home");
                    return;
                }
                if (e.key.toUpperCase() === "S") {
                    e.preventDefault();
                    scrollToSection("skills");
                    return;
                }
                if (e.key.toUpperCase() === "P") {
                    e.preventDefault();
                    scrollToSection("projects");
                    return;
                }
                if (e.key.toUpperCase() === "G") {
                    e.preventDefault();
                    window.open("https://github.com/Tarun-saxena", "_blank");
                    return;
                }
                if (e.key.toUpperCase() === "C") {
                    e.preventDefault();
                    copyLink();
                    return;
                }
            }

            if (!isOpen) return;

            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filteredActions[selectedIndex]) {
                    filteredActions[selectedIndex].action();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, selectedIndex, filteredActions, onOpen, onClose]);

    if (!isOpen) return null;

    const sectionsList = filteredActions.filter((a) => a.category === "Sections");
    const generalList = filteredActions.filter((a) => a.category === "General");

    return (
        <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Modal Container - Dead Center, Larger Size & Premium Aesthetics */}
            <div
                className="w-full max-w-2xl sm:max-w-3xl bg-[#111113]/95 border border-zinc-800/90 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden font-sans text-zinc-200 animate-in zoom-in-95 duration-150 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Row */}
                <div className="p-5 sm:p-6 flex items-center justify-between border-b border-zinc-800/80 bg-[#141417]">
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl border border-zinc-700/60 bg-zinc-800/80 flex items-center justify-center text-zinc-200 shrink-0 shadow-inner">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                                Navigation Menu
                            </h2>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Quickly jump to sections or actions
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Search Input Bar */}
                <div className="px-5 py-3.5 bg-[#161619] border-b border-zinc-800/80 flex items-center gap-3.5">
                    <svg className="w-4.5 h-4.5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for actions..."
                        className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none font-sans"
                    />
                </div>

                {/* Action Items List */}
                <div className="max-h-[380px] sm:max-h-[440px] overflow-y-auto p-3 sm:p-4 space-y-4">
                    {/* Sections Group */}
                    {sectionsList.length > 0 && (
                        <div>
                            <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                                Sections
                            </div>
                            <div className="space-y-1.5 mt-1">
                                {sectionsList.map((item) => {
                                    const globalIdx = filteredActions.findIndex((a) => a.id === item.id);
                                    const isSelected = globalIdx === selectedIndex;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={item.action}
                                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                isSelected
                                                    ? "bg-zinc-800/90 text-white shadow-sm ring-1 ring-zinc-700/60"
                                                    : "text-zinc-300 hover:bg-zinc-800/40 hover:text-white"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3.5">
                                                {item.icon}
                                                <span className="text-sm font-medium">{item.label}</span>
                                            </div>
                                            <kbd className="px-2.5 py-1 rounded-md border border-zinc-700/80 bg-zinc-800/80 text-xs font-mono text-zinc-300 font-semibold shadow-xs">
                                                {item.shortcut}
                                            </kbd>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* General Group */}
                    {generalList.length > 0 && (
                        <div>
                            <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                                General
                            </div>
                            <div className="space-y-1.5 mt-1">
                                {generalList.map((item) => {
                                    const globalIdx = filteredActions.findIndex((a) => a.id === item.id);
                                    const isSelected = globalIdx === selectedIndex;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={item.action}
                                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                isSelected
                                                    ? "bg-zinc-800/90 text-white shadow-sm ring-1 ring-zinc-700/60"
                                                    : "text-zinc-300 hover:bg-zinc-800/40 hover:text-white"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3.5">
                                                {item.icon}
                                                <span className="text-sm font-medium">{item.label}</span>
                                            </div>
                                            <kbd className="px-2.5 py-1 rounded-md border border-zinc-700/80 bg-zinc-800/80 text-xs font-mono text-zinc-300 font-semibold shadow-xs">
                                                {item.shortcut}
                                            </kbd>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {filteredActions.length === 0 && (
                        <div className="py-10 text-center text-xs sm:text-sm text-zinc-500 font-sans">
                            No matching actions found
                        </div>
                    )}
                </div>

                {/* Footer Bar */}
                <div className="px-5 py-3 bg-[#141417] border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <div className="flex items-center gap-4">
                        <span>↑ ↓ to navigate</span>
                        <span>↵ to select</span>
                    </div>
                    <span>esc to close</span>
                </div>
            </div>
        </div>
    );
}
