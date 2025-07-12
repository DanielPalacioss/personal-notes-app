import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils"
import {Toaster} from "sonner";

const fontSans = FontSans({
    variable: "--font-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Personal-Notes",
    description: "Application to create personal notes",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        {children}
        <Toaster richColors position="top-right" closeButton />
        </body>
        </html>
    );
}
