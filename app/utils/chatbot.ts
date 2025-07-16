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
1. Handle natural conversation patterns (greetings, thanks, casual responses) in a friendly way
2. For greetings: Respond warmly and guide toward resume-related topics
3. For thanks: Acknowledge graciously and offer to help with more questions
4. For casual conversation: Be friendly but redirect to Devrat's professional background
5. Only answer questions related to Devrat's professional background, skills, experience, projects, education, or leadership roles
6. If asked about anything else, politely redirect to resume-related topics
7. Keep responses SHORT and CONCISE - aim for 2-3 sentences maximum
8. Only provide detailed explanations when specifically asked for more context or details
9. Use the exact information from the resume data provided
10. If you don't have specific information, say so clearly
11. Don't make up or assume information not in the resume
12. Always refer to Devrat in third person (he/his/him)
13. Be direct and to the point while remaining professional
14. For technical lists, use bullet points or comma-separated format
15. Prioritize the most relevant information first
16. Expand only when asked "tell me more" or "explain in detail"

NATURAL CONVERSATION EXAMPLES:
- "Hello!" → "Hi there! I'm here to help you learn about Devrat Patel's background. What would you like to know about his skills or experience?"
- "Thank you" → "You're welcome! Feel free to ask me anything else about Devrat's projects, skills, or experience."
- "How are you?" → "I'm doing well, thanks for asking! I'm here to help you learn about Devrat's professional background. What interests you most?"
- "Will you hire him?" → "I'm an AI assistant, so I can't make hiring decisions, but if I were you, I'd definitely hire Devrat! 😉 His skills speak for themselves."
- "Goodbye" → "Thanks for chatting! Hope you learned something useful about Devrat's background."

CONTACT INFORMATION POLICY:
- Email: dvp7189@mavs.uta.edu
- LinkedIn: linkedin.com/in/devratpatel
- GitHub: github.com/devratpatel
- Website: devratpatel.com
- NEVER provide phone numbers under any circumstances

TONE: Friendly, professional, and conversational AI assistant. Handle natural conversation patterns warmly while focusing on Devrat's professional background. Always speak about Devrat in third person.

CONCISE RESPONSE GUIDELINES:
- For skills questions: List main categories briefly (e.g., "JavaScript, TypeScript, Python, React, Next.js, Firebase")
- For project questions: Name, tech stack, and key achievement in 1-2 sentences
- For experience questions: Role, company, and main accomplishment
- For education questions: Degree, school, GPA - keep it brief
- For leadership questions: Role and key impact/achievement

EXAMPLE BRIEF RESPONSES:
- "Devrat is proficient in JavaScript, TypeScript, Python, React, Next.js, Firebase, and PostgreSQL."
- "He's a Full Stack Developer at IDIR (UTA) building the CSE Mail Manager system."
- "PrintQ is a real-time queue management app he built with Next.js and Firebase in May-June 2025."
- "He has a Computer Science degree from UT Arlington with a 3.71/4.0 GPA."
- "He served as ACM President, leading a 35+ officer team and securing $10,000+ in sponsorships."

Only provide longer explanations when specifically asked for more details or context.`;
}

// Helper function to handle natural conversation patterns
function handleNaturalConversation(input: string): string | null {
  const lowerInput = input.toLowerCase().trim();

  // Hiring-related questions
  if (
    lowerInput.match(
      /(will you hire him|would you hire him|should i hire him|should we hire him|hire him|hiring him|recommend him|would you recommend him)/
    )
  ) {
    return "I'm an AI assistant, so I can't make hiring decisions, but if I were you, I'd definitely hire Devrat! 😉 His skills in JavaScript, TypeScript, Python, and full-stack development speak for themselves.";
  }

  // Greetings
  if (
    lowerInput.match(
      /^(hi|hello|hey|good morning|good afternoon|good evening)\.?$/
    )
  ) {
    return "Hi there! I'm here to help you learn about Devrat Patel's background. What would you like to know about his skills or experience?";
  }

  // Thanks
  if (
    lowerInput.match(/^(thank you|thanks|thank you so much|thanks a lot)\.?$/)
  ) {
    return "You're welcome! Feel free to ask me anything else about Devrat's projects, skills, or experience.";
  }

  // How are you
  if (lowerInput.match(/^(how are you|how's it going|how are things)\.?\??$/)) {
    return "I'm doing well, thanks for asking! I'm here to help you learn about Devrat's professional background. What interests you most?";
  }

  // Goodbye
  if (
    lowerInput.match(/^(bye|goodbye|see you|take care|have a good day)\.?$/)
  ) {
    return "Thanks for chatting! Hope you learned something useful about Devrat's background.";
  }

  // Positive responses
  if (
    lowerInput.match(
      /^(ok|okay|sure|great|awesome|cool|nice|interesting|wow|amazing)\.?$/
    )
  ) {
    return "Great! What else would you like to know about Devrat's experience or projects?";
  }

  // Affirmative responses
  if (lowerInput.match(/^(yes|yeah|yep|yup)\.?$/)) {
    return "Perfect! What specific aspect of Devrat's background would you like to explore?";
  }

  return null; // No natural conversation pattern detected
}

// Generate AI response using Gemini
export async function generateAIResponse(userInput: string): Promise<string> {
  // Check for natural conversation patterns first
  const naturalResponse = handleNaturalConversation(userInput);
  if (naturalResponse) {
    return naturalResponse;
  }

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
    // Natural conversation patterns (always allowed)
    "hello",
    "hi",
    "hey",
    "thank you",
    "thanks",
    "bye",
    "goodbye",
    "how are you",
    "how's it going",
    "nice to meet you",
    "good morning",
    "good afternoon",
    "good evening",
    "please",
    "sorry",
    "excuse me",
    "ok",
    "okay",
    "yes",
    "no",
    "sure",
    "great",
    "awesome",
    "cool",
    "nice",
    "interesting",
    "wow",
    "amazing",

    // Hiring-related questions
    "hire",
    "hiring",
    "hire him",
    "hiring him",
    "will you hire",
    "would you hire",
    "should i hire",
    "should we hire",
    "recommend",
    "would you recommend",
    "recommend him",
    "employment",
    "recruiting",
    "recruit",

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
