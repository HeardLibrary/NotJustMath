import { useNavigate } from "react-router-dom"

const BadRequestPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <p>Sorry, that page couldn't be found!</p>
            <button onClick={() => {navigate(-1)}}>Go Back</button>
        </div>
    )
}

export default BadRequestPage