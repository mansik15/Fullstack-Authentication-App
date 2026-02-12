import { useState } from "react";
import axios from "./axiosConfig";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/signup", {
        name,
        email,
        password,
      });

      toast.success("Signup Success!");
      console.log(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message ||"Signup Failed.");
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Signup"}
        </button>

      <p className="switch-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>

      </form>
    </div>
  );
}

export default Signup;
