"use client";

import { useState, useEffect, useRef } from "react";
import { VscTerminalBash, VscChromeClose } from "react-icons/vsc";
import {
  generateAIResponse,
  initializeGemini,
  isResumeRelated,
} from "../utils/chatbot";

interface TerminalProps {
  isVisible: boolean;
  onToggle: () => void;
  height: number;
  onHeightChange: (height: number) => void;
  isMobile?: boolean;
  isTablet?: boolean;
  inputFocus: "terminal" | "notepad" | null;
  onInputFocusChange: (focus: "terminal" | "notepad" | null) => void;
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

export default function Terminal({
  isVisible,
  onToggle,
  height,
  onHeightChange,
  isMobile = false,
  isTablet = false,
  inputFocus,
  onInputFocusChange,
}: TerminalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [typingLineId, setTypingLineId] = useState<string | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

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
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, currentInput]);

  // Focus terminal when it becomes visible
  useEffect(() => {
    if (isVisible) {
      if (
        (isMobile || isTablet) &&
        hiddenInputRef.current &&
        inputFocus === "terminal"
      ) {
        console.log("Mobile/tablet terminal focusing input");
        setTimeout(() => {
          hiddenInputRef.current?.focus();
          // Additional trigger for iOS devices
          if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            hiddenInputRef.current?.click();
          }
        }, 100);
      } else if (!isMobile && !isTablet && terminalRef.current) {
        terminalRef.current.focus();
      }
    }
  }, [isVisible, isMobile, isTablet, inputFocus]);

  // Sync hidden input value with current input
  useEffect(() => {
    if ((isMobile || isTablet) && hiddenInputRef.current) {
      hiddenInputRef.current.value = currentInput;
    }
  }, [currentInput, isMobile, isTablet]);

  // Focus hidden input when terminal gains focus on mobile/tablet
  useEffect(() => {
    if (
      (isMobile || isTablet) &&
      inputFocus === "terminal" &&
      hiddenInputRef.current
    ) {
      console.log("Mobile/tablet terminal input focus change");
      // Immediate focus attempt
      hiddenInputRef.current.focus();
      // Additional trigger for iOS devices
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        hiddenInputRef.current.click();
      }
      // Delayed focus as backup
      setTimeout(() => {
        hiddenInputRef.current?.focus();
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
          hiddenInputRef.current?.click();
        }
      }, 100);
    }
  }, [inputFocus, isMobile, isTablet]);

  // Handle terminal focus and keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || typingLineId || inputFocus !== "terminal") return; // Only handle when terminal is in focus

      // Skip if the event is coming from the hidden input (mobile/tablet)
      if ((isMobile || isTablet) && e.target === hiddenInputRef.current) return;

      if (e.key === "Enter") {
        e.preventDefault();
        handleCommand(currentInput);
        setCurrentInput("");
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
      } else if (e.key === "Backspace") {
        e.preventDefault();
        setCurrentInput((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setCurrentInput((prev) => prev + e.key);
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (isVisible && terminalRef.current && !typingLineId) {
        const target = e.target as HTMLElement;
        // Check if click is within the terminal
        if (terminalRef.current.contains(target)) {
          onInputFocusChange("terminal");
          if (isMobile && hiddenInputRef.current) {
            hiddenInputRef.current.focus();
          } else {
            terminalRef.current.focus();
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isVisible && terminalRef.current && !typingLineId) {
        const target = e.target as HTMLElement;
        // Check if touch is within the terminal
        if (terminalRef.current.contains(target)) {
          e.preventDefault(); // Prevent default touch behavior
          onInputFocusChange("terminal");
          if (hiddenInputRef.current) {
            // Use setTimeout to ensure proper focus on mobile devices
            setTimeout(() => {
              hiddenInputRef.current?.focus();
              // For iOS devices, trigger click to ensure keyboard appears
              if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                hiddenInputRef.current?.click();
              }
            }, 50);
          }
        }
      }
    };

    if (!isMobile && !isTablet) {
      document.addEventListener("keydown", handleKeyDown);
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleTouchStart);

    // Add additional touch event handling for mobile/tablet
    if (isMobile || isTablet) {
      document.addEventListener("touchend", handleTouchStart);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleTouchStart);
      if (isMobile || isTablet) {
        document.removeEventListener("touchend", handleTouchStart);
      }
    };
  }, [
    isVisible,
    currentInput,
    commandHistory,
    historyIndex,
    typingLineId,
    inputFocus,
    onInputFocusChange,
    isMobile,
  ]);

  // Handle mobile/tablet input
  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((!isMobile && !isTablet) || inputFocus !== "terminal") return;
    const newValue = e.target.value;
    setCurrentInput(newValue);
    // Reset history index when typing
    setHistoryIndex(-1);
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((!isMobile && !isTablet) || inputFocus !== "terminal") return;

    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(currentInput);
      setCurrentInput("");
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = "";
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        const newInput = commandHistory[newIndex];
        setCurrentInput(newInput);
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = newInput;
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex =
          historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
        setHistoryIndex(newIndex);
        const newInput = newIndex === -1 ? "" : commandHistory[newIndex];
        setCurrentInput(newInput);
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = newInput;
        }
      }
    }
  };

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
    // Don't add resize handlers on mobile, but allow on tablets
    if (isMobile && !isTablet) return;

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
  }, [isDragging, isMobile]);

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
  };

  const renderPrompt = () => (
    <span>
      <span className="text-cyan-400">devrat@portfolio:~$ </span>
    </span>
  );

  if (!isVisible) return null;

  return (
    <div
      className={`terminal-container relative bg-panel-bg flex flex-col ${
        inputFocus === "terminal" ? "ring-2 ring-blue-500/50" : ""
      }`}
      style={{ height: isMobile && !isTablet ? "100%" : `${height}px` }}
    >
      {/* Resize Handle - Hidden on mobile, shown on tablets */}
      {(!isMobile || isTablet) && (
        <div
          className="h-[1px] bg-border-color cursor-row-resize hover:bg-text-keyword transition-colors flex-shrink-0"
          onMouseDown={handleMouseDown}
        />
      )}

      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 border-b border-border-color flex-shrink-0">
        <div className="flex items-center gap-2">
          <VscTerminalBash size={16} className="text-text-primary" />
          <span className="text-sm text-text-primary">Terminal</span>
        </div>
        {/* Close button - Hidden on mobile, shown on tablets */}
        {(!isMobile || isTablet) && (
          <button
            onClick={onToggle}
            className="p-1 hover:bg-border-color rounded"
          >
            <VscChromeClose size={14} className="text-text-primary" />
          </button>
        )}
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-auto bg-black p-4 font-mono text-xs min-h-0 focus:outline-none cursor-text"
        tabIndex={0}
        onClick={() => {
          onInputFocusChange("terminal");
          if ((isMobile || isTablet) && hiddenInputRef.current) {
            setTimeout(() => {
              hiddenInputRef.current?.focus();
              // For iOS devices, trigger click to ensure keyboard appears
              if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                hiddenInputRef.current?.click();
              }
            }, 50);
          } else {
            terminalRef.current?.focus();
          }
        }}
        onTouchStart={(e) => {
          e.preventDefault(); // Prevent default touch behavior
          onInputFocusChange("terminal");
          if ((isMobile || isTablet) && hiddenInputRef.current) {
            setTimeout(() => {
              hiddenInputRef.current?.focus();
              // For iOS devices, trigger click to ensure keyboard appears
              if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                hiddenInputRef.current?.click();
              }
            }, 50);
          }
        }}
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

      {/* Hidden input for mobile/tablet keyboard capture */}
      {(isMobile || isTablet) && (
        <>
          <input
            ref={hiddenInputRef}
            type="text"
            value={currentInput}
            onChange={handleMobileInput}
            onKeyDown={handleMobileKeyDown}
            className="fixed opacity-0 pointer-events-none -z-10"
            style={{
              position: "fixed",
              left: "0px",
              top: "0px",
              width: "1px",
              height: "1px",
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "16px", // Prevents zoom on iOS
              transform: "scale(0)",
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            inputMode="text"
            onFocus={() => {
              if (inputFocus !== "terminal") {
                onInputFocusChange("terminal");
              }
            }}
            onBlur={() => {
              // Don't lose focus immediately on mobile/tablet
              if ((isMobile || isTablet) && inputFocus === "terminal") {
                console.log("Mobile/tablet input lost focus, refocusing");
                setTimeout(() => {
                  hiddenInputRef.current?.focus();
                }, 100);
              }
            }}
            onInput={(e) => {
              console.log(
                "Mobile input event:",
                (e.target as HTMLInputElement).value
              );
            }}
          />
          {/* Tap area for mobile input activation */}
          <div
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-lg shadow-lg z-50"
            onClick={() => {
              console.log("Mobile tap area clicked");
              onInputFocusChange("terminal");
              if (hiddenInputRef.current) {
                hiddenInputRef.current.focus();
                hiddenInputRef.current.click();
              }
            }}
          >
            📱 Tap to type
          </div>
        </>
      )}
    </div>
  );
}
