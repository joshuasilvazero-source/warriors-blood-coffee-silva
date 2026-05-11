import tuskBoneImage from "../assets/images/TuskandBones.png";
import desertRatImage from "../assets/images/DesertRat.png";
import warriorsCoffeeImage from "../assets/images/WarriorsCoffee.png";
import firstLightImage from "../assets/images/FirstLightCoffee.png";

const products = [
    {
        name: "Tusk & Bone",
        price: "$22.99",
        image: tuskBoneImage
    },
    {
        name: "Desert Rat",
        price: "$22.99",
        image: desertRatImage
    },
    {
        name: "Warriors Coffee",
        price: "$22.99",
        image: warriorsCoffeeImage
    },
    {
        name: "First Light",
        price: "$22.99",
        image: firstLightImage
    }
];

function TopSellers({addToCart}) {
    return (
        <section className="relative py-24 bg-brandDark" id="shop">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-6 mb-4">
                        <span className="text-brandGold text-2xl">★</span>
                        <h2 className="font-heading text-4xl tracking-[0.3em] uppercase">
                            Top Sellers
                        </h2>
                        <span className="text-brandGold text-2xl">★</span>
                    </div>

                    <p className="text-gray-400 font-serif italic">
                        Our most loved roasts, chosen by our customers.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.name} className="group flex flex-col items-center">
                            <div className="relative w-full aspect-3/4 mb-6 p-4 gold-border bg-brandBlack flex items-center justify-center overflow-hidden">
                                <img
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    src={product.image}
                                />
                                <div className="absolute inset-0 bg-brandGold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            <h3 className="font-heading text-lg tracking-widest mb-1">
                                {product.name}
                            </h3>

                            <p className="text-brandGold font-bold mb-4">{product.price}</p>

                            <button
                                    onClick={() => addToCart(product)}
                                className="
        w-full
        py-3
        rounded-full
        bg-linear-to-r
        from-[#c5a059]
        via-[#b89146]
        to-[#8a6a32]
        hover:from-[#d6b36d]
        hover:via-[#c5a059]
        hover:to-[#9a7740]
        text-black
        hover:text-white
        font-bold
        uppercase
        text-xs
        tracking-[0.2em]
        transition-all
        duration-500
        cursor-pointer
        hover:scale-105
        hover:shadow-[0_0_25px_rgba(197,160,89,0.45)]
        border
        border-[#d4b06a]/40
        backdrop-blur-sm
    ">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="#shop"
                        className="
        group
        relative
        inline-flex
        items-center
        justify-center
        overflow-hidden
        px-14
        py-4
        rounded-full
        font-bold
        uppercase
        tracking-[0.25em]
        text-white
        border
        border-[#c5a059]/40
        bg-linear-to-r
        from-[#2a1810]
        via-[#5c3a21]
        to-[#c5a059]
        transition-all
        duration-500
        hover:scale-105
        hover:shadow-[0_0_35px_rgba(197,160,89,0.45)]
        hover:-translate-y-1
        backdrop-blur-sm
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
            bg-linear-to-r
            from-transparent
            via-white/10
            to-transparent
        "></span>

                        {/* Text */}
                        <span className="relative z-10 flex items-center gap-3">
                            Explore All Roast
                            <span className="transition-transform duration-500 group-hover:translate-x-2">
                                →
                            </span>
                        </span>
                    </a>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent pointer-events-none"></div>
        </section>
    );
}

export default TopSellers;
