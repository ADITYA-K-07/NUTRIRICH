import { authenticPoints } from "../../data/siteContent";

export default function AuthenticSection() {
  return (
    <section className="section shell">
      <div className="authentic-grid">
        <div>
          <span className="section-kicker">Why NUTRIRICH</span>
          <h2>Retail that feels informed, not noisy</h2>
          <p className="section-copy">
            The experience is built around trusted brands, clear pricing, and a
            team that understands both supplementation and day-to-day gym
            questions.
          </p>
          <div className="authentic-quote">
            <strong>Built like a modern fitness platform.</strong>
            <p>
              Darker visual surfaces, fewer distractions, clearer hierarchy, and
              a faster path from discovery to checkout.
            </p>
          </div>
        </div>

        <div className="authentic-list">
          {authenticPoints.map((point, index) => (
            <article key={point} className="authentic-item">
              <span>0{index + 1}</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
