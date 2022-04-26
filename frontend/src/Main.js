import App from "./components/App";
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
  );
}

export default Main;
