import { ArrowRight, Gift, Sparkles, Target, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "../App.css";
import ThemeToggle from "../components/ThemeToggle";
import { features } from "../data/features";
import { useTheme } from "../hooks/useTheme";
import { usePageMeta } from "../hooks/usePageMeta";

const MotionLink = motion.create(Link);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stats = [
  { value: "92", label: "Ký tự Kana" },
  { value: "N5", label: "Cấp độ khởi đầu" },
  { value: "100%", label: "Miễn phí" },
  { value: "0", label: "Quảng cáo" },
];

const values = [
  {
    icon: Zap,
    title: "Học mọi lúc, mọi nơi",
    description: "Không cần cài đặt hay tạo tài khoản — mở trình duyệt là học được ngay, trên điện thoại hay máy tính.",
  },
  {
    icon: Target,
    title: "Bám sát chuẩn JLPT",
    description: "Nội dung được xây dựng theo khung năng lực N5, mở rộng dần lên các cấp độ cao hơn.",
  },
  {
    icon: Gift,
    title: "Hoàn toàn miễn phí",
    description: "Không quảng cáo, không thu phí ẩn. Tập trung 100% vào việc học của bạn.",
  },
];

function LandingPage() {
  usePageMeta({
    title: "Chinh Phục Tiếng Nhật | Nền tảng học tiếng Nhật toàn diện",
    description: "Nền tảng học tiếng Nhật tương tác, cao cấp dành cho người Việt. Luyện thi JLPT, học từ vựng, ngữ pháp, kanji hiệu quả nhất.",
  });
  const [isDarkMode, toggleTheme] = useTheme();
  const roadmapFeatures = features.filter((feature) => feature.id !== "home");

  return (
    <>
      <div className="ambient-background" />
      <div className="min-h-screen selection:bg-amber-400/30 dark:selection:text-white text-slate-700 dark:text-slate-200">
        {/* Top Nav */}
        <header className="sticky top-0 z-40 glass-panel">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/20 text-base font-black text-amber-500 dark:text-amber-300">
                日
              </div>
              <span className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-white">
                Chinh Phục Tiếng Nhật
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} className="w-10 h-10" />
              <MotionLink
                to="/trang-chu"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/80 dark:bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-white shadow-lg transition-colors duration-300 hover:bg-white/90 dark:hover:bg-white/20"
              >
                Bắt đầu
              </MotionLink>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 right-0 text-[220px] font-black text-amber-400/10 select-none"
          >
            漢
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 text-[160px] font-black text-amber-400/10 select-none"
          >
            あ
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-500 dark:text-amber-300 mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Nền tảng học tiếng Nhật cho người Việt
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.3] tracking-[0.02em] uppercase max-w-3xl"
            >
              <span className="text-slate-700 dark:text-white drop-shadow-2xl">Chinh Phục</span>{" "}
              <span className="text-amber-500 dark:text-amber-300 drop-shadow-2xl">Tiếng Nhật</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-sm sm:text-base font-medium text-slate-500 dark:text-white/50"
            >
              Luyện Hiragana, Katakana, từ vựng, ngữ pháp và Kanji theo lộ trình JLPT N5 —
              miễn phí, ngay trên trình duyệt, không cần cài đặt.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <MotionLink
                to="/trang-chu"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/80 backdrop-blur-xl dark:bg-white/10 px-8 py-4 text-sm font-bold tracking-widest text-slate-700 dark:text-white shadow-lg transition-colors duration-300 hover:bg-white/90 dark:hover:bg-white/20 uppercase"
              >
                Bắt đầu học ngay
                <ArrowRight className="h-4 w-4" />
              </MotionLink>
              <motion.a
                href="#features"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold tracking-widest text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white transition-colors duration-300 uppercase"
              >
                Khám phá tính năng
              </motion.a>
            </motion.div>

            {/* Product preview mockup */}
            <motion.div
              variants={fadeUp}
              animate={{ y: [0, -10, 0] }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
              className="mt-16 w-full max-w-sm glass-panel rounded-[2.5rem] p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/30">
                  Luyện Kana
                </span>
                <span className="rounded-lg bg-amber-400/20 px-3 py-1 text-[10px] font-bold text-amber-500 dark:text-amber-300">
                  ĐIỂM: 12
                </span>
              </div>
              <div className="text-[90px] leading-none font-black text-slate-700 dark:text-white text-center mb-4">
                あ
              </div>
              <div className="mx-auto w-full max-w-[200px] rounded-xl bg-white/70 dark:bg-black/40 border border-white/80 dark:border-white/10 py-3 text-center text-lg font-black text-slate-400 dark:text-white/30">
                rōmaji
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          className="mx-auto max-w-5xl px-6 pb-24"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="glass-panel rounded-3xl p-6 text-center"
              >
                <p className="text-3xl font-black text-amber-500 dark:text-amber-300">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/40">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features / roadmap */}
        <motion.section
          id="features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl px-6 pb-24 scroll-mt-24"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-amber-500 dark:text-amber-200/70 text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Lộ trình học tập
            </p>
            <h2 className="text-3xl sm:text-4xl font-black leading-[1.3] uppercase text-slate-700 dark:text-white">
              Tất cả trong một nền tảng
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmapFeatures.map(({ id, label, description, icon: Icon, status }) => {
              const isAvailable = status === "available";

              return (
                <motion.div
                  key={id}
                  variants={fadeUp}
                  className="glass-panel rounded-3xl p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-500 dark:text-amber-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                        isAvailable
                          ? "bg-amber-400/20 text-amber-500 dark:text-amber-300"
                          : "bg-slate-200/80 dark:bg-white/10 text-slate-500 dark:text-white/50"
                      }`}
                    >
                      {isAvailable ? "Đang hoạt động" : "Sắp ra mắt"}
                    </span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-white mb-2">
                    {label}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-white/50">
                    {description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Why choose us */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl px-6 pb-24"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {values.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={fadeUp} className="glass-panel rounded-3xl p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-500 dark:text-amber-300 mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-white/50">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-4xl px-6 pb-24"
        >
          <div className="glass-panel rounded-[2.5rem] p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-black leading-[1.3] uppercase text-slate-700 dark:text-white mb-4">
              Sẵn sàng chinh phục tiếng Nhật?
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-white/50 mb-8">
              Bắt đầu với bảng chữ cái Kana ngay hôm nay — hoàn toàn miễn phí.
            </p>
            <MotionLink
              to="/trang-chu"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/80 backdrop-blur-xl dark:bg-white/10 px-8 py-4 text-sm font-bold tracking-widest text-slate-700 dark:text-white shadow-lg transition-colors duration-300 hover:bg-white/90 dark:hover:bg-white/20 uppercase"
            >
              Bắt đầu miễn phí
              <ArrowRight className="h-4 w-4" />
            </MotionLink>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mx-auto max-w-6xl px-6 pb-12 text-center text-slate-400 dark:text-white/40 text-xs font-medium tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Chinh Phục Tiếng Nhật. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
