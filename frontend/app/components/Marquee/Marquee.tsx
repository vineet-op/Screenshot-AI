"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

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
    speed = 80, // lower = faster
    direction = "left",
    pauseOnHover = true,
    className = "",
}: MarqueeProps) {
    const duplicatedImages = [...images, ...images]
    const marqueeRef = useRef<HTMLDivElement>(null)

    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                ref={marqueeRef}
                className="flex gap-6 w-max"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
                style={{
                    display: "flex",
                }}
            >
                {duplicatedImages.map((image, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-80 h-48 rounded-lg overflow-hidden shadow-lg"
                    >
                        <Image
                            src={image}
                            alt={`Marquee image ${index + 1}`}
                            width={320}
                            height={192}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
