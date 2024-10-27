import SearchBar from "../../components/SearchBar/SearchBar";
import { listLessonPlans } from "../../util/dynamo";
import { useState, useEffect } from "react";
import { LessonPlanApprovalStates } from "../../util/constants";
import LessonPlanResultPreview from "../../components/LessonPlanResultPreview/LessonPlanResultPreview";
import "./SearchPage.css";

const SearchPage = () => {
    const [lessonPlans, setLessonPlans] = useState([]);
    
    useEffect(() => {
        async function getAndSetLessonPlans() {
            const lessonPlans = await listLessonPlans();
            const activeLessonPlans = lessonPlans.filter(lessonPlan => lessonPlan.approval_state === LessonPlanApprovalStates.APPROVED);
            
            setLessonPlans(activeLessonPlans);
        }

        getAndSetLessonPlans()
    }, [])

    return (
        <div className="page-container">
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