"use client";

import { useState, useEffect } from "react";
import { VscNotebook, VscChevronRight, VscChevronDown } from "react-icons/vsc";

interface NotepadProps {
  className?: string;
  inputFocus: "terminal" | "notepad" | null;
  onInputFocusChange: (focus: "terminal" | "notepad" | null) => void;
}

export default function Notepad({
  className = "",
  inputFocus,
  onInputFocusChange,
}: NotepadProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("vscode-notepad-content");
    if (savedNotes) {
      setNoteContent(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem("vscode-notepad-content", noteContent);
  }, [noteContent]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle clicking on the notepad to switch focus
  const handleNotepadClick = () => {
    onInputFocusChange("notepad");
  };

  // Handle keyboard events when notepad is in focus
  useEffect(() => {
    if (inputFocus !== "notepad") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Let the textarea handle its own keyboard events
      if (document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      // Handle any global notepad shortcuts here if needed
      e.stopPropagation();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [inputFocus]);

  return (
    <div
      className={`border-t border-gray-700 ${
        inputFocus === "notepad" ? "bg-sidebar-bg/50" : ""
      } ${className}`}
    >
      {/* Notepad Header */}
      <div
        className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer hover:bg-editor-bg/50 transition-colors"
        onClick={(e) => {
          toggleExpanded();
          handleNotepadClick();
        }}
      >
        {isExpanded ? (
          <VscChevronDown size={16} className="text-gray-400" />
        ) : (
          <VscChevronRight size={16} className="text-gray-400" />
        )}

        <span className="text-text-primary/70 text-xs uppercase tracking-wide">
          Notepad
        </span>
        {noteContent && (
          <span className="text-gray-500 text-xs">
            ({noteContent.split("\n").length} lines)
          </span>
        )}
      </div>
      {/* Notepad Content */}
      {isExpanded && (
        <div className="px-3 pb-3">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            onClick={handleNotepadClick}
            onFocus={handleNotepadClick}
            placeholder="Start typing your notes here..."
            className="w-full h-32 p-3 text-sm bg-editor-bg border border-gray-600 rounded resize-none focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            style={{
              fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
              fontSize: "12px",
              lineHeight: "1.5",
            }}
          />
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>
              {noteContent.length} characters, {noteContent.split("\n").length}{" "}
              lines
            </span>
            <span className="text-gray-600">Auto-saved</span>
          </div>
        </div>
      )}
    </div>
  );
}
