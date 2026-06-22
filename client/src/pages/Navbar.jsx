import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { mainContent } from "../constents/mainContent";

const navLinks = [
  { name: "Explore", path: "/" },
  { name: "Campaigns", path: "/campaigns" },
  { name: "Create", path: "/create" },
  { name: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const logo = mainContent.logo;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setWalletConnected(true);
        setWalletAddress(
          accounts[0].slice(0, 6) + "..." + accounts[0].slice(-4)
        );
      }
    } else {
      alert("MetaMask install karo bhai!");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark/80 backdrop-blur-md shadow-lg shadow-primary/10"
            : "bg-transparent"
        }`}
      >
        {/* h-16 → h-20 (2x taller) */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo — h-10 → h-14 ── */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="h-14 w-auto" />
              </Link>
            </motion.div>

            {/* ── CENTER: Pill Nav — text-sm → text-base, px/py bigger ── */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path} className="relative">
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-6 py-2 rounded-full text-base font-medium transition-colors duration-200 cursor-pointer ${
                        isActive ? "text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="pill-active"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-primary/30 border border-primary/50"
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* ── RIGHT: Wallet / CTA — text-sm → text-base, bigger padding ── */}
            <div className="hidden md:flex items-center gap-4">
              {walletConnected ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-base font-semibold"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
                  {walletAddress}
                </motion.div>
              ) : (
                <motion.button
                  onClick={connectWallet}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(139,92,246,0.55)" }}
                  whileTap={{ scale: 0.96 }}
                  className="px-7 py-2.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 border-none cursor-pointer shadow-[0_0_16px_rgba(99,102,241,0.3)]"
                >
                  Get Started
                </motion.button>
              )}
            </div>

            {/* ── Mobile Hamburger — bigger touch target ── */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-400 hover:text-white p-3"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 bg-current rounded"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 bg-current rounded"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 bg-current rounded"
                />
              </div>
            </motion.button>

          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-dark-card border-t border-slate-800 overflow-hidden"
            >
              <div className="px-5 py-4 flex flex-col gap-1.5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-5 py-3 rounded-lg text-base font-medium transition-colors ${
                        location.pathname === link.path
                          ? "bg-primary/20 text-primary"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.07 }}
                  onClick={connectWallet}
                  className="mt-2 w-full px-5 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600"
                >
                  {walletConnected ? `✓ ${walletAddress}` : "Get Started"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer — matches h-20 */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;