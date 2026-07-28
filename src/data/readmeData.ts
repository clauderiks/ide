import { Language } from '../types';

export const readmeTexts: Record<Language, string> = {
  en: `# ⚡ gh-dash — Minimalist Terminal Dashboard for GitHub

> A sleek, highly customizable terminal UI (TUI) extension for the GitHub CLI (\`gh\`). Manage Pull Requests, Issues, Notifications, and Workflows with lightning speed.

## 📖 Overview

\`gh-dash\` is designed for developers who live in the terminal. Built with Go and Bubbletea, it provides a rich, keyboard-driven dashboard for viewing and acting on GitHub pull requests and issues across all your repositories.

## 🚀 Key Features

- **⚡ Keyboard-Driven Navigation**: Fast Vim-style bindings (\`j\`, \`k\`, \`g\`, \`G\`, \`/\`, \`Enter\`).
- **🎨 Deep Customization**: Fully configurable colors, layout panels, border styles, and custom keybindings.
- **🔄 Real-time Cloud Sync**: Sync configuration across machines with automatic cloud state backup.
- **🔒 Security & 2FA Guard**: Enhanced security token verification and mandatory two-factor authentication.
- **📊 Performance Telemetry**: Real-time resource and latency monitoring.
- **🌍 Multi-language Support**: Native support for English, Vietnamese, Japanese, and Spanish.

## 📦 Quick Installation

### Option 1: Via GitHub CLI Extension (Recommended)

\`\`\`bash
gh auth login
gh extension install dlvhdr/gh-dash
gh dash
\`\`\`

### Option 2: Homebrew

\`\`\`bash
brew install dlvhdr/gh-dash/gh-dash
\`\`\`

### Option 3: Go Install

\`\`\`bash
go install github.com/dlvhdr/gh-dash@latest
\`\`\`

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| \`j\` / \`k\` | Move down / up |
| \`Enter\` | View detail |
| \`o\` | Open in browser |
| \`c\` | Checkout branch |
| \`/\` | Search |
| \`?\` | Help |

## ⚙️ Configuration

Edit \`~/.config/gh-dash/config.yml\`:

\`\`\`yaml
theme:
  colors:
    primary: "#7C3AED"
    secondary: "#3B82F6"
defaults:
  language: "en"
  refreshInterval: 30
security:
  require2FAForMerge: true
\`\`\`

## 🛡️ Security & 2FA Setup

1. Enable 2FA: \`gh dash --setup-2fa\`
2. Scan QR code with authenticator app
3. Enter 6-digit TOTP code

## 📞 Support & Contributing

- Report issues: [GitHub Issues](https://github.com/dlvhdr/gh-dash/issues)
- Contribute: Fork and submit PR
- Join community: [GitHub Discussions](https://github.com/dlvhdr/gh-dash/discussions)

---
**Made with ❤️ by the GitHub Community**`,

  vi: `# ⚡ gh-dash — Bảng Điều Khiển Terminal Tối Giản cho GitHub

> Một tiện ích TUI đẹp mắt, có thể tùy chỉnh cao để mở rộng GitHub CLI (\`gh\`). Quản lý Pull Requests, Issues, Notifications và Workflows một cách nhanh chóng.

## 📖 Tổng Quan

\`gh-dash\` được thiết kế cho các nhà phát triển sống trong terminal. Được xây dựng bằng Go và Bubbletea, nó cung cấp một bảng điều khiển có tính năng phong phú, được điều khiển bằng bàn phím để xem và xử lý các pull request và issue trên GitHub.

## 🚀 Các Tính Năng Chính

- **⚡ Điều Hướng Bằng Bàn Phím**: Các phím tắt kiểu Vim nhanh (\`j\`, \`k\`, \`g\`, \`G\`, \`/\`, \`Enter\`).
- **🎨 Tùy Chỉnh Sâu**: Hoàn toàn có thể cấu hình màu sắc, bố cục bảng, kiểu đường viền và phím tắt tùy chỉnh.
- **🔄 Đồng Bộ Cloud Thời Gian Thực**: Đồng bộ cấu hình trên các máy với sao lưu trạng thái cloud tự động.
- **🔒 Bảo Mật & Bảo Vệ 2FA**: Xác minh mã thông báo bảo mật nâng cao và xác thực hai yếu tố bắt buộc.
- **📊 Phân Tích Hiệu Suất**: Giám sát tài nguyên và độ trễ theo thời gian thực.
- **🌍 Hỗ Trợ Đa Ngôn Ngữ**: Hỗ trợ gốc cho Tiếng Anh, Tiếng Việt, Tiếng Nhật và Tiếng Tây Ban Nha.

## 📦 Cài Đặt Nhanh

### Tùy Chọn 1: Qua Tiện Ích GitHub CLI (Khuyến Khích)

\`\`\`bash
gh auth login
gh extension install dlvhdr/gh-dash
gh dash
\`\`\`

### Tùy Chọn 2: Homebrew

\`\`\`bash
brew install dlvhdr/gh-dash/gh-dash
\`\`\`

### Tùy Chọn 3: Go Install

\`\`\`bash
go install github.com/dlvhdr/gh-dash@latest
\`\`\`

## 🎮 Phím Tắt

| Phím | Hành Động |
|------|-----------|
| \`j\` / \`k\` | Di chuyển xuống / lên |
| \`Enter\` | Xem chi tiết |
| \`o\` | Mở trong trình duyệt |
| \`c\` | Checkout nhánh |
| \`/\` | Tìm kiếm |
| \`?\` | Trợ giúp |

## ⚙️ Cấu Hình

Chỉnh sửa \`~/.config/gh-dash/config.yml\`:

\`\`\`yaml
theme:
  colors:
    primary: "#7C3AED"
    secondary: "#3B82F6"
defaults:
  language: "vi"
  refreshInterval: 30
security:
  require2FAForMerge: true
\`\`\`

## 🛡️ Thiết Lập Bảo Mật & 2FA

1. Kích hoạt 2FA: \`gh dash --setup-2fa\`
2. Quét mã QR bằng ứng dụng xác thực
3. Nhập mã TOTP 6 chữ số

## 📞 Hỗ Trợ & Đóng Góp

- Báo cáo sự cố: [GitHub Issues](https://github.com/dlvhdr/gh-dash/issues)
- Đóng góp: Fork và gửi PR
- Tham gia cộng đồng: [GitHub Discussions](https://github.com/dlvhdr/gh-dash/discussions)

---
**Được tạo với ❤️ bởi Cộng Đồng GitHub**`,

  ja: `# ⚡ gh-dash — GitHub用ミニマリストターミナルダッシュボード

> GitHub CLI（\`gh\`）用の洗練された高度にカスタマイズ可能なターミナルUI（TUI）拡張機能。Pull Request、Issue、通知、ワークフローを高速に管理します。

## 📖 概要

\`gh-dash\`はターミナルで生活する開発者向けに設計されています。GoとBubbleteaで構築されており、GitHubのプルリクエストと問題を表示し、すべてのリポジトリに対して操作するための豊富なキーボード駆動型ダッシュボードを提供します。

## 🚀 主な機能

- **⚡ キーボード駆動型ナビゲーション**: 高速なVimスタイルバインディング（\`j\`、\`k\`、\`g\`、\`G\`、\`/\`、\`Enter\`）。
- **🎨 深いカスタマイズ**: 色、レイアウトパネル、境界線スタイル、カスタムキーバインディングを完全に設定可能。
- **🔄 リアルタイムクラウド同期**: マシン間で設定を同期し、クラウド状態を自動バックアップします。
- **🔒 セキュリティ& 2FAガード**: 強化されたセキュリティトークン検証と必須の二要素認証。
- **📊 パフォーマンステレメトリー**: リアルタイムリソースとレイテンシー監視。
- **🌍 多言語サポート**: 英語、ベトナム語、日本語、スペイン語のネイティブサポート。

## 📦 クイックインストール

### オプション1: GitHub CLI拡張機能経由（推奨）

\`\`\`bash
gh auth login
gh extension install dlvhdr/gh-dash
gh dash
\`\`\`

### オプション2: Homebrew

\`\`\`bash
brew install dlvhdr/gh-dash/gh-dash
\`\`\`

### オプション3: Go Install

\`\`\`bash
go install github.com/dlvhdr/gh-dash@latest
\`\`\`

## 🎮 キーボードショートカット

| キー | アクション |
|------|-----------|
| \`j\` / \`k\` | 下 / 上に移動 |
| \`Enter\` | 詳細を表示 |
| \`o\` | ブラウザで開く |
| \`c\` | ブランチをチェックアウト |
| \`/\` | 検索 |
| \`?\` | ヘルプ |

## ⚙️ 設定

\`~/.config/gh-dash/config.yml\`を編集します：

\`\`\`yaml
theme:
  colors:
    primary: "#7C3AED"
    secondary: "#3B82F6"
defaults:
  language: "ja"
  refreshInterval: 30
security:
  require2FAForMerge: true
\`\`\`

## 🛡️ セキュリティ& 2FAセットアップ

1. 2FAを有効化: \`gh dash --setup-2fa\`
2. QRコードを認証アプリでスキャン
3. 6桁のTOTPコードを入力

## 📞 サポート＆貢献

- 問題を報告: [GitHub Issues](https://github.com/dlvhdr/gh-dash/issues)
- 貢献: フォークしてPRを提出
- コミュニティに参加: [GitHub Discussions](https://github.com/dlvhdr/gh-dash/discussions)

---
**GitHubコミュニティによって❤️で作成されました**`,

  es: `# ⚡ gh-dash — Panel de Control Terminal Minimalista para GitHub

> Una extensión TUI elegante y altamente personalizable para GitHub CLI (\`gh\`). Administre Pull Requests, Issues, Notificaciones y Workflows a gran velocidad.

## 📖 Descripción General

\`gh-dash\` está diseñado para desarrolladores que viven en la terminal. Construido con Go y Bubbletea, proporciona un panel de control enriquecido impulsado por teclado para ver y actuar sobre solicitudes de extracción y problemas de GitHub en todos sus repositorios.

## 🚀 Características Principales

- **⚡ Navegación Impulsada por Teclado**: Enlaces rápidos de estilo Vim (\`j\`, \`k\`, \`g\`, \`G\`, \`/\`, \`Enter\`).
- **🎨 Personalización Profunda**: Colores completamente configurables, paneles de diseño, estilos de borde y enlaces de teclado personalizados.
- **🔄 Sincronización en Tiempo Real de la Nube**: Sincronice la configuración entre máquinas con copia de seguridad de estado en la nube automática.
- **🔒 Seguridad y Protección 2FA**: Verificación mejorada de token de seguridad y autenticación de dos factores obligatoria.
- **📊 Telemetría de Rendimiento**: Monitoreo de recursos y latencia en tiempo real.
- **🌍 Soporte Multilingüe**: Soporte nativo para inglés, vietnamita, japonés y español.

## 📦 Instalación Rápida

### Opción 1: A través de la Extensión GitHub CLI (Recomendado)

\`\`\`bash
gh auth login
gh extension install dlvhdr/gh-dash
gh dash
\`\`\`

### Opción 2: Homebrew

\`\`\`bash
brew install dlvhdr/gh-dash/gh-dash
\`\`\`

### Opción 3: Go Install

\`\`\`bash
go install github.com/dlvhdr/gh-dash@latest
\`\`\`

## 🎮 Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| \`j\` / \`k\` | Moverse hacia abajo / arriba |
| \`Enter\` | Ver detalles |
| \`o\` | Abrir en navegador |
| \`c\` | Rama de pago |
| \`/\` | Buscar |
| \`?\` | Ayuda |

## ⚙️ Configuración

Editar \`~/.config/gh-dash/config.yml\`:

\`\`\`yaml
theme:
  colors:
    primary: "#7C3AED"
    secondary: "#3B82F6"
defaults:
  language: "es"
  refreshInterval: 30
security:
  require2FAForMerge: true
\`\`\`

## 🛡️ Configuración de Seguridad y 2FA

1. Habilitar 2FA: \`gh dash --setup-2fa\`
2. Escanear código QR con aplicación de autenticación
3. Ingrese el código TOTP de 6 dígitos

## 📞 Soporte y Contribución

- Reportar problemas: [GitHub Issues](https://github.com/dlvhdr/gh-dash/issues)
- Contribuir: Bifurcar y enviar PR
- Unirse a la comunidad: [GitHub Discussions](https://github.com/dlvhdr/gh-dash/discussions)

---
**Hecho con ❤️ por la Comunidad de GitHub**`,
};
