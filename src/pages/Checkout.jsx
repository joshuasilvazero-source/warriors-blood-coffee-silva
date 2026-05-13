export default function Checkout({ cartItems, removeFromCart }) {
  const subtotal = cartItems.reduce((total, item) => {
    return total + Number(item.price.replace("$", "")) * item.quantity;
  }, 0);

  return (
    <main className="bg-[#0b0b0b] text-white min-h-screen pt-28 pb-24">
      <section className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-14">
          <p className="text-brandGold uppercase tracking-[0.3em] text-xs mb-4">
            Secure Checkout
          </p>

          <h1 className="font-heading text-5xl md:text-6xl uppercase mb-4">
            Checkout
          </h1>

          <p className="text-gray-400 max-w-xl">
            Review your order before continuing to payment.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-14 text-center">
            <div className="text-5xl mb-6">🛒</div>

            <h2 className="font-heading text-3xl mb-4">
              Your cart is empty
            </h2>

            <p className="text-gray-400">
              Add coffee products before checking out.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2">

              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[1.5fr_0.5fr_0.5fr] text-xs uppercase tracking-[0.2em] text-gray-500 border-b border-white/10 pb-4 mb-4 px-2">
                <span>Product</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Total</span>
              </div>

              <div className="space-y-4">

                {cartItems.map((item) => {
                  const itemTotal =
                    Number(item.price.replace("$", "")) * item.quantity;

                  return (
                    <div
                      key={item.name}
                      className="
                        bg-[#111111]
                        border
                        border-white/10
                        rounded-3xl
                        p-5
                        transition-all
                        duration-300
                        hover:border-brandGold/30
                      "
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.5fr_0.5fr] items-center gap-6">

                        {/* Product */}
                        <div className="flex items-center gap-5">

                          <div className="bg-black/40 rounded-2xl p-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-contain"
                            />
                          </div>

                          <div>
                            <h3 className="font-heading tracking-widest text-lg">
                              {item.name}
                            </h3>

                            <p className="text-brandGold font-bold mt-1">
                              {item.price}
                            </p>

                            <button
                              onClick={() => removeFromCart(item.name)}
                              className="
                                mt-3
                                text-xs
                                uppercase
                                tracking-[0.2em]
                                text-gray-500
                                hover:text-brandRed
                                transition-colors
                              "
                            >
                              Remove
                            </button>
                          </div>

                        </div>

                        {/* Quantity */}
                        <div className="flex justify-center">
                          <div className="
                            w-12
                            h-12
                            rounded-full
                            border
                            border-brandGold/20
                            flex
                            items-center
                            justify-center
                            text-sm
                            font-bold
                            text-brandGold
                          ">
                            {item.quantity}
                          </div>
                        </div>

                        {/* Total */}
                        <div className="text-right">
                          <p className="font-bold text-lg text-brandGold">
                            ${itemTotal.toFixed(2)}
                          </p>
                        </div>

                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* RIGHT SIDE */}
            <aside className="
              bg-[#111111]
              border
              border-brandGold/20
              rounded-3xl
              p-7
              h-fit
              sticky
              top-28
            ">

              <h2 className="font-heading text-2xl mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>

                  <span className="font-bold text-brandGold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>

                  <span className="text-gray-300">
                    Calculated at payment
                  </span>
                </div>

                <div className="border-t border-white/10 pt-5 flex justify-between">
                  <span className="font-bold uppercase tracking-[0.2em] text-sm">
                    Estimated Total
                  </span>

                  <span className="font-bold text-2xl text-brandGold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

              </div>

              {/* Payment Button */}
              <button
                className="
                  w-full
                  mt-8
                  rounded-full
                  py-4
                  bg-gradient-to-r
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
                  tracking-[0.2em]
                  text-xs
                  transition-all
                  duration-500
                  hover:scale-[1.02]
                  hover:shadow-[0_0_30px_rgba(197,160,89,0.45)]
                "
              >
                Continue To Payment
              </button>

              <p className="text-[11px] text-gray-500 text-center mt-5 leading-relaxed">
                Secure checkout powered by modern encrypted payment systems.
              </p>

            </aside>

          </div>
        )} 
      </section>
    </main>
  );
}