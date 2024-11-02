import { Authenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { getUrl } from "aws-amplify/storage";
import { listLessonPlans, rejectLessonPlanByID, approveLessonPlanByID } from "../../util/dynamo";
import { LessonPlanApprovalStates } from "../../util/constants";
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
        const getAndSetPendingLessonPlans = async () => {
            const lessonPlans = await listLessonPlans();
            const pendingLessonPlans = lessonPlans.filter(lessonPlan => lessonPlan.approval_state === LessonPlanApprovalStates.PENDING);
            setPendingLessonPlans(pendingLessonPlans);
        }

        getAndSetPendingLessonPlans();
    }, [])

    const handleLessonPlanSelection = async (lessonPlanID) => {
        const pdfURL = await getUrl({ key: lessonPlanID });
        setCurrentLessonPlanID(lessonPlanID);
        setCurrentLessonPlanPDFUrl(pdfURL.url.href)
    }

    const approveCurrentLessonPlan = async () => {
        if (currentLessonPlanID) {
            await approveLessonPlanByID(currentLessonPlanID);
            resetStateAfterUpdate();
        }
    }

    const rejectCurrentLessonPlan = async () => {
        if (currentLessonPlanID) {
            await rejectLessonPlanByID(currentLessonPlanID);
            resetStateAfterUpdate();
        }
    }

    const resetStateAfterUpdate = () => {
        const lessonPlanIDToRemove = currentLessonPlanID;
        setCurrentLessonPlanID(null);
        setCurrentLessonPlanPDFUrl(null);
        setNumPages(null);
        setPageNumber(1);

        let lessonPlans = pendingLessonPlans;
        lessonPlans = lessonPlans.filter(lessonPlan => lessonPlan.id !== lessonPlanIDToRemove);
        setPendingLessonPlans(lessonPlans)
    }

    const renderGrades = (lower, upper) => {
        if (lower === upper) {
            return `Grade ${lower}`
        } else {
            return `Grades ${lower} - ${upper}`
        }
    }

    const renderPendingLessonPlans = () => {
        if (pendingLessonPlans.length > 0) {
            return pendingLessonPlans.map(lessonPlan => {
                return (
                    <div className="result-preview admin-preview" key={lessonPlan.id} onClick={handleLessonPlanSelection.bind(this, lessonPlan.id)} >
                        <div className="result-preview-left">
                            <p className="result-preview-title">{lessonPlan.lesson_title} ({renderGrades(lessonPlan.grade_level_lower, lessonPlan.grade_level_upper)})</p>
                            <p className="result-preview-tags"><span className="tag-title">Math Concepts:</span> {lessonPlan.math_concept_tags.join(", ")}</p>
                            <p className="result-preview-tags"><span className="tag-title">Social Concepts:</span> {lessonPlan.social_concept_tags.join(", ")}</p>
                            <p className="result-preview-tags"><span className="tag-title">Math Content Standards:</span> {lessonPlan.standard_tags.join(", ")}</p>
                        </div>
                        <div className="result-preview-right"></div>
                    </div>
                )
            })
        } else {
            return <p className="no-pending-message">No pending submissions. Well done!</p>
        }
    }

    const addPrevValidityClass = () => {
        if (pageNumber === 1) {
            return 'invalid';
        }
        return '';
    }

    const addNextValidityClass = () => {
        if (pageNumber === numPages) {
            return 'invalid';
        }
        return '';
    }

    const renderCurrentPDF = () => {
        if (currentLessonPlanPDFUrl) {
            return (
                <div className="pdf-review-container">
                    <div className="pdf-navigation-container">
                        <img className={`pdf-nav pdf-left ${addPrevValidityClass()}`} alt="Navigate back button" src={NavPrevious} onClick={previousPage} />
                        <Document classname="pdf-viewer" file={currentLessonPlanPDFUrl} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} />
                        </Document>
                        <img className={`pdf-nav pdf-right ${addNextValidityClass()}`} alt="Navigate next button" src={NavNext} onClick={nextPage} />
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
            setPageNumber(pageNumber + 1)
        }
    }

    const previousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    return (
        <div className="page-container">
            <Authenticator>
                {({ signOut, _user }) => (
                    <div className="admin-content-container">
                        <div className="admin-sub-header">
                            <h3>Review Lesson Plans</h3>
                            <button onClick={signOut}>Logout</button>
                        </div>
                        <div className="admin-core-container">
                            <div className="admin-content-left">
                                {renderCurrentPDF()}
                            </div>
                            <div className="admin-content-right">
                                <h4>Lesson Plan Selection</h4>
                                {renderPendingLessonPlans()}
                            </div>
                        </div>
                    </div>
                )}
            </Authenticator>
        </div>

    )
}

export default AdminPage;