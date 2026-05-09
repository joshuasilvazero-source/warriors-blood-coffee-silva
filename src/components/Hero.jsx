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
          className="absolute inset-0 w-full h-full object-cover"
        >
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
            Small batch coffee crafted for those who gave everything — and never
            stopped fighting.
          </p>

          <div className="flex flex-wrap gap-5">
            <a
              href="#shop"
              className="bg-brandGold hover:bg-white text-black font-bold py-4 px-10 uppercase tracking-widest transition-all duration-300"
            >
              Shop Coffee
            </a>

            <a
              href="#about"
              className="border border-white hover:bg-white hover:text-black text-white font-bold py-4 px-10 uppercase tracking-widest transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;