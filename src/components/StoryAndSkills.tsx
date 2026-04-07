import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PROFILE_IMAGE, SKILLS } from "../constants";
import * as Icons from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } 
  },
};

export function StoryAndSkills() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="py-32 px-6 bg-surface overflow-hidden relative">
      {/* Unified Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-brand/10 blur-[120px] rounded-full will-change-transform" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Sticky Profile & Narrative Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
            <div className="relative flex justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                viewport={{ once: true }}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [3, 5, 3]
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1 },
                  scale: { duration: 1 }
                }}
                className="relative w-full max-w-[320px] aspect-[4/5] rounded-[50px] border-[10px] border-white shadow-[0_25px_50px_rgba(0,0,0,0.4)] overflow-hidden z-10"
              >
                <motion.img 
                  style={{ y }}
                  src={PROFILE_IMAGE} 
                  alt="Jayakumar"
                  className="w-full h-full object-cover scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Name & Designation Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-3xl font-display font-black tracking-tighter text-white mb-1">JAYAKUMAR</h3>
                    <p className="text-brand font-bold uppercase tracking-[0.2em] text-[10px]">Product Marketing & Growth Lead</p>
                  </motion.div>
                </div>
              </motion.div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand/20 blur-3xl rounded-full -z-10" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-brand" />
                <span className="text-brand font-bold uppercase tracking-[0.3em] text-xs">The Narrative</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-[0.95]">
                Product without <span className="text-brand">positioning</span> is just code.
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                I bridge the gap between what a product <span className="text-white italic">is</span> and what it <span className="text-white italic">means</span> to the market. 
                This is how growth gets built.
              </p>
              <div className="pt-4">
                {/* Removed self-attribution */}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Story & Integrated Skills */}
          <div className="lg:col-span-7 space-y-24">
            <div className="space-y-8 text-xl text-white/70 leading-relaxed">
              <p>
                I architect the entire market entry and expansion narrative for complex B2B SaaS and API products. 
                My work is centered on defining the messaging and positioning that drives user acceptance and market impact.
              </p>
              <p>
                By aligning technical architecture with strategic business goals, I ensure that every product feature 
                serves a clear market purpose. I don't just manage launches; I build the engines that drive sustainable revenue.
              </p>
            </div>

            {/* Integrated Skills Grid */}
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <div className="h-px flex-grow bg-surface-border" />
                <div className="text-brand font-bold uppercase tracking-[0.3em] text-xs whitespace-nowrap">Strategic Toolkit</div>
                <div className="h-px flex-grow bg-surface-border" />
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {SKILLS.map((skill) => {
                  const Icon = (Icons as any)[skill.icon];
                  return (
                    <motion.div
                      key={skill.category}
                      variants={itemVariants}
                      className="p-8 rounded-[40px] bg-surface-soft border border-surface-border hover:border-brand/30 transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                          <Icon size={20} />
                        </div>
                        <h3 className="text-xl font-display font-bold tracking-tight">{skill.category}</h3>
                      </div>
                      
                      <p className="text-sm text-white/50 mb-6 leading-relaxed">
                        {skill.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span key={item} className="text-xs font-bold text-white/40 border border-white/5 px-3 py-1.5 rounded-full group-hover:border-brand/20 group-hover:text-white/70 transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <motion.button 
              onClick={() => navigate('/story')}
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-4 text-2xl font-display font-black text-white hover:text-brand transition-colors group"
            >
              Explore My Story
              <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
