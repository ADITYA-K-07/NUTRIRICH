import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();
  const status = state?.status || "integration-pending";

  const copy =
    status === "paid"
      ? "Order placed successfully."
      : status === "cod-pending"
        ? "Order reserved with cash on delivery."
        : "Frontend checkout completed. Payment and backend confirmation are ready for integration.";

  return (
    <section className="page-shell shell">
      <div className="success-card">
        <span className="success-icon">OK</span>
        <span className="section-kicker">Order update</span>
        <h1>{copy}</h1>
        <p>
          Order {state?.orderNumber || "NR-PREVIEW"} is associated with{" "}
          {state?.email || "your email"}.
        </p>
        <p>
          Estimated delivery, payment verification, and notifications can be
          driven by backend state once the open endpoints are wired up.
        </p>
        <div className="success-actions">
          <Link to="/shop" className="button button-primary">
            Continue shopping
          </Link>
          <Link to="/contact" className="button button-secondary">
            Contact support
          </Link>
        </div>
      </div>
    </section>
  );
}
