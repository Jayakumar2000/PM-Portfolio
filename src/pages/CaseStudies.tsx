import { useRef } from "react";
import { PROJECTS } from "../constants";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { CTA } from "../components/CTA";
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

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as any }
  }
};

export function CaseStudies() {
  const title = "The Strategic Playbook";
  const words = title.split(" ");

  return (
    <div className="pt-40 relative overflow-hidden">
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
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[150px]"
        />
      </div>

      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-6xl md:text-9xl font-display font-black mb-12 tracking-tighter leading-[0.85] text-balance"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={cn(
                  "inline-block mr-[0.2em]",
                  ["Strategic", "Playbook"].includes(word.replace(/[.,]/g, "")) ? "text-brand" : ""
                )}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl text-white/60 max-w-3xl leading-relaxed"
          >
            Every project starts with a customer problem. Here's how I turn 
            those problems into market opportunities through strategic 
            positioning and GTM orchestration.
          </motion.p>
        </div>
      </section>

      {/* PMM Methodology Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              id: "01", 
              title: "Insight", 
              desc: "I use win/loss interviews, G2 reviews, and competitive teardowns to identify high-leverage market gaps and customer pain points." 
            },
            { 
              id: "02", 
              title: "Strategy", 
              desc: "I craft messaging and positioning frameworks that drive user acceptance and differentiate from the noise." 
            },
            { 
              id: "03", 
              title: "Execution", 
              desc: "I orchestrate multi-channel launches and optimize for activation and growth using data-backed funnel experiments and enablement." 
            }
          ].map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-surface-soft border border-surface-border hover:border-brand/30 transition-all group"
            >
              <div className="text-4xl font-display font-black text-brand mb-4 group-hover:scale-110 transition-transform origin-left">{item.id}.</div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-widest mb-4">{item.title}</h3>
              <p className="text-white/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 space-y-32 mb-32">
        {PROJECTS.map((project, idx) => (
          <ProjectRow key={project.id} project={project} idx={idx} />
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-32 bg-surface-soft relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-10" />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-display font-black mb-16 tracking-tighter text-center">
            Cross-Functional <span className="text-brand">Impact</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Jayakumar's ability to translate complex product features into compelling value propositions was instrumental in our successful GTM for the B2B intelligence platform.",
                author: "Head of Product",
                company: "SaaS Intelligence Startup"
              },
              {
                quote: "The sales enablement assets provided by Jayakumar directly impacted our win rate and shortened our sales cycle by 50%.",
                author: "Sales Director",
                company: "Global Data Provider"
              }
            ].map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-[40px] bg-surface border border-surface-border hover:border-brand/30 transition-all group relative"
              >
                <div className="text-6xl font-serif text-brand/20 absolute top-8 left-8 group-hover:text-brand/40 transition-colors">"</div>
                <p className="text-2xl text-white/80 italic mb-8 relative z-10">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-brand transition-colors">{t.author}</div>
                    <div className="text-sm text-white/40">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}

function ProjectRow({ project, idx }: { project: any; idx: number; key?: string | number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <div
      ref={ref}
      className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      <motion.div 
        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={cn("order-2 lg:order-1 space-y-8", idx % 2 === 1 ? "lg:order-2" : "lg:order-1")}
      >
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag: string, i: number) => (
            <motion.span 
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              className="text-xs font-bold uppercase tracking-widest text-brand border border-brand/20 bg-brand/5 px-4 py-2 rounded-full"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter group-hover:text-brand transition-colors">
          {project.title}
        </h2>
        
        <p className="text-xl text-white/60 leading-relaxed">
          {project.description}
        </p>

        {project.id === "zomato-passport" && (
          <p className="text-xs text-white/40 italic">
            *Achieved through a multi-channel "Contextual Discovery" campaign that reduced cognitive load at the point of decision.
          </p>
        )}
        
        <div className="grid grid-cols-3 gap-8 border-y border-surface-border py-12">
          {project.stats.map((stat: any) => (
            <div key={stat.label} className="group/stat">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-display font-black text-brand mb-2 group-hover/stat:scale-110 transition-transform origin-left"
              >
                {stat.value}
              </motion.div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <motion.a 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, x: 10 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-4 text-2xl font-display font-black text-white hover:text-brand transition-colors group"
        >
          Read Full Case Study
          <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
        </motion.a>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, x: idx % 2 === 0 ? 50 : -50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={cn("relative order-1 lg:order-2", idx % 2 === 1 ? "lg:order-1" : "lg:order-2")}
      >
        <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl group relative border border-white/5">
          <motion.img 
            style={{ y }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover scale-110 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-40" />
          
          <motion.a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="absolute top-8 right-8 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-10 hover:bg-brand hover:text-white transition-all"
          >
            <ArrowUpRight size={32} />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

