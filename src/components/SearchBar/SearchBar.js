import { useState } from "react";
import { listLessonPlansWithFilter } from "../../util/dynamo";
import "./SearchBar.css"

const LESSON_TITLE_FIELD = "Lesson Title";
const TEXT_TITLE_FIELD = "Text Title";
const TEXT_AUTHOR_FIELD = "Text Author";
const TEXT_PUBLICATION_FIELD = "Text Publication Year";
const MATH_CONCEPT_TAGS = "Math Concepts";
const SOCIAL_CONCEPT_TAGS = "Social Concepts";
const MATH_STANDARD_TAGS = "Math Content Standards";

const EQUALS_OPERATION = "equals";
const CONTAINS_OPERATION = "contains";
const LESS_THAN_OPERATION = "less than";
const GREATER_THAN_OPERATION = "greater than";

const fieldOperationOptionMapping = {
    "Lesson Title": [EQUALS_OPERATION, CONTAINS_OPERATION],
    "Text Title": [EQUALS_OPERATION, CONTAINS_OPERATION],
    "Text Author": [EQUALS_OPERATION, CONTAINS_OPERATION],
    "Text Publication Year": [EQUALS_OPERATION, LESS_THAN_OPERATION, GREATER_THAN_OPERATION],
    "Math Concepts": [CONTAINS_OPERATION],
    "Social Concepts": [CONTAINS_OPERATION],
    "Math Content Standards": [CONTAINS_OPERATION],
};

const SearchBar = (props) => {
    const [currentQueryBuilderField, setCurrentQueryBuilderField] = useState(LESSON_TITLE_FIELD);
    const [currentQueryBuilderOperation, setCurrentQueryBuilderOperation] = useState(fieldOperationOptionMapping[currentQueryBuilderField][0]);
    const [currentQueryString, setCurrentQueryString] = useState("");
    const [displayFilters, setDisplayFilters] = useState([])
    const [filters, setFilters] = useState([]);


    const handleFieldChange = (event) => {
        setCurrentQueryBuilderField(event.target.value);
    }

    const handleOperationChange = (event) => {
        setCurrentQueryBuilderOperation(event.target.value);
    }

    const handleQueryStringChange = (event) => {
        setCurrentQueryString(event.target.value);
    }

    const renderOperationOptions = () => {
        if (currentQueryBuilderField != null) {
            return fieldOperationOptionMapping[currentQueryBuilderField].map(operation => {
                return <option key={operation} value={operation}>{operation}</option>
            })
        }
    }

    const handleAddToQuery = () => {
        let oldDisplayFilters = [...displayFilters];
        let oldFilters = [...filters];

        const newDisplayFilter = {
            field: currentQueryBuilderField,
            operation: currentQueryBuilderOperation,
            string: currentQueryString
        }
        oldDisplayFilters.push(newDisplayFilter);
        oldFilters.push(buildFilterWithField(currentQueryBuilderField));
        
        setFilters(oldFilters);
        setDisplayFilters(oldDisplayFilters);
    }

    const executeQuery = async () => {
        if (filters.length < 1) {
            return;
        }

        let filter = filters[0]
        let remainingFilters = filters.slice(1);
        remainingFilters.forEach((curFilter) => {
            filter.and = curFilter;
        })

        let result = await listLessonPlansWithFilter(filter);
        props.setLessonPlans(result.data.listLessonPlanMetadata.items);
    }

    const buildFilterWithField = (field) => {
        const filter = buildFilter();
        switch (field) {
            case LESSON_TITLE_FIELD:
                return {
                    lesson_title: filter,
                };
            case TEXT_TITLE_FIELD:
                return {
                    text_title: filter,
                };
            case TEXT_AUTHOR_FIELD:
                return {
                    text_author: filter,
                };
            case TEXT_PUBLICATION_FIELD:
                return {
                    text_publication_year: filter,
                };
            case MATH_CONCEPT_TAGS:
                return {
                    math_concept_tags: filter,
                };
            case SOCIAL_CONCEPT_TAGS:
                return {
                    social_concept_tags: filter,
                };
            case MATH_STANDARD_TAGS:
                return {
                    standard_tags: filter,
                }
            default:
                throw new Error("Unknown field: ", field);
        }
    }

    const buildFilter = () => {
        switch (currentQueryBuilderOperation) {
            case EQUALS_OPERATION:
                return {
                    eq: currentQueryString
                };
            case CONTAINS_OPERATION:
                return {
                    contains: currentQueryString
                };
            case LESS_THAN_OPERATION:
                return {
                    lt: parseInt(currentQueryString)
                }
            case GREATER_THAN_OPERATION:
                return {
                    gt: parseInt(currentQueryString)
                }
            default:
                throw new Error("Unknown query operation type: ", currentQueryBuilderOperation);
        }
    }

    return (
        <div className="search-bar-outer-container">
            <div className="search-bar-builder-container">
                <select className="builder-dropdown" onChange={handleFieldChange}>
                    <option value={LESSON_TITLE_FIELD}>{LESSON_TITLE_FIELD}</option>
                    <option value={TEXT_TITLE_FIELD}>{TEXT_TITLE_FIELD}</option>
                    <option value={TEXT_AUTHOR_FIELD}>{TEXT_AUTHOR_FIELD}</option>
                    <option value={TEXT_PUBLICATION_FIELD}>{TEXT_PUBLICATION_FIELD}</option>
                    <option value={MATH_CONCEPT_TAGS}>{MATH_CONCEPT_TAGS}</option>
                    <option value={SOCIAL_CONCEPT_TAGS}>{SOCIAL_CONCEPT_TAGS}</option>
                    <option value={MATH_STANDARD_TAGS}>{MATH_STANDARD_TAGS}</option>
                </select>

                <select className="builder-dropdown" onChange={handleOperationChange}>
                    {renderOperationOptions()}
                </select>

                <input type="text" onChange={handleQueryStringChange}/>
                <button onClick={handleAddToQuery}>Add</button>
            </div>
            <div className="search-bar-filter-container">
                {displayFilters.map(filter => {
                    return <p key={filter.field+filter.string} className="filter">{filter.field} {filter.operation} {filter.string}</p>
                })}
            </div>
            <button onClick={executeQuery} className="run-query-button">Run Query</button>
        </div>
    );
}

export default SearchBar;