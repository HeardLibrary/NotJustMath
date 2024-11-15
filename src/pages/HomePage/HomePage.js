import { FaArrowRight } from "react-icons/fa";
import Hero from "./assets/nbthero.png";
import "./HomePage.css";
import SearchPage from "../SearchPage/SearchPage";
import { useRef } from "react";

const HomePage = () => {
    const searchPageRef = useRef(null); // Create a ref for SearchPage

    const navigateToAbout = () => {
        window.location.href = "/about-us";
    };

    const scrollToLibrary = () => {
        searchPageRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to SearchPage
    };

    return (
        <div className="page-container">
            <div className="hero-container">
                <img className="home-splash-logo" src={Hero} alt="Page logo" />
                <button className="browse-button" onClick={scrollToLibrary}>
                    Browse Our Library
                </button>
                <button className="learn-button" onClick={navigateToAbout}>
                    Learn More About Us <FaArrowRight className="arrow-icon" />
                </button>
            </div>
            
            {/* Reference SearchPage section */}
            <div ref={searchPageRef}>
                <SearchPage />
            </div>
        </div>
    );
};

export default HomePage;