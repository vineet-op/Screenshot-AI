"use client"

import Features from "./components/Features/Features";
import FinalCta from "./components/Final-Cta/FinalCta";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage";
import Works from "./components/Works/Works";
import Lenis from "lenis";
import { useEffect } from "react";


export default function Home() {
  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);


  return (
    <main className=" w-screen h-full bg-black/95 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <Homepage />
      <Works />
      <Features />
      <FinalCta />
      <Footer />
    </main>
  );
}
