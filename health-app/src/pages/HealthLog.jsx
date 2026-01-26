import { useState } from "react";
import Button from "../components/Button.jsx";
import { apiRequest } from "../api.js";

const todayStr = new Date().toISOString().slice(0, 10);

export default function HealthLog() {
  const [energy, setEnergy] = useState(3);
  const [sleepQuality, setSleepQuality] = useState("ok");
  const [appetite, setAppetite] = useState("normal");
  const [symptoms, setSymptoms] = useState([]);
  const [message, setMessage] = useState("");
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(false);

  const availableSymptoms = [
    { code: "fever", label: "Fever (Homa)", category: "critical", warning: "High fever needs immediate medical attention" },
    { code: "cough", label: "Cough (Kikohozi)", category: "common", warning: "Persistent cough > 2 weeks needs check-up" },
    { code: "chest_pain", label: "Chest Pain (Maumivu ya Kifua)", category: "critical", warning: "Emergency - seek care immediately" },
    { code: "shortness_of_breath", label: "Breathing Issues (Haiwezi Pumua)", category: "critical", warning: "Emergency - seek care immediately" },
    { code: "headache", label: "Headache (Kichwa Kuuma)", category: "common", warning: "Severe headaches need evaluation" },
    { code: "fatigue", label: "Extreme Fatigue (Kuchoka sana)", category: "concern", warning: "Could indicate many conditions" },
    { code: "dizziness", label: "Dizziness (Kizunguzungu)", category: "concern", warning: "Monitor and seek care if persistent" },
    { code: "vision_changes", label: "Vision Changes (Matatizo ya Macho)", category: "critical", warning: "Needs immediate medical attention" },
    { code: "urination_changes", label: "Frequent Urination (Kukojoa Mara nyingi)", category: "concern", warning: "Could indicate diabetes" },
    { code: "wound_healing", label: "Slow Wound Healing (Jeraha Haliponi)", category: "concern", warning: "Could indicate diabetes" }
  ];

  function toggleSymptom(code) {
    setSymptoms((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setRisk(null);

    try {
      const body = {
        profileId: 1, // TODO: replace with selected profile
        date: todayStr,
        energy: Number(energy),
        sleepQuality,
        appetite,
        symptoms,
        medications: []
      };

      const data = await apiRequest("/checkins", {
        method: "POST",
        body: JSON.stringify(body)
      });

      setRisk(data.riskLevel);
      setMessage(data.recommendationSummary);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
        Today's Health Check-in
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.9rem" }}>Energy Level Today</label>
          <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setEnergy(val)}
                style={{
                  flex: 1,
                  padding: "0.5rem 0",
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                  background: val === energy ? "#16a34a" : "#ffffff",
                  color: val === energy ? "#ffffff" : "#111827"
                }}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.9rem" }}>Sleep Quality</label>
          <select
            value={sleepQuality}
            onChange={(e) => setSleepQuality(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              marginTop: 4
            }}
          >
            <option value="good">Good</option>
            <option value="ok">Okay</option>
            <option value="bad">Poor</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.9rem" }}>Appetite</label>
          <select
            value={appetite}
            onChange={(e) => setAppetite(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              marginTop: 4
            }}
          >
            <option value="normal">Normal</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.9rem" }}>Symptoms Today</label>
          <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "2px" }}>
            Select all symptoms you're experiencing. Early detection saves lives!
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
            {availableSymptoms.map((s) => {
              const active = symptoms.includes(s.code);
              return (
                <div key={s.code} style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => toggleSymptom(s.code)}
                    style={{
                      padding: "0.3rem 0.6rem",
                      borderRadius: 999,
                      border: s.category === "critical" ? "2px solid #dc2626" : "1px solid #d1d5db",
                      background: active 
                        ? (s.category === "critical" ? "#dc2626" : "#f97316")
                        : "#ffffff",
                      color: active ? "#ffffff" : "#111827",
                      fontSize: "0.8rem",
                      fontWeight: s.category === "critical" ? "bold" : "normal"
                    }}
                  >
                    {s.category === "critical" && "⚠️ "}
                    {s.label}
                  </button>
                  {active && s.category === "critical" && (
                    <div style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "0.25rem",
                      padding: "0.25rem",
                      fontSize: "0.7rem",
                      color: "#dc2626",
                      width: "200px",
                      marginTop: "2px",
                      zIndex: 10
                    }}>
                      {s.warning}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {symptoms.some(code => availableSymptoms.find(s => s.code === code)?.category === "critical") && (
            <div style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "0.5rem",
              padding: "0.75rem",
              marginTop: "0.5rem"
            }}>
              <p style={{ 
                fontSize: "0.8rem", 
                color: "#dc2626", 
                margin: 0,
                fontWeight: "bold"
              }}>
                ⚠️ CRITICAL SYMPTOMS DETECTED
              </p>
              <p style={{ fontSize: "0.8rem", color: "#dc2626", marginTop: "0.25rem" }}>
                Please seek immediate medical attention. These symptoms require urgent evaluation.
              </p>
            </div>
          )}
        </div>

        <Button full disabled={loading}>
          {loading ? "Saving..." : "Save Check-in"}
        </Button>
      </form>

      {risk && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            borderRadius: 8,
            background:
              risk === "red"
                ? "#fee2e2"
                : risk === "amber"
                ? "#fef3c7"
                : "#dcfce7"
          }}
        >
          <strong>Risk Level: {risk.toUpperCase()}</strong>
          <p style={{ fontSize: "0.85rem", marginTop: 4 }}>{message}</p>
        </div>
      )}

      {!risk && message && (
        <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>{message}</p>
      )}
    </div>
  );
}