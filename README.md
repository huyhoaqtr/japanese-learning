# Chinh Phục Tiếng Nhật 🇯🇵

Nền tảng học tiếng Nhật N5 dành cho người Việt. Khách truy cập vào landing page giới thiệu (`/`) trước, bấm "Bắt đầu" để vào app thật (`/dashboard` và các mục học tập, mỗi mục có URL riêng, tổ chức thành sidebar desktop / bottom tab bar mobile).

## Các mục ✨

- **Landing page** (`/`): giới thiệu nền tảng, số liệu nổi bật, lộ trình tính năng, CTA vào app — không có sidebar/nav.
- **Trang chủ** (`/dashboard`): tổng quan tiến độ và lối vào từng mục học tập, nằm trong app shell.
- **Luyện Kana** (đã có): ôn tập bằng cách gõ romaji hoặc trắc nghiệm, có bảng tra cứu/ví dụ, tính điểm và lưu tổng số câu trả lời đúng. 8 nhóm âm: Hiragana, Katakana, Hỗn hợp, Âm đục, Âm ghép, Âm đục ghép, Âm ngắt, Trường âm (2 nhóm cuối luyện qua ví dụ từ thực tế kèm nghĩa tiếng Việt).
- **Từ vựng, Ngữ pháp N5, Kanji cơ bản, Luyện đề JLPT** (sắp ra mắt): đã có route + trang giới thiệu riêng, sẽ triển khai nội dung ở các bản sau.

## Công nghệ sử dụng 🛠️

- **Framework**: [React 19](https://react.dev/) + [React Router](https://reactrouter.com/)
- **Icon**: [lucide-react](https://lucide.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Deploy**: Có thể dễ dàng deploy lên Vercel, Netlify hoặc GitHub Pages.

## Cấu trúc mã nguồn 📁

```
src/
  layouts/AppShell.jsx   # sidebar/bottom-nav/top-bar + <Outlet/>
  components/            # Sidebar, BottomNav, MobileTopBar, ThemeToggle
  hooks/                 # useTheme, usePersistentCounter
  data/                  # kana.js, quizUtils.js, features.js (registry mục học tập)
  pages/                 # LandingPage, HomePage, KanaPracticePage, ComingSoonPage
```

## Hướng dẫn cài đặt & Chạy cục bộ 🚀

Yêu cầu máy tính của bạn đã cài đặt sẵn [Node.js](https://nodejs.org/) (khuyến nghị phiên bản v20 trở lên).

1. **Clone repository hoặc mở thư mục dự án**:
   ```bash
   cd japanese-learning
   ```

2. **Cài đặt các thư viện cần thiết**:
   ```bash
   npm install
   ```

3. **Khởi động server phát triển (Development Server)**:
   ```bash
   npm run dev
   ```

4. Mở trình duyệt và truy cập vào địa chỉ: `http://localhost:5173`

## Bản quyền 📄
&copy; 2026 Japanese Learning. All rights reserved.
