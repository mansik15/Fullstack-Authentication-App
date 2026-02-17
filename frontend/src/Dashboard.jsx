import { useEffect, useState } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/profile");
      setUser(res.data);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* Navbar */}
      <div className="navbar">
        <h2>Authentication App</h2>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="dashboard-content">

        <h1>Welcome 👋</h1>

        {user && (
          <div className="user-card">
            <h3>User Information</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user._id}</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;
