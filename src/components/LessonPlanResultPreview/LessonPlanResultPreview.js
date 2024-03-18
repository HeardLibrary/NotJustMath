import { Link } from "react-router-dom";
import "./LessonPlanResultPreview.css"

const LessonPlanResultPreview = (props) => {
    return (
        <Link className="result-preview" to={`/lesson/${props.lessonPlanMetadata.id}`}>
            <p>Lesson Plan ID: {props.lessonPlanMetadata.id}</p>
        </Link>
    )
}

export default LessonPlanResultPreview;