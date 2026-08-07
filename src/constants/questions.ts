import type { InterviewQuestion } from "@/types";

const q = (
  id: string,
  question: string,
  category: string,
  timeLimit = 120,
  tips?: string
): InterviewQuestion => ({ id, question, category, timeLimit, tips });

export const GENERIC_QUESTIONS: InterviewQuestion[] = [
  q("g1", "Tell me about yourself and what brought you to this field.", "Background", 120, "Keep it professional and concise. Highlight your journey, key achievements, and why you are excited about this role."),
  q("g2", "What are your greatest professional strengths, and how do they help you succeed?", "Self-Assessment", 90, "Choose 2-3 specific strengths backed by concrete examples and measurable results."),
  q("g3", "What is your biggest professional weakness and how are you actively working to improve it?", "Self-Awareness", 90, "Show genuine self-awareness. Pick a real weakness you are improving, not a hidden strength."),
  q("g4", "Describe a challenging situation at work and how you handled it.", "Problem Solving", 120, "Use the STAR method: Situation, Task, Action, Result. Quantify the outcome where possible."),
  q("g5", "Where do you see yourself professionally in 5 years?", "Career Goals", 90, "Show ambition while aligning with the role. Be specific but remain open to the company's growth path."),
  q("g6", "Why do you want to work for this company specifically?", "Motivation", 90, "Demonstrate genuine research about the company. Mention specific aspects that attract you."),
  q("g7", "Describe a time you worked effectively as part of a team under pressure.", "Teamwork", 120, "Focus on your specific contribution and how you enabled the team to succeed."),
  q("g8", "How do you prioritize tasks when you have multiple competing deadlines?", "Time Management", 90, "Describe a real system you use. Mention tools, frameworks, or methods for managing priorities."),
];

