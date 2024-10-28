import { Link } from "react-router-dom";
import Logo from "./assets/logoNewLong.png";
import "./HeaderNew.css";

const ALL_PAGES = [
    { name: "Home", path: "home" },
    { name: "Guide", path: "guide" },
    { name: "Upload", path: "upload" },
    { name: "About Us", path: "about-us" }
];

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-title">
                <img src={Logo} alt="Page logo" />
            </div>

            <div className="header-options">
                {ALL_PAGES.map(({ name, path }) => (
                    <Link
                        className="header-option"
                        key={name}
                        to={`/${path}`}
                    >
                        {name}
                    </Link>
                ))}
            </div>

            <div className="header-options-right">
                <Link className="header-option" to="/admin">
                    Admin Login
                </Link>
            </div>
        </div>
    );
};

export default Header;
