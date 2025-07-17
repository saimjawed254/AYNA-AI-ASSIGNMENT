import { useAuth } from "../context/AuthContext";

export default function Sidebar({ email, totalForms }) {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
      </div>
      <div className="admin-info">
        <div className="admin-info-heading">Admin Info</div>
        <div className="admin-info-email">{email}</div>
      </div>

      <div className="sidebar-logout">
        <div className="sidebar-logout-button">
          <div className="sidebar-logout-heading">Click here to Logout
          <span className="sidebar-logout-text"> <br />Session expiry is 1 day</span>
          </div>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>

      </div>

    </div>
  );
}
