import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";
import { getLessonPlanByID } from "../../util/dynamo";
import Header from "../../components/Header/Header";
import "./LessonPage.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.min');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


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
        async function getAndSetLessonPlanInfo () {
            try {
                const urlResult = await getUrl({key: lessonID});
                const metadataResult = await getLessonPlanByID(lessonID);
                setPDFLink(urlResult.url.href)
                setLessonMetadata(metadataResult);
            } catch (error) {
                console.error(error)
            }
        }

        getAndSetLessonPlanInfo();
    }, [lessonID])

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

    const renderLessonInfo = () => {
        if(pdfLink && lessonMetadata) {
            return (
                <div className="lesson-outer-container">
                    <div className="lesson-metadata-container">
                        <p className="lesson-title">{lessonMetadata.lesson_title}</p>
                    </div>
                
                    <div className="lesson-pdf-container">
                        <Document file={pdfLink} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber}/>
                        </Document>
                        <div className="pdf-navigation-container">
                            <p className="pdf-page-info">{pageNumber} of {numPages}</p>
                            <div className="navigation-button-container">
                                <button onClick={previousPage}>Previous</button>
                                <button onClick={nextPage}>Next</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        } else {
            return <p>Retrieving lesson plan information ...</p>
        }
    }
    
    return (
        <div className="page-container">
            <Header/>
            {renderLessonInfo()}
        </div>
    )
}

export default LessonPage;