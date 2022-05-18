import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import RecordPage from "./pages/RecordPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import Community from "./pages/Community";
import CommunityWrite from "./pages/CommunityWrite";
import NotFoundPage from "./pages/NotFoundPage";
import BoardDetail from "./components/community/BoardDetail";
import BoardUpdate from "./components/community/BoardUpdate";
import NaverLoginCallBack from "./components/NaverLoginCallBack";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="naver" element={<NaverLoginCallBack />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="record">
            <Route path=":userNick" element={<RecordPage />} />
          </Route>
          <Route path="community">
            <Route index element={<Community />} />
            <Route path="write" element={<CommunityWrite />} />
            <Route path=":communityId" element={<BoardDetail />} />
            <Route path="update/:communityId" element={<BoardUpdate />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
