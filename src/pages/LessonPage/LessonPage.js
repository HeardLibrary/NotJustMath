import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./LessonPage.css";

const LessonPage = () => {
    const { lessonUUID } = useParams();

    useEffect(() => {
        console.log(`Lesson UUID: ${lessonUUID}`)
    }, [lessonUUID]);
    
    return (
        <div className="page-container">
            <Header/>
            <p>This is the Lesson Page for {lessonUUID}</p>
        </div>
    )
}

export default LessonPage;