export default function FormInput({ label, ...props }) {
    return (
      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        <span style={{ display: "block", fontSize: "0.8rem", marginBottom: 4 }}>
          {label}
        </span>
        <input
          {...props}
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            fontSize: "0.9rem"
          }}
        />
      </label>
    );
  }