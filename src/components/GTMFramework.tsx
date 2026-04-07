import { motion } from "motion/react";
import { FRAMEWORK } from "../constants";
import * as Icons from "lucide-react";

export function GTMFramework() {
  return (
    <section className="py-24 px-6 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-7xl font-display font-black mb-6 tracking-tighter">
            The <span className="text-brand">GTM</span> Engine
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            My systematic approach to launching and scaling products in 
            the B2B SaaS and API ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {FRAMEWORK.map((step, idx) => {
            const Icon = (Icons as any)[step.icon];
            const id = (idx + 1).toString().padStart(2, '0');
            
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-8 rounded-3xl bg-surface-soft border border-surface-border group hover:border-brand/30 transition-all"
              >
                <div className="text-6xl font-display font-black text-white/5 absolute top-4 right-8 group-hover:text-brand/10 transition-colors">
                  {id}
                </div>
                
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                  {Icon && <Icon size={28} />}
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4 tracking-tight leading-tight">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
