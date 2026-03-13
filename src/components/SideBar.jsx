import { useState } from "react";
import {
  Home,
  Compass,
  Brain,
  ClipboardCheck,
  FileText,
  TrendingUp,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const menuItems = [
  { id: "home", label: "Home", icon: Home, path: "/home" },
  { id: "explore-careers", label: "Explore Careers", icon: Compass, path: "/explore" },
  { id: "aptitude-test", label: "Aptitude Test", icon: Brain, path: "/aptitude-test" },
  { id: "career-assessment", label: "Career Assessment", icon: ClipboardCheck, path: "/career-assessment" },
  { id: "view-report", label: "View Report", icon: FileText, path: "/report" },
  { id: "skill-gap", label: "Skill Gap Analysis", icon: TrendingUp, path: "/skill-gap" },
  { id: "profile", label: "Profile", icon: User, path: "/profile" },
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();


  return (
    <div
      style={{
        width: collapsed ? "72px" : "240px",
        backgroundColor: "#EAE7DC",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        borderRight: "1px solid #D8C3A5",
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "20px 0" : "20px 20px",
          borderBottom: "1px solid #D8C3A5",
          minHeight: "64px",
        }}
      >
        {!collapsed && (
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: "700",
              fontSize: "16px",
              color: "#E85A4F",
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
            }}
          >
            CareerSphere
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid #D8C3A5",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#8E8D8A",
            transition: "background-color 0.2s, color 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#D8C3A5";
            e.currentTarget.style.color = "#E85A4F";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#8E8D8A";
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto", overflowX: "hidden" }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path}
              key={item.id}
              title={collapsed ? item.label : undefined}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: collapsed ? "12px 0" : "12px 20px",
                justifyContent: collapsed ? "center" : "flex-start",
                backgroundColor: isActive ? "rgba(232, 90, 79, 0.1)" : "transparent",
                border: "none",
                borderLeft: isActive ? "3px solid #E85A4F" : "3px solid transparent",
                borderRadius: collapsed ? "0" : "0 12px 12px 0",
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginBottom: "2px",
                marginRight: collapsed ? "0" : "12px",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = "rgba(216, 195, 165, 0.5)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = isActive ? "rgba(232, 90, 79, 0.1)" : "transparent";
              }}
            >
              <Icon size={20} style={{ color: isActive ? "#E85A4F" : "#8E8D8A", flexShrink: 0, transition: "color 0.2s" }} />
              {!collapsed && (
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "14px",
                    fontWeight: isActive ? "600" : "400",
                    color: isActive ? "#E85A4F" : "#8E8D8A",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: collapsed ? "16px 0" : "16px 20px",
          borderTop: "1px solid #D8C3A5",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: "10px",
        }}
      >
        <div onClick={() => navigate("/")}>
          <LogOut
            size={20}
            className="text-[#8E8D8A] hover:text-[#E85A4F] transition-colors cursor-pointer"
          />
        </div>
        {!collapsed && (
          <div>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#8E8D8A", fontFamily: "Georgia, serif" }}>Akshi Takle</p>
            <p style={{ margin: 0, fontSize: "11px", color: "#D8C3A5", fontFamily: "Georgia, serif" }}>Student</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;