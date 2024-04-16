import Header from "../../components/Header/Header";
import LogoWithText from "./assets/logo-with-text.png";
import "./HomePage.css";

const HomePage = () => {

    return (
        <div className="page-container">
            <Header/>
            <img src={LogoWithText} alt="Page logo"/>
            <div className="home-content-container">
                <div className="home-content">
                    <h3>Our purpose</h3>
                    <h4>Together...</h4>
                </div>
                <div className="home-content">
                    <h3>Our Passion</h3>
                    <h4>Together...</h4>
                </div>
                <div className="home-content">
                    <h3>Our People</h3>
                    <h4>Together...</h4>
                </div>
            </div>
        </div>
    )
}

export default HomePage;