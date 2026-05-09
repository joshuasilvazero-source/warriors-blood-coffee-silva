import missionBg from "../assets/images/mission-bg.jpg";
import logoImg from "../assets/images/warriors-blood-logo.svg";

export default function Mission() {
    return (
        <section className="relative overflow-hidden">
            {/* Background - full image, full width, natural height */}
            <img
                src={missionBg}
                alt="Mission Background"
                className="w-full opacity-30"
            />

            <div className="absolute inset-0 z-10 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
                {/* Left - Text */}
                <div className="md:w-1/2 mb-12 md:mb-0">
                    <h2 className="font-heading text-4xl mb-6">
                        Fuel your mission with{" "}
                        <span className="text-brandRed">Warriors Blood</span>
                    </h2>
                    <p className="text-xl text-gray-300 font-serif italic mb-8 max-w-lg leading-relaxed">
                        Explore our blood roasts or reach out and we&#8217;ll help you find your
                        perfect brew.
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="#shop"
                            className="bg-brandGold hover:bg-white text-black font-bold py-3 px-8
                        uppercase tracking-widest text-sm transition-all">
                            Shop Coffee
                        </a>
                        <a
                            href="#"
                            className="border border-white hover:bg-white hover:text-black font-bold py-3 px-8
                        uppercase tracking-widest text-sm transition-all">
                            Contact Us
                        </a>
                    </div>
                </div>

                {/* Right - Emblem */}
                <div className="md:w-1/2 flex justify-center relative">
                    <div className="absolute w-64 h-64 bg-brandRed/20 blur-3xl rounded-full" />
                    <img
                        src={logoImg}
                        alt="Warriors Blood Logo"
                        className="relative w-64 h-64 object-cover rounded-full drop-shadow-[0_20px_50px_rgba(185,28,28,0.3)]"
                    />
                </div>
            </div>
            </div>
        </section>
    );
}
