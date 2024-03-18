import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <Header/>
            <p>Welcome!</p>
            <div className="home-option-container">
                <button onClick={() => {navigate("/search")}}>Search</button>
                <button onClick={() => {navigate("/upload")}}>Upload</button>
            </div>
        </div>
    )
    
   
}

export default HomePage;