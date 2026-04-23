import { useState, useEffect } from "react";

// ─── Floating Organic Shape ───────────────────────────────────────────────────
function Shape({ size, top, left, color, blur, delay, duration }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        left,
        borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
        background: color,
        filter: `blur(${blur}px)`,
        opacity: 0.5,
        animation: `morphFloat ${duration}s ease-in-out ${delay}s infinite alternate`,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}

// ─── Underline Input ──────────────────────────────────────────────────────────
function UnderlineInput({ id, label, type, placeholder, value, onChange, animDelay }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ animation: `slideInRight 0.7s ease ${animDelay}s both` }}>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.18em] mb-3"
        style={{
          color: focused ? "#E98074" : "#8E8D8A",
          fontFamily: "'Jost', sans-serif",
          transition: "color 0.25s ease",
        }}
      >
        {label}
        <span className="ml-2 normal-case" style={{ fontSize: "0.65rem", opacity: 0.6 }}>
          (optional)
        </span>
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={type === "number" ? 14 : undefined}
        max={type === "number" ? 99 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full outline-none bg-transparent pb-3 text-base"
        style={{
          color: "#3d3b39",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: "1rem",
          letterSpacing: "0.02em",
          borderBottom: `1.5px solid ${focused ? "#E98074" : "rgba(142,141,138,0.3)"}`,
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          transition: "border-color 0.3s ease",
        }}
      />

      {/* Animated fill bar */}
      <div
        style={{
          height: 2,
          marginTop: -1.5,
          width: focused ? "100%" : "0%",
          background: "linear-gradient(90deg, #E98074, #E85A4F)",
          transition: "width 0.38s ease",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

// ─── Underline Select ─────────────────────────────────────────────────────────
function UnderlineSelect({ id, label, value, onChange, options, animDelay }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ animation: `slideInRight 0.7s ease ${animDelay}s both` }}>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.18em] mb-3"
        style={{
          color: focused ? "#E98074" : "#8E8D8A",
          fontFamily: "'Jost', sans-serif",
          transition: "color 0.25s ease",
        }}
      >
        {label}
        <span className="ml-2 normal-case" style={{ fontSize: "0.65rem", opacity: 0.6 }}>
          (optional)
        </span>
      </label>

      <div style={{ position: "relative" }}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full outline-none bg-transparent pb-3 text-base appearance-none cursor-pointer"
          style={{
            color: value ? "#3d3b39" : "#b5b0a9",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: "1rem",
            letterSpacing: "0.02em",
            borderBottom: `1.5px solid ${focused ? "#E98074" : "rgba(142,141,138,0.3)"}`,
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderRadius: 0,
            transition: "border-color 0.3s ease",
          }}
        >
          <option value="" disabled hidden>Select an option</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} style={{ color: "#3d3b39", background: "#EAE7DC" }}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <div
          style={{
            position: "absolute", right: 2, top: "28%",
            transform: `translateY(-50%) rotate(${focused ? "180deg" : "0deg"})`,
            transition: "transform 0.25s ease, color 0.25s ease",
            pointerEvents: "none",
            color: focused ? "#E98074" : "#8E8D8A",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div
        style={{
          height: 2,
          marginTop: -1.5,
          width: focused ? "100%" : "0%",
          background: "linear-gradient(90deg, #E98074, #E85A4F)",
          transition: "width 0.38s ease",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

// ─── Continue Button ──────────────────────────────────────────────────────────
function ContinueButton() {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="submit"
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
        padding: "14px 38px",
        borderRadius: 12,
        boxShadow: hov ? "0 10px 32px rgba(232,90,79,0.38)" : "0 4px 16px rgba(233,128,116,0.26)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s ease",
      }}
    >
      Continue
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GetInitDetails({ onContinue, onSkip }) {
  const [form, setForm] = useState({ age: "", education: "", employment: "" });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleContinue = (e) => {
    e.preventDefault();
    const payload = {
      age: form.age ? parseInt(form.age) : null,
      education: form.education || null,
      employment: form.employment || null,
    };
    console.log("Initial Details:", payload);
    if (onContinue) onContinue(payload);
  };

  const handleSkip = () => {
    console.log("Skipped initial details.");
    if (onSkip) onSkip();
  };

  const educationOptions = [
    { value: "high_school",   label: "High School" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "postgraduate",  label: "Postgraduate" },
    { value: "other",         label: "Other" },
  ];

  const employmentOptions = [
    { value: "student",       label: "Student" },
    { value: "employed",      label: "Employed" },
    { value: "unemployed",    label: "Unemployed" },
    { value: "self_employed", label: "Self-Employed" },
  ];

  const features = [
    "Tailored job role suggestions",
    "Personalized skill gap analysis",
    "Growth path recommendations",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        @keyframes morphFloat {
          0%   { transform: translateY(0px)   rotate(0deg)  scale(1); }
          100% { transform: translateY(-30px) rotate(8deg)  scale(1.06); }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes rotateCCW {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-52px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(44px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerBar {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }

        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
        ::placeholder { color: #b8b3ab; }
        select option  { color: #3d3b39; background: #EAE7DC; }
        * { box-sizing: border-box; }
      `}</style>

      <div
        className="min-h-screen flex flex-col md:flex-row"
        style={{ backgroundColor: "#EAE7DC", fontFamily: "'Jost', sans-serif" }}
      >

        {/* ══════════════════ LEFT PANEL (40%) ══════════════════ */}
        <div
          className="relative flex flex-col justify-between overflow-hidden"
          style={{
            width: "100%",
            backgroundColor: "#D8C3A5",
            padding: "clamp(2.5rem, 5vw, 4.5rem)",
            minHeight: "42vh",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateX(0)" : "translateX(-52px)",
            transition: "opacity 0.75s ease, transform 0.75s ease",
          }}
        >
          {/* Override to 40% on md+ */}
          <style>{`
                @media (min-width: 768px) {
                .left-panel { width: 32% !important; min-height: 100vh !important; }
                .right-panel { width: 68% !important; }
                }
          `}</style>
          <div className="left-panel" style={{ position: "absolute", inset: 0 }} />

          {/* Floating blobs */}
          <Shape size={300} top="-12%" left="-12%" color="rgba(233,128,116,0.3)"  blur={70} delay={0}   duration={9}  />
          <Shape size={200} top="58%"  left="62%"  color="rgba(232,90,79,0.18)"   blur={55} delay={1.5} duration={11} />
          <Shape size={150} top="72%"  left="-6%"  color="rgba(216,195,165,0.5)"  blur={45} delay={0.8} duration={8}  />
          <Shape size={90}  top="18%"  left="75%"  color="rgba(233,128,116,0.22)" blur={35} delay={2}   duration={7}  />

          {/* Rotating rings */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 280, height: 280,
            border: "1px dashed rgba(233,128,116,0.28)",
            borderRadius: "50%",
            animation: "rotateSlow 42s linear infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 170, height: 170,
            border: "1px solid rgba(142,141,138,0.18)",
            borderRadius: "50%",
            animation: "rotateCCW 26s linear infinite",
            pointerEvents: "none",
          }} />

          {/* Brand */}
          <div className="relative z-10" style={{ animation: "fadeUp 0.6s ease 0.15s both" }}>
            <div className="flex items-center gap-2.5">
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                backgroundColor: "#E98074",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px rgba(233,128,116,0.38)",
                flexShrink: 0,
              }}>
                <span style={{ color: "#fff", fontSize: "0.68rem", fontWeight: 500 }}>AI</span>
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.05rem", color: "#3d3b39", letterSpacing: "0.05em",
              }}>
                CareerSphere
              </span>
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center py-10">

            {/* Step tracker */}
            <div className="flex items-center gap-2 mb-10" style={{ animation: "fadeUp 0.6s ease 0.25s both" }}>
              {[
                { label: "Register", done: true },
                { label: "Profile",  done: false, active: true },
                { label: "Explore",  done: false },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div style={{
                      width: step.active ? 28 : 22, height: step.active ? 28 : 22,
                      borderRadius: "50%",
                      backgroundColor: step.done || step.active ? "#E98074" : "transparent",
                      border: step.done || step.active ? "none" : "1.5px solid rgba(142,141,138,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: step.active ? "0 0 0 5px rgba(233,128,116,0.18)" : "none",
                      transition: "all 0.3s",
                      flexShrink: 0,
                    }}>
                      {step.done ? (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6.5L5 9.5L10 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <span style={{ fontSize: "0.6rem", color: step.active ? "#fff" : "#8E8D8A", fontWeight: 500 }}>
                          {i + 1}
                        </span>
                      )}
                    </div>
                    <span className="hidden sm:block text-xs" style={{
                      color: step.active ? "#3d3b39" : step.done ? "#E98074" : "#8E8D8A",
                      fontWeight: step.active ? 500 : 300,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      fontSize: "0.63rem",
                    }}>
                      {step.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div style={{
                      width: 18, height: 1,
                      backgroundColor: step.done ? "#E98074" : "rgba(142,141,138,0.28)",
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 3.2vw, 2.9rem)",
              fontWeight: 300,
              color: "#3d3b39",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
              maxWidth: 340,
              animation: "fadeUp 0.75s ease 0.32s both",
            }}>
              Let's Personalize
              <br />
              <em style={{ color: "#E98074", fontStyle: "italic" }}>Your Journey</em>
            </h1>

            {/* Accent bar */}
            <div className="flex items-center gap-3 my-6" style={{ animation: "fadeUp 0.7s ease 0.42s both" }}>
              <div style={{
                width: 44, height: 2, borderRadius: 2,
                background: "linear-gradient(90deg, #E98074, #E85A4F, #E98074)",
                backgroundSize: "200% auto",
                animation: "shimmerBar 3s linear infinite",
              }} />
              <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#E98074", opacity: 0.55 }} />
            </div>

            {/* Body copy */}
            <p style={{
              color: "#6b6966",
              fontSize: "0.88rem",
              fontWeight: 300,
              lineHeight: 1.8,
              maxWidth: 300,
              letterSpacing: "0.02em",
              animation: "fadeUp 0.75s ease 0.48s both",
            }}>
              A few details help our AI craft recommendations that truly fit your background,
              aspirations, and lifestyle.
            </p>

            {/* Feature pills */}
            <div className="mt-8 space-y-3" style={{ animation: "fadeUp 0.75s ease 0.55s both" }}>
              {[
                "Tailored job role suggestions",
                "Personalized skill gap analysis",
                "Growth path recommendations",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    backgroundColor: "rgba(233,128,116,0.14)",
                    border: "1px solid rgba(233,128,116,0.28)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#E98074" }} />
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "#8E8D8A", letterSpacing: "0.01em", fontWeight: 300 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom note */}
          <div className="relative z-10" style={{ animation: "fadeUp 0.6s ease 0.65s both" }}>
            <p style={{ fontSize: "0.7rem", color: "#8E8D8A", letterSpacing: "0.06em", opacity: 0.65 }}>
              All fields are optional · Your data stays private
            </p>
          </div>
        </div>

        {/* ══════════════════ RIGHT PANEL (60%) ══════════════════ */}
        <div
          className="right-panel flex flex-col justify-center relative"
          style={{
            padding: "clamp(3rem, 6vw, 6rem) clamp(2.5rem, 5vw, 5.5rem)",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateX(0)" : "translateX(44px)",
            transition: "opacity 0.75s ease 0.18s, transform 0.75s ease 0.18s",
          }}
        >
          {/* Dot grid */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle, rgba(142,141,138,0.07) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />

          {/* Corner glow */}
          <div style={{
            position: "absolute", bottom: 0, right: 0, width: 300, height: 300,
            background: "radial-gradient(circle at bottom right, rgba(233,128,116,0.08), transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="relative z-10 w-full max-w-md">

            {/* Section header */}
            <div className="mb-12" style={{ animation: "slideInRight 0.7s ease 0.22s both" }}>
              <p className="text-xs uppercase tracking-[0.26em] mb-4" style={{ color: "#E98074", fontFamily: "'Jost', sans-serif" }}>
                Step 2 of 3
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.65rem, 2.5vw, 2.1rem)",
                fontWeight: 300,
                color: "#3d3b39",
                letterSpacing: "0.015em",
                lineHeight: 1.3,
              }}>
                Tell us about yourself
              </h2>
              <p className="mt-2 text-sm font-light" style={{ color: "#8E8D8A", lineHeight: 1.65, letterSpacing: "0.01em" }}>
                This helps us understand where you're starting from.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleContinue} noValidate>
              <div className="space-y-10">
                <UnderlineInput
                  id="age"
                  label="Age"
                  type="number"
                  placeholder="e.g. 24"
                  value={form.age}
                  onChange={handleChange("age")}
                  animDelay={0.32}
                />
                <UnderlineSelect
                  id="education"
                  label="Education Level"
                  value={form.education}
                  onChange={handleChange("education")}
                  options={educationOptions}
                  animDelay={0.42}
                />
                <UnderlineSelect
                  id="employment"
                  label="Employment Status"
                  value={form.employment}
                  onChange={handleChange("employment")}
                  options={employmentOptions}
                  animDelay={0.52}
                />
              </div>

              {/* Divider */}
              <div
                className="my-10"
                style={{
                  height: 1,
                  backgroundColor: "rgba(142,141,138,0.16)",
                  animation: "slideInRight 0.7s ease 0.58s both",
                }}
              />

              {/* Actions */}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
                style={{ animation: "slideInRight 0.7s ease 0.64s both" }}
              >
                <ContinueButton />

                <button
                  type="button"
                  onClick={handleSkip}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "#8E8D8A",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 400,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    padding: "4px 0",
                    transition: "color 0.2s ease, letter-spacing 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#E98074";
                    e.currentTarget.style.letterSpacing = "0.22em";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8E8D8A";
                    e.currentTarget.style.letterSpacing = "0.16em";
                  }}
                >
                  Skip for now →
                </button>
              </div>

              <p
                className="mt-8 text-xs"
                style={{
                  color: "#8E8D8A",
                  opacity: 0.5,
                  letterSpacing: "0.04em",
                  lineHeight: 1.75,
                  animation: "slideInRight 0.7s ease 0.72s both",
                }}
              >
                You can update these details anytime from your profile settings.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}