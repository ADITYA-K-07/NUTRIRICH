const API_URL = import.meta.env.VITE_API_URL?.trim();

async function request(path, { method = "GET", body, headers } = {}) {
  if (!API_URL) {
    throw new Error("API base URL is not configured.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(errorPayload.message || "Request failed.");
  }

  return response.json();
}

export function isApiConfigured() {
  return Boolean(API_URL);
}

export function createPaymentOrder(payload) {
  return request("/api/payment/create-order", {
    method: "POST",
    body: payload
  });
}

export function verifyPayment(payload) {
  return request("/api/payment/verify", {
    method: "POST",
    body: payload
  });
}

export function submitOrder(payload) {
  return request("/api/orders", {
    method: "POST",
    body: payload
  });
}

export function submitEnquiry(payload) {
  return request("/api/enquiry", {
    method: "POST",
    body: payload
  });
}
