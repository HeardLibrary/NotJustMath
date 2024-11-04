import { useNavigate, useLocation } from "react-router-dom";
import "./ReviewSubheader.css";

const ReviewSubheader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check which section we're in based on the current path
    const isReview = location.pathname.startsWith("/admin") && !location.pathname.includes("approved") && !location.pathname.includes("rejected");
    const isApproved = location.pathname.includes("approved");
    const isRejected = location.pathname.includes("rejected");

    return (
        <div className="subheader">
            <span
                className={`option ${isReview ? "active" : ""}`}
                onClick={() => navigate("/admin")}
            >
                Review
            </span>
            <span
                className={`option ${isApproved ? "active" : ""}`}
                onClick={() => navigate("/admin/approved")}
            >
                Approved
            </span>
            <span
                className={`option ${isRejected ? "active" : ""}`}
                onClick={() => navigate("/admin/rejected")}
            >
                Rejected
            </span>
        </div>
    );
};

export default ReviewSubheader;
