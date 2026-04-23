import { useState, useEffect } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const USER_SKILLS = ["HTML", "CSS", "JavaScript", "Git", "Figma", "Python", "SQL", "Communication"];

const CAREER_DATA = {
  "Frontend Developer": {
    required: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Git", "Testing", "Webpack", "Accessibility"],
    path: [
      { step: 1, title: "Solidify JavaScript Fundamentals", desc: "Master ES6+, async/await, closures, and the event loop.", duration: "3–4 weeks" },
      { step: 2, title: "Learn React & Component Architecture", desc: "Build reusable components, understand props, state, and lifecycle.", duration: "4–6 weeks" },
      { step: 3, title: "TypeScript Foundations", desc: "Add type safety to your JS projects. Learn interfaces and generics.", duration: "2–3 weeks" },
      { step: 4, title: "Testing with Jest & RTL", desc: "Write unit and integration tests. Embrace TDD practices.", duration: "2 weeks" },
      { step: 5, title: "Build & Deploy Portfolio Projects", desc: "Ship 3 real-world projects to GitHub and host them live.", duration: "Ongoing" },
    ],
  },
  "Data Scientist": {
    required: ["Python", "SQL", "Statistics", "Machine Learning", "Pandas", "NumPy", "Data Visualization", "Deep Learning", "Communication"],
    path: [
      { step: 1, title: "Statistics & Probability", desc: "Understand distributions, hypothesis testing, and Bayesian thinking.", duration: "3 weeks" },
      { step: 2, title: "Data Wrangling with Pandas & NumPy", desc: "Clean, transform, and explore real datasets efficiently.", duration: "3–4 weeks" },
      { step: 3, title: "Machine Learning with Scikit-Learn", desc: "Regression, classification, clustering, and model evaluation.", duration: "6–8 weeks" },
      { step: 4, title: "Data Visualization", desc: "Communicate insights with Matplotlib, Seaborn, and Plotly.", duration: "2 weeks" },
      { step: 5, title: "Deep Learning Fundamentals", desc: "Neural networks, CNNs, and intro to PyTorch/TensorFlow.", duration: "4–6 weeks" },
    ],
  },
  "UI/UX Designer": {
    required: ["Figma", "User Research", "Prototyping", "Wireframing", "Design Systems", "Accessibility", "CSS", "Visual Design", "Usability Testing"],
    path: [
      { step: 1, title: "Design Thinking & Research Methods", desc: "Interviews, surveys, personas, and journey maps.", duration: "2 weeks" },
      { step: 2, title: "Wireframing & Information Architecture", desc: "Structure content before adding visual design.", duration: "2–3 weeks" },
      { step: 3, title: "Advanced Figma", desc: "Components, auto-layout, variables, and prototyping flows.", duration: "3 weeks" },
      { step: 4, title: "Design Systems", desc: "Build consistent, scalable UI with tokens and documentation.", duration: "3 weeks" },
      { step: 5, title: "Usability Testing & Iteration", desc: "Test with real users, analyze findings, and iterate.", duration: "Ongoing" },
    ],
  },
  "Cybersecurity Analyst": {
    required: ["Networking", "Linux", "Python", "Threat Analysis", "SIEM Tools", "Penetration Testing", "Cryptography", "Incident Response", "Compliance"],
    path: [
      { step: 1, title: "Networking Fundamentals", desc: "TCP/IP, DNS, HTTP, firewalls, and VPNs.", duration: "3 weeks" },
      { step: 2, title: "Linux & Command Line", desc: "Navigate, manage, and secure Linux systems.", duration: "2–3 weeks" },
      { step: 3, title: "Threat Analysis & SOC Basics", desc: "Understand attack vectors, MITRE ATT&CK, and SOC workflows.", duration: "4 weeks" },
      { step: 4, title: "SIEM & Monitoring Tools", desc: "Hands-on with Splunk, ELK, or Microsoft Sentinel.", duration: "3–4 weeks" },
      { step: 5, title: "Certifications: CompTIA Security+", desc: "Validate your skills with an industry-recognized certification.", duration: "6–8 weeks" },
    ],
  },
};

