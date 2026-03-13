import { useState, useEffect, useRef } from "react";

// ─── Mock Questions Data ──────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 1,
    category: "Interests",
    emoji: "🎯",
    question: "Which activity do you enjoy the most?",
    options: [
      { id: "a", label: "Building apps or websites", icon: "💻", career: ["Frontend Developer", "Full Stack Developer"] },
      { id: "b", label: "Analyzing data and patterns", icon: "📊", career: ["Data Scientist", "Data Analyst"] },
      { id: "c", label: "Designing visuals or interfaces", icon: "🎨", career: ["UI/UX Designer", "Graphic Designer"] },
      { id: "d", label: "Solving security or technical problems", icon: "🛡️", career: ["Cybersecurity Analyst", "DevOps Engineer"] },
    ],
  },
  {
    id: 2,
    category: "Subjects",
    emoji: "📚",
    question: "Which subjects do you enjoy the most?",
    options: [
      { id: "a", label: "Mathematics & Logic", icon: "🔢", career: ["Data Scientist", "Software Engineer"] },
      { id: "b", label: "Computer Science & Coding", icon: "⌨️", career: ["Frontend Developer", "Backend Developer"] },
      { id: "c", label: "Art, Design & Visual Thinking", icon: "🖌️", career: ["UI/UX Designer", "Graphic Designer"] },
      { id: "d", label: "Business & Strategy", icon: "📈", career: ["Product Manager", "Business Analyst"] },
    ],
  },
  {
    id: 3,
    category: "Work Style",
    emoji: "⚙️",
    question: "How do you prefer to spend your working hours?",
    options: [
      { id: "a", label: "Solving logical, code-based problems", icon: "🧩", career: ["Software Engineer", "Backend Developer"] },
      { id: "b", label: "Creating beautiful visual experiences", icon: "✨", career: ["UI/UX Designer", "Frontend Developer"] },
      { id: "c", label: "Interpreting data and building models", icon: "🔬", career: ["Data Scientist", "Data Analyst"] },
      { id: "d", label: "Protecting systems and finding vulnerabilities", icon: "🔐", career: ["Cybersecurity Analyst"] },
    ],
  },
  {
    id: 4,
    category: "Strengths",
    emoji: "💪",
    question: "What best describes your greatest strength?",
    options: [
      { id: "a", label: "Problem solving & debugging", icon: "🔧", career: ["Software Engineer", "Cybersecurity Analyst"] },
      { id: "b", label: "Creativity & visual thinking", icon: "🎭", career: ["UI/UX Designer", "Graphic Designer"] },
      { id: "c", label: "Analytical & critical thinking", icon: "🧠", career: ["Data Scientist", "Business Analyst"] },
      { id: "d", label: "Attention to detail & precision", icon: "🔍", career: ["QA Engineer", "Data Analyst"] },
    ],
  },
  {
    id: 5,
    category: "Work Environment",
    emoji: "🏢",
    question: "What type of work excites you the most?",
    options: [
      { id: "a", label: "Building and shipping digital products", icon: "🚀", career: ["Frontend Developer", "Full Stack Developer"] },
      { id: "b", label: "Researching trends and analyzing insights", icon: "📉", career: ["Data Scientist", "Market Analyst"] },
      { id: "c", label: "Designing seamless user experiences", icon: "🖥️", career: ["UI/UX Designer"] },
      { id: "d", label: "Securing infrastructure from threats", icon: "🛡️", career: ["Cybersecurity Analyst", "DevOps Engineer"] },
    ],
  },
  {
    id: 6,
    category: "Collaboration",
    emoji: "🤝",
    question: "How do you prefer to collaborate with others?",
    options: [
      { id: "a", label: "Work independently on deep technical tasks", icon: "🧑‍💻", career: ["Backend Developer", "Data Scientist"] },
      { id: "b", label: "Collaborate closely with designers and users", icon: "👥", career: ["UI/UX Designer", "Product Manager"] },
      { id: "c", label: "Lead cross-functional projects and teams", icon: "🧭", career: ["Product Manager", "Engineering Manager"] },
      { id: "d", label: "Work in a fast-paced, security-focused team", icon: "⚡", career: ["Cybersecurity Analyst", "DevOps Engineer"] },
    ],
  },
  {
    id: 7,
    category: "Tools",
    emoji: "🛠️",
    question: "Which type of tools do you enjoy using or learning?",
    options: [
      { id: "a", label: "Code editors, frameworks & dev tools", icon: "⌨️", career: ["Frontend Developer", "Backend Developer"] },
      { id: "b", label: "Design tools like Figma or Adobe XD", icon: "🎨", career: ["UI/UX Designer", "Graphic Designer"] },
      { id: "c", label: "Data platforms like Python, SQL, Tableau", icon: "📊", career: ["Data Scientist", "Data Analyst"] },
      { id: "d", label: "Security tools, networks & penetration testing", icon: "🔑", career: ["Cybersecurity Analyst"] },
    ],
  },
  {
    id: 8,
    category: "Goals",
    emoji: "🌟",
    question: "What motivates you most in your career?",
    options: [
      { id: "a", label: "Building products used by millions", icon: "🌍", career: ["Frontend Developer", "Product Manager"] },
      { id: "b", label: "Discovering insights that drive decisions", icon: "💡", career: ["Data Scientist", "Business Analyst"] },
      { id: "c", label: "Creating designs that delight users", icon: "🎯", career: ["UI/UX Designer"] },
      { id: "d", label: "Keeping systems and data safe", icon: "🔒", career: ["Cybersecurity Analyst", "DevOps Engineer"] },
    ],
  },
  {
    id: 9,
    category: "Learning Style",
    emoji: "📖",
    question: "How do you prefer to learn new skills?",
    options: [
      { id: "a", label: "Building hands-on projects and coding", icon: "🏗️", career: ["Frontend Developer", "Backend Developer"] },
      { id: "b", label: "Sketching, prototyping, and user testing", icon: "✏️", career: ["UI/UX Designer"] },
      { id: "c", label: "Studying data, stats, and running experiments", icon: "🧪", career: ["Data Scientist", "Data Analyst"] },
      { id: "d", label: "Researching vulnerabilities and attack patterns", icon: "🕵️", career: ["Cybersecurity Analyst"] },
    ],
  },
  {
    id: 10,
    category: "Impact",
    emoji: "🚀",
    question: "How do you want to make an impact through your work?",
    options: [
      { id: "a", label: "Shipping fast, iterating, and launching features", icon: "⚡", career: ["Frontend Developer", "Full Stack Developer"] },
      { id: "b", label: "Turning complex data into actionable strategy", icon: "📐", career: ["Data Scientist", "Business Analyst"] },
      { id: "c", label: "Making technology intuitive and human-centered", icon: "💛", career: ["UI/UX Designer", "Product Manager"] },
      { id: "d", label: "Making digital infrastructure resilient and secure", icon: "🏰", career: ["Cybersecurity Analyst", "DevOps Engineer"] },
    ],
  },
];

