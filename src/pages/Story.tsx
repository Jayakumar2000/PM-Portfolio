import { useRef } from "react";
import { CERTIFICATIONS, PROFILE_IMAGE, CAREER_TIMELINE, PMM_STRATEGIES, PM_FRAMEWORKS } from "../constants";
import * as Icons from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { CTA } from "../components/CTA";

export function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div className="pt-40">
      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-9xl font-display font-black mb-12 tracking-tighter leading-[0.85]"
          >
            My <span className="text-brand">Journey</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl text-white/60 max-w-3xl leading-relaxed"
          >
            My focus is Product Marketing and Growth GTM strategy, architecting 
            high-impact engines that transform complex technical products into 
            market-winning products.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section ref={ref} className="px-6 mb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
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
            </motion.div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand/20 blur-3xl rounded-full -z-10" />
          </div>
          
          <div className="space-y-8 text-xl text-white/60 leading-relaxed">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-10 tracking-tighter text-white text-balance">
              The intersection of <span className="text-brand italic">growth</span> and <span className="text-brand italic">strategy</span>.
            </h2>
            <p>
              I believe that a product's success isn't just about the code—it's 
              about the narrative we build around it. My journey has been about 
              finding the "Why" behind technical innovation and translating it 
              into the messaging and positioning that drives user acceptance.
            </p>
            <p>
              I've spent the last 5+ years at the forefront of B2B technology 
              and SaaS, leading cross-functional teams to deliver high-impact 
              GTM strategies that have collectively reached millions of users 
              and influenced $1M+ in ARR.
            </p>
            <p>
              A pivotal moment in my career was realizing that the best marketing 
              doesn't feel like marketing—it feels like a solution to a deeply 
              understood problem. This realization drives my approach to 
              positioning: it's about engineering high-conversion onboarding 
              flows and frameworks that turn technical features into 
              compelling business value.
            </p>
          </div>
        </div>
      </section>

      {/* Career Journey Section */}
      <section className="px-6 mb-40 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-6">
              Career <span className="text-brand">Journey</span>
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">
              From technical foundations to strategic product leadership.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-surface-border -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-24">
              {CAREER_TIMELINE.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-brand rounded-full -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(99,102,241,0.5)] hidden md:block" />
                  
                  <div className="w-full md:w-1/2 px-0 md:px-12">
                    <div className={`p-10 rounded-[40px] bg-surface-soft border border-surface-border hover:border-brand/30 transition-all group ${
                      idx % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}>
                      <span className="text-brand font-black text-4xl mb-4 block tracking-tighter">{item.year}</span>
                      <h3 className="text-2xl font-display font-bold mb-2 tracking-tight text-white">{item.title}</h3>
                      <p className="text-brand/80 font-bold uppercase tracking-widest text-xs mb-6">{item.company}</p>
                      <p className="text-white/60 leading-relaxed text-lg">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Playbook Section */}
      <section className="px-6 py-32 bg-surface-soft border-y border-surface-border mb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-6">
              Strategic <span className="text-brand">Playbook</span>
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">
              As a PMM who partners closely with product teams, I bring both marketing 
              and product management frameworks to every engagement.
            </p>
          </motion.div>
          
          <div className="space-y-32">
            {/* PMM Core Strategy */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-12 flex items-center gap-4">
                <span className="w-12 h-px bg-brand" />
                PMM Core Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PMM_STRATEGIES.map((step, idx) => {
                  const Icon = (Icons as any)[step.icon];
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="p-10 rounded-3xl bg-surface border border-surface-border group hover:border-brand/50 transition-all"
                    >
                      <div className="w-16 h-16 bg-brand text-white rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                        <Icon size={32} />
                      </div>
                      <h4 className="text-2xl font-display font-bold mb-6 tracking-tighter">{step.title}</h4>
                      <p className="text-white/60 leading-relaxed">{step.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* PM Frameworks */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-12 flex items-center gap-4">
                <span className="w-12 h-px bg-brand" />
                Product Management Frameworks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PM_FRAMEWORKS.map((step, idx) => {
                  const Icon = (Icons as any)[step.icon];
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="p-10 rounded-3xl bg-surface border border-surface-border group hover:border-brand/50 transition-all"
                    >
                      <div className="w-16 h-16 bg-brand text-white rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                        <Icon size={32} />
                      </div>
                      <h4 className="text-2xl font-display font-bold mb-6 tracking-tighter">{step.title}</h4>
                      <p className="text-white/60 leading-relaxed">{step.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="px-6 mb-40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-16 tracking-tighter text-center">
            Professional <span className="text-brand">Certifications</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="p-10 rounded-3xl bg-surface border border-surface-border text-center group hover:border-brand/30 transition-all">
                <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-brand group-hover:text-white transition-all">
                  <Icons.Award size={32} />
                </div>
                <h4 className="text-2xl font-display font-bold mb-4">{cert.name}</h4>
                <p className="text-white/40 font-bold uppercase tracking-widest text-sm mb-2">{cert.issuer}</p>
                <p className="text-brand font-black text-xl">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
