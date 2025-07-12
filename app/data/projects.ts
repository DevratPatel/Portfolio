export interface Project {
  name: string;
  description: string;
  technologies: string[];
  period: string;
  achievements: string[];
  link?: string;
  githubUrl?: string;
  status: "completed" | "in-progress" | "planned";
}

export const projects: Project[] = [
  {
    name: "PrintQ",
    description:
      "Built a real-time queue management app for UTA Libraries' Print & Design Studios, replacing manual processes.",
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "TypeScript"],
    period: "May 2025 – June 2025",
    achievements: [
      "Built a real-time queue management app for UTA Libraries' Print & Design Studios, replacing manual processes",
      "Conducted user research at 6 UTA Libraries and other locations to study efficient queue workflows and system design",
      "Implemented real-time CRUD operations using Firebase Firestore and role-based auth with secure access rules",
      "Designed a responsive UI with glassmorphism, Framer Motion animations, and toast-based user feedback",
      "Integrated admin dashboards with live metrics, historical data export (CSV/PDF), and staff performance tracking",
      "Improved customer experience with real-time queue status, estimated wait times, and dynamic TV display system",
    ],
    link: "https://github.com/DevratPatel/PrintQ",
    status: "completed",
  },
  {
    name: "Arlington Organic Market",
    description:
      "Developed a full-stack inventory and vendor management system for local markets using Flask and PostgreSQL.",
    technologies: ["Flask", "PostgreSQL", "HTML/CSS", "JavaScript"],
    period: "Jan. 2025 – May 2025",
    achievements: [
      "Developed a full-stack inventory and vendor management system for local markets using Flask and PostgreSQL",
      "Designed a normalized relational schema to ensure data integrity and optimize complex join queries",
      "Implemented CRUD operations via dynamic forms for vendors, products, and store inventory updates",
      "Implemented search and filter functionality, along with custom SQL views for reporting and insights",
    ],
    link: "https://github.com/DevratPatel/Arlington-Organic-Market-Inventory-Management-System",
    status: "completed",
  },
  {
    name: "mavgrades.com",
    description:
      "Designed the complete UI/UX in Figma and translated it into a responsive, accessible front-end with Tailwind CSS.",
    technologies: [
      "Figma",
      "TypeScript",
      "Next.js",
      "Chart.js",
      "Tailwind CSS",
    ],
    period: "Sept. 2024 – Present",
    achievements: [
      "Designed the complete UI/UX in Figma and translated it into a responsive, accessible front-end with Tailwind CSS",
      "Built an interactive grade distribution platform used by 15,000+ UTA students to evaluate course performance",
      "Integrated real-time GPA breakdowns using Chart.js with smooth filtering, transitions, and dynamic routes",
      "Collaborated with dev teams on GitHub using PR reviews, conflict resolution, and version-controlled deployments",
      "Boosted engagement and retention through performance optimization and accessibility-first design principles",
    ],
    link: "https://mavgrades.com",
    status: "in-progress",
  },
  {
    name: "Portfolio Website",
    description:
      "A comprehensive portfolio website showcasing development skills and projects with an interactive AI-powered terminal interface.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Icons",
      "Gemini AI",
    ],
    period: "2024 – Present",
    achievements: [
      "Created an interactive file explorer with syntax highlighting and responsive design",
      "Implemented AI-powered terminal interface for natural language queries about professional background",
      "Built with modern web technologies focusing on performance and user experience",
      "Designed with accessibility-first principles and mobile responsiveness",
    ],
    githubUrl: "https://devratpatel.com",
    status: "completed",
  },
];
