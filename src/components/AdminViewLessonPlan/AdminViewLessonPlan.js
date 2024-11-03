import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useParams, useNavigate } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";
import { approveLessonPlanByID, rejectLessonPlanByID } from "../../util/dynamo";
import NavPrevious from "../../pages/AdminPage/assets/nav-prev.png";
import NavNext from "../../pages/AdminPage/assets/nav-next.png";
import "./AdminViewLessonPlan.css";

const AdminViewLessonPlan = ({ lessonPlans }) => {
    const { lessonPlanID } = useParams();
    const navigate = useNavigate();
    const [currentLessonPlan, setCurrentLessonPlan] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const lessonPlan = lessonPlans.find(plan => plan.id === lessonPlanID);
        if (lessonPlan) {
            setCurrentLessonPlan(lessonPlan);
            loadPdf(lessonPlanID);
        }
    }, [lessonPlanID, lessonPlans]);

    const loadPdf = async (lessonPlanID) => {
        const pdfURL = await getUrl({ key: lessonPlanID });
        setPdfUrl(pdfURL.url.href);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const approveLessonPlan = async () => {
        await approveLessonPlanByID(lessonPlanID);
        navigate("/admin"); // Redirect back to the admin page
    };

    const rejectLessonPlan = async () => {
        await rejectLessonPlanByID(lessonPlanID);
        navigate("/admin"); // Redirect back to the admin page
    };

    const nextPage = () => {
        if (pageNumber < numPages) setPageNumber(pageNumber + 1);
    };

    const previousPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    const addPrevValidityClass = () => (pageNumber === 1 ? 'invalid' : '');
    const addNextValidityClass = () => (pageNumber === numPages ? 'invalid' : '');

    if (!currentLessonPlan) {
        return <p>Loading...</p>;
    }

    return (
        <div className="lesson-plan-view-container">
            <button onClick={() => navigate("/admin")} className="back-button">{"< Back"}</button>
            <div className="lesson-plan-content">
                <div className="pdf-review-container">
                    {pdfUrl && (
                        <>
                            <div className="pdf-navigation-container">
                                <img className={`pdf-nav pdf-left ${addPrevValidityClass()}`} alt="Navigate back button" src={NavPrevious} onClick={previousPage} />
                                <Document className="pdf-viewer" file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                <img className={`pdf-nav pdf-right ${addNextValidityClass()}`} alt="Navigate next button" src={NavNext} onClick={nextPage} />
                            </div>
                            
                        </>
                    )}
                </div>
                <div className="lesson-plan-details">
                    <h2>{currentLessonPlan.lesson_title} (Grade {currentLessonPlan.grade_level_lower} - {currentLessonPlan.grade_level_upper})</h2>
                    <p><strong>Text Title:</strong> {currentLessonPlan.text_title}</p>
                    <p><strong>Text Author:</strong> {currentLessonPlan.text_author}</p>
                    <p><strong>Math Concept Tags:</strong> {currentLessonPlan.math_concept_tags.join(", ")}</p>
                    <p><strong>Social Concept Tags:</strong> {currentLessonPlan.social_concept_tags.join(", ")}</p>
                    <p><strong>Math Content Standard Tags:</strong> {currentLessonPlan.standard_tags.join(", ")}</p>
                    <div className="pdf-review-options">
                        <p className="pdf-review-option approve" onClick={approveLessonPlan}>APPROVE</p>
                        <p className="pdf-review-option reject" onClick={rejectLessonPlan}>REJECT</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminViewLessonPlan;
