"use client";

import { useState, useEffect, useRef } from "react";
import { VscTerminalBash, VscChromeClose } from "react-icons/vsc";
import {
  generateAIResponse,
  initializeGemini,
  isResumeRelated,
} from "../utils/chatbot";

interface UnifiedTerminalProps {
  isVisible: boolean;
  onToggle: () => void;
  height: number;
  onHeightChange: (height: number) => void;
  inputFocus: "terminal" | "notepad" | null;
  onInputFocusChange: (focus: "terminal" | "notepad" | null) => void;
  isMobile?: boolean;
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

export default function UnifiedTerminal({
  isVisible,
  onToggle,
  height,
  onHeightChange,
  inputFocus,
  onInputFocusChange,
  isMobile = false,
}: UnifiedTerminalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [typingLineId, setTypingLineId] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isInputActive, setIsInputActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal on mount
  useEffect(() => {
    // Detect touch devices (including tablets)
    const detectTouchDevice = () => {
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(hasTouch);
    };

    detectTouchDevice();

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

    // Auto-activate input on mount
    setIsInputActive(true);

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
        content:
          "No API key found. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file.",
        timestamp: new Date(),
        isTyping: true,
      };
      setLines((prev) => [...prev, errorLine]);
      setTypingLineId(errorLine.id);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lines, currentInput, isProcessing]);

  // Handle mobile keyboard appearance
  useEffect(() => {
    if (!isTouchDevice) return;

    const handleResize = () => {
      const viewportHeight =
        window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      const keyboardHeight = windowHeight - viewportHeight;

      // Keyboard is considered open if viewport height is significantly smaller
      const keyboardOpen = keyboardHeight > 150; // 150px threshold

      // Only update if state actually changed
      if (keyboardOpen !== isKeyboardOpen) {
        setIsKeyboardOpen(keyboardOpen);

        if (keyboardOpen && terminalEndRef.current) {
          // More aggressive scrolling to ensure chat stays above keyboard
          setTimeout(() => {
            // Scroll to show the current input area above the keyboard
            terminalEndRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest",
            });

            // Additional scroll to compensate for keyboard height
            if (terminalRef.current) {
              const additionalScroll = keyboardHeight * 0.8; // 80% of keyboard height
              terminalRef.current.scrollTop += additionalScroll;
            }
          }, 150);
        }
      }
    };

    // Initial check
    handleResize();

    // Use visualViewport if available (better for keyboard detection)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [isTouchDevice, isKeyboardOpen]);

  // Auto-activate input when terminal becomes visible
  useEffect(() => {
    if (isVisible && !typingLineId) {
      setIsInputActive(true);
      onInputFocusChange("terminal");

      // For touch devices, focus the hidden input
      if (isTouchDevice && hiddenInputRef.current) {
        setTimeout(() => {
          hiddenInputRef.current?.focus();
        }, 100);
      }
    }
  }, [isVisible, typingLineId, isTouchDevice, onInputFocusChange]);

  // Focus management for touch devices
  useEffect(() => {
    if (
      isVisible &&
      inputFocus === "terminal" &&
      isInputActive &&
      isTouchDevice &&
      hiddenInputRef.current
    ) {
      hiddenInputRef.current.focus();
    }
  }, [isVisible, inputFocus, isInputActive, isTouchDevice]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || typingLineId) return;

      // Auto-focus terminal if not already focused
      if (inputFocus !== "terminal") {
        onInputFocusChange("terminal");
        setIsInputActive(true);

        // For touch devices, focus the hidden input
        if (isTouchDevice && hiddenInputRef.current) {
          hiddenInputRef.current.focus();
        }
      }

      // Don't handle keyboard events if we're using touch input
      if (isTouchDevice && document.activeElement === hiddenInputRef.current) {
        return;
      }

      e.preventDefault();

