import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GuidePage from './pages/GuidePage/GuidePage';
import HomePage from './pages/HomePage/HomePage';
import LessonPage from './pages/LessonPage/LessonPage';
import SearchPage from './pages/SearchPage/SearchPage';
import UploadPage from "./pages/UploadPage/UploadPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import BadRequestPage from "./pages/BadRequestPage/BadRequestPage";
import './App.css';
import Header from "./components/Header/HeaderNew";

const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.min');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/lesson/:lessonID" element={<LessonPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<BadRequestPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
