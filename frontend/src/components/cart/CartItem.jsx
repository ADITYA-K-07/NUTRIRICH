import { formatPrice } from "../../utils/formatPrice";

export default function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <article className="cart-item">
      <div
        className="cart-item-visual"
        style={{
          "--product-bg": item.product.cardBgColor,
          "--product-text": item.product.cardTextColor
        }}
      >
        <span>{item.product.brand}</span>
        <strong>{item.product.visualLabel}</strong>
      </div>

      <div className="cart-item-copy">
        <h3>{item.product.name}</h3>
        <p>
          {item.variant.flavour} / {item.variant.size}
        </p>
        <div className="cart-item-price">
          <strong>{formatPrice(item.variant.price)}</strong>
          <span>{formatPrice(item.variant.mrp)}</span>
        </div>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-stepper">
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button type="button" className="remove-link" onClick={onRemove}>
          Remove
        </button>
      </div>
    </article>
  );
}
