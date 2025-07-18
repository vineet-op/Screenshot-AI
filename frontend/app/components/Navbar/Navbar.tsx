"use client"


import Link from "next/link"
import { motion } from "motion/react"

export default function Navbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="sticky top-0 z-50 backdrop-blur-2xl bg-white/10 shadow-2xl border border-white/20 rounded-3xl px-6 py-5 mx-auto w-[100%] max-w-7xl flex items-center justify-between glassmorphic text-white/80 font-inter">
            {/* Logo */}
            <div className="text-xl lg:text-2xl font-extrabold text-white instrument-serif-regular-italic">
                Screenshot <span className="text-blue-400">AI</span>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex space-x-6 text-white text-sm font-sans">
                <a href="#" className="hover:text-blue-300 transition">Home</a>
                <a href="#" className="hover:text-blue-300 transition">Works</a>
                <a href="#" className="hover:text-blue-300 transition">Features</a>
                <a href="#" className="hover:text-blue-300 transition">Explore</a>
            </div>

            {/* Auth Buttons */}
            <div className=" flex gap-4 justify-center items-center text-center font-sans">
                <Link href="/login" className="text-white hover:text-blue-300 cursor-pointer transition text-sm">
                    Login
                </Link>

                <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer px-2 py-1.5 rounded-full text-sm transition text-center">
                    Signup
                </Link>
            </div>
        </motion.nav>
    )
}
