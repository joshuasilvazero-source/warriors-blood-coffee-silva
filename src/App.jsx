import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopSellers from "./components/TopSellers";
import Mission from "./components/Mission";
import Footer from "./components/Footer";

// Navigation bar component
function App() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />
                <TopSellers />
                <Mission />
                <Footer />
            </main>
        </>
    );
}

export default App;
