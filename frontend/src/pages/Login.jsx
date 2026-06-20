import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { APP_NAME } from "../config/env";
import useAuth from "../hooks/useAuth";
import { getErrorText } from "../utils/helpers";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorText(err, "Login failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <span className="auth-brand-mark">SL</span>
          <div>
            <h1>{APP_NAME}</h1>
            <p>Sign in to continue.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              autoComplete="email"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              autoComplete="current-password"
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={loading} className="button button-primary">
            {loading ? "Signing in" : "Sign in"}
          </button>
        </form>

        <p className="auth-footer">
          New to SkillLoop? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
