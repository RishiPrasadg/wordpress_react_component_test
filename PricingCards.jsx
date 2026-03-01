const BUY_BASE = "/buy/";

export default function PricingCards({ plans, selectedId, setSelectedId }) {
  return (
    <div className="plans-row">
      {plans.map((p) => {
        const selected = p.id === selectedId;

        return (
          <div key={p.id} className="plan-card-wrap">
            <div
              className={`plan-card ${selected ? "selected" : ""}`}
              onClick={() => setSelectedId(p.id)}
            >
              {p.isBest && (
                <div className="best-seller-badge">
                  ⭐ BEST SELLER
                </div>
              )}

              {selected && <div className="selected-check" />}

              <div className="plan-name">{p.name}</div>

              <div className="price-row">
                <span className="original-price">
                  {p.currency} {p.original}/-
                </span>
                <span className="discount-badge">
                  -{p.disc}% OFF
                </span>
              </div>

              <div className="final-price">
                {p.currency} {p.amount}
              </div>

              <a
                href={`${BUY_BASE}${p.id}?referrer=membershipplan`}
                className="buy-btn"
              >
                Buy Now
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}