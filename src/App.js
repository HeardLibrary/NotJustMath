import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import GuidePage from './pages/GuidePage/GuidePage';
import HomePage from './pages/HomePage/HomePage';
import LessonPage from './pages/LessonPage/LessonPage';
import SearchPage from './pages/SearchPage/SearchPage';
import UploadPage from "./pages/UploadPage/UploadPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import BadRequestPage from "./pages/BadRequestPage/BadRequestPage";
import './App.css';

const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.min');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/home" replace/>
    },
    {
      path: "/home",
      element: <HomePage/>
    },
    {
      path: "/guide",
      element: <GuidePage/>
    },
    {
      path: "/search",
      element: <SearchPage/>
    },
    {
      path: "/upload",
      element: <UploadPage/>
    },
    {
      path: "/lesson/:lessonID",
      element: <LessonPage/>
    },
    {
      path: "/admin",
      element: <AdminPage/>
    },
    {
      path: "*",
      element: <BadRequestPage/>
    },
  ]);

  return <RouterProvider className="app-wrapper" router={router}/>
}

export default App;
