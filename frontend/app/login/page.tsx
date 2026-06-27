"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { easeInOut, motion } from "motion/react"
import { toast } from "sonner"
import { loginSchema } from "@/lib/zodSchemas";

interface LoginFormData {
    email: string
    password: string
}

export default function Login() {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    })

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        setIsLoading(true)

        const parsed = loginSchema.safeParse(formData);

        if (!parsed.success) {
            setIsLoading(false);
            const errorMessage = parsed.error.issues[0]?.message || "Invalid input";
            toast(errorMessage);
            return;
        }

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, parsed.data, {
                withCredentials: true
            })

            setFormData({
                email: "",
                password: ""
            })

            toast("Login successful!");
            router.push("/all-Images");

        } catch (error) {
            if (error instanceof axios.AxiosError) {
                const errorMessage = error.response?.data?.error || "Login failed";
                console.error("Login error:", errorMessage);
                toast("Login Failed")
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            {/* Mesh Gradient Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Back to Home */}
            <Link
                href="/"
                className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group font-inter"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>

            {/* Main Content */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: -20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.5,
                    ease: easeInOut
                }}
                className="w-full max-w-md relative z-10">
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="text-center space-y-4 pb-8">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative bg-black rounded-lg p-3">
                                    <ImageIcon className="h-8 w-8 text-blue-400" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <CardTitle className="text-3xl instrument-serif-regular-italic text-white font-bold">Welcome back</CardTitle>
                            <CardDescription className="text-gray-400 font-inter">
                                Sign in to your Screenshots AI account
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 h-12 focus:border-blue-500 focus:ring-blue-500/20"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                        className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 h-12 focus:border-blue-500 focus:ring-blue-500/20"
                                        disabled={isLoading}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="py-2">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 h-12 font-medium cursor-pointer font-sans"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </div>
                        </form>
                        <div className="mt-4 text-center text-sm text-gray-400">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-blue-500 hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
