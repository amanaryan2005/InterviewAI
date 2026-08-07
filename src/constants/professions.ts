import type { Profession, ProfessionCategory } from "@/types";

export const PROFESSION_CATEGORIES: ProfessionCategory[] = [
  "Technology", "Healthcare", "Finance", "Education", "Engineering",
  "Marketing", "Design", "Legal", "Business", "Science", "Creative", "Hospitality",
];

export const CATEGORY_ICONS: Record<ProfessionCategory, string> = {
  Technology: "💻", Healthcare: "🏥", Finance: "💰", Education: "📚",
  Engineering: "⚙️", Marketing: "📣", Design: "🎨", Legal: "⚖️",
  Business: "💼", Science: "🔬", Creative: "✨", Hospitality: "🏨",
};

export const CATEGORY_COLORS: Record<ProfessionCategory, string> = {
  Technology: "from-cyan-500/20 to-blue-600/20 border-cyan-500/20",
  Healthcare: "from-emerald-500/20 to-teal-600/20 border-emerald-500/20",
  Finance: "from-amber-500/20 to-yellow-600/20 border-amber-500/20",
  Education: "from-violet-500/20 to-purple-600/20 border-violet-500/20",
  Engineering: "from-orange-500/20 to-red-600/20 border-orange-500/20",
  Marketing: "from-pink-500/20 to-rose-600/20 border-pink-500/20",
  Design: "from-fuchsia-500/20 to-purple-600/20 border-fuchsia-500/20",
  Legal: "from-slate-500/20 to-gray-600/20 border-slate-500/20",
  Business: "from-blue-500/20 to-indigo-600/20 border-blue-500/20",
  Science: "from-teal-500/20 to-cyan-600/20 border-teal-500/20",
  Creative: "from-rose-500/20 to-pink-600/20 border-rose-500/20",
  Hospitality: "from-lime-500/20 to-green-600/20 border-lime-500/20",
};

