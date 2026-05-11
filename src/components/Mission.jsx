import missionBg from "../assets/images/mission-bg.jpg";
import logoImg from "../assets/images/warrior-blood-logo-done.png";

export default function Mission() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-brandDark to-transparent z-20"></div>
            {/* Background */}
            <img
                src={missionBg}
                alt="Mission Background"
                className="w-full min-h-[750px] object-cover opacity-30"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 z-10 flex items-center">
                <div
                    className="
                        w-full
                        max-w-7xl
                        mx-auto
                        px-4
                        py-32
                        md:py-40
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        justify-between
                    ">
                    {/* Left Content */}
                    <div className="md:w-1/2 mb-12 md:mb-0">
                        <h2 className="font-heading text-4xl md:text-5xl mb-6 leading-tight">
                            Fuel your mission with{" "}
                            <span className="text-brandRed">Warriors Blood</span>
                        </h2>

                        <p
                            className="
                                text-xl
                                text-gray-300
                                font-serif
                                italic
                                mb-8
                                max-w-lg
                                leading-relaxed
                            ">
                            Explore our bold roasts or reach out and we&#8217;ll help you find your
                            perfect brew.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4">
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
                                Shop Coffee
                            </a>

                            {/* Contact Us */}
                            <a
                                href="#contact"
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
                                {/* Animated Gold Fill */}
                                {/* <span
                                    className="
            absolute
            inset-0
            bg-brandGold
            scale-x-0
            origin-left
            group-hover:scale-x-100
            transition-transform
            duration-500
        "></span> */}

                                {/* Text */}
                                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                                    Contact Us
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Right Logo */}
                    <div className="md:w-1/2 flex justify-center relative">
                        <div className="absolute w-64 h-64 bg-brandRed/20 blur-3xl rounded-full" />

                        <img
                            src={logoImg}
                            alt="Warriors Blood Logo"
                            className="
                                relative
                                w-60
                                h-60
                                object-cover
                                rounded-full
                            "
                        />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-brandBlack to-transparent z-20"></div>
        </section>
    );
}
