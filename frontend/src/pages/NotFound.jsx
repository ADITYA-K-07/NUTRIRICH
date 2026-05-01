import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-shell shell empty-state">
      <span className="section-kicker">404</span>
      <h1>Page not found</h1>
      <p>The route exists outside the current storefront build.</p>
      <Link to="/" className="button button-primary">
        Back home
      </Link>
    </section>
  );
}
