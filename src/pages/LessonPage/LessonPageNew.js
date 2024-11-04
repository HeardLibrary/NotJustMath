import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams, Link } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";
import { getLessonPlanByID } from "../../util/dynamo";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
import "./LessonPageNew.css";

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
                    console.log(metadataResult)
                } else {
                    console.error("URL not found for the lesson plan.");
                }

            } catch (error) {
                console.error(error)
            }
        }

        getAndSetLessonPlanInfo();
    }, [lessonID])

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



    const renderLessonInfo = () => {
        try {
            if (pdfLink && lessonMetadata) {
                return (
                    <div>
                        <div className="lesson-top-container">
                            <h2>{lessonMetadata.lesson_title}</h2>
                        </div>
                        <div className="lesson-body-container">

                            <div className="lesson-pdf-container">
                                <Document className="document" file={pdfLink} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} scale={1.2}
                                        renderTextLayer={false} renderAnnotationLayer={false} />
                                </Document>
                                <div className="pdf-navigation-container">
                                    <p className="pdf-page-info">{pageNumber} of {numPages}</p>
                                    <div className="navigation-button-container">
                                        <button className={`button-half-left ${addPrevValidityClass()}`} onClick={previousPage}>Previous</button>
                                        <button className={`button-half-right ${addNextValidityClass()}`} onClick={nextPage}>Next</button>
                                    </div>
                                </div>
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