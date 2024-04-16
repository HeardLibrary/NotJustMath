import { Authenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { getUrl } from "aws-amplify/storage";
import { listLessonPlans, rejectLessonPlanByID, approveLessonPlanByID } from "../../util/dynamo";
import { LessonPlanApprovalStates } from "../../util/constants";
import Header from "../../components/Header/Header";
import NavPrevious from "./assets/nav-prev.png";
import NavNext from "./assets/nav-next.png";
import "./AdminPage.css";

const AdminPage = () => {
    const [pendingLessonPlans, setPendingLessonPlans] = useState([]);
    const [currentLessonPlanID, setCurrentLessonPlanID] = useState(null);
    const [currentLessonPlanPDFUrl, setCurrentLessonPlanPDFUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        async function getAndSetPendingLessonPlans() {
            const lessonPlans = await listLessonPlans();
            const pendingLessonPlans = lessonPlans.filter(lessonPlan => lessonPlan.approval_state === LessonPlanApprovalStates.PENDING );
            setPendingLessonPlans(pendingLessonPlans);
        }

        getAndSetPendingLessonPlans();
    })

    const handleLessonPlanSelection = async (lessonPlanID) => {
        const pdfURL = await getUrl({key: lessonPlanID});
        setCurrentLessonPlanID(lessonPlanID);
        setCurrentLessonPlanPDFUrl(pdfURL.url.href)
    }

    const approveCurrentLessonPlan = async () => {
        if (currentLessonPlanID) {
            await approveLessonPlanByID(currentLessonPlanID);
            resetCurrentLessonPlanInfo()
        }
    }

    const rejectCurrentLessonPlan = async () => {
        if (currentLessonPlanID) {
            await rejectLessonPlanByID(currentLessonPlanID);
            resetCurrentLessonPlanInfo()
        }
    }

    const resetCurrentLessonPlanInfo = () => {
        setCurrentLessonPlanID(null);
        setCurrentLessonPlanPDFUrl(null);
        setNumPages(null);
        setPageNumber(1);
    }

    const renderPendingLessonPlans = () => {
        if (pendingLessonPlans.length > 0) {
            return pendingLessonPlans.map(lessonPlan => {
                return <p key={lessonPlan.id} onClick={handleLessonPlanSelection.bind(this, lessonPlan.id)}>{lessonPlan.id}</p>
            })
        } else {
            return <p className="no-pending-message">No pending submissions. Well done!</p>
        }
    }

    const renderCurrentPDF = () => {
        if (currentLessonPlanPDFUrl) {
            return (
                <div className="pdf-review-container">
                    <div className="pdf-navigation-container">
                        <img className="pdf-nav-left" src={NavPrevious}/>
                        <Document classname="pdf-viewer" file={currentLessonPlanPDFUrl} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber}/>
                        </Document>
                        <img className="pdf-nav-right" src={NavNext}/>
                    </div>
                    <div className="pdf-review-options">
                        <p className="pdf-review-option approve" onClick={approveCurrentLessonPlan}>APPROVE</p>
                        <p className="pdf-review-option reject" onClick={rejectCurrentLessonPlan}>REJECT</p>
                    </div>
                </div>
                
            )
        } else if (pendingLessonPlans.length > 0) {
            return (
                <p className="pdf-viewer-message">No PDF currently loaded. Please select a lesson plan to review.</p>
            )
        }
    }

    const nextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber+1)
        }
    }

    const previousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber-1)
        }
    }

    return (
        <div className="page-container">
            <Header/>
            <Authenticator>
                {({ signOut, _user }) => (
                    <div className="admin-content-container">
                        <h3>Review Lesson Plans</h3>
                        <button onClick={signOut}>Logout</button>
                        <div className="admin-content-left">
                            {renderCurrentPDF()}
                        </div>
                        <div className="admin-content-right">
                            {renderPendingLessonPlans()}
                        </div>
                    </div>
                )}
            </Authenticator>
        </div>
        
    )
}

export default AdminPage;