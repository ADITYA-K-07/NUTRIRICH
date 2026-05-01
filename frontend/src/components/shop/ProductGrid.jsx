import ProductCard from "./ProductCard";

export default function ProductGrid({ products, title }) {
  return (
    <section className="shop-grid-block">
      {title ? <h2>{title}</h2> : null}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
