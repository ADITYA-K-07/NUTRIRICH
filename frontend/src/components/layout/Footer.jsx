import { Link } from "react-router-dom";
import { brands, contactDetails } from "../../data/siteContent";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-cta">
        <div>
          <span className="section-kicker section-kicker-light">NUTRIRICH</span>
          <h2>One sharper storefront for supplements and fitness.</h2>
        </div>
        <div className="footer-cta-actions">
          <Link to="/shop" className="button button-light">
            Browse store
          </Link>
          <Link to="/gym" className="button button-ghost-light">
            Visit Fitness Fort
          </Link>
        </div>
      </div>
      <div className="shell footer-grid">
        <div>
          <div className="brand-lockup footer-brand">
            <span className="brand-mark">NR</span>
            <span>
              <strong>NUTRIRICH</strong>
              <small>Supplements, stacks, and fitness support</small>
            </span>
          </div>
          <p className="footer-copy">
            Performance nutrition storefront for serious training, backed by
            Fitness Fort gym in Bibvewadi, Pune.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul className="footer-links">
            <li>
              <Link to="/shop">Shop supplements</Link>
            </li>
            <li>
              <Link to="/gym">Fitness Fort gym</Link>
            </li>
            <li>
              <Link to="/bulk-orders">Bulk orders</Link>
            </li>
            <li>
              <Link to="/contact">Contact team</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Brands</h3>
          <p className="footer-copy">{brands.join("  /  ")}</p>
        </div>

        <div>
          <h3>Reach us</h3>
          <ul className="footer-links">
            <li>{contactDetails.address}</li>
            <li>{contactDetails.phone}</li>
            <li>{contactDetails.email}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
