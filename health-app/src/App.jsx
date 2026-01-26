import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import HealthLog from "./pages/HealthLog.jsx";
import Insights from "./pages/Insights.jsx";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route
          path="/*"
          element={
            user ? (
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/health-log" element={<HealthLog />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
