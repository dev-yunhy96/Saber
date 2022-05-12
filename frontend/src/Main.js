import App from "./components/App";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import WishlistPage from "./pages/WishlistPage";
import RecordPage from "./pages/RecordPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="record">
            <Route path=":userNick" element={<RecordPage />} />
          </Route>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="community">
            <Route index element={<Community />} />
            <Route
              path="battle/:id"
              element={<CommunityDetail category="battle" />}
            />
            <Route
              path="common/:id"
              element={<CommunityDetail category="common" />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
