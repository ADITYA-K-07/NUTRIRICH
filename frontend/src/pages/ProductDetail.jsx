import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ProductGrid from "../components/shop/ProductGrid";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import StarRating from "../components/ui/StarRating";
import AssetImage from "../components/ui/AssetImage";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import products from "../data/products.json";
import { formatPrice } from "../utils/formatPrice";
import { getDiscountPercent } from "../utils/productUtils";

export default function ProductDetail() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [variantIndex, setVariantIndex] = useState(0);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <section className="page-shell shell not-found-block">
        <h1>Product not found</h1>
        <p>The requested item is not available in the current product list.</p>
        <Link to="/shop" className="button button-primary">
          Back to shop
        </Link>
      </section>
    );
  }

  const variant = product.variants[variantIndex];
  const discount = getDiscountPercent(variant.price, variant.mrp);
  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  return (
    <section className="page-shell shell">
      <div className="product-detail-layout">
        <div
          className="product-detail-visual"
          style={{
            "--product-bg": product.cardBgColor,
            "--product-text": product.cardTextColor
          }}
        >
          <div className="badge-row">
            {product.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
          <div className="product-detail-media-shell">
            <AssetImage
              src={product.images?.[variantIndex] || product.images?.[0]}
              alt={product.name}
              className="product-detail-image"
              fallback={
                <div className="product-detail-canister">
                  <span>{product.brand}</span>
                  <strong>{product.visualLabel}</strong>
                </div>
              }
            />
            <div className="product-detail-image-badge">
              <span>{product.brand}</span>
              <strong>{product.visualLabel}</strong>
            </div>
          </div>
          <button
            type="button"
            className={`wishlist-toggle large ${
              isWishlisted(product.id) ? "active" : ""
            }`}
            onClick={() => toggleWishlist(product.id)}
          >
            {isWishlisted(product.id) ? "Saved" : "Save product"}
          </button>
        </div>

        <div className="product-detail-copy">
          <span className="section-kicker">{product.brand}</span>
          <h1>{product.name}</h1>
          <StarRating
            rating={product.rating.average}
            count={product.rating.count}
          />
          <p className="section-copy">{product.description}</p>

          <div className="product-price product-price-large">
            <strong>{formatPrice(variant.price)}</strong>
            <span>{formatPrice(variant.mrp)}</span>
            <em>{discount}% off</em>
          </div>

          <div className="variant-grid">
            {product.variants.map((item, index) => (
              <button
                key={`${item.flavour}-${item.size}`}
                type="button"
                className={`variant-card ${index === variantIndex ? "active" : ""}`}
                onClick={() => setVariantIndex(index)}
              >
                <strong>{item.flavour}</strong>
                <span>{item.size}</span>
                <small>{formatPrice(item.price)}</small>
              </button>
            ))}
          </div>

          <div className="highlight-list">
            {product.highlights.map((highlight) => (
              <div key={highlight} className="highlight-item">
                {highlight}
              </div>
            ))}
          </div>

          <div className="detail-actions">
            <Button onClick={() => addItem(product.id, variantIndex)}>
              Add to cart
            </Button>
            <Link to="/checkout" className="button button-secondary">
              Buy now
            </Link>
          </div>
        </div>
      </div>

      <div className="info-grid">
        <article className="info-card">
          <h2>Nutrition facts</h2>
          <div className="nutrition-grid">
            {Object.entries(product.nutritionFacts).map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="info-card">
          <h2>Why people pick it</h2>
          <p className="section-copy">
            This product is positioned for{" "}
            {product.goal.join(", ").split("-").join(" ")} and
            fits well in beginner-to-intermediate supplement routines.
          </p>
          <p className="section-copy">
            Inventory, payment verification, and shipping status can later be
            sourced from backend endpoints without changing this view structure.
          </p>
        </article>
      </div>

      {relatedProducts.length ? (
        <div className="related-block">
          <ProductGrid products={relatedProducts} title="Related picks" />
        </div>
      ) : null}
    </section>
  );
}
