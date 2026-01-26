import { query } from "../db.js";

// very simple, rule-based risk calculation
function calculateRisk({ energy, symptoms }) {
  const hasRedSymptom = symptoms.includes("chest_pain") ||
    symptoms.includes("shortness_of_breath");

  if (hasRedSymptom) return "red";
  if (energy <= 2 || symptoms.length >= 3) return "amber";
  return "green";
}

export async function createCheckin(req, res) {
  const userId = req.user.id;
  const {
    profileId,
    date,
    energy,
    sleepQuality,
    appetite,
    symptoms = [],
    medications = [],
    vitals = {}
  } = req.body;

  try {
    // make sure profile belongs to user
    const profileRes = await query(
      "SELECT id FROM profiles WHERE id = $1 AND user_id = $2",
      [profileId, userId]
    );
    if (profileRes.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const riskLevel = calculateRisk({ energy, symptoms });
    const recommendationSummary =
      riskLevel === "red"
        ? "These signs can be serious. Please visit a clinic as soon as possible."
        : riskLevel === "amber"
        ? "Keep watching your symptoms and consider visiting a clinic if they continue."
        : "You seem stable today. Keep tracking your health.";

    // insert into checkins
    const checkinRes = await query(
      `INSERT INTO checkins
      (profile_id, checkin_date, energy, sleep_quality, appetite, medications, risk_level, recommendation_summary)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (profile_id, checkin_date) DO UPDATE SET
        energy = EXCLUDED.energy,
        sleep_quality = EXCLUDED.sleep_quality,
        appetite = EXCLUDED.appetite,
        medications = EXCLUDED.medications,
        risk_level = EXCLUDED.risk_level,
        recommendation_summary = EXCLUDED.recommendation_summary
      RETURNING id`,
      [
        profileId,
        date,
        energy,
        sleepQuality,
        appetite,
        medications,
        riskLevel,
        recommendationSummary
      ]
    );

    const checkinId = checkinRes.rows[0].id;

    // clear old symptoms and vitals for that checkin (simple approach)
    await query("DELETE FROM checkin_symptoms WHERE checkin_id = $1", [
      checkinId
    ]);
    await query("DELETE FROM vitals WHERE checkin_id = $1", [checkinId]);

    for (const s of symptoms) {
      await query(
        "INSERT INTO checkin_symptoms (checkin_id, symptom_code) VALUES ($1, $2)",
        [checkinId, s]
      );
    }

    if (
      vitals.weightKg ||
      vitals.bpSystolic ||
      vitals.bpDiastolic ||
      vitals.bloodSugar
    ) {
      await query(
        `INSERT INTO vitals
        (checkin_id, weight_kg, bp_systolic, bp_diastolic, blood_sugar, blood_sugar_type)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          checkinId,
          vitals.weightKg || null,
          vitals.bpSystolic || null,
          vitals.bpDiastolic || null,
          vitals.bloodSugar || null,
          vitals.bloodSugarType || null
        ]
      );
    }

    res.status(201).json({
      checkinId,
      riskLevel,
      recommendationSummary
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function listCheckins(req, res) {
  const userId = req.user.id;
  const { profileId, from, to } = req.query;

  try {
    // check profile belongs to user
    const profileRes = await query(
      "SELECT id FROM profiles WHERE id = $1 AND user_id = $2",
      [profileId, userId]
    );
    if (profileRes.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const result = await query(
      `SELECT c.*
       FROM checkins c
       WHERE c.profile_id = $1
         AND c.checkin_date BETWEEN $2 AND $3
       ORDER BY c.checkin_date DESC`,
      [profileId, from, to]
    );

    res.json({ checkins: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}