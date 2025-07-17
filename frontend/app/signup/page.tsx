"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { easeInOut, motion } from "motion/react"
import { toast } from "sonner"

interface SignupFormData {
    email: string
    name: string
    password: string
}

export default function Signup() {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<SignupFormData>({
        email: "",
        name: "",
        password: "",
    })

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call

        try {
            const response = await axios.post("http://localhost:8000/api/auth/register", formData)

            // Reset form data fields after successful registration
            setFormData({
                email: "",
                name: "",
                password: "",
            });

            setIsLoading(false)
            router.push("/login")

        } catch (error) {
            if (error instanceof axios.AxiosError) {
                const errorMessage = error.response?.data?.error || "Registration failed";
                console.error("Registration error:", errorMessage);
                setIsLoading(false);
                toast("Registration failed");
            } else {
                console.error("Unexpected error:", error);
                setIsLoading(false);
                toast("An unexpected error occurred");
            }
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
                            <CardTitle className="text-3xl instrument-serif-regular-italic text-white font-bold">
                                Create your account</CardTitle>
                            <CardDescription className="text-gray-400 font-inter">
                                Start organizing your screenshots with AI
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
                                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                                    Name
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
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
                            <Button
                                type="submit"
                                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 h-12 font-medium  cursor-pointer
                                font-sans"
                            >

                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </div>
                                ) : "Create account"}

                            </Button>

                        </form>

                        <div className="mt-4 text-center text-sm text-gray-400">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-500 hover:underline">
                                Log in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
