import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";
import Header from "../../components/Header/Header";
import "./LessonPage.css";

const LessonPage = () => {
    const { lessonID } = useParams();
    const [pdfLink, setPDFLink] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

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

    function renderPDFViewer() {
        if(pdfLink) {
            console.log("PDF link generated: ", pdfLink)
            return (
                <div>
                    <Document file={pdfLink}>
                        <Page pageNumber={pageNumber}/>
                    </Document>
                    <p>{pageNumber} of {numPages}</p>
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