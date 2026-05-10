import heroVideo from "../assets/videos/hero-video.mp4";

function Hero() {
    return (
        <section className="relative h-screen flex items-center overflow-hidden bg-black">
            <div className="absolute inset-0 z-0 bg-black">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover">
                    <source src={heroVideo} type="video/mp4" />
                </video>

                <div className="absolute inset-0 opacity-60"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-3xl">
                    <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
                        Born in Service.
                        <br />
                        <span className="gold-gradient-text italic">Roasted in Honor.</span>
                    </h2>

                    <p className="text-lg md:text-2xl mb-10 text-gray-300 font-light leading-relaxed max-w-2xl">
                        Small batch coffee crafted for those who gave everything — and never stopped
                        fighting.
                    </p>

                    <div className="flex flex-wrap gap-5">
                        {/* Shop Coffee */}
                        <a
                            href="#shop"
                            className="
            group
            relative
            inline-flex
            items-center
            justify-center
            overflow-hidden
            px-12
            py-4
            rounded-full
            font-bold
            uppercase
            tracking-[0.25em]
            text-black
            bg-gradient-to-r
            from-[#c5a059]
            via-[#b89146]
            to-[#8a6a32]
            hover:text-white
            transition-all
            duration-500
            hover:scale-105
            hover:shadow-[0_0_35px_rgba(197,160,89,0.45)]
            hover:-translate-y-1
            border
            border-[#d4b06a]/40
        ">
                            {/* Shine Overlay */}
                            <span
                                className="
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
            "></span>

                            <span className="relative z-10 flex items-center gap-3">
                                Shop Coffee
                                <span className="transition-transform duration-500 group-hover:translate-x-2"></span>
                            </span>
                        </a>

                        {/* Learn More */}
                        <a
                            href="#about"
                            className="
            group
            relative
            inline-flex
            items-center
            justify-center
            overflow-hidden
            px-12
            py-4
            rounded-full
            font-bold
            uppercase
            tracking-[0.25em]
            text-white
            border
            border-[#c5a059]/40
            bg-gradient-to-r
            from-[#2a1810]
            via-[#5c3a21]
            to-[#c5a059]
            transition-all
            duration-500
            hover:scale-105
            hover:shadow-[0_0_35px_rgba(197,160,89,0.45)]
            hover:-translate-y-1
        ">
                            {/* Shine Overlay */}
                            <span
                                className="
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
            "></span>

                            <span className="relative z-10 flex items-center gap-3">
                                Learn More
                                <span className="transition-transform duration-500 group-hover:translate-x-2"></span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
