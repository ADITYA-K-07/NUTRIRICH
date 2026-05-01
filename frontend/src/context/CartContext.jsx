import { createContext, useContext, useEffect, useState } from "react";
import {
  cartItemKey,
  getProductById,
  getVariantByIndex
} from "../utils/productUtils";

const CartContext = createContext(null);
const STORAGE_KEY = "nutririch-cart";

function readStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const detailedItems = items
    .map((item) => {
      const product = getProductById(item.productId);
      const variant = getVariantByIndex(product, item.variantIndex);

      if (!product || !variant) {
        return null;
      }

      return {
        ...item,
        key: cartItemKey(item.productId, item.variantIndex),
        product,
        variant,
        lineTotal: variant.price * item.quantity,
        lineMrp: variant.mrp * item.quantity
      };
    })
    .filter(Boolean);

  const itemCount = detailedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = detailedItems.reduce(
    (total, item) => total + item.lineMrp,
    0
  );
  const total = detailedItems.reduce(
    (totalAmount, item) => totalAmount + item.lineTotal,
    0
  );
  const discount = subtotal - total;
  const shipping = total >= 999 || total === 0 ? 0 : 99;
  const grandTotal = total + shipping;

  function addItem(productId, variantIndex, quantity = 1) {
    setItems((currentItems) => {
      const key = cartItemKey(productId, variantIndex);
      const existingItem = currentItems.find(
        (item) => cartItemKey(item.productId, item.variantIndex) === key
      );

      if (existingItem) {
        return currentItems.map((item) =>
          cartItemKey(item.productId, item.variantIndex) === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { productId, variantIndex, quantity }];
    });
  }

  function updateQuantity(productId, variantIndex, quantity) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId && item.variantIndex === variantIndex
            ? { ...item, quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(productId, variantIndex) {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variantIndex === variantIndex
          )
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items: detailedItems,
        itemCount,
        subtotal,
        total,
        discount,
        shipping,
        grandTotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return context;
}
