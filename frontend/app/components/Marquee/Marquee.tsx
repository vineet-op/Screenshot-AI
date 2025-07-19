"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface MarqueeProps {
    images?: string[]
    speed?: number
    direction?: "left" | "right"
    pauseOnHover?: boolean
    className?: string
}

export default function Marquee({
    images = [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
    ],
    speed = 10,
    direction = "right",
    pauseOnHover = true,
    className = "",
}: MarqueeProps) {
    // Duplicate images for seamless loop
    const duplicatedImages = [...images, ...images]

    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div
                className="flex gap-6"
                animate={{
                    x: direction === "right" ? [0, -100 * images.length] : [-100 * images.length, 0],
                }}
                transition={{
                    x: {
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
                whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
                style={{
                    width: `${duplicatedImages.length * 100}%`,
                }}
            >
                {duplicatedImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-80 h-48 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={image || "/placeholder.svg"}
                            alt={`Marquee image ${(index % images.length) + 1}`}
                            width={320}
                            height={192}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
