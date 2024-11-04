import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";
import { approveLessonPlanByID, rejectLessonPlanByID } from "../../util/dynamo";
import "./AdminViewLessonPlan.css";

const AdminViewLessonPlan = ({ lessonPlans }) => {
    const { lessonPlanID } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentLessonPlan, setCurrentLessonPlan] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [scale, setScale] = useState(1.0);
    const [currentPage, setCurrentPage] = useState(1);
    const pdfContainerRef = useRef(null);

    useEffect(() => {
        const lessonPlan = lessonPlans.find(plan => plan.id === lessonPlanID);
        if (lessonPlan) {
            setCurrentLessonPlan(lessonPlan);
            loadPdf(lessonPlanID);
        } else {
            console.error("Lesson plan not found");
        }
    }, [lessonPlanID, lessonPlans]);

    const loadPdf = async (lessonPlanID) => {
        try {
            const pdfURL = await getUrl({ key: lessonPlanID });
            setPdfUrl(pdfURL.url.href);
        } catch (error) {
            console.error("Failed to load PDF:", error);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const approveLessonPlan = async () => {
        await approveLessonPlanByID(lessonPlanID);
        navigate("/admin");
    };

    const rejectLessonPlan = async () => {
        await rejectLessonPlanByID(lessonPlanID);
        navigate("/admin");
    };

    const zoomIn = () => setScale(prevScale => prevScale + 0.2);
    const zoomOut = () => setScale(prevScale => (prevScale > 0.4 ? prevScale - 0.2 : prevScale));

    const handleScroll = () => {
        if (pdfContainerRef.current) {
            const containerTop = pdfContainerRef.current.getBoundingClientRect().top;
            const pages = Array.from(document.querySelectorAll(".pdf-page"));

            let closestPage = 1;
            let closestDistance = Infinity;

            pages.forEach((page, index) => {
                const pageTop = page.getBoundingClientRect().top;
                const distance = Math.abs(pageTop - containerTop);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestPage = index + 1;
                }
            });

            setCurrentPage(closestPage);
        }
    };

    useEffect(() => {
        const container = pdfContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [pdfContainerRef, numPages]);

    const renderGrades = (lower, upper) => {
        return lower === upper ? `Grade ${lower}` : `Grades ${lower} - ${upper}`;
    };

    const handleBackNavigation = () => {
        // Determine back path based on previous state
        if (location.pathname.startsWith("/admin/approved")) {
            navigate("/admin/approved");
        } else if (location.pathname.startsWith("/admin/rejected")) {
            navigate("/admin/rejected");
        } else {
            navigate("/admin");
        }
    };

    const showReviewButtons = location.pathname === `/admin/view/${lessonPlanID}`;

    if (!currentLessonPlan) {
        return <p>Loading...</p>;
    }

    return (
        <div className="lesson-plan-view-container">
            <button onClick={handleBackNavigation} className="back-button">{"< Back"}</button>
            <div className="lesson-plan-content">
                <div className="pdf-wrapper">
                    <div className="pdf-navigation-container">
                        <p className="page-number-display">{currentPage} / {numPages}</p>
                        <button onClick={zoomOut} className="zoom-button">-</button>
                        <p className="zoom-percent-display">{Math.round(scale * 100)}%</p>
                        <button onClick={zoomIn} className="zoom-button">+</button>
                    </div>
                    <div className="pdf-review-container" ref={pdfContainerRef}>
                        {pdfUrl ? (
                            <Document
                                file={pdfUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="pdf-document"
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        scale={scale}
                                        className="pdf-page"
                                    />
                                ))}
                            </Document>
                        ) : (
                            <p>Failed to load PDF.</p>
                        )}
                    </div>
                </div>
                <div className="lesson-plan-details">
                    <h3>{currentLessonPlan.lesson_title} ({renderGrades(currentLessonPlan.grade_level_lower, currentLessonPlan.grade_level_upper)})</h3>
                    <p><strong>Text Title:</strong> {currentLessonPlan.text_title}</p>
                    <p><strong>Text Author:</strong> {currentLessonPlan.text_author}</p>
                    <p>Math Concept Tags:</p>
                    <div className="tags-container">
                        {currentLessonPlan.math_concept_tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    <p>Social Concept Tags:</p>
                    <div className="tags-container">
                        {currentLessonPlan.social_concept_tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    <p>Math Content Standard Tags:</p>
                    <div className="tags-container">
                        {currentLessonPlan.standard_tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    {showReviewButtons && (
                        <div className="review-options">
                            <p className="review-option approve" onClick={approveLessonPlan}>Approve</p>
                            <p className="review-option reject" onClick={rejectLessonPlan}>Reject</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminViewLessonPlan;
