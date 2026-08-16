import React from "react";

export function TechnicalGrid() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full min-h-full select-none">
            {/* Outer Margin Left Diagonal Texture (Outside 1040px Main Frame) */}
            <div className="absolute top-0 bottom-0 left-0 right-[calc(50%+520px)] bg-diagonal-left hidden md:block opacity-90" />

            {/* Outer Margin Right Diagonal Texture (Outside 1040px Main Frame) */}
            <div className="absolute top-0 bottom-0 left-[calc(50%+520px)] right-0 bg-diagonal-right hidden md:block opacity-90" />

            {/* Centered 1040px Main Content Architectural Frame */}
            <div className="w-full max-w-[1040px] mx-auto relative h-full">
                {/* Left 1px Vertical Boundary Line */}
                <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[var(--border)]" />

                {/* Right 1px Vertical Boundary Line */}
                <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-[var(--border)]" />
            </div>
        </div>
    );
}

