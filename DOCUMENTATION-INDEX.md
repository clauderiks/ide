# 📚 Documentation Index

Welcome to the **Google AI Studio App** documentation hub. This file serves as a central reference point for all project documentation.

---

## 📖 Documentation Files Overview

### 1. **README.md** - Original gh-dash Documentation
- **Purpose:** GitHub CLI dashboard project background
- **Contains:** Features, installation, configuration, API reference
- **Audience:** Users wanting to understand the gh-dash project
- **Status:** Reference documentation

### 2. **README-APP.md** ⭐ [START HERE]
- **Purpose:** Complete application guide and setup instructions
- **Contains:** 
  - Overview and features
  - Tech stack breakdown
  - Project structure
  - Getting started guide
  - Configuration instructions
  - Component overview
  - Build & deployment
  - Troubleshooting
- **Audience:** Developers working on this project
- **Recommended Reading:** 20-30 minutes

### 3. **PROJECT-SUMMARY.md** - Technical Deep Dive
- **Purpose:** Comprehensive technical summary
- **Contains:**
  - Project structure
  - Dependency breakdown
  - Build statistics
  - Feature implementation status
  - Development workflow
  - Component architecture
  - Type definitions
- **Audience:** Backend engineers, DevOps, architects
- **Recommended Reading:** 15-20 minutes

### 4. **DOCUMENTATION-INDEX.md** - This File
- **Purpose:** Navigation hub for all documentation
- **Contains:** Documentation overview and quick reference
- **Audience:** All team members
- **Status:** Navigation guide

### 5. **CONTRIBUTING.md** - Contribution Guidelines
- **Purpose:** How to contribute to the project
- **Contains:** 
  - Code style guidelines
  - Pull request process
  - Issue reporting
  - Development setup
- **Status:** Community guidelines

### 6. **LICENSE.txt** - MIT License
- **Purpose:** Legal licensing information
- **Contains:** MIT License terms and conditions
- **Status:** Legal document

---

## 🎯 Quick Start Paths

### I want to...

