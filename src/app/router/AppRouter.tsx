import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const QuestionsPage = lazy(() => import("../../pages/questions/ui/Questions"));
const QuestionPage = lazy(() => import("../../pages/question/ui/Question"));

export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<QuestionsPage />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
      </Routes>
    </Suspense>
  );
}


