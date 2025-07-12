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
} from "react-icons/si";
import {
  VscJson,
  VscFile,
  VscFolder,
  VscFolderOpened,
  VscGear,
  VscPackage,
} from "react-icons/vsc";

interface SidebarProps {
  activeFile: string;
  onFileSelect: (file: string) => void;
}

export default function Sidebar({ activeFile, onFileSelect }: SidebarProps) {
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
      <div className="flex-1 overflow-y-auto">
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
    </div>
  );
}