export const PROFESSIONS: Profession[] = [
  // Technology
  { id: "software-engineer", title: "Software Engineer", category: "Technology", description: "Build and maintain scalable software systems and applications", difficulty: "Intermediate", tags: ["coding", "algorithms", "system design"], interviewCount: 15420 },
  { id: "frontend-developer", title: "Frontend Developer", category: "Technology", description: "Craft beautiful, responsive user interfaces for the web", difficulty: "Intermediate", tags: ["react", "css", "javascript"], interviewCount: 12380 },
  { id: "data-scientist", title: "Data Scientist", category: "Technology", description: "Analyze data and build machine learning models", difficulty: "Advanced", tags: ["python", "machine learning", "statistics"], interviewCount: 9870 },
  { id: "product-manager", title: "Product Manager", category: "Technology", description: "Drive product strategy, roadmap, and cross-functional teams", difficulty: "Intermediate", tags: ["strategy", "roadmap", "stakeholders"], interviewCount: 8450 },
  { id: "devops-engineer", title: "DevOps Engineer", category: "Technology", description: "Build CI/CD pipelines and manage cloud infrastructure", difficulty: "Advanced", tags: ["kubernetes", "aws", "docker"], interviewCount: 6320 },
  { id: "cybersecurity-analyst", title: "Cybersecurity Analyst", category: "Technology", description: "Protect systems and networks from security threats", difficulty: "Advanced", tags: ["security", "networking", "ethical hacking"], interviewCount: 5210 },
  { id: "ai-ml-engineer", title: "AI/ML Engineer", category: "Technology", description: "Design and deploy intelligent AI and ML systems", difficulty: "Advanced", tags: ["deep learning", "pytorch", "nlp"], interviewCount: 7840 },
  { id: "backend-developer", title: "Backend Developer", category: "Technology", description: "Design APIs and server-side architecture", difficulty: "Intermediate", tags: ["node.js", "databases", "APIs"], interviewCount: 11200 },
  // Healthcare
  { id: "doctor", title: "Physician", category: "Healthcare", description: "Diagnose and treat patients with compassion and clinical expertise", difficulty: "Advanced", tags: ["diagnosis", "patient care", "clinical"], interviewCount: 4320 },
  { id: "nurse", title: "Registered Nurse", category: "Healthcare", description: "Provide patient care, medication, and emotional support", difficulty: "Intermediate", tags: ["patient care", "clinical skills", "compassion"], interviewCount: 3870 },
  { id: "pharmacist", title: "Pharmacist", category: "Healthcare", description: "Dispense medications and counsel patients on drug therapy", difficulty: "Advanced", tags: ["pharmacology", "counseling", "drug interactions"], interviewCount: 2140 },
  { id: "physiotherapist", title: "Physiotherapist", category: "Healthcare", description: "Help patients recover from injuries and physical conditions", difficulty: "Intermediate", tags: ["rehabilitation", "anatomy", "exercise therapy"], interviewCount: 1980 },
  // Finance
  { id: "financial-analyst", title: "Financial Analyst", category: "Finance", description: "Analyze financial data and investment opportunities", difficulty: "Intermediate", tags: ["financial modeling", "valuation", "Excel"], interviewCount: 7650 },
  { id: "investment-banker", title: "Investment Banker", category: "Finance", description: "Advise on mergers, acquisitions, and capital raising", difficulty: "Advanced", tags: ["M&A", "DCF", "capital markets"], interviewCount: 5430 },
  { id: "accountant", title: "Accountant", category: "Finance", description: "Manage financial records, audits, and tax compliance", difficulty: "Beginner", tags: ["bookkeeping", "tax", "audit"], interviewCount: 4210 },
  { id: "portfolio-manager", title: "Portfolio Manager", category: "Finance", description: "Manage investment portfolios and asset allocation strategies", difficulty: "Advanced", tags: ["risk management", "asset allocation", "markets"], interviewCount: 3180 },
  // Education
  { id: "teacher", title: "Teacher", category: "Education", description: "Inspire and educate students to reach their full potential", difficulty: "Beginner", tags: ["curriculum", "classroom management", "pedagogy"], interviewCount: 5670 },
  { id: "university-professor", title: "University Professor", category: "Education", description: "Conduct academic research and teach at university level", difficulty: "Advanced", tags: ["research", "lecturing", "mentoring"], interviewCount: 2340 },
  // Engineering
  { id: "mechanical-engineer", title: "Mechanical Engineer", category: "Engineering", description: "Design and develop mechanical systems and products", difficulty: "Intermediate", tags: ["CAD", "thermodynamics", "manufacturing"], interviewCount: 4870 },
  { id: "civil-engineer", title: "Civil Engineer", category: "Engineering", description: "Design and manage construction and infrastructure projects", difficulty: "Intermediate", tags: ["structural analysis", "project management", "AutoCAD"], interviewCount: 3940 },
  { id: "electrical-engineer", title: "Electrical Engineer", category: "Engineering", description: "Design electrical systems, circuits, and power solutions", difficulty: "Intermediate", tags: ["circuit design", "power systems", "embedded systems"], interviewCount: 4210 },
  // Marketing
  { id: "digital-marketer", title: "Digital Marketer", category: "Marketing", description: "Drive online growth through data-driven marketing campaigns", difficulty: "Intermediate", tags: ["SEO", "social media", "content strategy"], interviewCount: 8320 },
  { id: "brand-manager", title: "Brand Manager", category: "Marketing", description: "Build and maintain strong brand identity and positioning", difficulty: "Intermediate", tags: ["brand strategy", "campaigns", "market research"], interviewCount: 4560 },
  { id: "content-writer", title: "Content Writer", category: "Marketing", description: "Create compelling copy and content that drives engagement", difficulty: "Beginner", tags: ["copywriting", "SEO", "storytelling"], interviewCount: 5430 },
  // Design
  { id: "ux-designer", title: "UX Designer", category: "Design", description: "Design intuitive, user-centered digital experiences", difficulty: "Intermediate", tags: ["user research", "wireframing", "prototyping"], interviewCount: 9870 },
  { id: "graphic-designer", title: "Graphic Designer", category: "Design", description: "Create visual content, brand assets, and illustrations", difficulty: "Beginner", tags: ["adobe suite", "typography", "color theory"], interviewCount: 6540 },
  { id: "product-designer", title: "Product Designer", category: "Design", description: "Design end-to-end product experiences from concept to ship", difficulty: "Intermediate", tags: ["figma", "design systems", "user testing"], interviewCount: 7230 },
  // Legal
  { id: "lawyer", title: "Lawyer", category: "Legal", description: "Provide legal counsel and represent clients in legal matters", difficulty: "Advanced", tags: ["litigation", "contracts", "legal research"], interviewCount: 3450 },
  { id: "paralegal", title: "Paralegal", category: "Legal", description: "Support attorneys with research, drafting, and case management", difficulty: "Intermediate", tags: ["legal research", "drafting", "case management"], interviewCount: 2180 },
  // Business
  { id: "business-analyst", title: "Business Analyst", category: "Business", description: "Analyze business processes and translate needs into solutions", difficulty: "Intermediate", tags: ["requirements", "data analysis", "process improvement"], interviewCount: 6780 },
  { id: "consultant", title: "Management Consultant", category: "Business", description: "Advise organizations on strategy, operations, and transformation", difficulty: "Advanced", tags: ["strategy", "problem solving", "frameworks"], interviewCount: 5670 },
  { id: "project-manager", title: "Project Manager", category: "Business", description: "Plan, execute, and deliver projects on time and within budget", difficulty: "Intermediate", tags: ["agile", "stakeholder management", "risk"], interviewCount: 8340 },
  // Science
  { id: "biologist", title: "Research Biologist", category: "Science", description: "Study living organisms and advance biological knowledge", difficulty: "Advanced", tags: ["research", "laboratory", "data analysis"], interviewCount: 1870 },
  { id: "environmental-scientist", title: "Environmental Scientist", category: "Science", description: "Study environmental issues and develop sustainability solutions", difficulty: "Intermediate", tags: ["ecology", "sustainability", "environmental policy"], interviewCount: 1320 },
  // Creative
  { id: "video-editor", title: "Video Editor", category: "Creative", description: "Edit and produce compelling video content for various platforms", difficulty: "Intermediate", tags: ["premiere pro", "storytelling", "color grading"], interviewCount: 4560 },
  { id: "photographer", title: "Photographer", category: "Creative", description: "Capture and craft professional visual stories through photography", difficulty: "Beginner", tags: ["composition", "lighting", "post-processing"], interviewCount: 3210 },
  // Hospitality
  { id: "hotel-manager", title: "Hotel Manager", category: "Hospitality", description: "Oversee hotel operations, staff, and guest experience", difficulty: "Intermediate", tags: ["operations", "customer service", "revenue management"], interviewCount: 2340 },
  { id: "chef", title: "Executive Chef", category: "Hospitality", description: "Lead kitchen operations and craft exceptional dining experiences", difficulty: "Intermediate", tags: ["culinary arts", "menu planning", "team leadership"], interviewCount: 1980 },
];

export const POPULAR_PROFESSIONS = [...PROFESSIONS]
  .sort((a, b) => b.interviewCount - a.interviewCount)
  .slice(0, 8);
