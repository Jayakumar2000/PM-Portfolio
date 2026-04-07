import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Linkedin, FileText } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { CONTACT_INFO } from "../constants";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "My Story", path: "/story" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-surface/80 backdrop-blur-md border-b border-surface-border py-3" : "bg-transparent"
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col group">
          <span className="text-xl font-display font-black tracking-tighter group-hover:text-brand transition-colors leading-none">
            JAYAKUMAR
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 group-hover:text-brand/60 transition-colors">
            PORTFOLIO
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-brand px-1 py-2",
                location.pathname === link.path ? "text-brand" : "text-white/70"
              )}
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
          
          <div className="h-4 w-px bg-white/10 mx-2" />

          <div className="flex items-center gap-4">
            <a 
              href={CONTACT_INFO.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-brand transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href={CONTACT_INFO.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-brand transition-colors"
              title="Download Resume"
            >
              <FileText size={18} />
            </a>
          </div>

          <Link to="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-brand hover:text-white transition-all shadow-lg shadow-white/5"
            >
              Contact
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-surface z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-3xl font-display font-bold",
                    location.pathname === link.path ? "text-brand" : "text-white"
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <motion.button 
                  className="bg-brand text-white px-8 py-3 rounded-full text-lg font-bold"
                >
                  Contact
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
