import { motion } from "motion/react";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="pt-40 pb-24 px-6 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[120px] md:text-[180px] font-display font-black text-brand leading-none tracking-tighter mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
            Page Not Found
          </h2>
          <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand text-white px-8 py-4 rounded-full text-lg font-bold flex items-center gap-3 shadow-lg shadow-brand/20 hover:shadow-brand/40 transition-shadow"
              >
                <Home size={20} />
                Back to Home
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-surface-soft border border-surface-border text-white px-8 py-4 rounded-full text-lg font-bold hover:border-brand/50 transition-all"
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
