import Navbar from "./Navbar.jsx";
import BottomNav from "./BottomNav.jsx";

export default function Layout({ children }) {
  return (
    <div className="app-container responsive-container">
      <Navbar />
      <main className="main-content" style={{ flex: 1, overflow: 'auto' }}>{children}</main>
      <BottomNav />
    </div>
  );
}