import { Link } from "react-router-dom";

export default function GymTeaser() {
  return (
    <section className="gym-teaser">
      <div className="shell gym-teaser-grid">
        <div>
          <span className="section-kicker section-kicker-light">
            Fitness Fort
          </span>
          <h2>Training and supplementation under one roof</h2>
          <p>
            Fitness Fort is the gym arm of the NUTRIRICH brand, serving the
            Bibvewadi fitness community with strength, conditioning, and guided
            support.
          </p>
          <div className="gym-teaser-actions">
            <Link to="/gym" className="button button-light">
              Visit gym page
            </Link>
            <Link to="/contact" className="button button-ghost-light">
              Ask about membership
            </Link>
          </div>
        </div>

        <div className="gym-panel">
          <span>Bibvewadi, Pune</span>
          <strong>4.6 average rating</strong>
          <p>Open till 10 PM with dedicated women&apos;s and functional zones.</p>
          <div className="gym-panel-metrics">
            <div>
              <strong>5+</strong>
              <span>Years local presence</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Experiences in one brand</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