export const PROFESSION_QUESTIONS: Record<string, InterviewQuestion[]> = {
  "software-engineer": [
    q("se1", "Explain the difference between object-oriented and functional programming and when you would choose each.", "Technical", 150, "Give concrete examples. Mention real projects where one paradigm served you better."),
    q("se2", "How would you design a URL shortening service? Walk me through your architecture and trade-offs.", "System Design", 180, "Cover scalability, database choice, caching, and the trade-offs of each decision."),
    q("se3", "What is your approach to writing clean, maintainable code? Give examples from your work.", "Best Practices", 120, "Mention naming conventions, SOLID principles, code reviews, and documentation practices."),
    q("se4", "Explain REST vs GraphQL. When would you choose one over the other?", "Technical", 150),
    q("se5", "How do you approach debugging a complex issue in a production system?", "Problem Solving", 120),
    q("se6", "Describe your experience with testing. What types of tests do you prioritize?", "Quality", 120),
    q("se7", "How do you handle concurrency and race conditions in your applications?", "Technical", 150),
    q("se8", "Tell me about a technical decision you made that you later reconsidered. What did you learn?", "Reflection", 120),
  ],
  "frontend-developer": [
    q("fe1", "Explain how the browser renders a webpage. What are critical rendering path optimizations you apply?", "Performance", 150),
    q("fe2", "How do you approach state management in a large React application?", "Architecture", 120),
    q("fe3", "Describe your experience building accessible web interfaces. What WCAG guidelines do you follow?", "Accessibility", 120),
    q("fe4", "How do you optimize a React application that is experiencing performance issues?", "Performance", 150),
    q("fe5", "Walk me through how you would design a reusable component library.", "Architecture", 150),
    q("fe6", "How do you stay current with the rapidly evolving frontend ecosystem?", "Growth", 90),
    q("fe7", "Describe your CSS architecture approach for a large-scale application.", "CSS", 120),
    q("fe8", "Tell me about a complex UI interaction you built and the challenges you faced.", "Experience", 150),
  ],
  "data-scientist": [
    q("ds1", "Explain the bias-variance tradeoff. How does it affect your model selection process?", "ML Theory", 150, "Use a real-world example to illustrate your understanding."),
    q("ds2", "How would you handle a dataset with 40% missing values? Walk through your strategy.", "Data Processing", 120, "Cover multiple imputation strategies and when each is most appropriate."),
    q("ds3", "Describe your approach to feature engineering for a classification problem.", "Feature Engineering", 150),
    q("ds4", "How do you evaluate and communicate model performance to non-technical stakeholders?", "Communication", 120),
    q("ds5", "Walk me through a complete data science project you led from start to delivery.", "Experience", 180),
    q("ds6", "How do you handle class imbalance in classification problems?", "Technical", 120),
    q("ds7", "Explain the difference between parametric and non-parametric models.", "ML Theory", 120),
    q("ds8", "How do you ensure your models remain reliable after deployment?", "MLOps", 120),
  ],
  "product-manager": [
    q("pm1", "How do you prioritize features on your product roadmap when everything feels urgent?", "Prioritization", 150),
    q("pm2", "Describe how you would take a new product feature from idea to launch.", "Product Launch", 180),
    q("pm3", "Tell me about a time you had to kill a feature or change direction. How did you handle it?", "Decision Making", 150),
    q("pm4", "How do you define and measure product success? What metrics matter most to you?", "Metrics", 120),
    q("pm5", "How would you improve the core product if you joined our company tomorrow?", "Product Thinking", 150),
    q("pm6", "Describe how you gather user feedback and turn it into actionable product decisions.", "User Research", 120),
    q("pm7", "How do you build alignment between engineering, design, and business stakeholders?", "Collaboration", 120),
    q("pm8", "Tell me about a product failure and what you learned from it.", "Reflection", 120),
  ],
  "ux-designer": [
    q("ux1", "Walk me through your design process from initial brief to final delivery.", "Process", 150, "Cover discovery, research, ideation, prototyping, testing, and handoff."),
    q("ux2", "How do you advocate for user needs when they conflict with business goals?", "Stakeholder Management", 120),
    q("ux3", "Describe a significant design decision you made based on user research findings.", "Research", 150),
    q("ux4", "How do you approach designing for accessibility from the start?", "Accessibility", 120),
    q("ux5", "Walk me through how you conduct user interviews. What do you look for?", "Research Methods", 120),
    q("ux6", "Describe how you would redesign a feature users consistently find confusing.", "Problem Solving", 150),
    q("ux7", "How do you collaborate with developers to ensure faithful implementation?", "Collaboration", 90),
    q("ux8", "What metrics do you use to measure the success of a design change?", "Metrics", 120),
  ],
  "financial-analyst": [
    q("fa1", "Walk me through building a DCF valuation model for a company.", "Technical", 180),
    q("fa2", "How do you analyze a company's competitive moat and market positioning?", "Analysis", 150),
    q("fa3", "What financial ratios are most important when evaluating a company's health?", "Technical", 120),
    q("fa4", "Walk me through the three financial statements and how they interconnect.", "Technical", 150),
    q("fa5", "How does monetary policy affect equity valuations? Give a recent example.", "Economics", 120),
    q("fa6", "Describe a time you identified a critical financial insight others had missed.", "Experience", 120),
    q("fa7", "How do you model and communicate uncertainty in financial forecasts?", "Risk Management", 120),
    q("fa8", "What is the difference between enterprise value and equity value?", "Concepts", 90),
  ],
  "doctor": [
    q("doc1", "Why did you choose medicine and what continues to motivate you in this career?", "Motivation", 120),
    q("doc2", "How do you approach delivering difficult or terminal news to a patient and family?", "Communication", 150),
    q("doc3", "Describe a diagnostically challenging case and how you managed your clinical reasoning.", "Clinical", 180),
    q("doc4", "How do you stay current with the latest medical evidence and clinical guidelines?", "Learning", 90),
    q("doc5", "Describe a time you disagreed with a colleague about a patient's treatment plan.", "Teamwork", 120),
    q("doc6", "How do you approach shared decision-making with patients who refuse recommended care?", "Patient Care", 120),
    q("doc7", "How do you manage stress and protect yourself from burnout in demanding environments?", "Resilience", 90),
    q("doc8", "Tell me about a clinical mistake you made and what you changed as a result.", "Self-Reflection", 120),
  ],
  "digital-marketer": [
    q("dm1", "Describe a digital marketing campaign you led and the measurable results you drove.", "Experience", 150),
    q("dm2", "How do you build and measure a content strategy that drives business outcomes?", "Strategy", 150),
    q("dm3", "How would you audit and improve our company's current digital presence?", "Strategic Thinking", 150),
    q("dm4", "What is your approach to SEO, and how do you measure its business impact?", "SEO", 120),
    q("dm5", "How do you use data and analytics to make marketing investment decisions?", "Analytics", 120),
    q("dm6", "Describe your paid advertising experience and how you optimize campaign ROI.", "Paid Media", 120),
    q("dm7", "How do you develop a social media strategy that builds community and drives conversions?", "Social Media", 120),
    q("dm8", "How do you attribute revenue to marketing efforts across multiple channels?", "Attribution", 120),
  ],
  "lawyer": [
    q("law1", "Describe your approach to managing a complex litigation matter with multiple stakeholders.", "Litigation", 150),
    q("law2", "How do you stay current with evolving laws and regulations in your practice area?", "Knowledge", 90),
    q("law3", "Describe a negotiation you led and how you achieved a favorable outcome for your client.", "Negotiation", 150),
    q("law4", "How do you manage client expectations when the legal outcome is uncertain?", "Client Management", 120),
    q("law5", "Walk me through how you approach drafting a complex commercial contract.", "Drafting", 150),
    q("law6", "Describe an ethical dilemma you faced in legal practice and how you handled it.", "Ethics", 120),
    q("law7", "How do you balance multiple client matters with competing deadlines?", "Time Management", 90),
    q("law8", "Tell me about a case or matter you are most proud of and why.", "Experience", 120),
  ],
  "consultant": [
    q("con1", "Walk me through how you would structure a problem you have never encountered before.", "Problem Solving", 150),
    q("con2", "Describe a situation where your analysis revealed an insight that changed the client's strategy.", "Analysis", 150),
    q("con3", "How do you build trust and credibility with a skeptical client leadership team?", "Client Management", 120),
    q("con4", "Estimate the market size for a new electric vehicle charging network in Southeast Asia.", "Case", 180),
    q("con5", "How do you manage client relationships when the project is not going as planned?", "Communication", 120),
    q("con6", "Describe a time you had to deliver an unpopular recommendation to a client.", "Influence", 120),
    q("con7", "How do you manage up within an engagement to meet partner and client expectations?", "Management", 90),
    q("con8", "What frameworks do you rely on most in your consulting work and why?", "Frameworks", 120),
  ],
};

export function getQuestionsForProfession(professionId: string): InterviewQuestion[] {
  const specific = PROFESSION_QUESTIONS[professionId] || [];
  if (specific.length >= 8) return specific.slice(0, 8);

  const combined = [...specific];
  for (const gq of GENERIC_QUESTIONS) {
    if (combined.length >= 8) break;
    combined.push(gq);
  }
  return combined.slice(0, 8);
}
