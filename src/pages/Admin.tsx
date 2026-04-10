import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, LogOut, Mail, Phone, User, Clock, MessageSquare, Shield, RefreshCw, ChevronDown, ChevronUp, Eye, Monitor, Globe, BarChart3, Smartphone } from "lucide-react";
import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { collection, query, orderBy, getDocs, Timestamp, limit as fbLimit } from "firebase/firestore";

const ADMIN_EMAIL = "jayakumarm.0801@gmail.com";

interface ContactEntry { id: string; name: string; email: string; mobile: string; message: string; createdAt: Timestamp | null; }
interface PageView { id: string; path: string; device: string; browser: string; region: string; referrer: string; timestamp: Timestamp | null; }

function countBy<T>(arr: T[], fn: (item: T) => string): Record<string, number> {
  const map: Record<string, number> = {};
  arr.forEach(item => { const key = fn(item); map[key] = (map[key] || 0) + 1; });
  return map;
}

function sortedEntries(obj: Record<string, number>): [string, number][] {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: any; color: string }) {
  return (
    <div className="bg-surface-soft border border-surface-border rounded-3xl p-6 hover:border-brand/30 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={"w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center " + color}><Icon size={20} /></div>
        <span className="text-xs font-bold uppercase tracking-widest text-white/40">{label}</span>
      </div>
      <div className="text-3xl font-display font-black">{value}</div>
    </div>
  );
}

function BarRow({ label, count, max }: { label: string; count: number; max: number }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-white/60 w-28 truncate" title={label}>{label}</span>
      <div className="flex-grow h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: pct + "%" }} transition={{ duration: 0.6, ease: "easeOut" }} className="h-full bg-brand rounded-full" />
      </div>
      <span className="text-sm font-bold text-white/80 w-10 text-right">{count}</span>
    </div>
  );
}

