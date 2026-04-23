import { useState, useEffect, useRef } from "react";

// ─── Mock Aptitude Questions ──────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "logical",
    label: "Logical Reasoning",
    emoji: "🧩",
    color: "#E85A4F",
    description: "Evaluate your ability to identify patterns and draw conclusions.",
    questions: [
      {
        id: "l1",
        question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely:",
        options: ["Razzies", "Lazzies", "Neither", "Both Razzies and Lazzies"],
        answer: 3,
        explanation: "Since all Bloops are Razzies AND all Razzies are Lazzies, Bloops inherit both properties.",
      },
      {
        id: "l2",
        question: "Complete the series: 2, 6, 12, 20, 30, __",
        options: ["38", "40", "42", "44"],
        answer: 2,
        explanation: "Differences: 4, 6, 8, 10, 12 → next term = 30 + 12 = 42.",
      },
      {
        id: "l3",
        question: "A is the brother of B. B is the sister of C. C is the son of D. How is A related to D?",
        options: ["Son", "Daughter", "Nephew", "Cannot be determined"],
        answer: 0,
        explanation: "A is B's brother → A is male. C is D's son → B is D's child. A is also D's son.",
      },
      {
        id: "l4",
        question: "Which figure comes next in the pattern? ▲ ■ ● ▲ ■ ● ▲ ■ __",
        options: ["▲", "■", "●", "◆"],
        answer: 2,
        explanation: "The sequence ▲ ■ ● repeats. The next symbol after ▲ ■ is ●.",
      },
      {
        id: "l5",
        question: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
        options: ["EDRIRL", "DCQIJG", "EBNFMH", "DCPKLE"],
        answer: 0,
        explanation: "Each letter is shifted by +2. C→E, A→C (skipped), N→P... applying +2 shift gives EDRIRL.",
      },
    ],
  },
  {
    id: "numerical",
    label: "Numerical Ability",
    emoji: "🔢",
    color: "#E98074",
    description: "Test your speed and accuracy with numbers and mathematical reasoning.",
    questions: [
      {
        id: "n1",
        question: "A train travels 360 km in 4 hours. What is its speed in km/h?",
        options: ["80", "90", "100", "120"],
        answer: 1,
        explanation: "Speed = Distance / Time = 360 / 4 = 90 km/h.",
      },
      {
        id: "n2",
        question: "If 15% of a number is 45, what is 30% of that number?",
        options: ["75", "90", "105", "120"],
        answer: 1,
        explanation: "15% = 45 → number = 300. 30% of 300 = 90.",
      },
      {
        id: "n3",
        question: "What is the next prime number after 23?",
        options: ["25", "27", "29", "31"],
        answer: 2,
        explanation: "25 = 5×5, 27 = 3×9. 29 is only divisible by 1 and itself → prime.",
      },
      {
        id: "n4",
        question: "A shopkeeper buys an item for ₹800 and sells it for ₹1,000. What is the profit percentage?",
        options: ["20%", "25%", "30%", "15%"],
        answer: 1,
        explanation: "Profit = 200. Profit% = (200/800) × 100 = 25%.",
      },
      {
        id: "n5",
        question: "If x + y = 12 and x − y = 4, what is the value of x × y?",
        options: ["32", "40", "42", "36"],
        answer: 0,
        explanation: "x = 8, y = 4. x × y = 32.",
      },
    ],
  },
  {
    id: "verbal",
    label: "Verbal Reasoning",
    emoji: "📝",
    color: "#8E8D8A",
    description: "Assess your comprehension, vocabulary, and language reasoning skills.",
    questions: [
      {
        id: "v1",
        question: "Choose the word most similar in meaning to ELOQUENT:",
        options: ["Clumsy", "Articulate", "Timid", "Confused"],
        answer: 1,
        explanation: "Eloquent means fluent and persuasive in speech. Articulate is the closest synonym.",
      },
      {
        id: "v2",
        question: "Select the word that is OPPOSITE in meaning to BENEVOLENT:",
        options: ["Kind", "Generous", "Malevolent", "Charitable"],
        answer: 2,
        explanation: "Benevolent means kind and generous. Malevolent means having or showing a wish to do evil.",
      },
      {
        id: "v3",
        question: "Identify the correctly spelled word:",
        options: ["Accomodation", "Accommodation", "Acommodation", "Acomodation"],
        answer: 1,
        explanation: "The correct spelling is Accommodation — double 'c' and double 'm'.",
      },
      {
        id: "v4",
        question: "Complete the analogy: Book is to Library as Painting is to __",
        options: ["Artist", "Canvas", "Gallery", "Museum"],
        answer: 2,
        explanation: "Books are stored/displayed in a Library. Paintings are displayed in a Gallery.",
      },
      {
        id: "v5",
        question: "Choose the sentence that is grammatically correct:",
        options: [
          "Neither of them are ready.",
          "Neither of them is ready.",
          "Neither of them were ready.",
          "Neither of them was been ready.",
        ],
        answer: 1,
        explanation: "'Neither' is singular and takes a singular verb. 'Neither of them is ready' is correct.",
      },
    ],
  },
  {
    id: "spatial",
    label: "Spatial Intelligence",
    emoji: "🔷",
    color: "#E85A4F",
    description: "Measure your ability to mentally manipulate and visualize shapes.",
    questions: [
      {
        id: "s1",
        question: "A cube has 6 faces. How many edges does it have?",
        options: ["8", "10", "12", "16"],
        answer: 2,
        explanation: "A cube has 12 edges — 4 on the top face, 4 on the bottom, and 4 vertical edges.",
      },
      {
        id: "s2",
        question: "If you unfold a cube, how many squares do you see?",
        options: ["4", "5", "6", "8"],
        answer: 2,
        explanation: "A cube has 6 faces. Unfolding it gives a net of 6 squares.",
      },
      {
        id: "s3",
        question: "A clock shows 3:15. What angle does the minute hand make with the hour hand?",
        options: ["0°", "7.5°", "22.5°", "30°"],
        answer: 1,
        explanation: "Minute hand at 90°. Hour hand at 3:15 = 90° + (15/60)×30° = 97.5°. Angle = 7.5°.",
      },
      {
        id: "s4",
        question: "How many triangles are there in a regular hexagon divided by all its diagonals from the center?",
        options: ["4", "6", "8", "12"],
        answer: 1,
        explanation: "Drawing lines from the center to all 6 vertices divides the hexagon into 6 triangles.",
      },
      {
        id: "s5",
        question: "If a square's side is doubled, its area becomes:",
        options: ["Doubled", "Tripled", "4 times larger", "6 times larger"],
        answer: 2,
        explanation: "Area = s². If s → 2s, new area = 4s². The area becomes 4 times larger.",
      },
    ],
  },
];

