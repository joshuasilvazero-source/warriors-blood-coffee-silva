import heroVideo from "../assets/videos/hero-video.mp4";
function Hero() {
    return (
        <section className="relative h-screen min-h-150 flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full  object-cover md:object-cover object-contain">
                    <source src={heroVideo} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute inset-0 bg-gradient-to-r from-brandBlack via-black/30 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl">
                    <h2 className="font-heading text-5xl md:text-7xl mb-6 leading-tight">
                        Born in Service.
                        <br />
                        <span className="gold-gradient-text italic">Roasted in Honor.</span>
                    </h2>

                    <p className="text-lg md:text-xl mb-8 text-gray-300 font-light leading-relaxed">
                        Small batch coffee crafted for those who gave everything — and never stopped
                        fighting.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            className="bg-brandGold hover:bg-white text-black font-bold py-4 px-10 uppercase tracking-widest transition-all"
                            href="#shop">
                            Shop Coffee
                        </a>

                        <a
                            className="border border-white hover:bg-white hover:text-black font-bold py-4 px-10 uppercase tracking-widest transition-all"
                            href="#about">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 z-10">
                <div className="max-w-4xl mx-auto flex justify-between px-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {[
                        ["★", "Premium Quality"],
                        ["♨", "Small Batch Roasted"],
                        ["⚒", "Veteran Crafted"],
                        ["🇺🇸", "Purpose Driven"]
                    ].map((badge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-[10px] uppercase tracking-tighter text-center w-1/4">
                            <div className="w-10 h-10 mb-2 border border-brandGold rounded-full flex items-center justify-center">
                                {badge[0]}
                            </div>
                            <span>{badge[1]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Hero;
