"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import PreviewPanel from "./components/PreviewPanel";
import UnifiedTerminal from "./components/UnifiedTerminal";

export default function Home() {
  const [activeFile, setActiveFile] = useState<string>("README.md");
  const [openFiles, setOpenFiles] = useState<string[]>(["README.md"]);
  const [sidebarWidth, setSidebarWidth] = useState(256); // 16rem = 256px
  const [previewWidth, setPreviewWidth] = useState(450); // Default preview width
  const [isDragging, setIsDragging] = useState<"sidebar" | "preview" | null>(
    null
  );
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(300);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileTerminalVisible, setIsMobileTerminalVisible] = useState(true);
  const [inputFocus, setInputFocus] = useState<"terminal" | "notepad" | null>(
    "terminal"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Load saved panel sizes from localStorage on mount
  useEffect(() => {
    const savedSidebarWidth = localStorage.getItem("portfolio-sidebar-width");
    const savedPreviewWidth = localStorage.getItem("portfolio-preview-width");
    const savedTerminalHeight = localStorage.getItem(
      "portfolio-terminal-height"
    );
    const savedTerminalVisible = localStorage.getItem(
      "portfolio-terminal-visible"
    );

    if (savedSidebarWidth) {
      setSidebarWidth(parseInt(savedSidebarWidth));
    }
    if (savedPreviewWidth) {
      setPreviewWidth(parseInt(savedPreviewWidth));
    }
    if (savedTerminalHeight) {
      setTerminalHeight(parseInt(savedTerminalHeight));
    }
    if (savedTerminalVisible) {
      setIsTerminalVisible(savedTerminalVisible === "true");
    }
  }, []);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileSize = window.innerWidth < 768; // md breakpoint
      setIsMobile(isMobileSize);

      // Mobile terminal is always visible on mobile devices
      if (isMobileSize) {
        setIsMobileTerminalVisible(true);
      }
    };

    // Set mobile viewport height for older browsers
    const setMobileVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    checkMobile();
    setMobileVH();

    window.addEventListener("resize", checkMobile);
    window.addEventListener("resize", setMobileVH);
    window.addEventListener("orientationchange", setMobileVH);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", setMobileVH);
      window.removeEventListener("orientationchange", setMobileVH);
    };
  }, []);

  // Save panel sizes to localStorage when they change
  useEffect(() => {
    localStorage.setItem("portfolio-sidebar-width", sidebarWidth.toString());
  }, [sidebarWidth]);

  useEffect(() => {
    localStorage.setItem("portfolio-preview-width", previewWidth.toString());
  }, [previewWidth]);

  useEffect(() => {
    localStorage.setItem(
      "portfolio-terminal-height",
      terminalHeight.toString()
    );
  }, [terminalHeight]);

  useEffect(() => {
    localStorage.setItem(
      "portfolio-terminal-visible",
      isTerminalVisible.toString()
    );
  }, [isTerminalVisible]);

  const handleFileSelect = (file: string) => {
    // If it's a PDF file, open it in a new tab instead of adding to editor
    if (file.endsWith(".pdf")) {
      const fileName = file.split("/").pop();
      const pdfUrl = `/${fileName}`;

      console.log("Opening PDF:", file, "→", pdfUrl);

      // Try to open in new tab, with fallback
      const newWindow = window.open(pdfUrl, "_blank");
      if (!newWindow) {
        // Fallback if popup blocked - offer download option
        const download = confirm(
          `PDF blocked by browser. Would you like to download it instead?\n\nClick OK to download, Cancel to get the direct URL.`
        );

        if (download) {
          // Create download link
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = fileName || "resume.pdf";
          link.click();
        } else {
          alert(`Direct URL: ${window.location.origin}${pdfUrl}`);
        }
      }
      return;
    }

    setActiveFile(file);
    if (!openFiles.includes(file)) {
      setOpenFiles([...openFiles, file]);
    }
  };

  const handleCloseFile = (file: string) => {
    const newOpenFiles = openFiles.filter((f) => f !== file);
    setOpenFiles(newOpenFiles);

    if (file === activeFile) {
      if (newOpenFiles.length > 0) {
        setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
      } else {
        setActiveFile("");
      }
    }
  };

  const handleMouseDown = (divider: "sidebar" | "preview") => {
    setIsDragging(divider);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;

    if (isDragging === "sidebar") {
      const newWidth = e.clientX - containerRect.left;
      const minWidth = 200;
      const maxWidth = containerWidth * 0.4;
      setSidebarWidth(Math.max(minWidth, Math.min(newWidth, maxWidth)));
    } else if (isDragging === "preview") {
      const newWidth = containerRect.right - e.clientX;
      const minWidth = 250;
      const maxWidth = containerWidth * 0.4;
      setPreviewWidth(Math.max(minWidth, Math.min(newWidth, maxWidth)));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const resetPanelSizes = () => {
    setSidebarWidth(256);
    setPreviewWidth(532);
  };

  const toggleTerminal = () => {
    setIsTerminalVisible(!isTerminalVisible);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "0") {
        e.preventDefault();
        resetPanelSizes();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="mobile-safe-height flex flex-col bg-editor-bg"
    >
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Hidden on mobile */}
        <div
          className="hidden md:flex bg-sidebar-bg border-r border-border-color flex-col overflow-hidden"
          style={{ width: sidebarWidth }}
        >
          <Sidebar
            activeFile={activeFile}
            onFileSelect={handleFileSelect}
            inputFocus={inputFocus}
            onInputFocusChange={setInputFocus}
          />
        </div>

        {/* Sidebar Resizer - Hidden on mobile */}
        <div
          className="hidden md:block w-[1px] bg-border-color hover:bg-text-keyword cursor-col-resize flex-shrink-0 transition-colors relative group"
          onMouseDown={() => handleMouseDown("sidebar")}
          title="Drag to resize sidebar (Ctrl+0 to reset all panels)"
        >
          <div className="absolute inset-y-0 left-0 w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0.5 h-8 bg-text-primary/30 rounded-full"></div>
          </div>
        </div>

        {/* Code Editor - Takes full width on mobile */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <CodeEditor
            openFiles={openFiles}
            activeFile={activeFile}
            onCloseFile={handleCloseFile}
            onFileSelect={handleFileSelect}
            isTerminalVisible={isMobile ? true : isTerminalVisible}
            terminalHeight={terminalHeight}
            onToggleTerminal={toggleTerminal}
            onTerminalHeightChange={setTerminalHeight}
            isMobile={isMobile}
            inputFocus={inputFocus}
            onInputFocusChange={setInputFocus}
          />
        </div>

        {/* Preview Resizer - Hidden on mobile and tablet */}
        <div
          className="hidden lg:block w-[1px] bg-border-color hover:bg-text-keyword cursor-col-resize flex-shrink-0 transition-colors relative group"
          onMouseDown={() => handleMouseDown("preview")}
          title="Drag to resize preview panel (Ctrl+0 to reset all panels)"
        >
          <div className="absolute inset-y-0 left-0 w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0.5 h-8 bg-text-primary/30 rounded-full"></div>
          </div>
        </div>

        {/* Preview Panel - Hidden on mobile and tablet */}
        <div
          className="hidden xl:flex bg-panel-bg border-l border-border-color flex-col overflow-hidden"
          style={{ width: previewWidth }}
        >
          <PreviewPanel />
        </div>
      </div>

      {/* Mobile Terminal */}
      {isMobile && (
        <UnifiedTerminal
          isVisible={isMobileTerminalVisible}
          onToggle={() => setIsMobileTerminalVisible(!isMobileTerminalVisible)}
          height={300}
          onHeightChange={() => {}} // Not used in mobile mode
          inputFocus={inputFocus}
          onInputFocusChange={setInputFocus}
          isMobile={true}
        />
      )}

      {/* Status Bar - Hidden on mobile and tablet */}
      <div className="hidden lg:flex h-6 bg-sidebar-bg border-t border-border-color items-center justify-between px-3 text-xs text-text-primary/60">
        <div className="flex items-center gap-4">
          <span>Sidebar: {sidebarWidth}px</span>
          <span>Preview: {previewWidth}px</span>
          <span>Files: Next.js Project Structure</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Ctrl+0 to reset panels</span>
          <span className="text-text-primary/40">•</span>
          <span>Ctrl+` for terminal</span>
          <span className="text-text-primary/40">•</span>
          <span>Drag borders to resize</span>
        </div>
      </div>
    </div>
  );
}
