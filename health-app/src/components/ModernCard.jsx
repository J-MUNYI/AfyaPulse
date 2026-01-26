import { modernTheme } from '../styles/modernTheme.js';

export default function ModernCard({ children, className = '', style = {}, variant = 'default' }) {
  const baseStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: modernTheme.borderRadius.lg,
    boxShadow: modernTheme.shadows.lg,
    padding: modernTheme.spacing.lg,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const variants = {
    default: baseStyle,
    glass: {
      ...baseStyle,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'white'
    },
    gradient: {
      ...baseStyle,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none'
    },
    success: {
      ...baseStyle,
      background: modernTheme.colors.success[50],
      borderColor: modernTheme.colors.success[200]
    },
    warning: {
      ...baseStyle,
      background: modernTheme.colors.warning[50],
      borderColor: modernTheme.colors.warning[200]
    },
    danger: {
      ...baseStyle,
      background: modernTheme.colors.danger[50],
      borderColor: modernTheme.colors.danger[200]
    }
  };

  return (
    <div 
      className={className}
      style={{ ...variants[variant], ...style }}
    >
      {children}
    </div>
  );
}
