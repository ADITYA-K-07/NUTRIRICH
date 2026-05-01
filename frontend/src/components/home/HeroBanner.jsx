import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import products from "../../data/products.json";
import { heroSlides } from "../../data/siteContent";
import { formatPrice } from "../../utils/formatPrice";
import { getDefaultVariant, getDiscountPercent } from "../../utils/productUtils";
import AssetImage from "../ui/AssetImage";

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const slide = heroSlides[activeIndex];
  const product = products.find((item) => item.id === slide.productId);
  const variant = getDefaultVariant(product);
  const discount = getDiscountPercent(variant.price, variant.mrp);
  const heroImage = `/hero/slide${activeIndex + 1}-product.jpg`;
  const metrics = [
    { value: "4.6", label: "Gym rating" },
    { value: `${products.length}+`, label: "Curated products" },
    { value: "Rs 999+", label: "Free shipping" }
  ];

  return (
    <section
      className="hero-shell shell"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero">
        <div className="hero-copy">
          <div className="hero-copy-topline">
            <span className="hero-eyebrow">{slide.eyebrow}</span>
            <span className="hero-tag">NUTRIRICH x Fitness Fort</span>
          </div>
          <h1>
            {slide.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{slide.description}</p>
          <div className="hero-actions">
            <Link to={`/shop/${product.id}`} className="button button-light">
              {slide.cta}
            </Link>
            <Link to="/gym" className="button button-ghost-light">
              Explore Fitness Fort
            </Link>
          </div>
          <div className="hero-metrics">
            {metrics.map((metric) => (
              <article key={metric.label} className="hero-metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <article className="hero-offer-card">
            <span className="hero-offer-label">This week</span>
            <strong>Up to {discount}% off selected stacks</strong>
            <p>Storefront-first experience with backend and Razorpay integration ready.</p>
          </article>

          <div
            className="hero-product-card"
            style={{
              "--card-bg": product.cardBgColor,
              "--card-text": product.cardTextColor
            }}
          >
            <div className="hero-visual-top">
              <span>{product.brand}</span>
              <strong>{discount}% off</strong>
            </div>
            <div className="hero-media-shell">
              <AssetImage
                src={heroImage}
                fallbackSrc={product.images?.[0]}
                alt={product.name}
                className="hero-product-image"
                fallback={
                  <div className="hero-canister">
                    <span>{product.category.split("-").join(" ")}</span>
                    <strong>{product.visualLabel}</strong>
                  </div>
                }
              />
              <div className="hero-image-overlay">
                <span>{product.category.split("-").join(" ")}</span>
                <strong>{product.visualLabel}</strong>
              </div>
            </div>
            <div className="hero-product-meta">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="hero-price">
                <strong>{formatPrice(variant.price)}</strong>
                <span>{formatPrice(variant.mrp)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-controls">
        <div className="hero-status">
          <span>0{activeIndex + 1}</span>
          <p>{product.brand} spotlight</p>
        </div>
        <div className="hero-dots">
          {heroSlides.map((item, index) => (
            <button
              key={item.productId}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              className={index === activeIndex ? "active" : ""}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <div className="hero-arrow-group">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() =>
              setActiveIndex(
                (current) => (current - 1 + heroSlides.length) % heroSlides.length
              )
            }
          >
            Prev
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() =>
              setActiveIndex((current) => (current + 1) % heroSlides.length)
            }
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
