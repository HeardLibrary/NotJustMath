import { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { addLessonPlan } from "../../util/dynamo";
import { LessonPlanApprovalStates } from "../../util/constants";
import Header from "../../components/Header/Header";
import "./UploadPage.css";

const MATH_TAG = "math-tag";
const STANDARD_TAG = "standard-tag";
const SOCIAL_TAG = "social-tag";

const UPLOAD_BEFORE = "before";
const UPLOAD_DURING = "during";
const UPLOAD_SUCCESS = "success";
const UPLOAD_FAILURE = "failure";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState({
        grade_level_lower: "0",
        grade_level_upper: "0"
    });
    const [mathTags, setMathTags] = useState([]);
    const [standardTags, setStandardTags] = useState([]);
    const [socialTags, setSocialTags] = useState([]);
    const [uploadState, setUploadState] = useState(UPLOAD_BEFORE);

    const handleFileChange = (event) => {
        setFile(event?.target?.files[0]);
        setUploadState(UPLOAD_BEFORE);
}

    const handleGenericChange = (event) => {
        setMetadata((prevMetadata) => ({
            ...prevMetadata,
            [event.target.name]: event.target.value
        }));
        setUploadState(UPLOAD_BEFORE);
    };


    const handleTagSetChange = (event) => {
        const tagType = event.target.name;
        let tagInput = document.getElementById(tagType);
        if(tagInput.value.length < 1) {
            return;
        }

        let oldTags = null;
        setUploadState(UPLOAD_BEFORE);
        switch (tagType) {
            case MATH_TAG:
                oldTags = [...mathTags]
                oldTags.push(tagInput.value);
                setMathTags(oldTags);
                tagInput.value = null;
                break;
            case STANDARD_TAG:
                oldTags = [...standardTags]
                oldTags.push(tagInput.value);
                setStandardTags(oldTags);
                tagInput.value = null;
                break;
            case SOCIAL_TAG:
                oldTags = [...socialTags]
                oldTags.push(tagInput.value);
                setSocialTags(oldTags);
                tagInput.value = null;
                break;
            default:
                throw new Error("Unknown tag type: ", tagType);
        }
    }

    const resetInputFields = () => {
        // Reset high-level inputs
        document.getElementById("lesson_title").value = null;
        document.getElementById("file-input").value = null;

        // Reset grade level inputs
        document.getElementById("grade_level_lower").value = "0";
        document.getElementById("grade_level_upper").value = "0";

        // Reset text inputs
        document.getElementById("text_title").value = null;
        document.getElementById("text_author").value = null;
        document.getElementById("text_publication_year").value = null;

        // Reset tag inputs
        setMathTags([]);
        setSocialTags([]);
        setStandardTags([]);
    }

    const handleUpload = async () => {
        if (!file) {
            console.warn("No file loaded.");
        }

        const lessonPlanID = crypto.randomUUID();
        setUploadState(UPLOAD_DURING)
        try {
            await uploadData({
                key: lessonPlanID,
                data: file
            }).result
            
            try {
                const lessonPlanPayload = {
                    id: lessonPlanID,
                    approval_state: LessonPlanApprovalStates.PENDING,
                    math_concept_tags: mathTags,
                    social_concept_tags: socialTags,
                    standard_tags: standardTags,
                    ...metadata
                }
                await addLessonPlan(lessonPlanPayload);

                setUploadState(UPLOAD_SUCCESS)
                resetInputFields();
                setTimeout(() => {
                    setUploadState(UPLOAD_BEFORE)
                }, 5000);
            } catch(error) {
                console.error("Lesson plan metadata upload failed!");
                console.error(error);
                setUploadState(UPLOAD_FAILURE);
            }

        } catch (error) {
            console.error("File upload failed!");
            console.error(error)
            setUploadState(UPLOAD_FAILURE);
        }
    }

    const renderUpload = () => {
        switch (uploadState) {
            case UPLOAD_BEFORE:
                return <button className="upload-submit-button" onClick={handleUpload}>Upload</button>;
            case UPLOAD_DURING:
                return <div className="upload-state">Uploading lesson plan ... </div>;
            case UPLOAD_SUCCESS:
                return <div className="upload-state success">Lesson plan uploaded!</div>;
            case UPLOAD_FAILURE:
                return <div className="upload-state failure">Upload failed, please make sure all required fields are filled out and try again.</div>
            default:
                throw new Error("Unknown upload state: ", uploadState);

        }
    }
   
    return (
        <div className="page-container">
            <Header/>
            <div className="upload-form">
                <h2>Lesson Plan Upload</h2>
                
                <div className="input-section-container">
                    <h3 className="input-section-title">Lesson Plan</h3>
                    <div className="input-container">
                        <label>Lesson Title<span className="required">*</span></label>
                        <input id="lesson_title" name="lesson_title" type="text" onChange={handleGenericChange}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="file-input">Lesson Plan PDF<span className="required">*</span></label>
                        <input id="file-input" name="file-input" type="file" onChange={handleFileChange} accept=".pdf"/>
                    </div>
                </div>

                <div className="input-section-container">
                    <h3 className="input-section-title">Grade Level Range</h3>
                    <div className="input-container">
                        <label>Grade Level Lower Bound<span className="required">*</span></label>
                        <select id="grade_level_lower" name="grade_level_lower" type="number" onChange={handleGenericChange}>
                            <option value="0">K</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label>Grade Level Upper Bound<span className="required">*</span></label>
                        <select id="grade_level_upper" name="grade_level_upper" type="number" onChange={handleGenericChange}>
                            <option value="0">K</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                
                <div className="input-section-container">
                    <h3 className="input-section-title">Text Information</h3>
                    <div className="input-container">
                        <label>Text Title<span className="required">*</span></label>
                        <input id="text_title" name="text_title" type="text" onChange={handleGenericChange}/>
                    </div>
                    <div className="input-container">
                        <label>Text Author<span className="required">*</span></label>
                        <input id="text_author" name="text_author" type="text" onChange={handleGenericChange}/>
                    </div>
                    <div className="input-container">
                        <label>Text Publication Year</label>
                        <input id="text_publication_year" name="text_publication_year" type="text" onChange={handleGenericChange}/>
                    </div>
                </div>

                <div className="input-section-container">
                    <h3 className="input-section-title">Lesson Plan Tags</h3>
                    <div className="full-tag-input-container">
                        <div className="mid-tag-input-container">
                            <p>Math Concept Tags<span className="required">*</span></p>
                            <div className="tag-input-container">
                                <input type="text" id={MATH_TAG}/>
                                <button name={MATH_TAG} onClick={handleTagSetChange}>Add Tag</button>
                            </div>
                        </div>
                        
                        <div className="tag-progress-container">
                            {mathTags.map(tag => {
                                return <p key={tag} className="lesson-tag">{tag}</p>
                            })}
                        </div>
                    </div>

                    <div className="full-tag-input-container">
                        <div className="mid-tag-input-container">
                            <p>Social Concept Tags<span className="required">*</span></p>
                            <div className="tag-input-container">
                                <input type="text" id={SOCIAL_TAG}/>
                                <button name={SOCIAL_TAG} onClick={handleTagSetChange}>Add Tag</button>
                            </div>
                        </div>
                        
                        <div className="tag-progress-container">
                            {socialTags.map(tag => {
                                return <p key={tag} className="lesson-tag">{tag}</p>
                            })}
                        </div>
                    </div>

                    <div className="full-tag-input-container">
                        <div className="mid-tag-input-container">
                            <p>Math Content Standard Tags</p>
                            <div className="tag-input-container">
                                <input type="text" id={STANDARD_TAG}/>
                                <button name={STANDARD_TAG} onClick={handleTagSetChange}>Add Tag</button>
                            </div>
                        </div>
                        
                        <div className="tag-progress-container">
                            {standardTags.map(tag => {
                                return <p key={tag} className="lesson-tag">{tag}</p>
                            })}
                        </div>
                    </div>

                    
                </div>
                {renderUpload()}
            </div>
        </div>
    )
}

export default UploadPage;