import React from "react";
import { useNavigate } from "react-router-dom";
import "./RenderPendingLessonPlans.css";

const RenderPendingLessonPlans = ({ lessonPlans, renderGrades }) => {
    const navigate = useNavigate();

    if (lessonPlans.length === 0) {
        return <p className="no-pending-message">No pending submissions. Well done!</p>;
    }

    return (
        <div className="lesson-plan-list">
            {lessonPlans.map((lessonPlan) => (
                <div className="lesson-plan-item" key={lessonPlan.id}>
                    <div className="lesson-plan-info">
                        <p className="lesson-title">
                            {lessonPlan.lesson_title} ({renderGrades(lessonPlan.grade_level_lower, lessonPlan.grade_level_upper)})
                        </p>
                        {/* Optional: add more details here if needed */}
                    </div>
                    <button
                        className="view-button"
                        onClick={() => navigate(`/admin/view/${lessonPlan.id}`)} // Navigate to view page
                    >
                        View
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RenderPendingLessonPlans;
