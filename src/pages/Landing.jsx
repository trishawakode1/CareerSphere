import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function FormInput({ id, label, type, placeholder, value, onChange, error }) {
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: "#8E8D8A" }}
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{
                    backgroundColor: "#EAE7DC",
                    color: "#3d3b39",
                    border: error
                        ? "1.5px solid #E85A4F"
                        : focused
                            ? "1.5px solid #E98074"
                            : "1.5px solid transparent",
                    boxShadow: focused
                        ? "0 0 0 3px rgba(233,128,116,0.18)"
                        : "inset 0 1px 3px rgba(0,0,0,0.06)",
                    transition: "border 0.2s, box-shadow 0.2s",
                }}
            />
            <div
                style={{
                    overflow: "hidden",
                    maxHeight: error ? "36px" : "0px",
                    opacity: error ? 1 : 0,
                    transition: "max-height 0.25s ease, opacity 0.25s ease",
                }}
            >
                <p className="mt-1.5 text-xs" style={{ color: "#E85A4F" }}>
                    {error}
                </p>
            </div>
        </div>
    );
}

function PrimaryButton({ children, type = "submit", onClick }) {
    const [hov, setHov] = useState(false);
    return (
        <button
            type={type}
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className="w-full rounded-xl py-3.5 text-sm uppercase tracking-widest font-medium"
            style={{
                backgroundColor: hov ? "#E85A4F" : "#E98074",
                color: "#fff",
                boxShadow: hov ? "0 8px 24px rgba(232,90,79,0.32)" : "0 2px 8px rgba(233,128,116,0.18)",
                transform: hov ? "translateY(-1px)" : "translateY(0)",
                transition: "all 0.25s ease",
            }}
        >
            {children}
        </button>
    );
}

function OutlineButton({ children, onClick }) {
    const [hov, setHov] = useState(false);
    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className="rounded-xl px-5 py-2.5 text-xs uppercase tracking-widest font-medium"
            style={{
                backgroundColor: hov ? "rgba(233,128,116,0.12)" : "transparent",
                color: hov ? "#E85A4F" : "#8E8D8A",
                border: `1.5px solid ${hov ? "#E98074" : "#c9c4bb"}`,
                transition: "all 0.22s ease",
            }}
        >
            {children}
        </button>
    );
}

function NavLink({ children, onClick }) {
    const [hov, setHov] = useState(false);
    return (
        <span
            className="underline cursor-pointer text-xs"
            style={{ color: hov ? "#E85A4F" : "#E98074", transition: "color 0.2s" }}
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
        >
            {children}
        </span>
    );
}

function CardHeader({ title }) {
    return (
        <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "#8E8D8A" }}>
                AI Career Counselling
            </p>
            <h2
                className="text-3xl font-light"
                style={{ color: "#3d3b39", letterSpacing: "0.04em", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
                {title}
            </h2>
            <div className="mt-4 mx-auto h-px w-12" style={{ backgroundColor: "#E98074" }} />
        </div>
    );
}

