import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../ui/Button";

export default function OrderSummary({
  subtotal,
  discount,
  shipping,
  total,
  ctaLabel = "Proceed to checkout",
  ctaTo = "/checkout",
  note,
  onAction,
  loading = false
}) {
  return (
    <aside className="order-summary">
      <h2>Order summary</h2>
      <div className="summary-row">
        <span>Subtotal</span>
        <strong>{formatPrice(subtotal)}</strong>
      </div>
      <div className="summary-row">
        <span>Discount</span>
        <strong>- {formatPrice(discount)}</strong>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <strong>{shipping === 0 ? "Free" : formatPrice(shipping)}</strong>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>
      {note ? <p className="summary-note">{note}</p> : null}
      {onAction ? (
        <Button
          type="button"
          className="summary-action"
          disabled={loading}
          onClick={onAction}
        >
          {loading ? "Processing..." : ctaLabel}
        </Button>
      ) : (
        <Link to={ctaTo} className="button button-primary summary-action">
          {ctaLabel}
        </Link>
      )}
    </aside>
  );
}
