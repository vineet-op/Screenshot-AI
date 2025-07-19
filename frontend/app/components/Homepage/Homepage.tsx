"use client"

import { motion } from "motion/react";
import Navbar from "../Navbar/Navbar";
import Marquee from "../Marquee/Marquee";

export default function Homepage() {

    const customImages = [

        "https://lh3.googleusercontent.com/0yrdGKDmRSLL2A7XTywHhh45n_ZdI4fbJME2_Jhng2hyCJ8r6hvTyq1muLTTJ7lCB5hDnXGsmnj6dCL_DSVtfo4YzEA=s1280-w1280-h800",

        "https://miro.medium.com/v2/resize:fit:2000/1*vxuCJU7POg35CKwTAAvbhw.jpeg",

        "https://lh3.googleusercontent.com/kiyFGiDeiWa3VuILXq-0AcZFuqfr1aMHZ0ePs_4iL4dE3U_hNKfXPfzg8_7HLrd6wFXR48ET6D6MEh5pAv07_2SlJF8=s1280-w1280-h800",

        "https://lh3.googleusercontent.com/0yrdGKDmRSLL2A7XTywHhh45n_ZdI4fbJME2_Jhng2hyCJ8r6hvTyq1muLTTJ7lCB5hDnXGsmnj6dCL_DSVtfo4YzEA=s1280-w1280-h800",

        "https://www.popsci.com/wp-content/uploads/2022/03/17/telegram-screenshot.jpg?quality=85",

        "https://images.ctfassets.net/8aevphvgewt8/5fErhOtgvjrf97d7wOoARB/b262e06c615977f33046c468147aa114/screenshot-windows-dark.png",
    ]

    return (
        <section className="w-screen h-screen px-10 py-12 md:py-10 overflow-hidden text-white">
            <Navbar />
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl "></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl delay-1000"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl delay-2000"></div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col h-full mt-8 gap-4 items-center text-center lg:space-y-3 px-4 relative sm:gap-4 lg:gap-1 lg:mt-15">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="px-2 py-1 text-xs bg-purple-500/20 relative text-white border-purple-500/30 rounded-full font-sans"
                >
                    Screenshot Manager
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-sans font-medium text-4xl md:text-4xl mt-2   lg:text-5xl xl:text-6xl tracking-tight text-center text-balance"
                >
                    Organize <span className="instrument-serif-regular-italic bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
                        Screenshots
                    </span> Smarter with AI
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="font-sans text-sm md:text-base lg:text-md font-normal tracking-tighter text-center max-w-3xl lg:p-0 text-neutral-300"
                >
                    Say goodbye to messy folders and endless scrolling, a tool automatically organizes, categorizes, and labels your screenshots saving you time and boosting productivity.
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full shadow-lg transition-all duration-300 font-sans text-sm md:text-base lg:text-sm lg:mt-4 tracking-tight flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                    Get Started
                </motion.button>

                {/* //Marquee */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="lg:w-full px-20 mt-8 flex">
                    <Marquee images={customImages} speed={10} className="bg-black/20 border border-white/10 p-6 rounded-xl shadow-2xl transition-all duration-300" />
                </motion.div>
            </motion.div>

        </section>
    )
}
