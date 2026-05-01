import { brands } from "../../data/siteContent";

export default function BrandTicker() {
  const loop = [...brands, ...brands];

  return (
    <section className="brand-band" id="brands">
      <div className="brand-track">
        {loop.map((brand, index) => (
          <span key={`${brand}-${index}`}>{brand}</span>
        ))}
      </div>
    </section>
  );
}
