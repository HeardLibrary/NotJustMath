import { Authenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { addLessonPlan } from "../../util/dynamo";
import Header from "../../components/Header/Header";
import "./UploadPage.css";

const UploadPage = () => {
    const [file, setFile] = useState();

    const handleFileChange = (event) => {
        setFile(event?.target?.files[0]);
        console.log("New file loaded.");
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
                await addLessonPlan({
                    id: lessonPlanID,
                    grade_level_lower: 3,
                    grade_level_upper: 5,
                    approval_state: "PENDING"
                });

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
                {({ signOut, user }) => (
                    <div className="upload-form">
                        <h3>Upload Form for {user.signInDetails.loginId}</h3>
                        <input type="file" onChange={handleFileChange} accept=".pdf"/>
                        <button onClick={handleUpload}>Upload</button>
                        <button onClick={signOut}>Logout</button>
                    </div>
                )}
            </Authenticator>
        </div>
    )
}

export default UploadPage;