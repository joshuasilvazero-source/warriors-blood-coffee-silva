import aboutHero from "../assets/images/about-hero.jpg";
import aboutSplit from "../assets/images/about-split.jpg";
import aboutBeans from "../assets/images/about-beans.jpg";
import aboutCta from "../assets/images/about-cta.jpg";
import warriorBloodLogo from "../assets/images/warrior-blood-logo-done.png";

export default function About() {
    return (
        <main className="relative min-h-screen pt-28 pb-24 bg-[#1a0e06] overflow-hidden">
            {/* Page background gradients */}
            <div className="absolute inset-0 bg-linear-to-b from-[#3b1f0a] via-[#1f0f04] to-[#0e0804] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.18)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,70,20,0.12)_0%,transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_60%,rgba(139,70,20,0.1)_0%,transparent_50%)] pointer-events-none" />

            <section className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <p className="text-brandGold uppercase tracking-[0.3em] text-xs mb-4">
                        Our Story
                    </p>

                    <div className="flex items-center justify-center space-x-6 mb-4">
                        <span className="text-brandGold text-2xl">★</span>
                        <h1 className="font-heading text-4xl md:text-5xl tracking-[0.25em] uppercase gold-gradient-text">
                            About Us
                        </h1>
                        <span className="text-brandGold text-2xl">★</span>
                    </div>

                    <p className="text-gray-400 font-serif italic max-w-xl mx-auto">
                        Warriors Blood Coffee Company — forged with purpose, roasted with honor.
                    </p>

                    <div className="mt-6 w-24 h-px bg-brandGold/50 mx-auto" />
                </div>

                {/* Hero Image */}
                <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden border border-white/10 mb-20">
                    <img
                        src={aboutHero}
                        alt="About Warriors Blood Coffee"
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0e0804] via-transparent to-transparent" />
                </div>

                {/* Split Row */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                    {/* Left — Image */}
                    <div className="md:w-1/2">
                        <div className="rounded-3xl overflow-hidden border border-white/10 hover:border-brandGold/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(197,160,89,0.1)]">
                            <img
                                src={aboutSplit}
                                alt="Coffee craftsmanship"
                                className="w-full h-80 object-cover"
                            />
                        </div>
                    </div>

                    {/* Right — Text */}
                    <div className="md:w-1/2 bg-[#111111] border border-white/10 rounded-3xl p-8 hover:border-brandGold/30 transition-all duration-300">
                        <p className="text-brandGold uppercase tracking-[0.3em] text-xs mb-4">
                            Who We Are
                        </p>
                        <h2 className="font-heading text-2xl md:text-3xl tracking-wide uppercase gold-gradient-text mb-4">
                            Warriors Blood Coffee
                            <br />
                            Roasting Company
                        </h2>
                        <div className="w-16 h-px bg-brandGold/50 mb-6" />
                        <p className="text-gray-300 font-serif italic text-lg leading-relaxed">
                            &ldquo;Will update in the future.&rdquo;
                        </p>
                    </div>
                </div>

                {/* Reverse Split Row */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-20">
                    {/* Right — Image */}
                    <div className="md:w-1/2">
                        <div className="rounded-3xl overflow-hidden border border-white/10 hover:border-brandGold/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(197,160,89,0.1)]">
                            <img
                                src={aboutBeans}
                                alt="Warriors Blood logo on coffee beans"
                                className="w-full h-80 object-cover"
                            />
                        </div>
                    </div>

                    {/* Left — Text */}
                    <div className="md:w-1/2 bg-[#111111] border border-white/10 rounded-3xl p-8 hover:border-brandGold/30 transition-all duration-300">
                        <p className="text-brandGold uppercase tracking-[0.3em] text-xs mb-4">
                            Our Mission
                        </p>
                        <h2 className="font-heading text-2xl md:text-3xl tracking-wide uppercase gold-gradient-text mb-4 italic">
                            &ldquo;Will update in the future&rdquo;
                        </h2>
                        <div className="w-16 h-px bg-brandGold/50 mb-6" />
                        <p className="text-gray-400 font-serif italic text-base leading-relaxed">
                            &ldquo;Will update in the future.&rdquo;
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="relative w-full overflow-hidden mt-8">
                <img
                    src={aboutCta}
                    alt="Warriors Blood CTA"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#0e0804]/90 via-transparent to-[#0e0804]/90" />

                <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-8 py-24 gap-8">
                    {/* Left Button */}
                    <a
                        href="/products"
                        className="
              rounded-full
              bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32]
              hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740]
              text-black hover:text-white
              font-bold
              py-4 px-10
              uppercase tracking-[0.2em] text-sm
              transition-all duration-500
              hover:scale-[1.02]
              hover:shadow-[0_0_30px_rgba(197,160,89,0.45)]
              border border-[#d4b06a]/40
              backdrop-blur-sm
            ">
                        Shop Coffee
                    </a>

                    {/* Center Image */}
                    <div className="shrink-0">
                        <div className="w-48 h-48 rounded-full ">
                            <img
                                src={warriorBloodLogo}
                                alt="Warriors Blood Logo"
                                className="w-full h-full object-cover scale-[1.22]"
                            />
                        </div>
                    </div>

                    {/* Right Button */}
                    <a
                        href="#contact"
                        className="
              rounded-full
              bg-linear-to-r from-[#c5a059] via-[#b89146] to-[#8a6a32]
              hover:from-[#d6b36d] hover:via-[#c5a059] hover:to-[#9a7740]
              text-black hover:text-white
              font-bold
              py-4 px-10
              uppercase tracking-[0.2em] text-sm
              transition-all duration-500
              hover:scale-[1.02]
              hover:shadow-[0_0_30px_rgba(197,160,89,0.45)]
              border border-[#d4b06a]/40
              backdrop-blur-sm
            ">
                        Contact Us
                    </a>
                </div>
            </section>
        </main>
    );
}
