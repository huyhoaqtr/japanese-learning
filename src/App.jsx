import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./layouts/AppShell";
import { getFeatureByPath } from "./data/features";
import ComingSoonPage from "./pages/ComingSoonPage";
import HomePage from "./pages/HomePage";
import KanaPracticePage from "./pages/KanaPracticePage";
import LandingPage from "./pages/LandingPage";
import LessonListPage from "./pages/LessonListPage";
import LessonDetailPage from "./pages/LessonDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AppShell />}>
        <Route path="/trang-chu" element={<HomePage />} />
        <Route path="/luyen-kana" element={<KanaPracticePage />} />
        <Route path="/bai-hoc" element={<LessonListPage />} />
        <Route path="/bai-hoc/:lessonId" element={<LessonDetailPage />} />
        <Route path="/kanji-co-ban" element={<ComingSoonPage key="kanji" feature={getFeatureByPath("/kanji-co-ban")} />} />
        <Route path="/luyen-de-jlpt" element={<ComingSoonPage key="jlpt-test" feature={getFeatureByPath("/luyen-de-jlpt")} />} />
        <Route path="*" element={<Navigate to="/trang-chu" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
