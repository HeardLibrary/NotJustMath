import { FaArrowRight } from "react-icons/fa";
import Hero from "./assets/nbthero.png";
import "./HomePage.css";
import SearchPage from "../SearchPage/SearchPage2";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const searchPageRef = useRef(null);

  const navigateToAbout = () => {
    navigate("/about-us");
  };

  const scrollToSearchPage = () => {
    if (searchPageRef.current) {
      searchPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="page-container">
      <div className="hero-container">
        <img className="home-splash-logo" src={Hero} alt="Page logo" />
        <button className="browse-button" onClick={scrollToSearchPage}>
          Browse Our Library
        </button>
        <button className="learn-button" onClick={navigateToAbout}>
          Learn More About Us <FaArrowRight className="arrow-icon" />
        </button>
      </div>
      <div ref={searchPageRef}>
        <SearchPage />
      </div>
    </div>
  );
};

export default HomePage;
