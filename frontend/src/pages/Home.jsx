import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiFileText,
  FiLock,
  FiMic,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { APP_NAME, BACKEND_URL } from "../config/env";
import useAuth from "../hooks/useAuth";

const featureCards = [
  {
    icon: FiBookOpen,
    title: "Study guides",
    description: "Generate topic-based question and answer sets with adjustable difficulty.",
  },
  {
    icon: FiFileText,
    title: "PDF learning",
    description: "Upload documents, extract content, and turn your notes into question banks.",
  },
  {
    icon: FiMic,
    title: "Mock viva",
    description: "Practice interview-style questions and get instant AI scoring and feedback.",
  },
  {
    icon: FiBarChart2,
    title: "Analytics",
    description: "Track session totals, scores, and learning momentum from one dashboard.",
  },
];

const requirementSteps = [
  "Register or sign in with your SkillLoop account.",
  "Generate a study guide or upload a PDF to create learning material.",
  "Start a mock viva session and submit answers for AI evaluation.",
  "Review history and analytics to monitor performance over time.",
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">AI-Powered Learning Platform</p>
          <h1>{APP_NAME}</h1>
          <p className="hero-text">
            Study smarter with guided revision, PDF-based practice, AI viva evaluation, and a
            single workspace that mirrors the documented backend capabilities.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to={isAuthenticated ? "/dashboard" : "/register"}>
              {isAuthenticated ? "Open dashboard" : "Create account"}
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link className="button button-secondary" to={isAuthenticated ? "/study-guide" : "/login"}>
              {isAuthenticated ? "Start learning" : "Sign in"}
            </Link>
          </div>
          <div className="hero-badges">
            <span>
              <FiLock aria-hidden="true" />
              JWT-secured access
            </span>
            <span>
              <FiCheckCircle aria-hidden="true" />
              React + Vite frontend
            </span>
            <span>
              <FiCheckCircle aria-hidden="true" />
              Connected to {BACKEND_URL}
            </span>
          </div>
        </div>

        <article className="hero-panel">
          <div className="panel-header">
            <div>
              <h2>What this frontend covers</h2>
              <p>The core product flow defined by the current project requirements.</p>
            </div>
          </div>
          <div className="timeline-list">
            {requirementSteps.map((step, index) => (
              <div className="timeline-item" key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <p className="eyebrow">Core Modules</p>
          <h2>Everything the backend already supports</h2>
          <p>Each module is wired to the Spring Boot APIs documented in the repository.</p>
        </div>
        <div className="feature-grid">
          {featureCards.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="feature-card" key={feature.title}>
                <Icon aria-hidden="true" />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-section home-cta">
        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>Ready to use SkillLoop?</h2>
              <p>Move from topic generation to viva evaluation without leaving the app.</p>
            </div>
          </div>
          <div className="action-row">
            <Link className="button button-primary" to={isAuthenticated ? "/dashboard" : "/register"}>
              {isAuthenticated ? "Go to dashboard" : "Get started"}
            </Link>
            <Link className="button button-secondary" to="/login">
              Existing user login
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Home;
