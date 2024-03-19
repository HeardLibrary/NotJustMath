import { Link } from "react-router-dom";
import "./LessonPlanResultPreview.css"

const LessonPlanResultPreview = (props) => {
    return (
        <Link className="result-preview" to={`/lesson/${props.lessonPlanMetadata.id}`}>
            <p>Title: {props.lessonPlanMetadata.lesson_title}</p>
        </Link>
    )
}

export default LessonPlanResultPreview;