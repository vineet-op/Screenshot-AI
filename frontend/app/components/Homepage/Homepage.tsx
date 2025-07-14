"use client"

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export default function Homepage() {
    return (
        <section className="w-screen h-screen px-10 py-12 md:py-24 overflow-hidden text-white">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl "></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl delay-1000"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl delay-2000"></div>
            </div>

            <div className="flex flex-col h-full min-h-screen items-center text-center lg:space-y-6 px-4 relative sm:gap-4 lg:gap-4">
                <Badge className="px-6 py-1 border-purple-500 rounded-full font-sans">AI-Powered Screenshot Management</Badge>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-sans font-medium text-4xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-center text-balance"
                >
                    Organize <span className="instrument-serif-regular-italic bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
                        Screenshots
                    </span> Smarter with AI
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-sans text-xs md:text-base lg:text-lg font-normal tracking-tighter text-center max-w-4xl pt-5 lg:p-0 text-neutral-100"
                >
                    Say goodbye to messy folders and endless scrolling, a tool automatically organizes, categorizes, and labels your screenshots saving you time and boosting productivity.
                </motion.div>

                <button>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full shadow-lg transition-all duration-300 font-sans text-sm md:text-base lg:text-sm tracking-tight flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                        Get Started
                    </motion.div>
                </button>

            </div>
        </section>
    )
}
