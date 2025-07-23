"use client"

import { motion } from "motion/react";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export default function Works() {
    return (
        <section id="work" className="px-10 w-screen h-full overflow-hidden text-white relative">
            <div className="max-w-6xl mx-auto flex flex-col justify-center items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-sans font-bold text-5xl md:text-5xl lg:text-5xl xl:text-5xl text-center tracking-tight text-balance py-3"
                >
                    How it Works
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl lg:text-xl xl:text-xl text-center text-gray-400 mb-6 font-sans font-normal tracking-tight leading-relaxed mx-auto"
                >
                    Discover how our platform simplifies your workflow and enhances productivity.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >

                    <HeroVideoDialog
                        className="block dark:hidden lg:w-6xl xl:w-6xl w-md"
                        animationStyle="top-in-bottom-out"
                        videoSrc="https://www.youtube.com/embed/YvxdTdqsT64?si=uTmYY0puE4Udy8Nr"
                        thumbnailSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5ilcYrZ4odJH3QwjoVCYBWqsVyKcQTteFw&s"
                        thumbnailAlt="Project Working"
                    />
                </motion.div>
            </div>
        </section>
    )
}
