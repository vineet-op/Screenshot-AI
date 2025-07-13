import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export default function Works() {
    return (
        <section className="px-10 overflow-hidden text-white">
            <div className=" max-w-5xl mx-auto flex flex-col justify-center items-center text-center px-10">
                <h2 className="font-sans font-medium text-5xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-balance py-6">
                    How it Works
                </h2>
                <HeroVideoDialog
                    className="block dark:hidden"
                    animationStyle="top-in-bottom-out"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Hero Video"
                />
                <HeroVideoDialog
                    className="hidden dark:block"
                    animationStyle="top-in-bottom-out"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video"
                />
            </div>
        </section>
    )
}
