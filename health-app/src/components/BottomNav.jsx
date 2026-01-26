import { Link, useLocation } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Home" },
  { to: "/health-log", label: "Check-in" },
  { to: "/insights", label: "Insights" }
];

export default function BottomNav() {
  const location = useLocation();
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: "480px",
        margin: "0 auto",
        background: "#ffffff",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-around",
        padding: "0.5rem 0"
      }}
    >
      {items.map((item) => {
        const active = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            style={{
              fontSize: "0.8rem",
              color: active ? "#16a34a" : "#6b7280",
              textDecoration: "none"
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}