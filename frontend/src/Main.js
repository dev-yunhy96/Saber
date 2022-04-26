import App from "./components/App";
<<<<<<< HEAD
import CourseListPage from "./pages/CourseListPage";
import CoursePage from "./pages/CoursePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import WishlistPage from "./pages/WishlistPage";

function Main() {
  return (
    <App>
      <HomePage />
    </App>
=======
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import CourseListPage from "./pages/CourseListPage";
import WishlistPage from "./pages/WishlistPage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import NotFoundPage from "./pages/NotFoundPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="courses">
            <Route index element={<CourseListPage />} />
            <Route path=":courseSlug" element={<CoursePage />} />
          </Route>
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="questions">
            <Route index element={<QuestionListPage />} />
            <Route path=":id" element={<QuestionPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
>>>>>>> 29353df02d78832ac95a745a45f796326a457c07
  );
}

export default Main;
