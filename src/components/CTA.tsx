import { ArrowRight, Mail, Linkedin } from "lucide-react";
import * as Icons from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "../constants";

export function CTA() {
    return (
          <section className="py-32 px-6 bg-brand relative overflow-hidden">
            {/* Interactive Background Elements */}
                <div className="absolute inset-0 -z-10">
                        <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 10, 0] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-0 left-0 w-full h-full bg-white/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"
                                  />
                        <motion.div
                                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-20 -right-20 w-96 h-96 bg-black/10 rounded-full blur-[100px]"
                                  />
                </div>div>
          
                <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                  >
                                  <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-12 tracking-tighter leading-[0.9]">
                                              Let's build the <span className="text-black italic">next</span>span> big thing.
                                  </h2>h2>
                                  <p className="text-2xl text-white/80 max-w-2xl mx-auto mb-16 leading-relaxed">
                                              Ready to transform your product strategies into a competitive advantage? Let's find where your product needs to go next.
                                  </p>p>
                        
                                  <div className="flex flex-wrap justify-center gap-6 mb-24">
                                              <Link to="/contact">
                                                            <motion.button
                                                                              whileHover={{ scale: 1.05, y: -5 }}
                                                                              whileTap={{ scale: 0.95 }}
                                                                              className="bg-white text-brand px-12 py-6 rounded-full text-2xl font-black transition-all flex items-center gap-4 group shadow-2xl hover:shadow-white/20"
                                                                            >
                                                                            Get In Touch
                                                                            <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                                                            </motion.button>motion.button>
                                              </Link>Link>
                                              <motion.a
                                                              href={CONTACT_INFO.resumeUrl}
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                              whileHover={{ scale: 1.05, y: -5 }}
                                                               whileTap={{ scale: 0.95 }}
                                                              className="bg-black text-white px-12 py-6 rounded-full text-2xl font-black hover:bg-white hover:text-black transition-all shadow-2xl hover:shadow-black/20 inline-block"
                                                            >
                                                            Download Resume
                                              </motion.a>motion.a>
                                  </div>div>
                        
                                  <div className="flex flex-wrap justify-center gap-12">
                                    {[
                                    { icon: Mail, label: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                                    { icon: Linkedin, label: "LinkedIn", href: CONTACT_INFO.linkedin },
                                    { icon: Icons.MapPin, label: CONTACT_INFO.location, href: undefined },
                                    { icon: Icons.Phone, label: CONTACT_INFO.mobile, href: `tel:+91${CONTACT_INFO.mobile}` }
                                                ].map((item, idx) => {
                                                                const content = (
                                                                                  <>
                                                                                                    <item.icon size={24} className="group-hover/link:rotate-12 transition-transform" />
                                                                                                    <span className="text-lg font-bold">{item.label}</span>span>
                                                                                  </>>
                                                                                );
                                                  
                                                                return item.href ? (
                                                                                  <motion.a
                                                                                                      key={item.label}
                                                                                                      href={item.href}
                                                                                                      target={item.href.startsWith('http') ? '_blank' : undefined}
                                                                                                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                                                                      initial={{ opacity: 0, y: 10 }}
                                                                                                      whileInView={{ opacity: 1, y: 0 }}
                                                                                                      viewport={{ once: true, amount: 0.1 }}
                                                                                                      transition={{ delay: 0.5 + (idx * 0.1) }}
                                                                                                      whileHover={{ y: -5, scale: 1.1 }}
                                                                                                      className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group/link"
                                                                                                    >
                                                                                    {content}
                                                                                  </motion.a>motion.a>
                                                                                ) : (
                                                                                  <motion.span
                                                                                                      key={item.label}
                                                                                                      initial={{ opacity: 0, y: 10 }}
                                                                                                      whileInView={{ opacity: 1, y: 0 }}
                                                                                                      viewport={{ once: true, amount: 0.1 }}
                                                                                                      transition={{ delay: 0.5 + (idx * 0.1) }}
                                                                                                      className="flex items-center gap-3 text-white/80 group/link"
                                                                                                    >
                                                                                    {content}
                                                                                  </motion.span>motion.span>
                                                                                );
                                                })}
                                  </div>div>
                        </motion.div>motion.div>
                </div>div>
          </section>section>
        );
}</></section>
