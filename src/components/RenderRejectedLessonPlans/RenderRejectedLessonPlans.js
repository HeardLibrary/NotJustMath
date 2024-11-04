import React from "react";
import { useNavigate } from "react-router-dom";
import "../RenderPendingLessonPlans/RenderPendingLessonPlans.css";

const RenderRejectedLessonPlans = ({ lessonPlans, renderGrades }) => {
    const navigate = useNavigate();

    if (lessonPlans.length === 0) {
        return <p className="no-pending-message">No rejected submissions.</p>;
    }

    return (
        <div className="lesson-plan-list">
            {lessonPlans.map((lessonPlan) => (
                <div className="lesson-plan-item" key={lessonPlan.id}>
                    <div className="lesson-plan-info">
                        <p className="lesson-title">
                            {lessonPlan.lesson_title} ({renderGrades(lessonPlan.grade_level_lower, lessonPlan.grade_level_upper)})
                        </p>
                    </div>
                    <button
                        className="view-button"
                        onClick={() => navigate(`/admin/rejected/view/${lessonPlan.id}`)}
                    >
                        View
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RenderRejectedLessonPlans;
