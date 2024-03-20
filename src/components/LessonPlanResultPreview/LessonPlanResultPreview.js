import { Link } from "react-router-dom";
import "./LessonPlanResultPreview.css"

const LessonPlanResultPreview = (props) => {
    return (
        <Link className="result-preview" to={`/lesson/${props.lessonPlanMetadata.id}`}>
            <div className="result-preview-left">
                <p className="result-preview-title">{props.lessonPlanMetadata.lesson_title} (Grades {props.lessonPlanMetadata.grade_level_lower} - {props.lessonPlanMetadata.grade_level_upper})</p>
                <p className="result-preview-tags"><span className="tag-title">Math Concepts:</span> {props.lessonPlanMetadata.math_concept_tags.join(", ")}</p>
                <p className="result-preview-tags"><span className="tag-title">Social Concepts:</span> {props.lessonPlanMetadata.social_concept_tags.join(", ")}</p>
                <p className="result-preview-tags"><span className="tag-title">Math Content Standards:</span> {props.lessonPlanMetadata.standard_tags.join(", ")}</p>
            </div>
            <div className="result-preview-right"></div>
        </Link>
    )
}

export default LessonPlanResultPreview;