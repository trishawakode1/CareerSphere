import { useState, useMemo } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CAREERS = [
  {
    title: "Software Engineer",
    description: "Designs, builds, and maintains software systems and applications across web, mobile, and enterprise platforms.",
    category: "Technology",
  },
  {
    title: "Data Scientist",
    description: "Analyzes complex datasets to uncover patterns and insights that guide strategic business decisions.",
    category: "Technology",
  },
  {
    title: "UX Designer",
    description: "Crafts intuitive, human-centered digital experiences through research, prototyping, and iterative design.",
    category: "Design",
  },
  {
    title: "Graphic Designer",
    description: "Creates compelling visual content — from brand identities to marketing materials — across print and digital media.",
    category: "Design",
  },
  {
    title: "Marketing Manager",
    description: "Develops and executes strategies to grow brand presence, engage audiences, and drive measurable business results.",
    category: "Business",
  },
  {
    title: "Cybersecurity Analyst",
    description: "Monitors, detects, and responds to digital threats, safeguarding systems and sensitive organizational data.",
    category: "Technology",
  },
  {
    title: "Product Manager",
    description: "Defines product vision and roadmap, balancing user needs with business goals across cross-functional teams.",
    category: "Business",
  },
  {
    title: "Financial Analyst",
    description: "Evaluates financial data, forecasts performance, and provides investment and budgeting recommendations.",
    category: "Finance",
  },
  {
    title: "Clinical Psychologist",
    description: "Assesses and treats mental health conditions through therapy, counseling, and evidence-based interventions.",
    category: "Healthcare",
  },
  {
    title: "Content Strategist",
    description: "Plans and manages content ecosystems to build authority, attract audiences, and drive engagement across channels.",
    category: "Business",
  },
  {
    title: "AI/ML Engineer",
    description: "Builds and deploys machine learning models that power intelligent features and automated decision systems.",
    category: "Technology",
  },
  {
    title: "Environmental Scientist",
    description: "Studies ecosystems and natural processes to assess human impact and develop sustainable environmental solutions.",
    category: "Science",
  },
];

// ─── Category colors ──────────────────────────────────────────────────────────
const CATEGORY_STYLES = {
  Technology: { bg: "rgba(233,128,116,0.12)", color: "#E85A4F", border: "rgba(233,128,116,0.28)" },
  Design:     { bg: "rgba(142,141,138,0.13)", color: "#5e5d5b", border: "rgba(142,141,138,0.3)"  },
  Business:   { bg: "rgba(216,195,165,0.45)", color: "#7a6e5f", border: "rgba(200,168,130,0.4)"  },
  Finance:    { bg: "rgba(184,176,169,0.22)", color: "#6b6360", border: "rgba(142,141,138,0.28)" },
  Healthcare: { bg: "rgba(233,128,116,0.08)", color: "#c07068", border: "rgba(233,128,116,0.2)"  },
  Science:    { bg: "rgba(142,141,138,0.1)",  color: "#6e6c6a", border: "rgba(142,141,138,0.25)" },
};

// ─── Floating Shape ───────────────────────────────────────────────────────────
function Shape({ size, top, left, color, blur, delay, duration }) {
  return (
    <div style={{
      position: "absolute", width: size, height: size, top, left,
      borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
      background: color, filter: `blur(${blur}px)`, opacity: 0.38,
      animation: `shapeFloat ${duration}s ease-in-out ${delay}s infinite alternate`,
      pointerEvents: "none", willChange: "transform",
    }} />
  );
}

// ─── Search Icon ──────────────────────────────────────────────────────────────
function SearchIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.8" />
      <path d="M16.5 16.5L21 21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Career Card ──────────────────────────────────────────────────────────────
