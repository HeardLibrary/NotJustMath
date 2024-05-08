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

    return (
        <div>      
            <div className="search-bar-container">
                <input id="query-input" className="builder-input left" type="text" placeholder="What are you looking for?" onChange={handleQueryStringChange}/>
                <select id="query-grade-input" className="builder-input center dropdown" onChange={handleQueryStringChangeGrade}>
                    <option id ="placeholderdd" value="" disabled selected hidden >Which grade? </option>
                    <option value="0">K</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button className="query-submit-button builder-input right" onClick={executeQuery}>Search</button>
            </div>
        </div>
    )
}

export default SearchBar;