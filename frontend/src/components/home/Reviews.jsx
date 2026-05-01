import { reviews } from "../../data/siteContent";
import StarRating from "../ui/StarRating";

export default function Reviews() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Customer voice</span>
          <h2>Reviews from the community</h2>
        </div>
      </div>

      <div className="review-grid">
        {reviews.map((review, index) => (
          <article key={`${review.name}-${review.city}`} className="review-card">
            <span className="review-index">0{index + 1}</span>
            <StarRating rating={review.rating} compact />
            <p>{review.text}</p>
            <strong>{review.name}</strong>
            <span>{review.city}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
