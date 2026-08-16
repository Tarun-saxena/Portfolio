import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TechnicalGrid } from "@/components/TechnicalGrid";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tarun | Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-50 relative">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TechnicalGrid />
          <div className="relative z-10 flex-1 flex flex-col w-full min-h-full">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
