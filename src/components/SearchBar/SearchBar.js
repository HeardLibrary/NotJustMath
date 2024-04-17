import { useState } from "react";
import { searchLessonPlans,  } from "../../util/dynamo";
import { LessonPlanApprovalStates } from "../../util/constants";
import "./SearchBar.css"

const SearchBar = (props) => {
    const [queryString, setQueryString] = useState("");

    const handleQueryStringChange = (event) => {
        setQueryString(event.target.value);
    }

    const executeQuery = async () =>  {
        let lessonPlans = await searchLessonPlans(queryString);
        let approvedResults = lessonPlans.filter(lessonPlan => lessonPlan.approval_state === LessonPlanApprovalStates.APPROVED)
        
        props.setLessonPlans(approvedResults);
    }

    return (
        <div className="search-bar-container">
            <input id="query-input" className="builder-input left" type="text" placeholder="What are you looking for?" onChange={handleQueryStringChange}/>
            <button className="query-submit-button builder-input right" onClick={executeQuery}>Search</button>
        </div>
    )
}

export default SearchBar;