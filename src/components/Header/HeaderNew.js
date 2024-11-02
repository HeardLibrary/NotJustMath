import { Link, useLocation } from "react-router-dom";
import Logo from "./assets/logoNewLong.png";
import "./HeaderNew.css";

const ALL_PAGES = [
    { name: "Home", path: "home" },
    { name: "Guide", path: "guide" },
    { name: "Upload", path: "upload" },
    { name: "About Us", path: "about-us" }
];

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className="header-container">
            <div className="header-title">
                <img src={Logo} alt="Page logo" />
            </div>

            <div className="header-options">
                {ALL_PAGES.map(({ name, path }) => (
                    <Link
                        className={`header-option ${currentPath === `/${path}` ? "active" : ""}`}
                        key={name}
                        to={`/${path}`}
                    >
                        {name}
                    </Link>
                ))}
            </div>

            <div className="header-options-right">
                <Link className="header-option-admin-login" to="/admin">
                    Admin Login
                </Link>
            </div>
        </div>
    );
};

export default Header;