const SKILL_META = {
  React: { desc: "Build fast, component-driven UIs with the world's most popular frontend library.", difficulty: "Intermediate", icon: "⚛️" },
  TypeScript: { desc: "Add static typing to JavaScript for safer, more maintainable codebases.", difficulty: "Intermediate", icon: "🔷" },
  Testing: { desc: "Write unit and integration tests to ensure your code works reliably.", difficulty: "Intermediate", icon: "🧪" },
  Webpack: { desc: "Bundle and optimize JavaScript modules for production.", difficulty: "Advanced", icon: "📦" },
  Accessibility: { desc: "Design and build inclusive interfaces usable by everyone.", difficulty: "Intermediate", icon: "♿" },
  Statistics: { desc: "The mathematical foundation of data science and ML models.", difficulty: "Intermediate", icon: "📐" },
  "Machine Learning": { desc: "Train models that learn patterns and make predictions from data.", difficulty: "Advanced", icon: "🤖" },
  Pandas: { desc: "Python's go-to library for data manipulation and analysis.", difficulty: "Beginner", icon: "🐼" },
  NumPy: { desc: "High-performance numerical computing in Python.", difficulty: "Beginner", icon: "🔢" },
  "Data Visualization": { desc: "Turn raw data into clear, compelling visual stories.", difficulty: "Beginner", icon: "📊" },
  "Deep Learning": { desc: "Build neural networks for images, language, and complex patterns.", difficulty: "Advanced", icon: "🧠" },
  "User Research": { desc: "Discover user needs through interviews, surveys, and observation.", difficulty: "Beginner", icon: "🔍" },
  Prototyping: { desc: "Create interactive mockups to test ideas before building.", difficulty: "Beginner", icon: "🖱️" },
  Wireframing: { desc: "Sketch the structure and layout of interfaces early in the process.", difficulty: "Beginner", icon: "✏️" },
  "Design Systems": { desc: "Build consistent, scalable UI component libraries with documentation.", difficulty: "Advanced", icon: "🗂️" },
  "Visual Design": { desc: "Apply typography, color, spacing, and hierarchy to create beautiful UIs.", difficulty: "Intermediate", icon: "🎨" },
  "Usability Testing": { desc: "Validate designs with real users to find and fix friction points.", difficulty: "Intermediate", icon: "🧑‍💻" },
  Networking: { desc: "Understand how data moves across systems, protocols, and infrastructure.", difficulty: "Intermediate", icon: "🌐" },
  Linux: { desc: "Operate, secure, and automate tasks on Linux-based systems.", difficulty: "Intermediate", icon: "🐧" },
  "Threat Analysis": { desc: "Identify, assess, and respond to security vulnerabilities and threats.", difficulty: "Advanced", icon: "🛡️" },
  "SIEM Tools": { desc: "Use security information and event management tools to detect incidents.", difficulty: "Advanced", icon: "🔭" },
  "Penetration Testing": { desc: "Ethically hack systems to find vulnerabilities before attackers do.", difficulty: "Advanced", icon: "🔓" },
  Cryptography: { desc: "Apply encryption and hashing to protect data confidentiality and integrity.", difficulty: "Advanced", icon: "🔐" },
  "Incident Response": { desc: "Contain, eradicate, and recover from security incidents efficiently.", difficulty: "Advanced", icon: "🚨" },
  Compliance: { desc: "Understand regulatory frameworks like GDPR, HIPAA, and ISO 27001.", difficulty: "Intermediate", icon: "📋" },
};

const DIFFICULTY_STYLE = {
  Beginner: { bg: "rgba(233,128,116,0.12)", color: "#E98074", dot: "#E98074" },
  Intermediate: { bg: "rgba(232,90,79,0.1)", color: "#E85A4F", dot: "#E85A4F" },
  Advanced: { bg: "rgba(142,141,138,0.12)", color: "#8E8D8A", dot: "#8E8D8A" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillPill({ name, variant = "owned" }) {
  const styles = {
    owned: { bg: "rgba(232,90,79,0.1)", border: "rgba(232,90,79,0.3)", color: "#E85A4F" },
    required: { bg: "rgba(216,195,165,0.4)", border: "#D8C3A5", color: "#2e2d2b" },
    gap: { bg: "rgba(233,128,116,0.12)", border: "rgba(233,128,116,0.4)", color: "#E98074" },
    match: { bg: "rgba(232,90,79,0.08)", border: "rgba(232,90,79,0.2)", color: "#E85A4F" },
  };
  const s = styles[variant];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "6px 14px", borderRadius: "100px",
      backgroundColor: s.bg, border: `1px solid ${s.border}`,
      color: s.color, fontSize: "12px", fontWeight: "600",
      fontFamily: "Georgia, serif", letterSpacing: "0.02em",
      whiteSpace: "nowrap",
    }}>
      {variant === "owned" || variant === "match" ? "✓ " : ""}{name}
    </span>
  );
}

function GapCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);
  const meta = SKILL_META[skill] || { desc: "A key skill required for this career path.", difficulty: "Intermediate", icon: "🎯" };
  const diff = DIFFICULTY_STYLE[meta.difficulty];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#EAE7DC" : "#F5F2EC",
        border: hovered ? "1.5px solid #E98074" : "1.5px solid #D8C3A5",
        borderRadius: "16px",
        padding: "20px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 12px 32px rgba(233,128,116,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>{meta.icon}</span>
          <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#2e2d2b", fontFamily: "Georgia, serif" }}>{skill}</h4>
        </div>
        <span style={{
          fontSize: "10px", fontWeight: "700", padding: "3px 10px", borderRadius: "100px",
          backgroundColor: diff.bg, color: diff.color,
          letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Georgia, serif",
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: diff.dot, display: "inline-block" }} />
          {meta.difficulty}
        </span>
      </div>
      <p style={{ margin: "0 0 14px", fontSize: "13px", color: "#8E8D8A", lineHeight: "1.6", fontFamily: "Georgia, serif" }}>{meta.desc}</p>
      <button style={{
        width: "100%", padding: "9px", borderRadius: "10px",
        border: "1.5px solid #E98074", backgroundColor: "transparent",
        color: "#E98074", fontSize: "12px", fontWeight: "600",
        cursor: "pointer", fontFamily: "Georgia, serif",
        transition: "all 0.2s",
        letterSpacing: "0.02em",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E98074"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#E98074"; }}
      >
        View Learning Resources →
      </button>
    </div>
  );
}

function CircularProgress({ percentage }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;

  return (
    <div style={{ position: "relative", width: "140px", height: "140px", flexShrink: 0 }}>
      <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="#D8C3A5" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke="#E85A4F" strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: "26px", fontWeight: "700", color: "#E85A4F", fontFamily: "Georgia, serif", lineHeight: 1 }}>{percentage}%</span>
        <span style={{ fontSize: "11px", color: "#8E8D8A", fontFamily: "Georgia, serif", marginTop: "3px" }}>Match</span>
      </div>
    </div>
  );
}

