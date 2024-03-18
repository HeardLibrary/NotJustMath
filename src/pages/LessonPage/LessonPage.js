import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";
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
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        async function getAndSetPDFLink () {
            try {
                const urlResult = await getUrl({key: lessonID})
                setPDFLink(urlResult.url.href)
            } catch (error) {
                console.error(error)
            }
        }

        getAndSetPDFLink();
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

    function renderPDFViewer() {
        if(pdfLink) {
            console.log("PDF link generated: ", pdfLink)
            return (
                <div>
                    <Document file={pdfLink} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber}/>
                    </Document>
                    <p>{pageNumber} of {numPages}</p>
                    <div className="navigation-container">
                        <button onClick={previousPage}>Previous</button>
                        <button onClick={nextPage}>Next</button>
                    </div>
                </div>
            )
        } else {
            console.log("Still waiting for PDF link")
            return <p>Generating PDF link ...</p>
        }
    }
    
    return (
        <div className="page-container">
            <Header/>
            <p>This is the Lesson Page for {lessonID}</p>
            {renderPDFViewer()}
        </div>
    )
}

export default LessonPage;