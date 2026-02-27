import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
  ChevronRight,
  Brain,
  BarChart2,
  Lightbulb,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Flame,
  Star,
  AlertCircle,
  PlayCircle,
  Map,
} from "lucide-react";

const palette = {
  bg: "#EAE7DC",
  card: "#D8C3A5",
  muted: "#8E8D8A",
  accent: "#E98074",
  primary: "#E85A4F",
};

const S = {
  // Inline style helpers
  card: {
    backgroundColor: "#EAE7DC",
    border: "1px solid #D8C3A5",
    borderRadius: "16px",
    padding: "24px",
  },
  cardDark: {
    backgroundColor: "#D8C3A5",
    borderRadius: "16px",
    padding: "24px",
  },
  tag: (color) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 10px",
    borderRadius: "100px",
    fontSize: "11px",
    fontWeight: "600",
    backgroundColor: color === "red" ? "rgba(232,90,79,0.12)" : color === "orange" ? "rgba(233,128,116,0.15)" : "rgba(142,141,138,0.12)",
    color: color === "red" ? "#E85A4F" : color === "orange" ? "#E98074" : "#8E8D8A",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  }),
};

const careerMatches = [
  { title: "UX Designer", match: 94, field: "Design", growth: "+18%", icon: "🎨" },
  { title: "Product Manager", match: 88, field: "Strategy", growth: "+22%", icon: "🧩" },
  { title: "Data Analyst", match: 81, field: "Analytics", growth: "+31%", icon: "📊" },
];

const tasks = [
  { label: "Complete Aptitude Test", done: true, time: "Done" },
  { label: "Upload your Resume", done: true, time: "Done" },
  { label: "Finish Career Assessment", done: false, time: "~12 min" },
  { label: "Review Skill Gap Report", done: false, time: "~5 min" },
  { label: "Explore Top Career Matches", done: false, time: "~8 min" },
];

const skills = [
  { name: "Critical Thinking", level: 82, status: "strong" },
  { name: "Data Literacy", level: 61, status: "growing" },
  { name: "Communication", level: 74, status: "strong" },
  { name: "Python / SQL", level: 38, status: "gap" },
  { name: "Project Management", level: 55, status: "growing" },
];

const insights = [
  {
    icon: Flame,
    color: "#E85A4F",
    title: "Your strongest trait is Creative Problem-Solving",
    desc: "Top 15% of users in your cohort.",
  },
  {
    icon: AlertCircle,
    color: "#E98074",
    title: "Technical skills gap detected",
    desc: "Bridging Python basics could unlock 3 more career paths.",
  },
  {
    icon: Star,
    color: "#8E8D8A",
    title: "UX Design aligns with your values",
    desc: "Impact-driven work + collaboration — your top two priorities.",
  },
];

