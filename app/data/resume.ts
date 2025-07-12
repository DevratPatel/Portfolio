export interface ResumeData {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa: string;
    coursework: string[];
  }[];
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
  }[];
  skills: {
    languages: string[];
    frameworks: string[];
    techTools: string[];
  };
  projects: {
    name: string;
    description: string;
    technologies: string[];
    period: string;
    achievements: string[];
    link?: string;
  }[];
  leadership: {
    organization: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
  }[];
}

export const resume: ResumeData = {
  name: "Devrat Patel",
  role: "Full-Stack Developer",
  email: "dvp7189@mavs.uta.edu",
  linkedin: "linkedin.com/in/devratpatel",
  github: "github.com/devratpatel",
  website: "devratpatel.com",
  summary:
    "Computer Science student at The University of Texas at Arlington with extensive hands-on experience in full-stack development, database systems, and modern web technologies. Passionate about creating efficient, scalable, and user-friendly web applications with strong leadership experience in tech organizations.",
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "The University of Texas at Arlington",
      year: "Aug. 2023 – May 2027",
      gpa: "3.71/4.0",
      coursework: [
        "Theoretical Concepts of CSE",
        "Data Structures and Algorithms",
        "Object Oriented Programming",
        "Assembly Language Programming",
        "Database Systems and File Structures",
        "Discrete Structures",
      ],
    },
  ],
  experience: [
    {
      title: "Full Stack Developer",
      company:
        "Innovative Data Intelligence Research Lab (IDIR) - The University of Texas at Arlington",
      period: "June 2025 – Present",
      description:
        "Built CSE Mail Manager system that streamlined package tracking for the CSE Department, cutting processing time and improving accuracy.",
      achievements: [
        "Built CSE Mail Manager system that streamlined package tracking for the CSE Department, cutting processing time",
        "Replaced Excel workflows with a web app and ID card scanning, improving accuracy and reducing errors",
        "Implemented smart autocomplete, real-time Firestore CRUD, & dynamic filtering to enhance UX & speed up data retrieval",
        "Added bulk pickup, audit trails, and delivery logs to boost transparency and reduce package loss",
        "Built a responsive admin interface with Next.js, TypeScript, and Tailwind, improving UX and reducing load times",
      ],
    },
  ],
  skills: {
    languages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Swift",
      "Ruby",
      "Golang",
      "SQL",
      "C",
      "Java",
      "C++",
      "C#",
      "HTML/CSS",
    ],
    frameworks: [
      "Flask",
      "React.js",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "AngularJS",
      "Bootstrap",
    ],
    techTools: [
      "Figma",
      "Git",
      "GitHub",
      "MySQL",
      "pgAdmin",
      "PostgreSQL",
      "psycopg2",
      "chart.js",
      "VS Code",
      "Regex",
      "Unix",
      "Postman",
      "PyCharm",
      "Unity",
      "Vercel",
      "Adobe Creative Suite",
      "macOS",
      "iOS",
    ],
  },
  projects: [
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
    },
  ],
  leadership: [
    {
      organization: "Association for Computing Machinery (ACM)",
      role: "President, Advisor, Committee Director, Officer, Member",
      period: "Oct 2023 – Present",
      description:
        "Oversaw a 35+ officer team executing 50+ events and led initiatives such as mavgrades.com and ACM Create.",
      achievements: [
        "Oversaw a 35+ officer team executing 50+ events and led initiatives such as mavgrades.com and ACM Create",
        "Secured $15,000+ in sponsorships and enhanced member engagement through semester-long project incubators",
      ],
    },
    {
      organization: "MOBI",
      role: "Senior Developer, Officer, Member",
      period: "Nov. 2023 – May 2025",
      description:
        "Contributed to mobile development projects and mentored junior developers in iOS and Android development.",
      achievements: [
        "Contributed to mobile development projects and mentored junior developers",
      ],
    },
    {
      organization: "Cybersecurity Club (CSEC)",
      role: "Officer, Member",
      period: "Oct 2023 – Aug 2024",
      description:
        "Organized cybersecurity workshops and competitions for students interested in information security.",
      achievements: [
        "Organized cybersecurity workshops and competitions for students interested in information security",
      ],
    },
  ],
};
