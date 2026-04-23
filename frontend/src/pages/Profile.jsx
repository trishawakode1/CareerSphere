import { useState, useRef } from "react";
import {
  Camera,
  Edit3,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Briefcase,
  Globe,
  Target,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  AtSign,
} from "lucide-react";

const INTERESTS_OPTIONS = [
  "Technology", "Design", "Business", "Healthcare", "Education",
  "Finance", "Arts", "Engineering", "Law", "Research",
];

const DEGREE_OPTIONS = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "MBA",
  "Ph.D.",
  "Professional Degree (MD/JD)",
  "Other",
];

const CAREER_GOALS = [
  "Land my first job",
  "Switch careers",
  "Get promoted",
  "Start a business",
  "Upskill / reskill",
  "Study abroad",
];

const initialProfile = {
  name: "Akshi Takle",
  username: "akshii17",
  email: "akshi@example.com",
  phone: "+1 (555) 012-3456",
  age: "23",
  location: "San Francisco, CA",
  degree: "Bachelor's Degree",
  major: "Psychology",
  institution: "University of California, Berkeley",
  graduationYear: "2024",
  currentRole: "Recent Graduate",
  experience: "0–1 years",
  bio: "Passionate about human-centered design and leveraging AI to solve real-world problems. Currently exploring career paths at the intersection of psychology and technology.",
  careerGoal: "Land my first job",
  interests: ["Design", "Technology", "Research"],
  linkedin: "linkedin.com/in/janedoe",
  portfolio: "janedoe.design",
  photo: null,
};

function Avatar({ photo, name, size = 120, onUpload, editable }) {
  const ref = useRef();
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid #E85A4F",
          backgroundColor: "#D8C3A5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(232,90,79,0.18)",
        }}
      >
        {photo ? (
          <img src={photo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: size * 0.32, fontWeight: "700", color: "#E85A4F", fontFamily: "Georgia, serif" }}>
            {initials}
          </span>
        )}
      </div>
      {editable && (
        <>
          <button
            onClick={() => ref.current.click()}
            style={{
              position: "absolute",
              bottom: 4,
              right: 4,
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#E85A4F",
              border: "2px solid #EAE7DC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Camera size={14} color="#fff" />
          </button>
          <input
            ref={ref}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => onUpload(ev.target.result);
                reader.readAsDataURL(file);
              }
            }}
          />
        </>
      )}
    </div>
  );
}

