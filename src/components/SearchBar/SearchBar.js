import React, { useState, useEffect } from "react";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import { LessonPlanApprovalStates } from "../../util/constants";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { searchLessonPlans } from "../../util/dynamo"; 

const SearchBar = ({ setLessonPlans, searchQuery, setSearchQuery }) => {
    const [queryStringGrade, setQueryStringGrade] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (searchQuery) {
            executeQuery(); 
        }
    }, [searchQuery]);

    const handleQueryStringChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleQueryStringChangeGrade = (event) => {
        let value = event.target.value;
        setQueryStringGrade(value);
    };

    const navigateToUpload = () => {
        navigate("/upload");
    };

    const executeQuery = async () => {
        let lessonPlans = await searchLessonPlans(searchQuery); 
        lessonPlans = Array.isArray(lessonPlans) ? lessonPlans : []; 

        let approvedResults = lessonPlans.filter(
            (lessonPlan) => lessonPlan.approval_state === LessonPlanApprovalStates.APPROVED
        );

        if (queryStringGrade !== "") {
            const grade = parseInt(queryStringGrade, 10);
            approvedResults = approvedResults.filter(
                (lessonPlan) =>
                    lessonPlan.grade_level_lower <= grade &&
                    lessonPlan.grade_level_upper >= grade
            );
        }

        setLessonPlans(approvedResults); 
    };

    return (
        <div className="new-search-bar-container">
            <div className="new-upper-search-text">
                <h1 className="new-search-header">Search Lesson Plan</h1>
                <button onClick={navigateToUpload}>
                    <FaPlusCircle className="add-icon" /> Upload Lesson Plan
                </button>
            </div>
            <div className="new-search-body">
                <div className="new-builder-input-left">
                    <FaSearch className="search-icon" onClick={executeQuery} />
                    <input
                        id="query-input"
                        className="search-text"
                        type="text"
                        placeholder="What are you looking for?"
                        value={searchQuery} // Use searchQuery for the input's value
                        onChange={handleQueryStringChange}
                    />
                </div>
                <div>
                    <select
                        id="query-grade-input"
                        className="new-grade-input"
                        onChange={handleQueryStringChangeGrade}
                    >
                        <option value="">Which Grade?</option>
                        <option value="0">K</option>
                        <option value="1">Grade 1</option>
                        <option value="2">Grade 2</option>
                        <option value="3">Grade 3</option>
                        <option value="4">Grade 4</option>
                        <option value="5">Grade 5</option>
                    </select>
                    <button
                        className="new-query-search-button"
                        onClick={executeQuery}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
