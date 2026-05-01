import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    items,
    subtotal,
    discount,
    shipping,
    grandTotal,
    updateQuantity,
    removeItem
  } = useCart();

  if (!items.length) {
    return (
      <section className="page-shell shell empty-state">
        <span className="section-kicker">Cart</span>
        <h1>Your cart is empty</h1>
        <p>
          Build a stack from the shop page and your selected variants will show
          up here automatically.
        </p>
        <Link to="/shop" className="button button-primary">
          Start shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="page-shell shell">
      <div className="page-intro">
        <span className="section-kicker">Cart</span>
        <h1>Review your selected products</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <CartItem
              key={item.key}
              item={item}
              onQuantityChange={(quantity) =>
                updateQuantity(item.productId, item.variantIndex, quantity)
              }
              onRemove={() => removeItem(item.productId, item.variantIndex)}
            />
          ))}
        </div>

        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          total={grandTotal}
          note="Shipping is free above Rs 999. Razorpay and backend routes can be plugged into checkout later."
        />
      </div>
    </section>
  );
}
