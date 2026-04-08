import { motion, Variants } from "motion/react";
import { IMPACT_STATS } from "../constants";
import { cn } from "../lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } 
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as any }
  }
};

export function Hero() {
  const title = "Engineering the narratives that drive market-winning products.";
  const words = title.split(" ");

  // Duplicate stats for seamless loop
  const duplicatedStats = [...IMPACT_STATS, ...IMPACT_STATS, ...IMPACT_STATS];

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[100px] will-change-transform"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] will-change-transform"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center lg:text-left lg:items-start mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full"
        >
          <h1 className="text-5xl md:text-[110px] font-display font-black leading-[0.85] mb-16 tracking-tighter text-balance max-w-6xl">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={cn(
                  "inline-block mr-[0.2em]",
                  ["narratives", "market-winning", "products"].includes(word.replace(/[.,]/g, "").toLowerCase()) ? "text-brand" : ""
                )}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 w-full border-t border-white/5 pt-12">
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed"
            >
              I help B2B SaaS and API companies translate complex products 
              into compelling market stories — from positioning to pipeline.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Moving Horizontal Stats Bar */}
      <div className="w-full relative py-12 border-y border-surface-border bg-surface-soft/30 backdrop-blur-sm overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap gap-24 items-center px-12"
        >
          {duplicatedStats.map((stat, idx) => (
            <div 
              key={`${stat.label}-${idx}`}
              className="flex items-center gap-8 group"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <span className="text-4xl md:text-6xl font-display font-black text-brand group-hover:scale-110 transition-transform">
                    {stat.value}
                  </span>
                  <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                    {(stat as any).emoji}
                  </span>
                </div>
                <span className="text-sm md:text-base text-white/40 font-bold uppercase tracking-[0.3em]">
                  {stat.label}
                </span>
              </div>
              {/* Separator */}
              <div className="w-2 h-2 bg-brand/30 rounded-full mx-4" />
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Fades for the Ticker */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />
      </div>
    </section>
  );
}

