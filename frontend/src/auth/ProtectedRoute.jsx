import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthed, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F2EC",
          color: "#8E8D8A",
          fontFamily: "Georgia, serif",
        }}
      >
        Checking session...
      </div>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/" replace />;
  }

  return children;
}
