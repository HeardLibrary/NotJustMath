import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import { listLessonPlans } from "../../util/dynamo";
import { useState, useEffect } from "react";
import LessonPlanResultPreview from "../../components/LessonPlanResultPreview/LessonPlanResultPreview";
import "./SearchPage.css";

const SearchPage = () => {
    const [lessonPlans, setLessonPlans] = useState([]);
    
    useEffect(() => {
        async function getAndSetLessonPlans() {
            const lessonPlans = await listLessonPlans();
            setLessonPlans(lessonPlans);
        }

        getAndSetLessonPlans()
    }, [])

    return (
        <div className="page-container">
            <Header/>
            <SearchBar setLessonPlans={setLessonPlans}/>
            <div className="search-results-container">
                {lessonPlans.map(lessonPlan => {
                    return <LessonPlanResultPreview key={lessonPlan.id} lessonPlanMetadata={lessonPlan} />
                })}
            </div>
        </div>
    )
}

export default SearchPage;