// Flatten all questions for scoring
const ALL_QUESTIONS = SECTIONS.flatMap((s) =>
  s.questions.map((q) => ({ ...q, section: s.id, sectionLabel: s.label, sectionEmoji: s.emoji }))
);

const TOTAL = ALL_QUESTIONS.length;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeScore(answers) {
  let total = 0;
  const bySection = {};
  SECTIONS.forEach((s) => { bySection[s.id] = { correct: 0, total: s.questions.length, label: s.label, emoji: s.emoji, color: s.color }; });
  ALL_QUESTIONS.forEach((q) => {
    if (answers[q.id] === q.answer) {
      total++;
      bySection[q.section].correct++;
    }
  });
  return { total, bySection, percentage: Math.round((total / TOTAL) * 100) };
}

function getBand(pct) {
  if (pct >= 85) return { label: "Exceptional", emoji: "🌟", color: "#E85A4F", desc: "Outstanding aptitude across all domains. You're in the top tier." };
  if (pct >= 70) return { label: "Proficient",  emoji: "🎯", color: "#E98074", desc: "Strong reasoning and numerical skills with minor gaps to address." };
  if (pct >= 50) return { label: "Developing",  emoji: "📈", color: "#8E8D8A", desc: "Good foundation. Targeted practice will significantly boost your score." };
  return             { label: "Emerging",   emoji: "🌱", color: "#8E8D8A", desc: "Keep going! Consistent practice will unlock your potential quickly." };
}

