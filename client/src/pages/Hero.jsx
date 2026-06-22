import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const TYPING_WORDS = [
  { text: "Fund Dreams.", color: "text-indigo-400" },
  { text: "No Middleman.", color: "text-purple-400" },
  { text: "100% On-Chain.", color: "text-pink-400" },
  { text: "Fully Transparent.", color: "text-cyan-400" },
];

const AVATARS = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=4",
];

// ── Typing Effect Hook ──
function useTypingEffect(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex].text;
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex, words]);

  return { displayed, color: words[wordIndex].color };
}

// ── Sparkle component ──
const Sparkle = ({ className }) => (
  <motion.div
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute text-white/40 text-2xl pointer-events-none select-none ${className}`}
  >
    ✦
  </motion.div>
);

const Hero = () => {
  const { displayed, color } = useTypingEffect(TYPING_WORDS);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative mt-3 flex flex-col items-center justify-center px-4 overflow-hidden bg-transparent">

      {/* Sparkles */}
      <Sparkle className="top-[12%] left-[8%]" />
      <Sparkle className="top-[20%] right-[12%]" style={{ animationDelay: "1s" }} />
      <Sparkle className="bottom-[25%] left-[18%]" style={{ animationDelay: "2s" }} />
      <Sparkle className="bottom-[15%] right-[8%]" style={{ animationDelay: "0.5s" }} />
      <Sparkle className="top-[45%] left-[3%]" style={{ animationDelay: "1.5s" }} />
      <Sparkle className="top-[35%] right-[4%]" style={{ animationDelay: "2.5s" }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center  gap-6 z-10"
      >

        {/* ── Social Proof Badge ── */}
        <motion.div variants={item}>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {AVATARS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-7 h-7 rounded-full border-2 border-dark object-cover"
                />
              ))}
            </div>
            <span className="text-slate-300 text-sm font-medium">
              <span className="text-white font-bold">1,840+</span> backers already funding dreams
            </span>
          </div>
        </motion.div>

        {/* ── Main Heading ── */}
        <motion.div variants={item} className="flex flex-col items-center gap-2">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
            Crowdfund
          </h1>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-[1.05] tracking-tight">
            {/* Typing word with color */}
            <span className={`${color} transition-colors duration-500`}>
              {displayed}
            </span>
            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="text-white/60 ml-1"
            >
              |
            </motion.span>
          </h1>
        </motion.div>

        {/* ── Sub Heading ── */}
        <motion.div variants={item}>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-300 tracking-tight">
            Raise ETH. Build trust. Change lives.
          </h2>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={item}
          className="text-slate-400 text-lg sm:text-xl max-w-2xl leading-relaxed"
        >
          Create campaigns, accept crypto donations, and let smart contracts
          handle refunds and withdrawals — automatically, trustlessly, on-chain.
          No bank. No platform fee. Just people funding people.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <motion.div
            whileHover={{ scale: 1.06, boxShadow: "0 0 36px rgba(99,102,241,0.6)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/create"
              className="px-8 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 no-underline"
            >
              🚀 Start a Campaign
            </Link>
          </motion.div>

          {/* <motion.div
            whileHover={{ scale: 1.06, background: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/campaigns"
              className="px-8 py-4 rounded-full text-lg font-semibold text-slate-300 border border-white/15 bg-white/5 backdrop-blur-sm no-underline hover:text-white transition-colors"
            >
              Explore Campaigns
            </Link>
          </motion.div> */}
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-8 mt-4 px-8 py-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm"
        >
          {[
            { value: "$14.9M+", label: "Raised on-chain" },
            { value: "1,840", label: "Active backers" },
            { value: "97%", label: "Funds delivered" },
            { value: "0%", label: "Platform fee" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold text-white tracking-tight">{s.value}</div>
              <div className="text-sm text-slate-500 font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-slate-600 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-indigo-500/60 to-transparent"
        />
      </motion.div>

    </section>
  );
};

export default Hero;