import { categories } from "../../data/siteContent";

const goals = [
  { value: "muscle-gain", label: "Muscle gain" },
  { value: "weight-gain", label: "Weight gain" },
  { value: "endurance", label: "Endurance" },
  { value: "strength", label: "Strength" },
  { value: "recovery", label: "Recovery" },
  { value: "wellness", label: "Wellness" },
  { value: "fat-loss", label: "Fat loss" }
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onReset
}) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-head">
        <h3>Filters</h3>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="filter-group">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          value={filters.category}
          onChange={(event) => onFilterChange("category", event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="goal-filter">Goal</label>
        <select
          id="goal-filter"
          value={filters.goal}
          onChange={(event) => onFilterChange("goal", event.target.value)}
        >
          <option value="">All goals</option>
          {goals.map((goal) => (
            <option key={goal.value} value={goal.value}>
              {goal.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Sort by</label>
        <select
          id="sort-filter"
          value={filters.sort}
          onChange={(event) => onFilterChange("sort", event.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price low to high</option>
          <option value="price-desc">Price high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="filter-copy">
        <p>
          Backend-ready filtering stays on the client for now, so future API
          integration can replace this without changing the page layout.
        </p>
      </div>
    </aside>
  );
}
