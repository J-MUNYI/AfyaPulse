import { useState } from "react";
import ModernCard from "../components/ModernCard.jsx";
import ModernButton from "../components/ModernButton.jsx";
import { modernTheme } from "../styles/modernTheme.js";
import { dummyHealthData, getHealthScore } from "../data/dummyData.js";

export default function Insights() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  
  // Use dummy data for demonstration
  const healthData = dummyHealthData;
  const checkins = healthData.recentCheckins;
  
  // Calculate statistics
  const averageEnergy = (checkins.reduce((sum, c) => sum + c.energy, 0) / checkins.length).toFixed(1);
  const goodSleepDays = checkins.filter(c => c.sleepQuality === 'good').length;
  const highRiskDays = checkins.filter(c => c.riskLevel === 'red').length;

  const renderOverview = () => (
    <div>
      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <ModernCard variant="default" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: modernTheme.colors.primary[700] }}>
            {checkins.length}
          </div>
          <div style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>Total Check-ins</div>
        </ModernCard>
        
        <ModernCard variant="success" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: modernTheme.colors.success[700] }}>
            {averageEnergy}
          </div>
          <div style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>Average Energy</div>
        </ModernCard>
        
        <ModernCard variant="default" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>😴</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: modernTheme.colors.primary[700] }}>
            {goodSleepDays}/7
          </div>
          <div style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>Good Sleep Days</div>
        </ModernCard>
        
        <ModernCard variant={highRiskDays > 0 ? "danger" : "success"} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚨</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: highRiskDays > 0 ? modernTheme.colors.danger[700] : modernTheme.colors.success[700] }}>
            {highRiskDays}
          </div>
          <div style={{ fontSize: '0.875rem', color: modernTheme.colors.neutral[600] }}>High Risk Days</div>
        </ModernCard>
      </div>
      
      {/* Weekly Trend Chart */}
      <ModernCard variant="default" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: modernTheme.colors.neutral[800] }}>
          📈 Weekly Health Trend
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '150px', marginBottom: '1rem' }}>
          {checkins.map((checkin, index) => {
            const score = getHealthScore(checkin);
            const height = (score / 100) * 120;
            return (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '20px',
                  height: `${height}px`,
                  background: score >= 80 ? modernTheme.colors.success[500] : 
                             score >= 60 ? modernTheme.colors.warning[500] : 
                             modernTheme.colors.danger[500],
                  borderRadius: '4px 4px 0 0',
                  marginBottom: '0.25rem'
                }} />
                <div style={{ fontSize: '0.7rem', color: modernTheme.colors.neutral[600] }}>
                  {new Date(checkin.date).getDate()}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{ width: '12px', height: '12px', background: modernTheme.colors.success[500], borderRadius: '2px' }} />
            <span>Good (80+)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{ width: '12px', height: '12px', background: modernTheme.colors.warning[500], borderRadius: '2px' }} />
            <span>Fair (60-79)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{ width: '12px', height: '12px', background: modernTheme.colors.danger[500], borderRadius: '2px' }} />
            <span>Poor (&lt;60)</span>
          </div>
        </div>
      </ModernCard>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: modernTheme.spacing.md,
      fontFamily: modernTheme.typography.fontFamily.sans.join(', '),
      boxSizing: 'border-box',
      margin: 0,
      color: 'white'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          📊 Health Insights
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
          Track your health trends and patterns over time.
        </p>
      </div>
      
      {/* Period Selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {['week', 'month'].map(period => (
            <ModernButton
              key={period}
              variant={selectedPeriod === period ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period === 'week' ? 'Last 7 Days' : 'Last Month'}
            </ModernButton>
          ))}
        </div>
        
        {/* Metric Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['overview', 'energy', 'sleep'].map(metric => (
            <ModernButton
              key={metric}
              variant={selectedMetric === metric ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedMetric(metric)}
            >
              {metric === 'overview' ? '📊 Overview' : metric === 'energy' ? '⚡ Energy' : '😴 Sleep'}
            </ModernButton>
          ))}
        </div>
      </div>
      
      {/* Content based on selected metric */}
      {selectedMetric === 'overview' && renderOverview()}
      {selectedMetric === 'energy' && (
        <ModernCard variant="default">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: modernTheme.colors.neutral[800] }}>
            ⚡ Energy Analysis
          </h3>
          <p style={{ fontSize: '0.9rem', color: modernTheme.colors.neutral[600] }}>
            Average energy level: {averageEnergy}/5.0
          </p>
        </ModernCard>
      )}
      {selectedMetric === 'sleep' && (
        <ModernCard variant="default">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: modernTheme.colors.neutral[800] }}>
            😴 Sleep Analysis
          </h3>
          <p style={{ fontSize: '0.9rem', color: modernTheme.colors.neutral[600] }}>
            Good sleep nights: {goodSleepDays}/7
          </p>
        </ModernCard>
      )}
    </div>
  );
}