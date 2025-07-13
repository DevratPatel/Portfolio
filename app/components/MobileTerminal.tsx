"use client";

import { useState, useEffect, useRef } from "react";
import { VscTerminalBash, VscChromeClose } from "react-icons/vsc";
import {
  generateAIResponse,
  initializeGemini,
  isResumeRelated,
} from "../utils/chatbot";

interface MobileTerminalProps {
  isVisible: boolean;
  onToggle: () => void;
}

interface TerminalLine {
  id: string;
  type: "command" | "response" | "system" | "error";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  color?: string;
}

function TypewriterText({
  text,
  speed = 10,
  onComplete,
  color = "text-white",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={`${color} whitespace-pre-wrap`}>{displayedText}</span>
  );
}

export default function MobileTerminal({
  isVisible,
  onToggle,
}: MobileTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [typingLineId, setTypingLineId] = useState<string | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal on mount
  useEffect(() => {
    const welcomeLines: TerminalLine[] = [
      {
        id: "welcome-1",
        type: "system",
        content:
          "Hi, I'm Devrat Patel, a Full-Stack Developer. \nWelcome to my interactive 'AI powered' portfolio terminal! \nType 'help' to see available commands.",
        timestamp: new Date(),
      },
    ];
    setLines(welcomeLines);

    // Initialize Gemini API
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey && apiKey !== "your_gemini_api_key_here") {
      const success = initializeGemini(apiKey);
      setIsInitialized(success);
      if (!success) {
        const errorLine: TerminalLine = {
          id: "error-init",
          type: "error",
          content: "AI is not initialized.",
          timestamp: new Date(),
          isTyping: true,
        };
        setLines((prev) => [...prev, errorLine]);
        setTypingLineId(errorLine.id);
      }
    } else {
      const errorLine: TerminalLine = {
        id: "error-no-key",
        type: "error",
        content: "No API key found. Please set NEXT_PUBLIC_GEMINI_API_KEY",
        timestamp: new Date(),
        isTyping: true,
      };
      setLines((prev) => [...prev, errorLine]);
      setTypingLineId(errorLine.id);
    }
  }, []);

  // Auto-scroll to bottom function
  const scrollToBottom = () => {
    if (terminalContainerRef.current) {
      const container = terminalContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (isVisible) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [lines, currentInput, isVisible, isProcessing, typingLineId]);

  // Focus input when visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentInput(newValue);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentInput.trim()) {
        handleCommand(currentInput);
        setCurrentInput("");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex =
          historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(newIndex === -1 ? "" : commandHistory[newIndex]);
      }
    }
  };

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add command to history
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);

    // Add command line to terminal
    const commandLine: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: "command",
      content: command,
      timestamp: new Date(),
    };
    setLines((prev) => [...prev, commandLine]);

    // Scroll to bottom after adding command
    setTimeout(() => scrollToBottom(), 50);

    // Handle built-in commands
    if (command.toLowerCase() === "help") {
      const helpLine: TerminalLine = {
        id: `help-${Date.now()}`,
        type: "system",
        content: `Available commands:
  help     - Show this help message
  clear    - Clear the terminal
  about    - About this portfolio

You can also ask me natural language questions about Devrat's:
  • Skills and technologies
  • Work experience
  • Projects
  • Education
  • Leadership roles

Examples:
  "What programming languages do you know?"
  "Tell me about your experience at IDIR"
  "What projects have you built?"`,
        timestamp: new Date(),
        isTyping: true,
      };
      setLines((prev) => [...prev, helpLine]);
      setTypingLineId(helpLine.id);
      setTimeout(() => scrollToBottom(), 50);
      return;
    }

    if (command.toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    if (command.toLowerCase() === "about") {
      const aboutLine: TerminalLine = {
        id: `about-${Date.now()}`,
        type: "system",
        content:
          "This is Devrat Patel's interactive portfolio terminal. You can ask me questions about his professional background, skills, and experience. The responses are powered by AI to provide detailed and accurate information.",
        timestamp: new Date(),
        isTyping: true,
      };
      setLines((prev) => [...prev, aboutLine]);
      setTypingLineId(aboutLine.id);
      setTimeout(() => scrollToBottom(), 50);
      return;
    }

    // Handle AI queries
    if (!isInitialized) {
      const errorLine: TerminalLine = {
        id: `error-${Date.now()}`,
        type: "error",
        content: "AI is not initialized.",
        timestamp: new Date(),
        isTyping: true,
      };
      setLines((prev) => [...prev, errorLine]);
      setTypingLineId(errorLine.id);
      setTimeout(() => scrollToBottom(), 50);
      return;
    }

    // Check if the query is resume-related
    if (!isResumeRelated(command)) {
      const redirectLine: TerminalLine = {
        id: `redirect-${Date.now()}`,
        type: "response",
        content:
          "I can only answer questions about Devrat's professional background, skills, experience, projects, education, and leadership roles. Please ask something related to his resume!",
        timestamp: new Date(),
        isTyping: true,
      };
      setLines((prev) => [...prev, redirectLine]);
      setTypingLineId(redirectLine.id);
      setTimeout(() => scrollToBottom(), 50);
      return;
    }

    // Process AI command
    setIsProcessing(true);
    try {
      const response = await generateAIResponse(command);
      const responseLine: TerminalLine = {
        id: `response-${Date.now()}`,
        type: "response",
        content: response,
        timestamp: new Date(),
        isTyping: true,
      };
      setLines((prev) => [...prev, responseLine]);
      setTypingLineId(responseLine.id);
      setIsProcessing(false);
      setTimeout(() => scrollToBottom(), 50);
    } catch (error) {
      setIsProcessing(false);
      const errorLine: TerminalLine = {
        id: `error-${Date.now()}`,
        type: "error",
        content: "Failed to process your request. Please try again.",
        timestamp: new Date(),
        isTyping: true,
      };
      setLines((prev) => [...prev, errorLine]);
      setTypingLineId(errorLine.id);
      setTimeout(() => scrollToBottom(), 50);
    }
  };

  const handleTypingComplete = (lineId: string) => {
    setTypingLineId(null);
    setLines((prev) =>
      prev.map((line) =>
        line.id === lineId ? { ...line, isTyping: false } : line
      )
    );
    // Scroll to bottom after typing completes
    setTimeout(() => scrollToBottom(), 100);
  };

  const renderPrompt = () => (
    <span>
      <span className="text-cyan-400">devrat@portfolio:~$ </span>
    </span>
  );

  // Handle terminal click to focus input (opens mobile keyboard)
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col md:hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border-color bg-panel-bg">
        <div className="flex items-center gap-2">
          <VscTerminalBash size={16} className="text-text-primary" />
          <span className="text-sm text-text-primary">Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            className="p-1 hover:bg-border-color rounded"
            title="Close Terminal"
          >
            <VscChromeClose size={14} className="text-text-primary" />
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="text-center py-2 bg-black">
        <h1 className="text-2xl font-bold text-green-400 mb-2">Devrat Patel</h1>
        <p className="text-gray-300 text-sm">Full Stack Developer</p>
        <hr className="my-4 border-border-color" />
      </div>

      {/* Terminal Content - Clickable to open keyboard */}
      <div
        className="flex-1 overflow-auto flex flex-col"
        onClick={handleTerminalClick}
      >
        {/* Terminal Output - Takes remaining space and positions content at bottom */}
        <div
          ref={terminalContainerRef}
          className="flex-1 p-4 font-mono text-sm flex flex-col cursor-text"
        >
          <div className="flex-grow"></div>
          <div className="flex-shrink-0">
            {/* Initial welcome command */}
            <div className="mb-2">
              {renderPrompt()}
              <span className="text-green-400">welcome</span>
            </div>

            {lines.map((line) => (
              <div key={line.id} className="mb-2">
                {line.type === "command" && (
                  <div className="flex items-start">
                    {renderPrompt()}
                    <span className="text-green-400">&nbsp;{line.content}</span>
                  </div>
                )}
                {line.type === "response" && (
                  <div className="my-2">
                    {line.isTyping ? (
                      <TypewriterText
                        text={line.content}
                        speed={10}
                        onComplete={() => handleTypingComplete(line.id)}
                        color="text-white"
                      />
                    ) : (
                      <span className="text-white whitespace-pre-wrap">
                        {line.content}
                      </span>
                    )}
                  </div>
                )}
                {line.type === "system" && (
                  <div className="text-white whitespace-pre-wrap my-2">
                    {line.isTyping ? (
                      <TypewriterText
                        text={line.content}
                        speed={10}
                        onComplete={() => handleTypingComplete(line.id)}
                        color="text-white"
                      />
                    ) : (
                      <span className="text-white whitespace-pre-wrap">
                        {line.content}
                      </span>
                    )}
                  </div>
                )}
                {line.type === "error" && (
                  <div className="text-red-400 whitespace-pre-wrap my-2">
                    {line.isTyping ? (
                      <TypewriterText
                        text={line.content}
                        speed={10}
                        onComplete={() => handleTypingComplete(line.id)}
                        color="text-red-400"
                      />
                    ) : (
                      <span className="text-red-400 whitespace-pre-wrap">
                        {line.content}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white">Processing</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}

            {/* Current Input Line */}
            {!typingLineId && (
              <div className="flex items-start">
                {renderPrompt()}
                <span className="text-green-400">
                  &nbsp;{currentInput}
                  <span
                    className="inline-block w-2 h-3 bg-green-400 animate-blink"
                    style={{ verticalAlign: "baseline" }}
                  ></span>
                </span>
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Hidden Input - Used for mobile keyboard */}
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="absolute -top-10 left-0 w-full h-8 opacity-0 pointer-events-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          inputMode="text"
          style={{ fontSize: "16px" }} // Prevents zoom on iOS
        />
      </div>
    </div>
  );
}
