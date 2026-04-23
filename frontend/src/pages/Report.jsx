import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CAREERS = [
  {
    career: "Software Engineer",
    score: 88,
    reason:
      "Your strong analytical thinking and structured problem-solving approach align naturally with software development. Your patience with complex systems and attention to detail are hallmarks of exceptional engineers.",
    description:
      "Software engineers design, build, and maintain software systems and applications. They collaborate with cross-functional teams to translate requirements into robust digital products, debug issues, and continuously improve codebases across web, mobile, and enterprise platforms.",
  },
  {
    career: "UX Designer",
    score: 82,
    reason:
      "Your empathetic nature and eye for aesthetics make you a natural fit for user experience design. You instinctively understand what makes interactions feel intuitive and satisfying for real people.",
    description:
      "UX Designers research user behavior, create wireframes and prototypes, and craft seamless digital experiences. They bridge the gap between business goals and user needs through research, testing, and iterative design across apps and websites.",
  },
  {
    career: "Data Scientist",
    score: 76,
    reason:
      "Your comfort with numbers and ability to find patterns in complexity position you well for data science. You enjoy drawing meaningful conclusions from ambiguous information — a core skill in this field.",
    description:
      "Data Scientists collect, clean, and analyze large datasets to uncover insights that drive business decisions. They build predictive models using machine learning, visualize findings, and communicate results to both technical and non-technical stakeholders.",
  },
  {
    career: "Product Manager",
    score: 71,
    reason:
      "Your leadership instincts and ability to balance competing priorities make you well-suited to product management. You naturally think in terms of user value and business strategy simultaneously.",
    description:
      "Product Managers define the vision, strategy, and roadmap for digital products. They coordinate between engineering, design, and business teams — prioritizing features, gathering user feedback, and ensuring products ship on time and meet market needs.",
  },
  {
    career: "AI/ML Engineer",
    score: 65,
    reason:
      "Your curiosity about emerging technology and willingness to learn continuously align with the fast-evolving ML landscape. Your logical reasoning provides a solid foundation for building intelligent systems.",
    description:
      "AI/ML Engineers develop machine learning models and integrate them into production systems. They work with large datasets, train neural networks, optimize model performance, and collaborate with data scientists to deploy AI-powered features at scale.",
  },
];

// ─── Floating Shape ───────────────────────────────────────────────────────────
function Shape({ size, top, left, color, blur, delay, duration }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size, height: size,
        top, left,
        borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
        background: color,
        filter: `blur(${blur}px)`,
        opacity: 0.38,
        animation: `shapeFloat ${duration}s ease-in-out ${delay}s infinite alternate`,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}

// ─── Animated Progress Bar ────────────────────────────────────────────────────
function ProgressBar({ score, animate }) {
  return (
    <div
      style={{
        width: "100%", height: 5, borderRadius: 99,
        backgroundColor: "rgba(142,141,138,0.18)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: animate ? `${score}%` : "0%",
          borderRadius: 99,
          background: score >= 80
            ? "linear-gradient(90deg, #E98074, #E85A4F)"
            : score >= 70
            ? "linear-gradient(90deg, #c8a882, #E98074)"
            : "linear-gradient(90deg, #b5b0a9, #c8a882)",
          transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: animate ? "0 0 8px rgba(233,128,116,0.35)" : "none",
        }}
      />
    </div>
  );
}

// ─── Score Badge ──────────────────────────────────────────────────────────────
function ScoreBadge({ score }) {
  const color = score >= 80 ? "#E85A4F" : score >= 70 ? "#E98074" : "#8E8D8A";
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{
        backgroundColor: `${color}14`,
        border: `1.5px solid ${color}30`,
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color }} />
      <span
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.72rem",
          fontWeight: 500,
          color,
          letterSpacing: "0.08em",
        }}
      >
        {score}% Match
      </span>
    </div>
  );
}

