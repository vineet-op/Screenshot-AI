"use client"

import Image from "next/image";
import { motion } from "motion/react";

export default function Homepage() {
    return (
        <section className="w-full h-full px-10 py-12 md:py-24 lg:py-32 xl:py-20 overflow-hidden text-white">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl "></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl delay-1000"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl delay-2000"></div>
            </div>

            <div className="flex flex-col h-full min-h-screen lg:justify-center items-center text-center lg:space-y-6 px-4 relative sm:gap-4 lg:gap-0">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-sans font-semibold text-4xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tighter text-center text-balance"
                >
                    Your Smart <span className="instrument-serif-regular-italic text-blue-500">
                        Screenshot
                    </span> Organizer
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-sans text-sm md:text-base lg:text-xl tracking-tighter text-center max-w-3xl text-balance pt-5 lg:p-0"
                >
                    Store, and intelligently manage your screenshots with the power of AI
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="w-full max-w-4xl px-4 py-8"
                >
                    <Image
                        src="/hero.jpg"
                        alt="Hero image"
                        width={1000}
                        height={1000}
                        className="w-full rounded-3xl shadow-2xl object-cover"
                    />
                </motion.div>
            </div>
        </section>
    )
}