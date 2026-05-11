import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopSellers from "./components/TopSellers";
import Mission from "./components/Mission";
import Footer from "./components/Footer";

// Navigation bar component
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
        item.name === productName
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}
    return (
        <>
            <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />

            <main>
                <Hero />
                <TopSellers addToCart={addToCart} />
                <Mission />
                <Footer />
            </main>
        </>
    );
}

export default App;
