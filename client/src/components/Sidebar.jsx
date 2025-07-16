import { useAuth } from "../context/AuthContext";

export default function Sidebar({ email, totalForms }) {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="admin-info">
        <h4>Admin Info</h4>
        <p>{email}</p>
        <p>Total Forms: {totalForms}</p>
      </div>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
