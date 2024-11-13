import { FaArrowRight } from "react-icons/fa";
import Hero from "./assets/nbthero.png";
import "./HomePage.css";
import SearchPage from "../SearchPage/SearchPage";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const navigateToAbout = () => {
        navigate("/about-us"); // Navigate to the About page
    };

    return (
        <div className="page-container">
            <div className="hero-container">
                <img className="home-splash-logo" src={Hero} alt="Page logo" />
                <button className="browse-button">Browse Our Library</button>
                <button className="learn-button" onClick={navigateToAbout}>
                    Learn More About Us <FaArrowRight className="arrow-icon" />
                </button>
            </div>
            <SearchPage />
        </div>
    );
}

export default HomePage;