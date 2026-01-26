// Dummy data for health metrics and insights

export const dummyHealthData = {
  user: {
    name: "John Doe",
    id: 1,
    joinDate: "2024-01-15"
  },
  
  // Last 7 days of check-ins
  recentCheckins: [
    {
      date: "2024-01-24",
      energy: 4,
      sleepQuality: "good",
      appetite: "normal",
      symptoms: ["headache"],
      riskLevel: "green",
      recommendation: "Mild headache detected. Stay hydrated and rest."
    },
    {
      date: "2024-01-23",
      energy: 3,
      sleepQuality: "ok",
      appetite: "normal",
      symptoms: [],
      riskLevel: "green",
      recommendation: "All health indicators look good today!"
    },
    {
      date: "2024-01-22",
      energy: 2,
      sleepQuality: "bad",
      appetite: "low",
      symptoms: ["fatigue", "dizziness"],
      riskLevel: "amber",
      recommendation: "Low energy and poor sleep detected. Consider rest and check stress levels."
    },
    {
      date: "2024-01-21",
      energy: 4,
      sleepQuality: "good",
      appetite: "normal",
      symptoms: [],
      riskLevel: "green",
      recommendation: "Great health metrics today! Keep up the good work."
    },
    {
      date: "2024-01-20",
      energy: 3,
      sleepQuality: "ok",
      appetite: "normal",
      symptoms: ["cough"],
      riskLevel: "green",
      recommendation: "Mild cough present. Monitor for persistence."
    },
    {
      date: "2024-01-19",
      energy: 5,
      sleepQuality: "good",
      appetite: "high",
      symptoms: [],
      riskLevel: "green",
      recommendation: "Excellent energy levels and appetite today!"
    },
    {
      date: "2024-01-18",
      energy: 3,
      sleepQuality: "ok",
      appetite: "normal",
      symptoms: [],
      riskLevel: "green",
      recommendation: "Stable health indicators. Continue current routine."
    }
  ],

  // Health trends and insights
  healthTrends: {
    energy: {
      average: 3.4,
      trend: "stable",
      bestDay: "2024-01-19",
      worstDay: "2024-01-22"
    },
    sleep: {
      averageQuality: "ok",
      goodNights: 3,
      badNights: 1,
      trend: "improving"
    },
    symptoms: {
      mostCommon: "headache",
      totalOccurrences: 3,
      criticalSymptoms: 0,
      trend: "decreasing"
    },
    risk: {
      currentLevel: "low",
      weeklyAverage: "low",
      improvement: true
    }
  },

  // Monthly summary
  monthlySummary: {
    totalCheckins: 24,
    averageEnergy: 3.6,
    goodSleepDays: 18,
    symptomDays: 8,
    riskLevelDistribution: {
      green: 20,
      amber: 4,
      red: 0
    }
  },

  // Achievements and milestones
  achievements: [
    {
      id: 1,
      title: "Week Warrior",
      description: "7-day check-in streak",
      icon: "🔥",
      earned: true,
      date: "2024-01-24"
    },
    {
      id: 2,
      title: "Health Hero",
      description: "Low risk level for 2 weeks",
      icon: "🦸",
      earned: true,
      date: "2024-01-23"
    },
    {
      id: 3,
      title: "Sleep Champion",
      description: "7 good nights of sleep",
      icon: "😴",
      earned: false,
      progress: 5,
      target: 7
    },
    {
      id: 4,
      title: "Energy Master",
      description: "Average energy > 4 for a week",
      icon: "⚡",
      earned: false,
      progress: 3,
      target: 7
    }
  ],

  // Health recommendations
  recommendations: [
    {
      type: "positive",
      title: "Great Progress!",
      message: "Your energy levels have been consistently good this week.",
      priority: "low"
    },
    {
      type: "warning",
      title: "Sleep Focus",
      message: "Consider improving sleep hygiene for better energy levels.",
      priority: "medium"
    },
    {
      type: "info",
      title: "Stay Hydrated",
      message: "Drinking more water may help reduce headache frequency.",
      priority: "low"
    }
  ],

  // Vitals tracking
  vitals: {
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
      lastMeasured: "2024-01-24",
      status: "normal"
    },
    weight: {
      current: 72.5,
      unit: "kg",
      change: -0.5,
      period: "1 week",
      status: "stable"
    },
    bloodSugar: {
      fasting: 95,
      lastMeasured: "2024-01-23",
      status: "normal"
    }
  }
};

// Helper functions for data processing
export const getHealthScore = (checkin) => {
  let score = 50; // Base score
  
  // Energy contribution (0-25 points)
  score += (checkin.energy - 1) * 6.25;
  
  // Sleep contribution (0-15 points)
  if (checkin.sleepQuality === "good") score += 15;
  else if (checkin.sleepQuality === "ok") score += 10;
  else score += 5;
  
  // Appetite contribution (0-10 points)
  if (checkin.appetite === "normal") score += 10;
  else if (checkin.appetite === "high") score += 8;
  else score += 5;
  
  // Symptoms penalty (0-25 points)
  const symptomCount = checkin.symptoms.length;
  score -= symptomCount * 5;
  
  return Math.max(0, Math.min(100, score));
};

export const getWeeklyTrend = (data) => {
  const scores = data.map(checkin => getHealthScore(checkin));
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  if (avgScore >= 80) return "excellent";
  if (avgScore >= 60) return "good";
  if (avgScore >= 40) return "fair";
  return "needs_attention";
};
