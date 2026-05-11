export default function Footer() {
  return (
    <footer className="bg-brandBlack pt-20 pb-10 border-t border-white/5" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h4 className="font-heading text-2xl mb-6">
              Warriors <span className="text-brandRed">Blood</span> Coffee
            </h4>

            <p className="text-white text-sm leading-relaxed max-w-xs mb-6">
              Premium coffee beans, roasted to order and shipped fresh from our
              roastery to your cup since 2018.
            </p>

            <div className="flex items-center space-x-5">
              <a
                href="#"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-[#c5a059]/30 bg-white/5 transition-all duration-500 hover:scale-110 hover:border-[#c5a059] hover:shadow-[0_0_25px_rgba(197,160,89,0.45)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white transition-all duration-300 group-hover:text-[#c5a059]"
                >
                  <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                </svg>
              </a>

              <a
                href="#"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-[#c5a059]/30 bg-white/5 transition-all duration-500 hover:scale-110 hover:border-[#c5a059] hover:shadow-[0_0_25px_rgba(197,160,89,0.45)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white transition-all duration-300 group-hover:text-[#c5a059]"
                >
                  <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07C2 17.09 5.66 21.23 10.44 22v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.9h-2.33V22C18.34 21.23 22 17.09 22 12.07z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-brandGold tracking-widest uppercase mb-6 text-sm">
              Navigation
            </h4>

            <ul className="space-y-4 text-sm font-semibold uppercase tracking-tighter">
              <li><a className="hover:text-brandGold transition-colors" href="#">Home</a></li>
              <li><a className="hover:text-brandGold transition-colors" href="#shop">Shop</a></li>
              <li><a className="hover:text-brandGold transition-colors" href="#about">About Us</a></li>
              <li><a className="hover:text-brandGold transition-colors" href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="text-sm">
            <h4 className="font-heading text-brandGold tracking-widest uppercase mb-6">
              Contact Us
            </h4>

            <address className="not-italic text-white space-y-4">
              <p>Lawton, OK 73507</p>
              <p>Phone: 1800-887-5309</p>
              <p>Email: support@warriorsbloodcoffee.com</p>
              <p>Website: warriorsbloodcoffee.com</p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
          <p className="text-brandGold text-center md:text-left">
            © 2026 Warriors Blood Coffee Co., LLC. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a className="text-brandGold hover:text-white transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-brandGold hover:text-white transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}