import React, { useState } from "react";
import { Send, Phone, Mail, User, MessageSquare, CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT_INFO } from "../constants";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SuccessParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: "50%",
            y: "50%" 
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: `${50 + (Math.random() - 0.5) * 100}%`,
            y: `${50 + (Math.random() - 0.5) * 100}%`,
          }}
          transition={{ 
            duration: 2,
            delay: 0.2 + Math.random() * 0.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="absolute w-2 h-2 bg-brand rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const path = 'contacts';
      await addDoc(collection(db, path), {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        message: formData.reason,
        createdAt: serverTimestamp()
      });
      
      setIsSubmitted(true);
      setFormData({ name: "", mobile: "", email: "", reason: "" });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'contacts');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter leading-[0.85]">
              Let's <span className="text-brand">Connect</span>
            </h1>
            <p className="text-2xl text-white/60 max-w-xl leading-relaxed mb-12">
              Whether you have a project in mind, want to discuss data strategy, 
              or just want to say hello, I'm always open to new opportunities.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-surface-soft border border-surface-border rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Email</div>
                  <div className="text-xl font-display font-bold">{CONTACT_INFO.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-surface-soft border border-surface-border rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Mobile</div>
                  <div className="text-xl font-display font-bold">+91 {CONTACT_INFO.mobile}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="bg-surface-soft border border-surface-border p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-12 relative"
                >
                  <SuccessParticles />
                  
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20, 
                      delay: 0.1 
                    }}
                    className="w-24 h-24 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-8 relative z-10"
                  >
                    <CheckCircle2 size={48} strokeWidth={2.5} />
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-display font-black mb-4 tracking-tight relative z-10"
                  >
                    Message Sent!
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-white/60 mb-10 max-w-sm mx-auto leading-relaxed relative z-10"
                  >
                    Thank you for reaching out. I'll review your inquiry and get back to you shortly.
                  </motion.p>
                  
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05, gap: "1rem" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                    className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-brand hover:text-white transition-all shadow-xl shadow-white/5 flex items-center gap-2 mx-auto relative z-10"
                  >
                    <ArrowLeft size={18} />
                    Go Back to Form
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-surface border border-surface-border rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:border-brand/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                        <input
                          required
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="+91 00000 00000"
                          className="w-full bg-surface border border-surface-border rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:border-brand/50 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-surface border border-surface-border rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:border-brand/50 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Reason for Connecting</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-6 top-6 text-white/20" size={20} />
                      <textarea
                        required
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Tell me about your project or inquiry..."
                        rows={5}
                        className="w-full bg-surface border border-surface-border rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:border-brand/50 focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className={cn(
                      "w-full bg-brand text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-brand/20",
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-brand/40"
                    )}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Background Decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand/5 blur-[60px] rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
