import products from "../data/products.json";

export function getProducts() {
  return products;
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

export function getDefaultVariant(product) {
  return product?.variants?.[0];
}

export function getVariantByIndex(product, variantIndex) {
  return product?.variants?.[variantIndex] ?? getDefaultVariant(product);
}

export function getDiscountPercent(price, mrp) {
  if (!mrp || mrp <= price) {
    return 0;
  }

  return Math.round(((mrp - price) / mrp) * 100);
}

export function getStartingPrice(product) {
  return Math.min(...product.variants.map((variant) => variant.price));
}

export function getStartingMrp(product) {
  return Math.max(...product.variants.map((variant) => variant.mrp));
}

export function cartItemKey(productId, variantIndex) {
  return `${productId}:${variantIndex}`;
}
