import React from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   SVG icon helpers – no Material Symbols needed
   ───────────────────────────────────────────── */
const IconChart = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconLock = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconBuilding = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M3 21h18M9 21V7l6-4v18M9 11h6M9 15h6" />
  </svg>
);
const IconArchive = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ─────────────────────────────────────
   Feature card data
   ───────────────────────────────────── */
const features = [
  {
    icon: <IconChart />,
    title: "Real-Time Transparency",
    desc: "Track the lifecycle of every claim with millisecond accuracy. Our live dashboard provides granular insights into approvals, queries, and disbursements.",
    accent: "blue",
    wide: true,
    dark: false,
  },
  {
    icon: <IconLock />,
    title: "Secure Protocols",
    desc: "End-to-end encryption using military-grade standards ensures medical data remains private and tamper-proof throughout the archival process.",
    accent: "slate",
    wide: false,
    dark: true,
  },
  {
    icon: <IconBuilding />,
    title: "Institutional Access",
    desc: "Direct integration hooks for hospitals, clinics, and tertiary care centers to automate documentation flow.",
    accent: "blue",
    wide: false,
    dark: false,
    cta: true,
  },
  {
    icon: <IconArchive />,
    title: "The Archival Integrity",
    desc: "We don't just process claims; we curate a medical history. Every submission is formatted into a permanent, searchable archive for lifetime policy management.",
    accent: "amber",
    wide: true,
    dark: false,
    amber: true,
  },
];

/* ─────────────────────────────────────
   Stat pill
   ───────────────────────────────────── */
const Stat = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mt-1">{label}</div>
  </div>
);

