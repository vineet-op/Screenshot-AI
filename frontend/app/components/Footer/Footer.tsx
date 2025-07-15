"use client"

import { ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";


export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-screen relative "
        >
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>
            <div className="container px-6 md:px-8 py-8 relative">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left side - Screenshots AI */}
                    <div className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-purple-400" />
                        <span className="font-semibold text-white font-sans tracking-tight instrument-serif-regular-italic">
                            Screenshots <span className="text-purple-400 instrument-serif-regular-italic">AI</span>
                        </span>
                    </div>

                    {/* Right side - Credits */}
                    <div className="flex items-center gap-2 text-gray-300 tracking-tighter relative">
                        <p className="text-sm text-white font-sans tracking-tight">
                            © 2024 Screenshots AI. Transforming Your Screenshot Workflow.
                        </p>
                    </div>

                </div>

                {/* Bottom row */}
                <div className="mt-6 pt-6 border-t border-purple-900 text-center relative">
                    <Link
                        href="https://X.com/Vineet2OP"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-light font-sans text-white hover:text-purple-300 transition-colors duration-300"
                    >
                        Designed and Developed by Vineet
                        <span className="ml-1 text-purple-400">💟</span>
                    </Link>
                </div>
            </div>
        </motion.footer>
    )
}