// ─── Career Scoring Logic ─────────────────────────────────────────────────────

function computeTopCareers(answers) {
  const scores = {};
  Object.values(answers).forEach(({ career }) => {
    career.forEach((c) => { scores[c] = (scores[c] || 0) + 1; });
  });
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, score]) => ({ name, score }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ emoji, label }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 14px", borderRadius: "100px", backgroundColor: "rgba(232,90,79,0.08)", border: "1px solid rgba(232,90,79,0.2)", marginBottom: "14px" }}>
      <span style={{ fontSize: "13px" }}>{emoji}</span>
      <span style={{ fontSize: "11px", fontWeight: "700", color: "#E85A4F", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Georgia, serif" }}>{label}</span>
    </div>
  );
}

function OptionCard({ option, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const active = selected;
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(option)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px 20px",
        borderRadius: "14px",
        border: active ? "2px solid #E85A4F" : hovered ? "2px solid #E98074" : "2px solid #D8C3A5",
        backgroundColor: active ? "rgba(232,90,79,0.07)" : hovered ? "rgba(233,128,116,0.05)" : "#F5F2EC",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "Georgia, serif",
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered && !active ? "translateX(4px)" : "none",
        boxShadow: active ? "0 4px 20px rgba(232,90,79,0.14)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Active left bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: active ? "4px" : "0px",
        backgroundColor: "#E85A4F",
        borderRadius: "0 4px 4px 0",
        transition: "width 0.2s ease",
      }} />

      {/* Icon bubble */}
      <div style={{
        width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
        backgroundColor: active ? "rgba(232,90,79,0.12)" : "#EAE7DC",
        border: `1px solid ${active ? "rgba(232,90,79,0.25)" : "#D8C3A5"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "20px", transition: "all 0.2s",
      }}>
        {option.icon}
      </div>

      <span style={{ flex: 1, fontSize: "14px", fontWeight: active ? "700" : "500", color: active ? "#2e2d2b" : "#3d3c39", lineHeight: "1.4" }}>
        {option.label}
      </span>

      {/* Checkmark */}
      <div style={{
        width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
        border: `2px solid ${active ? "#E85A4F" : "#D8C3A5"}`,
        backgroundColor: active ? "#E85A4F" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
      }}>
        {active && <svg width="10" height="10" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
    </button>
  );
}

function ResultCard({ career, rank, score, total }) {
  const pct = Math.round((score / total) * 100);
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <div style={{
      backgroundColor: rank === 0 ? "rgba(232,90,79,0.06)" : "#F5F2EC",
      border: `1.5px solid ${rank === 0 ? "#E85A4F" : "#D8C3A5"}`,
      borderRadius: "16px", padding: "18px 20px",
      boxShadow: rank === 0 ? "0 8px 28px rgba(232,90,79,0.12)" : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>{medals[rank]}</span>
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#2e2d2b", fontFamily: "Georgia, serif" }}>{career}</span>
        </div>
        <span style={{ fontSize: "13px", fontWeight: "700", color: rank === 0 ? "#E85A4F" : "#8E8D8A", fontFamily: "Georgia, serif" }}>{pct}%</span>
      </div>
      <div style={{ backgroundColor: "#D8C3A5", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", backgroundColor: rank === 0 ? "#E85A4F" : "#E98074", borderRadius: "100px", transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Assessment() {
  const [current, setCurrent] = useState(0);        // current question index
  const [answers, setAnswers] = useState({});        // { questionId: option }
  const [direction, setDirection] = useState(1);    // 1 = forward, -1 = back
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [visibleCard, setVisibleCard] = useState(true);
  const cardRef = useRef();

  const total = QUESTIONS.length;
  const q = QUESTIONS[current];
  const selectedOption = answers[q.id];
  const progress = Math.round((Object.keys(answers).length / total) * 100);
  const isLast = current === total - 1;

  // Transition helper
  const transition = (newIndex, dir) => {
    if (animating) return;
    setAnimating(true);
    setVisibleCard(false);
    setTimeout(() => {
      setCurrent(newIndex);
      setDirection(dir);
      setVisibleCard(true);
      setAnimating(false);
    }, 280);
  };

  const handleNext = () => { if (current < total - 1) transition(current + 1, 1); };
  const handlePrev = () => { if (current > 0) transition(current - 1, -1); };

  const handleSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [q.id]: option }));
  };

  const handleSubmit = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const top = computeTopCareers(answers);
      setResults(top);
      setAnalyzing(false);
      setSubmitted(true);
    }, 2400);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrent(0);
    setSubmitted(false);
    setResults(null);
    setAnalyzing(false);
  };

  // ── Analyzing screen ──────────────────────────────────────────────────────
  if (analyzing) {
    return (
      <div style={{ backgroundColor: "#F5F2EC", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          .dot1 { animation: pulse 1.4s ease infinite 0s; }
          .dot2 { animation: pulse 1.4s ease infinite 0.2s; }
          .dot3 { animation: pulse 1.4s ease infinite 0.4s; }
        `}</style>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: "3px solid #D8C3A5", borderTopColor: "#E85A4F", animation: "spin 1s linear infinite", margin: "0 auto 28px" }} />
          <h2 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: "700", color: "#2e2d2b" }}>Analyzing your responses</h2>
          <p style={{ margin: "0 0 20px", color: "#8E8D8A", fontSize: "15px" }}>Our AI is mapping your strengths to career paths…</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            {["Strengths", "Work Style", "Interests", "Best Fit"].map((label, i) => (
              <div key={label} className={`dot${(i % 3) + 1}`} style={{ padding: "5px 12px", borderRadius: "100px", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", fontSize: "12px", color: "#8E8D8A", fontFamily: "Georgia, serif" }}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Results screen ────────────────────────────────────────────────────────
  if (submitted && results) {
    return (
      <div style={{ backgroundColor: "#F5F2EC", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } } .fu { animation: fadeUp 0.5s ease both; }`}</style>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "48px 24px" }}>
          <div className="fu" style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
            <h1 style={{ margin: "0 0 10px", fontSize: "28px", fontWeight: "700", color: "#2e2d2b" }}>Your Career Matches</h1>
            <p style={{ margin: 0, color: "#8E8D8A", fontSize: "15px", lineHeight: "1.6" }}>Based on {Object.keys(answers).length} answered questions, here are the paths that fit you best.</p>
          </div>
          <div className="fu" style={{ animationDelay: "0.1s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "20px", padding: "28px", marginBottom: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 18px", fontSize: "13px", fontWeight: "700", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.08em" }}>Top Career Matches</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {results.map((r, i) => (
                <ResultCard key={r.name} career={r.name} rank={i} score={r.score} total={QUESTIONS.length} />
              ))}
            </div>
          </div>
          <div className="fu" style={{ animationDelay: "0.2s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "20px", padding: "24px 28px", marginBottom: "20px" }}>
            <p style={{ margin: "0 0 6px", fontSize: "13px", fontWeight: "700", color: "#2e2d2b" }}>🧠 What this means</p>
            <p style={{ margin: 0, fontSize: "13px", color: "#8E8D8A", lineHeight: "1.6" }}>
              Your top match is <strong style={{ color: "#E85A4F" }}>{results[0]?.name}</strong>. This aligns with your preferred work style, strengths, and interests. Head to Skill Gap Analysis to see exactly what skills you need to get there.
            </p>
          </div>
          <div className="fu" style={{ animationDelay: "0.3s", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={handleRestart} style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "1.5px solid #D8C3A5", backgroundColor: "transparent", color: "#8E8D8A", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8E8D8A"; e.currentTarget.style.color = "#2e2d2b"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D8C3A5"; e.currentTarget.style.color = "#8E8D8A"; }}>
              ↩ Retake Quiz
            </button>
            <button style={{ flex: 2, padding: "13px", borderRadius: "12px", border: "none", backgroundColor: "#E85A4F", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif", transition: "background 0.2s", boxShadow: "0 4px 16px rgba(232,90,79,0.25)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d44f44")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E85A4F")}>
              View Skill Gap Analysis →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main questionnaire ────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: "#F5F2EC", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <style>{`
        @keyframes slideInRight { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInLeft  { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp       { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .slide-in-right { animation: slideInRight 0.32s cubic-bezier(0.4,0,0.2,1) both; }
        .slide-in-left  { animation: slideInLeft  0.32s cubic-bezier(0.4,0,0.2,1) both; }
        .fade-up        { animation: fadeUp 0.45s ease both; }
      `}</style>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── 1. Header ─────────────────────────────────────────────── */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 16px", borderRadius: "100px", backgroundColor: "rgba(232,90,79,0.08)", border: "1px solid rgba(232,90,79,0.2)", marginBottom: "16px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#E85A4F", display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#E85A4F", letterSpacing: "0.1em", textTransform: "uppercase" }}>Career Assessment</span>
          </div>
          <h1 style={{ margin: "0 0 12px", fontSize: "clamp(24px,5vw,34px)", fontWeight: "700", color: "#2e2d2b", lineHeight: "1.2" }}>
            Career Discovery{" "}
            <span style={{ color: "#E85A4F", borderBottom: "3px solid #E98074", paddingBottom: "2px" }}>Questionnaire</span>
          </h1>
          <p style={{ margin: 0, fontSize: "15px", color: "#8E8D8A", maxWidth: "460px", margin: "0 auto", lineHeight: "1.7" }}>
            Answer a few questions to discover the career paths that fit your strengths and interests.
          </p>
        </div>

        {/* ── 2. Progress bar ────────────────────────────────────────── */}
        <div className="fade-up" style={{ animationDelay: "0.08s", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#8E8D8A", fontWeight: "600", letterSpacing: "0.04em" }}>
              Question {current + 1} of {total}
            </span>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#E85A4F" }}>{progress}% complete</span>
          </div>
          {/* Step dots */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: "4px", borderRadius: "100px",
                  backgroundColor: i < current ? "#E85A4F" : i === current ? "#E98074" : "#D8C3A5",
                  transition: "background-color 0.3s ease",
                }}
              />
            ))}
          </div>
          {/* Category chips */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["Interests", "Subjects", "Work Style", "Strengths", "Environment", "Collaboration", "Tools", "Goals", "Learning", "Impact"].map((cat, i) => (
              <div key={cat} style={{
                padding: "3px 10px", borderRadius: "100px", fontSize: "10px", fontWeight: "600",
                backgroundColor: i < current ? "rgba(232,90,79,0.1)" : i === current ? "rgba(233,128,116,0.15)" : "transparent",
                color: i <= current ? "#E85A4F" : "#8E8D8A",
                border: `1px solid ${i < current ? "rgba(232,90,79,0.25)" : i === current ? "#E98074" : "#D8C3A5"}`,
                letterSpacing: "0.04em", textTransform: "uppercase",
                transition: "all 0.3s",
              }}>{cat}</div>
            ))}
          </div>
        </div>

        {/* ── 3. Question Card ───────────────────────────────────────── */}
        <div
          ref={cardRef}
          className={visibleCard ? (direction > 0 ? "slide-in-right" : "slide-in-left") : ""}
          style={{
            backgroundColor: "#EAE7DC",
            border: "1px solid #D8C3A5",
            borderRadius: "24px",
            padding: "32px",
            marginBottom: "20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            opacity: visibleCard ? 1 : 0,
            transition: "opacity 0.18s ease",
          }}
        >
          {/* Category badge */}
          <CategoryBadge emoji={q.emoji} label={q.category} />

          {/* Question number watermark */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(17px,3vw,21px)", fontWeight: "700", color: "#2e2d2b", lineHeight: "1.4", flex: 1, paddingRight: "16px" }}>
              {q.question}
            </h2>
            <span style={{ fontSize: "40px", fontWeight: "800", color: "rgba(232,90,79,0.1)", lineHeight: 1, flexShrink: 0, fontFamily: "Georgia, serif" }}>
              {String(current + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Answer options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {q.options.map((opt) => (
              <OptionCard
                key={opt.id}
                option={opt}
                selected={selectedOption?.id === opt.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        {/* ── 4. Navigation ─────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Back button */}
          <button
            onClick={handlePrev}
            disabled={current === 0}
            style={{
              padding: "13px 22px", borderRadius: "12px",
              border: "1.5px solid #D8C3A5",
              backgroundColor: "transparent",
              color: current === 0 ? "#D8C3A5" : "#8E8D8A",
              fontSize: "14px", fontWeight: "600",
              cursor: current === 0 ? "not-allowed" : "pointer",
              fontFamily: "Georgia, serif",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "6px",
            }}
            onMouseEnter={(e) => { if (current > 0) { e.currentTarget.style.borderColor = "#8E8D8A"; e.currentTarget.style.color = "#2e2d2b"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D8C3A5"; e.currentTarget.style.color = current === 0 ? "#D8C3A5" : "#8E8D8A"; }}
          >
            ← Back
          </button>

          {/* Skip / answered indicator */}
          <div style={{ flex: 1, textAlign: "center" }}>
            {selectedOption
              ? <span style={{ fontSize: "12px", color: "#E85A4F", fontWeight: "600" }}>✓ Answer selected</span>
              : <span style={{ fontSize: "12px", color: "#8E8D8A" }}>Select an option to continue</span>}
          </div>

          {/* Next / Submit */}
          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              style={{
                padding: "13px 26px", borderRadius: "12px",
                border: "none",
                backgroundColor: selectedOption ? "#E85A4F" : "#D8C3A5",
                color: selectedOption ? "#fff" : "#8E8D8A",
                fontSize: "14px", fontWeight: "700",
                cursor: selectedOption ? "pointer" : "not-allowed",
                fontFamily: "Georgia, serif",
                transition: "all 0.2s",
                boxShadow: selectedOption ? "0 4px 16px rgba(232,90,79,0.3)" : "none",
                display: "flex", alignItems: "center", gap: "8px",
              }}
              onMouseEnter={(e) => { if (selectedOption) e.currentTarget.style.backgroundColor = "#d44f44"; }}
              onMouseLeave={(e) => { if (selectedOption) e.currentTarget.style.backgroundColor = "#E85A4F"; }}
            >
              <span>🚀</span> Submit Questionnaire
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              style={{
                padding: "13px 26px", borderRadius: "12px",
                border: "none",
                backgroundColor: selectedOption ? "#E85A4F" : "#D8C3A5",
                color: selectedOption ? "#fff" : "#8E8D8A",
                fontSize: "14px", fontWeight: "700",
                cursor: selectedOption ? "pointer" : "not-allowed",
                fontFamily: "Georgia, serif",
                transition: "all 0.2s",
                boxShadow: selectedOption ? "0 4px 16px rgba(232,90,79,0.25)" : "none",
              }}
              onMouseEnter={(e) => { if (selectedOption) e.currentTarget.style.backgroundColor = "#d44f44"; }}
              onMouseLeave={(e) => { if (selectedOption) e.currentTarget.style.backgroundColor = "#E85A4F"; }}
            >
              Next →
            </button>
          )}
        </div>

        {/* ── 5. Answered summary ───────────────────────────────────── */}
        {Object.keys(answers).length > 0 && (
          <div style={{ marginTop: "28px", padding: "16px 20px", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "14px" }}>
            <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: "700", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Your Answers So Far — {Object.keys(answers).length} / {total}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {QUESTIONS.slice(0, Object.keys(answers).length).map((question) => {
                const ans = answers[question.id];
                return ans ? (
                  <div key={question.id} style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    padding: "4px 12px", borderRadius: "100px",
                    backgroundColor: "rgba(232,90,79,0.08)", border: "1px solid rgba(232,90,79,0.2)",
                    fontSize: "12px", color: "#E85A4F", fontFamily: "Georgia, serif",
                  }}>
                    <span>{ans.icon}</span>
                    <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ans.label}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}