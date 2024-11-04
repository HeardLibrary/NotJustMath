import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams, Link } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";
import { getLessonPlanByID } from "../../util/dynamo";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
import "./LessonPageNew.css";
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const LessonPage = () => {
    const { lessonID } = useParams();
    const [pdfLink, setPDFLink] = useState(null);
    const [lessonMetadata, setLessonMetadata] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        async function getAndSetLessonPlanInfo() {
            try {
                const urlResult = await getUrl({ key: lessonID });
                const metadataResult = await getLessonPlanByID(lessonID);
                if (urlResult?.url?.href) {
                    setPDFLink(urlResult.url.href);
                    setLessonMetadata(metadataResult);
                } else {
                    console.error("URL not found for the lesson plan.");
                }

            } catch (error) {
                console.error(error)
            }
        }

        getAndSetLessonPlanInfo();
    }, [lessonID]);

    const renderLessonInfo = () => {
        try {
            if (pdfLink && lessonMetadata) {
                return (
                    <div>
                        <div className="lesson-top-container">
                            <h3>{lessonMetadata.lesson_title}</h3>
                        </div>
                        <div className="lesson-body-container">

                            <div className="lesson-pdf-container">

                                <Viewer fileUrl={pdfLink} />

                            </div>
                            <div className="lesson-info-container">
                                <h3>About this Lesson Plan</h3>
                                <p><span className="label">Lesson Plan Title:</span> {lessonMetadata.lesson_title}</p>
                                <p><span className="label">Grade Level: </span>
                                    {
                                        lessonMetadata.grade_level_upper === lessonMetadata.grade_level_lower
                                            ? `Grade ${lessonMetadata.grade_level_upper}`
                                            : `Grade ${lessonMetadata.grade_level_upper} - Grade ${lessonMetadata.grade_level_lower}`
                                    }
                                </p>
                                <p><span className="label">Uploaded on:</span> {new Date(lessonMetadata.createdAt).toLocaleDateString()}</p>

                                <h3>Text Information</h3>
                                <p><span className="label">Text Title:</span> {lessonMetadata.text_title}</p>
                                <p><span className="label">Author:</span> {lessonMetadata.text_author}</p>
                                <p><span className="label">Publication Year:</span> {lessonMetadata.text_publication_year}</p>

                                <h3>Lesson Plan Tags</h3>
                                <p><span className="label">Math Concept:</span> {lessonMetadata.math_concept_tags.join(", ")}</p>
                                <p><span className="label">Social Justice:</span> {lessonMetadata.social_concept_tags.join(", ")}</p>
                                <p><span className="label">Math Content Standards:</span> {lessonMetadata.standard_tags.join(", ")}</p>
                                <Link className="download-button" to={pdfLink}>Download Lesson Plan</Link>
                            </div>

                        </div>
                    </div >
                )
            } else {
                return <p>Retrieving lesson plan information ...</p>
            }
        } catch (error) {
            console.log(error);
            renderLessonInfo();
        }
    }

    return (
        <div className="lesson-page-container">
            {renderLessonInfo()}
        </div>
    )
}

export default LessonPage;