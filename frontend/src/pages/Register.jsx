import { useState } from "react";
import { Link } from "react-router-dom";

import { APP_NAME } from "../config/env";
import useAuth from "../hooks/useAuth";
import { getErrorText } from "../utils/helpers";

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [createdUser, setCreatedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setCreatedUser(null);

    try {
      const response = await register(formData);
      setCreatedUser(response);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(getErrorText(err, "Registration failed."));
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
            <p>Create your account.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              name="name"
              value={formData.name}
              autoComplete="name"
              onChange={handleChange}
              required
            />
          </label>

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
              autoComplete="new-password"
              minLength={8}
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}
          {createdUser && (
            <p className="form-success">
              Account created for {createdUser.email || createdUser.name}.
            </p>
          )}

          <button type="submit" disabled={loading} className="button button-primary">
            {loading ? "Creating account" : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
