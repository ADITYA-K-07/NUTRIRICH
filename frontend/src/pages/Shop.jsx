import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import products from "../data/products.json";
import { categories } from "../data/siteContent";
import { getStartingPrice } from "../utils/productUtils";

const defaultFilters = {
  search: "",
  category: "",
  goal: "",
  sort: "featured"
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = {
    search: searchParams.get("search") ?? defaultFilters.search,
    category: searchParams.get("category") ?? defaultFilters.category,
    goal: searchParams.get("goal") ?? defaultFilters.goal,
    sort: searchParams.get("sort") ?? defaultFilters.sort
  };

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    setSearchParams(nextParams);
  }

  function resetFilters() {
    setSearchParams({});
  }

  const normalizedSearch = filters.search.toLowerCase().trim();

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        [product.name, product.brand, product.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesCategory =
        !filters.category || product.category === filters.category;
      const matchesGoal =
        !filters.goal || product.goal.includes(filters.goal);

      return matchesSearch && matchesCategory && matchesGoal;
    })
    .sort((left, right) => {
      if (filters.sort === "price-asc") {
        return getStartingPrice(left) - getStartingPrice(right);
      }
      if (filters.sort === "price-desc") {
        return getStartingPrice(right) - getStartingPrice(left);
      }
      if (filters.sort === "rating") {
        return right.rating.average - left.rating.average;
      }
      return 0;
    });

  return (
    <section className="page-shell shell">
      <div className="page-intro">
        <span className="section-kicker">Catalog</span>
        <h1>Supplements curated for real training goals</h1>
        <p>
          Browse proteins, strength support, recovery products, and everyday
          wellness essentials. The current build is fully client-rendered and
          ready to be swapped to backend-driven inventory later.
        </p>
      </div>

      <div className="shop-layout">
        <FilterSidebar
          filters={filters}
          onFilterChange={updateFilter}
          onReset={resetFilters}
        />

        <div className="shop-results">
          <div className="shop-results-bar">
            <div>
              <strong>{filteredProducts.length}</strong> products
            </div>
            <div className="shop-chip-row">
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  className={`shop-chip ${
                    filters.category === category.slug ? "active" : ""
                  }`}
                  onClick={() =>
                    updateFilter(
                      "category",
                      filters.category === category.slug ? "" : category.slug
                    )
                  }
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <ProductGrid
            products={filteredProducts}
            title={filters.category ? "Filtered results" : "All products"}
          />
        </div>
      </div>
    </section>
  );
}
