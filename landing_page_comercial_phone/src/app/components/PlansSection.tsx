import { useApp } from "../context/AppContext";
import { PlanCard } from "./PlanCard";

export function PlansSection() {
  const { category, plansHogar, plansMovil } = useApp();
  const plans = category === "hogar" ? plansHogar : plansMovil;

  return (
    <section className="py-16 px-4" style={{ background: "#F8F8F8" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3"
            style={{ background: "rgba(218,41,28,0.08)", color: "#DA291C" }}
          >
            {category === "hogar" ? "Planes Hogar" : "Planes Móvil"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#2D2D2D" }}>
            Elegí el plan ideal para tu empresa
          </h2>
          <p className="text-sm sm:text-base max-w-lg mx-auto" style={{ color: "#717182" }}>
            Todos los planes incluyen soporte personalizado y asesoramiento comercial sin costo adicional.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 transition-all duration-500"
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
