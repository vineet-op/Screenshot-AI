"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, CheckCircle, Clock, Copy, Download, ExternalLink, Eye, FileImage, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

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

export default function All_Images() {

    const [screenshots, setScreenshots] = useState<ScreenshotProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [imageLoaded, setImageLoaded] = useState(false)
    const [showFullText, setShowFullText] = useState(false)
    const [shareSuccess, setShareSuccess] = useState(false)

    const selectedCard = screenshots.find((item) => item._id === selectedId);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "text-green-400 bg-green-400/10 border-green-400/20"
            case "processing":
                return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
            case "failed":
                return "text-red-400 bg-red-400/10 border-red-400/20"
            default:
                return "text-gray-400 bg-gray-400/10 border-gray-400/20"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return <CheckCircle className="w-4 h-4" />
            case "processing":
                return <Clock className="w-4 h-4" />
            case "failed":
                return <AlertCircle className="w-4 h-4" />
            default:
                return <Clock className="w-4 h-4" />
        }
    }

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + "..."
    }


    const copyPathToClipboard = async () => {
        try {
            if (!selectedCard) {
                console.error("No card selected");
                return;
            }
            await navigator.clipboard.writeText(selectedCard.path)
            setShareSuccess(true)
            setTimeout(() => setShareSuccess(false), 2000)
        } catch (err) {
            console.error("Failed to copy path:", err)
        }
    }

    const openImageInNewTab = () => {
        if (selectedCard) {
            window.open(selectedCard.path, "_blank")
        }
    }

    const getUserIdFromServer = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/auth/me", {
                credentials: "include",
            });

            if (!res.ok) throw new Error("Not authenticated");

            const data = await res.json();
            console.log("User data from server:", data.userId);
            return data.userId;
        } catch (err) {
            console.error("Error getting user:", err);
            return null;
        }
    };

    const getAllScreenshots = async () => {

        const userId = await getUserIdFromServer();
        console.log("User ID from server:", userId);

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

            console.log("Screenshots fetched successfully:", response.data);
            const fetchedScreenshots = response.data;
            setScreenshots(fetchedScreenshots);
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 py-10 relative">
                    {loading ? (
                        <div className="col-span-full flex justify-center font-sans items-center">
                            <p className="text-white">Loading screenshots...</p>
                        </div>
                    ) : screenshots.length === 0 ? (
                        <div className="col-span-full flex flex-col justify-center items-center space-y-4 text-center">
                            <p className="text-white text-lg">No screenshots found</p>
                            <Link
                                href="/dashboard"
                                className="text-blue-500 font-sans hover:underline hover:text-blue-400 transition-colors"
                            >
                                Upload an screenshots now
                            </Link>
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
                        className="fixed inset-0 backdrop-blur-lg px-10 flex items-center justify-center font-sans z-50 overflow-y-auto"
                        style={{ maxHeight: "100vh" }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setSelectedId(null);
                            }
                        }}
                    >

                        <Card
                            id={`card-${selectedCard.filename}`}
                            className="w-full max-w-xl bg-gradient-to-br from-blue-100 to-white border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 mt-80"
                        >
                            <CardHeader >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <FileImage className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate max-w-xs">
                                                {selectedCard.originalName}
                                            </h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {selectedCard.mimetype} • {formatFileSize(selectedCard.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(selectedCard.status)}`}>
                                        {getStatusIcon(selectedCard.status)}
                                        <span className="text-sm font-medium capitalize">{selectedCard.status}</span>
                                    </div>
                                </div>
                            </CardHeader>

                            {/* Share Actions Bar */}
                            <div className="px-6 pb-4">
                                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <ExternalLink className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">Path:</span>
                                        <code className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded truncate flex-1 min-w-0">
                                            {selectedCard.path}
                                        </code>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <button
                                            onClick={copyPathToClipboard}
                                            className="p-2 text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                            title="Copy path to clipboard"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={openImageInNewTab}
                                            className="p-2 text-slate-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                                            title="Open image in new tab"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                {shareSuccess && (
                                    <div className="mt-2 text-center">
                                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                            ✓ Action completed successfully!
                                        </span>
                                    </div>
                                )}
                            </div>

                            <CardContent className="space-y-4">
                                {/* Image Preview */}
                                <div className="relative group">
                                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-xl overflow-hidden shadow-inner">
                                        {!imageLoaded && (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                            </div>
                                        )}
                                        <img
                                            src={selectedCard.path || "/placeholder.svg"}
                                            alt={selectedCard.originalName}
                                            className={`w-full h-full object-conatin transition-all duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"} group-hover:scale-105`}
                                            onLoad={() => setImageLoaded(true)}
                                            onError={() => setImageLoaded(true)}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <Eye className="w-8 h-8 text-white drop-shadow-lg" />
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                {selectedCard.tags && selectedCard.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        <Tag className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-1" />
                                        {selectedCard.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {/* Extracted Text */}
                                {selectedCard.extractedText && (
                                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                            <FileImage className="w-4 h-4" />
                                            Extracted Text
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {showFullText ? selectedCard.extractedText : truncateText(selectedCard.extractedText, 150)}
                                            {selectedCard.extractedText.length > 150 && (
                                                <button
                                                    onClick={() => setShowFullText(!showFullText)}
                                                    className="ml-2 text-blue-500 hover:text-blue-600 font-medium text-sm"
                                                >
                                                    {showFullText ? "Show less" : "Show more"}
                                                </button>
                                            )}
                                        </p>
                                    </div>
                                )}

                                {/* Image Info */}
                                {selectedCard.imageInfo && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Image Analysis</h4>
                                        <p className="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">{selectedCard.imageInfo}</p>
                                    </div>
                                )}

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">Source</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{selectedCard.source}</p>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">Uploaded</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{formatDate(selectedCard.uploadedAt)}</p>
                                    </div>
                                </div>

                                {/* Error Display */}
                                {selectedCard.error && (
                                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertCircle className="w-4 h-4 text-red-500" />
                                            <span className="text-sm font-medium text-red-900 dark:text-red-100">Error</span>
                                        </div>
                                        <p className="text-sm text-red-700 dark:text-red-200">{selectedCard.error}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}