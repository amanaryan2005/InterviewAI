import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-8xl font-black font-display text-gradient-cyan mb-4 select-none">404</div>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/5 transition-colors text-sm"
          >
            <ArrowLeft size={15} /> Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-colors text-sm"
          >
            <Home size={15} /> Home
          </button>
        </div>
      </div>
    </div>
  );
}
