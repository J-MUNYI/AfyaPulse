import { useAuth } from "../hooks/useAuth.jsx";
import { Link } from "react-router-dom";
import HealthEducation from "../components/HealthEducation.jsx";
import ModernCard from "../components/ModernCard.jsx";
import ModernButton from "../components/ModernButton.jsx";
import { useState } from "react";
import { modernTheme } from "../styles/modernTheme.js";
import { dummyHealthData, getHealthScore, getWeeklyTrend } from "../data/dummyData.js";

export default function Dashboard() {
  const { user } = useAuth();
  const [showEducation, setShowEducation] = useState(false);
  const lastCheckin = useState(() => {
    const stored = localStorage.getItem('lastCheckin');
    return stored ? new Date(stored) : null;
  })[0];

  // Use dummy data for demonstration
  const healthData = dummyHealthData;
  const weeklyTrend = getWeeklyTrend(healthData.recentCheckins);
  const latestCheckin = healthData.recentCheckins[0];
  const healthScore = getHealthScore(latestCheckin);

  const shouldCheckinToday = !lastCheckin || 
    new Date(lastCheckin).toDateString() !== new Date().toDateString();

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: modernTheme.spacing.md,
      fontFamily: modernTheme.typography.fontFamily.sans.join(', '),
      boxSizing: 'border-box',
      margin: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Card */}
      <ModernCard variant="glass" style={{ marginBottom: modernTheme.spacing.lg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}>
            👋
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ 
              fontSize: "1.5rem", 
              marginBottom: "0.25rem", 
              color: 'white',
              fontWeight: '700'
            }}>
              Hello {user?.name || "there"}!
            </h2>
            <p style={{ 
              fontSize: "0.9rem", 
              color: 'rgba(255, 255, 255, 0.8)', 
              marginBottom: "0.5rem" 
            }}>
              Your preventive health companion for better living.
            </p>
          </div>
        </div>
        {shouldCheckinToday && (
          <div style={{
            background: 'rgba(251, 191, 36, 0.2)',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            borderRadius: modernTheme.borderRadius.md,
            padding: '0.75rem',
            fontSize: '0.875rem',
            color: '#fcd34d',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            <span>⏰</span> Don't forget your daily health check-in today!
          </div>
        )}
      </ModernCard>

      {/* Health Metrics Overview */}
      <div style={{ marginBottom: modernTheme.spacing.lg }}>
        <h3 style={{ 
          fontSize: "1.25rem", 
          marginBottom: "1rem", 
          color: 'white',
          fontWeight: '600'
        }}>
          Your Health Overview
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {/* Health Score Card */}
          <ModernCard variant="default" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💚</div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700',
              color: healthScore >= 80 ? modernTheme.colors.success[700] : 
                     healthScore >= 60 ? modernTheme.colors.warning[700] : 
                     modernTheme.colors.danger[700]
            }}>
              {healthScore}%
            </div>
            <div style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>
              Health Score
            </div>
          </ModernCard>

          {/* Weekly Trend Card */}
          <ModernCard variant="default" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
            <div style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700',
              color: weeklyTrend === 'excellent' ? modernTheme.colors.success[700] : 
                     weeklyTrend === 'good' ? modernTheme.colors.primary[700] : 
                     modernTheme.colors.warning[700]
            }}>
              {weeklyTrend === 'excellent' ? 'Excellent' : 
               weeklyTrend === 'good' ? 'Good' : 
               weeklyTrend === 'fair' ? 'Fair' : 'Needs Attention'}
            </div>
            <div style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>
              Weekly Trend
            </div>
          </ModernCard>

          {/* Check-in Streak Card */}
          <ModernCard variant="default" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700',
              color: modernTheme.colors.primary[700]
            }}>
              {healthData.monthlySummary.totalCheckins}
            </div>
            <div style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>
              Total Check-ins
            </div>
          </ModernCard>

          {/* Risk Level Card */}
          <ModernCard variant="default" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
            <div style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700',
              color: healthData.healthTrends.risk.currentLevel === 'low' ? modernTheme.colors.success[700] : 
                     healthData.healthTrends.risk.currentLevel === 'medium' ? modernTheme.colors.warning[700] : 
                     modernTheme.colors.danger[700]
            }}>
              {healthData.healthTrends.risk.currentLevel === 'low' ? 'Low' : 
               healthData.healthTrends.risk.currentLevel === 'medium' ? 'Medium' : 'High'}
            </div>
            <div style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>
              Risk Level
            </div>
          </ModernCard>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ marginBottom: modernTheme.spacing.lg }}>
        <h3 style={{ 
          fontSize: "1.25rem", 
          marginBottom: "1rem", 
          color: 'white',
          fontWeight: '600'
        }}>
          Recent Activity
        </h3>
        
        <ModernCard variant="default" style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ 
              fontSize: '1rem', 
              marginBottom: '0.5rem', 
              color: modernTheme.colors.neutral[800],
              fontWeight: '600'
            }}>
              Last Check-in - {latestCheckin.date}
            </h4>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>Energy:</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(val => (
                  <div key={val} style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: val <= latestCheckin.energy ? modernTheme.colors.success[500] : modernTheme.colors.neutral[300]
                  }} />
                ))}
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>Sleep:</span>
              <span style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[700] }}>
                {latestCheckin.sleepQuality === 'good' ? '😊 Good' : 
                 latestCheckin.sleepQuality === 'ok' ? '😐 Okay' : '😞 Poor'}
              </span>
            </div>
            {latestCheckin.symptoms.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>Symptoms: </span>
                <span style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[700] }}>
                  {latestCheckin.symptoms.join(', ')}
                </span>
              </div>
            )}
          </div>
          <div style={{
            background: latestCheckin.riskLevel === 'green' ? modernTheme.colors.success[50] :
                     latestCheckin.riskLevel === 'amber' ? modernTheme.colors.warning[50] :
                     modernTheme.colors.danger[50],
            padding: '0.75rem',
            borderRadius: modernTheme.borderRadius.md,
            borderLeft: `4px solid ${
              latestCheckin.riskLevel === 'green' ? modernTheme.colors.success[500] :
              latestCheckin.riskLevel === 'amber' ? modernTheme.colors.warning[500] :
              modernTheme.colors.danger[500]
            }`
          }}>
            <p style={{ 
              fontSize: '0.875rem', 
              margin: 0,
              color: latestCheckin.riskLevel === 'green' ? modernTheme.colors.success[700] :
                     latestCheckin.riskLevel === 'amber' ? modernTheme.colors.warning[700] :
                     modernTheme.colors.danger[700]
            }}>
              💡 {latestCheckin.recommendation}
            </p>
          </div>
        </ModernCard>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: modernTheme.spacing.lg }}>
        <h3 style={{ 
          fontSize: "1.25rem", 
          marginBottom: "1rem", 
          color: 'white',
          fontWeight: '600'
        }}>
          Quick Actions
        </h3>
        
        <Link to="/health-log" style={{ textDecoration: 'none' }}>
          <ModernCard 
            variant={shouldCheckinToday ? "success" : "default"}
            style={{ 
              marginBottom: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: shouldCheckinToday ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: shouldCheckinToday 
                  ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                {shouldCheckinToday ? "🔴" : "✅"}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  color: shouldCheckinToday ? modernTheme.colors.success[700] : modernTheme.colors.neutral[700],
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem'
                }}>
                  {shouldCheckinToday ? "Do today's check-in" : "Daily check-in complete"}
                </h4>
                <p style={{ 
                  fontSize: "0.875rem", 
                  color: shouldCheckinToday ? modernTheme.colors.success[600] : modernTheme.colors.neutral[600],
                  margin: 0 
                }}>
                  {shouldCheckinToday 
                    ? "Takes less than 2 minutes - Early detection saves lives!" 
                    : "Great job staying on top of your health!"
                  }
                </p>
              </div>
              <div style={{
                fontSize: '1.25rem',
                color: shouldCheckinToday ? modernTheme.colors.success[600] : modernTheme.colors.neutral[400]
              }}>
                →
              </div>
            </div>
          </ModernCard>
        </Link>

        <Link to="/insights" style={{ textDecoration: 'none' }}>
          <ModernCard variant="default" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                📊
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  color: modernTheme.colors.primary[700],
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem'
                }}>
                  View Health Insights
                </h4>
                <p style={{ 
                  fontSize: "0.875rem", 
                  color: modernTheme.colors.primary[600],
                  margin: 0 
                }}>
                  Track your health trends over time
                </p>
              </div>
              <div style={{
                fontSize: '1.25rem',
                color: modernTheme.colors.primary[400]
              }}>
                →
              </div>
            </div>
          </ModernCard>
        </Link>
      </div>

      {/* Achievements Section */}
      <div style={{ marginBottom: modernTheme.spacing.lg }}>
        <h3 style={{ 
          fontSize: "1.25rem", 
          marginBottom: "1rem", 
          color: 'white',
          fontWeight: '600'
        }}>
          🏆 Your Achievements
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem'
        }}>
          {healthData.achievements.map(achievement => (
            <ModernCard 
              key={achievement.id} 
              variant={achievement.earned ? "success" : "default"}
              style={{ 
                opacity: achievement.earned ? 1 : 0.7,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  fontSize: '2rem',
                  filter: achievement.earned ? 'none' : 'grayscale(100%)'
                }}>
                  {achievement.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: '600',
                    marginBottom: '0.25rem',
                    color: achievement.earned ? modernTheme.colors.success[700] : modernTheme.colors.neutral[700]
                  }}>
                    {achievement.title}
                  </h4>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: modernTheme.colors.neutral[600],
                    margin: 0,
                    lineHeight: '1.3'
                  }}>
                    {achievement.description}
                  </p>
                  {!achievement.earned && achievement.progress && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <div style={{ 
                        fontSize: '0.7rem', 
                        color: modernTheme.colors.neutral[500],
                        marginBottom: '0.25rem'
                      }}>
                        Progress: {achievement.progress}/{achievement.target}
                      </div>
                      <div style={{
                        width: '100%',
                        height: '4px',
                        background: modernTheme.colors.neutral[200],
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(achievement.progress / achievement.target) * 100}%`,
                          height: '100%',
                          background: modernTheme.colors.primary[500],
                          borderRadius: '2px'
                        }} />
                      </div>
                    </div>
                  )}
                  {achievement.earned && (
                    <div style={{ 
                      fontSize: '0.7rem', 
                      color: modernTheme.colors.success[600],
                      marginTop: '0.25rem'
                    }}>
                      ✅ Earned {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Health Education Section */}
      <ModernCard variant="default" style={{ marginBottom: modernTheme.spacing.lg }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h3 style={{ 
            fontSize: "1.25rem", 
            color: modernTheme.colors.neutral[800],
            fontWeight: '600',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📚 Health Education
          </h3>
          <ModernButton 
            variant="ghost" 
            size="sm"
            onClick={() => setShowEducation(!showEducation)}
          >
            {showEducation ? "Hide" : "Show"}
          </ModernButton>
        </div>
        
        {showEducation && (
          <div style={{
            border: `1px solid ${modernTheme.colors.neutral[200]}`,
            borderRadius: modernTheme.borderRadius.md,
            background: modernTheme.colors.neutral[50]
          }}>
            <HealthEducation />
          </div>
        )}
      </ModernCard>

      {/* Health Tips */}
      <ModernCard variant="success">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            flexShrink: 0
          }}>
            💡
          </div>
          <div>
            <h4 style={{ 
              fontSize: "1rem", 
              marginBottom: "0.5rem", 
              color: modernTheme.colors.success[700],
              fontWeight: '600'
            }}>
              Today's Health Tip
            </h4>
            <p style={{ 
              fontSize: "0.875rem", 
              color: modernTheme.colors.success[600], 
              margin: 0,
              lineHeight: '1.5'
            }}>
              Prevention is better than cure. A simple daily check-in can detect health issues early, 
              saving you money and preventing complications. "Health is better than medicine."
            </p>
          </div>
        </div>
      </ModernCard>
    </div>
  );
}