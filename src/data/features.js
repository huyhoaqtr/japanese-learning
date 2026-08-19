import { BookOpenText, FileText, Home, Languages, PenLine } from "lucide-react";

export const features = [
  {
    id: "home",
    path: "/dashboard",
    label: "Trang chủ",
    icon: Home,
    showInNav: true,
  },
  {
    id: "kana",
    path: "/kana-practice",
    label: "Luyện Kana",
    icon: Languages,
    status: "available",
    showInNav: true,
    description: "Luyện Hiragana, Katakana, âm đục, âm ghép, âm ngắt, trường âm qua bài tập ngẫu nhiên có ví dụ.",
  },
  {
    id: "lessons",
    path: "/lessons",
    label: "Bài học",
    icon: BookOpenText,
    status: "available",
    showInNav: true,
    description: "Từ vựng, hội thoại và ngữ pháp N5 theo từng bài học, bám sát giáo trình Minna no Nihongo.",
  },
  {
    id: "kanji",
    path: "/kanji",
    label: "Kanji cơ bản",
    icon: PenLine,
    status: "coming-soon",
    showInNav: true,
    description: "Luyện Kanji N5: âm on/kun, cách viết và ví dụ trong câu.",
  },
  {
    id: "jlpt",
    path: "/jlpt-test",
    label: "Luyện đề JLPT",
    icon: FileText,
    status: "coming-soon",
    showInNav: true,
    description: "Đề thi thử JLPT N5 mô phỏng cấu trúc và thời gian thi thật.",
  },
];

export const getFeatureByPath = (path) => features.find((feature) => feature.path === path);