// ─── Timer hook ───────────────────────────────────────────────────────────────

function useTimer(running) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function OptionButton({ label, index, state, onClick }) {
  // state: "idle" | "selected" | "correct" | "wrong"
  const [hov, setHov] = useState(false);
  const letters = ["A", "B", "C", "D"];

  const palette = {
    idle:     { bg: "#F5F2EC", border: "#D8C3A5",           text: "#3d3c39",   badge: "#EAE7DC",           badgeText: "#8E8D8A" },
    selected: { bg: "rgba(233,128,116,0.07)", border: "#E98074", text: "#2e2d2b", badge: "#E98074",          badgeText: "#fff"   },
    correct:  { bg: "rgba(232,90,79,0.07)",   border: "#E85A4F", text: "#2e2d2b", badge: "#E85A4F",          badgeText: "#fff"   },
    wrong:    { bg: "rgba(142,141,138,0.07)", border: "#8E8D8A", text: "#8E8D8A", badge: "rgba(142,141,138,0.2)", badgeText: "#8E8D8A" },
  };
  const p = palette[state];

  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      disabled={state === "correct" || state === "wrong"}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 18px", borderRadius: "14px",
        border: `2px solid ${hov && state === "idle" ? "#E98074" : p.border}`,
        backgroundColor: hov && state === "idle" ? "rgba(233,128,116,0.04)" : p.bg,
        cursor: state === "idle" ? "pointer" : "default",
        textAlign: "left", fontFamily: "Georgia, serif",
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
        transform: hov && state === "idle" ? "translateX(3px)" : "none",
        boxShadow: state === "correct" ? "0 4px 16px rgba(232,90,79,0.12)" : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Active left bar */}
      {(state === "selected" || state === "correct") && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", backgroundColor: p.border, borderRadius: "0 3px 3px 0" }} />
      )}
      {/* Letter badge */}
      <div style={{ width: "32px", height: "32px", borderRadius: "9px", flexShrink: 0, backgroundColor: p.badge, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", color: p.badgeText, transition: "all 0.2s", border: `1px solid ${state === "idle" ? "#D8C3A5" : "transparent"}` }}>
        {state === "correct" ? "✓" : state === "wrong" ? "✗" : letters[index]}
      </div>
      <span style={{ fontSize: "14px", fontWeight: state === "selected" || state === "correct" ? "700" : "500", color: p.text, lineHeight: "1.4", flex: 1 }}>
        {label}
      </span>
    </button>
  );
}

