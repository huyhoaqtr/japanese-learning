import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./layouts/AppShell";
import { getFeatureByPath } from "./data/features";
import ComingSoonPage from "./pages/ComingSoonPage";
import HomePage from "./pages/HomePage";
import KanaPracticePage from "./pages/KanaPracticePage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/kana-practice" element={<KanaPracticePage />} />
        <Route path="/vocabulary" element={<ComingSoonPage key="vocabulary" feature={getFeatureByPath("/vocabulary")} />} />
        <Route path="/grammar" element={<ComingSoonPage key="grammar" feature={getFeatureByPath("/grammar")} />} />
        <Route path="/kanji" element={<ComingSoonPage key="kanji" feature={getFeatureByPath("/kanji")} />} />
        <Route path="/jlpt-test" element={<ComingSoonPage key="jlpt-test" feature={getFeatureByPath("/jlpt-test")} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
