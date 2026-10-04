/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONFIG
 *  This is the only file you need to edit to make this
 *  terminal portfolio your own. Every command, the resume page,
 *  and the SEO metadata are generated from this object.
 * ─────────────────────────────────────────────────────────────
 */

import type { ThemeName } from './themes'

export type Social = { label: string; handle: string; url: string }
export type SkillGroup = { category: string; items: string[] }
export type Experience = {
  company: string
  role: string
  period: string
  location: string
  url?: string
  highlights: string[]
  stack: string[]
}
export type Project = {
  name: string
  slug: string
  period: string
  description: string
  stack: string[]
  highlights?: string[]
  url?: string
  repo?: string
}
export type Education = {
  school: string
  degree: string
  period: string
  notes?: string
}

export type PortfolioConfig = {
  name: string
  username: string
  hostname: string
  role: string
  location: string
  tagline: string
  summary: string[]
  availability: { open: boolean; message: string }
  email: string
  phone?: string
  website: string
  socials: Social[]
  skills: SkillGroup[]
  experience: Experience[]
  projects: Project[]
  education: Education[]
  certifications: string[]
  interests: string[]
  defaultTheme: ThemeName
}

export const portfolio: PortfolioConfig = {
  name: 'Dweepan Gain',
  username: 'dweepan',
  hostname: 'portfolio',
  role: 'AI Engineer | Full-Stack Developer',
  location: 'Vasco Da Gama, Goa, India',
  tagline: 'I build AI-powered products, full-stack systems, and data-driven software experiences.',
  summary: [
    'Computer Science engineer with hands-on experience across full-stack development, machine learning, and data-driven AI systems. Skilled in LLM integration, agentic AI, prompt engineering, and NLP-powered applications, with experience in SQL-based analysis, data visualization, and exploratory data analysis.',
    'I have built end-to-end web applications, predictive models, and automation workflows using React, FastAPI, Python, and LangChain, backed by four internships and nine self-driven projects.',
  ],
  availability: {
    open: true,
    message: 'Open to AI/ML, Full-Stack, and software engineering opportunities.',
  },
  email: 'dweepangainjob@gmail.com',
  phone: '+91 8624899433',
  website: 'https://github.com/dweepangainjob-oss',
  socials: [
    { label: 'GitHub', handle: '@dweepangainjob-oss', url: 'https://github.com/dweepangainjob-oss' },
    { label: 'LinkedIn', handle: 'linkedin.com/in/dweepan-gain-591025441', url: 'https://www.linkedin.com/in/dweepan-gain-591025441' },
  ],
  skills: [
    { category: 'Programming Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'PHP', 'R', 'Rust', 'Kotlin'] },
    { category: 'AI / LLM', items: ['LangChain', 'Prompt Engineering', 'Agentic AI', 'LLM Integration', 'Hugging Face', 'Natural Language Processing (NLP)'] },
    { category: 'Machine Learning', items: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Deep Learning (RNN, LSTM, CNN, Transformers)', 'Classification', 'Regression', 'Clustering', 'Recommendation Systems'] },
    { category: 'Data and Analytics', items: ['SQL', 'Exploratory Data Analysis', 'Data Cleaning and Preprocessing', 'Feature Engineering', 'Data Visualization', 'NumPy', 'Pandas', 'OpenCV'] },
    { category: 'Web Development', items: ['React', 'FastAPI', 'Node.js', 'Socket.io', 'Laravel', 'Streamlit', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Vite', 'REST APIs'] },
    { category: 'Databases, Cloud and DevOps', items: ['MySQL', 'Snowflake', 'Git', 'Docker', 'CI/CD', 'Microsoft Azure', 'Firebase', 'Prometheus', 'JWT', 'bcrypt'] },
    { category: 'Systems / Compilers', items: ['Rust', 'Go', 'Haskell', 'Assembly', 'LLVM IR', 'MLIR', 'ANTLR', 'C', 'C++', 'CUDA'] },
    { category: 'Formal Methods / Verification', items: ['Coq', 'Lean', 'F*', 'Dafny', 'TLA+', 'GAP'] },
    { category: 'Logic / Symbolic / Query Languages', items: ['Prolog', 'Lisp', 'Cypher', 'XQuery', 'Wolfram Language'] },
    { category: 'Hardware / Graphics / CAD', items: ['Verilog', 'SystemVerilog', 'GLSL', 'OpenSCAD'] },
    { category: 'Scientific / Data', items: ['Julia', 'Cython', 'WDL'] },
    { category: 'Enterprise / Platform-Specific', items: ['ABAP', 'AL', 'Apex (Salesforce)', 'ASP.NET'] },
    { category: 'Security / Specialized', items: ['YARA', 'OPA (Rego)', 'CodeQL', 'CIRCOM (zero-knowledge circuits)', 'Q# (quantum computing)'] },
  ],
  experience: [
    {
      company: 'Labmentix Pvt. Ltd.',
      role: 'AI/ML Intern',
      period: 'October 2025 - April 2026',
      location: 'Remote',
      highlights: [
        'Worked on AI/ML research and development projects covering model training, evaluation, and deployment.',
        'Applied supervised and unsupervised learning techniques to real-world datasets and contributed to production-grade AI pipelines.',
        'Collaborated with cross-functional teams to integrate ML models into scalable software systems.',
      ],
      stack: ['Python', 'Machine Learning', 'AI Systems', 'ML Pipelines'],
    },
    {
      company: 'Demerg Systems India',
      role: 'Full Stack Developer',
      period: 'July 2025 - September 2025',
      location: 'Remote',
      highlights: [
        'Completed an 8-week in-plant training in full-stack development focused on professional software standards.',
        'Followed industry-standard development practices and delivered all assigned tasks on schedule.',
      ],
      stack: ['React', 'FastAPI', 'JavaScript', 'Full-Stack Development'],
    },
    {
      company: 'JYESTA Corporate Entity',
      role: 'Machine Learning Intern',
      period: 'July 2025 - September 2025',
      location: 'Remote',
      highlights: [
        'Completed certified training in supervised and unsupervised learning, data preprocessing, regression, and classification.',
        'Applied machine learning algorithms in Python to real-world datasets, building and evaluating predictive models against standard metrics.',
      ],
      stack: ['Python', 'Scikit-learn', 'ML', 'Data Science'],
    },
    {
      company: 'Tentwenty Digital LLP',
      role: 'Frontend Developer Intern',
      period: 'August 2022 - October 2022',
      location: 'Goa',
      highlights: [
        'Built responsive web interfaces using HTML, CSS, and JavaScript in a professional development environment.',
        'Recognized by management for initiative and creative problem-solving in frontend development.',
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Frontend'],
    },
  ],
  projects: [
    {
      name: 'AI CRM + PIM Platform',
      slug: 'ai-crm-pim-platform',
      period: '2025 - 2026',
      description: 'A full-stack CRM and PIM system with customer management, order tracking, and AI-driven insights for sales decisions.',
      stack: ['FastAPI', 'React', 'Vite', 'Python', 'NLP', 'AI Agents', 'WooCommerce'],
      highlights: ['Built a full-stack CRM and PIM system with customer management, order tracking, and AI-driven insights for sales decisions.', 'Built the PIM module (product creation and update, semantic search) and an AI onboarding agent, plus a chat assistant with optional WooCommerce sync.'],
      repo: 'https://github.com/Markes10/Revenue-Operations-AI-CRM-PIM',
    },
    {
      name: 'AI-Powered Resume Analyzer',
      slug: 'ai-powered-resume-analyzer',
      period: 'July 2025 - September 2025',
      description: 'A full-stack web app that scores resumes against job descriptions using NLP-based keyword extraction and skill-gap analysis.',
      stack: ['FastAPI', 'React', 'TypeScript', 'Python', 'Scikit-learn', 'NLP', 'JWT'],
      highlights: ['Built a full-stack web app that scores resumes against job descriptions using NLP-based keyword extraction and skill-gap analysis.', 'Added JWT authentication, PDF export, a monitoring dashboard, and a CI/CD pipeline for deployment.'],
      repo: 'https://github.com/Markes10/AI-POWERED-RESUME-ANALYZER',
    },
    {
      name: 'Fraud Detection System',
      slug: 'fraud-detection-system',
      period: 'April 2025 - June 2025',
      description: 'A transaction fraud detection project exploring rule-based, anomaly-detection, and machine learning methods.',
      stack: ['Python', 'Machine Learning', 'Deep Learning (CNN, RNN, Transformers)'],
      highlights: ['Researched and implemented rule-based, anomaly-detection, and supervised/unsupervised ML approaches to transaction fraud detection.', 'Explored explainable AI (XAI) for model transparency and analyzed common attack vectors including phishing, malware, and domain spoofing.'],
    },
    {
      name: 'AI Email Assistant',
      slug: 'ai-email-assistant',
      period: 'January 2025 - March 2025',
      description: 'An AI-powered email assistant that drafts, analyzes, and manages professional email using LLM-based NLP.',
      stack: ['Python', 'FastAPI', 'React', 'LangChain', 'NLP'],
      highlights: ['Built an AI-powered email assistant that drafts, analyzes, and manages professional email using LLM-based NLP.', 'Implemented context-aware response generation and tone adjustment to match professional communication standards.'],
      repo: 'https://github.com/Markes10/AI-EMAIL-ASSISTANT',
    },
    {
      name: 'Medical Report Analyzer',
      slug: 'medical-report-analyzer',
      period: 'January 2025 - March 2025',
      description: 'A medical document analysis system that extracts structured data from PDFs, scans, and DOCX files.',
      stack: ['Python', 'Machine Learning', 'NLP', 'OCR (Tesseract)', 'FastAPI', 'JWT'],
      highlights: ['Built a system that extracts structured data from medical PDFs, scanned images, and DOCX files via OCR and automated parsing.', 'Predicted likely conditions with confidence scores and ICD-10 mapping; secured the pipeline with JWT authentication, AES encryption, and audit logging.'],
      repo: 'https://github.com/Markes10/MEDICAL-REPORT-ANAL',
    },
    {
      name: 'Secure Chat Application',
      slug: 'secure-chat-application',
      period: 'January 2025 - March 2025',
      description: 'A real-time, end-to-end encrypted messaging platform with voice messaging and cloud storage.',
      stack: ['JavaScript', 'Socket.io', 'JWT', 'AES + RSA', 'Docker'],
      highlights: ['Built a real-time, end-to-end encrypted messaging platform with voice messaging and cloud storage.', 'Implemented hybrid AES + RSA encryption with digital signatures and an admin dashboard; deployed via Docker Compose.'],
      repo: 'https://github.com/Markes10/SECURE-CHAT-APP',
    },
    {
      name: 'Social Media Monitoring Tool',
      slug: 'social-media-monitoring-tool',
      period: 'October 2024 - December 2024',
      description: 'A social media analysis pipeline for sentiment analysis and brand-insight dashboards.',
      stack: ['Python', 'NLP', 'Data Visualization', 'APIs'],
      highlights: ['Built a pipeline to scrape social media content, run sentiment analysis, and surface brand-insight dashboards.', 'Automated keyword-tracking reports and engagement-metric visualizations.'],
      repo: 'https://github.com/Markes10/Social-media-monitoring-smm-tool',
    },
    {
      name: 'Smart Tire Analyzer',
      slug: 'smart-tire-analyzer',
      period: '2024',
      description: 'An image-based tool to classify tire condition, developed as an early-stage proof of concept.',
      stack: ['Python', 'Computer Vision (OpenCV)'],
      highlights: ['Built an image-based tool to classify tire condition, using a limited single-category dataset as an early-stage proof of concept.'],
      repo: 'https://github.com/Markes10/smart-tire-analyzer',
    },
    {
      name: 'AI Council - Multi-Agent Orchestration System',
      slug: 'ai-council-multi-agent-orchestration-system',
      period: '2025',
      description: 'A full-stack multi-agent AI orchestration platform with specialist agents and a retrieval-augmented generation pipeline.',
      stack: ['Python', 'FastAPI', 'React', 'Streamlit', 'ChromaDB', 'Ollama', 'RAG'],
      highlights: ['Built a full-stack multi-agent AI orchestration platform where a chief agent decomposes tasks and delegates to specialized agents (coding, reasoning, design, vision, security, OCR, speech, image generation, database) running locally via Ollama and the Hugging Face Inference API.', 'Implemented a router, task manager, workflow engine, and response merger (consensus, weighted, best-of, synthesize strategies), plus a RAG pipeline with ChromaDB for embeddings and retrieval.'],
      repo: 'https://github.com/Markes10/AI-PROJECT-COUNCIL',
    },
  ],
  education: [
    {
      school: 'Agnel Institute of Technology and Design',
      degree: 'Bachelor of Engineering, Computer Science',
      period: '2023 - 2026',
      notes: 'Computer Science engineering degree.',
    },
    {
      school: 'Government Polytechnic, Panaji',
      degree: 'Diploma, Computer Science and Engineering',
      period: '2021 - 2024',
      notes: 'Result: 67.75%',
    },
    {
      school: 'Kendriya Vidyalaya No. 1, Vasco Da Gama, Goa',
      degree: 'Secondary (Class X), CBSE',
      period: '2017',
      notes: 'Result: 76.00%',
    },
  ],
  certifications: [],
  interests: ['AI/ML research', 'Full-stack engineering', 'NLP systems', 'Automation', 'Problem solving'],
  defaultTheme: 'tokyo-night',
}
