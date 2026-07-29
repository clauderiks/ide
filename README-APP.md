# 📱 Google AI Studio App

A modern, interactive web application built with **React**, **Vite**, and **Google's Gemini AI** to create a feature-rich dashboard for GitHub repository management, terminal simulation, configuration generation, telemetry monitoring, and community engagement.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-19.0.1-61dafb.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0-brightgreen.svg)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Configuration](#-configuration)
- [Components Overview](#-components-overview)
- [Environment Variables](#-environment-variables)
- [Build & Deployment](#-build--deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🎯 Overview

This application provides a comprehensive dashboard interface for managing GitHub operations with an integrated terminal simulator, configuration generator, real-time telemetry, and community features. Built with the latest modern web technologies for optimal performance and user experience.

**Target Users:**
- GitHub developers and teams
- DevOps engineers
- Project managers tracking development workflows
- Community forum moderators

---

## ✨ Features

### 🔐 Core Features

| Feature | Description |
|---------|-------------|
| **README Viewer** | Display rich markdown documentation with syntax highlighting |
| **Terminal Simulator** | Interactive terminal emulator for command execution and visualization |
| **Configuration Generator** | Visual YAML/JSON configuration builder with real-time validation |
| **Telemetry Dashboard** | Real-time monitoring of system performance, API calls, and cloud sync status |
| **API Sandbox** | Interactive API testing environment with request/response visualization |
| **Security & Backup** | Advanced security settings, 2FA setup, and automated backup management |
| **Community Forum** | Engagement platform for discussions, feature requests, and support |

### 🎨 User Experience Features

- **Multi-language Support**: English, Vietnamese, Japanese, Spanish
- **Theme Modes**: Dark mode, OLED mode, Light mode (with future light theme support)
- **Real-time Cloud Sync**: Automatic configuration synchronization indicator
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Keyboard Navigation**: Vim-style and standard keyboard shortcuts
- **Dark Theme by Default**: IBM Carbon UI-inspired dark interface

### 🔄 Advanced Features

- Cloud synchronization status monitoring
- Push and email notification preferences
- Preferences modal for customization
- Persistent state management
- Real-time data refresh capabilities

---

## 🛠 Tech Stack

### Frontend
- **React 19.0.1** - UI library with latest hooks and features
- **Vite 6.2.3** - Next-generation build tool for fast development
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Motion 12.23.24** - Animation library for smooth transitions

### AI & Data
- **Google Gemini AI (@google/genai 2.4.0)** - Advanced AI capabilities
- **React Markdown** - Markdown rendering with syntax highlighting
- **Recharts 3.10.1** - Data visualization library

### Development Tools
- **Express 4.21.2** - Backend server runtime
- **tsx** - TypeScript executor
- **esbuild 0.25.0** - JavaScript bundler
- **Autoprefixer** - CSS vendor prefixing

### Additional Libraries
- **lucide-react** - Icon library
- **remark-gfm** - GitHub Flavored Markdown support
- **dotenv** - Environment variable management

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.tsx                 # Main navigation header
│   │   ├── ReadmeViewer.tsx          # Markdown documentation viewer
│   │   ├── TerminalSimulator.tsx     # Terminal emulator
│   │   ├── ConfigGenerator.tsx       # Configuration builder UI
│   │   ├── TelemetryDashboard.tsx    # Real-time monitoring
│   │   ├── ApiSandbox.tsx            # API testing environment
│   │   ├── SecurityAndBackup.tsx     # Security settings
│   │   ├── CommunityForum.tsx        # Community engagement
│   │   └── PreferencesModal.tsx      # User preferences
│   ├── App.tsx                        # Main application component
│   ├── main.tsx                       # React entry point
│   ├── index.css                      # Global styles
│   └── types/                         # TypeScript type definitions
├── docs/                              # Astro documentation site
├── public/                            # Static assets
├── index.html                         # HTML entry point
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── package.json                       # Dependencies
├── .env.example                       # Environment variables template
└── README.md                          # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0
- **npm** or **yarn** or **pnpm** (recommended)
- **Google AI API Key** (for Gemini integration)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/clauderiks/ide.git
   cd ide
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your Google AI credentials:
   ```env
   VITE_GOOGLE_AI_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

---

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Type-check TypeScript without building
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview

# Clean build artifacts
npm run clean
```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Google AI Configuration
VITE_GOOGLE_AI_API_KEY=sk-xxx...

# Server Configuration (optional)
VITE_API_ENDPOINT=http://localhost:3000/api

# Feature Flags
VITE_ENABLE_TELEMETRY=true
VITE_ENABLE_CLOUD_SYNC=true
```

### Vite Configuration

Configuration is handled in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
})
```

### Tailwind CSS

Customize styles in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
    },
  },
  plugins: [],
}
```

---

## 🧩 Components Overview

### Header (`components/Header.tsx`)
Main navigation bar with:
- Tab navigation (README, Terminal, Config, etc.)
- Language selector (EN, VI, JA, ES)
- Theme switcher (Dark, OLED, Light)
- Cloud sync status indicator
- Alerts button

### ReadmeViewer (`components/ReadmeViewer.tsx`)
- Markdown rendering with syntax highlighting
- Language-based content switching
- Responsive layout with proper typography

### TerminalSimulator (`components/TerminalSimulator.tsx`)
- Interactive terminal emulation
- Command history
- Output rendering
- Copy/paste support

### ConfigGenerator (`components/ConfigGenerator.tsx`)
- YAML/JSON configuration builder
- Real-time validation
- Copy configuration to clipboard
- Theme customization preview

### TelemetryDashboard (`components/TelemetryDashboard.tsx`)
- Real-time metrics visualization
- Performance monitoring
- API call tracking
- Cloud sync status

### ApiSandbox (`components/ApiSandbox.tsx`)
- HTTP request builder
- Response viewer
- Code snippet generation
- Request history

### SecurityAndBackup (`components/SecurityAndBackup.tsx`)
- 2FA setup instructions
- Backup configuration
- Security status
- Recovery procedures

### CommunityForum (`components/CommunityForum.tsx`)
- Discussion threads
- Feature request voting
- Community guidelines
- Support resources

### PreferencesModal (`components/PreferencesModal.tsx`)
- Email notification settings
- Push notification preferences
- Privacy settings

---

## 🌐 Environment Variables

### Required Variables
- `VITE_GOOGLE_AI_API_KEY` - Your Google AI API key

### Optional Variables
- `VITE_API_ENDPOINT` - Custom API endpoint (defaults to localhost:3000)
- `VITE_ENABLE_TELEMETRY` - Enable telemetry (defaults to true)
- `VITE_ENABLE_CLOUD_SYNC` - Enable cloud sync (defaults to true)

---

## 🏗 Build & Deployment

### Development Build
```bash
npm run build
npm run preview
```

### Production Deployment

#### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Option 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

#### Option 3: GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/clauderiks/ide.git
   cd ide
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes locally

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request**
   - Provide clear description of changes
   - Link related issues
   - Ensure all tests pass

### Code Style Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components focused and reusable
- Add JSDoc comments for complex functions

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: Build fails with "module not found"
**Solution:** 
```bash
rm -rf node_modules
npm install
```

#### Issue: Port 3000 already in use
**Solution:**
```bash
npm run dev -- --port 3001
```

#### Issue: Google AI API returns 401 error
**Solution:**
- Check if `VITE_GOOGLE_AI_API_KEY` is correctly set
- Verify API key permissions in Google Cloud Console
- Regenerate API key if needed

#### Issue: Styles not applying
**Solution:**
- Rebuild Tailwind CSS: `npm run build`
- Clear browser cache (Ctrl+Shift+Delete)
- Check `tailwind.config.js` for proper configuration

### Debug Mode

Enable detailed logging:
```bash
DEBUG=* npm run dev
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE.txt) file for details.

---

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Gemini API](https://ai.google.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👥 Authors & Contributors

- **Claude Riks** - Initial development
- Community contributors welcome!

---

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/clauderiks/ide/issues)
- Join discussions on [GitHub Discussions](https://github.com/clauderiks/ide/discussions)
- Check [Troubleshooting Guide](#-troubleshooting)

---

## 🎉 Acknowledgments

- Google AI for Gemini API
- React team for amazing framework
- Vite for incredible build tool
- Tailwind CSS for utility-first styling
- All contributors and community members

---

**Made with ❤️ by the IDE Community**

Last updated: July 28, 2024
