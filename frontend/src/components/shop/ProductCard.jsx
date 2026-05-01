import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatPrice } from "../../utils/formatPrice";
import {
  getDefaultVariant,
  getDiscountPercent,
  getStartingMrp,
  getStartingPrice
} from "../../utils/productUtils";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import StarRating from "../ui/StarRating";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const defaultVariant = getDefaultVariant(product);
  const price = getStartingPrice(product);
  const mrp = getStartingMrp(product);
  const discount = getDiscountPercent(price, mrp);

  return (
    <article className="product-card">
      <div
        className="product-visual"
        style={{
          "--product-bg": product.cardBgColor,
          "--product-text": product.cardTextColor
        }}
      >
        <button
          type="button"
          className={`wishlist-toggle ${
            isWishlisted(product.id) ? "active" : ""
          }`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
        >
          Save
        </button>
        <div className="badge-row">
          {product.badges.slice(0, 2).map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>
        <div className="product-canister">
          <span>{product.brand}</span>
          <strong>{product.visualLabel}</strong>
        </div>
      </div>

      <div className="product-card-body">
        <div className="product-card-head">
          <span className="product-brand">{product.brand}</span>
          <span className="product-discount">{discount}% off</span>
        </div>
        <Link to={`/shop/${product.id}`} className="product-title">
          {product.name}
        </Link>
        <StarRating
          rating={product.rating.average}
          count={product.rating.count}
          compact
        />
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <strong>{formatPrice(price)}</strong>
          <span>{formatPrice(mrp)}</span>
        </div>
        <div className="product-card-actions">
          <Button onClick={() => addItem(product.id, 0)}>Add to cart</Button>
          <Link to={`/shop/${product.id}`} className="button button-secondary">
            View
          </Link>
        </div>
        <small className="product-variant-note">
          Starts with {defaultVariant.flavour} / {defaultVariant.size}
        </small>
      </div>
    </article>
  );
}
