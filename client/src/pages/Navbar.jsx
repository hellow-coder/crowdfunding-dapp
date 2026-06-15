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
      if (accounts.length > 0) setWalletConnected(true);
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
            ? "bg-dark/95 backdrop-blur-md shadow-lg shadow-primary/10"
            : "bg-dark/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Hissa" className="h-10 w-auto" />
              </Link>
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      location.pathname === link.path
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Wallet Button */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={connectWallet}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  walletConnected
                    ? "bg-secondary/20 border border-secondary/40 text-secondary"
                    : "bg-primary text-white hover:bg-primary/80"
                }`}
              >
                {walletConnected ? "✓ Connected" : "Connect Wallet"}
              </motion.button>

              {!walletConnected && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/create"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-accent to-gold text-white hover:opacity-90 transition-opacity"
                  >
                    + Create
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-400 hover:text-white p-2"
            >
              <div className="w-5 flex flex-col gap-1">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 bg-current rounded"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 bg-current rounded"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 bg-current rounded"
                />
              </div>
            </motion.button>

          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-dark-card border-t border-slate-800 overflow-hidden"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
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
                      className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
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
                  className="mt-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-primary text-white"
                >
                  {walletConnected ? "✓ Connected" : "Connect Wallet"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;