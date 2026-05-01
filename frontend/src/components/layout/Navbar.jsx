import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  contactDetails,
  experienceTabs,
  fitnessNavLinks,
  navLinks,
  gymMembershipPlans,
  storeNavLinks
} from "../../data/siteContent";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const isFitnessExperience = location.pathname.startsWith("/gym");

  function submitSearch(event) {
    event.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(search)}`);
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="shell navbar-top">
        <Link to="/" className="brand-lockup" aria-label="NUTRIRICH home">
          <span className="brand-mark">NR</span>
          <span>
            <strong>NUTRIRICH</strong>
            <small>Store and Fitness Fort ecosystem</small>
          </span>
        </Link>

        <div className="experience-switch" aria-label="Primary experience switch">
          {experienceTabs.map((tab) => {
            const isActive =
              tab.to === "/gym"
                ? location.pathname.startsWith("/gym")
                : location.pathname === "/shop" ||
                  location.pathname.startsWith("/shop") ||
                  location.pathname.startsWith("/cart") ||
                  location.pathname.startsWith("/checkout");

            return (
              <Link
                key={tab.label}
                to={tab.to}
                className={isActive ? "experience-tab active" : "experience-tab"}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-actions">
          <span className="location-pill">Pune</span>
          <a className="nav-pill" href={`tel:${contactDetails.phone}`}>
            Get help
          </a>
          <Link to="/shop" className="nav-pill">
            Saved {wishlist.length}
          </Link>
          <Link to="/cart" className="nav-pill nav-pill-primary">
            Cart {itemCount}
          </Link>
          <button
            type="button"
            className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        {isFitnessExperience ? (
          <div className="shell navbar-links-inner fitness-navbar-links">
            <nav className="nav-link-row fitness-nav-link-row">
              {fitnessNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.to}
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="membership-teaser">
              <div className="membership-teaser-head">
                <span className="section-kicker">Gym membership</span>
                <a href="/gym#membership" className="membership-teaser-link">
                  View all
                </a>
              </div>
              <div className="membership-teaser-list">
                {gymMembershipPlans.slice(0, 3).map((plan) => (
                  <div key={plan.label} className="membership-teaser-item">
                    <span>{plan.label}</span>
                    <strong>{plan.price}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="shell navbar-links-inner">
            <form className="search-form" onSubmit={submitSearch}>
              <label className="search-label" htmlFor="site-search">
                Search
              </label>
              <input
                id="site-search"
                type="search"
                placeholder="Search whey, creatine, pre-workout"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            <nav className="nav-link-row">
              {storeNavLinks.map((link) =>
                link.to.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.to}
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