function TimelineStep({ step, title, desc, duration, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {/* Line + dot */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: "34px", height: "34px", borderRadius: "50%",
          backgroundColor: hovered ? "#E85A4F" : "#EAE7DC",
          border: `2px solid ${hovered ? "#E85A4F" : "#D8C3A5"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: "700", color: hovered ? "#fff" : "#E85A4F",
          fontFamily: "Georgia, serif", transition: "all 0.2s", flexShrink: 0,
          zIndex: 1,
        }}>
          {step}
        </div>
        {!isLast && <div style={{ width: "2px", flex: 1, backgroundColor: "#D8C3A5", marginTop: "4px", minHeight: "28px" }} />}
      </div>
      {/* Content */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex: 1, paddingBottom: isLast ? 0 : "20px",
          backgroundColor: hovered ? "#EAE7DC" : "transparent",
          borderRadius: "12px", padding: "10px 14px",
          border: hovered ? "1px solid #D8C3A5" : "1px solid transparent",
          transition: "all 0.2s", cursor: "default",
          marginBottom: isLast ? 0 : "4px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", flexWrap: "wrap" }}>
          <h4 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "700", color: "#2e2d2b", fontFamily: "Georgia, serif" }}>{title}</h4>
          <span style={{
            fontSize: "11px", padding: "2px 10px", borderRadius: "100px",
            backgroundColor: "rgba(233,128,116,0.12)", color: "#E98074",
            fontFamily: "Georgia, serif", fontWeight: "600", whiteSpace: "nowrap",
          }}>
            {duration}
          </span>
        </div>
        <p style={{ margin: 0, fontSize: "13px", color: "#8E8D8A", lineHeight: "1.5", fontFamily: "Georgia, serif" }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SkillGap() {
  const [selectedCareer, setSelectedCareer] = useState("Frontend Developer");
  const [analyzed, setAnalyzed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [matchPct, setMatchPct] = useState(0);

  const careers = Object.keys(CAREER_DATA);
  const data = CAREER_DATA[selectedCareer];

  const matchedSkills = USER_SKILLS.filter((s) => data.required.includes(s));
  const gapSkills = data.required.filter((s) => !USER_SKILLS.includes(s));
  const rawPct = Math.round((matchedSkills.length / data.required.length) * 100);

  const handleAnalyze = () => {
    setAnimating(true);
    setAnalyzed(false);
    setMatchPct(0);
    setTimeout(() => {
      setAnalyzed(true);
      setAnimating(false);
      setTimeout(() => setMatchPct(rawPct), 100);
    }, 700);
  };

  // Auto-analyze on mount
  useEffect(() => {
    setTimeout(() => {
      setAnalyzed(true);
      setTimeout(() => setMatchPct(rawPct), 200);
    }, 400);
  }, []);

  // Re-animate when career changes (if already analyzed)
  useEffect(() => {
    if (analyzed) {
      setMatchPct(0);
      setTimeout(() => setMatchPct(rawPct), 100);
    }
  }, [selectedCareer]);

  return (
    <div style={{ backgroundColor: "#F5F2EC", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .section-enter { animation: fadeUp 0.4s ease both; }
      `}</style>

      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── 1. Page Header ─────────────────────────────────────── */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "14px", padding: "6px 16px", borderRadius: "100px", backgroundColor: "rgba(232,90,79,0.08)", border: "1px solid rgba(232,90,79,0.2)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#E85A4F", display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#E85A4F", letterSpacing: "0.1em", textTransform: "uppercase" }}>Career Intelligence</span>
          </div>
          <h1 style={{ margin: "0 0 12px", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: "700", color: "#2e2d2b", lineHeight: "1.2" }}>
            Skill Gap{" "}
            <span style={{ color: "#E85A4F", borderBottom: "3px solid #E98074", paddingBottom: "2px" }}>Analysis</span>
          </h1>
          <p style={{ margin: 0, fontSize: "16px", color: "#8E8D8A", maxWidth: "480px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.6" }}>
            Identify the skills you need to reach your target career — and chart the fastest path to get there.
          </p>
        </div>

        {/* ── 2. Career Selection Card ────────────────────────────── */}
        <div className="fade-up" style={{ animationDelay: "0.1s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "20px", padding: "28px 32px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
          <div style={{ flex: 1, minWidth: "220px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "700", marginBottom: "8px" }}>
              🎯 Target Career Path
            </label>
            <div style={{ position: "relative" }}>
              <select
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                style={{
                  width: "100%", padding: "12px 44px 12px 16px",
                  borderRadius: "12px", border: "1.5px solid #D8C3A5",
                  backgroundColor: "#F5F2EC", color: "#2e2d2b",
                  fontSize: "15px", fontFamily: "Georgia, serif",
                  fontWeight: "600", outline: "none", appearance: "none", cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#E85A4F")}
                onBlur={(e) => (e.target.style.borderColor = "#D8C3A5")}
              >
                {careers.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <svg style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8D8A" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "11px", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "700" }}>Your Skills</span>
            <span style={{ fontSize: "22px", fontWeight: "700", color: "#2e2d2b" }}>{USER_SKILLS.length} <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8D8A" }}>assessed</span></span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "700" }}>Required Skills</span>
            <span style={{ fontSize: "22px", fontWeight: "700", color: "#2e2d2b" }}>{data.required.length} <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8D8A" }}>for role</span></span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={animating}
            style={{
              padding: "13px 28px", borderRadius: "12px",
              border: "none", backgroundColor: animating ? "#D8C3A5" : "#E85A4F",
              color: animating ? "#8E8D8A" : "#fff", fontSize: "14px", fontWeight: "700",
              cursor: animating ? "not-allowed" : "pointer", fontFamily: "Georgia, serif",
              transition: "all 0.2s", letterSpacing: "0.02em", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: "8px",
              boxShadow: animating ? "none" : "0 4px 16px rgba(232,90,79,0.25)",
            }}
            onMouseEnter={(e) => { if (!animating) e.currentTarget.style.backgroundColor = "#d44f44"; }}
            onMouseLeave={(e) => { if (!animating) e.currentTarget.style.backgroundColor = "#E85A4F"; }}
          >
            {animating
              ? <><span style={{ animation: "pulse 1s infinite", display: "inline-block" }}>⏳</span> Analyzing…</>
              : <><span>⚡</span> Analyze Skills</>
            }
          </button>
        </div>

        {analyzed && (
          <>
            {/* ── 3. Skill Comparison ──────────────────────────────── */}
            <div className="section-enter" style={{ animationDelay: "0s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "20px", padding: "28px 32px", marginBottom: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              <h2 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: "700", color: "#2e2d2b", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "3px", height: "18px", backgroundColor: "#E85A4F", borderRadius: "2px", display: "inline-block" }} />
                Skill Comparison
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "24px", alignItems: "start" }}>
                {/* Your skills */}
                <div>
                  <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    ✦ Your Current Skills
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {USER_SKILLS.map((s) => (
                      <SkillPill key={s} name={s} variant={data.required.includes(s) ? "match" : "owned"} />
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", paddingTop: "28px" }}>
                  <div style={{ width: "1px", height: "60px", backgroundColor: "#D8C3A5" }} />
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#D8C3A5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>↔</div>
                  <div style={{ width: "1px", height: "60px", backgroundColor: "#D8C3A5" }} />
                </div>

                {/* Required skills */}
                <div>
                  <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    ◈ Required for {selectedCareer}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {data.required.map((s) => (
                      <SkillPill key={s} name={s} variant={USER_SKILLS.includes(s) ? "match" : "gap"} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── 5. Progress Visualization ────────────────────────── */}
            <div className="section-enter" style={{ animationDelay: "0.05s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "20px", padding: "28px 32px", marginBottom: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              <h2 style={{ margin: "0 0 24px", fontSize: "16px", fontWeight: "700", color: "#2e2d2b", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "3px", height: "18px", backgroundColor: "#E98074", borderRadius: "2px", display: "inline-block" }} />
                Match Overview
              </h2>
              <div style={{ display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
                <CircularProgress percentage={matchPct} />
                <div style={{ flex: 1, minWidth: "220px" }}>
                  {/* Horizontal bar breakdown */}
                  {[
                    { label: "Skills You Have", value: matchedSkills.length, total: data.required.length, color: "#E85A4F" },
                    { label: "Skills to Learn", value: gapSkills.length, total: data.required.length, color: "#E98074" },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "13px", color: "#2e2d2b", fontFamily: "Georgia, serif" }}>{item.label}</span>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: item.color, fontFamily: "Georgia, serif" }}>
                          {item.value} / {item.total}
                        </span>
                      </div>
                      <div style={{ backgroundColor: "#D8C3A5", borderRadius: "100px", height: "8px", overflow: "hidden" }}>
                        <div style={{
                          width: `${(item.value / item.total) * 100}%`,
                          height: "100%", backgroundColor: item.color,
                          borderRadius: "100px",
                          transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
                        }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: "12px 16px", borderRadius: "12px", backgroundColor: matchPct >= 70 ? "rgba(232,90,79,0.08)" : "rgba(233,128,116,0.1)", border: `1px solid ${matchPct >= 70 ? "rgba(232,90,79,0.2)" : "rgba(233,128,116,0.25)"}` }}>
                    <p style={{ margin: 0, fontSize: "13px", color: "#2e2d2b", lineHeight: "1.5", fontFamily: "Georgia, serif" }}>
                      {matchPct >= 75
                        ? `🎉 Strong foundation! You already have ${matchPct}% of required skills. Focus on the ${gapSkills.length} gaps to be job-ready.`
                        : matchPct >= 50
                        ? `📈 Good progress at ${matchPct}% match. Bridge ${gapSkills.length} skill gaps to become competitive for ${selectedCareer}.`
                        : `🚀 You're at ${matchPct}% — a great starting point. Follow the learning path below to fill ${gapSkills.length} critical gaps.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 4. Skill Gap Results ─────────────────────────────── */}
            {gapSkills.length > 0 && (
              <div className="section-enter" style={{ animationDelay: "0.1s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "20px", padding: "28px 32px", marginBottom: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                  <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#2e2d2b", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "3px", height: "18px", backgroundColor: "#E85A4F", borderRadius: "2px", display: "inline-block" }} />
                    Skills to Acquire
                  </h2>
                  <span style={{ fontSize: "11px", padding: "4px 14px", borderRadius: "100px", backgroundColor: "rgba(232,90,79,0.1)", color: "#E85A4F", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {gapSkills.length} gaps identified
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
                  {gapSkills.map((skill, i) => (
                    <GapCard key={skill} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* ── 6. Learning Path ─────────────────────────────────── */}
            <div className="section-enter" style={{ animationDelay: "0.15s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "20px", padding: "28px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "10px" }}>
                <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#2e2d2b", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "3px", height: "18px", backgroundColor: "#E98074", borderRadius: "2px", display: "inline-block" }} />
                  Recommended Learning Path
                </h2>
                <span style={{ fontSize: "11px", padding: "4px 14px", borderRadius: "100px", backgroundColor: "#D8C3A5", color: "#8E8D8A", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {selectedCareer}
                </span>
              </div>
              <div style={{ paddingLeft: "4px" }}>
                {data.path.map((p, i) => (
                  <TimelineStep
                    key={p.step}
                    step={p.step}
                    title={p.title}
                    desc={p.desc}
                    duration={p.duration}
                    isLast={i === data.path.length - 1}
                  />
                ))}
              </div>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}