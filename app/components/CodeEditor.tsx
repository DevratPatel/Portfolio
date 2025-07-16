"use client";

import React, { useState, useEffect } from "react";
import { resume } from "../data/resume";
import {
  VscChromeClose,
  VscTerminalBash,
  VscClose,
  VscJson,
  VscFile,
  VscChevronUp,
} from "react-icons/vsc";
import Terminal from "./Terminal";
import UnifiedTerminal from "./UnifiedTerminal";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiCss3,
  SiMarkdown,
} from "react-icons/si";

interface CodeEditorProps {
  openFiles: string[];
  activeFile: string;
  onCloseFile: (file: string) => void;
  onFileSelect: (file: string) => void;
  isTerminalVisible: boolean;
  terminalHeight: number;
  onToggleTerminal: () => void;
  onTerminalHeightChange: (height: number) => void;
  isMobile?: boolean;
  inputFocus: "terminal" | "notepad" | null;
  onInputFocusChange: (focus: "terminal" | "notepad" | null) => void;
}

export default function CodeEditor({
  openFiles,
  activeFile,
  onCloseFile,
  onFileSelect,
  isTerminalVisible,
  terminalHeight,
  onToggleTerminal,
  onTerminalHeightChange,
  isMobile = false,
  inputFocus,
  onInputFocusChange,
}: CodeEditorProps) {
  const [showEditMessage, setShowEditMessage] = useState(false);

  // Handle terminal keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        onToggleTerminal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onToggleTerminal]);

  // Handle click on editor content
  const handleEditorClick = () => {
    // Only show message if there's actual file content (not welcome screen)
    if (openFiles.length > 0) {
      setShowEditMessage(true);
      setTimeout(() => setShowEditMessage(false), 5000);
    }
  };

  // Handle manual dismissal of the message
  const handleDismissMessage = () => {
    setShowEditMessage(false);
  };

  // Auto-hide message after 5 seconds
  useEffect(() => {
    if (showEditMessage) {
      const timer = setTimeout(() => setShowEditMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showEditMessage]);

  const renderFileContent = () => {
    const fileName = activeFile.split("/").pop() || "";
    const fileExtension = fileName.split(".").pop() || "";

    switch (activeFile) {
      case "app/data/education.ts":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// app/data/education.ts</div>
            <div className="mt-2">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">interface</span>{" "}
              <span className="code-class">Education</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">degree</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">institution</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">year</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-property">education</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-class">Education</span>
              <span className="code-punctuation">[</span>
              <span className="code-punctuation">]</span>{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-punctuation">[</span>
            </div>
            <div className="ml-4">
              {resume.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div>
                    <span className="code-punctuation">{"{"}</span>
                  </div>
                  <div className="ml-4">
                    <div>
                      <span className="code-property">degree</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{edu.degree}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">institution</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{edu.institution}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">year</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{edu.year}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                  </div>
                  <div>
                    <span className="code-punctuation">{"}"}</span>
                    {index < resume.education.length - 1 && (
                      <span className="code-punctuation">,</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <span className="code-punctuation">]</span>
              <span className="code-punctuation">;</span>
            </div>
          </div>
        );

      case "app/data/skills.ts":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// app/data/skills.ts</div>
            <div className="mt-2">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-property">skills</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">languages</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">[</span>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">frameworks</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">[</span>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">techTools</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">[</span>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              {/* Languages */}
              <div>
                <span className="code-property">languages</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">[</span>
              </div>
              <div className="ml-4">
                {resume.skills.languages.map((skill, index) => (
                  <div key={index}>
                    <span className="code-string">"{skill}"</span>
                    {index < resume.skills.languages.length - 1 && (
                      <span className="code-punctuation">,</span>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">,</span>
              </div>

              {/* Frameworks */}
              <div>
                <span className="code-property">frameworks</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">[</span>
              </div>
              <div className="ml-4">
                {resume.skills.frameworks.map((skill, index) => (
                  <div key={index}>
                    <span className="code-string">"{skill}"</span>
                    {index < resume.skills.frameworks.length - 1 && (
                      <span className="code-punctuation">,</span>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">,</span>
              </div>

              {/* Tech Tools */}
              <div>
                <span className="code-property">techTools</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">[</span>
              </div>
              <div className="ml-4">
                {resume.skills.techTools.map((skill, index) => (
                  <div key={index}>
                    <span className="code-string">"{skill}"</span>
                    {index < resume.skills.techTools.length - 1 && (
                      <span className="code-punctuation">,</span>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <span className="code-punctuation">]</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
              <span className="code-punctuation">;</span>
            </div>
          </div>
        );

      case "app/data/experience.ts":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// app/data/experience.ts</div>
            <div className="mt-2">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">interface</span>{" "}
              <span className="code-class">Experience</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">title</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">company</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">period</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">description</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-property">experience</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-class">Experience</span>
              <span className="code-punctuation">[</span>
              <span className="code-punctuation">]</span>{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-punctuation">[</span>
            </div>
            <div className="ml-4">
              {resume.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div>
                    <span className="code-punctuation">{"{"}</span>
                  </div>
                  <div className="ml-4">
                    <div>
                      <span className="code-property">title</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{exp.title}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">company</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{exp.company}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">period</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{exp.period}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">description</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{exp.description}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                  </div>
                  <div>
                    <span className="code-punctuation">{"}"}</span>
                    {index < resume.experience.length - 1 && (
                      <span className="code-punctuation">,</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <span className="code-punctuation">]</span>
              <span className="code-punctuation">;</span>
            </div>
          </div>
        );

      case "app/data/projects.ts":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// app/data/projects.ts</div>
            <div className="mt-2">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">interface</span>{" "}
              <span className="code-class">Project</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">name</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">description</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">technologies</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">[</span>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">link</span>
                <span className="code-punctuation">?:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">githubUrl</span>
                <span className="code-punctuation">?:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">status</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-string">'completed'</span>{" "}
                <span className="code-punctuation">|</span>{" "}
                <span className="code-string">'in-progress'</span>{" "}
                <span className="code-punctuation">|</span>{" "}
                <span className="code-string">'planned'</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-property">projects</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-class">Project</span>
              <span className="code-punctuation">[</span>
              <span className="code-punctuation">]</span>{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-punctuation">[</span>
            </div>
            <div className="ml-4">
              {resume.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <div>
                    <span className="code-punctuation">{"{"}</span>
                  </div>
                  <div className="ml-4">
                    <div>
                      <span className="code-property">name</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{project.name}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">description</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">
                        "{project.description}"
                      </span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">technologies</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-punctuation">[</span>
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex}>
                          <span className="code-string">"{tech}"</span>
                          {techIndex < project.technologies.length - 1 && (
                            <span className="code-punctuation">, </span>
                          )}
                        </span>
                      ))}
                      <span className="code-punctuation">]</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">status</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">'completed'</span>
                      <span className="code-punctuation">,</span>
                    </div>
                  </div>
                  <div>
                    <span className="code-punctuation">{"}"}</span>
                    {index < resume.projects.length - 1 && (
                      <span className="code-punctuation">,</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <span className="code-punctuation">]</span>
              <span className="code-punctuation">;</span>
            </div>
          </div>
        );

      case "app/data/leadership.ts":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// app/data/leadership.ts</div>
            <div className="mt-2">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">interface</span>{" "}
              <span className="code-class">Leadership</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">organization</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">role</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">period</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">description</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">;</span>
              </div>
              <div>
                <span className="code-property">achievements</span>
                <span className="code-punctuation">?:</span>{" "}
                <span className="code-keyword">string</span>
                <span className="code-punctuation">[</span>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-property">leadership</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-class">Leadership</span>
              <span className="code-punctuation">[</span>
              <span className="code-punctuation">]</span>{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-punctuation">[</span>
            </div>
            <div className="ml-4">
              {resume.leadership.map((leadership, index) => (
                <div key={index} className="mb-4">
                  <div>
                    <span className="code-punctuation">{"{"}</span>
                  </div>
                  <div className="ml-4">
                    <div>
                      <span className="code-property">organization</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">
                        "{leadership.organization}"
                      </span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">role</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{leadership.role}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">period</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">"{leadership.period}"</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">description</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">
                        "{leadership.description}"
                      </span>
                      <span className="code-punctuation">,</span>
                    </div>
                  </div>
                  <div>
                    <span className="code-punctuation">{"}"}</span>
                    {index < resume.leadership.length - 1 && (
                      <span className="code-punctuation">,</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <span className="code-punctuation">]</span>
              <span className="code-punctuation">;</span>
            </div>
          </div>
        );

      case "app/components/Header.tsx":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">
              // app/components/Header.tsx
            </div>
            <div className="mt-2">
              <span className="code-keyword">import</span>{" "}
              <span className="code-class">React</span>{" "}
              <span className="code-keyword">from</span>{" "}
              <span className="code-string">'react'</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-keyword">import</span>{" "}
              <span className="code-punctuation">{"{"}</span>{" "}
              <span className="code-property">FiGithub</span>
              <span className="code-punctuation">,</span>{" "}
              <span className="code-property">FiLinkedin</span>
              <span className="code-punctuation">,</span>{" "}
              <span className="code-property">FiMail</span>{" "}
              <span className="code-punctuation">{"}"}</span>{" "}
              <span className="code-keyword">from</span>{" "}
              <span className="code-string">'react-icons/fi'</span>
              <span className="code-punctuation">;</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">default</span>{" "}
              <span className="code-keyword">function</span>{" "}
              <span className="code-function">Header</span>
              <span className="code-punctuation">(</span>
              <span className="code-punctuation">)</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-keyword">return</span>{" "}
                <span className="code-punctuation">(</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-punctuation">&lt;</span>
                  <span className="code-keyword">header</span>{" "}
                  <span className="code-property">className</span>
                  <span className="code-punctuation">=</span>
                  <span className="code-string">
                    "bg-panel-bg border-b border-border-color p-4"
                  </span>
                  <span className="code-punctuation">&gt;</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="code-punctuation">&lt;</span>
                    <span className="code-keyword">div</span>{" "}
                    <span className="code-property">className</span>
                    <span className="code-punctuation">=</span>
                    <span className="code-string">
                      "flex justify-between items-center"
                    </span>
                    <span className="code-punctuation">&gt;</span>
                  </div>
                  <div className="ml-4">
                    <div>
                      <span className="code-punctuation">&lt;</span>
                      <span className="code-keyword">h1</span>{" "}
                      <span className="code-property">className</span>
                      <span className="code-punctuation">=</span>
                      <span className="code-string">
                        "text-2xl font-bold text-text-primary"
                      </span>
                      <span className="code-punctuation">&gt;</span>
                    </div>
                    <div className="ml-4">
                      <span className="code-string">Devrat Patel</span>
                    </div>
                    <div>
                      <span className="code-punctuation">&lt;/</span>
                      <span className="code-keyword">h1</span>
                      <span className="code-punctuation">&gt;</span>
                    </div>
                    <div>
                      <span className="code-punctuation">&lt;</span>
                      <span className="code-keyword">div</span>{" "}
                      <span className="code-property">className</span>
                      <span className="code-punctuation">=</span>
                      <span className="code-string">"flex gap-4"</span>
                      <span className="code-punctuation">&gt;</span>
                    </div>
                    <div className="ml-4">
                      <div>
                        <span className="code-comment">
                          // Social links with icons
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="code-punctuation">&lt;/</span>
                      <span className="code-keyword">div</span>
                      <span className="code-punctuation">&gt;</span>
                    </div>
                  </div>
                  <div>
                    <span className="code-punctuation">&lt;/</span>
                    <span className="code-keyword">div</span>
                    <span className="code-punctuation">&gt;</span>
                  </div>
                </div>
                <div>
                  <span className="code-punctuation">&lt;/</span>
                  <span className="code-keyword">header</span>
                  <span className="code-punctuation">&gt;</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">)</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
          </div>
        );

      case "app/components/Footer.tsx":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">
              // app/components/Footer.tsx
            </div>
            <div className="mt-2">
              <span className="code-keyword">import</span>{" "}
              <span className="code-class">React</span>{" "}
              <span className="code-keyword">from</span>{" "}
              <span className="code-string">'react'</span>
              <span className="code-punctuation">;</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">default</span>{" "}
              <span className="code-keyword">function</span>{" "}
              <span className="code-function">Footer</span>
              <span className="code-punctuation">(</span>
              <span className="code-punctuation">)</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-keyword">return</span>{" "}
                <span className="code-punctuation">(</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-punctuation">&lt;</span>
                  <span className="code-keyword">footer</span>{" "}
                  <span className="code-property">className</span>
                  <span className="code-punctuation">=</span>
                  <span className="code-string">
                    "bg-panel-bg border-t border-border-color p-4 text-center"
                  </span>
                  <span className="code-punctuation">&gt;</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="code-punctuation">&lt;</span>
                    <span className="code-keyword">p</span>{" "}
                    <span className="code-property">className</span>
                    <span className="code-punctuation">=</span>
                    <span className="code-string">"text-text-secondary"</span>
                    <span className="code-punctuation">&gt;</span>
                  </div>
                  <div className="ml-4">
                    <span className="code-string">
                      © 2024 Devrat Patel. Built with Next.js & TypeScript.
                    </span>
                  </div>
                  <div>
                    <span className="code-punctuation">&lt;/</span>
                    <span className="code-keyword">p</span>
                    <span className="code-punctuation">&gt;</span>
                  </div>
                </div>
                <div>
                  <span className="code-punctuation">&lt;/</span>
                  <span className="code-keyword">footer</span>
                  <span className="code-punctuation">&gt;</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">)</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
          </div>
        );

      case "app/components/Portfolio.tsx":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">
              // app/components/Portfolio.tsx
            </div>
            <div className="mt-2">
              <span className="code-keyword">import</span>{" "}
              <span className="code-class">React</span>{" "}
              <span className="code-keyword">from</span>{" "}
              <span className="code-string">'react'</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-keyword">import</span>{" "}
              <span className="code-punctuation">{"{"}</span>{" "}
              <span className="code-property">resume</span>{" "}
              <span className="code-punctuation">{"}"}</span>{" "}
              <span className="code-keyword">from</span>{" "}
              <span className="code-string">'../data/resume'</span>
              <span className="code-punctuation">;</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">default</span>{" "}
              <span className="code-keyword">function</span>{" "}
              <span className="code-function">Portfolio</span>
              <span className="code-punctuation">(</span>
              <span className="code-punctuation">)</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-keyword">return</span>{" "}
                <span className="code-punctuation">(</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-punctuation">&lt;</span>
                  <span className="code-keyword">div</span>{" "}
                  <span className="code-property">className</span>
                  <span className="code-punctuation">=</span>
                  <span className="code-string">"portfolio-container"</span>
                  <span className="code-punctuation">&gt;</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="code-punctuation">&lt;</span>
                    <span className="code-keyword">h1</span>
                    <span className="code-punctuation">&gt;</span>
                    <span className="code-string">{resume.name}</span>
                    <span className="code-punctuation">&lt;/</span>
                    <span className="code-keyword">h1</span>
                    <span className="code-punctuation">&gt;</span>
                  </div>
                  <div>
                    <span className="code-punctuation">&lt;</span>
                    <span className="code-keyword">h2</span>
                    <span className="code-punctuation">&gt;</span>
                    <span className="code-string">{resume.role}</span>
                    <span className="code-punctuation">&lt;/</span>
                    <span className="code-keyword">h2</span>
                    <span className="code-punctuation">&gt;</span>
                  </div>
                  <div>
                    <span className="code-comment">
                      // Experience, Projects, Skills sections
                    </span>
                  </div>
                </div>
                <div>
                  <span className="code-punctuation">&lt;/</span>
                  <span className="code-keyword">div</span>
                  <span className="code-punctuation">&gt;</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">)</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
          </div>
        );

      case "app/page.tsx":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// app/page.tsx</div>
            <div className="mt-2">
              <span className="code-keyword">import</span>{" "}
              <span className="code-class">Portfolio</span>{" "}
              <span className="code-keyword">from</span>{" "}
              <span className="code-string">'./components/Portfolio'</span>
              <span className="code-punctuation">;</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">default</span>{" "}
              <span className="code-keyword">function</span>{" "}
              <span className="code-function">Home</span>
              <span className="code-punctuation">(</span>
              <span className="code-punctuation">)</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-keyword">return</span>{" "}
                <span className="code-punctuation">(</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-punctuation">&lt;</span>
                  <span className="code-keyword">main</span>{" "}
                  <span className="code-property">className</span>
                  <span className="code-punctuation">=</span>
                  <span className="code-string">
                    "min-h-screen bg-editor-bg"
                  </span>
                  <span className="code-punctuation">&gt;</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="code-punctuation">&lt;</span>
                    <span className="code-class">Portfolio</span>{" "}
                    <span className="code-punctuation">/&gt;</span>
                  </div>
                </div>
                <div>
                  <span className="code-punctuation">&lt;/</span>
                  <span className="code-keyword">main</span>
                  <span className="code-punctuation">&gt;</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">)</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
          </div>
        );

      case "app/layout.tsx":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// app/layout.tsx</div>
            <div className="mt-2">
              <span className="code-keyword">import</span>{" "}
              <span className="code-keyword">type</span>{" "}
              <span className="code-punctuation">{"{"}</span>{" "}
              <span className="code-class">Metadata</span>{" "}
              <span className="code-punctuation">{"}"}</span>{" "}
              <span className="code-keyword">from</span>{" "}
              <span className="code-string">'next'</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-keyword">import</span>{" "}
              <span className="code-string">'./globals.css'</span>
              <span className="code-punctuation">;</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">const</span>{" "}
              <span className="code-property">metadata</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-class">Metadata</span>{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">title</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-string">
                  'Devrat Patel - Full Stack Developer'
                </span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">description</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-string">
                  'Computer Science student at UT Arlington with experience in
                  full-stack development'
                </span>
                <span className="code-punctuation">,</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
              <span className="code-punctuation">;</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">export</span>{" "}
              <span className="code-keyword">default</span>{" "}
              <span className="code-keyword">function</span>{" "}
              <span className="code-function">RootLayout</span>
              <span className="code-punctuation">(</span>
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">children</span>
                <span className="code-punctuation">,</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">children</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-class">React</span>
                <span className="code-punctuation">.</span>
                <span className="code-class">ReactNode</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
              <span className="code-punctuation">)</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-keyword">return</span>{" "}
                <span className="code-punctuation">(</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-punctuation">&lt;</span>
                  <span className="code-keyword">html</span>{" "}
                  <span className="code-property">lang</span>
                  <span className="code-punctuation">=</span>
                  <span className="code-string">"en"</span>
                  <span className="code-punctuation">&gt;</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="code-punctuation">&lt;</span>
                    <span className="code-keyword">body</span>
                    <span className="code-punctuation">&gt;</span>
                    <span className="code-punctuation">{"{"}</span>
                    <span className="code-property">children</span>
                    <span className="code-punctuation">{"}"}</span>
                    <span className="code-punctuation">&lt;/</span>
                    <span className="code-keyword">body</span>
                    <span className="code-punctuation">&gt;</span>
                  </div>
                </div>
                <div>
                  <span className="code-punctuation">&lt;/</span>
                  <span className="code-keyword">html</span>
                  <span className="code-punctuation">&gt;</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">)</span>
                <span className="code-punctuation">;</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
          </div>
        );

      case "app/globals.css":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">/* app/globals.css */</div>
            <div className="mt-2">
              <span className="code-keyword">@tailwind</span>{" "}
              <span className="code-property">base</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-keyword">@tailwind</span>{" "}
              <span className="code-property">components</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-keyword">@tailwind</span>{" "}
              <span className="code-property">utilities</span>
              <span className="code-punctuation">;</span>
            </div>
            <div className="mt-4">
              <span className="code-comment">
                /* Custom code editor syntax highlighting */
              </span>
            </div>
            <div>
              <span className="code-selector">.code-keyword</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <span className="code-property">color</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-string">#c586c0</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
            <div className="mt-2">
              <span className="code-selector">.code-string</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <span className="code-property">color</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-string">#ce9178</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
            <div className="mt-2">
              <span className="code-selector">.code-function</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <span className="code-property">color</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-string">#dcdcaa</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
            <div className="mt-2">
              <span className="code-selector">.code-class</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <span className="code-property">color</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-string">#4ec9b0</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
            <div className="mt-2">
              <span className="code-comment">
                /* Custom scrollbar styling */
              </span>
            </div>
            <div>
              <span className="code-selector">::-webkit-scrollbar</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <span className="code-property">width</span>
              <span className="code-punctuation">:</span>{" "}
              <span className="code-string">12px</span>
              <span className="code-punctuation">;</span>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
          </div>
        );

      case "package.json":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// package.json</div>
            <div className="mt-2">
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">"name"</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-string">"devrat-portfolio"</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">"version"</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-string">"0.1.0"</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">"private"</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">true</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">"scripts"</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">{"{"}</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-property">"dev"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"next dev"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"build"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"next build"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"start"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"next start"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"lint"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"next lint"</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">{"}"}</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">"dependencies"</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">{"{"}</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-property">"next"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"14.0.0"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"react"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"^18"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"react-dom"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"^18"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"react-icons"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"^4.11.0"</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">{"}"}</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">"devDependencies"</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">{"{"}</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-property">"@types/node"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"^20"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"@types/react"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"^18"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"@types/react-dom"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"^18"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"tailwindcss"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"^3.3.0"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"typescript"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"^5"</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">{"}"}</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
          </div>
        );

      case "tailwind.config.js":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// tailwind.config.js</div>
            <div className="mt-2">
              <span className="code-keyword">module</span>
              <span className="code-punctuation">.</span>
              <span className="code-property">exports</span>{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">content</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">[</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-string">
                    './pages/**/*.{"{"}js,ts,jsx,tsx,mdx{"}"}'
                  </span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-string">
                    './components/**/*.{"{"}js,ts,jsx,tsx,mdx{"}"}'
                  </span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-string">
                    './app/**/*.{"{"}js,ts,jsx,tsx,mdx{"}"}'
                  </span>
                  <span className="code-punctuation">,</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">theme</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">{"{"}</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-property">extend</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-punctuation">{"{"}</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="code-property">colors</span>
                    <span className="code-punctuation">:</span>{" "}
                    <span className="code-punctuation">{"{"}</span>
                  </div>
                  <div className="ml-4">
                    <div>
                      <span className="code-property">'editor-bg'</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">'#1e1e1e'</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">'panel-bg'</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">'#252526'</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">'border-color'</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">'#3e3e42'</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">'text-primary'</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">'#cccccc'</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">'text-secondary'</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">'#6a9955'</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">'text-keyword'</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">'#569cd6'</span>
                      <span className="code-punctuation">,</span>
                    </div>
                    <div>
                      <span className="code-property">'active-tab'</span>
                      <span className="code-punctuation">:</span>{" "}
                      <span className="code-string">'#1e1e1e'</span>
                    </div>
                  </div>
                  <div>
                    <span className="code-punctuation">{"}"}</span>
                  </div>
                </div>
                <div>
                  <span className="code-punctuation">{"}"}</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">{"}"}</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">plugins</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">[</span>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">,</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
          </div>
        );

      case "tsconfig.json":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// tsconfig.json</div>
            <div className="mt-2">
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">"compilerOptions"</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">{"{"}</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-property">"target"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"es5"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"lib"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-punctuation">[</span>
                  <span className="code-string">"dom"</span>
                  <span className="code-punctuation">,</span>{" "}
                  <span className="code-string">"dom.iterable"</span>
                  <span className="code-punctuation">,</span>{" "}
                  <span className="code-string">"es6"</span>
                  <span className="code-punctuation">]</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"allowJs"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-keyword">true</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"skipLibCheck"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-keyword">true</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"strict"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-keyword">true</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"noEmit"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-keyword">true</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"esModuleInterop"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-keyword">true</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"module"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"esnext"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"moduleResolution"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"bundler"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"resolveJsonModule"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-keyword">true</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"isolatedModules"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-keyword">true</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"jsx"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"preserve"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"incremental"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-keyword">true</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"plugins"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-punctuation">[</span>
                  <span className="code-punctuation">{"{"}</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="code-property">"name"</span>
                    <span className="code-punctuation">:</span>{" "}
                    <span className="code-string">"next"</span>
                  </div>
                </div>
                <div>
                  <span className="code-punctuation">{"}"}</span>
                  <span className="code-punctuation">]</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"baseUrl"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-string">"."</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div>
                  <span className="code-property">"paths"</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-punctuation">{"{"}</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="code-property">"@/*"</span>
                    <span className="code-punctuation">:</span>{" "}
                    <span className="code-punctuation">[</span>
                    <span className="code-string">"./*"</span>
                    <span className="code-punctuation">]</span>
                  </div>
                </div>
                <div>
                  <span className="code-punctuation">{"}"}</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">{"}"}</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">"include"</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">[</span>
                <span className="code-string">"next-env.d.ts"</span>
                <span className="code-punctuation">,</span>{" "}
                <span className="code-string">"**/*.ts"</span>
                <span className="code-punctuation">,</span>{" "}
                <span className="code-string">"**/*.tsx"</span>
                <span className="code-punctuation">,</span>{" "}
                <span className="code-string">".next/types/**/*.ts"</span>
                <span className="code-punctuation">]</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">"exclude"</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">[</span>
                <span className="code-string">"node_modules"</span>
                <span className="code-punctuation">]</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
          </div>
        );

      case "next.config.js":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">// next.config.js</div>
            <div className="mt-2">
              <span className="code-comment">
                /** @type {"{"}import('next').NextConfig{"}"} */
              </span>
            </div>
            <div>
              <span className="code-keyword">const</span>{" "}
              <span className="code-property">nextConfig</span>{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="ml-4">
              <div>
                <span className="code-property">experimental</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">{"{"}</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-property">appDir</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-keyword">true</span>
                  <span className="code-punctuation">,</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">{"}"}</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">images</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-punctuation">{"{"}</span>
              </div>
              <div className="ml-4">
                <div>
                  <span className="code-property">domains</span>
                  <span className="code-punctuation">:</span>{" "}
                  <span className="code-punctuation">[</span>
                  <span className="code-string">'github.com'</span>
                  <span className="code-punctuation">,</span>{" "}
                  <span className="code-string">
                    'avatars.githubusercontent.com'
                  </span>
                  <span className="code-punctuation">]</span>
                  <span className="code-punctuation">,</span>
                </div>
              </div>
              <div>
                <span className="code-punctuation">{"}"}</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">reactStrictMode</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">true</span>
                <span className="code-punctuation">,</span>
              </div>
              <div>
                <span className="code-property">swcMinify</span>
                <span className="code-punctuation">:</span>{" "}
                <span className="code-keyword">true</span>
                <span className="code-punctuation">,</span>
              </div>
            </div>
            <div>
              <span className="code-punctuation">{"}"}</span>
            </div>
            <div className="mt-4">
              <span className="code-keyword">module</span>
              <span className="code-punctuation">.</span>
              <span className="code-property">exports</span>{" "}
              <span className="code-punctuation">=</span>{" "}
              <span className="code-property">nextConfig</span>
            </div>
          </div>
        );

      case "README.md":
        return (
          <div className="font-mono text-xs leading-relaxed">
            <div className="text-text-secondary">
              # Devrat Patel's Portfolio
            </div>
            <div className="mt-2">
              <span className="text-text-primary">
                A code editor-inspired portfolio website built with Next.js and
                TypeScript.
              </span>
            </div>
            <div className="mt-4">
              <span className="text-text-secondary">## Features</span>
            </div>
            <div className="mt-2">
              <div>
                <span className="text-text-primary">
                  - 🎨 Code editor dark theme UI
                </span>
              </div>
              <div>
                <span className="text-text-primary">
                  - 📱 Fully responsive design
                </span>
              </div>
              <div>
                <span className="text-text-primary">
                  - 🔥 Built with Next.js 14 & TypeScript
                </span>
              </div>
              <div>
                <span className="text-text-primary">
                  - 🎯 Tailwind CSS for styling
                </span>
              </div>
              <div>
                <span className="text-text-primary">
                  - 📂 Interactive file explorer
                </span>
              </div>
              <div>
                <span className="text-text-primary">
                  - 🚀 Fast and optimized
                </span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-text-secondary">## Tech Stack</span>
            </div>
            <div className="mt-2">
              <div>
                <span className="text-text-primary">- Next.js 14</span>
              </div>
              <div>
                <span className="text-text-primary">- TypeScript</span>
              </div>
              <div>
                <span className="text-text-primary">- Tailwind CSS</span>
              </div>
              <div>
                <span className="text-text-primary">- React Icons</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-text-secondary">## Getting Started</span>
            </div>
            <div className="mt-2">
              <div>
                <span className="text-text-primary">```bash</span>
              </div>
              <div>
                <span className="text-text-primary">npm install</span>
              </div>
              <div>
                <span className="text-text-primary">npm run dev</span>
              </div>
              <div>
                <span className="text-text-primary">```</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-text-secondary">## Contact</span>
            </div>
            <div className="mt-2">
              <div>
                <span className="text-text-primary">
                  📧 Email: dvp7189@mavs.uta.edu
                </span>
              </div>
              <div>
                <span className="text-text-primary">
                  🎓 University of Texas at Arlington
                </span>
              </div>
            </div>
          </div>
        );

      case "public/favicon.ico":
        return (
          <div className="font-mono text-xs leading-relaxed text-center py-8">
            <div className="text-text-secondary">📄 favicon.ico</div>
            <div className="mt-4">
              <span className="text-text-primary">
                Binary file - Website favicon
              </span>
            </div>
            <div className="mt-2">
              <span className="text-text-secondary">
                32x32 icon for browser tabs
              </span>
            </div>
          </div>
        );

      case "public/logo.png":
        return (
          <div className="font-mono text-xs leading-relaxed text-center py-8">
            <div className="text-text-secondary">🖼️ logo.png</div>
            <div className="mt-4">
              <span className="text-text-primary">Portfolio logo image</span>
            </div>
            <div className="mt-2">
              <span className="text-text-secondary">
                PNG image - 256x256 pixels
              </span>
            </div>
          </div>
        );

      default:
        return (
          <div className="font-mono text-xs leading-relaxed text-center py-8">
            <div className="text-text-secondary">
              This is Devrat Patel's portfolio. Select a file to view its
              contents.
            </div>
          </div>
        );
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
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

  return (
    <div className="flex flex-col h-full bg-editor-bg code-editor-container">
      {/* Tab Bar - Hidden on mobile when terminal is visible */}
      {!(isMobile && isTerminalVisible) && (
        <div className="flex border-b border-border-color bg-panel-bg overflow-x-auto">
          {openFiles.map((file) => (
            <div
              key={file}
              className={`flex items-center gap-2 px-4 py-2 border-r border-border-color cursor-pointer min-w-0 ${
                activeFile === file
                  ? "bg-editor-bg text-text-primary"
                  : "bg-panel-bg text-text-primary/80 hover:bg-editor-bg/50"
              }`}
              onClick={() => onFileSelect(file)}
            >
              <span className="text-xs">{getFileIcon(file)}</span>
              <span className="text-xs truncate">{file.split("/").pop()}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseFile(file);
                }}
                className="ml-2 p-1 hover:bg-border-color rounded opacity-60 hover:opacity-100"
              >
                <VscChromeClose size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Editor Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Editor content area - Hidden on mobile when terminal is visible */}
        {!(isMobile && isTerminalVisible) && (
          <div
            className="flex-1 overflow-auto p-4 cursor-pointer"
            style={{
              height: isTerminalVisible
                ? `calc(100% - ${terminalHeight}px)`
                : "100%",
            }}
            onClick={handleEditorClick}
          >
            {openFiles.length > 0 ? (
              <div className="pointer-events-none select-none">
                {renderFileContent()}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-text-primary mb-2">
                      Welcome to my portfolio!
                    </h1>
                  </div>

                  <div className="bg-panel-bg border border-border-color rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-text-primary font-medium">
                        Ready to explore
                      </span>
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      👈 Select any file from the explorer to view its contents
                      <br />
                      Browse through my projects, experience, and skills
                    </p>
                  </div>

                  <div className="mt-6 text-xs text-text-secondary/60">
                    <p>💡 Tip: Use Ctrl+` to toggle terminal</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Edit Permission Message - Positioned above terminal */}
        {showEditMessage && !(isMobile && isTerminalVisible) && (
          <div className="bg-panel-bg border-t border-border-color px-4 py-2 flex items-center justify-between text-xs text-text-primary/80 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⚠️</span>
              <span>
                Read-only: You don't have permission to edit Devrat's codebase
              </span>
            </div>
            <button
              onClick={handleDismissMessage}
              className="text-text-primary/60 hover:text-text-primary p-1 hover:bg-border-color rounded transition-colors"
              title="Dismiss message"
            >
              <VscClose size={12} />
            </button>
          </div>
        )}

        {/* Terminal - Hidden on mobile (uses separate MobileTerminal) */}
        {isTerminalVisible && !isMobile && (
          <div className="border-t border-border-color">
            <UnifiedTerminal
              isVisible={true}
              onToggle={onToggleTerminal}
              height={terminalHeight}
              onHeightChange={onTerminalHeightChange}
              inputFocus={inputFocus}
              onInputFocusChange={onInputFocusChange}
              isMobile={false}
            />
          </div>
        )}
      </div>

      {/* Terminal Toggle Section */}
      {!isTerminalVisible && (
        <div className="relative p-2 border-t border-border-color bg-panel-bg">
          <div className="flex items-center gap-2 px-3 py-1 text-xs text-text-primary">
            <VscTerminalBash size={14} />
            <span>Terminal</span>
          </div>

          {/* Up Arrow Button */}
          <button
            onClick={onToggleTerminal}
            className="absolute top-2 right-2 p-1 text-text-primary/60 hover:text-text-primary hover:bg-border-color rounded transition-colors"
            title="Open Terminal (Ctrl+`)"
          >
            <VscChevronUp size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