      if (e.key === "Enter") {
        if (currentInput.trim()) {
          handleCommand(currentInput);
          setCurrentInput("");
          setCursorPosition(0);
        }
      } else if (e.key === "ArrowUp") {
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex === -1
              ? commandHistory.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
          setCursorPosition(commandHistory[newIndex].length);
        }
      } else if (e.key === "ArrowDown") {
        if (historyIndex !== -1) {
          const newIndex =
            historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
          setHistoryIndex(newIndex);
          const newInput = newIndex === -1 ? "" : commandHistory[newIndex];
          setCurrentInput(newInput);
          setCursorPosition(newInput.length);
        }
      } else if (e.key === "ArrowLeft") {
        setCursorPosition(Math.max(0, cursorPosition - 1));
      } else if (e.key === "ArrowRight") {
        setCursorPosition(Math.min(currentInput.length, cursorPosition + 1));
      } else if (e.key === "Backspace") {
        if (cursorPosition > 0) {
          const newInput =
            currentInput.slice(0, cursorPosition - 1) +
            currentInput.slice(cursorPosition);
          setCurrentInput(newInput);
          setCursorPosition(cursorPosition - 1);
        }
      } else if (e.key === "Delete") {
        if (cursorPosition < currentInput.length) {
          const newInput =
            currentInput.slice(0, cursorPosition) +
            currentInput.slice(cursorPosition + 1);
          setCurrentInput(newInput);
        }
      } else if (e.key === "Home") {
        setCursorPosition(0);
      } else if (e.key === "End") {
        setCursorPosition(currentInput.length);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        const newInput =
          currentInput.slice(0, cursorPosition) +
          e.key +
          currentInput.slice(cursorPosition);
        setCurrentInput(newInput);
        setCursorPosition(cursorPosition + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isVisible,
    currentInput,
    cursorPosition,
    commandHistory,
    historyIndex,
    typingLineId,
    inputFocus,
    isTouchDevice,
    onInputFocusChange,
  ]);

  // Handle terminal click
  const handleTerminalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Set focus to terminal
    onInputFocusChange("terminal");
    setIsInputActive(true);

    // For touch devices, focus the hidden input
    if (isTouchDevice && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

  // Handle mobile input
  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);
    setCursorPosition(value.length);
    setHistoryIndex(-1);
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentInput.trim()) {
        handleCommand(currentInput);
        setCurrentInput("");
        setCursorPosition(0);
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
        setCursorPosition(commandHistory[newIndex].length);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex =
          historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
        setHistoryIndex(newIndex);
        const newInput = newIndex === -1 ? "" : commandHistory[newIndex];
        setCurrentInput(newInput);
        setCursorPosition(newInput.length);
      }
    }
  };

  // Handle resize
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const containerRect = document
      .querySelector(".terminal-container")
      ?.getBoundingClientRect();
    if (!containerRect) return;

    const newHeight = containerRect.bottom - e.clientY;
    const minHeight = 200;
    const maxHeight = 500;

    onHeightChange(Math.max(minHeight, Math.min(newHeight, maxHeight)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "row-resize";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "default";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "default";
    };
  }, [isDragging]);

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add command to history
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
    setIsInputActive(false);

    // Add command line to terminal
    const commandLine: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: "command",
      content: command,
      timestamp: new Date(),
    };
    setLines((prev) => [...prev, commandLine]);

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
    }
  };

  const handleTypingComplete = (lineId: string) => {
    setTypingLineId(null);
    setLines((prev) =>
      prev.map((line) =>
        line.id === lineId ? { ...line, isTyping: false } : line
      )
    );
    setIsInputActive(true);
  };

  const renderPrompt = () => (
    <span>
      <span className="text-cyan-400">devrat@portfolio:~$ </span>
    </span>
  );

  const renderCurrentInput = () => {
    if (!isInputActive || typingLineId) return null;

    const beforeCursor = currentInput.slice(0, cursorPosition);
    const afterCursor = currentInput.slice(cursorPosition);

    return (
      <div className="flex items-start">
        {renderPrompt()}
        <span className="text-green-400">
          &nbsp;{beforeCursor}
          <span className="terminal-cursor inline-block w-2 h-3 bg-green-400" />
          {afterCursor}
        </span>
      </div>
    );
  };

  if (!isVisible) return null;

  // Mobile full-screen terminal
  if (isMobile) {
    return (
      <div
        className={`unified-terminal fixed inset-0 z-50 bg-black flex flex-col ${
          isKeyboardOpen ? "pb-0" : ""
        }`}
        style={{
          paddingBottom: isKeyboardOpen ? "0px" : "env(safe-area-inset-bottom)",
          height: isKeyboardOpen ? "auto" : "100dvh",
          minHeight: isKeyboardOpen
            ? `${window.visualViewport?.height || window.innerHeight}px`
            : "100dvh",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border-color bg-panel-bg">
          <div className="flex items-center gap-2">
            <VscTerminalBash size={16} className="text-text-primary" />
            <span className="text-sm text-text-primary">Terminal</span>
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-border-color rounded"
          >
            <VscChromeClose size={14} className="text-text-primary" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="text-center py-2 bg-black">
          <h1 className="text-2xl font-bold text-green-400 mb-2">
            Devrat Patel
          </h1>
          <p className="text-gray-300 text-sm">Full Stack Developer</p>
          <hr className="my-4 border-border-color" />
        </div>

        {/* Terminal Content */}
        <div
          className={`unified-terminal-input flex-1 overflow-auto p-4 font-mono text-sm cursor-text ${
            isKeyboardOpen ? "pb-2" : "pb-4"
          }`}
          onClick={handleTerminalClick}
          ref={terminalRef}
          style={{
            // Adjust height when keyboard is open to ensure proper scrolling
            height: isKeyboardOpen
              ? `${
                  (window.visualViewport?.height || window.innerHeight) - 120
                }px`
              : "auto",
            maxHeight: isKeyboardOpen
              ? `${
                  (window.visualViewport?.height || window.innerHeight) - 120
                }px`
              : "none",
            paddingBottom: isKeyboardOpen ? "60px" : "16px", // Extra padding to keep input visible
          }}
        >
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

          {renderCurrentInput()}
          <div ref={terminalEndRef} />
        </div>

        {/* Hidden input for mobile keyboard */}
        <input
          ref={hiddenInputRef}
          type="text"
          value={currentInput}
          onChange={handleMobileInputChange}
          onKeyDown={handleMobileKeyDown}
          onFocus={() => {
            // Scroll to input area when keyboard opens
            setTimeout(() => {
              if (terminalEndRef.current) {
                terminalEndRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              }
            }, 100);
          }}
          className="absolute -top-10 left-0 w-full h-8 opacity-0 pointer-events-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          inputMode="text"
          style={{ fontSize: "16px" }}
        />
      </div>
    );
  }

  // Desktop terminal
  return (
    <div
      className={`unified-terminal terminal-container relative bg-panel-bg flex flex-col ${
        inputFocus === "terminal" ? "ring-2 ring-blue-500/50" : ""
      }`}
      style={{ height: `${height}px` }}
    >
      {/* Resize Handle */}
      <div
        className="h-[1px] bg-border-color cursor-row-resize hover:bg-text-keyword transition-colors flex-shrink-0"
        onMouseDown={handleMouseDown}
      />

      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 border-b border-border-color flex-shrink-0">
        <div className="flex items-center gap-2">
          <VscTerminalBash size={16} className="text-text-primary" />
          <span className="text-sm text-text-primary">Terminal</span>
        </div>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-border-color rounded"
        >
          <VscChromeClose size={14} className="text-text-primary" />
        </button>
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="unified-terminal-input flex-1 overflow-auto bg-black p-4 font-mono text-xs min-h-0 focus:outline-none cursor-text"
        tabIndex={0}
        onClick={handleTerminalClick}
      >
        {/* Initial welcome command */}
        <div className="mb-1">
          {renderPrompt()}
          <span className="text-green-400">welcome</span>
        </div>

        {lines.map((line) => (
          <div key={line.id} className="mb-1">
            {line.type === "command" && (
              <div className="flex items-start">
                {renderPrompt()}
                <span className="text-green-400">&nbsp;{line.content}</span>
              </div>
            )}
            {line.type === "response" && (
              <div className="my-3">
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
              <div className="text-white whitespace-pre-wrap my-3">
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
              <div className="text-red-400 whitespace-pre-wrap my-3">
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

        {renderCurrentInput()}
        <div ref={terminalEndRef} />
      </div>

      {/* Hidden input for touch devices (tablets/iPads) */}
      {isTouchDevice && (
        <input
          ref={hiddenInputRef}
          type="text"
          value={currentInput}
          onChange={handleMobileInputChange}
          onKeyDown={handleMobileKeyDown}
          onFocus={() => {
            // Scroll to input area when keyboard opens
            setTimeout(() => {
              if (terminalEndRef.current) {
                terminalEndRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              }
            }, 100);
          }}
          className="absolute -top-10 left-0 w-full h-8 opacity-0 pointer-events-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          inputMode="text"
          style={{ fontSize: "16px" }}
        />
      )}
    </div>
  );
}