/* ─────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────── */
const Landing = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-white text-gray-900 flex flex-col">

      {/* Google Fonts + Material Symbols not used for icons but kept for typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');

        .hero-bg {
          background: linear-gradient(135deg, #0f1829 0%, #1a2744 60%, #0c1f3f 100%);
        }
        .grid-overlay {
          background-image:
            linear-gradient(rgba(99,179,237,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.07) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.10);
        }
        .btn-primary {
          background: #2563eb;
          color: #fff;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
        .btn-ghost {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.18);
          transition: background 0.2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.14); }
        .nav-link {
          position: relative;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          transition: color 0.2s;
        }
        .nav-link:hover { color: #fff; }
        .nav-link.active { color: #60a5fa; }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0; right: 0;
          height: 2px;
          background: #60a5fa;
          border-radius: 2px;
        }
        .feature-card {
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .playfair { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* ══════════════════════════════
          NAVBAR
      ══════════════════════════════ */}
      <nav style={{ background: "rgba(15,24,41,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <span className="playfair font-bold text-white text-xl tracking-tight">
            <span style={{ color: "#60a5fa" }}>AARO</span>GAYA
          </span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Claims", "Policy", "Support"].map((item, i) => (
              <a key={item} href="#" className={`nav-link${i === 0 ? " active" : ""}`}>{item}</a>
            ))}
          </div>

          {/* Register */}
          <Link to="/register">
            <button className="btn-primary px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
              Register
            </button>
          </Link>
        </div>
      </nav>

      <main className="flex-1 pt-[72px]">

        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <section className="hero-bg relative overflow-hidden min-h-screen flex items-center">
          <div className="grid-overlay absolute inset-0 pointer-events-none" />

          {/* Glow blobs */}
          <div style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)", position: "absolute", top: "10%", right: "-80px", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(99,179,237,0.10) 0%, transparent 70%)", position: "absolute", bottom: "15%", left: "-60px", borderRadius: "50%", pointerEvents: "none" }} />

          <div className="relative max-w-7xl mx-auto w-full px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full"
                style={{ background: "rgba(99,179,237,0.1)", border: "1px solid rgba(99,179,237,0.25)" }}>
                <span className="status-dot" style={{ background: "#60a5fa", boxShadow: "0 0 6px #60a5fa" }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#93c5fd" }}>
                  Est. 2024 · Archival Standards
                </span>
              </div>

              <h1 className="playfair text-white mb-6 leading-[1.08]"
                style={{ fontSize: "clamp(42px, 6vw, 76px)" }}>
                The <em style={{ color: "#60a5fa" }}>Curated</em><br />
                Standard for<br />
                Health Claims.
              </h1>

              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 17, lineHeight: 1.75, maxWidth: 480 }} className="mb-10">
                Aarogaya bridges the gap between medical institutions and insurance providers through a high-fidelity, archival claims management system designed for clinical precision.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <button className="btn-primary px-7 py-3.5 rounded-xl font-semibold text-sm shadow-xl">
                  Begin Institutional Setup
                </button>
                <button className="btn-ghost px-7 py-3.5 rounded-xl font-semibold text-sm">
                  View Archival Protocols
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
                <Stat value="99.8%" label="Claims Success Rate" />
                <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.12)" }} />
                <Stat value="2.4M+" label="Documents Processed" />
                <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.12)" }} />
                <Stat value="&lt;24h" label="Avg. Settlement" />
              </div>
            </div>

            {/* Right – claim card stack */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                {/* Main image card */}
                <div style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV8U7UN4T5u58auExxciAL2lGY_o5nLUfX7hJHx-upwwA6BluCQpLpODCa5ITENS-6Zi36ZmdP3m0To-QCcBsh8vlgRsMX-4eTpjzu8Ck8DiJR8JgLR8GyqulgmKDGRbKMumETBOP-LBp_NRBZ8h5LiUF1yFOJAvZvc6QPh-7yQ1d1GSoqQGoBWreQ95Dpmlba7woAZ4514DnyaATvQrqt1s22HPKYkf0D6B7qXZop6T5mlshCjkxN3at56Y5fLpY-Smyphj6qM1k"
                    alt="Serene medical interior"
                    style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
                  />
                  {/* Claim status list */}
                  <div style={{ background: "rgba(17,26,48,0.96)", padding: "20px" }}>
                    {[
                      { color: "#4ade80", label: "Claim Verified",    sub: "Apollo Hospital · ₹2,40,000" },
                      { color: "#fbbf24", label: "Under Review",      sub: "Fortis Healthcare · ₹85,000" },
                      { color: "#60a5fa", label: "Docs Requested",    sub: "Max Hospital · ₹1,10,000" },
                    ].map((item) => (
                      <div key={item.label}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, marginBottom: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <span className="status-dot" style={{ background: item.color, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                          <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, marginTop: 1 }}>{item.sub}</div>
                        </div>
                        <IconShield style={{ color: item.color, flexShrink: 0, width: 16 }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            FEATURES
        ══════════════════════════════ */}
        <section style={{ background: "#f8f9fb", padding: "96px 0" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", marginBottom: 12 }}>
                Platform Features
              </p>
              <h2 className="playfair" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#0f172a", marginBottom: 12 }}>
                Unparalleled Precision
              </h2>
              <p style={{ color: "#64748b", fontStyle: "italic", fontSize: 16 }}>
                Every document, every claim, meticulously curated to institutional standards.
              </p>
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 20 }}>

              {/* Real-Time – spans 7 */}
              <div className="card-hover feature-card"
                style={{
                  gridColumn: "span 7",
                  background: "#0f172a",
                  color: "#fff",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 280,
                }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa" }}>
                  <IconChart />
                </div>
                <div>
                  <h3 className="playfair" style={{ fontSize: 24, marginBottom: 10, color: "#fff" }}>Real-Time Transparency</h3>
                  <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: 14, maxWidth: 360 }}>
                    Track the lifecycle of every claim with millisecond accuracy. Our live dashboard provides granular insights into approvals, queries, and disbursements.
                  </p>
                </div>
                {/* Mini chart decoration */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginTop: "auto", paddingTop: 16 }}>
                  {[40, 65, 48, 80, 60, 90, 72, 95].map((h, i) => (
                    <div key={i} style={{ width: 20, height: h * 0.8, background: i === 7 ? "#60a5fa" : "rgba(96,165,250,0.25)", borderRadius: "4px 4px 0 0" }} />
                  ))}
                </div>
              </div>

              {/* Secure – spans 5 */}
              <div className="card-hover feature-card"
                style={{ gridColumn: "span 5", background: "#fff", border: "1px solid #e2e8f0", color: "#0f172a", minHeight: 280 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                  <IconLock />
                </div>
                <div>
                  <h3 className="playfair" style={{ fontSize: 22, marginBottom: 10, color: "#0f172a" }}>Secure Protocols</h3>
                  <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 14 }}>
                    End-to-end encryption using military-grade standards ensures medical data remains private and tamper-proof throughout the archival process.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 16 }}>
                  {["AES-256", "HIPAA", "ISO 27001"].map((badge) => (
                    <span key={badge} style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", background: "#eff6ff", color: "#2563eb", padding: "4px 10px", borderRadius: 20, border: "1px solid #bfdbfe" }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Institutional – spans 5 */}
              <div className="card-hover feature-card"
                style={{ gridColumn: "span 5", background: "#fff", border: "1px solid #e2e8f0", color: "#0f172a" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a" }}>
                  <IconBuilding />
                </div>
                <div>
                  <h3 className="playfair" style={{ fontSize: 22, marginBottom: 10, color: "#0f172a" }}>Institutional Access</h3>
                  <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 14 }}>
                    Direct integration hooks for hospitals, clinics, and tertiary care centers to automate documentation flow.
                  </p>
                </div>
                <button style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, color: "#2563eb", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Learn More <IconArrow />
                </button>
              </div>

              {/* Archival – spans 7, amber */}
              <div className="card-hover feature-card"
                style={{ gridColumn: "span 7", background: "#fefce8", border: "1px solid #fde68a", color: "#0f172a", position: "relative", overflow: "hidden" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(217,119,6,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706" }}>
                  <IconArchive />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="playfair" style={{ fontSize: 24, marginBottom: 10, color: "#0f172a" }}>The Archival Integrity</h3>
                  <p style={{ color: "#78716c", lineHeight: 1.7, fontSize: 14, maxWidth: 380 }}>
                    We don't just process claims; we curate a medical history. Every submission is formatted into a permanent, searchable archive for lifetime policy management.
                  </p>
                </div>
                {/* Decorative scroll icon */}
                <div style={{
                  position: "absolute", bottom: -20, right: -20,
                  width: 120, height: 120,
                  background: "rgba(217,119,6,0.08)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="48" height="48" fill="none" stroke="#d97706" strokeWidth="1.2" viewBox="0 0 24 24" style={{ opacity: 0.5 }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            NARRATIVE
        ══════════════════════════════ */}
        <section style={{ background: "#fff", padding: "96px 0" }}>
          <div className="max-w-4xl mx-auto px-6">
            <div style={{ borderLeft: "4px solid #2563eb", paddingLeft: 48, paddingTop: 8, paddingBottom: 8 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#2563eb", marginBottom: 20 }}>
                Institutional Standards
              </p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#0f172a", lineHeight: 1.2, marginBottom: 32 }}>
                A commitment to clarity in an era of complexity.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, color: "#475569", fontSize: 17, lineHeight: 1.8 }}>
                <p>
                  Aarogaya was founded on the principle that health insurance should be an extension of care, not a bureaucratic hurdle. By applying high-end editorial standards to medical documentation, we ensure that every claim tells a complete, indisputable story.
                </p>
                <p>
                  Our platform handles the synthesis of medical records, laboratory results, and policy clauses into a unified, archival-grade dossier. This "Digital Curator" approach significantly reduces query rates and accelerates the timeline from admission to settlement.
                </p>
              </div>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 44 }}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5HCkQIWv2OvPDrHwMaldOX6TNuKGo7GIC4uHBZBo9bEzDzV2P3NV4xHEdSUzmR7JJhDuCY1BbWpq1CHljcagSje5hLwnN6JmtUrfjzHnwbPiuKiPQpoI_9gbVvQ7mGV__13oe6PLGq_DrKrVGlc_y1juXc-uGW0EdNNuhRkhLqgr5u859DwYlAksxN6ukGsVFTVrSTstNjdR40BcvS1Aw5O5HlQMuirzh5eBjrwabUkdzyywwsF35IXpQ_t0880RQODbhL0YwXE0"
                  alt="Dr. Elena Sterling"
                  style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "3px solid #dbeafe" }}
                />
                <div>
                  <p className="playfair" style={{ fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Dr. Elena Sterling</p>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#94a3b8", marginTop: 2 }}>
                    Chief of Institutional Relations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            CTA BANNER
        ══════════════════════════════ */}
        <section style={{ background: "#0f172a", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#60a5fa", marginBottom: 16 }}>
            Get Started Today
          </p>
          <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#fff", marginBottom: 16 }}>
            Ready to modernise your claims workflow?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, marginBottom: 40 }}>
            Join leading hospitals and insurers already on the Aarogaya platform.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register">
              <button className="btn-primary px-8 py-4 rounded-xl font-semibold text-sm shadow-xl">
                Start Free Trial
              </button>
            </Link>
            <button className="btn-ghost px-8 py-4 rounded-xl font-semibold text-sm">
              Schedule a Demo
            </button>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer style={{ background: "#0a1120", padding: "64px 32px 32px" }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 48, marginBottom: 48 }}>
            {/* Brand */}
            <div style={{ maxWidth: 280 }}>
              <span className="playfair" style={{ fontSize: 22, color: "#60a5fa", display: "block", marginBottom: 14, fontStyle: "italic" }}>
                AAROGAYA
              </span>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
                Redefining the architecture of health insurance management through scholarly precision and institutional trust.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
              {[
                { heading: "Platform", links: ["Claims Portal", "Institutional API", "Security"] },
                { heading: "Archival",  links: ["Documentation", "Standards", "Audit Logs"] },
                { heading: "Legal",    links: ["Privacy Policy", "Terms of Service", "Institutional Access"] },
              ].map((col) => (
                <div key={col.heading}>
                  <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
                    {col.heading}
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={e => e.target.style.color = "#60a5fa"}
                          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider + bottom */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>© 2024 AAROGAYA. Archival Health Excellence.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Institutional Access"].map((item) => (
                <a key={item} href="#" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textDecoration: "underline" }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════
          MOBILE BOTTOM NAV
      ══════════════════════════════ */}
      <nav className="md:hidden" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(10,17,32,0.95)", backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex", justifyContent: "space-around", alignItems: "center", height: 64,
      }}>
        {[
          { icon: "🏠", label: "Home",    active: true  },
          { icon: "📄", label: "Claims",  active: false },
          { icon: "🛡️", label: "Policy",  active: false },
          { icon: "💬", label: "Support", active: false },
        ].map((item) => (
          <a key={item.label} href="#" style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textDecoration: "none",
            color: item.active ? "#60a5fa" : "rgba(255,255,255,0.35)",
            fontSize: 18,
          }}>
            <span>{item.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>{item.label}</span>
          </a>
        ))}
      </nav>

    </div>
  );
};

export default Landing;