function SuccessMessage({ headline, sub }) {
    return (
        <div className="text-center py-8">
            <div style={{ color: "#E98074", fontSize: "2.5rem", marginBottom: "1rem", animation: "popIn 0.4s ease forwards" }}>
                ✓
            </div>
            <p className="text-lg font-light" style={{ color: "#3d3b39" }}>{headline}</p>
            <p className="text-sm mt-2" style={{ color: "#8E8D8A" }}>{sub}</p>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL WRAPPER — handles overlay, animation, escape key
// ─────────────────────────────────────────────────────────────────────────────

function ModalWrapper({ isOpen, onClose, children }) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            const t = setTimeout(() => setVisible(true), 16);
            return () => clearTimeout(t);
        } else {
            setVisible(false);
            const t = setTimeout(() => setMounted(false), 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    if (!mounted) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
                backgroundColor: visible ? "rgba(26, 24, 22, 0.55)" : "rgba(26, 24, 22, 0)",
                backdropFilter: visible ? "blur(5px)" : "blur(0px)",
                transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
            }}
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl px-10 py-12 shadow-2xl"
                style={{
                    backgroundColor: "#D8C3A5",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scale(1) translateY(0)" : "scale(0.93) translateY(20px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN MODAL
// ─────────────────────────────────────────────────────────────────────────────

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    // Reset on close
    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                setForm({ username: "", password: "" });
                setErrors({});
                setSubmitted(false);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const handleChange = (field) => (e) => {
        setForm((p) => ({ ...p, [field]: e.target.value }));
        setErrors((p) => ({ ...p, [field]: "" }));
    };

    const validate = () => {
        const errs = {};
        if (!form.username.trim()) errs.username = "Username cannot be empty.";
        if (!form.password.trim()) errs.password = "Password cannot be empty.";
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setSubmitted(true);

    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <CardHeader title="Welcome Back" />
            {submitted ? (
                navigate("/")
            ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <FormInput id="l-user" label="Username" type="text" placeholder="Enter your username"
                        value={form.username} onChange={handleChange("username")} error={errors.username} />
                    <FormInput id="l-pass" label="Password" type="password" placeholder="Enter your password"
                        value={form.password} onChange={handleChange("password")} error={errors.password} />
                    <div className="pt-1">
                        <PrimaryButton>Login</PrimaryButton>
                    </div>
                    <p className="text-center text-xs pt-1" style={{ color: "#8E8D8A" }}>
                        Don't have an account?{" "}
                        <NavLink onClick={onSwitchToRegister}>Register</NavLink>
                    </p>
                </form>
            )}
        </ModalWrapper>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER MODAL
// ─────────────────────────────────────────────────────────────────────────────

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
    const [form, setForm] = useState({ username: "", password: "", confirm: "" });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                setForm({ username: "", password: "", confirm: "" });
                setErrors({});
                setSubmitted(false);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const handleChange = (field) => (e) => {
        setForm((p) => ({ ...p, [field]: e.target.value }));
        setErrors((p) => ({ ...p, [field]: "" }));
    };

    const validate = () => {
        const errs = {};
        if (!form.username.trim()) errs.username = "Username cannot be empty.";
        if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
        if (form.confirm !== form.password) errs.confirm = "Passwords do not match.";
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setSubmitted(true);
        console.log("Register — Username:", form.username, "| Password:", form.password);
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <CardHeader title="Create Account" />
            {submitted ? (
                <SuccessMessage headline="Welcome aboard!" sub="Your account has been created successfully." />
            ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <FormInput id="r-user" label="Username" type="text" placeholder="Choose a username"
                        value={form.username} onChange={handleChange("username")} error={errors.username} />
                    <FormInput id="r-pass" label="Password" type="password" placeholder="Min. 6 characters"
                        value={form.password} onChange={handleChange("password")} error={errors.password} />
                    <FormInput id="r-conf" label="Confirm Password" type="password" placeholder="Re-enter your password"
                        value={form.confirm} onChange={handleChange("confirm")} error={errors.confirm} />
                    <div className="pt-1">
                        <PrimaryButton>Register</PrimaryButton>
                    </div>
                    <p className="text-center text-xs pt-1" style={{ color: "#8E8D8A" }}>
                        Already have an account?{" "}
                        <NavLink onClick={onSwitchToLogin}>Sign In</NavLink>
                    </p>
                </form>
            )}
        </ModalWrapper>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Landing() {
    const [modal, setModal] = useState(null); // null | "login" | "register"

    const openLogin = useCallback(() => setModal("login"), []);
    const openRegister = useCallback(() => setModal("register"), []);
    const closeModal = useCallback(() => setModal(null), []);

    const switchToRegister = useCallback(() => {
        setModal(null);
        setTimeout(() => setModal("register"), 320);
    }, []);

    const switchToLogin = useCallback(() => {
        setModal(null);
        setTimeout(() => setModal("login"), 320);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        @keyframes popIn {
          0%   { transform: scale(0.4); opacity: 0; }
          70%  { transform: scale(1.15); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slowSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes slowSpinReverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        .hero-headline { animation: fadeUp 0.9s ease 0.1s both; }
        .hero-sub      { animation: fadeUp 0.9s ease 0.28s both; }
        .hero-cta      { animation: fadeUp 0.9s ease 0.44s both; }
        .nav-fade      { animation: fadeIn 0.7s ease 0s both; }

        * { box-sizing: border-box; }
        ::placeholder { color: #b5b0a9; }
      `}</style>

            <div
                className="min-h-screen flex flex-col relative overflow-hidden"
                style={{ backgroundColor: "#EAE7DC", fontFamily: "'Jost', sans-serif" }}
            >

                {/* ── Decorative background geometry ── */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    {/* Large slow-spinning dashed ring */}
                    <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        width: 680, height: 680,
                        border: "1px dashed #D8C3A5",
                        borderRadius: "50%",
                        animation: "slowSpin 90s linear infinite",
                        opacity: 0.6,
                    }} />
                    {/* Medium ring */}
                    <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        width: 1000, height: 1000,
                        border: "1px solid #D8C3A5",
                        borderRadius: "50%",
                        animation: "slowSpinReverse 120s linear infinite",
                        opacity: 0.3,
                    }} />
                    {/* Small accent dot cluster */}
                    <div style={{
                        position: "absolute", top: "22%", right: "14%",
                        width: 6, height: 6, borderRadius: "50%",
                        backgroundColor: "#E98074", opacity: 0.5,
                    }} />
                    <div style={{
                        position: "absolute", top: "70%", left: "10%",
                        width: 4, height: 4, borderRadius: "50%",
                        backgroundColor: "#E98074", opacity: 0.4,
                    }} />
                    <div style={{
                        position: "absolute", top: "38%", right: "6%",
                        width: 3, height: 3, borderRadius: "50%",
                        backgroundColor: "#8E8D8A", opacity: 0.5,
                    }} />
                    {/* Horizontal rule across hero */}
                    <div style={{
                        position: "absolute", top: "50%", left: "5%",
                        width: "90%", height: "1px",
                        backgroundColor: "#D8C3A5", opacity: 0.35,
                    }} />
                </div>

                {/* ── Navigation ── */}
                <nav
                    className="nav-fade relative z-10 flex items-center justify-between px-8 md:px-16 py-6"
                    style={{ borderBottom: "1px solid rgba(216,195,165,0.45)" }}
                >
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#E98074" }}
                        >
                            <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 500 }}>AI</span>
                        </div>
                        <div>
                            <span
                                className="text-sm font-medium tracking-wide"
                                style={{ color: "#3d3b39", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem" }}
                            >
                                CareerSphere
                            </span>
                            <span
                                className="hidden sm:inline text-xs ml-1"
                                style={{ color: "#8E8D8A", letterSpacing: "0.1em" }}
                            >
                                - AI CAREER SUPPORT
                            </span>
                        </div>
                    </div>

                    {/* Nav links */}
                    {/* <div className="hidden md:flex items-center gap-8">
            {["About", "How It Works", "Pricing"].map((item) => (
              <button
                key={item}
                className="text-xs uppercase tracking-widest transition-colors duration-200"
                style={{ color: "#8E8D8A", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.color = "#3d3b39")}
                onMouseLeave={(e) => (e.target.style.color = "#8E8D8A")}
              >
                {item}
              </button>
            ))}
          </div> */}

                    {/* Auth buttons */}
                    <div className="flex items-center gap-3">
                        <OutlineButton onClick={openLogin}>Login</OutlineButton>
                        <button
                            type="button"
                            onClick={openRegister}
                            className="rounded-xl px-5 py-2.5 text-xs uppercase tracking-widest font-medium"
                            style={{
                                backgroundColor: "#E98074",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.22s ease",
                                boxShadow: "0 2px 8px rgba(233,128,116,0.22)",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#E85A4F";
                                e.target.style.boxShadow = "0 6px 18px rgba(232,90,79,0.3)";
                                e.target.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#E98074";
                                e.target.style.boxShadow = "0 2px 8px rgba(233,128,116,0.22)";
                                e.target.style.transform = "translateY(0)";
                            }}
                        >
                            Register
                        </button>
                    </div>
                </nav>

                {/* ── Hero ── */}
                <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
                    {/* Eyebrow */}
                    <div
                        className="hero-headline mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest"
                        style={{ backgroundColor: "rgba(216,195,165,0.5)", color: "#8E8D8A", border: "1px solid rgba(216,195,165,0.8)" }}
                    >
                        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E98074", display: "inline-block" }} />
                        AI-Powered Career Intelligence
                    </div>

                    {/* Headline */}
                    <h1
                        className="hero-headline mt-2 font-light leading-tight"
                        style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "clamp(2.6rem, 6vw, 5rem)",
                            color: "#3d3b39",
                            maxWidth: 720,
                            letterSpacing: "-0.01em",
                            lineHeight: 1.12,
                        }}
                    >
                        Discover Your
                        <br />
                        <em style={{ color: "#E98074", fontStyle: "italic" }}>Perfect Career</em> Path
                    </h1>

                    {/* Divider */}
                    <div className="hero-sub mt-8 flex items-center gap-4" style={{ opacity: 0.55 }}>
                        <div style={{ height: 1, width: 48, backgroundColor: "#8E8D8A" }} />
                        <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "#8E8D8A" }}>
                            Your future starts here
                        </span>
                        <div style={{ height: 1, width: 48, backgroundColor: "#8E8D8A" }} />
                    </div>

                    {/* Subtitle */}
                    <p
                        className="hero-sub mt-6 font-light leading-relaxed"
                        style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: "1.05rem",
                            color: "#8E8D8A",
                            maxWidth: 480,
                            letterSpacing: "0.01em",
                        }}
                    >
                        AI-powered personalized career guidance, tailored just for you.
                        Uncover opportunities that align with your skills, passions, and goals.
                    </p>

                    {/* CTA */}
                    <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 items-center">
                        <button
                            type="button"
                            onClick={openLogin}
                            className="rounded-xl px-8 py-4 text-sm uppercase tracking-widest font-medium"
                            style={{
                                backgroundColor: "#E98074",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 4px 20px rgba(233,128,116,0.3)",
                                transition: "all 0.25s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#E85A4F";
                                e.currentTarget.style.boxShadow = "0 8px 28px rgba(232,90,79,0.38)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#E98074";
                                e.currentTarget.style.boxShadow = "0 4px 20px rgba(233,128,116,0.3)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            Get Started →
                        </button>
                        <button
                            type="button"
                            onClick={openRegister}
                            className="text-xs uppercase tracking-widest"
                            style={{ color: "#8E8D8A", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                            onMouseEnter={(e) => (e.target.style.color = "#E98074")}
                            onMouseLeave={(e) => (e.target.style.color = "#8E8D8A")}
                        >
                            Create Free Account
                        </button>
                    </div>

                    {/* Trust line */}
                    <p className="hero-cta mt-12 text-xs tracking-widest uppercase" style={{ color: "#8E8D8A", opacity: 0.6 }}>
                        Trusted by 12,000+ professionals worldwide
                    </p>
                </main>

                {/* ── Footer ── */}
                <footer
                    className="relative z-10 text-center py-5 text-xs"
                    style={{ color: "#8E8D8A", borderTop: "1px solid rgba(216,195,165,0.35)", letterSpacing: "0.06em" }}
                >
                    © 2025 CareerSphere AI · All rights reserved
                </footer>
            </div>

            {/* ── Modals ── */}
            <LoginModal
                isOpen={modal === "login"}
                onClose={closeModal}
                onSwitchToRegister={switchToRegister}
            />
            <RegisterModal
                isOpen={modal === "register"}
                onClose={closeModal}
                onSwitchToLogin={switchToLogin}
            />
        </>
    );
}