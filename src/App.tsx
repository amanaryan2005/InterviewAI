import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "@/pages/LandingPage";
import ProfessionsPage from "@/pages/ProfessionsPage";
import InterviewPage from "@/pages/InterviewPage";
import ResultsPage from "@/pages/ResultsPage";
import PricingPage from "@/pages/PricingPage";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0f1629",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f1f5f9",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/professions" element={<ProfessionsPage />} />
        <Route path="/interview/:professionId" element={<InterviewPage />} />
        <Route path="/results/:sessionId" element={<ResultsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
