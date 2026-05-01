import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/cart/OrderSummary";
import { useCart } from "../context/CartContext";
import {
  createPaymentOrder,
  isApiConfigured,
  submitOrder,
  verifyPayment
} from "../services/api";
import { isRazorpayConfigured, openRazorpayCheckout } from "../utils/razorpay";

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pinCode: ""
};

const paymentMethods = [
  { value: "upi", label: "UPI / QR" },
  { value: "card", label: "Credit / Debit Card" },
  { value: "netbanking", label: "Net Banking" },
  { value: "cod", label: "Cash on Delivery" }
];

export default function Checkout() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    discount,
    shipping,
    grandTotal,
    clearCart
  } = useCart();
  const [form, setForm] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!items.length) {
      navigate("/cart");
    }
  }, [items.length, navigate]);

  if (!items.length) {
    return null;
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validateForm() {
    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "addressLine1",
      "city",
      "state",
      "pinCode"
    ];

    const missing = requiredFields.find((field) => !form[field].trim());

    if (missing) {
      return "Please complete all required delivery fields.";
    }

    return "";
  }

  function buildOrderPayload(status) {
    return {
      status,
      paymentMethod,
      customer: form,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        variant: `${item.variant.flavour} / ${item.variant.size}`,
        quantity: item.quantity,
        price: item.variant.price
      })),
      totals: {
        subtotal,
        discount,
        shipping,
        total: grandTotal
      }
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationMessage = validateForm();

    if (validationMessage) {
      setFeedback(validationMessage);
      return;
    }

    setIsSubmitting(true);
    setFeedback("");

    const integrationReady =
      isApiConfigured() &&
      isRazorpayConfigured() &&
      paymentMethod !== "cod";

    try {
      if (paymentMethod === "cod") {
        if (isApiConfigured()) {
          await submitOrder(buildOrderPayload("cod-pending"));
        }

        clearCart();
        navigate("/order-success", {
          state: {
            orderNumber: `NR-${Date.now().toString().slice(-5)}`,
            email: form.email,
            status: "cod-pending"
          }
        });
        return;
      }

      if (!integrationReady) {
        clearCart();
        navigate("/order-success", {
          state: {
            orderNumber: `NR-${Date.now().toString().slice(-5)}`,
            email: form.email,
            status: "integration-pending"
          }
        });
        return;
      }

      const order = await createPaymentOrder({
        amount: grandTotal * 100,
        currency: "INR",
        receipt: `nr_${Date.now()}`
      });

      const paymentResponse = await openRazorpayCheckout({
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "NUTRIRICH",
        description: "Supplement Order",
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone
        },
        notes: {
          customer: form.fullName,
          phone: form.phone
        }
      });

      await verifyPayment({
        ...paymentResponse,
        orderPayload: buildOrderPayload("paid")
      });

      clearCart();
      navigate("/order-success", {
        state: {
          orderNumber: order.receipt?.toUpperCase() || `NR-${Date.now()}`,
          email: form.email,
          status: "paid"
        }
      });
    } catch (error) {
      setFeedback(
        error.message ||
          "Checkout could not complete. Review your integration configuration."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page-shell shell">
      <div className="page-intro">
        <span className="section-kicker">Checkout</span>
        <h1>Delivery details and payment</h1>
        <p>
          The form is production-shaped. If API or Razorpay environment values
          are missing, the flow switches into integration-preview mode.
        </p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Full name *
              <input
                name="fullName"
                value={form.fullName}
                onChange={updateField}
              />
            </label>
            <label>
              Phone number *
              <input name="phone" value={form.phone} onChange={updateField} />
            </label>
            <label>
              Email *
              <input name="email" value={form.email} onChange={updateField} />
            </label>
            <label>
              Address line 1 *
              <input
                name="addressLine1"
                value={form.addressLine1}
                onChange={updateField}
              />
            </label>
            <label>
              Address line 2
              <input
                name="addressLine2"
                value={form.addressLine2}
                onChange={updateField}
              />
            </label>
            <label>
              City *
              <input name="city" value={form.city} onChange={updateField} />
            </label>
            <label>
              State *
              <input name="state" value={form.state} onChange={updateField} />
            </label>
            <label>
              PIN code *
              <input
                name="pinCode"
                value={form.pinCode}
                onChange={updateField}
              />
            </label>
          </div>

          <fieldset className="payment-methods">
            <legend>Payment method</legend>
            {paymentMethods.map((method) => (
              <label key={method.value} className="radio-card">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={paymentMethod === method.value}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
                <span>{method.label}</span>
              </label>
            ))}
          </fieldset>

          {feedback ? <p className="form-feedback">{feedback}</p> : null}
        </form>

        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          total={grandTotal}
          ctaLabel={`Pay / place order`}
          note="For live checkout, connect VITE_API_URL and VITE_RAZORPAY_KEY_ID. Without them, this still demonstrates the full frontend flow."
          onAction={handleSubmit}
          loading={isSubmitting}
        />
      </div>
    </section>
  );
}
