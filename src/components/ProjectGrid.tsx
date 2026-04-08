import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../constants";
import { motion, useScroll, useTransform, Variants } from "motion/react";

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
    hidden: { opacity: 0, y: 15 },
    visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    },
};

export function ProjectGrid() {
    return (
          <section className="py-24 px-6 bg-surface-soft">
                <div className="max-w-7xl mx-auto">
                        <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.01, margin: "200px" }}
                                    transition={{ duration: 0.8 }}
                                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
                                  >
                                  <div className="max-w-2xl">
                                              <h2 className="text-4xl md:text-7xl font-display font-black mb-6 tracking-tighter">
                                                            Case <span className="text-brand">Studies</span>
                                              </h2>
                                              <p className="text-xl text-white/60 leading-relaxed">
                                                            A selection of strategic launches and growth initiatives where positioning met execution to deliver measurable revenue impact.
                                              </p>
                                  </div>
                        </motion.div>
                
                        <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.01, margin: "200px" }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                  >
                          {PROJECTS.map((project) => (
                                                <ProjectCard key={project.id} project={project} />
                                              ))}
                        </motion.div>
                </div>
          </section>
        );
}

function ProjectCard({ project }: { project: any; key?: string | number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
          target: ref,
          offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  
    return (
          <motion.div
                  ref={ref}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group relative bg-surface border border-surface-border rounded-3xl overflow-hidden hover:border-brand/50 transition-all"
                >
                <div className="aspect-[4/3] overflow-hidden relative">
                        <motion.img
                                    style={{ y }}
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover scale-110"
                                    referrerPolicy="no-referrer"
                                  />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-40" />
                </div>
                <div className="p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag: string) => (
                              <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                        </div>
                
                        <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand transition-colors">
                          {project.title}
                        </h3>
                
                        <p className="text-white/60 mb-8 line-clamp-2">
                          {project.description}
                        </p>
                
                        <div className="grid grid-cols-3 gap-4 border-t border-surface-border pt-6">
                          {project.stats.map((stat: any) => (
                              <div key={stat.label}>
                                            <div className="text-lg font-display font-black text-brand">{stat.value}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
                              </div>
                            ))}
                        </div>
                
                        <motion.a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${project.title} case study`}
                                    whileHover={{ scale: 1.1, rotate: 45 }}
                                    className="absolute top-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-brand hover:text-white shadow-xl"
                                  >
                                  <ArrowUpRight size={24} />
                        </motion.a>
                </div>
          </motion.div>
        );
}
