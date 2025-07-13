"use client";

import { resume } from "../data/resume";
import {
  FiMail,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
} from "react-icons/fi";

export default function PreviewPanel() {
  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="p-[10px] border-b border-border-color flex-shrink-0 bg-panel-bg">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-text-primary/70">
          Preview
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto bg-editor-bg text-text-primary min-h-0">
        <div className="max-w-3xl mx-auto p-8 space-y-5">
          {/* Header */}
          <div className="text-center border-b border-border-color pb-6">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {resume.name}
            </h1>
            <p className="text-lg text-text-primary/80 mb-4">{resume.role}</p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-primary/70">
              <a
                href={`mailto:${resume.email}`}
                className="flex items-center gap-1 hover:text-text-keyword transition-colors"
              >
                <FiMail size={14} />
                <span>{resume.email}</span>
              </a>
              <div className="flex items-center gap-1">
                <FiMapPin size={14} />
                <span>Arlington, TX</span>
              </div>
              <a
                href={`https://${resume.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-text-keyword transition-colors"
              >
                <FiGithub size={14} />
                <span>GitHub</span>
              </a>
              <a
                href={`https://${resume.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-text-keyword transition-colors"
              >
                <FiLinkedin size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Summary */}

          <section>
            <h2 className="text-xl font-semibold text-text-primary">Summary</h2>
            <hr className="h-px my-3 bg-border-color border-0"></hr>
            <p className="text-text-primary/80 leading-relaxed">
              {resume.summary}
            </p>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Education
            </h2>
            <hr className="h-px my-3 bg-border-color border-0"></hr>

            {resume.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium text-text-primary">{edu.degree}</h3>
                <p className="text-text-primary/80">{edu.institution}</p>
                <p className="text-sm text-text-primary/60">{edu.year}</p>
              </div>
            ))}
          </section>
          {/* Skills */}
          <section>
            <h2 className="text-xl font-semibold text-text-primary">Skills</h2>
            <hr className="h-px my-3 bg-border-color border-0"></hr>

            <div className="space-y-3">
              {/* Languages */}
              <div>
                <h3 className="font-medium text-text-primary/90 text-sm mb-2">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.languages.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-panel-bg text-text-primary/80 text-xs rounded border border-border-color"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              <div>
                <h3 className="font-medium text-text-primary/90 text-sm mb-2">
                  Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.frameworks.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-panel-bg text-text-primary/80 text-xs rounded border border-border-color"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech/Tools */}
              <div>
                <h3 className="font-medium text-text-primary/90 text-sm mb-2">
                  Tech/Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.techTools.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-panel-bg text-text-primary/80 text-xs rounded border border-border-color"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Projects */}
          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Projects
            </h2>
            <hr className="h-px my-3 bg-border-color border-0"></hr>

            {resume.projects.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-text-primary">
                    {project.name}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-text-keyword hover:text-text-keyword/80 text-sm"
                    >
                      <FiExternalLink size={12} />
                      <span>View</span>
                    </a>
                  )}
                </div>
                <p className="text-text-primary/80 text-sm leading-relaxed mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-panel-bg text-text-primary/80 text-xs rounded border border-border-color"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Experience
            </h2>
            <hr className="h-px my-3 bg-border-color border-0"></hr>
            {resume.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="mb-1">
                    <h3 className="font-medium text-text-primary">
                      {exp.title}
                    </h3>
                    <p className=" text-sm text-text-primary/80">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs text-text-primary/60">
                    {exp.period}
                  </span>
                </div>
                <p className="text-text-primary/80 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>

          {/* Leadership */}
          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Leadership & Involvement
            </h2>
            <hr className="h-px my-3 bg-border-color border-0"></hr>

            {resume.leadership.map((item, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="mb-1">
                    <h3 className="font-medium text-text-primary">
                      {item.organization}
                    </h3>
                    <p className="text-text-primary/80 text-xs">{item.role}</p>
                  </div>
                  <span className="text-xs text-text-primary/60">
                    {item.period}
                  </span>
                </div>
                <p className="text-text-primary/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
