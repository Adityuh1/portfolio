export interface Project {
  slug: string;
  title: string;
  year: string;
  domain: "ai" | "product" | "devops" | "data";
  featured?: boolean;
  live?: string;
  logo?: string;
  cover?: {
    src: string;
    alt: string;
  };
  summary: string;
  body: string[];
  pointAt: string;
  stack: string[];
  links?: { label: string; href: string }[];
  accolade?: string;
}

export interface Experiment {
  slug: string;
  title: string;
  year: string;
  domain: "ai" | "data" | "product" | "devops";
  private?: boolean;
  lines: string[];
  stack: string[];
  href: string;
}

export interface ExperienceItem {
  slug: string;
  org: string;
  role: string;
  start: string;
  end: string | null;
  kind: "work" | "internship" | "leadership";
  domain: "ai" | "backend" | "fullstack" | "operations";
  tagline: string;
  logo?: string;
  orgUrl?: string;
  summary: string;
  details: string;
  bullets: string[];
  note: string;
  stack: string[];
  href: string;
}

export interface StackCategory {
  label: string;
  domain?: "ai" | "data" | "backend" | "devops";
  items: string[];
}

export const portfolio = {
  identity: {
    name: "Aditya Singh Jadaon",
    firstName: "Aditya",
    handle: "@Adityuh1",
    role: "Developer",
    tagline:
      "I build backends, real-time collaboration tools and the GenAI systems that sit between them, mostly in Python, TypeScript, and cloud pipelines.",
    rotatingWords: ["backends", "GenAI systems", "real-time apps", "CI/CD pipelines"],
    location: "Vadodara, India",
    timezone: "Asia/Kolkata",
    availability: { open: true, label: "Open to work" },
    nameBlock: {
      script: "आदित्य",
      scriptLang: "hi",
      syllables: "a·dit·ya",
      ipa: "/aː.d̪ɪt̪.jɐ/",
      meaning: "the sun, boundless or first",
    },
    avatar: "/aditya.jpg",
    avatarAlt: "Portrait of Aditya Singh Jadaon",
    intro: [
      "I'm a final-year Master of Computer Applications (MCA) student at Maharaja Sayajirao University of Baroda, based in Vadodara.",
      "so far: TechSprint 2026 hackathon winner, four shipped projects spanning Generative AI and real-time collaboration, Senior Training & Placement Coordinator, and client operations experience for US-based accounts.",
    ],
    signOff: "ok, that's me. back to whatever's failing in the terminal.",
  },
  links: {
    email: "adityajadaon010@gmail.com",
    phone: "+91 9510426938",
    github: "https://github.com/Adityuh1",
    linkedin: "https://www.linkedin.com/in/jadaon-aditya1",
    twitter: "https://x.com/heCODES01",
    resume: "https://drive.google.com/file/d/14Yf8Yg8x-sample/view",
  },
  booking: {
    short: { slug: "adityuh1/15min", label: "Quick chat", minutes: 15 },
    long: { slug: "adityuh1/30min", label: "Proper conversation", minutes: 30 },
  },
  work: [
    {
      slug: "tech-debt-auditor",
      title: "Automated Tech-Debt Auditor",
      year: "2026",
      domain: "ai",
      featured: true,
      live: "https://tech-debt-auditor.vercel.app",
      logo: "/logos/jobatlas.svg",
      cover: {
        src: "/screenshots/myjobatlas.png",
        alt: "Tech-Debt Auditor dashboard interface",
      },
      summary:
        "AI-augmented static analysis tool integrating LLMs into backend services to automate detection, scoring, and Jira export of technical debt across the SDLC.",
      body: [
        "when developers push code, they inevitably leave 'technical debt' markers like // TODO, // FIXME, or // HACK. in fast-moving codebases, these markers quietly rot until they turn into runtime regressions or security holes.",
        "so I engineered an automated cloud pipeline. a concurrent Node.js backend crawls repositories recursively with git blame, capturing not just the debt marker but its exact authorship, age, and code context.",
        "that context feeds into a hybrid AI scoring pipeline using Google Gemini 1.5 Flash. the engine categorizes debt into Security, Performance, or Maintenance vulnerabilities, calculates risk scores (1-10), and validates decisions using an LLM-as-a-judge rubric.",
        "on the client: a responsive React dashboard tracking repo health with one-click export into Jira and GitHub Issues. an automated GitHub Actions CI pipeline tests and validates each pull request on ubuntu-latest before integration.",
      ],
      pointAt:
        "the hybrid risk-scoring formula. combining deterministic git blame age with LLM semantic evaluation prevents false alarms from noisy comments while pinpointing high-severity liabilities.",
      stack: [
        "Node.js",
        "React",
        "Google Gemini AI",
        "Docker",
        "GitHub Actions",
        "CI/CD",
        "Git",
        "REST APIs",
      ],
      links: [
        { label: "Source", href: "https://github.com/Adityuh1/TECH-DEBT-auditor" },
        { label: "Live App", href: "https://tech-debt-auditor.vercel.app" },
      ],
    },
    {
      slug: "code-together",
      title: "Code Together",
      year: "2026",
      domain: "product",
      featured: true,
      accolade: "TechSprint 2026 Hackathon Winner",
      logo: "/logos/codemaster.png",
      summary:
        "Real-time collaborative coding platform with live Monaco Editor sync via Socket.io, Gemini AI in-editor pair programming, and granular classroom permissions.",
      body: [
        "built under hackathon constraints and won TechSprint 2026. the goal was creating an effortless coding and teaching environment where mentors, teams, and students can code simultaneously without lag.",
        "architected on the MERN stack with strict MVC separation. the core is an interactive Monaco Editor synchronized in real-time through Socket.io rooms, supporting 1-on-1 pairing, multi-user teams, and virtual classrooms.",
        "integrated Google Gemini AI directly into the editor for contextual debugging, code completions, and automated refactoring explanations without leaving the workspace.",
        "layered with role-based access control so educators can freeze student editors, grant run permissions, and manage AI access dynamically. secured with JWT authentication, bcryptjs password hashing, and Zustand state synchronization.",
      ],
      pointAt:
        "the WebSocket sync throttler. managing high-frequency cursor coordinates and keystrokes while maintaining zero-flicker code syntax highlighting required custom socket delta streaming.",
      stack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "Monaco Editor",
        "Google Gemini AI",
        "JWT",
        "Zustand",
        "TanStack Query",
      ],
      links: [
        { label: "Source", href: "https://github.com/Adityuh1/Code-Together" },
      ],
    },
    {
      slug: "face-filter",
      title: "Face Filter — Smart AI Photo Search",
      year: "2026",
      domain: "ai",
      featured: true,
      logo: "/logos/legaldoc.svg",
      cover: {
        src: "/screenshots/legaldoc.png",
        alt: "Face Filter AI photo discovery platform",
      },
      summary:
        "Local-first AI photo gallery using FaceNet512 embeddings, CLIP text-to-image semantic search, OpenCV blur filtering, and DBSCAN clustering with ChromaDB.",
      body: [
        "commercial photo clouds lock your private moments behind expensive subscription walls and third-party cloud data mining. Face Filter is a private, local-first gallery app that runs entirely on your own machine.",
        "the retrieval pipeline mirrors multimodal RAG. personal photos and natural language queries are encoded into a shared vector space via OpenAI's CLIP (ViT-B/16), stored locally in Chroma vector database, and matched via cosine similarity.",
        "facial recognition is powered by DeepFace generating high-dimensional face embeddings for person identification and emotion scoring. OpenCV blur detection strips out low-quality or out-of-focus snapshots before indexing.",
        "unsupervised DBSCAN clustering groups recurring individuals automatically without manual tagging, and multi-threaded indexing via ThreadPoolExecutor cuts image processing times by 4x.",
      ],
      pointAt:
        "running multimodal embeddings and vector search entirely offline. zero megabytes sent to external APIs, keeping personal photo galleries truly private.",
      stack: [
        "Python",
        "Streamlit",
        "DeepFace",
        "ChromaDB",
        "CLIP (ViT-B/16)",
        "OpenCV",
        "scikit-learn",
        "DBSCAN",
      ],
      links: [
        { label: "Source", href: "https://github.com/Adityuh1/Face-Filter" },
      ],
    },
    {
      slug: "modular-rag",
      title: "Modular RAG Pipeline",
      year: "2025",
      domain: "ai",
      featured: true,
      logo: "/logos/nic-li.jpg",
      summary:
        "Object-oriented modular RAG pipeline in Python delivering source-cited answers from dense PDFs using LangChain, ChromaDB/FAISS, and ChatGroq (Gemma 2).",
      body: [
        "most off-the-shelf RAG tutorials collapse the minute you test them against complex, unstructured PDFs containing tables, headers, and footnotes. I designed this modular architecture to isolate every stage of the pipeline.",
        "written in clean, object-oriented Python. document ingestion, semantic chunking, embedding generation, vector indexing, retrieval filtering, and final generation are completely decoupled interfaces.",
        "vector stores are hot-swappable between ChromaDB and FAISS. retrieval employs maximum marginal relevance (MMR) to balance relevance against diversity, feeding contextual excerpts to ChatGroq running Google's open-weights Gemma 2.",
        "all answers require strict inline page and section citations, returning traceable ground-truth references rather than trusting unverified LLM memory.",
      ],
      pointAt:
        "the decoupled retriever interface. you can swap out the vector store or the model provider with one line in configuration without touching the chunking or evaluation pipeline.",
      stack: [
        "Python",
        "LangChain",
        "ChromaDB",
        "FAISS",
        "Groq",
        "Gemma 2",
        "Vector Embeddings",
        "Prompt Engineering",
      ],
      links: [
        { label: "Source", href: "https://github.com/Adityuh1/Rag-prac" },
      ],
    },
  ] as Project[],
  experiments: [
    {
      slug: "cruisewise-ai",
      title: "CruiseWise AI",
      year: "2026",
      domain: "ai",
      lines: [
        "agentic AI & RAG for autonomous travel booking.",
        "multi-step reasoning over itinerary parameters and live availability.",
      ],
      stack: ["Python", "FastAPI", "Agentic AI", "LangChain"],
      href: "https://github.com/Adityuh1/CruiseWise-ai",
    },
    {
      slug: "devops-commander",
      title: "DevOps Commander",
      year: "2026",
      domain: "devops",
      lines: [
        "automated CLI control for infrastructure and pipeline health.",
        "built to streamline build status verification across remote servers.",
      ],
      stack: ["C#", "Docker", "DevOps", "Linux"],
      href: "https://github.com/Adityuh1/Devops-commander",
    },
    {
      slug: "docker-nginx-ci",
      title: "Docker Nginx CI/CD",
      year: "2026",
      domain: "devops",
      lines: [
        "production reverse proxy configuration and containerized deployments.",
        "automated GitHub Actions runner verifying test suites on every commit.",
      ],
      stack: ["Docker", "Nginx", "GitHub Actions", "CI/CD"],
      href: "https://github.com/Adityuh1/docker-nginx-ci",
    },
    {
      slug: "daily-dsa",
      title: "Daily DSA & NeetCode",
      year: "2026",
      domain: "data",
      lines: [
        "rigorous algorithmic problem solving and pattern mastery in Python.",
        "trees, graphs, dynamic programming, and complexity optimization.",
      ],
      stack: ["Python", "Algorithms", "Data Structures"],
      href: "https://github.com/Adityuh1/neetcode-submissions",
    },
    {
      slug: "contact-manager",
      title: "Contact Manager",
      year: "2025",
      domain: "product",
      lines: [
        "full-stack contact organization exploration built with Next.js and TypeScript.",
        "optimistic UI updates and robust schema validation.",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      href: "https://github.com/Adityuh1/Contact-Manager",
    },
    {
      slug: "aws-amplify-prac",
      title: "AWS Amplify Workshop",
      year: "2025",
      domain: "devops",
      lines: [
        "cloud-native deployment patterns and serverless backend hooks.",
        "exploring AWS hosting and authentication integration.",
      ],
      stack: ["AWS", "Amplify", "Cloud"],
      href: "https://github.com/Adityuh1/AWS-amplify-prac",
    },
  ] as Experiment[],
  experience: [
    {
      slug: "pattens",
      org: "Pattens LLC",
      role: "Operations Executive",
      start: "2025-04",
      end: "2025-09",
      kind: "work",
      domain: "operations",
      tagline: "US Client Operations & Digital Infrastructure",
      logo: "/logos/vivnovation.jpg",
      orgUrl: "https://pattensllc.com",
      summary:
        "Managed communications and complete digital presence for US-based clients, overseeing web platforms and search visibility.",
      details:
        "At Pattens LLC, I held end-to-end responsibility for a key US-based client's digital presence and platform operations. This meant managing multi-platform websites across Shopify and GoDaddy, running continuous technical audits, and optimizing customer communication channels. I spearheaded local SEO and search health strategies, achieving an 84% Google My Business profile score and 80% overall SEO health score within three months. Alongside system maintenance, I trained new team members on operational protocols, supported cross-functional team productivity, and received recognition from both client stakeholders and leadership for reliability and delivery standard.",
      bullets: [
        "Owned end-to-end website development, updates, and maintenance across Shopify and GoDaddy platforms for a US client.",
        "Executed comprehensive SEO audits and Google My Business (GMB) optimization, elevating GMB score to 84% and SEO health to 80% within 90 days.",
        "Coordinated direct client communications, translating operational needs into timely technical fixes and feature updates.",
        "Mentored and trained a junior team member on client workflows, improving turnaround times across ongoing deliverables.",
        "Commended by US client stakeholders and leadership for exceeding deliverables and maintaining zero-downtime execution.",
      ],
      note: "managing a client's live business platform teaches you fast that reliability beats complexity. clean uptime and straightforward communication matter more than clever hacks.",
      stack: ["Shopify", "GoDaddy", "SEO", "Web Management", "Operations", "Client Delivery"],
      href: "/experience/pattens",
    },
    {
      slug: "helimp",
      org: "Helimp Softomation LLP",
      role: "Web Dev Trainee",
      start: "2023-12",
      end: "2024-04",
      kind: "internship",
      domain: "fullstack",
      tagline: "Frontend UI Engineering & API Integration",
      logo: "/logos/xebia-li.jpg",
      orgUrl: "https://helimp.com",
      summary:
        "Intensive training in frontend web technologies, component authoring, dynamic API charting, and team Git workflows.",
      details:
        "During my tenure at Helimp Softomation, I underwent rigorous practical training across modern web technologies including TypeScript, JavaScript, HTML5/CSS3, Angular, and MySQL. I focused on architecting reusable, accessible UI components and adhering to clean code standards. A key accomplishment was engineering a dynamic data visualization module using Chart.js that ingested live REST API endpoints and presented real-time analytics. I also established collaborative Git branching conventions and version control habits in classroom and project settings.",
      bullets: [
        "Underwent intensive hands-on development training across TypeScript, JavaScript, Angular, HTML5/CSS3, and MySQL.",
        "Developed modular, reusable UI components and collaborated with senior engineers to adopt coding best practices.",
        "Engineered an interactive dashboard component using Chart.js to visualize live dynamic data fetched from RESTful APIs.",
        "Practiced Git branching, merge strategies, and team collaboration workflows simulating production engineering cycles.",
      ],
      note: "writing UI components against dynamic APIs made it click that state is everything. if your component doesn't handle loading, error, and empty states cleanly, it isn't finished.",
      stack: ["TypeScript", "JavaScript", "Angular", "Chart.js", "MySQL", "Git", "REST APIs"],
      href: "/experience/helimp",
    },
  ] as ExperienceItem[],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Maharaja Sayajirao University of Baroda",
      location: "Vadodara, Gujarat",
      period: "2025 – 2027 (Expected)",
      details:
        "Focus on Advanced Data Structures, Algorithms, Distributed Computing, Object-Oriented System Design, and Artificial Intelligence.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Maharaja Sayajirao University of Baroda",
      location: "Vadodara, Gujarat",
      period: "2021 – 2024",
      details:
        "Foundations in Software Engineering, Database Management Systems (SQL), Operating Systems, Web Technologies, and Computer Networks.",
    },
  ],
  certifications: [
    {
      title: "Claude Code: Software Engineering with Generative AI Agents",
      issuer: "Vanderbilt University",
      year: "2026",
    },
    {
      title: "Generative AI for Software Developers Specialization",
      issuer: "Microsoft",
      year: "2025",
    },
    {
      title: "Introduction to Software, Programming, and Databases",
      issuer: "IBM",
      year: "2024",
    },
  ],
  stack: [
    {
      label: "Engineering",
      domain: "backend",
      items: [
        "Python",
        "Java",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express",
        "React",
        "Next.js",
        "HTML5 / CSS3",
        "SQL",
        "MongoDB",
        "Git",
      ],
    },
    {
      label: "AI / ML & GenAI",
      domain: "ai",
      items: [
        "LangChain",
        "Google Gemini API",
        "Groq (Gemma 2)",
        "CLIP (ViT-B/16)",
        "DeepFace",
        "ChromaDB",
        "FAISS",
        "Vector Embeddings",
        "RAG Architecture",
        "Prompt Engineering",
        "Semantic Search",
      ],
    },
    {
      label: "Cloud & DevOps",
      domain: "devops",
      items: [
        "AWS",
        "Docker",
        "GitHub Actions",
        "CI/CD Pipelines",
        "Linux CLI",
        "Nginx",
        "Vercel",
        "Bash",
      ],
    },
    {
      label: "Testing & Tooling",
      domain: "data",
      items: [
        "Pytest",
        "Postman",
        "Monaco Editor",
        "Socket.io",
        "OpenCV",
        "TanStack Query",
        "Zustand",
        "Chart.js",
      ],
    },
  ] as StackCategory[],
  about: {
    bio: [
      "I love building systems that people genuinely rely on. My curiosity is centered on how AI models and full-stack architectures behave once they leave the prototype stage and hit real environments.",
      "I'm a pragmatic builder. I value clean engineering and resilient systems over flashy demo gimmicks. I care deeply about the parts that aren't on the front page — API contracts, error boundaries, automated CI checks, and clear documentation.",
      "I learn by doing, testing, breaking, and analyzing: exploring research papers, dissecting open-source repos, and tinkering in the terminal until a problem makes sense.",
      "I thrive in collaborative teams with shared engineering ownership. Winning the TechSprint 2026 hackathon proved to me that high-trust, fast-iterating teams can produce extraordinary software in record time.",
      "right now: exploring challenging software engineering and Generative AI roles where the problems are demanding and the team cares about craftsmanship.",
    ],
  },
  seo: {
    siteUrl: "https://aditya-jadaon.vercel.app",
    title: "Aditya Singh Jadaon",
    titleTemplate: "%s | Aditya Singh Jadaon",
    description:
      "Aditya Singh Jadaon, developer building backends, real-time collaboration apps and applied AI systems in Python and TypeScript.",
    ogImage: "/og.png",
  },
};
