import { Link, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
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
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const pagesToDisplay = user
        ? [...ALL_PAGES, { name: "Admin", path: "admin" }]
        : ALL_PAGES;

    return (
        <div className="header-container">
            <div className="header-title">
                <Link to="/home">
                    <img src={Logo} alt="Page logo" />
                </Link>
            </div>

            <div className="header-options">
                {pagesToDisplay.map(({ name, path }) => {
                    const isActive = path === "admin"
                        ? currentPath.startsWith("/admin")
                        : currentPath === `/${path}`;
                    return (
                        <Link
                            className={`header-option ${isActive ? "active" : ""}`}
                            key={name}
                            to={`/${path}`}
                        >
                            {name}
                        </Link>
                    );
                })}
            </div>

            <div className="header-options-right">
                {user ? (
                    <button className="header-option-admin-login" onClick={signOut}>
                        Logout
                    </button>
                ) : (
                    <Link className="header-option-admin-login" to="/admin">
                        Admin Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;