import { useAuth } from "../hooks/useAuth.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        padding: "0.75rem 1rem",
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <span style={{ fontWeight: 700 }}>AfyaTrack</span>
      {user && (
        <button
          onClick={logout}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "0.85rem",
            color: "#6b7280"
          }}
        >
          Logout
        </button>
      )}
    </header>
  );
}