const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="2.5" fill="none">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CrossIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2.5" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function ComparisonTable({ plans, selectedId }) {
  const labels = plans[0]?.features || [];

  return (
    <div className="mp-table-wrap">
      <div className="mp-table-inner">
        <div className="mp-table-body">
          <div className="mp-feat-labels">
            {labels.map((f, i) => (
              <div key={i} className="mp-feat-label">
                <div>
                  <p className="fl-main">{f.text}</p>
                  {f.desc && <p className="fl-sub">{f.desc}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="mp-plan-cols">
            {plans.map((p) => {
              const selected = p.id === selectedId;

              return (
                <div
                  key={p.id}
                  className={`mp-plan-col ${selected ? "is-sel" : ""}`}
                >
                  <p className="mp-col-header">{p.name}</p>

                  {p.features.map((f, i) => (
                    <div key={i} className="mp-feat-cell">
                      {f.status ? <CheckIcon /> : <CrossIcon />}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}