function SectionTab({ section, isCurrent, isCompleted, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "8px 16px", borderRadius: "100px",
        border: `1.5px solid ${isCurrent ? "#E85A4F" : isCompleted ? "rgba(232,90,79,0.3)" : "#D8C3A5"}`,
        backgroundColor: isCurrent ? "rgba(232,90,79,0.1)" : isCompleted ? "rgba(232,90,79,0.05)" : hov ? "#EAE7DC" : "transparent",
        color: isCurrent ? "#E85A4F" : isCompleted ? "#E98074" : "#8E8D8A",
        fontSize: "12px", fontWeight: isCurrent ? "700" : "600",
        cursor: "pointer", fontFamily: "Georgia, serif",
        transition: "all 0.2s", whiteSpace: "nowrap",
      }}
    >
      <span>{section.emoji}</span>
      <span>{section.label}</span>
      {isCompleted && <span style={{ fontSize: "10px", color: "#E85A4F" }}>✓</span>}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AptitudeTest() {
  const [phase, setPhase] = useState("intro");        // intro | test | reviewing | results
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});          // { questionId: selectedIndex }
  const [revealed, setRevealed] = useState({});        // { questionId: true } after checking
  const [direction, setDirection] = useState(1);
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const timerActive = phase === "test";
  const elapsed = useTimer(timerActive);

  const section = SECTIONS[sectionIdx];
  const question = section.questions[questionIdx];
  const globalIndex = SECTIONS.slice(0, sectionIdx).reduce((a, s) => a + s.questions.length, 0) + questionIdx;
  const totalAnswered = Object.keys(answers).length;
  const isLastSection = sectionIdx === SECTIONS.length - 1;
  const isLastQuestion = questionIdx === section.questions.length - 1;

  const selectedAnswer = answers[question?.id];
  const isRevealed = revealed[question?.id];

  // Completed sections
  const completedSections = SECTIONS.slice(0, sectionIdx).map((s) => s.id);

  // Transition helper
  const transition = (fn, dir = 1) => {
    if (animating) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => { fn(); setDirection(dir); setVisible(true); setAnimating(false); }, 260);
  };

  const handleSelect = (optIdx) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optIdx }));
  };

  const handleCheck = () => {
    if (selectedAnswer === undefined) return;
    setRevealed((prev) => ({ ...prev, [question.id]: true }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (isLastSection) {
        // Submit
        const sd = computeScore(answers);
        setScoreData(sd);
        setPhase("results");
      } else {
        // Next section
        transition(() => { setSectionIdx((i) => i + 1); setQuestionIdx(0); }, 1);
      }
    } else {
      transition(() => setQuestionIdx((i) => i + 1), 1);
    }
  };

  const handlePrev = () => {
    if (questionIdx > 0) {
      transition(() => setQuestionIdx((i) => i - 1), -1);
    } else if (sectionIdx > 0) {
      transition(() => { setSectionIdx((i) => i - 1); setQuestionIdx(SECTIONS[sectionIdx - 1].questions.length - 1); }, -1);
    }
  };

  const handleRestart = () => {
    setAnswers({}); setRevealed({}); setSectionIdx(0); setQuestionIdx(0);
    setScoreData(null); setPhase("intro"); setDirection(1); setVisible(true);
  };

  // ── Intro screen ──────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div style={{ backgroundColor: "#F5F2EC", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } } .fu { animation: fadeUp 0.5s ease both; }`}</style>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "48px 24px" }}>
          {/* Header */}
          <div className="fu" style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 16px", borderRadius: "100px", backgroundColor: "rgba(232,90,79,0.08)", border: "1px solid rgba(232,90,79,0.2)", marginBottom: "16px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#E85A4F", display: "inline-block" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#E85A4F", letterSpacing: "0.1em", textTransform: "uppercase" }}>Aptitude Evaluation</span>
            </div>
            <h1 style={{ margin: "0 0 12px", fontSize: "clamp(26px,5vw,36px)", fontWeight: "700", color: "#2e2d2b", lineHeight: "1.2" }}>
              Aptitude{" "}
              <span style={{ color: "#E85A4F", borderBottom: "3px solid #E98074", paddingBottom: "2px" }}>Test</span>
            </h1>
            <p style={{ margin: "0 auto", fontSize: "15px", color: "#8E8D8A", maxWidth: "440px", lineHeight: "1.7" }}>
              A scientifically structured test to measure your cognitive strengths across four key domains.
            </p>
          </div>

          {/* Section overview */}
          <div className="fu" style={{ animationDelay: "0.1s", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px" }}>
            {SECTIONS.map((s, i) => (
              <div key={s.id} style={{ backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "16px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "rgba(232,90,79,0.1)", border: "1px solid rgba(232,90,79,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{s.emoji}</div>
                <div>
                  <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "700", color: "#2e2d2b" }}>{s.label}</p>
                  <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#8E8D8A", lineHeight: "1.4" }}>{s.description}</p>
                  <span style={{ fontSize: "11px", color: "#E85A4F", fontWeight: "600" }}>{s.questions.length} questions</span>
                </div>
              </div>
            ))}
          </div>

          {/* Rules card */}
          <div className="fu" style={{ animationDelay: "0.2s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "16px", padding: "20px 24px", marginBottom: "24px" }}>
            <p style={{ margin: "0 0 12px", fontSize: "13px", fontWeight: "700", color: "#2e2d2b" }}>📋 Test Guidelines</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                `${TOTAL} questions across 4 sections`,
                "Each question carries equal marks",
                "Instant feedback after each answer",
                "Your time is tracked — no time limit",
                "You can navigate between questions freely",
              ].map((rule, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#E85A4F", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", color: "#8E8D8A" }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fu" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => setPhase("test")}
              style={{ width: "100%", padding: "15px", borderRadius: "14px", border: "none", backgroundColor: "#E85A4F", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif", transition: "background 0.2s", boxShadow: "0 6px 20px rgba(232,90,79,0.28)", letterSpacing: "0.02em" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d44f44")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E85A4F")}
            >
              ⚡ Start Aptitude Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Results screen ────────────────────────────────────────────────────────
  if (phase === "results" && scoreData) {
    const band = getBand(scoreData.percentage);
    return (
      <div style={{ backgroundColor: "#F5F2EC", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } } .fu { animation: fadeUp 0.5s ease both; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "48px 24px 80px" }}>

          {/* Score hero */}
          <div className="fu" style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "52px", marginBottom: "12px" }}>{band.emoji}</div>
            <h1 style={{ margin: "0 0 8px", fontSize: "30px", fontWeight: "700", color: "#2e2d2b" }}>Test Complete!</h1>
            <p style={{ margin: 0, color: "#8E8D8A", fontSize: "15px" }}>Here's how you performed across all four domains.</p>
          </div>

          {/* Big score card */}
          <div className="fu" style={{ animationDelay: "0.08s", backgroundColor: "#EAE7DC", border: "2px solid #E85A4F", borderRadius: "24px", padding: "32px", marginBottom: "20px", boxShadow: "0 8px 32px rgba(232,90,79,0.12)", textAlign: "center" }}>
            <p style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: "700", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.1em" }}>Overall Score</p>
            <div style={{ fontSize: "72px", fontWeight: "800", color: "#E85A4F", lineHeight: 1, margin: "8px 0" }}>{scoreData.percentage}<span style={{ fontSize: "32px" }}>%</span></div>
            <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#8E8D8A" }}>{scoreData.total} correct out of {TOTAL} questions</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", borderRadius: "100px", backgroundColor: `rgba(232,90,79,0.1)`, border: "1px solid rgba(232,90,79,0.3)" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: band.color, display: "inline-block" }} />
              <span style={{ fontSize: "14px", fontWeight: "700", color: band.color }}>{band.label}</span>
            </div>
            <p style={{ margin: "12px 0 0", fontSize: "13px", color: "#8E8D8A", lineHeight: "1.6", maxWidth: "360px", marginLeft: "auto", marginRight: "auto" }}>{band.desc}</p>
          </div>

          {/* Section breakdown */}
          <div className="fu" style={{ animationDelay: "0.15s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "20px", padding: "24px 28px", marginBottom: "20px" }}>
            <h3 style={{ margin: "0 0 18px", fontSize: "13px", fontWeight: "700", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.08em" }}>Section Breakdown</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {SECTIONS.map((s) => {
                const sec = scoreData.bySection[s.id];
                const pct = Math.round((sec.correct / sec.total) * 100);
                return (
                  <div key={s.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "14px", color: "#2e2d2b", display: "flex", alignItems: "center", gap: "7px" }}>
                        <span>{s.emoji}</span> {s.label}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: pct >= 70 ? "#E85A4F" : "#8E8D8A" }}>
                        {sec.correct}/{sec.total} · {pct}%
                      </span>
                    </div>
                    <div style={{ backgroundColor: "#D8C3A5", borderRadius: "100px", height: "7px", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", backgroundColor: pct >= 70 ? "#E85A4F" : "#E98074", borderRadius: "100px", transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insight */}
          <div className="fu" style={{ animationDelay: "0.22s", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "16px", padding: "20px 24px", marginBottom: "24px" }}>
            <p style={{ margin: "0 0 6px", fontSize: "13px", fontWeight: "700", color: "#2e2d2b" }}>🧠 What this score means</p>
            <p style={{ margin: 0, fontSize: "13px", color: "#8E8D8A", lineHeight: "1.7" }}>
              Your aptitude score of <strong style={{ color: "#E85A4F" }}>{scoreData.percentage}%</strong> has been added to your CareerAI profile.
              Combined with your Career Assessment results, this helps us recommend the most accurate career paths and skill roadmaps for you.
            </p>
          </div>

          {/* Actions */}
          <div className="fu" style={{ animationDelay: "0.28s", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={handleRestart} style={{ flex: 1, minWidth: "140px", padding: "13px", borderRadius: "12px", border: "1.5px solid #D8C3A5", backgroundColor: "transparent", color: "#8E8D8A", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8E8D8A"; e.currentTarget.style.color = "#2e2d2b"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D8C3A5"; e.currentTarget.style.color = "#8E8D8A"; }}>
              ↩ Retake Test
            </button>
            <button style={{ flex: 2, minWidth: "180px", padding: "13px", borderRadius: "12px", border: "none", backgroundColor: "#E85A4F", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif", transition: "background 0.2s", boxShadow: "0 4px 16px rgba(232,90,79,0.25)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d44f44")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E85A4F")}>
              View Career Recommendations →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Test screen ───────────────────────────────────────────────────────────
  const getOptionState = (optIdx) => {
    if (!isRevealed) return selectedAnswer === optIdx ? "selected" : "idle";
    if (optIdx === question.answer) return "correct";
    if (optIdx === selectedAnswer && selectedAnswer !== question.answer) return "wrong";
    return "idle";
  };

  return (
    <div style={{ backgroundColor: "#F5F2EC", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <style>{`
        @keyframes slideInRight { from { opacity:0; transform:translateX(36px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInLeft  { from { opacity:0; transform:translateX(-36px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp       { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pop          { 0% { transform:scale(1); } 50% { transform:scale(1.04); } 100% { transform:scale(1); } }
        .slide-r { animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1) both; }
        .slide-l { animation: slideInLeft  0.3s cubic-bezier(0.4,0,0.2,1) both; }
        .fade-up { animation: fadeUp 0.4s ease both; }
      `}</style>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* ── Top bar ────────────────────────────────────────────── */}
        <div className="fade-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#E85A4F", display: "inline-block" }} />
              <span style={{ fontSize: "11px", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "700" }}>Aptitude Test</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#2e2d2b" }}>{section.label}</h1>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Timer */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "100px", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5" }}>
              <span style={{ fontSize: "13px" }}>⏱</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#2e2d2b", fontFamily: "monospace" }}>{elapsed}</span>
            </div>
            {/* Score live */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "100px", backgroundColor: "rgba(232,90,79,0.08)", border: "1px solid rgba(232,90,79,0.2)" }}>
              <span style={{ fontSize: "13px" }}>✓</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#E85A4F" }}>{totalAnswered}/{TOTAL}</span>
            </div>
          </div>
        </div>

        {/* ── Section tabs ───────────────────────────────────────── */}
        <div className="fade-up" style={{ animationDelay: "0.05s", display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {SECTIONS.map((s, i) => (
            <SectionTab
              key={s.id}
              section={s}
              isCurrent={i === sectionIdx}
              isCompleted={completedSections.includes(s.id)}
              onClick={() => {
                if (i <= sectionIdx) transition(() => { setSectionIdx(i); setQuestionIdx(0); }, i < sectionIdx ? -1 : 1);
              }}
            />
          ))}
        </div>

        {/* ── Global progress ────────────────────────────────────── */}
        <div className="fade-up" style={{ animationDelay: "0.08s", marginBottom: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
            <span style={{ fontSize: "12px", color: "#8E8D8A", fontWeight: "600" }}>
              Q{globalIndex + 1} of {TOTAL} — {section.label}
            </span>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#E85A4F" }}>
              {Math.round(((globalIndex + 1) / TOTAL) * 100)}%
            </span>
          </div>
          {/* Segmented bar */}
          <div style={{ display: "flex", gap: "3px" }}>
            {ALL_QUESTIONS.map((q, i) => (
              <div key={q.id} style={{
                flex: 1, height: "5px", borderRadius: "100px",
                backgroundColor:
                  answers[q.id] !== undefined
                    ? (revealed[q.id] ? (answers[q.id] === q.answer ? "#E85A4F" : "#D8C3A5") : "#E98074")
                    : i === globalIndex ? "#E98074" : "#D8C3A5",
                transition: "background-color 0.3s",
              }} />
            ))}
          </div>
          {/* Mini legend */}
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {[["#E85A4F", "Correct"], ["#D8C3A5", "Skipped / Wrong"], ["#E98074", "Answered"]].map(([c, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: c }} />
                <span style={{ fontSize: "10px", color: "#8E8D8A" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Question card ──────────────────────────────────────── */}
        <div
          className={visible ? (direction > 0 ? "slide-r" : "slide-l") : ""}
          style={{
            backgroundColor: "#EAE7DC",
            border: "1px solid #D8C3A5",
            borderRadius: "24px",
            padding: "30px 32px",
            marginBottom: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.15s ease",
          }}
        >
          {/* Section badge + question watermark */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "100px", backgroundColor: "rgba(232,90,79,0.08)", border: "1px solid rgba(232,90,79,0.2)" }}>
              <span style={{ fontSize: "12px" }}>{section.emoji}</span>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#E85A4F", letterSpacing: "0.08em", textTransform: "uppercase" }}>{section.label}</span>
            </div>
            <span style={{ fontSize: "42px", fontWeight: "800", color: "rgba(232,90,79,0.08)", lineHeight: 1, fontFamily: "Georgia, serif" }}>
              {String(questionIdx + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Question text */}
          <h2 style={{ margin: "0 0 24px", fontSize: "clamp(16px,3vw,19px)", fontWeight: "700", color: "#2e2d2b", lineHeight: "1.5" }}>
            {question.question}
          </h2>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {question.options.map((opt, i) => (
              <OptionButton
                key={i}
                label={opt}
                index={i}
                state={getOptionState(i)}
                onClick={() => handleSelect(i)}
              />
            ))}
          </div>

          {/* Explanation (revealed) */}
          {isRevealed && (
            <div style={{ marginTop: "18px", padding: "14px 18px", borderRadius: "12px", backgroundColor: answers[question.id] === question.answer ? "rgba(232,90,79,0.07)" : "rgba(142,141,138,0.08)", border: `1px solid ${answers[question.id] === question.answer ? "rgba(232,90,79,0.25)" : "#D8C3A5"}`, animation: "fadeUp 0.3s ease" }}>
              <p style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: "700", color: answers[question.id] === question.answer ? "#E85A4F" : "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                {answers[question.id] === question.answer ? "✓ Correct!" : "✗ Incorrect"}
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#8E8D8A", lineHeight: "1.6" }}>{question.explanation}</p>
            </div>
          )}
        </div>

        {/* ── Action bar ────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Back */}
          <button
            onClick={handlePrev}
            disabled={globalIndex === 0}
            style={{ padding: "12px 20px", borderRadius: "12px", border: "1.5px solid #D8C3A5", backgroundColor: "transparent", color: globalIndex === 0 ? "#D8C3A5" : "#8E8D8A", fontSize: "14px", fontWeight: "600", cursor: globalIndex === 0 ? "not-allowed" : "pointer", fontFamily: "Georgia, serif", transition: "all 0.2s" }}
            onMouseEnter={(e) => { if (globalIndex > 0) { e.currentTarget.style.borderColor = "#8E8D8A"; e.currentTarget.style.color = "#2e2d2b"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D8C3A5"; e.currentTarget.style.color = globalIndex === 0 ? "#D8C3A5" : "#8E8D8A"; }}
          >← Back</button>

          {/* Status */}
          <div style={{ flex: 1, textAlign: "center", fontSize: "12px", color: isRevealed ? (answers[question.id] === question.answer ? "#E85A4F" : "#8E8D8A") : "#8E8D8A" }}>
            {isRevealed
              ? answers[question.id] === question.answer ? "🎉 Well done!" : "📖 Check the explanation above"
              : selectedAnswer !== undefined ? "✓ Answer selected — check it!" : "Select an option"}
          </div>

          {/* Check / Next / Submit */}
          {!isRevealed ? (
            <button
              onClick={handleCheck}
              disabled={selectedAnswer === undefined}
              style={{ padding: "12px 22px", borderRadius: "12px", border: "none", backgroundColor: selectedAnswer !== undefined ? "#E98074" : "#D8C3A5", color: selectedAnswer !== undefined ? "#fff" : "#8E8D8A", fontSize: "14px", fontWeight: "700", cursor: selectedAnswer !== undefined ? "pointer" : "not-allowed", fontFamily: "Georgia, serif", transition: "all 0.2s", boxShadow: selectedAnswer !== undefined ? "0 4px 14px rgba(233,128,116,0.3)" : "none" }}
              onMouseEnter={(e) => { if (selectedAnswer !== undefined) e.currentTarget.style.backgroundColor = "#E85A4F"; }}
              onMouseLeave={(e) => { if (selectedAnswer !== undefined) e.currentTarget.style.backgroundColor = "#E98074"; }}
            >Check Answer</button>
          ) : isLastSection && isLastQuestion ? (
            <button
              onClick={handleNext}
              style={{ padding: "12px 22px", borderRadius: "12px", border: "none", backgroundColor: "#E85A4F", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif", transition: "background 0.2s", boxShadow: "0 4px 16px rgba(232,90,79,0.28)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d44f44")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E85A4F")}
            >🚀 View Results</button>
          ) : (
            <button
              onClick={handleNext}
              style={{ padding: "12px 22px", borderRadius: "12px", border: "none", backgroundColor: "#E85A4F", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "Georgia, serif", transition: "background 0.2s", boxShadow: "0 4px 14px rgba(232,90,79,0.25)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d44f44")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E85A4F")}
            >{isLastSection && isLastQuestion ? "Submit" : isLastQuestion ? `Next: ${SECTIONS[sectionIdx + 1]?.label} →` : "Next →"}</button>
          )}
        </div>

        {/* ── Section mini map ──────────────────────────────────── */}
        <div style={{ marginTop: "24px", backgroundColor: "#EAE7DC", border: "1px solid #D8C3A5", borderRadius: "14px", padding: "16px 20px" }}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: "700", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {section.emoji} {section.label} — Question Map
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {section.questions.map((q, i) => {
              const ans = answers[q.id];
              const rev = revealed[q.id];
              const isCur = i === questionIdx;
              const correct = rev && ans === q.answer;
              const wrong = rev && ans !== q.answer;
              return (
                <button
                  key={q.id}
                  onClick={() => transition(() => setQuestionIdx(i), i > questionIdx ? 1 : -1)}
                  style={{
                    width: "36px", height: "36px", borderRadius: "9px",
                    border: `2px solid ${isCur ? "#E85A4F" : correct ? "rgba(232,90,79,0.4)" : wrong ? "#D8C3A5" : ans !== undefined ? "#E98074" : "#D8C3A5"}`,
                    backgroundColor: isCur ? "rgba(232,90,79,0.1)" : correct ? "rgba(232,90,79,0.06)" : wrong ? "rgba(142,141,138,0.08)" : ans !== undefined ? "rgba(233,128,116,0.06)" : "#F5F2EC",
                    color: isCur ? "#E85A4F" : correct ? "#E85A4F" : wrong ? "#8E8D8A" : "#2e2d2b",
                    fontSize: "12px", fontWeight: "700",
                    cursor: "pointer", fontFamily: "Georgia, serif",
                    transition: "all 0.2s",
                  }}
                >
                  {correct ? "✓" : wrong ? "✗" : i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}