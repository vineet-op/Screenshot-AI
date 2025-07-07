"use client"


import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/10 shadow-2xl border border-white/20 rounded-3xl px-6 py-5 mx-auto w-[95%] max-w-7xl flex items-center justify-between glassmorphic text-white/80 font-inter">
            {/* Logo */}
            <div className="text-2xl font-extrabold text-white instrument-serif-regular-italic">
                Screenshot <span className="text-blue-400">AI</span>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex space-x-6 text-white text-sm font-medium">
                <a href="#" className="hover:text-blue-300 transition">Home</a>
                <a href="#" className="hover:text-blue-300 transition">Features</a>
                <a href="#" className="hover:text-blue-300 transition">About</a>
            </div>

            {/* Auth Buttons */}
            <div className="space-x-4 font-medium">
                <Link href="/login" className="text-white hover:text-blue-300 cursor-pointer transition text-sm">
                    Login
                </Link>

                <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer px-4 py-1.5 rounded-full text-sm transition">
                    Sign Up
                </Link>
            </div>
        </nav>
    )
}
