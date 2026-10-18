import { useApp } from "../context/AppContext";
import { PlanCard } from "./PlanCard";

export function PlansSection() {
  const { category, plansHogar, plansMovil, plansPymes } = useApp();
  const plansByCategory = {
    hogar: plansHogar,
    movil: plansMovil,
    pymes: plansPymes,
  };
  const plans = plansByCategory[category] ?? [];

  const sectionContent = {
    hogar: {
      badge: "Planes Hogar",
      grid: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
    },
    movil: {
      badge: "Planes Móvil",
      grid: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
    },
    pymes: {
      badge: "Planes Pymes",
      grid: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
    },
  };

  const current = sectionContent[category];

  if (!plans || plans.length === 0) {
    return (
      <section className="py-16 px-4" style={{ background: "#F8F8F8" }}>
        <div className="max-w-7xl mx-auto text-center">
          <p style={{ color: "#717182" }}>Cargando planes...</p>
        </div>
      </section>
    );
  }


  return (
    <section className="py-16 px-4" style={{ background: "#F8F8F8" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3"
            style={{ background: "rgba(218,41,28,0.08)", color: "#DA291C" }}
          >
            {current.badge}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black mb-2"
            style={{ color: "#2D2D2D" }}
          >
            Promociones Exclusivas Claro
          </h2>
          <p
            className="text-sm sm:text-base max-w-2xl mx-auto"
            style={{ color: "#717182" }}
          >
          </p>
        </div>

        <div
          className={`grid ${current.grid} gap-5 transition-all duration-500`}
          key={category}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
