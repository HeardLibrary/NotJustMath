import { Authenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import {uploadData} from 'aws-amplify/storage'
import Header from "../../components/Header/Header";
import "./UploadPage.css";

const UploadPage = () => {
    const [file, setFile] = useState();

    const handleFileChange = (event) => {
        setFile(event?.target?.files[0]);
        console.log("New file uploaded.");
    }

    const handleUpload = async () => {
        if (!file) {
            console.warn("No file loaded.");
        }

        const lessonPlanUUID = crypto.randomUUID();
        try {
            console.log("Attempting file upload ...");

            const result = await uploadData({
                key: lessonPlanUUID,
                data: file
            }).result

            console.log("File uploaded!");
            console.log(result)
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