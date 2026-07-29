<div align="center">

# ⚡ Clriks dash

### Terminal dashboard tối giản, nhanh và đẹp cho GitHub CLI

<p>
  <a href="https://github.com/dlvhdr/gh-dash/actions"><img alt="Build" src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge"></a>
  <a href="https://github.com/dlvhdr/gh-dash/releases"><img alt="Version" src="https://img.shields.io/badge/version-v4.12.0-blue?style=for-the-badge"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-purple?style=for-the-badge"></a>
  <a href="https://github.com/dlvhdr/gh-dash/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/dlvhdr/gh-dash?style=for-the-badge"></a>
</p>

> Quản lý Pull Request, Issue, Notification và Workflow ngay trong terminal — tập trung, gọn gàng và dùng hoàn toàn bằng bàn phím.

</div>

---

## ✨ Điểm nổi bật

| Nhóm tính năng | Mô tả nhanh |
| --- | --- |
| ⚡ **Điều hướng tốc độ cao** | Vim-style keybindings: `j`, `k`, `g`, `G`, `/`, `Enter`. |
| 🎛️ **Bố cục linh hoạt** | Tùy chỉnh sections, filters, preview pane, border và theme. |
| 🔎 **Tập trung vào review** | Gom PR cần review, PR của bạn, issue được assign và notification vào một màn hình. |
| 🧩 **Tích hợp GitHub CLI** | Cài đặt như một extension của `gh`, chạy trực tiếp bằng `gh dash`. |
| 🧰 **Cấu hình bằng YAML** | Dễ chia sẻ, version control và đồng bộ qua dotfiles. |

---

## 📚 Mục lục

- [Cài đặt nhanh](#-cài-đặt-nhanh)
- [Xem trước giao diện](#-xem-trước-giao-diện)
- [Phím tắt mặc định](#-phím-tắt-mặc-định)
- [Cấu hình mẫu](#-cấu-hình-mẫu)
- [Tùy biến thường dùng](#-tùy-biến-thường-dùng)
- [Dành cho nhà phát triển](#-dành-cho-nhà-phát-triển)
- [Khắc phục sự cố](#-khắc-phục-sự-cố)
- [Đóng góp](#-đóng-góp)

---

## 🚀 Cài đặt nhanh

### 1. Cài qua GitHub CLI Extension

```bash
gh auth login
gh extension install dlvhdr/gh-dash
gh dash
```

### 2. Cài qua Homebrew

```bash
brew tap dlvhdr/gh-dash
brew install gh-dash
```

### 3. Cài bằng Go

```bash
go install github.com/dlvhdr/gh-dash@latest
```

> Yêu cầu khuyến nghị: đã cài `gh`, đã đăng nhập GitHub và terminal hỗ trợ UTF-8.

---

## 🖥️ Xem trước giao diện

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ gh-dash v4.12.0        PRs 12   Issues 8   Notifications 5                  │
├────────────────────────────────────────┬─────────────────────────────────────┤
│ Pull Requests · Mine                   │ Issues · Assigned                   │
│ ────────────────────────────────────── │ ─────────────────────────────────── │
│ › #104 feat: improve review workflow   │ › #89 bug: terminal width overflow  │
│   #102 fix: sync state race condition  │   #76 docs: add config examples     │
│   #98  refactor: update Bubble Tea UI  │   #54 feature: custom keybindings   │
├────────────────────────────────────────┴─────────────────────────────────────┤
│ Detail · #104                                                               │
│ Author: @octocat   Branch: feat/review-ui → main   Checks: 12/12 passing    │
│ Reviewers: @dev1 approved · @dev2 changes requested                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ j/k move  enter open  c checkout  d diff  / search  r refresh  q quit       │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## ⌨️ Phím tắt mặc định

| Phím | Hành động | Ghi chú |
| --- | --- | --- |
| `j` / `k` | Di chuyển xuống / lên | Điều hướng theo từng dòng. |
| `h` / `l` | Chuyển section | Qua lại giữa PR, Issue, Notification. |
| `Enter` | Mở chi tiết | Xem preview hoặc mở item được chọn. |
| `o` | Mở trên trình duyệt | Mở PR/Issue trong GitHub web. |
| `c` | Checkout branch | Checkout nhánh PR về local. |
| `d` | Xem diff | Mở thay đổi của PR. |
| `/` | Tìm kiếm và lọc | Lọc nhanh trong section hiện tại. |
| `r` | Làm mới dữ liệu | Gọi lại GitHub API. |
| `?` | Mở trợ giúp | Hiển thị danh sách phím tắt. |
| `q` | Thoát | Đóng dashboard. |

---

## ⚙️ Cấu hình mẫu

File cấu hình mặc định nằm tại `~/.config/gh-dash/config.yml`.

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
  refreshInterval: 30
  language: "vi"

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

## 🎨 Tùy biến thường dùng

| Tham số | Kiểu | Giá trị mẫu | Công dụng |
| --- | --- | --- | --- |
| `theme.ui.colors.primary` | `string` | `#7C3AED` | Màu nhấn cho item đang active. |
| `theme.borderStyle` | `string` | `rounded` | Kiểu border: `rounded`, `double`, `normal`, `none`. |
| `defaults.previewWidth` | `number` | `60` | Độ rộng vùng preview. |
| `defaults.refreshInterval` | `number` | `30` | Chu kỳ refresh theo giây. |
| `prSections[].filters` | `string` | `is:open author:@me` | GitHub search query cho PR section. |
| `issueSections[].filters` | `string` | `is:open assignee:@me` | GitHub search query cho Issue section. |

---

## 🧑‍💻 Dành cho nhà phát triển

```bash
# Clone repository
git clone https://github.com/dlvhdr/gh-dash.git
cd gh-dash

# Chạy test Go
go test ./...

# Chạy ứng dụng local
go run .
```

Nếu bạn làm việc với giao diện tài liệu trong repo này:

```bash
npm install
npm run dev
npm run build
```

---

## 🧯 Khắc phục sự cố

| Vấn đề | Nguyên nhân thường gặp | Cách xử lý |
| --- | --- | --- |
| `gh CLI not authenticated` | Chưa đăng nhập GitHub CLI. | Chạy `gh auth login`. |
| `Rate limit exceeded` | Hết quota GitHub API. | Kiểm tra token hoặc giảm tần suất refresh. |
| Giao diện bị lệch | Terminal chưa bật UTF-8 hoặc font không hỗ trợ ký tự box drawing. | Đặt `LANG=en_US.UTF-8` và dùng Nerd Font/monospace. |
| Không thấy PR/Issue | Filter quá chặt hoặc sai repository context. | Kiểm tra lại `filters` trong `config.yml`. |

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón:

1. Fork repository và tạo branch mới từ `main`.
2. Chạy `go test ./...` trước khi gửi thay đổi.
3. Format code bằng `gofmt -s -w .` nếu có chỉnh Go.
4. Mở Pull Request với mô tả rõ ràng và liên kết issue liên quan nếu có.

<div align="center">

**Made for developers who live in the terminal.**

</div>
