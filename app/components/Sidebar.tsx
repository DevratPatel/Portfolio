"use client";

import { useState } from "react";
import { FiFile, FiFolder } from "react-icons/fi";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiJson,
  SiMarkdown,
  SiCss3,
  SiNpm,
  SiInstagram,
} from "react-icons/si";
import {
  VscJson,
  VscFile,
  VscFolder,
  VscFolderOpened,
  VscGear,
  VscPackage,
  VscAccount,
} from "react-icons/vsc";
import Notepad from "./Notepad";

interface SidebarProps {
  activeFile: string;
  onFileSelect: (file: string) => void;
  inputFocus: "terminal" | "notepad" | null;
  onInputFocusChange: (focus: "terminal" | "notepad" | null) => void;
}

export default function Sidebar({
  activeFile,
  onFileSelect,
  inputFocus,
  onInputFocusChange,
}: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    "root",
    "app",
    "app/components",
    "app/data",
    "public",
  ]);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((f) => f !== folderName)
        : [...prev, folderName]
    );
  };

  const fileStructure = [
    {
      name: "app",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            { name: "Header.tsx", type: "file", fileType: "tsx" },
            { name: "Footer.tsx", type: "file", fileType: "tsx" },
            { name: "Portfolio.tsx", type: "file", fileType: "tsx" },
          ],
        },
        {
          name: "data",
          type: "folder",
          children: [
            { name: "education.ts", type: "file", fileType: "ts" },
            { name: "skills.ts", type: "file", fileType: "ts" },
            { name: "projects.ts", type: "file", fileType: "ts" },
            { name: "experience.ts", type: "file", fileType: "ts" },
            { name: "leadership.ts", type: "file", fileType: "ts" },
          ],
        },
        { name: "globals.css", type: "file", fileType: "css" },
        { name: "layout.tsx", type: "file", fileType: "tsx" },
        { name: "page.tsx", type: "file", fileType: "tsx" },
      ],
    },
    {
      name: "public",
      type: "folder",
      children: [{ name: "Devrat_Resume.pdf", type: "file", fileType: "pdf" }],
    },
    { name: "package.json", type: "file", fileType: "json" },
    { name: "tailwind.config.js", type: "file", fileType: "js" },
    { name: "tsconfig.json", type: "file", fileType: "json" },
    { name: "next.config.js", type: "file", fileType: "js" },
    { name: "README.md", type: "file", fileType: "md" },
  ];

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "tsx":
        return <SiReact className="text-blue-400" size={16} />;
      case "ts":
        return <SiTypescript className="text-blue-600" size={16} />;
      case "js":
        return <SiJavascript className="text-yellow-500" size={16} />;
      case "css":
        return <SiCss3 className="text-blue-500" size={16} />;
      case "json":
        return <VscJson className="text-yellow-600" size={16} />;
      case "md":
        return <SiMarkdown className="text-blue-300" size={16} />;
      case "ico":
      case "png":
      case "jpg":
      case "svg":
        return <VscFile className="text-purple-400" size={16} />;
      case "pdf":
        return <VscFile className="text-red-400" size={16} />;
      default:
        return <VscFile className="text-text-primary/60" size={16} />;
    }
  };

  const getFullPath = (
    structure: any[],
    currentPath: string = ""
  ): string[] => {
    const paths: string[] = [];

    structure.forEach((item) => {
      const itemPath = currentPath ? `${currentPath}/${item.name}` : item.name;

      if (item.type === "file") {
        paths.push(itemPath);
      } else if (item.type === "folder" && item.children) {
        paths.push(...getFullPath(item.children, itemPath));
      }
    });

    return paths;
  };

  const renderFileTree = (
    items: any[],
    depth: number = 0,
    parentPath: string = ""
  ): JSX.Element[] => {
    return items.map((item) => {
      const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
      const isExpanded = expandedFolders.includes(itemPath);

      if (item.type === "folder") {
        return (
          <div key={itemPath}>
            <div
              className="flex items-center gap-2 py-1 px-2 text-sm cursor-pointer hover:bg-panel-bg rounded"
              style={{ paddingLeft: `${8 + depth * 16}px` }}
              onClick={() => toggleFolder(itemPath)}
            >
              {isExpanded ? (
                <VscFolderOpened size={16} className="text-text-keyword" />
              ) : (
                <VscFolder size={16} className="text-text-keyword" />
              )}
              <span className="text-text-primary">{item.name}</span>
            </div>
            {isExpanded && item.children && (
              <div>{renderFileTree(item.children, depth + 1, itemPath)}</div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={itemPath}
            className={`flex items-center gap-2 py-1 px-2 text-sm cursor-pointer rounded ${
              activeFile === itemPath
                ? "bg-active-tab text-text-primary"
                : "text-text-primary/80 hover:bg-panel-bg"
            }`}
            style={{ paddingLeft: `${8 + depth * 16}px` }}
            onClick={() => onFileSelect(itemPath)}
          >
            {getFileIcon(item.fileType)}
            <span>{item.name}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Explorer Header */}
      <div className="p-[10px] border-b border-border-color">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-text-primary/70">
          <span>Explorer</span>
        </div>
      </div>

      {/* Files Section */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-2">
          <div className="mb-2">
            <div
              className="flex items-center gap-2 py-1 px-2 text-sm cursor-pointer hover:bg-panel-bg rounded"
              onClick={() => toggleFolder("root")}
            >
              {expandedFolders.includes("root") ? (
                <VscFolderOpened size={16} className="text-text-keyword" />
              ) : (
                <VscFolder size={16} className="text-text-keyword" />
              )}
              <span className="text-text-primary">PORTFOLIO</span>
            </div>

            {expandedFolders.includes("root") && (
              <div className="mt-1">{renderFileTree(fileStructure)}</div>
            )}
          </div>
        </div>
      </div>

      {/* Notepad Section */}
      <Notepad
        inputFocus={inputFocus}
        onInputFocusChange={onInputFocusChange}
      />

      {/* Profile Header */}
      <div className="border-t border-border-color bg-sidebar-bg">
        <div className="flex items-center gap-3 py-2 px-3">
          <svg
            width={16}
            height={16}
            viewBox="0 0 37 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-text-primary opacity-70 hover:opacity-100 transition-opacity"
          >
            <path
              d="M12.5 31.15C12.1667 31.15 11.8833 31.0833 11.65 30.95C11.4167 30.8167 11.3 30.5667 11.3 30.2C11.3 29.7333 11.4167 29.2 11.65 28.6C11.8833 28 12.15 27.4167 12.45 26.85C12.75 26.25 13.0167 25.7667 13.25 25.4C12.0833 26.6333 10.8667 27.8 9.6 28.9C8.96667 29.4333 8.26667 29.9333 7.5 30.4C6.73333 30.8667 5.91667 31.1 5.05 31.1C4.71667 31.1 4.48333 31 4.35 30.8C4.21667 30.5667 4.15 30.3 4.15 30C4.15 29.8333 4.16667 29.7167 4.2 29.65C4.36667 28.35 4.78333 27 5.45 25.6C6.11667 24.2 6.93333 22.8833 7.9 21.65C8.86667 20.4167 9.85 19.4167 10.85 18.65C11.6167 18.0833 12.35 17.7333 13.05 17.6C13.75 17.4333 14.5167 17.35 15.35 17.35H17C17.5333 16.45 18.0833 15.45 18.65 14.35C19.25 13.2167 19.8333 12.1 20.4 11C21 9.9 21.55 8.93333 22.05 8.1C23.4167 5.76667 24.9167 3.9 26.55 2.5C28.2167 1.1 30.0667 0.399998 32.1 0.399998C32.5333 0.399998 32.9333 0.533331 33.3 0.799998C33.6667 1.03333 33.8333 1.4 33.8 1.9L33.7 3.7C33.7 3.73333 33.6667 3.78333 33.6 3.85C33.5333 3.88333 33.4833 3.9 33.45 3.9C33.4167 3.9 33.3667 3.86666 33.3 3.8C33.2 3.2 32.9 2.75 32.4 2.45C31.9 2.11667 31.2833 1.95 30.55 1.95C30.3167 1.95 30.05 1.96666 29.75 2C29.4833 2.03333 29.2167 2.1 28.95 2.2C28.0167 2.53333 27.1333 3.21666 26.3 4.25C25.4667 5.25 24.5667 6.58333 23.6 8.25C23.2667 8.88333 22.8333 9.71667 22.3 10.75C21.7667 11.75 21.2 12.8333 20.6 14C20.0333 15.1667 19.4833 16.3 18.95 17.4C18.45 18.5 18.0167 19.4333 17.65 20.2C17.4833 20.6 17.2 21.2167 16.8 22.05C16.4 22.85 15.9667 23.7333 15.5 24.7C15.0667 25.6333 14.6833 26.5 14.35 27.3C14.05 28.1 13.9 28.6667 13.9 29C13.9 29.4667 14.1 29.7 14.5 29.7C14.9 29.7 15.4333 29.4667 16.1 29C16.7667 28.5 17.45 27.9 18.15 27.2C18.8833 26.4667 19.5333 25.7667 20.1 25.1C20.7 24.4333 21.1167 23.9333 21.35 23.6C21.45 23.7 21.5 23.8167 21.5 23.95C21.5 24.1833 21.4 24.4167 21.2 24.65C21.0333 24.8833 20.8833 25.0833 20.75 25.25C20.15 26.05 19.4 26.9167 18.5 27.85C17.6333 28.75 16.6833 29.5333 15.65 30.2C14.6167 30.8333 13.5667 31.15 12.5 31.15ZM7.1 29.4C7.5 29.4 8.05 29.1167 8.75 28.55C9.48333 27.95 10.2667 27.2167 11.1 26.35C11.9333 25.45 12.7167 24.5167 13.45 23.55C14.1833 22.55 14.7833 21.65 15.25 20.85C15.75 20.0167 16 19.3833 16 18.95C16 18.5833 15.8833 18.3333 15.65 18.2C15.45 18.0667 15.1833 18 14.85 18C14.3167 18 13.7333 18.2 13.1 18.6C12.5 18.9667 12.0167 19.3333 11.65 19.7C11.25 20.0667 10.7667 20.65 10.2 21.45C9.66667 22.2167 9.13333 23.0667 8.6 24C8.06667 24.9333 7.61667 25.8333 7.25 26.7C6.88333 27.5667 6.7 28.2667 6.7 28.8C6.7 29.2 6.83333 29.4 7.1 29.4ZM7.54726 48.5C6.2806 48.5 5.06393 48.2 3.89727 47.6C2.69726 47.0333 1.81393 46.15 1.24727 44.95C1.04726 44.5167 0.913931 44.05 0.847264 43.55C0.780598 43.0833 0.747264 42.6167 0.747264 42.15V41.6C0.747264 41.3333 0.780598 41.0833 0.847264 40.85C0.913931 40.65 1.0806 40.55 1.34727 40.55C1.44727 40.55 1.49726 40.5833 1.49726 40.65C1.49726 40.85 1.4806 41.05 1.44726 41.25C1.3806 41.45 1.34727 41.6667 1.34727 41.9C1.34727 43.4333 1.84727 44.6 2.84727 45.4C3.81393 46.2 5.0306 46.6 6.49726 46.6C7.09726 46.6 7.71393 46.5333 8.34726 46.4C8.9806 46.2667 9.5806 46.0833 10.1473 45.85C12.2473 44.95 14.0806 43.6833 15.6473 42.05C17.2139 40.4167 18.5806 38.5667 19.7473 36.5C20.9139 34.4333 21.9473 32.3167 22.8473 30.15C23.8139 27.7833 24.7306 25.45 25.5973 23.15C26.4973 20.8167 27.4973 18.5333 28.5973 16.3C29.6306 14.2333 30.7306 12.6833 31.8973 11.65C33.0639 10.6167 34.2306 10.1 35.3973 10.1C35.6973 10.1 35.9806 10.1833 36.2473 10.35C36.5473 10.5167 36.6806 10.7833 36.6473 11.15L36.5473 12.55C36.5473 12.65 36.4806 12.7 36.3473 12.7C36.3473 12.7 36.3306 12.7 36.2973 12.7C36.2973 12.7 36.2973 12.6833 36.2973 12.65C36.2973 12.25 36.1473 11.9833 35.8473 11.85C35.5806 11.6833 35.3139 11.6 35.0473 11.6C33.9139 11.6 32.8973 12 31.9973 12.8C31.1306 13.5667 30.3639 14.5667 29.6973 15.8C29.0306 17.0333 28.4639 18.3333 27.9973 19.7C27.5306 21.0333 27.1473 22.2667 26.8473 23.4C27.0806 23.2 27.4973 22.7833 28.0973 22.15C28.7306 21.5167 29.4639 20.8333 30.2973 20.1C31.1306 19.3667 31.9806 18.7333 32.8473 18.2C33.7139 17.6667 34.5139 17.4 35.2473 17.4C35.6806 17.4 35.9306 17.6 35.9973 18C36.0973 18.3667 36.1139 18.7167 36.0473 19.05C35.8806 20.2833 35.4639 21.6167 34.7973 23.05C34.1306 24.4833 33.2639 25.85 32.1973 27.15C31.1639 28.4167 29.9973 29.45 28.6973 30.25C27.4306 31.05 26.0973 31.45 24.6973 31.45C24.5306 31.45 24.2973 31.4333 23.9973 31.4C23.7306 31.4 23.5639 31.3667 23.4973 31.3C22.7973 33.4 21.8973 35.55 20.7973 37.75C19.6973 39.95 18.3806 41.9333 16.8473 43.7C15.2806 45.5 13.4306 46.85 11.2973 47.75C10.1639 48.25 8.91393 48.5 7.54726 48.5ZM25.4473 30.6C25.9473 30.6 26.5139 30.4 27.1473 30C27.8139 29.5667 28.3139 29.1833 28.6473 28.85C29.0473 28.4833 29.5139 27.9167 30.0473 27.15C30.6139 26.35 31.1639 25.4833 31.6973 24.55C32.2639 23.6167 32.7306 22.7167 33.0973 21.85C33.4639 20.9833 33.6473 20.2833 33.6473 19.75C33.6473 19.5833 33.6139 19.4333 33.5473 19.3C33.4806 19.1667 33.3639 19.1 33.1973 19.1C32.8973 19.1 32.4973 19.2833 31.9973 19.65C31.4973 20.0167 30.9639 20.4667 30.3973 21C29.8639 21.5 29.3639 22 28.8973 22.5C28.4306 22.9667 28.0973 23.3167 27.8973 23.55C27.5639 23.95 27.1139 24.5333 26.5473 25.3C25.9806 26.0667 25.4806 26.85 25.0473 27.65C24.6139 28.4167 24.3973 29.0667 24.3973 29.6C24.3973 30.2667 24.7473 30.6 25.4473 30.6Z"
              fill="currentColor"
            />
          </svg>

          <div className="flex-1">
            <div className="text-sm font-medium text-text-primary/70">
              Devrat Patel
            </div>
          </div>

          {/* Instagram Link */}
          <a
            href="https://instagram.com/devratpatel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:bg-editor-bg/50 rounded transition-colors"
            title="Follow on Instagram"
          >
            <SiInstagram
              size={14}
              className="text-text-primary/60 hover:text-pink-500 transition-colors"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
