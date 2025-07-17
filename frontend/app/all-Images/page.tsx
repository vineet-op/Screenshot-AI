"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ScreenshotProps {
    _id: string;
    userId: string;
    filename: string;
    originalName: string;
    path: string;
    mimetype: string;
    size: number;
    tags: string[];
    source: string;
    extractedText: string;
    status: "completed" | "pending" | "failed";
    error: string;
    uploadedAt: string;
    __v: number;
    imageInfo: string;
    processedAt: string;
}

interface JwtPayload {
    userId: string;
    email: string;
    exp: number;
    iat: number;
}



export default function All_Images() {

    const [screenshots, setScreenshots] = useState<ScreenshotProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedCard = screenshots.find((item) => item._id === selectedId);


    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token"); // adjust key if different
        if (!token) return null;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            console.log("Decoded JWT:", decoded.userId); // Debugging line
            return decoded.userId;
        } catch (err) {
            console.error("Failed to decode token", err);
            return null;
        }
    };

    const getAllScreenshots = async () => {
        const userId = getUserIdFromToken();
        if (!userId) {
            console.error("User ID not found in token");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8000/api/user/getall_images", {
                params: {
                    userId
                },
            });

            // Explicitly set the screenshots state after the response is received
            const fetchedScreenshots = response.data;
            setScreenshots(fetchedScreenshots);
            console.log("Screenshots fetched successfully:", fetchedScreenshots);
        } catch (err) {
            console.error("Failed to fetch screenshots", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllScreenshots();
    }, [])

    return (
        <section className="w-screen lg:px-60 px-10 min-h-screen bg-black/95 relative overflow-hidden text-white">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl "></div>
            </div>
            <div className="flex items-center h-full flex-col text-center space-y-8 mt-24 md:px-0">
                <h1 className="text-white text-5xl font-sans relative font-semibold tracking-tighter">All Screenshots</h1>
                <div className="grid gris-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 py-10 relative">
                    {loading ? (
                        <div className="col-span-full flex justify-center font-sans items-center">
                            <p className="text-white">Loading screenshots...</p>
                        </div>
                    ) : screenshots.length === 0 ? (
                        <div className="col-span-full flex justify-center font-sans items-center">
                            <p className="text-white">No screenshots found</p>
                        </div>
                    ) : (
                        screenshots.map((screenshot) => (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    filter: "blur(10px)",
                                }}
                                animate={{
                                    opacity: 1,
                                    filter: "blur(0px)",
                                }}
                                exit={{
                                    opacity: 0,
                                    filter: "blur(10px)",
                                }}
                                transition={{
                                    duration: 0.3,
                                    delay: screenshot._id ? screenshots.findIndex(s => s._id === screenshot._id) * 0.1 : 0,
                                }}

                                layoutId={`card-${screenshot._id}`}
                                onClick={() => setSelectedId(screenshot._id)}
                                key={screenshot._id}
                                className="bg-black/95 rounded-xl overflow-hidden shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300 cursor-pointer"
                            >
                                <Image
                                    src={screenshot.path}
                                    alt={`Screenshot ${screenshot._id}`}
                                    className="w-full h-64 object-cover"
                                    width={500}
                                    height={256}
                                />
                                <div className="p-6 flex items-start flex-col space-y-2">
                                    <h3 className="text-sm font-sans font-semibold text-gray-200">
                                        {screenshot?.originalName || 'Untitled Screenshot'}
                                    </h3>
                                    <p className="text-xs font-sans font-medium text-gray-400">
                                        Uploaded at {new Date(screenshot?.uploadedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {selectedId && selectedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        layoutId={`card-${selectedId}`} // ✅ Match the card's layoutId
                        className="fixed inset-0 backdrop-blur-lg flex items-center justify-center font-sans"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            className=" text-neutral-100 rounded-lg p-6 w-full max-w-xl bg-black/95 shadow-lg relative"
                        >
                            <Image
                                src={selectedCard.path}
                                alt={selectedCard.originalName}
                                width={500}
                                height={256}
                                className="rounded object-cover w-full h-64"
                            />
                            <h2 className="text-xl font-bold mt-4">{selectedCard.originalName}</h2>
                            <div className="text-sm text-gray-600 mt-4 flex flex-wrap gap-2">
                                {selectedCard.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        className=" text-black bg-white px-2 py-1 rounded-full text-xs"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 mt-4">Image Info</h3>
                                <p className="text-sm text-gray-200 mt-2">{selectedCard.imageInfo}</p>
                            </div>
                            <button
                                onClick={() => setSelectedId(null)}
                                className="mt-6 bg-red-400 cursor-pointer text-sm rounded-full text-neutral-200 px-4 py-2"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    )
}