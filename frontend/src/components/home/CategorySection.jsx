import { Link } from "react-router-dom";
import { categories } from "../../data/siteContent";

export default function CategorySection() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Storefront</span>
          <h2>Shop by category</h2>
        </div>
        <Link to="/shop" className="text-link">
          View all
        </Link>
      </div>

      <div className="category-grid">
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            to={`/shop?category=${category.slug}`}
            className="category-card"
          >
            <span className="category-index">0{index + 1}</span>
            <span className="category-token">{category.shortLabel}</span>
            <h3>{category.label}</h3>
            <p>{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
