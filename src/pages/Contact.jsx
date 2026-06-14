import React, { useState } from "react";

export default function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    function validate() {
        const e = {};
        if (!firstName.trim()) e.firstName = "First name is required.";
        if (!lastName.trim()) e.lastName = "Last name is required.";
        if (!email.trim()) e.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
        if (!message.trim()) e.message = "Please enter a message.";
        return e;
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length === 0) {
            // Simulate send
            setSent(true);
            setFirstName("");
            setLastName("");
            setEmail("");
            setMessage("");
            setTimeout(() => setSent(false), 4000);
        }
    }

    return (
        <div id="contact" className="min-h-screen bg-[#1a1410] flex items-center px-4 py-12">
            <div className="max-w-6xl w-full mx-auto">
                <div className="relative bg-gradient-to-b from-[#3b2a24]/80 to-[#241611]/80 border border-white/5 rounded-3xl p-6 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Left Intro Column */}
                        <div className="text-white pr-0 md:pr-6">
                            <h5 className="text-sm text-[#bca78a] tracking-widest mb-4">
                                CONTACT US
                            </h5>
                            <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-4 leading-tight">
                                Let's Start a
                                <br /> Conversation
                            </h2>

                            <p className="text-sm text-gray-300 max-w-lg leading-relaxed mb-8">
                                Have a question, custom request, or partnership idea? Send us a
                                message and we'll get back to you soon.
                            </p>

                            <div className="mt-6 bg-[#0f0b0a] border border-white/5 rounded-2xl p-6 max-w-xs">
                                <h4 className="font-heading text-sm text-white mb-2">
                                    Quick Response
                                </h4>
                                <p className="text-xs text-gray-400">
                                    We typically respond as soon as possible.
                                </p>
                            </div>
                        </div>

                        {/* Right Form Column */}
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="sr-only" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            type="text"
                                            placeholder="First Name"
                                            aria-invalid={errors.firstName ? "true" : "false"}
                                            className="w-full bg-transparent border border-white/10 rounded-full py-3 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30"
                                        />
                                        {errors.firstName && (
                                            <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="sr-only" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            type="text"
                                            placeholder="Last Name"
                                            aria-invalid={errors.lastName ? "true" : "false"}
                                            className="w-full bg-transparent border border-white/10 rounded-full py-3 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30"
                                        />
                                        {errors.lastName && (
                                            <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="you@example.com"
                                        aria-invalid={errors.email ? "true" : "false"}
                                        className="w-full bg-transparent border border-white/10 rounded-full py-3 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="message">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Tell us how we can help..."
                                        aria-invalid={errors.message ? "true" : "false"}
                                        className="w-full bg-transparent border border-white/10 rounded-2xl py-4 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 resize-none"
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-red-400 mt-1">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    {sent && (
                                        <div className="text-sm text-green-300 mr-auto">
                                            Message sent — thanks!
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center bg-[#6b4535] hover:bg-[#7c5846] text-white px-6 md:px-8 py-3 rounded-full font-semibold tracking-wider shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-colors">
                                        Submit Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
