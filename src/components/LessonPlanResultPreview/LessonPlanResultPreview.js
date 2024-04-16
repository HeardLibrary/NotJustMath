import "./LessonPlanResultPreview.css"

const LessonPlanResultPreview = (props) => {
    const renderGrades = (lower, upper) => {
        if (lower === upper) {
            return `Grade ${lower}`
        } else {
            return `Grades ${lower} - ${upper}`
        }
    }

    return (
        <a className="result-preview" href={`/lesson/${props.lessonPlanMetadata.id}`} target="_blank" rel="noreferrer">
            <div className="result-preview-left">
                <p className="result-preview-title">{props.lessonPlanMetadata.lesson_title} ({renderGrades(props.lessonPlanMetadata.grade_level_lower, props.lessonPlanMetadata.grade_level_upper)})</p>
                <p className="result-preview-tags"><span className="tag-title">Math Concepts:</span> {props.lessonPlanMetadata.math_concept_tags.join(", ")}</p>
                <p className="result-preview-tags"><span className="tag-title">Social Concepts:</span> {props.lessonPlanMetadata.social_concept_tags.join(", ")}</p>
                <p className="result-preview-tags"><span className="tag-title">Math Content Standards:</span> {props.lessonPlanMetadata.standard_tags.join(", ")}</p>
            </div>
            <div className="result-preview-right"></div>
        </a>
    )
}

export default LessonPlanResultPreview;