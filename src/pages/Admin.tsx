import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, LogOut, Mail, Phone, User, Clock, MessageSquare, Shield, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";

const ADMIN_EMAIL = "jayakumarm.0801@gmail.com";

interface ContactEntry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  createdAt: Timestamp | null;
}

export function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL && user.emailVerified) {
      fetchContacts();
    }
  }, [user]);

  const handleSignIn = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message || "Sign-in failed");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setContacts([]);
  };

  const fetchContacts = async () => {
    setFetching(true);
    setError(null);
    try {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const entries: ContactEntry[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContactEntry[];
      setContacts(entries);
    } catch (err: any) {
      setError(err.message || "Failed to fetch contacts");
    } finally {
      setFetching(false);
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isAdmin = user && user.email === ADMIN_EMAIL && user.emailVerified;

  if (loading) {
    return (
      <div className="pt-40 pb-24 px-6 min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-40 pb-24 px-6 min-h-[70vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-surface-soft border border-surface-border rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Shield size={40} className="text-brand" />
          </div>
          <h1 className="text-4xl font-display font-black mb-4 tracking-tight">Admin Access</h1>
          <p className="text-lg text-white/60 mb-10 leading-relaxed">Sign in with your Google account to view contact submissions and site analytics.</p>
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 mb-6 text-sm">{error}</div>}
          <motion.button onClick={handleSignIn} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold flex items-center gap-3 mx-auto shadow-xl hover:shadow-white/10 transition-shadow">
            <LogIn size={22} />
            Sign in with Google
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-40 pb-24 px-6 min-h-[70vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Shield size={40} className="text-red-400" />
          </div>
          <h1 className="text-4xl font-display font-black mb-4 tracking-tight">Access Denied</h1>
          <p className="text-lg text-white/60 mb-4">Signed in as <span className="text-white font-bold">{user.email}</span></p>
          <p className="text-white/40 mb-10">This dashboard is restricted to authorized administrators only.</p>
          <motion.button onClick={handleSignOut} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="bg-surface-soft border border-surface-border text-white px-8 py-4 rounded-full font-bold hover:border-brand/50 transition-all">Sign Out</motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-2">Admin <span className="text-brand">Dashboard</span></h1>
            <p className="text-white/60">Signed in as <span className="text-white font-medium">{user.email}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button onClick={fetchContacts} disabled={fetching} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-brand text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50">
              <RefreshCw size={18} className={fetching ? "animate-spin" : ""} />
              Refresh
            </motion.button>
            <motion.button onClick={handleSignOut} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-surface-soft border border-surface-border text-white px-6 py-3 rounded-full font-bold hover:border-brand/50 transition-all flex items-center gap-2">
              <LogOut size={18} />
              Sign Out
            </motion.button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Submissions", value: contacts.length, icon: MessageSquare, color: "text-brand" },
            { label: "This Month", value: contacts.filter((c) => { if (!c.createdAt) return false; const d = c.createdAt.toDate(); const now = new Date(); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length, icon: Clock, color: "text-green-400" },
            { label: "Unique Emails", value: new Set(contacts.map((c) => c.email)).size, icon: Mail, color: "text-blue-400" },
            { label: "Latest", value: contacts.length > 0 && contacts[0].createdAt ? formatDate(contacts[0].createdAt).split(",")[0] : "\u2014", icon: User, color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface-soft border border-surface-border rounded-3xl p-6 hover:border-brand/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className={"w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center " + stat.color}>
                  <stat.icon size={20} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</span>
              </div>
              <div className="text-3xl font-display font-black">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 mb-8 text-sm">{error}</div>}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-display font-bold mb-6">Contact Submissions <span className="text-white/40 text-lg ml-3">({contacts.length})</span></h2>
          {fetching && contacts.length === 0 ? (
            <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" /></div>
          ) : contacts.length === 0 ? (
            <div className="bg-surface-soft border border-surface-border rounded-3xl p-16 text-center">
              <MessageSquare size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-lg">No contact submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact, idx) => (
                <motion.div key={contact.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * idx }} className="bg-surface-soft border border-surface-border rounded-2xl overflow-hidden hover:border-brand/30 transition-all">
                  <button onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)} className="w-full p-6 flex items-center justify-between text-left">
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="flex items-center gap-2"><User size={16} className="text-brand" /><span className="font-bold text-white">{contact.name}</span></div>
                      <div className="flex items-center gap-2"><Mail size={14} className="text-white/40" /><span className="text-white/60 text-sm">{contact.email}</span></div>
                      <div className="flex items-center gap-2"><Phone size={14} className="text-white/40" /><span className="text-white/60 text-sm">{contact.mobile}</span></div>
                      <div className="flex items-center gap-2"><Clock size={14} className="text-white/40" /><span className="text-white/40 text-xs">{formatDate(contact.createdAt)}</span></div>
                    </div>
                    {expandedId === contact.id ? <ChevronUp size={20} className="text-white/40 shrink-0" /> : <ChevronDown size={20} className="text-white/40 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {expandedId === contact.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-6 pb-6 pt-2 border-t border-surface-border">
                          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Message</p>
                          <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
