import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Works from "./components/Works/Works";

export default function Home() {
  return (
    <main className="w-full h-full bg-black/95 flex flex-col py-8  relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <Navbar />
      <Homepage />
      <Works />
    </main>
  );
}
