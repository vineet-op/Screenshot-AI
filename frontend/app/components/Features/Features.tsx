"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, Brain, Eye, Zap, Search, Share2, Cloud } from "lucide-react";
import { motion } from "motion/react";

type Feature = {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
}

export default function Features() {
    return (
        <motion.section
            id="features"
            className="mt-5 relative w-screen h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            <div className="container px-6 md:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-4 mb-16">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-sans tracking-tight"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            AI-Powered Screenshot Management
                        </motion.h2>
                        <motion.p
                            className="text-xl text-gray-400 max-w-2xl mx-auto font-sans tracking-tight"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Experience the future of screenshot organization with cutting-edge AI technology
                        </motion.p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            {
                                icon: Brain,
                                title: "AI Auto-Organization",
                                description: "Automatically categorize and tag screenshots using advanced computer vision",
                                color: "text-blue-400",
                                bgColor: "bg-blue-500/10",
                                borderColor: "border-blue-500/20",
                            },
                            {
                                icon: Eye,
                                title: "Visual Search",
                                description: "Find screenshots by describing what you see, not just text content",
                                color: "text-purple-400",
                                bgColor: "bg-purple-500/10",
                                borderColor: "border-purple-500/20",
                            },
                            {
                                icon: Zap,
                                title: "Instant Upload",
                                description: "Drag, drop, and organize thousands of screenshots in seconds",
                                color: "text-yellow-400",
                                bgColor: "bg-yellow-500/10",
                                borderColor: "border-yellow-500/20",
                            },
                            {
                                icon: Search,
                                title: "OCR Text Search",
                                description: "Search through text within your screenshots with 99% accuracy",
                                color: "text-green-400",
                                bgColor: "bg-green-500/10",
                                borderColor: "border-green-500/20",
                            },
                            {
                                icon: Share2,
                                title: "Smart Sharing",
                                description: "Generate secure links and collaborate with team members effortlessly",
                                color: "text-pink-400",
                                bgColor: "bg-pink-500/10",
                                borderColor: "border-pink-500/20",
                            },
                            {
                                icon: Cloud,
                                title: "Cloud Sync",
                                description: "Access your organized screenshots from any device, anywhere",
                                color: "text-cyan-400",
                                bgColor: "bg-cyan-500/10",
                                borderColor: "border-cyan-500/20",
                            },
                        ].map((feature: Feature, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card
                                    className={`bg-gray-900/50 ${feature.borderColor} border backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group font-sans tracking-tight`}
                                >
                                    <CardHeader className="pb-4">
                                        <div
                                            className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                        >
                                            <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                        </div>
                                        <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                                        <CardDescription className="text-gray-400 text-base leading-relaxed">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    )
}