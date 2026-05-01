import { trustBadges } from "../../data/siteContent";

export default function TrustBadges() {
  return (
    <section className="trust-strip shell">
      <div className="trust-strip-head">
        <div>
          <span className="section-kicker">Why it feels premium</span>
          <h2>Minimal where it should be. Clear where it matters.</h2>
        </div>
      </div>
      <div className="trust-grid">
        {trustBadges.map((badge) => (
          <article key={badge.title} className="trust-card">
            <span className="trust-icon">{badge.title.slice(0, 2)}</span>
            <div>
              <h3>{badge.title}</h3>
              <p>{badge.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
