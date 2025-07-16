# Devrat Patel - Interactive Portfolio Terminal

A modern, interactive portfolio website that combines a code editor-inspired interface with an AI-powered terminal experience. This project showcases professional background through multiple interactive interfaces.

## 🚀 What This Is

This is a unique portfolio website that offers three distinct ways to explore professional information:

1. **Code Editor Interface** - Navigate through files and folders like a real code editor
2. **Interactive Terminal** - Chat with an AI assistant about skills, experience, and projects
3. **Notepad View** - Traditional document-style resume presentation

## 🛠️ Built With

### Core Technologies

- **Next.js 14** - React framework with App Router for optimal performance
- **TypeScript** - Full type safety and enhanced development experience
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Google Gemini AI** - Powers the intelligent terminal assistant

### Key Features

- **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **Real-time AI Chat** - Natural conversation with context-aware responses
- **Dynamic Terminal** - Modern conversational interface with keyboard detection
- **File System Navigation** - Interactive file explorer with syntax highlighting
- **Mobile-First Terminal** - Optimized touch interactions and keyboard handling

## 📱 How to Use

### Desktop Experience

1. **File Explorer** - Click on files in the left sidebar to view different sections
2. **Code Editor** - View resume content with syntax highlighting
3. **Terminal** - Click the terminal icon to open the AI assistant
4. **Notepad** - Access traditional resume view through the file explorer

### Mobile Experience

1. **Responsive Layout** - Automatically adapts to mobile screens
2. **Touch Terminal** - Tap to open full-screen terminal with native keyboard support
3. **Swipe Navigation** - Intuitive mobile interactions throughout

### Terminal Commands

- `help` - Show available commands
- `clear` - Clear terminal history
- `about` - Learn about the portfolio
- **Natural Language** - Ask questions about experience, skills, projects, education

## 🎨 Design Philosophy

### Code Editor Theme

- **Dark Theme** - Professional coding environment aesthetic
- **File Icons** - Realistic file type representations
- **Syntax Highlighting** - Code-like presentation of content
- **Familiar UI** - Standard code editor layout and interactions

### Terminal Experience

- **Modern Interface** - Clean conversational AI design
- **Typewriter Animation** - Smooth text rendering effects
- **Smart Keyboard Detection** - Automatic scrolling and focus management
- **Context-Aware Responses** - Intelligent answers about professional background

## 🤖 AI Assistant Features

### Conversation Types

- **Professional Inquiries** - Skills, experience, projects, education
- **Natural Greetings** - Friendly hellos, thanks, and goodbyes
- **Hiring Questions** - Playful responses to recruitment inquiries
- **Technical Details** - Specific information about projects and technologies

### Response Style

- **Concise by Default** - Short, precise answers (2-3 sentences)
- **Expandable Details** - Ask for more information when needed
- **Professional Tone** - Maintains focus on career-related topics
- **Personality Touch** - Friendly interactions with appropriate humor

## 📊 Project Structure

```
├── app/
│   ├── components/
│   │   ├── UnifiedTerminal.tsx    # AI-powered terminal interface
│   │   ├── Sidebar.tsx            # File explorer navigation
│   │   ├── CodeEditor.tsx         # Main content display
│   │   ├── PreviewPanel.tsx       # Resume preview
│   │   └── Notepad.tsx           # Traditional resume view
│   ├── data/
│   │   ├── resume.ts             # Professional information
│   │   ├── projects.ts           # Project portfolio
│   │   └── leadership.ts         # Leadership experience
│   ├── utils/
│   │   └── chatbot.ts           # AI assistant logic
│   └── globals.css              # Custom styling
├── public/
│   └── Devrat_Resume.pdf       # Downloadable resume
└── package.json
```

## 🔧 Technical Highlights

### Mobile Optimization

- **Viewport Detection** - Smart keyboard appearance handling
- **Touch Device Support** - Optimized for tablets and phones
- **Responsive Terminal** - Full-screen mobile terminal experience
- **Keyboard Management** - Automatic scrolling and focus handling

### AI Integration

- **Rate Limiting** - Prevents API abuse (15 requests/minute)
- **Natural Language Processing** - Context-aware conversation handling
- **Resume-Focused Responses** - Stays on professional topics
- **Privacy Protection** - Secure handling of personal information

### Performance

- **Next.js App Router** - Optimized routing and rendering
- **TypeScript** - Type safety and development efficiency
- **Tailwind CSS** - Minimal CSS bundle size
- **Component Architecture** - Modular and maintainable code

## 🌟 Unique Features

- **Dual Interface** - Both traditional and interactive portfolio views
- **AI-Powered Chat** - First portfolio with intelligent terminal assistant
- **Mobile-First Terminal** - Optimized touch and keyboard interactions
- **Real-time Responses** - Instant answers to professional inquiries
- **Personality Integration** - Friendly AI that represents professional brand

## 📄 License

This project is open source and available under the MIT License.
