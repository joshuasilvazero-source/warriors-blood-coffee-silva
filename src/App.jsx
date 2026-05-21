import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopSellers from "./components/TopSellers";
import Mission from "./components/Mission";
import Footer from "./components/Footer";
import CartToast from "./components/CartToast";
import ScrollToTop from "./components/ScrollToTop";

import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import About from "./pages/About";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [cartToast, setCartToast] = useState({ name: null, visible: false });

    useEffect(() => {
        if (!cartToast.name) return;
        const hideTimer = setTimeout(() => setCartToast(prev => ({ ...prev, visible: false })), 2200);
        const clearTimer = setTimeout(() => setCartToast({ name: null, visible: false }), 2500);
        return () => {
            clearTimeout(hideTimer);
            clearTimeout(clearTimer);
        };
    }, [cartToast.name]);

    function addToCart(product, { silent = false } = {}) {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.name === product.name);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });
        if (!silent) setCartToast({ name: product.name, visible: true });
    }

    function removeFromCart(productName) {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.name === productName ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function removeAllOfItem(productName) {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.name !== productName)
        );
    }

    return (
        <>
            <ScrollToTop />
            <Navbar cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />

            <Routes>
                {/* Homepage */}
                <Route
                    path="/"
                    element={
                        <main>
                            <Hero />
                            <TopSellers addToCart={addToCart} />
                            <Mission />
                        </main>
                    }
                />

                {/* Products Page */}
                <Route path="/products" element={<Products addToCart={addToCart} />} />

                {/* About Page */}
                <Route path="/about" element={<About />} />

                {/* Checkout Page */}
                <Route
                    path="/checkout"
                    element={<Checkout cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} removeAllOfItem={removeAllOfItem} />}
                />
            </Routes>

            <Footer />
            <CartToast productName={cartToast.name} visible={cartToast.visible} />
        </>
    );
}

export default App;
