const RAZORPAY_CHECKOUT_URL = "https://checkout.razorpay.com/v1/checkout.js";

export function isRazorpayConfigured() {
  return Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID);
}

export function loadRazorpayScript() {
  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const existingScript = document.querySelector(
      `script[src="${RAZORPAY_CHECKOUT_URL}"]`
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), {
        once: true
      });
      existingScript.addEventListener("error", () => resolve(false), {
        once: true
      });
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout(options) {
  const loaded = await loadRazorpayScript();

  if (!loaded || !window.Razorpay) {
    throw new Error("Razorpay SDK could not be loaded.");
  }

  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      ...options,
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      handler: (response) => resolve(response),
      modal: {
        ondismiss: () => reject(new Error("Payment window closed before completion."))
      }
    });

    checkout.open();
  });
}