// ─── Career Card ──────────────────────────────────────────────────────────────
function CareerCard({ data, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [barAnimated, setBarAnimated] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setBarAnimated(true), index * 120 + 300);
      return () => clearTimeout(t);
    }
  }, [inView, index]);

  const rankLabel = ["Top Pick", "2nd", "3rd", "4th", "5th"];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#D8C3A5",
        borderRadius: 20,
        padding: "clamp(1.5rem, 3vw, 2.25rem)",
        boxShadow: hovered
          ? "0 20px 56px rgba(61,59,57,0.14), 0 4px 16px rgba(61,59,57,0.07)"
          : "0 4px 24px rgba(61,59,57,0.07), 0 1px 4px rgba(61,59,57,0.04)",
        transform: hovered ? "translateY(-5px) scale(1.008)" : "translateY(0) scale(1)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: inView ? 1 : 0,
        animation: inView ? `cardReveal 0.65s ease ${index * 0.1}s both` : "none",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        border: hovered ? "1px solid rgba(233,128,116,0.2)" : "1px solid transparent",
      }}
    >
      {/* Subtle hover gradient overlay */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(233,128,116,0.04) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
          borderRadius: 20,
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute", top: 0, left: "10%", right: "10%",
          height: 2, borderRadius: "0 0 4px 4px",
          background: "linear-gradient(90deg, transparent, #E98074, transparent)",
          opacity: hovered ? 0.7 : 0,
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Card header */}
      <div className="flex items-start justify-between gap-3 mb-4" style={{ position: "relative" }}>
        <div className="flex-1">
          {/* Rank */}
          <p
            className="text-xs uppercase tracking-[0.2em] mb-1.5"
            style={{ color: "#E98074", fontFamily: "'Jost', sans-serif", fontSize: "0.62rem" }}
          >
            {rankLabel[index]}
          </p>
          {/* Career name */}
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)",
              fontWeight: 400,
              color: "#3d3b39",
              letterSpacing: "0.01em",
              lineHeight: 1.2,
            }}
          >
            {data.career}
          </h3>
        </div>
        <ScoreBadge score={data.score} />
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <ProgressBar score={data.score} animate={barAnimated} />
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "rgba(142,141,138,0.18)", marginBottom: "1.25rem" }} />

      {/* Why it fits */}
      <div className="mb-4">
        <p
          className="text-xs uppercase tracking-[0.16em] mb-2"
          style={{ color: "#E98074", fontFamily: "'Jost', sans-serif" }}
        >
          Why it fits you
        </p>
        <p style={{
          fontSize: "0.84rem",
          color: "#5a5856",
          fontWeight: 300,
          lineHeight: 1.75,
          fontFamily: "'Jost', sans-serif",
          letterSpacing: "0.01em",
        }}>
          {data.reason}
        </p>
      </div>

      {/* What it involves */}
      <div
        className="rounded-xl p-4 mt-3"
        style={{ backgroundColor: "rgba(234,231,220,0.55)" }}
      >
        <p
          className="text-xs uppercase tracking-[0.16em] mb-2"
          style={{ color: "#8E8D8A", fontFamily: "'Jost', sans-serif" }}
        >
          What this involves
        </p>
        <p style={{
          fontSize: "0.82rem",
          color: "#6b6966",
          fontWeight: 300,
          lineHeight: 1.75,
          fontFamily: "'Jost', sans-serif",
          letterSpacing: "0.01em",
        }}>
          {data.description}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Report() {
  const [entered, setEntered] = useState(false);
  const [cardsInView, setCardsInView] = useState(false);
  const cardsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCardsInView(true); },
      { threshold: 0.05 }
    );
    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  const topScore = Math.max(...CAREERS.map((c) => c.score));

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
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
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
      `}</style>

      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{
          backgroundColor: "#EAE7DC",
          fontFamily: "'Jost', sans-serif",
          opacity: entered ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >

        {/* ── Background shapes ── */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <Shape size={380} top="-8%"  left="-8%"  color="rgba(233,128,116,0.22)" blur={80} delay={0}   duration={10} />
          <Shape size={260} top="60%"  left="75%"  color="rgba(216,195,165,0.4)"  blur={65} delay={1.5} duration={12} />
          <Shape size={200} top="35%"  left="-5%"  color="rgba(216,195,165,0.35)" blur={55} delay={0.8} duration={9}  />
          <Shape size={140} top="-3%"  left="70%"  color="rgba(232,90,79,0.14)"   blur={45} delay={2}   duration={7}  />
          {/* Rotating ring */}
          <div style={{
            position: "absolute", top: "18%", right: "-5%",
            width: 320, height: 320,
            border: "1px dashed rgba(233,128,116,0.18)",
            borderRadius: "50%",
            animation: "rotateSlow 55s linear infinite",
          }} />
          {/* Dot grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(142,141,138,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Nav bar ── */}
          <nav
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1.25rem clamp(1.5rem, 4vw, 3.5rem)",
              borderBottom: "1px solid rgba(216,195,165,0.45)",
              backgroundColor: "rgba(234,231,220,0.85)",
              backdropFilter: "blur(12px)",
              position: "sticky", top: 0, zIndex: 10,
              animation: "fadeUp 0.6s ease 0s both",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                backgroundColor: "#E98074",
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
            <div className="flex items-center gap-2">
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E98074", animation: "pulseDot 2.5s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.7rem", color: "#8E8D8A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Report Ready
              </span>
            </div>
          </nav>

          <main style={{ padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)" }}>

            {/* ── Page header ── */}
            <div className="mb-12" style={{ maxWidth: 720, animation: "fadeUp 0.7s ease 0.12s both" }}>
              <p style={{
                fontSize: "0.7rem", color: "#E98074", letterSpacing: "0.28em",
                textTransform: "uppercase", marginBottom: "0.75rem",
                fontFamily: "'Jost', sans-serif",
              }}>
                Personalized Analysis
              </p>

              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                fontWeight: 300,
                color: "#3d3b39",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
              }}>
                Your Career{" "}
                <em style={{ color: "#E98074", fontStyle: "italic" }}>Match Report</em>
              </h1>

              {/* Accent bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
                <div style={{
                  width: 48, height: 2, borderRadius: 2,
                  background: "linear-gradient(90deg, #E98074, #E85A4F, #E98074)",
                  backgroundSize: "200% auto",
                  animation: "shimmerBar 3s linear infinite",
                }} />
                <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#E98074", opacity: 0.55 }} />
              </div>

              <p style={{
                fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
                color: "#8E8D8A",
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 580,
                letterSpacing: "0.01em",
              }}>
                Based on your responses, here are the careers that best align with your skills,
                interests, and personality.
              </p>
            </div>

            {/* ── Summary strip ── */}
            <div
              className="flex flex-wrap gap-4 mb-12"
              style={{ animation: "fadeUp 0.7s ease 0.22s both" }}
            >
              {[
                { label: "Careers Analyzed", value: "50+" },
                { label: "Top Match", value: `${topScore}%` },
                { label: "Factors Reviewed", value: "12" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-xl px-5 py-3"
                  style={{ backgroundColor: "#D8C3A5", boxShadow: "0 2px 12px rgba(61,59,57,0.06)" }}
                >
                  <div style={{ width: 3, height: 28, borderRadius: 2, background: "linear-gradient(180deg, #E98074, #E85A4F)" }} />
                  <div>
                    <p style={{ fontSize: "1.1rem", fontWeight: 500, color: "#3d3b39", fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "0.02em" }}>
                      {stat.value}
                    </p>
                    <p style={{ fontSize: "0.68rem", color: "#8E8D8A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Career Cards Grid ── */}
            <div ref={cardsRef}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
                  gap: "clamp(1rem, 2.5vw, 1.75rem)",
                }}
              >
                {CAREERS.map((career, i) => (
                  <CareerCard key={career.career} data={career} index={i} inView={cardsInView} />
                ))}
              </div>
            </div>

            {/* ── Bottom CTA ── */}
            <div
              className="mt-16 flex flex-col items-center text-center"
              style={{ animation: "fadeUp 0.7s ease 0.55s both" }}
            >
              <div style={{ height: 1, width: 60, backgroundColor: "rgba(142,141,138,0.25)", marginBottom: "2rem" }} />
              <p style={{ fontSize: "0.8rem", color: "#8E8D8A", letterSpacing: "0.08em", marginBottom: "1.5rem", fontWeight: 300 }}>
                Ready to take the next step?
              </p>
              <ExploreButton />
              <p style={{ fontSize: "0.7rem", color: "#8E8D8A", opacity: 0.5, marginTop: "1rem", letterSpacing: "0.06em" }}>
                Retake the assessment anytime to update your results
              </p>
            </div>

          </main>

          {/* ── Footer ── */}
          <footer
            style={{
              textAlign: "center",
              padding: "1.5rem",
              borderTop: "1px solid rgba(216,195,165,0.35)",
              fontSize: "0.7rem",
              color: "#8E8D8A",
              letterSpacing: "0.08em",
              opacity: 0.65,
            }}
          >
            © 2025 PathFinder AI · All rights reserved
          </footer>
        </div>
      </div>
    </>
  );
}

// ─── Explore Button ───────────────────────────────────────────────────────────
function ExploreButton() {
  const [hov, setHov] = useState(false);
  return (
    <Link to = "/explore"
      type="button"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: hov ? "#E85A4F" : "#E98074",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Jost', sans-serif",
        fontSize: "0.73rem",
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        padding: "14px 40px",
        borderRadius: 12,
        boxShadow: hov ? "0 10px 32px rgba(232,90,79,0.38)" : "0 4px 16px rgba(233,128,116,0.26)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s ease",
      }}
    >
      Explore Career Paths →
    </Link>
  );
}