import { Link } from "react-router-dom";
import { goalCards } from "../../data/siteContent";

export default function GoalsSection() {
  return (
    <section className="section shell" id="goals">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Find your stack</span>
          <h2>Shop by goal</h2>
        </div>
      </div>

      <div className="goal-grid">
        {goalCards.map((goal, index) => (
          <article
            key={goal.id}
            className="goal-card"
            style={{ "--goal-surface": goal.surface }}
          >
            <span className="goal-card-index">0{index + 1}</span>
            <small className="goal-card-label">Popular path</small>
            <h3>{goal.title}</h3>
            <p>{goal.copy}</p>
            <Link to={`/shop?goal=${goal.id}`} className="button button-light">
              Explore
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
