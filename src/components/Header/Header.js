import { useNavigate } from "react-router-dom"
import "./Header.css"

const ALL_PAGES = [
    "home",
    "guide",
    "search",
    "upload",
]

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="header-container">
            <p>[Not] Just Math</p>
            <div className="header-options">
                {ALL_PAGES.map(page => {
                    return <button className="header-option"key={page} onClick={() => {navigate(`/${page}`)}}>{page.charAt(0).toUpperCase() + page.slice(1)}</button>
                })}
            </div>
        </div>
    )
}

export default Header;