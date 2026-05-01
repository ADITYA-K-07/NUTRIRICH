import { Link } from "react-router-dom";
import products from "../../data/products.json";
import ProductCard from "../shop/ProductCard";

export default function BestSellers() {
  const featured = [...products]
    .sort((left, right) => {
      const leftScore = left.rating.average * left.rating.count;
      const rightScore = right.rating.average * right.rating.count;
      return rightScore - leftScore;
    })
    .slice(0, 4);

  return (
    <section className="section section-alt">
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Most picked</span>
            <h2>Best sellers</h2>
          </div>
          <Link to="/shop" className="text-link">
            View all
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
