# ⚡ gh-dash — Minimalist Terminal Dashboard for GitHub

> A sleek, highly customizable terminal UI (TUI) extension for the GitHub CLI (`gh`). Manage Pull Requests, Issues, Notifications, and Workflows with lightning speed.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square)](https://github.com/dlvhdr/gh-dash)
[![Version](https://img.shields.io/badge/version-v4.12.0-blue.svg?style=flat-square)](https://github.com/dlvhdr/gh-dash/releases)
[![License](https://img.shields.io/badge/license-MIT-purple.svg?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/dlvhdr/gh-dash?style=flat-square)](https://github.com/dlvhdr/gh-dash/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](CONTRIBUTING.md)

---

## 📖 Table of Contents (Mục Lục)

1. [Overview & Features (Tổng quan & Tính năng)](#-overview--features)
2. [Quick Start & Installation (Cài đặt nhanh)](#-quick-start--installation)
3. [Visual Demo & Controls (Minh họa & Điều khiển)](#-visual-demo--controls)
4. [GitHub Quick Deployment (Triển khai nhanh trên GitHub)](#-github-quick-deployment)
5. [Advanced Configuration (Cấu hình nâng cao)](#-advanced-configuration)
6. [Complete Customization Parameter Matrix (Bảng thông số tùy biến)](#-complete-customization-parameter-matrix)
7. [Developer API & Integration Guide (Tài liệu API & Tích hợp)](#-developer-api--integration-guide)
8. [Real-time Telemetry & Cloud Sync (Đồng bộ đám mây & Thống kê)](#-real-time-telemetry--cloud-sync)
9. [Automated Backup & Disaster Recovery (Sao lưu & Khôi phục)](#-automated-backup--disaster-recovery)
10. [Security & 2FA Setup (Bảo mật 2FA & Cảnh báo)](#-security--2fa-setup)
11. [Troubleshooting & FAQ (Khắc phục sự cố)](#-troubleshooting--faq)
12. [Community Forum & Pull Request Guidelines (Cộng đồng & Đóng góp)](#-community-forum--pull-request-guidelines)

---

## 🚀 Overview & Features

`gh-dash` is designed for developers who live in the terminal. Built with Go and Bubbletea, it provides a rich, keyboard-driven dashboard for viewing and acting on GitHub pull requests and issues across all your repositories.

### Key Capabilities

- **⚡ Keyboard-Driven Navigation**: Fast Vim-style bindings (`j`, `k`, `g`, `G`, `/`, `Enter`).
- **🎨 Deep Customization**: Fully configurable colors, layout panels, border styles, and custom keybindings.
- **🔄 Real-time Cloud Sync**: Sync configuration across machines with automatic cloud state backup.
- **🔒 Security & 2FA Guard**: Enhanced security token verification and mandatory two-factor authentication for sensitive actions.
- **📊 Performance Telemetry**: In-terminal & web-backed real-time resource and latency monitoring.
- **🌍 Multi-language & Dark/Light Themes**: Native support for English, Vietnamese, Japanese, and Spanish with OLED dark mode.
- **🔔 Push & Email Alerts**: Real-time notifications for critical security patches and new releases.

---

## 📦 Quick Start & Installation

### Option 1: Via GitHub CLI Extension (Recommended)

```bash
# Ensure gh CLI is installed and authenticated
gh auth login

# Install gh-dash extension
gh extension install dlvhdr/gh-dash

# Run gh-dash
gh dash
```

### Option 2: Homebrew (macOS / Linux)

```bash
brew tap dlvhdr/gh-dash
brew install gh-dash
```

### Option 3: Go Install (Cross-platform)

```bash
go install github.com/dlvhdr/gh-dash@latest
```

---

## 🎮 Visual Demo & Controls

```
+-----------------------------------------------------------------------------------+
|  gh-dash v4.12.0  [PRs: 12]  [Issues: 8]  [Sync: Online 🟢]  [2FA: Active 🔒]   |
+-----------------------------------------------------------------------------------+
|  PULL REQUESTS (Mine)                       |  ISSUES (Assigned)                  |
|  ------------------------------------------ | ----------------------------------- |
|  [#104] feat: add cloud auto-backup         |  [#89] bug: latency in dark theme  |
|  [#102] fix: race condition in sync worker  |  [#76] docs: add API reference     |
|  [#98]  refactor: upgrade bubbletea         |  [#54] feat: push notifications    |
+-----------------------------------------------------------------------------------+
|  DETAILS VIEW [#104]                                                              |
|  Author: @octocat  | Branch: main <- feat/cloud-backup | Checks: 12/12 Passing      |
|  Reviewers: @dev1 (Approved), @dev2 (Changes Requested)                           |
+-----------------------------------------------------------------------------------+
|  [j/k] Navigate  [Enter] View  [c] Checkout  [o] Open in Browser  [q] Quit        |
+-----------------------------------------------------------------------------------+
```

### Default Keybindings Table

| Key | Action | Mô tả (Vietnamese) |
| :--- | :--- | :--- |
| `j` / `k` | Move cursor down / up | Di chuyển lên / xuống |
| `h` / `l` | Switch between sections | Chuyển đổi giữa các bảng |
| `Enter` | Open detail preview modal | Mở xem chi tiết |
| `o` | Open PR/Issue in web browser | Mở trên trình duyệt web |
| `c` | Checkout git branch locally | Checkout branch về máy local |
| `r` | Refresh current section | Tải lại dữ liệu |
| `d` | View diff / changes | Xem khác biệt mã nguồn (Diff) |
| `/` | Search & Filter items | Tìm kiếm & lọc nâng cao |
| `?` | Show help dialog | Hiển thị bảng trợ giúp |

---

## 🛠 GitHub Quick Deployment

Deploy your own customized documentation hub or gh-dash instance to GitHub Pages / Cloud Run in seconds:

```bash
# Clone repository
git clone https://github.com/your-username/gh-dash-hub.git
cd gh-dash-hub

# Install dependencies
npm install

# Run locally in dev mode
npm run dev

# Deploy to GitHub Pages automatically
npm run build
npx gh-pages -d dist
```

---

## ⚙️ Advanced Configuration

Configuration is managed via `~/.config/gh-dash/config.yml`.

```yaml
# ~/.config/gh-dash/config.yml
theme:
  ui:
    colors:
      primary: "#7C3AED"
      secondary: "#3B82F6"
      accent: "#10B981"
      background: "#0F172A"
      text: "#F8FAFC"
  borderStyle: "rounded"

defaults:
  previewWidth: 60
  refreshInterval: 30 # seconds
  language: "vi"      # vi | en | ja | es

cloudSync:
  enabled: true
  autoBackupDaily: true
  encryption: "AES-256"

security:
  require2FAForMerge: true
  securityPatchAlerts: true

prSections:
  - title: "My Open PRs"
    filters: "is:open author:@me"
  - title: "Needs My Review"
    filters: "is:open review-requested:@me"

issueSections:
  - title: "Assigned to Me"
    filters: "is:open assignee:@me"
```

---

## 📊 Complete Customization Parameter Matrix

| Parameter Path | Type | Default | Options | Description |
| :--- | :--- | :--- | :--- | :--- |
| `theme.ui.colors.primary` | Hex String | `#7C3AED` | Any valid HEX | Primary highlight color for active tab |
| `theme.borderStyle` | String | `rounded` | `rounded`, `double`, `normal`, `none` | Border style for terminal panels |
| `defaults.refreshInterval` | Integer | `30` | `5` - `300` | Automatic refresh interval in seconds |
| `defaults.language` | String | `vi` | `vi`, `en`, `ja`, `es` | Interface display language |
| `cloudSync.enabled` | Boolean | `true` | `true`, `false` | Enable real-time cloud settings sync |
| `cloudSync.autoBackupDaily` | Boolean | `true` | `true`, `false` | Automatic daily snapshot backup to cloud |
| `security.require2FAForMerge` | Boolean | `true` | `true`, `false` | Require TOTP confirmation before merging PRs |
| `security.securityPatchAlerts`| Boolean | `true` | `true`, `false` | Push alerts for critical CVE patches |

---

## 🔌 Developer API & Integration Guide

`gh-dash` exposes a local REST & WebSocket endpoint for automation tools and extensions.

### GET `/api/v1/telemetry`

Returns real-time operational statistics.

```json
{
  "status": "healthy",
  "version": "4.12.0",
  "uptimeSeconds": 86400,
  "cpuUsagePercent": 1.2,
  "memoryMb": 24.5,
  "apiCallsCount": 1420,
  "cloudSyncState": "synced"
}
```

### Node.js Integration Example

```javascript
import { GhDashClient } from 'gh-dash-sdk';

const client = new GhDashClient({
  endpoint: 'http://localhost:3000/api/v1',
  authToken: process.env.GH_DASH_TOKEN,
});

async function run() {
  const prs = await client.getPullRequests({ filter: 'is:open' });
  console.log(`Open PRs: ${prs.length}`);
}

run();
```

---

## 🛡 Security & 2FA Setup

1. **Enable 2FA Guard**: Turn on `security.require2FAForMerge: true` in your `config.yml`.
2. **Scan TOTP QR Code**: Open `gh dash --setup-2fa` to link your authenticator app (Google Authenticator, Authy, 1Password).
3. **Verify**: Enter 6-digit TOTP code before approving critical PRs or altering cloud sync settings.

---

## 🚨 Troubleshooting & FAQ

| Problem / Issue | Possible Cause | Solution |
| :--- | :--- | :--- |
| `Error: gh CLI not authenticated` | Missing GitHub auth token | Run `gh auth login` in terminal |
| `Rate limit exceeded (403)` | GitHub REST API quota reached | Enable Personal Access Token (PAT) with full `repo` scope |
| `Cloud sync failing` | Network firewall or 2FA challenge required | Re-authenticate 2FA using `gh dash --sync-auth` |
| `Terminal display corruption` | Non-UTF8 locale settings | Export `LANG=en_US.UTF-8` or `vi_VN.UTF-8` in `.bashrc`/`.zshrc` |

---

## 👥 Community Forum & Pull Request Guidelines

We welcome community contributions! Please read our guidelines before opening a Pull Request:

1. **Fork the repo** & create your branch from `main`.
2. **Run tests**: `go test ./...`
3. **Format code**: `gofmt -s -w .`
4. **Submit PR**: Provide a clear explanation of changes and link related issues.
5. **Community Board**: Join our discussions at [GitHub Discussions](https://github.com/dlvhdr/gh-dash/discussions).
