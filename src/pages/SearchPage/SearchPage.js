import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { listLessonPlans } from "../../util/dynamo";
import LessonPlanResultPreview from "../../components/LessonPlanResultPreview/LessonPlanResultPreview";
import "./SearchPage.css";

const SearchPage = () => {
    const [lessonPlans, setLessonPlans] = useState([]);

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