import React from "react";
import { Nav } from "@/components/Nav";
import { HeroBanner } from "@/components/HeroBanner";
import { ProfileHeader } from "@/components/ProfileHeader";
import { AboutSection } from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import GithubHeatmap from "@/components/GithubHeatmap";
import { SkillsSection } from "@/components/SkillsSection";
import { Footer } from "@/components/Footer";
import { ThemeAudioDock } from "@/components/ThemeAudioDock";
import { SectionFrame } from "@/components/ui/Primitives";

export default function Home() {
    return (
        <div className="min-h-screen bg-transparent text-zinc-900 dark:text-zinc-50 flex flex-col font-sans transition-colors duration-200">
            {/* Navigation Header */}
            <Nav />

            {/* Main Sections wrapped in SectionFrame containers */}
            <main className="w-full flex flex-col flex-1">
                {/* Hero Banner Section */}
                <SectionFrame id="home" showTopCrosshairs={false} paddingClassName="p-1 sm:p-1 md:p-1">
                    <HeroBanner />
                </SectionFrame>

                {/* Profile Section (01 / PROFILE) */}
                <SectionFrame showTopCrosshairs={true}>
                    <ProfileHeader />
                </SectionFrame>

                {/* About Section (02 / ABOUT) */}
                <SectionFrame id="about" showTopCrosshairs={true}>
                    <AboutSection />
                </SectionFrame>

                {/* Skills Section (03 / SKILLS) */}
                <SectionFrame id="skills" showTopCrosshairs={true} className="scroll-mt-20">
                    <SkillsSection />
                </SectionFrame>

                {/* Projects Section (04 / PROJECTS) */}
                <SectionFrame id="projects" showTopCrosshairs={true} className="scroll-mt-20">
                    <ProjectsSection />
                </SectionFrame>

                {/* Open Source Section (05 / OPEN SOURCE / GITHUB) */}
                <SectionFrame id="open-source" showTopCrosshairs={true} className="scroll-mt-20">
                    <GithubHeatmap />
                </SectionFrame>
            </main>

            {/* Footer */}
            <SectionFrame showTopCrosshairs={true} showBottomCrosshairs={true} noBottomBorder={true}>
                <Footer />
            </SectionFrame>

            {/* Floating Theme & Background Music Dock */}
            <ThemeAudioDock />
        </div>
    );
}
