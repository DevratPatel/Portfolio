import { GoogleGenerativeAI } from "@google/generative-ai";
import { resume } from "../data/resume";
import { projects } from "../data/projects";
import { leadership } from "../data/leadership";

// Rate limiting for API calls
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests = 15;
  private readonly windowMs = 60000; // 1 minute

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);
    return this.requests.length < this.maxRequests;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }
}

const rateLimiter = new RateLimiter();

// Initialize Gemini AI
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

export function initializeGemini(apiKey: string) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    return true;
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
    return false;
  }
}

// Create context-aware prompt
function createSystemPrompt(): string {
  const resumeData = JSON.stringify(
    {
      name: resume.name,
      role: resume.role,
      email: resume.email,
      linkedin: resume.linkedin,
      github: resume.github,
      website: resume.website,
      summary: resume.summary,
      education: resume.education,
      experience: resume.experience,
      skills: resume.skills,
      projects: projects,
      leadership: leadership,
    },
    null,
    2
  );

  return `You are an AI assistant for Devrat Patel's portfolio terminal. You can ONLY answer questions about Devrat's resume, skills, experience, projects, and professional background.

RESUME DATA:
${resumeData}

CRITICAL PRIVACY RULE:
- NEVER share, mention, or provide any phone number information
- If asked about contact information, only provide email, LinkedIn, GitHub, or website
- Never reference phone numbers even if they exist in any data

RESPONSE RULES:
1. Only answer questions related to Devrat's professional background, skills, experience, projects, education, or leadership roles
2. If asked about anything else, politely redirect to resume-related topics
3. Keep responses concise, informative, and professional
4. Use the exact information from the resume data provided
5. If you don't have specific information, say so clearly
6. Don't make up or assume information not in the resume
7. Always refer to Devrat in third person (he/his/him)
8. Be helpful and informative about Devrat's professional background
9. When discussing projects, include specific achievements and technologies used
10. When discussing experience, highlight key accomplishments and impact
11. When discussing skills, organize them by category (languages, frameworks, tools)
12. Provide context about his education including GPA and relevant coursework when applicable

CONTACT INFORMATION POLICY:
- Email: dvp7189@mavs.uta.edu
- LinkedIn: linkedin.com/in/devratpatel
- GitHub: github.com/devratpatel
- Website: devratpatel.com
- NEVER provide phone numbers under any circumstances

TONE: Professional AI assistant providing comprehensive information about Devrat Patel. Always speak about Devrat in third person, not as if you are Devrat himself.

DETAILED RESPONSE GUIDELINES:
- For skills questions: Organize by programming languages, frameworks, and tools/technologies
- For project questions: Include technologies used, time periods, achievements, and impact
- For experience questions: Highlight specific accomplishments and contributions
- For education questions: Include GPA (3.71/4.0), coursework, and institution details
- For leadership questions: Focus on achievements, team size, and impact

EXAMPLE RESPONSES:
- "Devrat is proficient in multiple programming languages including JavaScript, TypeScript, Python, Swift, Ruby, Golang, SQL, C, Java, C++, and C#..."
- "He worked as a Full Stack Developer at the Innovative Data Intelligence Research Lab (IDIR) at UTA from June 2025 to Present, where he built the CSE Mail Manager system..."
- "His projects include PrintQ (May 2025 – June 2025), a real-time queue management app built with Next.js, Firebase, and TypeScript..."
- "Devrat's educational background includes a Bachelor's in Computer Science from The University of Texas at Arlington with a 3.71/4.0 GPA..."
- "He has extensive leadership experience, including serving as President of the Association for Computing Machinery (ACM) where he oversaw a 35+ officer team..."`;
}

// Generate AI response using Gemini
export async function generateAIResponse(userInput: string): Promise<string> {
  // Check rate limiting
  if (!rateLimiter.canMakeRequest()) {
    return "I'm receiving too many requests right now. Please try again in a minute.";
  }

  // Check if Gemini is initialized
  if (!model) {
    return "AI assistant is not initialized. Please check your API key configuration.";
  }

  try {
    rateLimiter.recordRequest();

    const systemPrompt = createSystemPrompt();
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userInput}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return (
      text ||
      "I'm having trouble generating a response right now. Please try again."
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm having trouble connecting to the AI service right now. Please try again in a moment.";
  }
}

// Helper function to check if input is resume-related
export function isResumeRelated(input: string): boolean {
  const resumeKeywords = [
    // Basic resume topics
    "skill",
    "skills",
    "experience",
    "project",
    "projects",
    "education",
    "work",
    "job",
    "career",
    "programming",
    "development",
    "developer",
    "university",
    "degree",
    "leadership",
    "organization",
    "technology",
    "technologies",
    "built",
    "created",
    "developed",
    "studied",
    "studies",

    // Technical skills
    "javascript",
    "typescript",
    "python",
    "swift",
    "ruby",
    "golang",
    "sql",
    "java",
    "html",
    "css",
    "react",
    "next.js",
    "node.js",
    "flask",
    "tailwind",
    "angular",
    "bootstrap",
    "firebase",
    "postgresql",
    "mysql",
    "git",
    "github",
    "figma",
    "unity",
    "vercel",
    "postman",

    // Specific references
    "acm",
    "president",
    "officer",
    "printq",
    "mavgrades",
    "arlington",
    "organic",
    "market",
    "devrat",
    "patel",
    "uta",
    "texas",
    "arlington",
    "idir",
    "mobi",
    "csec",
    "cybersecurity",

    // Pronouns and natural language
    "he",
    "his",
    "him",
    "what does",
    "tell me about",
    "what is",
    "who is",
    "what are",
    "how does",
    "where did",
    "when did",
    "why did",
    "can you",
    "could you",

    // Professional terms
    "engineer",
    "student",
    "full-stack",
    "fullstack",
    "backend",
    "frontend",
    "web",
    "mobile",
    "software",
    "computer science",
    "cs",
    "app",
    "application",
    "website",
    "system",
    "platform",

    // Common question patterns
    "background",
    "about",
    "do",
    "does",
    "working",
    "major",
    "field",
    "area",
    "expertise",
    "specialization",
    "focus",
    "accomplishment",
    "accomplishments",
    "achievement",
    "achievements",
    "responsible",
    "responsibilities",
    "role",
    "roles",
    "position",
    "positions",

    // Company/organization names
    "innovative data intelligence",
    "research lab",
    "libraries",
    "print",
    "design",
    "studios",
    "queue",
    "management",
    "inventory",
    "vendor",
    "grade",
    "distribution",
    "gpa",

    // Project-related terms
    "tool",
    "tools",
    "database",
    "schema",
    "crud",
    "api",
    "ui",
    "ux",
    "responsive",
    "dashboard",
    "real-time",
    "firestore",
    "animation",
    "glassmorphism",
    "framer motion",
    "chart.js",

    // Education-related
    "coursework",
    "theoretical",
    "concepts",
    "data structures",
    "algorithms",
    "object oriented",
    "assembly",
    "file structures",
    "discrete structures",
    "bachelor",
    "degree",
    "gpa",

    // Leadership and achievements
    "team",
    "officer",
    "officers",
    "events",
    "sponsorship",
    "sponsorships",
    "member",
    "members",
    "committee",
    "director",
    "advisor",
    "senior",
    "engagement",
    "incubators",
    "workshops",

    // Contact and social
    "contact",
    "email",
    "linkedin",
    "github",
    "website",
    "portfolio",
    "reach",
    "connect",
  ];

  const lowerInput = input.toLowerCase();
  return resumeKeywords.some((keyword) => lowerInput.includes(keyword));
}
