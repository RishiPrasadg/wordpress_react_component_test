// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { useEffect, useState } from "react";
import PricingCards from "./components/PricingCards";
import ComparisonTable from "./components/ComparisonTable";
import "./App.css";

const API_URL =
  "https://payment-service.habuild.in/plan/?status=ACTIVE&type=STANDARD";

const BEST_IDS = [1, 11, 31, 34];

function App() {
  const [plans, setPlans] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await fetch(API_URL);
      const resp = await res.json();

      if (!resp.success) throw new Error("API Error");

      const data = resp.data;
      const isInternational = data.is_international;
      const country = data.country;

      const parsedPlans = Object.entries(data)
        .filter(([key]) => !isNaN(key))
        .map(([, plan]) => {
          const regionKey = isInternational ? "USA" : country || "IND";
          const region = plan.regions[regionKey] || plan.regions["IND"];

          const amount = region.amount / 100;
          const original = region.discounted_amount;
          const disc =
            original > 0
              ? Math.round(((original - amount) / original) * 100)
              : 0;

          return {
            id: plan.id,
            name: plan.name,
            rank: plan.rank,
            currency: region.currency,
            amount,
            original,
            disc,
            isBest: BEST_IDS.includes(plan.id),
            features: plan.features.features,
          };
        })
        .sort((a, b) => a.rank - b.rank);

      setPlans(parsedPlans);
      setSelectedId(parsedPlans[0]?.id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="mp-spinner" />;

  return (
    <div className="mp-layout">
      <PricingCards
        plans={plans}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      <ComparisonTable plans={plans} selectedId={selectedId} />
    </div>
  );
}

export default App;