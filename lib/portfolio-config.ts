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
  role: 'AI/ML Engineer | Python & Full-Stack Developer',
  location: 'Vasco Da Gama, Goa, India',
  tagline: 'AI/ML Engineer | Python & Full-Stack Developer',
  summary: [
    'Computer Science engineering graduate with four internships and five end-to-end AI projects. Experienced in Python, machine learning, NLP, LLM integration (LangChain, RAG), and full-stack development with React and FastAPI.',
  ],
  availability: {
    open: false,
    message: 'Availability not specified in the resume.',
  },
  email: 'dweepangainjob@gmail.com',
  phone: '+91 8624899433',
  website: 'https://github.com/Markes10',
  socials: [
    { label: 'GitHub', handle: '@Markes10', url: 'https://github.com/Markes10' },
  ],
  skills: [
    { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'SQL'] },
    { category: 'AI and Machine Learning', items: ['Machine Learning', 'Deep Learning', 'Natural Language Processing (NLP)', 'LangChain', 'Retrieval-Augmented Generation (RAG)', 'Prompt Engineering', 'Agentic AI', 'Hugging Face', 'Ollama', 'Google Gemini API', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'OpenCV', 'Computer Vision', 'MLOps'] },
    { category: 'Data', items: ['Pandas', 'NumPy', 'Exploratory Data Analysis (EDA)', 'Data Cleaning and Preprocessing', 'Feature Engineering', 'Data Visualization'] },
    { category: 'Web Development', items: ['React', 'Next.js', 'FastAPI', 'Node.js', 'Socket.io', 'REST APIs', 'HTML5', 'CSS3', 'Tailwind CSS'] },
    { category: 'Databases and Tools', items: ['MySQL', 'Snowflake', 'ChromaDB', 'DVC', 'Git', 'Docker', 'CI/CD', 'Prometheus', 'Microsoft Azure', 'JWT'] },
  ],
  experience: [
    {
      company: 'Labmentix Pvt. Ltd.',
      role: 'AI/ML Intern',
      period: 'October 2025 - April 2026',
      location: 'Remote',
      highlights: [
        'Trained and evaluated supervised and unsupervised machine learning models on real-world datasets using Python.',
        'Contributed to production-grade ML pipelines and worked with cross-functional teams to integrate models into software systems.',
      ],
      stack: [],
    },
    {
      company: 'Demerg Systems India',
      role: 'Full Stack Intern',
      period: 'July 2025 - September 2025',
      location: 'Remote',
      highlights: [
        'Completed an 8-week full-stack development training using React, FastAPI, and JavaScript.',
        'Followed industry development practices and delivered all assigned tasks on schedule.',
      ],
      stack: [],
    },
    {
      company: 'JYESTA Corporate Entity',
      role: 'Machine Learning Intern',
      period: 'July 2025 - September 2025',
      location: 'Remote',
      highlights: [
        'Completed certified training in data preprocessing, regression, and classification.',
        'Built and evaluated predictive models in Python with Scikit-learn against standard metrics.',
      ],
      stack: [],
    },
    {
      company: 'Tentwenty Digital LLP',
      role: 'Frontend Developer Intern',
      period: 'August 2022 - October 2022',
      location: 'Goa',
      highlights: [
        'Built responsive web interfaces using HTML, CSS, and JavaScript.',
        'Recognized by management for initiative and problem-solving.',
      ],
      stack: [],
    },
  ],
  projects: [
    {
      name: 'AI CRM + PIM Platform',
      slug: 'ai-crm-pim-platform',
      period: '',
      description: 'Built a full-stack CRM and product information management system with customer management, order tracking, and AI-driven sales insights.',
      stack: ['FastAPI', 'React', 'Vite', 'Python', 'NLP', 'AI Agents'],
      highlights: ['Developed the product module with semantic search, an AI onboarding agent, and a chat assistant with optional WooCommerce sync.'],
      repo: 'https://github.com/Markes10/Revenue-Operations-AI-CRM-PIM',
    },
    {
      name: 'AI-Powered Resume Analyzer',
      slug: 'ai-powered-resume-analyzer',
      period: '',
      description: 'Built a web app that scores resumes against job descriptions using NLP keyword extraction and skill-gap analysis.',
      stack: ['FastAPI', 'React', 'TypeScript', 'Scikit-learn', 'NLP', 'JWT'],
      highlights: ['Added JWT authentication, PDF export, a monitoring dashboard, and a CI/CD deployment pipeline.'],
      repo: 'https://github.com/Markes10/AI-POWERED-RESUME-ANALYZER',
    },
    {
      name: 'Medical Report Analyzer',
      slug: 'medical-report-analyzer',
      period: '',
      description: 'Extracted structured data from medical PDFs, scanned images, and DOCX files using OCR and automated parsing.',
      stack: ['Python', 'NLP', 'OCR (Tesseract)', 'FastAPI', 'JWT'],
      highlights: ['Predicted likely conditions with confidence scores and ICD-10 mapping; secured the pipeline with JWT, AES encryption, and audit logging.'],
      repo: 'https://github.com/Markes10/MEDICAL-REPORT-ANAL',
    },
    {
      name: 'AI Council: Multi-Agent Orchestration System',
      slug: 'ai-council-multi-agent-orchestration-system',
      period: '',
      description: 'Built a multi-agent platform where a chief agent splits tasks and delegates them to specialized agents running locally via Ollama and the Hugging Face API.',
      stack: ['Python', 'FastAPI', 'React', 'ChromaDB', 'Ollama', 'RAG'],
      highlights: ['Implemented a task router, workflow engine, response merger, and a RAG pipeline using ChromaDB for embeddings and retrieval.'],
      repo: 'https://github.com/Markes10/AI-PROJECT-COUNCIL',
    },
    {
      name: 'Secure Chat Application',
      slug: 'secure-chat-application',
      period: '',
      description: 'Built a real-time, end-to-end encrypted messaging platform with voice messages and an admin dashboard.',
      stack: ['JavaScript', 'Socket.io', 'JWT', 'AES + RSA', 'Docker'],
      highlights: ['Implemented hybrid AES + RSA encryption with digital signatures and deployed with Docker Compose.'],
      repo: 'https://github.com/Markes10/SECURE-CHAT-APP',
    },
    {
      name: 'Smart Tire Analyzer',
      slug: 'smart-tire-analyzer',
      period: '',
      description: 'Built a deep learning system (CNN + RNN + ANN fusion) in PyTorch that predicts tire condition, wear pattern, tread depth, and remaining life from photos, with automatic model selection.',
      stack: ['PyTorch', 'OpenCV', 'FastAPI', 'Next.js', 'Gemini API', 'Docker'],
      highlights: ['Reached 90.7% condition accuracy and 1.55 mm tread-depth error on a 767-image dataset; built as a proof of concept on a limited single-tire-type dataset.', 'Developed a FastAPI backend, Next.js frontend, 24-step image preprocessing pipeline, Gemini-based reasoning, a user-feedback retraining loop, and Docker deployment.'],
      repo: 'https://github.com/Markes10/smart-tire-analyzer',
    },
  ],
  education: [
    {
      school: 'Agnel Institute of Technology and Design',
      degree: 'Bachelor of Engineering, Computer Science',
      period: '2023 - 2026',
      notes: 'CGPA: [add your CGPA] ongoing',
    },
    {
      school: 'Government Polytechnic, Panaji',
      degree: 'Diploma, Computer Science and Engineering',
      period: '2021 - 2024',
      notes: '76.75%',
    },
    {
      school: 'Kendriya Vidyalaya No. 1, Vasco Da Gama, Goa',
      degree: 'Secondary (Class X), CBSE',
      period: '2017',
      notes: '76.00%',
    },
  ],
  certifications: [],
  interests: [],
  defaultTheme: 'tokyo-night',
}