#### 👨‍💻 **Get the app running locally**
1. Read: [README-APP.md - Getting Started](./README-APP.md#-getting-started)
2. Follow the installation steps
3. Run `npm run dev`
4. Visit `http://localhost:3000`

#### 🏗️ **Understand the project structure**
1. Read: [PROJECT-SUMMARY.md - Project Structure](./PROJECT-SUMMARY.md#-project-structure)
2. Review: [PROJECT-SUMMARY.md - Component Architecture](./PROJECT-SUMMARY.md#-component-architecture)
3. Explore: `src/` directory in your editor

#### 🚀 **Deploy to production**
1. Read: [README-APP.md - Build & Deployment](./README-APP.md#-build--deployment)
2. Follow deployment option (Vercel/Docker/GitHub Pages)
3. Configure environment variables
4. Deploy!

#### 🐛 **Debug an issue**
1. Check: [README-APP.md - Troubleshooting](./README-APP.md#-troubleshooting)
2. Enable debug mode: `DEBUG=* npm run dev`
3. Check console logs and build output
4. Report issue with details

#### 🤝 **Contribute code**
1. Read: [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Fork and clone repository
3. Create feature branch
4. Make changes following style guide
5. Submit pull request

#### 📚 **Learn about tech stack**
1. Read: [PROJECT-SUMMARY.md - Core Dependencies](./PROJECT-SUMMARY.md#-core-dependencies)
2. Review: [README-APP.md - Tech Stack](./README-APP.md#-tech-stack)
3. Visit official docs (links provided in README-APP.md)

#### 🌐 **Add a new language**
1. Update: `src/data/translations.ts` - Add new language code
2. Update: `src/data/readmeData.ts` - Add README content
3. Update: `src/types/index.ts` - Extend Language type
4. Update: `src/components/Header.tsx` - Add language button

---

## 📋 File Reference Quick Lookup

### Core Application Files
| File | Purpose | Edit |
|------|---------|------|
| `src/App.tsx` | Main app component | Often |
| `src/main.tsx` | Entry point | Rarely |
| `src/index.css` | Global styles | Sometimes |
| `src/components/*.tsx` | Feature components | Often |

### Configuration Files
| File | Purpose | Edit |
|------|---------|------|
| `vite.config.ts` | Vite build config | Rarely |
| `tailwind.config.js` | Tailwind CSS config | Sometimes |
| `tsconfig.json` | TypeScript config | Rarely |
| `package.json` | Dependencies | Sometimes |

### Data & Types Files
| File | Purpose | Edit |
|------|---------|------|
| `src/data/translations.ts` | i18n translations | Often |
| `src/data/readmeData.ts` | README content | Often |
| `src/types/index.ts` | TypeScript types | Sometimes |

### Documentation Files
| File | Purpose | Read |
|------|---------|------|
| `README.md` | gh-dash reference | First |
| `README-APP.md` | App documentation | First |
| `PROJECT-SUMMARY.md` | Technical details | Reference |
| `CONTRIBUTING.md` | Contribution guide | Before PR |

---

## 🎯 Key Concepts

### Languages Supported
- **English** (en) - Default
- **Vietnamese** (vi)
- **Japanese** (ja)
- **Spanish** (es)

### Theme Modes
- **Dark** - Standard dark theme (default)
- **OLED** - Pure black, pixel-perfect
- **Light** - Light theme (coming soon)

### Main Features (7 Tabs)
1. **README** - Markdown documentation viewer
2. **Terminal** - Terminal simulator
3. **Config** - Configuration generator
4. **Telemetry** - Performance monitoring
5. **API** - API testing sandbox
6. **Security** - Security & backup settings
7. **Community** - Community forum

### Technology Stack
- **Frontend:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** lucide-react, recharts
- **Content:** react-markdown
- **AI:** Google Gemini AI
- **Server:** Express.js (optional)

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start dev server (auto-reload)
npm run dev

# Type check
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview

# Clean build artifacts
npm run clean
```

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Repository** | clauderiks/ide |
| **Branch** | main / v0/... |
| **React Version** | 19.0.1 |
| **Vite Version** | 6.2.3 |
| **TypeScript Version** | 5.8.2 |
| **Node Requirement** | ≥ 18.0 |
| **Languages** | 4 (EN, VI, JA, ES) |
| **Components** | 8 main components |
| **Build Status** | ✅ Passing |

---

## 🔗 External Resources

### Official Documentation
- [React 19 Docs](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://typescriptlang.org)
- [Google Gemini API](https://ai.google.dev)

### GitHub
- [gh-dash Repository](https://github.com/dlvhdr/gh-dash)
- [GitHub CLI](https://cli.github.com)
- [GitHub Discussions](https://github.com/dlvhdr/gh-dash/discussions)

### Tools & Services
- [Vercel Deployment](https://vercel.com)
- [GitHub Pages](https://pages.github.com)
- [Docker Hub](https://hub.docker.com)

---

## ❓ FAQ

### Q: Where do I start?
**A:** Read `README-APP.md` first, then follow the Getting Started section.

### Q: How do I add a new language?
**A:** Update `src/data/translations.ts` and `src/data/readmeData.ts`, then rebuild.

### Q: How do I change the theme?
**A:** Theme switching is built-in to the Header component. UI selector in top-right.

### Q: Can I deploy this app?
**A:** Yes! See `README-APP.md` - Build & Deployment section for multiple options.

### Q: What's the bundle size?
**A:** ~850 KB raw JS, ~251 KB gzipped. See `PROJECT-SUMMARY.md` for details.

### Q: How do I report a bug?
**A:** Open GitHub issue with detailed description. See `CONTRIBUTING.md`.

### Q: Can I use this for commercial purposes?
**A:** Yes, it's MIT licensed. See `LICENSE.txt` for details.

### Q: How do I contribute?
**A:** Read `CONTRIBUTING.md`, fork, create feature branch, submit PR.

---

## 📞 Support Channels

### For Questions
- Check `README-APP.md` - Troubleshooting section
- Review this Documentation Index
- Search GitHub Issues

### For Bugs
- Report on [GitHub Issues](https://github.com/clauderiks/ide/issues)
- Include error details and reproduction steps

### For Features
- Discuss on [GitHub Discussions](https://github.com/clauderiks/ide/discussions)
- Follow CONTRIBUTING.md process

---

## 🗺️ Documentation Structure

```
Project Root
├── README.md                    ← gh-dash reference (read first)
├── README-APP.md                ← App guide (read second) ⭐
├── PROJECT-SUMMARY.md           ← Technical details
├── DOCUMENTATION-INDEX.md       ← This file (navigation hub)
├── CONTRIBUTING.md              ← How to contribute
├── LICENSE.txt                  ← MIT License
│
├── src/
│   ├── components/              ← UI components
│   ├── data/                    ← Content data (translations, README)
│   ├── types/                   ← TypeScript definitions
│   ├── App.tsx                  ← Main app
│   ├── main.tsx                 ← Entry point
│   └── index.css                ← Global styles
│
├── vite.config.ts               ← Build config
├── tailwind.config.js           ← Styling config
├── tsconfig.json                ← TypeScript config
├── package.json                 ← Dependencies
└── index.html                   ← HTML entry
```

---

## ✅ Checklist for New Team Members

- [ ] Read this Documentation Index
- [ ] Read README-APP.md completely
- [ ] Read PROJECT-SUMMARY.md for technical details
- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run dev` to start development server
- [ ] Open app in browser at `http://localhost:3001` (or assigned port)
- [ ] Explore the 7 main tabs and features
- [ ] Review CONTRIBUTING.md before making changes
- [ ] Set up `.env.local` with required variables
- [ ] Try making a small change and verify HMR works

---

## 📝 Last Updated

**Date:** July 28, 2024  
**Version:** 1.0.0  
**Status:** ✅ Ready for Development

---

## 🎉 You're All Set!

All documentation is complete and the project is ready for development. Start with `README-APP.md` and follow the Getting Started guide.

**Happy coding! 🚀**

---

*For questions or updates to this documentation, please refer to the Contributing guidelines.*
