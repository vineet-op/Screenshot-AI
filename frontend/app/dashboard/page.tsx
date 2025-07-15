"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner"

export default function Dashboard() {

    const [previews, setPreviews] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/login");
        }
    }, [router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            const urls = fileArray.map((file) => URL.createObjectURL(file));
            setPreviews(urls);
            setImages(fileArray);
        }
    };

    const UploadImages = async () => {
        if (images.length === 0) return alert("No images selected.");

        const formData = new FormData();
        images.forEach((image) => {
            formData.append("uploadedImages", image); // adjust key as per your backend
        });

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:8000/api/user/upload_images",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // If response has images:
            if (response.data?.images) {
                const uploaded = response.data.images;
                console.log(uploaded);
                setImages(uploaded); // Adjust as needed
            }
            toast("Upload successful!")
        } catch (err) {
            toast("Upload failed!")
            console.error("Upload failed:", err);
        } finally {
            setLoading(false);
            setPreviews([]);
            setImages([]);
        }
    };


    return (
        <section className="w-screen h-screen bg-black/95 flex flex-col py-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>


            <div className="flex items-center h-full flex-col text-center  space-y-8 mt-24 md:px-0">
                <h1 className="text-white text-5xl font-inter font-semibold tracking-tight">Upload your Screenshots</h1>

                <div className="mt-10 w-full lg:max-w-lg max-w-md">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-300 
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-600/20 file:text-blue-300
                        hover:file:bg-blue-600/40
                        cursor-pointer"
                    />
                    <button
                        onClick={UploadImages}
                        disabled={loading}
                        className="mt-14 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 text-white py-2 rounded-lg 
                        transition-all duration-300 ease-in-out font-sans 
                        cursor-pointer transform focus:outline-none text-sm "
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>


                {/* Image Previews */}
                <div className="mt-10 grid grid-cols-2 gap-4 px-4 max-w-md z-99">
                    {previews.map((src, idx) => (
                        <Image
                            key={idx}
                            src={src}
                            alt={`preview-${idx}`}
                            width={200}
                            height={128}
                            className="w-full h-32 object-cover rounded-md border border-white/20"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}