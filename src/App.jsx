import  "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopSellers from "./components/TopSellers";
import Mission from "./components/Mission";


// Navigation bar component
function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TopSellers />
        <Mission />
      </main>

      {/* <Footer /> */}
    </>
  );
}

export default App;