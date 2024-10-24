import Header from "../../components/Header/Header";
import LogoWithText from "./assets/logo-with-text.png"
import "./GuidePage.css";

const GuidePage = () => {
    return (
        <div className="page-container">
            <Header/>
            <img className="guide-logo" src={LogoWithText} alt="Page logo"/>
            <p className="guide-wip-message">This page is a work in progress ... </p>
        </div>
    )
}

export default GuidePage;