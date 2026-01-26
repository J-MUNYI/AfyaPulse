import { modernTheme } from '../styles/modernTheme.js';

export default function ModernButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  fullWidth = false,
  icon,
  onClick,
  className = '',
  style = {}
}) {
  const baseStyle = {
    borderRadius: modernTheme.borderRadius.md,
    fontWeight: '600',
    transition: 'all 0.2s ease',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: modernTheme.spacing.sm,
    fontSize: '0.875rem',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: modernTheme.typography.fontFamily.sans.join(', ')
  };

  const sizes = {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: '0.75rem'
    },
    md: {
      padding: '0.625rem 1.25rem',
      fontSize: '0.875rem'
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem'
    }
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      boxShadow: modernTheme.shadows.md,
      '&:hover:not(:disabled)': {
        transform: 'translateY(-2px)',
        boxShadow: modernTheme.shadows.lg
      }
    },
    secondary: {
      background: modernTheme.colors.neutral[100],
      color: modernTheme.colors.neutral[700],
      border: `1px solid ${modernTheme.colors.neutral[300]}`,
      '&:hover:not(:disabled)': {
        background: modernTheme.colors.neutral[200]
      }
    },
    danger: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      '&:hover:not(:disabled)': {
        transform: 'translateY(-2px)',
        boxShadow: modernTheme.shadows.lg
      }
    },
    success: {
      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      color: 'white',
      '&:hover:not(:disabled)': {
        transform: 'translateY(-2px)',
        boxShadow: modernTheme.shadows.lg
      }
    },
    ghost: {
      background: 'transparent',
      color: modernTheme.colors.neutral[700],
      '&:hover:not(:disabled)': {
        background: modernTheme.colors.neutral[100]
      }
    }
  };

  const buttonStyle = {
    ...baseStyle,
    ...sizes[size],
    ...variants[variant],
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || loading ? 0.6 : 1,
    ...style
  };

  return (
    <button
      className={className}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid transparent',
          borderTop: '2px solid currentColor',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
      {!loading && icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
