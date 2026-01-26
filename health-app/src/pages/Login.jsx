import { useState } from "react";
import FormInput from "../components/FormInput.jsx";
import ModernButton from "../components/ModernButton.jsx";
import ModernCard from "../components/ModernCard.jsx";
import { apiRequest } from "../api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { modernTheme } from "../styles/modernTheme.js";

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login, setLoading, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const body = isLogin ? 
        { emailOrPhone, password } : 
        { emailOrPhone, password, name };
      
      const data = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(body)
      });
      
      login({ user: data.user, token: data.token });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: modernTheme.spacing.md,
      fontFamily: modernTheme.typography.fontFamily.sans.join(', ')
    }}>
      <ModernCard 
        variant="glass" 
        style={{ 
          width: '100%', 
          maxWidth: '400px',
          animation: 'fadeInUp 0.6s ease-out'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: modernTheme.spacing.lg }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.5rem'
          }}>
            🌿
          </div>
          <h1 style={{ 
            fontSize: "1.75rem", 
            marginBottom: "0.5rem", 
            color: 'white',
            fontWeight: '700'
          }}>
            {isLogin ? "Welcome Back" : "Join AfyaPulse"}
          </h1>
          <p style={{ 
            fontSize: "0.9rem", 
            color: 'rgba(255, 255, 255, 0.8)', 
            marginBottom: "1.5rem",
            lineHeight: '1.5'
          }}>
            {isLogin 
              ? "Take control of your health every day."
              : "Start your preventive healthcare journey today."
            }
          </p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: modernTheme.borderRadius.md,
            padding: '0.75rem',
            marginBottom: '1rem',
            color: '#fca5a5',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: 'rgba(255, 255, 255, 0.9)',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: modernTheme.borderRadius.md,
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: 'rgba(255, 255, 255, 0.9)',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Phone or Email
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder={isLogin ? "Enter phone or email" : "Phone or email for account"}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: modernTheme.borderRadius.md,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: 'rgba(255, 255, 255, 0.9)',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? "Enter password" : "Create password (min 6 chars)"}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: modernTheme.borderRadius.md,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
            />
          </div>

          <ModernButton 
            variant="primary" 
            size="lg" 
            fullWidth 
            loading={loading}
            type="submit"
            style={{ marginBottom: '1rem' }}
          >
            {loading 
              ? (isLogin ? "Signing in..." : "Creating account...")
              : (isLogin ? "Sign In" : "Create Account")
            }
          </ModernButton>
        </form>

        <div style={{ 
          textAlign: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textDecoration: 'underline',
              transition: 'all 0.2s ease'
            }}
          >
            {isLogin 
              ? "Don't have an account? Create one"
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </ModernCard>
    </div>
  );
}