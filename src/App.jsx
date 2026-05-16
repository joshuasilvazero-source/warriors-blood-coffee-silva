import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopSellers from "./components/TopSellers";
import Mission from "./components/Mission";
import Footer from "./components/Footer";

import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import About from "./pages/About";

function App() {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.name === product.name);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });
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

    return (
        <>
            <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />

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
        <Route
          path="/products"
          element={<Products addToCart={addToCart} />}
        />
        

                {/* Checkout Page */}
                <Route
                    path="/checkout"
                    element={<Checkout cartItems={cartItems} removeFromCart={removeFromCart} />}
                />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
