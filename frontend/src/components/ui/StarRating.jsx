export default function StarRating({ rating, count, compact = false }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const filled = index < Math.round(rating);
    return (
      <span key={index} className={filled ? "star filled" : "star"}>
        {filled ? "★" : "☆"}
      </span>
    );
  });

  return (
    <div className={`star-rating ${compact ? "compact" : ""}`}>
      <span className="stars">{stars}</span>
      <span className="rating-copy">
        {rating.toFixed(1)}
        {count ? ` (${count})` : ""}
      </span>
    </div>
  );
}
