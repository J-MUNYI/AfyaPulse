import { useState } from "react";

export default function HealthEducation() {
  const [activeTab, setActiveTab] = useState("warnings");

  const warningSigns = [
    {
      title: "High Blood Pressure",
      signs: ["Severe headaches", "Chest pain", "Difficulty breathing", "Vision problems"],
      action: "Visit clinic immediately - these are emergency signs",
      prevention: "Reduce salt intake, exercise regularly, manage stress"
    },
    {
      title: "Diabetes",
      signs: ["Excessive thirst", "Frequent urination", "Unexplained weight loss", "Slow healing wounds"],
      action: "Get blood sugar tested at nearest health facility",
      prevention: "Maintain healthy weight, balanced diet, regular check-ups"
    },
    {
      title: "Stress & Mental Health",
      signs: ["Persistent sadness", "Sleep problems", "Loss of interest", "Feeling overwhelmed"],
      action: "Talk to a counselor or trusted healthcare provider",
      prevention: "Regular exercise, adequate sleep, stress management techniques"
    }
  ];

  const preventionTips = [
    {
      category: "Daily Habits",
      tips: [
        "Drink 8 glasses of water daily",
        "Walk for 30 minutes each day",
        "Eat at least 2 fruits daily",
        "Get 7-8 hours of sleep"
      ]
    },
    {
      category: "Monthly Check-ups",
      tips: [
        "Check blood pressure at local clinic",
        "Monitor weight changes",
        "Screen for diabetes if over 40",
        "Women: monthly breast self-exam"
      ]
    },
    {
      category: "Affordable Care",
      tips: [
        "Use government health facilities (NHIF accepted)",
        "Community health workers offer free basic checks",
        "Many pharmacies offer free blood pressure checks",
        "Preventive care is cheaper than treatment"
      ]
    }
  ];

  const selfCareGuidance = [
    {
      condition: "Common Cold/Flu",
      selfCare: ["Rest and fluids", "Steam inhalation", "Honey and lemon tea", "Avoid self-medication with antibiotics"],
      whenToSeek: "High fever, difficulty breathing, symptoms > 7 days"
    },
    {
      condition: "Headaches",
      selfCare: ["Rest in quiet room", "Stay hydrated", "Gentle neck massage", "Reduce screen time"],
      whenToSeek: "Sudden severe headache, vision changes, confusion"
    },
    {
      condition: "Stomach Issues",
      selfCare: ["BRAT diet (Banana, Rice, Apple, Toast)", "Oral rehydration salts", "Avoid spicy foods"],
      whenToSeek: "Severe pain, blood in stool, dehydration signs"
    }
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {["warnings", "prevention", "selfcare"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0.5rem 1rem",
              background: activeTab === tab ? "#2563eb" : "#f3f4f6",
              color: activeTab === tab ? "white" : "#374151",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "0.875rem"
            }}
          >
            {tab === "warnings" && "⚠️ Warning Signs"}
            {tab === "prevention" && "🛡️ Prevention"}
            {tab === "selfcare" && "💊 Self-Care"}
          </button>
        ))}
      </div>

      {activeTab === "warnings" && (
        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#dc2626" }}>
            Early Warning Signs - Don't Ignore These!
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "1rem" }}>
            "Itaisha tu" attitude costs lives. Early detection saves money and lives.
          </p>
          {warningSigns.map((warning, index) => (
            <div key={index} style={{ 
              background: "#fef2f2", 
              border: "1px solid #fecaca", 
              borderRadius: "0.5rem", 
              padding: "1rem", 
              marginBottom: "1rem" 
            }}>
              <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#dc2626" }}>
                {warning.title}
              </h4>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Warning Signs:</strong>
                <ul style={{ margin: "0.25rem 0", paddingLeft: "1.5rem" }}>
                  {warning.signs.map((sign, i) => (
                    <li key={i} style={{ fontSize: "0.85rem" }}>{sign}</li>
                  ))}
                </ul>
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Immediate Action:</strong>
                <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "#dc2626" }}>
                  {warning.action}
                </p>
              </div>
              <div>
                <strong>Prevention:</strong>
                <p style={{ margin: "0.25rem 0", fontSize: "0.85rem" }}>
                  {warning.prevention}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "prevention" && (
        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#059669" }}>
            Preventive Healthcare - Your Daily Defense
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "1rem" }}>
            Prevention is better and cheaper than cure. Make these habits part of your life.
          </p>
          {preventionTips.map((category, index) => (
            <div key={index} style={{ 
              background: "#f0fdf4", 
              border: "1px solid #bbf7d0", 
              borderRadius: "0.5rem", 
              padding: "1rem", 
              marginBottom: "1rem" 
            }}>
              <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#059669" }}>
                {category.category}
              </h4>
              <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                {category.tips.map((tip, i) => (
                  <li key={i} style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === "selfcare" && (
        <div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#7c3aed" }}>
            Safe Self-Care - When to Treat at Home vs When to Seek Help
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "1rem" }}>
            Learn to manage common illnesses safely while knowing when professional help is needed.
          </p>
          {selfCareGuidance.map((guide, index) => (
            <div key={index} style={{ 
              background: "#f3f0ff", 
              border: "1px solid #ddd6fe", 
              borderRadius: "0.5rem", 
              padding: "1rem", 
              marginBottom: "1rem" 
            }}>
              <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#7c3aed" }}>
                {guide.condition}
              </h4>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Safe Self-Care:</strong>
                <ul style={{ margin: "0.25rem 0", paddingLeft: "1.5rem" }}>
                  {guide.selfCare.map((care, i) => (
                    <li key={i} style={{ fontSize: "0.85rem" }}>{care}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>⚠️ When to Seek Medical Help:</strong>
                <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "#dc2626" }}>
                  {guide.whenToSeek}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