function CareerCard({ career }) {
  const [hov, setHov] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  const catStyle = CATEGORY_STYLES[career.category] || CATEGORY_STYLES.Technology;

  const handleLearnMore = () => {
    console.log("Exploring career:", career.title);
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: "#D8C3A5",
        borderRadius: 18,
        padding: "clamp(1.4rem, 3vw, 2rem)",
        boxShadow: hov
          ? "0 18px 48px rgba(61,59,57,0.13), 0 4px 14px rgba(61,59,57,0.07)"
          : "0 3px 18px rgba(61,59,57,0.07), 0 1px 4px rgba(61,59,57,0.04)",
        transform: hov ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "all 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
        border: hov ? "1px solid rgba(233,128,116,0.2)" : "1px solid transparent",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top hover accent line */}
      <div style={{
        position: "absolute", top: 0, left: "12%", right: "12%",
        height: 2, borderRadius: "0 0 4px 4px",
        background: "linear-gradient(90deg, transparent, #E98074, transparent)",
        opacity: hov ? 0.7 : 0,
        transition: "opacity 0.3s ease",
      }} />

      {/* Category tag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif",
          padding: "3px 10px",
          borderRadius: 99,
          backgroundColor: catStyle.bg,
          color: catStyle.color,
          border: `1px solid ${catStyle.border}`,
        }}>
          {career.category}
        </span>

        {/* Arrow icon */}
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          backgroundColor: hov ? "rgba(233,128,116,0.15)" : "rgba(142,141,138,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s ease",
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
              stroke={hov ? "#E98074" : "#8E8D8A"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
        fontWeight: 400,
        color: "#3d3b39",
        letterSpacing: "0.01em",
        lineHeight: 1.25,
        margin: 0,
      }}>
        {career.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: "0.83rem",
        color: "#6b6966",
        fontWeight: 300,
        lineHeight: 1.72,
        fontFamily: "'Jost', sans-serif",
        letterSpacing: "0.01em",
        flex: 1,
        margin: 0,
      }}>
        {career.description}
      </p>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "rgba(142,141,138,0.18)" }} />

      {/* Button */}
      <button
        type="button"
        onClick={handleLearnMore}
        onMouseEnter={() => setBtnHov(true)}
        onMouseLeave={() => setBtnHov(false)}
        style={{
          alignSelf: "flex-start",
          backgroundColor: btnHov ? "#E85A4F" : "#E98074",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          padding: "10px 22px",
          borderRadius: 10,
          boxShadow: btnHov
            ? "0 8px 24px rgba(232,90,79,0.35)"
            : "0 3px 10px rgba(233,128,116,0.22)",
          transform: btnHov ? "translateY(-1px)" : "translateY(0)",
          transition: "all 0.22s ease",
        }}
      >
        Learn More
      </button>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ query }) {
  return (
    <div style={{
      gridColumn: "1 / -1",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "5rem 2rem", textAlign: "center",
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: "50%",
        backgroundColor: "rgba(233,128,116,0.1)",
        border: "1.5px dashed rgba(233,128,116,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1.5rem",
      }}>
        <SearchIcon color="#E98074" />
      </div>
      <p style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "1.4rem", fontWeight: 300, color: "#3d3b39",
        marginBottom: "0.5rem",
      }}>
        No results for "{query}"
      </p>
      <p style={{
        fontSize: "0.84rem", color: "#8E8D8A", fontWeight: 300,
        fontFamily: "'Jost', sans-serif", letterSpacing: "0.01em",
      }}>
        Try searching with a different keyword or category.
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Explore() {
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return CAREERS;
    return CAREERS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [query]);

  const categories = [...new Set(CAREERS.map((c) => c.category))];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        @keyframes shapeFloat {
          0%   { transform: translateY(0px) rotate(0deg) scale(1); }
          100% { transform: translateY(-28px) rotate(6deg) scale(1.05); }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmerBar {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }

        * { box-sizing: border-box; }
        ::placeholder { color: #b8b3ab; }
        input[type=search]::-webkit-search-cancel-button { -webkit-appearance: none; }
      `}</style>

      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{ backgroundColor: "#EAE7DC", fontFamily: "'Jost', sans-serif" }}
      >

        {/* ── Background ── */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <Shape size={360} top="-10%" left="-8%"  color="rgba(233,128,116,0.2)"  blur={80} delay={0}   duration={10} />
          <Shape size={240} top="55%"  left="72%"  color="rgba(216,195,165,0.38)" blur={65} delay={1.5} duration={12} />
          <Shape size={180} top="30%"  left="-4%"  color="rgba(216,195,165,0.3)"  blur={50} delay={0.8} duration={9}  />
          <Shape size={120} top="5%"   left="68%"  color="rgba(232,90,79,0.12)"   blur={40} delay={2}   duration={7}  />
          {/* Rotating ring */}
          <div style={{
            position: "absolute", top: "25%", right: "-3%",
            width: 300, height: 300,
            border: "1px dashed rgba(233,128,116,0.15)",
            borderRadius: "50%",
            animation: "rotateSlow 60s linear infinite",
          }} />
          {/* Dot grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(142,141,138,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Navbar ── */}
          <nav style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.25rem clamp(1.5rem, 4vw, 3.5rem)",
            borderBottom: "1px solid rgba(216,195,165,0.45)",
            backgroundColor: "rgba(234,231,220,0.88)",
            backdropFilter: "blur(12px)",
            position: "sticky", top: 0, zIndex: 10,
            animation: "fadeUp 0.55s ease 0s both",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", backgroundColor: "#E98074",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 3px 10px rgba(233,128,116,0.32)",
              }}>
                <span style={{ color: "#fff", fontSize: "0.65rem", fontWeight: 500 }}>AI</span>
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.05rem", color: "#3d3b39", letterSpacing: "0.04em",
              }}>CareerSphere</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E98074", animation: "pulseDot 2.5s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.68rem", color: "#8E8D8A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Career Explorer
              </span>
            </div>
          </nav>

          <main style={{ padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)" }}>

            {/* ── Page Header ── */}
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 3.5rem", animation: "fadeUp 0.65s ease 0.1s both" }}>
              <p style={{
                fontSize: "0.68rem", color: "#E98074", letterSpacing: "0.28em",
                textTransform: "uppercase", marginBottom: "0.85rem",
                fontFamily: "'Jost', sans-serif",
              }}>
                Discovery
              </p>

              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                fontWeight: 300,
                color: "#3d3b39",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                marginBottom: "0.9rem",
              }}>
                Explore{" "}
                <em style={{ color: "#E98074", fontStyle: "italic" }}>Careers</em>
              </h1>

              {/* Shimmer bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: "1.1rem" }}>
                <div style={{
                  width: 40, height: 2, borderRadius: 2,
                  background: "linear-gradient(90deg, #E98074, #E85A4F, #E98074)",
                  backgroundSize: "200% auto",
                  animation: "shimmerBar 3s linear infinite",
                }} />
                <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#E98074", opacity: 0.5 }} />
                <div style={{
                  width: 40, height: 2, borderRadius: 2,
                  background: "linear-gradient(90deg, #E98074, #E85A4F, #E98074)",
                  backgroundSize: "200% auto",
                  animation: "shimmerBar 3s linear infinite",
                }} />
              </div>

              <p style={{
                fontSize: "clamp(0.88rem, 1.4vw, 0.98rem)",
                color: "#8E8D8A", fontWeight: 300, lineHeight: 1.72,
                letterSpacing: "0.015em",
              }}>
                Search and learn about different career paths — find what excites you.
              </p>
            </div>

            {/* ── Search Bar ── */}
            <div
              style={{
                maxWidth: 580, margin: "0 auto 3rem",
                animation: "fadeUp 0.65s ease 0.2s both",
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                backgroundColor: "#D8C3A5",
                borderRadius: 14,
                padding: "14px 20px",
                border: searchFocused
                  ? "1.5px solid #E98074"
                  : "1.5px solid transparent",
                boxShadow: searchFocused
                  ? "0 0 0 4px rgba(233,128,116,0.12), 0 4px 24px rgba(61,59,57,0.08)"
                  : "0 4px 20px rgba(61,59,57,0.07)",
                transition: "all 0.28s ease",
              }}>
                <SearchIcon color={searchFocused ? "#E98074" : "#8E8D8A"} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search careers, categories, or keywords..."
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: "0.92rem",
                    color: "#3d3b39",
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    letterSpacing: "0.01em",
                  }}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      width: 22, height: 22, borderRadius: "50%",
                      backgroundColor: "rgba(142,141,138,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(232,90,79,0.15)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(142,141,138,0.2)"}
                  >
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M1 1L9 9M9 1L1 9" stroke="#8E8D8A" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Result count */}
              {query && (
                <p style={{
                  textAlign: "center",
                  marginTop: "0.75rem",
                  fontSize: "0.75rem",
                  color: "#8E8D8A",
                  letterSpacing: "0.05em",
                  transition: "opacity 0.2s ease",
                }}>
                  {filtered.length === 0
                    ? "No careers found"
                    : `${filtered.length} career${filtered.length !== 1 ? "s" : ""} found`}
                </p>
              )}
            </div>

            {/* ── Category pills ── */}
            {!query && (
              <div
                style={{
                  display: "flex", flexWrap: "wrap", gap: 10,
                  justifyContent: "center", marginBottom: "2.5rem",
                  animation: "fadeUp 0.65s ease 0.28s both",
                }}
              >
                {categories.map((cat) => {
                  const s = CATEGORY_STYLES[cat] || {};
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setQuery(cat)}
                      style={{
                        backgroundColor: s.bg,
                        color: s.color,
                        border: `1px solid ${s.border}`,
                        borderRadius: 99,
                        padding: "5px 16px",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontFamily: "'Jost', sans-serif",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(233,128,116,0.2)";
                        e.currentTarget.style.borderColor = "rgba(233,128,116,0.45)";
                        e.currentTarget.style.color = "#E85A4F";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = s.bg;
                        e.currentTarget.style.borderColor = s.border;
                        e.currentTarget.style.color = s.color;
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Careers Grid ── */}
            <div style={{ animation: "fadeUp 0.65s ease 0.35s both" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                gap: "clamp(1rem, 2.5vw, 1.6rem)",
              }}>
                {filtered.length > 0
                  ? filtered.map((career, i) => (
                      <div
                        key={career.title}
                        style={{ animation: `cardIn 0.55s ease ${i * 0.06}s both` }}
                      >
                        <CareerCard career={career} />
                      </div>
                    ))
                  : <EmptyState query={query} />
                }
              </div>
            </div>

            {/* ── Footer note ── */}
            {filtered.length > 0 && (
              <p style={{
                textAlign: "center",
                marginTop: "3.5rem",
                fontSize: "0.75rem",
                color: "#8E8D8A",
                letterSpacing: "0.06em",
                opacity: 0.55,
                animation: "fadeUp 0.65s ease 0.5s both",
              }}>
                Showing {filtered.length} of {CAREERS.length} careers
              </p>
            )}
          </main>

          {/* ── Footer ── */}
          <footer style={{
            textAlign: "center", padding: "1.5rem",
            borderTop: "1px solid rgba(216,195,165,0.35)",
            fontSize: "0.7rem", color: "#8E8D8A",
            letterSpacing: "0.08em", opacity: 0.6,
          }}>
            © 2025 CareerSphere AI · All rights reserved
          </footer>
        </div>
      </div>
    </>
  );
}