function ProgressBar({ value, color = "#E85A4F" }) {
  return (
    <div style={{ backgroundColor: "#D8C3A5", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          backgroundColor: color,
          borderRadius: "100px",
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, iconColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...S.card,
        transition: "transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.07)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: 0, fontSize: "12px", color: palette.muted, fontFamily: "Georgia, serif", letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</p>
          <p style={{ margin: "8px 0 4px", fontSize: "28px", fontWeight: "700", color: "#3d3c39", fontFamily: "Georgia, serif" }}>{value}</p>
          {sub && <p style={{ margin: 0, fontSize: "12px", color: palette.muted, fontFamily: "Georgia, serif" }}>{sub}</p>}
        </div>
        <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: `${iconColor}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={iconColor} />
        </div>
      </div>
    </div>
  );
}

export default function Homepage() {
  const [activeTab, setActiveTab] = useState("overview");
  const completedTasks = tasks.filter((t) => t.done).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  return (
    <div style={{ backgroundColor: "#F5F2EC", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>

        {/* ── Top greeting bar ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E85A4F" }} />
              <span style={{ fontSize: "12px", color: palette.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Friday, 27 Feb 2026</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "700", color: "#2e2d2b" }}>
              Good morning, Akshi 👋
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: "15px", color: palette.muted }}>
              You're 40% through your career discovery journey. Let's keep going.
            </p>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#E85A4F",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d44f44")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E85A4F")}
          >
            <PlayCircle size={16} />
            Continue Assessment
          </button>
        </div>

        {/* ── Stat cards row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
          <StatCard icon={Target} label="Profile Match" value="94%" sub="UX Designer" iconColor="#E85A4F" />
          <StatCard icon={BarChart2} label="Aptitude Score" value="87" sub="Top 20% nationally" iconColor="#E98074" />
          <StatCard icon={Brain} label="Skills Assessed" value="18" sub="5 gaps identified" iconColor="#8E8D8A" />
          <StatCard icon={Map} label="Careers Explored" value="12" sub="3 strong matches" iconColor="#E85A4F" />
        </div>

        {/* ── Main 2-col grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", alignItems: "start" }}>

          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Journey Progress */}
            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#2e2d2b" }}>Your Journey</h2>
                <span style={S.tag("orange")}>{completedTasks}/{tasks.length} Complete</span>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", color: palette.muted }}>Overall Progress</span>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#E85A4F" }}>{progress}%</span>
                </div>
                <ProgressBar value={progress} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {tasks.map((task, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      backgroundColor: task.done ? "rgba(232,90,79,0.05)" : "#F5F2EC",
                      border: task.done ? "1px solid rgba(232,90,79,0.15)" : "1px solid #D8C3A5",
                      cursor: task.done ? "default" : "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => { if (!task.done) e.currentTarget.style.backgroundColor = "#EAE7DC"; }}
                    onMouseLeave={(e) => { if (!task.done) e.currentTarget.style.backgroundColor = "#F5F2EC"; }}
                  >
                    <CheckCircle2 size={18} color={task.done ? "#E85A4F" : "#D8C3A5"} fill={task.done ? "rgba(232,90,79,0.12)" : "none"} />
                    <span style={{ flex: 1, fontSize: "14px", color: task.done ? palette.muted : "#2e2d2b", textDecoration: task.done ? "line-through" : "none" }}>
                      {task.label}
                    </span>
                    <span style={{ fontSize: "12px", color: task.done ? "#E85A4F" : palette.muted, fontWeight: task.done ? "600" : "400" }}>
                      {task.time}
                    </span>
                    {!task.done && <ChevronRight size={14} color={palette.muted} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Career Matches */}
            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#2e2d2b" }}>Top Career Matches</h2>
                <button style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", color: "#E85A4F", fontSize: "13px", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "600" }}>
                  See all <ArrowUpRight size={14} />
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {careerMatches.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px",
                      borderRadius: "12px",
                      backgroundColor: "#F5F2EC",
                      border: "1px solid #D8C3A5",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#EAE7DC";
                      e.currentTarget.style.borderColor = "#E98074";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#F5F2EC";
                      e.currentTarget.style.borderColor = "#D8C3A5";
                    }}
                  >
                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#EAE7DC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0, border: "1px solid #D8C3A5" }}>
                      {c.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontSize: "15px", fontWeight: "700", color: "#2e2d2b" }}>{c.title}</span>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: "#E85A4F" }}>{c.match}% match</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: palette.muted }}>{c.field}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <TrendingUp size={12} color="#E98074" />
                          <span style={{ fontSize: "12px", color: "#E98074", fontWeight: "600" }}>{c.growth} growth</span>
                        </div>
                      </div>
                      <div style={{ marginTop: "8px" }}>
                        <ProgressBar value={c.match} color={i === 0 ? "#E85A4F" : "#E98074"} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Snapshot */}
            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#2e2d2b" }}>Skill Snapshot</h2>
                <button style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", color: "#E85A4F", fontSize: "13px", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "600" }}>
                  Full Report <ArrowUpRight size={14} />
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "14px", color: "#2e2d2b" }}>{skill.name}</span>
                        <span style={S.tag(skill.status === "strong" ? "red" : skill.status === "gap" ? "orange" : "gray")}>
                          {skill.status}
                        </span>
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: skill.status === "gap" ? "#E98074" : "#2e2d2b" }}>{skill.level}%</span>
                    </div>
                    <ProgressBar
                      value={skill.level}
                      color={skill.status === "gap" ? "#E98074" : skill.status === "strong" ? "#E85A4F" : "#8E8D8A"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* AI Insight Panel */}
            <div style={{ backgroundColor: "#E85A4F", borderRadius: "16px", padding: "24px", color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Sparkles size={16} color="rgba(255,255,255,0.8)" />
                <span style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: "600" }}>AI Recommendation</span>
              </div>
              <p style={{ margin: "0 0 16px", fontSize: "15px", lineHeight: "1.6", fontWeight: "600" }}>
                "Your aptitude results strongly align with human-centered design roles. We recommend completing the Career Assessment to unlock your personalized roadmap."
              </p>
              <button
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  backdropFilter: "blur(4px)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
              >
                Take Career Assessment →
              </button>
            </div>

            {/* Insights */}
            <div style={S.card}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Lightbulb size={16} color="#E98074" />
                <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#2e2d2b" }}>Key Insights</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {insights.map((ins, i) => {
                  const Icon = ins.icon;
                  return (
                    <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ width: "34px", height: "34px", borderRadius: "10px", backgroundColor: `${ins.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} color={ins.color} />
                      </div>
                      <div>
                        <p style={{ margin: "0 0 3px", fontSize: "13px", fontWeight: "700", color: "#2e2d2b", lineHeight: "1.4" }}>{ins.title}</p>
                        <p style={{ margin: 0, fontSize: "12px", color: palette.muted, lineHeight: "1.5" }}>{ins.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={S.card}>
              <h2 style={{ margin: "0 0 14px", fontSize: "16px", fontWeight: "700", color: "#2e2d2b" }}>Quick Actions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Retake Aptitude Test", icon: Brain, color: "#E85A4F" },
                  { label: "Explore Career Paths", icon: Map, color: "#E98074" },
                  { label: "Browse Learning Resources", icon: BookOpen, color: "#8E8D8A" },
                ].map((action, i) => {
                  const Icon = action.icon;
                  const [hov, setHov] = useState(false);
                  return (
                    <button
                      key={i}
                      onMouseEnter={() => setHov(true)}
                      onMouseLeave={() => setHov(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        backgroundColor: hov ? "#EAE7DC" : "#F5F2EC",
                        border: "1px solid #D8C3A5",
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "Georgia, serif",
                        transition: "background 0.2s",
                        width: "100%",
                      }}
                    >
                      <Icon size={16} color={action.color} />
                      <span style={{ flex: 1, fontSize: "13px", color: "#2e2d2b", fontWeight: "500" }}>{action.label}</span>
                      <ChevronRight size={14} color={palette.muted} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={S.card}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <Clock size={15} color={palette.muted} />
                <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#2e2d2b" }}>Recent Activity</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { action: "Completed Aptitude Test", time: "2 days ago", color: "#E85A4F" },
                  { action: "Explored UX Designer path", time: "3 days ago", color: "#E98074" },
                  { action: "Uploaded Resume", time: "5 days ago", color: "#8E8D8A" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: item.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: "13px", color: "#2e2d2b" }}>{item.action}</p>
                    </div>
                    <span style={{ fontSize: "11px", color: palette.muted, whiteSpace: "nowrap" }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}