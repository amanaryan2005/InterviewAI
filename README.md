InterviewAI 🎯

An AI-powered interview preparation platform built with React, TypeScript, and Vite.

Practice real interview scenarios, get instant AI feedback, and track your progress — all in a modern, responsive web app.

---

✨ Features

· 🎤 AI-driven mock interviews — realistic interview questions generated and evaluated by Google's Gemini AI
· 📊 Performance analytics — visual insights into your strengths and weak areas using interactive charts
· 🗂️ Multiple interview modes — technical, behavioral, and role-specific practice sessions
· 🎨 Modern UI — built with Radix UI, shadcn-style components, and Tailwind CSS
· 🔐 Authentication & storage — secure user accounts and session history via Supabase
· 📱 Fully responsive — works seamlessly across desktop and mobile
· 🧠 Persistent state — Redux Toolkit for app-wide state and React Query for server data
· 📄 Exportable reports — download your interview feedback as a PDF
· 🌗 Dark / light theme — powered by next-themes

---

🛠️ Tech Stack

Layer Tools
Framework React 18, TypeScript, Vite
Styling Tailwind CSS, shadcn/ui, Radix UI
AI Google Generative AI (Gemini)
Backend / Auth Supabase
State Management Redux Toolkit, Zustand, React Query
Forms & Validation React Hook Form, Zod
Charts & Visualization Recharts, Chart.js
3D & Animation Three.js, React Three Fiber, Framer Motion
Routing React Router DOM
Payments Stripe
PDF / Export jsPDF, XLSX
Icons Lucide React

---

⚙️ How It Works

1. Sign in — authenticate securely via Supabase
2. Choose a mode — pick the interview type (technical, behavioral, role-specific)
3. Answer questions — respond to AI-generated interview questions in real time
4. Get feedback — Gemini evaluates your answers and returns structured, actionable feedback
5. Review progress — track scores, weak topics, and improvement trends over time
6. Export — download a PDF report of your session

---

📁 Project Structure

```
interviewai/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (shadcn/Radix)
│   │   └── ui/
│   ├── pages/              # Route-level pages
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, API clients, helpers
│   ├── store/              # Redux / Zustand stores
│   ├── services/           # Supabase & AI integrations
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Root component
│   └── main.tsx            # App entry point
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env
```

---

🚀 Setup

1. Clone the repo

```bash
git clone <your-repo-url>
cd interviewai
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a .env file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_google_gemini_api_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Get your keys from:

· Gemini → Google AI Studio
· Supabase → supabase.com
· Stripe → dashboard.stripe.com

4. Run the dev server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

📜 Available Scripts

Script Description
npm run dev Start the development server
npm run build Build for production
npm run build:dev Build in development mode
npm run preview Preview the production build locally
npm run lint Run ESLint across the project

---

🧭 Roadmap

☐ Voice-based interview mode (speech-to-text + TTS)
☐ Resume-aware question generation
☐ Company-specific interview tracks
☐ Peer-to-peer mock interview rooms
☐ Mobile app (React Native)
☐ Deployment with CI/CD

---

🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

📄 License

MIT

