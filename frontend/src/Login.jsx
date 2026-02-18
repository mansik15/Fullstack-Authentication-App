import { useState } from "react";
import axios from "./axiosConfig";
import "./Auth.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/login", {
        email,
        password,
      });

      toast.success("Login successful!");
      console.log(res.data);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      //localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
  if (err.response?.data?.errors) {
    const errorMessages = err.response.data.errors
      .map(e => e.msg)
      .join(", ");

    toast.error(errorMessages);
  } else {
    toast.error(err.response?.data?.message || "Signup failed");
  }
} finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin} noValidate>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="switch-text">
          New user? <Link to="/signup">Create an account</Link>
        </p>

      </form>
    </div>
  );
}

export default Login;
