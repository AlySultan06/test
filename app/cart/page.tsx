"use client";

import { useCart } from "@/components/CartProvider";

const paymentMethods = [
  "Credit / Debit Card",
  "PayPal",
  "Apple Pay",
  "Crypto",
  "Buy Now Pay Later"
];

export default function CartPage() {
  const { items, removeItem, total } = useCart();

  return (
    <section>
      <h1 className="section-title">Your cart</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>
        Your selections sync across sessions. Choose a payment method below.
      </p>
      <div className="cart-list">
        {items.length === 0 && (
          <div className="card">Your cart is empty. Browse posters to add.</div>
        )}
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
              <strong>{item.title}</strong>
              <div style={{ color: "var(--muted)" }}>{item.size}</div>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span>${item.price.toFixed(2)}</span>
              <button className="btn" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <h2 className="section-title">Payment methods</h2>
        <div className="payment-grid">
          {paymentMethods.map((method) => (
            <div key={method} className="payment-option">
              <strong>{method}</strong>
              <p style={{ color: "var(--muted)", marginTop: 8 }}>
                Secure checkout with biometric or 2-step verification.
              </p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 32, textAlign: "right" }}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="btn primary" style={{ marginTop: 12 }}>
          Continue to checkout
        </button>
      </div>
    </section>
  );
}