function Field({ label, icon: Icon, value, field, editing, onChange, type = "text", options = null }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "11px", color: "#8E8D8A", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: "600", fontFamily: "Georgia, serif", display: "flex", alignItems: "center", gap: "5px" }}>
        {Icon && <Icon size={11} color="#E98074" />}
        {label}
      </label>
      {editing ? (
        options ? (
          <div style={{ position: "relative" }}>
            <select
              value={value}
              onChange={(e) => onChange(field, e.target.value)}
              style={{
                width: "100%",
                padding: "10px 36px 10px 12px",
                borderRadius: "10px",
                border: "1.5px solid #D8C3A5",
                backgroundColor: "#EAE7DC",
                color: "#2e2d2b",
                fontSize: "14px",
                fontFamily: "Georgia, serif",
                outline: "none",
                appearance: "none",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#E85A4F")}
              onBlur={(e) => (e.target.style.borderColor = "#D8C3A5")}
            >
              {options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronDown size={14} color="#8E8D8A" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          </div>
        ) : type === "textarea" ? (
          <textarea
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            rows={3}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1.5px solid #D8C3A5",
              backgroundColor: "#EAE7DC",
              color: "#2e2d2b",
              fontSize: "14px",
              fontFamily: "Georgia, serif",
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#E85A4F")}
            onBlur={(e) => (e.target.style.borderColor = "#D8C3A5")}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1.5px solid #D8C3A5",
              backgroundColor: "#EAE7DC",
              color: "#2e2d2b",
              fontSize: "14px",
              fontFamily: "Georgia, serif",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#E85A4F")}
            onBlur={(e) => (e.target.style.borderColor = "#D8C3A5")}
          />
        )
      ) : (
        <p style={{ margin: 0, fontSize: "14px", color: value ? "#2e2d2b" : "#8E8D8A", fontFamily: "Georgia, serif", lineHeight: "1.5", padding: "2px 0" }}>
          {value || "—"}
        </p>
      )}
    </div>
  );
}

function SectionCard({ title, children, accent }) {
  return (
    <div style={{
      backgroundColor: "#EAE7DC",
      border: "1px solid #D8C3A5",
      borderRadius: "16px",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 24px",
        borderBottom: "1px solid #D8C3A5",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#D8C3A580",
      }}>
        <div style={{ width: "3px", height: "16px", borderRadius: "2px", backgroundColor: accent || "#E85A4F" }} />
        <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#2e2d2b", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "Georgia, serif" }}>{title}</h3>
      </div>
      <div style={{ padding: "20px 24px" }}>
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));

  const handlePhotoUpload = (dataUrl) => {
    if (editing) handleChange("photo", dataUrl);
  };

  const toggleInterest = (interest) => {
    if (!editing) return;
    setDraft((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const completionFields = ["name", "email", "age", "degree", "major", "bio", "careerGoal", "phone", "location"];
  const filled = completionFields.filter((f) => profile[f]).length;
  const completion = Math.round((filled / completionFields.length) * 100);

  return (
    <div style={{ backgroundColor: "#F5F2EC", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      {/* Save toast */}
      {saved && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 1000,
          backgroundColor: "#E85A4F", color: "#fff",
          padding: "12px 20px", borderRadius: "12px",
          display: "flex", alignItems: "center", gap: "8px",
          boxShadow: "0 8px 24px rgba(232,90,79,0.3)",
          fontSize: "14px", fontWeight: "600", fontFamily: "Georgia, serif",
          animation: "fadeIn 0.2s ease",
        }}>
          <CheckCircle2 size={16} />
          Profile saved successfully!
        </div>
      )}

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E85A4F" }} />
              <span style={{ fontSize: "11px", color: "#8E8D8A", letterSpacing: "0.08em", textTransform: "uppercase" }}>Account</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#2e2d2b" }}>My Profile</h1>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {editing ? (
              <>
                <button onClick={handleCancel} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 18px", borderRadius: "10px",
                  border: "1.5px solid #D8C3A5", backgroundColor: "#EAE7DC",
                  color: "#8E8D8A", fontSize: "13px", fontWeight: "600",
                  cursor: "pointer", fontFamily: "Georgia, serif",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8E8D8A"; e.currentTarget.style.color = "#2e2d2b"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D8C3A5"; e.currentTarget.style.color = "#8E8D8A"; }}
                >
                  <X size={14} /> Cancel
                </button>
                <button onClick={handleSave} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 20px", borderRadius: "10px",
                  border: "none", backgroundColor: "#E85A4F",
                  color: "#fff", fontSize: "13px", fontWeight: "600",
                  cursor: "pointer", fontFamily: "Georgia, serif",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d44f44")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E85A4F")}
                >
                  <Save size={14} /> Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "10px 20px", borderRadius: "10px",
                border: "1.5px solid #E85A4F", backgroundColor: "transparent",
                color: "#E85A4F", fontSize: "13px", fontWeight: "600",
                cursor: "pointer", fontFamily: "Georgia, serif",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E85A4F"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#E85A4F"; }}
              >
                <Edit3 size={14} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Hero Card */}
        <div style={{
          backgroundColor: "#EAE7DC",
          border: "1px solid #D8C3A5",
          borderRadius: "20px",
          padding: "32px",
          marginBottom: "20px",
          display: "flex",
          gap: "28px",
          alignItems: "flex-start",
          flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative bg circle */}
          <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", backgroundColor: "rgba(232,90,79,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -30, right: 80, width: 100, height: 100, borderRadius: "50%", backgroundColor: "rgba(233,128,116,0.06)", pointerEvents: "none" }} />

          <Avatar
            photo={editing ? draft.photo : profile.photo}
            name={editing ? draft.name : profile.name}
            size={110}
            editable={editing}
            onUpload={handlePhotoUpload}
          />

          <div style={{ flex: 1, minWidth: "220px" }}>
            {editing ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <Field label="Full Name" icon={User} value={draft.name} field="name" editing onChange={handleChange} />
                <Field label="Username" icon={AtSign} value={draft.username} field="username" editing onChange={handleChange} />
              </div>
            ) : (
              <>
                <h2 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "700", color: "#2e2d2b" }}>{profile.name}</h2>
                <p style={{ margin: "0 0 10px", fontSize: "14px", color: "#8E8D8A" }}>@{profile.username}</p>
              </>
            )}

            {!editing && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
                {[
                  { icon: GraduationCap, text: profile.degree },
                  { icon: MapPin, text: profile.location },
                  { icon: Briefcase, text: profile.currentRole },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", borderRadius: "100px", backgroundColor: "#D8C3A5", fontSize: "12px", color: "#2e2d2b" }}>
                    <item.icon size={11} color="#E85A4F" />
                    {item.text}
                  </div>
                ))}
              </div>
            )}

            {/* Completion bar */}
            <div style={{ marginTop: editing ? "16px" : "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "11px", color: "#8E8D8A", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Sparkles size={11} color="#E98074" /> Profile Completion
                </span>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#E85A4F" }}>{completion}%</span>
              </div>
              <div style={{ backgroundColor: "#D8C3A5", borderRadius: "100px", height: "5px" }}>
                <div style={{ width: `${completion}%`, height: "100%", backgroundColor: "#E85A4F", borderRadius: "100px", transition: "width 0.5s ease" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

          {/* Personal Info */}
          <SectionCard title="Personal Information" accent="#E85A4F">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="Full Name" icon={User} value={editing ? draft.name : profile.name} field="name" editing={editing} onChange={handleChange} />
              <Field label="Username" icon={AtSign} value={editing ? draft.username : profile.username} field="username" editing={editing} onChange={handleChange} />
              <Field label="Age" icon={Calendar} value={editing ? draft.age : profile.age} field="age" editing={editing} onChange={handleChange} type="number" />
              <Field label="Phone" icon={Phone} value={editing ? draft.phone : profile.phone} field="phone" editing={editing} onChange={handleChange} />
              <Field label="Email" icon={Mail} value={editing ? draft.email : profile.email} field="email" editing={editing} onChange={handleChange} type="email" />
              <Field label="Location" icon={MapPin} value={editing ? draft.location : profile.location} field="location" editing={editing} onChange={handleChange} />
            </div>
          </SectionCard>

          {/* Education */}
          <SectionCard title="Education" accent="#E98074">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Field label="Degree" icon={GraduationCap} value={editing ? draft.degree : profile.degree} field="degree" editing={editing} onChange={handleChange} options={DEGREE_OPTIONS} />
              <Field label="Major / Field of Study" icon={BookOpen_} value={editing ? draft.major : profile.major} field="major" editing={editing} onChange={handleChange} />
              <Field label="Institution" value={editing ? draft.institution : profile.institution} field="institution" editing={editing} onChange={handleChange} />
              <Field label="Graduation Year" icon={Calendar} value={editing ? draft.graduationYear : profile.graduationYear} field="graduationYear" editing={editing} onChange={handleChange} type="number" />
            </div>
          </SectionCard>

          {/* Career Info */}
          <SectionCard title="Career Details" accent="#E85A4F">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Field label="Current Role / Status" icon={Briefcase} value={editing ? draft.currentRole : profile.currentRole} field="currentRole" editing={editing} onChange={handleChange} />
              <Field label="Years of Experience" value={editing ? draft.experience : profile.experience} field="experience" editing={editing} onChange={handleChange}
                options={["0–1 years", "1–3 years", "3–5 years", "5–10 years", "10+ years"]} />
              <Field label="Career Goal" icon={Target} value={editing ? draft.careerGoal : profile.careerGoal} field="careerGoal" editing={editing} onChange={handleChange} options={CAREER_GOALS} />
            </div>
          </SectionCard>

          {/* Online Presence */}
          <SectionCard title="Online Presence" accent="#8E8D8A">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Field label="LinkedIn" icon={Globe} value={editing ? draft.linkedin : profile.linkedin} field="linkedin" editing={editing} onChange={handleChange} />
              <Field label="Portfolio / Website" icon={Globe} value={editing ? draft.portfolio : profile.portfolio} field="portfolio" editing={editing} onChange={handleChange} />
            </div>
          </SectionCard>

          {/* Bio — full width */}
          <div style={{ gridColumn: "1 / -1" }}>
            <SectionCard title="About Me" accent="#E98074">
              <Field label="Bio" value={editing ? draft.bio : profile.bio} field="bio" editing={editing} onChange={handleChange} type="textarea" />
            </SectionCard>
          </div>

          {/* Interests — full width */}
          <div style={{ gridColumn: "1 / -1" }}>
            <SectionCard title="Career Interests" accent="#E85A4F">
              <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#8E8D8A" }}>
                {editing ? "Select all that apply to personalize your career recommendations." : "Your selected interest areas."}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {INTERESTS_OPTIONS.map((interest) => {
                  const active = (editing ? draft.interests : profile.interests).includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      disabled={!editing}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "100px",
                        border: active ? "1.5px solid #E85A4F" : "1.5px solid #D8C3A5",
                        backgroundColor: active ? "rgba(232,90,79,0.1)" : "transparent",
                        color: active ? "#E85A4F" : "#8E8D8A",
                        fontSize: "13px",
                        fontWeight: active ? "600" : "400",
                        fontFamily: "Georgia, serif",
                        cursor: editing ? "pointer" : "default",
                        transition: "all 0.18s",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      onMouseEnter={(e) => { if (editing && !active) e.currentTarget.style.borderColor = "#E98074"; }}
                      onMouseLeave={(e) => { if (editing && !active) e.currentTarget.style.borderColor = "#D8C3A5"; }}
                    >
                      {active && <CheckCircle2 size={12} color="#E85A4F" />}
                      {interest}
                    </button>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Bottom save bar when editing */}
        {editing && (
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            backgroundColor: "#EAE7DC",
            borderTop: "1px solid #D8C3A5",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            zIndex: 100,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          }}>
            <span style={{ flex: 1, fontSize: "13px", color: "#8E8D8A", alignSelf: "center" }}>
              ✏️ You have unsaved changes
            </span>
            <button onClick={handleCancel} style={{
              padding: "10px 20px", borderRadius: "10px",
              border: "1.5px solid #D8C3A5", backgroundColor: "transparent",
              color: "#8E8D8A", fontSize: "13px", fontWeight: "600",
              cursor: "pointer", fontFamily: "Georgia, serif",
            }}>
              Cancel
            </button>
            <button onClick={handleSave} style={{
              padding: "10px 24px", borderRadius: "10px",
              border: "none", backgroundColor: "#E85A4F",
              color: "#fff", fontSize: "13px", fontWeight: "600",
              cursor: "pointer", fontFamily: "Georgia, serif",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d44f44")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E85A4F")}
            >
              <Save size={14} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
              Save Changes
            </button>
          </div>
        )}
        {editing && <div style={{ height: "72px" }} />}
      </div>
    </div>
  );
}

// Small alias to avoid import conflict
function BookOpen_({ size, color }) {
  return <GraduationCap size={size} color={color} />;
}