export function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"contacts" | "analytics">("analytics");

  useEffect(() => { const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); }); return () => unsub(); }, []);
  useEffect(() => { if (user && user.email === ADMIN_EMAIL && user.emailVerified) { fetchAll(); } }, [user]);

  const handleSignIn = async () => { try { setError(null); await signInWithPopup(auth, new GoogleAuthProvider()); } catch (err: any) { setError(err.message); } };
  const handleSignOut = async () => { await signOut(auth); setContacts([]); setPageViews([]); };

  const fetchAll = async () => {
    setFetching(true); setError(null);
    try {
      const [contactSnap, viewSnap] = await Promise.all([
        getDocs(query(collection(db, "contacts"), orderBy("createdAt", "desc"))),
        getDocs(query(collection(db, "page_views"), orderBy("timestamp", "desc"), fbLimit(500)))
      ]);
      setContacts(contactSnap.docs.map(d => ({ id: d.id, ...d.data() })) as ContactEntry[]);
      setPageViews(viewSnap.docs.map(d => ({ id: d.id, ...d.data() })) as PageView[]);
    } catch (err: any) { setError(err.message); }
    finally { setFetching(false); }
  };

  const formatDate = (ts: Timestamp | null) => {
    if (!ts) return "N/A";
    return ts.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const isAdmin = user && user.email === ADMIN_EMAIL && user.emailVerified;

  if (loading) return <div className="pt-40 pb-24 px-6 min-h-[70vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" /></div>;

  if (!user) return (
    <div className="pt-40 pb-24 px-6 min-h-[70vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-surface-soft border border-surface-border rounded-3xl flex items-center justify-center mx-auto mb-8"><Shield size={40} className="text-brand" /></div>
        <h1 className="text-4xl font-display font-black mb-4 tracking-tight">Admin Access</h1>
        <p className="text-lg text-white/60 mb-10">Sign in with your Google account to view analytics and contact submissions.</p>
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 mb-6 text-sm">{error}</div>}
        <motion.button onClick={handleSignIn} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold flex items-center gap-3 mx-auto shadow-xl"><LogIn size={22} /> Sign in with Google</motion.button>
      </motion.div>
    </div>
  );

  if (!isAdmin) return (
    <div className="pt-40 pb-24 px-6 min-h-[70vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8"><Shield size={40} className="text-red-400" /></div>
        <h1 className="text-4xl font-display font-black mb-4">Access Denied</h1>
        <p className="text-lg text-white/60 mb-4">Signed in as <span className="text-white font-bold">{user.email}</span></p>
        <p className="text-white/40 mb-10">Restricted to authorized administrators.</p>
        <motion.button onClick={handleSignOut} whileHover={{ scale: 1.03 }} className="bg-surface-soft border border-surface-border text-white px-8 py-4 rounded-full font-bold">Sign Out</motion.button>
      </motion.div>
    </div>
  );

  // Analytics computed data
  const todayViews = pageViews.filter(v => { if (!v.timestamp) return false; const d = v.timestamp.toDate(); const now = new Date(); return d.toDateString() === now.toDateString(); }).length;
  const weekViews = pageViews.filter(v => { if (!v.timestamp) return false; const d = v.timestamp.toDate(); const now = new Date(); const weekAgo = new Date(now.getTime() - 7 * 86400000); return d >= weekAgo; }).length;
  const uniqueSessions = new Set(pageViews.map(v => (v as any).sessionId)).size;
  const topPages = sortedEntries(countBy(pageViews, v => v.path));
  const devices = sortedEntries(countBy(pageViews, v => v.device || "Unknown"));
  const browsers = sortedEntries(countBy(pageViews, v => v.browser || "Unknown"));
  const regions = sortedEntries(countBy(pageViews, v => v.region || "Unknown"));
  const referrers = sortedEntries(countBy(pageViews, v => { const r = v.referrer || "direct"; if (r === "direct" || r === "") return "Direct"; try { return new URL(r).hostname; } catch { return r; } }));
  const maxPage = topPages.length > 0 ? topPages[0][1] : 1;
  const maxDevice = devices.length > 0 ? devices[0][1] : 1;
  const maxBrowser = browsers.length > 0 ? browsers[0][1] : 1;
  const maxRegion = regions.length > 0 ? regions[0][1] : 1;
  const maxRef = referrers.length > 0 ? referrers[0][1] : 1;

  // Daily views for last 7 days
  const dailyViews: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const count = pageViews.filter(v => { if (!v.timestamp) return false; return v.timestamp.toDate().toDateString() === d.toDateString(); }).length;
    dailyViews.push({ day: key, count });
  }
  const maxDaily = Math.max(...dailyViews.map(d => d.count), 1);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-2">Admin <span className="text-brand">Dashboard</span></h1>
            <p className="text-white/60">Signed in as <span className="text-white font-medium">{user.email}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button onClick={fetchAll} disabled={fetching} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-brand text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50"><RefreshCw size={18} className={fetching ? "animate-spin" : ""} /> Refresh</motion.button>
            <motion.button onClick={handleSignOut} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-surface-soft border border-surface-border text-white px-6 py-3 rounded-full font-bold hover:border-brand/50 transition-all flex items-center gap-2"><LogOut size={18} /> Sign Out</motion.button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-surface-soft rounded-full p-1.5 w-fit border border-surface-border">
          {(["analytics", "contacts"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={"px-6 py-2.5 rounded-full text-sm font-bold transition-all " + (activeTab === tab ? "bg-brand text-white shadow-lg" : "text-white/60 hover:text-white")}>{tab === "analytics" ? "Analytics" : "Contacts (" + contacts.length + ")"}</button>
          ))}
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 mb-8 text-sm">{error}</div>}
        <AnimatePresence mode="wait">
          {activeTab === "analytics" ? (
            <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <StatCard label="Total Views" value={pageViews.length} icon={Eye} color="text-brand" />
                <StatCard label="Today" value={todayViews} icon={BarChart3} color="text-green-400" />
                <StatCard label="This Week" value={weekViews} icon={Clock} color="text-blue-400" />
                <StatCard label="Unique Sessions" value={uniqueSessions} icon={User} color="text-purple-400" />
              </div>

              {/* 7 Day Chart */}
              <div className="bg-surface-soft border border-surface-border rounded-3xl p-8 mb-10">
                <h3 className="text-lg font-display font-bold mb-6">Last 7 Days</h3>
                <div className="flex items-end gap-3 h-40">
                  {dailyViews.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-bold text-white/60">{d.count}</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: (d.count / maxDaily) * 100 + "%" }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full bg-brand rounded-t-lg min-h-[4px]" style={{ maxHeight: "100%" }} />
                      <span className="text-[10px] text-white/40 font-bold">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breakdown Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-surface-soft border border-surface-border rounded-3xl p-8">
                  <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2"><Eye size={18} className="text-brand" /> Top Pages</h3>
                  <div className="space-y-3">{topPages.slice(0, 6).map(([p, c]) => <BarRow key={p} label={p === "/" ? "Home" : p.replace("/", "")} count={c} max={maxPage} />)}</div>
                </div>
                <div className="bg-surface-soft border border-surface-border rounded-3xl p-8">
                  <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2"><Globe size={18} className="text-brand" /> Regions</h3>
                  <div className="space-y-3">{regions.slice(0, 6).map(([r, c]) => <BarRow key={r} label={r} count={c} max={maxRegion} />)}</div>
                </div>
                <div className="bg-surface-soft border border-surface-border rounded-3xl p-8">
                  <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2"><Smartphone size={18} className="text-brand" /> Devices</h3>
                  <div className="space-y-3">{devices.map(([d, c]) => <BarRow key={d} label={d} count={c} max={maxDevice} />)}</div>
                </div>
                <div className="bg-surface-soft border border-surface-border rounded-3xl p-8">
                  <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2"><Monitor size={18} className="text-brand" /> Browsers</h3>
                  <div className="space-y-3">{browsers.map(([b, c]) => <BarRow key={b} label={b} count={c} max={maxBrowser} />)}</div>
                </div>
              </div>

              {/* Referrers */}
              <div className="bg-surface-soft border border-surface-border rounded-3xl p-8">
                <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2"><Globe size={18} className="text-brand" /> Traffic Sources</h3>
                <div className="space-y-3">{referrers.slice(0, 8).map(([r, c]) => <BarRow key={r} label={r} count={c} max={maxRef} />)}</div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="contacts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <StatCard label="Total Submissions" value={contacts.length} icon={MessageSquare} color="text-brand" />
                <StatCard label="This Month" value={contacts.filter(c => { if (!c.createdAt) return false; const d = c.createdAt.toDate(); const now = new Date(); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length} icon={Clock} color="text-green-400" />
                <StatCard label="Unique Emails" value={new Set(contacts.map(c => c.email)).size} icon={Mail} color="text-blue-400" />
                <StatCard label="Latest" value={contacts.length > 0 && contacts[0].createdAt ? formatDate(contacts[0].createdAt).split(",")[0] : "\u2014"} icon={User} color="text-purple-400" />
              </div>
              {contacts.length === 0 ? (
                <div className="bg-surface-soft border border-surface-border rounded-3xl p-16 text-center"><MessageSquare size={48} className="text-white/20 mx-auto mb-4" /><p className="text-white/40 text-lg">No contact submissions yet.</p></div>
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
