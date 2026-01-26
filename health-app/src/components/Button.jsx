export default function Button({ children, full, ...props }) {
    return (
      <button
        {...props}
        style={{
          width: full ? "100%" : "auto",
          padding: "0.6rem 1rem",
          borderRadius: 999,
          border: "none",
          background: "#16a34a",
          color: "#ffffff",
          fontSize: "0.9rem",
          fontWeight: 600,
          marginTop: "0.5rem"
        }}
      >
        {children}
      </button>
    );
  }