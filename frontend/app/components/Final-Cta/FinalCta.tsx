"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, CheckCircle } from "lucide-react";
import { motion } from "motion/react";


export default function FinalCta() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="py-16 md:py-32 relative overflow-hidden w-screen h-screen flex flex-col justify-center items-center font-sans tracking-tight px-4"
        >

            <div className="container px-4 md:px-8 max-w-6xl mx-auto relative z-10 text-center pt-10 md:pt-20">
                <div className="space-y-6 md:space-y-9">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="space-y-4 tracking-tighter"
                    >
                        <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 px-3 md:px-4 rounded-full py-1 md:py-2 mb-4 md:mb-8 text-xs md:text-sm">
                            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                            Your Journey Begins Now
                        </Badge>
                        <h2 className="text-2xl md:text-5xl font-bold text-white text-balance leading-tight">
                            Transform Your{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Screenshot
                            </span>
                            {" "}Workflow
                        </h2>
                        <p className="text-sm md:text-base text-balance text-gray-300 max-w-3xl mx-auto leading-relaxed md:leading-6 px-2">
                            Stop wasting precious time hunting through folders. Your screenshots are about to become your most organized.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 md:mt-18"
                    >
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 px-4 md:px-6 py-2 md:py-4 text-xs md:text-sm font-medium group cursor-pointer"
                        >
                            <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Explore now
                            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}