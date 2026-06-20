import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found-page">
      <section className="content-panel">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you requested is not available.</p>
        <Link to="/dashboard" className="button button-primary">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
