# Portfolio Website

A modern portfolio website built with Next.js that mimics a code editor interface.

## Features

- **Code Editor-inspired Design**: Clean, modern interface with dark theme
- **Three-Panel Layout**: File explorer, code editor, and live preview
- **Interactive File System**: Click on files to view different sections
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript Support**: Fully typed for better development experience
- **Customizable**: Easy to modify content and styling

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── Sidebar.tsx          # File explorer sidebar
│   │   ├── CodeEditor.tsx       # Main code editor view
│   │   └── PreviewPanel.tsx     # Resume preview panel
│   ├── data/
│   │   └── resume.ts           # Resume data and types
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx               # Main page component
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Customization

### Updating Resume Data

Edit the `app/data/resume.ts` file to update your personal information, experience, education, skills, and projects.

### Styling

The project uses Tailwind CSS with custom colors defined in `tailwind.config.js`. You can customize:

- Colors in the `colors` section
- Fonts in the `fontFamily` section
- Additional utilities as needed

### Adding New Files

To add new files to the sidebar:

1. Update the `files` array in `app/components/Sidebar.tsx`
2. Add a new case in the `renderFileContent` function in `app/components/CodeEditor.tsx`

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Beautiful icon library

## License

This project is open source and available under the [MIT License](LICENSE).
