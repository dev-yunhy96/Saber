import App from "./components/App";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import WishlistPage from "./pages/WishlistPage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SamplePage from "./pages/SamplePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyPageDemo2 from "./pages/MyPageDemo2";
import MyPage from "./pages/MyPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="courses">
            <Route path=":courseSlug" element={<CoursePage />} />
          </Route>
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="questions">
            <Route index element={<QuestionListPage />} />
            <Route path=":id" element={<QuestionPage />} />
          </Route>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="sample" element={<SamplePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="mypage2" element={<MyPageDemo2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
