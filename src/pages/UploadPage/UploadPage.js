import { Authenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { addLessonPlan } from "../../util/dynamo";
import Header from "../../components/Header/Header";
import "./UploadPage.css";

const MATH_TAG = "math-tag";
const STANDARD_TAG = "standard-tag";
const SOCIAL_TAG = "social-tag";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState({});
    const [mathTags, setMathTags] = useState([]);
    const [standardTags, setStandardTags] = useState([]);
    const [socialTags, setSocialTags] = useState([]);

    const handleFileChange = (event) => {
        setFile(event?.target?.files[0]);
        console.log("New file loaded.");
    }

    const handleGenericChange = (event) => {
        metadata[event.target.name] = event.target.value
        setMetadata(metadata)
    }

    const handleTagSetChange = (event) => {
        const tagType = event.target.name;
        let tagInput = document.getElementById(tagType);
        let oldTags = null;
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
                throw new Error("Shouldn't happen, unknown tag type: ", tagType);
        }
    }

    const handleUpload = async () => {
        if (!file) {
            console.warn("No file loaded.");
        }

        const lessonPlanID = crypto.randomUUID();
        try {
            await uploadData({
                key: lessonPlanID,
                data: file
            }).result
            
            try {
                const lessonPlanPayload = {
                    id: lessonPlanID,
                    approval_state: "PENDING",
                    math_concept_tags: mathTags,
                    social_concept_tags: socialTags,
                    standard_tags: standardTags,
                    ...metadata
                }
                await addLessonPlan(lessonPlanPayload);
            } catch(error) {
                console.error("Lesson plan metadata upload failed!");
                console.error(error);
            }

        } catch (error) {
            console.error("File upload failed!");
            console.error(error)
        }
    }
   
    return (
        <div className="page-container">
            <Header/>
            <Authenticator>
                {({ _signOut, _user }) => (
                    <div className="upload-form">
                        <h2>Lesson Plan Upload</h2>
                        
                        <div className="input-section-container">
                            <h3 className="input-section-title">Lesson Plan</h3>
                            <div className="input-container">
                                <label htmlFor="file-input">Lesson Plan PDF</label>
                                <input name="file-input" type="file" onChange={handleFileChange} accept=".pdf"/>
                            </div>
                        </div>

                        <div className="input-section-container">
                            <h3 className="input-section-title">Grade Level Range</h3>
                            <div className="input-container">
                                <label>Grade Level Lower Bound</label>
                                <input name="grade_level_lower" type="number" min={1} max={16} onChange={handleGenericChange}/>
                            </div>
                            <div className="input-container">
                                <label>Grade Level Upper Bound</label>
                                <input name="grade_level_upper" type="number" min={1} max={16} onChange={handleGenericChange}/>
                            </div>
                        </div>
                        
                        <div className="input-section-container">
                            <h3 className="input-section-title">Text Information (optional)</h3>
                            <div className="input-container">
                                <label>Text Title</label>
                                <input name="text_title" type="text" onChange={handleGenericChange}/>
                            </div>
                            <div className="input-container">
                                <label>Text Author</label>
                                <input name="text_author" type="text" onChange={handleGenericChange}/>
                            </div>
                            <div className="input-container">
                                <label>Text Publication Year</label>
                                <input name="text_publication_year" type="text" onChange={handleGenericChange}/>
                            </div>
                        </div>

                        <div className="input-section-container">
                            <h3 className="input-section-title">Lesson Plan Tags</h3>
                            <div className="outer-tag-input-container">
                                <p>Math Concept Tags</p>
                                <div className="tag-input-container">
                                    <input type="text" id={MATH_TAG}/>
                                    <button name={MATH_TAG} onClick={handleTagSetChange}>Add Tag</button>
                                </div>
                                <div className="tag-progress-container">
                                    {mathTags.map(tag => {
                                        return <p key={tag} className="lesson-tag">{tag}</p>
                                    })}
                                </div>
                            </div>

                            <div className="outer-tag-input-container">
                                <p>Math Standard Tags</p>
                                <div className="tag-input-container">
                                    <input type="text" id={STANDARD_TAG}/>
                                    <button name={STANDARD_TAG} onClick={handleTagSetChange}>Add Tag</button>
                                </div>
                                <div className="tag-progress-container">
                                    {standardTags.map(tag => {
                                        return <p key={tag} className="lesson-tag">{tag}</p>
                                    })}
                                </div>
                            </div>

                            <div className="outer-tag-input-container">
                                <p>Social Concept Tags</p>
                                <div className="tag-input-container">
                                    <input type="text" id={SOCIAL_TAG}/>
                                    <button name={SOCIAL_TAG} onClick={handleTagSetChange}>Add Tag</button>
                                </div>
                                <div className="tag-progress-container">
                                    {socialTags.map(tag => {
                                        return <p key={tag} className="lesson-tag">{tag}</p>
                                    })}
                                </div>
                            </div>
                        </div>
                        <button onClick={handleUpload}>Upload</button>
                        
                    </div>
                )}
            </Authenticator>
        </div>
    )
}

export default UploadPage;