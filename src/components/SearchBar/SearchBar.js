import { useState } from "react";
import { searchLessonPlans,  } from "../../util/dynamo";
import { LessonPlanApprovalStates } from "../../util/constants";
import "./SearchBar.css"

const SearchBar = (props) => {
    const [queryString, setQueryString] = useState("");
    const [queryStringGrade, setQueryStringGrade] = useState("");

    const handleQueryStringChange = (event) => {
        setQueryString(event.target.value);
    }
    const handleQueryStringChangeGrade = (event) => {
        let value = event.target.value;
        if (value.toUpperCase() === 'K' || value.toUpperCase === 'KINDERGARTEN') {
            value = '0';
            console.log("value: " + value);
        }
        setQueryStringGrade(value);
    }   

    const executeQuery = async () =>  {
        let lessonPlans = await searchLessonPlans(queryString);
        let approvedResults = lessonPlans.filter(lessonPlan => lessonPlan.approval_state === LessonPlanApprovalStates.APPROVED)
        if(queryStringGrade !== ''){
            const grade = parseInt(queryStringGrade, 10); // Convert the grade input to a number
            approvedResults = approvedResults.filter(lessonPlan => 
                lessonPlan.grade_level_lower <= grade &&
                lessonPlan.grade_level_upper >= grade)
        }
        props.setLessonPlans(approvedResults);
    }
    const executeQueryGrade = async () =>  {
        //listlessonplans instead if querystring is empty
        let lessonPlans = await searchLessonPlans(queryString);
        let approvedResults = lessonPlans.filter(lessonPlan => lessonPlan.approval_state === LessonPlanApprovalStates.APPROVED &&
        lessonPlan.grade_level_lower <= queryStringGrade &&
        lessonPlan.grade_level_upper >= queryStringGrade)
        
        props.setLessonPlans(approvedResults);
    }

    return (
        <div>      
            <div className="search-bar-container">
                <input id="query-input" className="builder-input left" type="text" placeholder="What are you looking for?" onChange={handleQueryStringChange}/>
                <input id="query-grade-input" className="builder-input center" type="text" placeholder="Which grade?" onChange={handleQueryStringChangeGrade}/>
                <button className="query-submit-button builder-input right" onClick={executeQuery}>Search</button>
            </div>
            {/* <div className="search-bar-container">
                <input id="query-grade-input" className="builder-input left" type="text" placeholder="Which grade?" onChange={handleQueryStringChangeGrade}/>
                <button className="query-submit-button builder-input right" onClick={executeQueryGrade}>Search</button>
            </div> */}
        </div>
    )
}

export default SearchBar;