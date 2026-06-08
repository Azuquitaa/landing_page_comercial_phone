import { Check, MessageCircle } from "lucide-react";
import { Plan } from "../data/initialData";

const WA_NUMBER = "5491100000000";

function getWhatsAppLink(plan: Plan) {
  const msg = encodeURIComponent(
    `Hola! Me interesa el ${plan.name} (${plan.price}/mes). ¿Me pueden asesorar?`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

interface PlanCardProps {
  plan: Plan;
  compact?: boolean;
}

export function PlanCard({ plan, compact = false }: PlanCardProps) {
  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: plan.recommended ? "#2D2D2D" : "#fff",
        border: plan.recommended ? "2px solid #DA291C" : "2px solid #E6E6E6",
        boxShadow: plan.recommended
          ? "0 8px 32px rgba(218,41,28,0.18)"
          : "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <div
          className="absolute top-0 right-0 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-bl-xl"
          style={{ background: "#DA291C", color: "#fff" }}
        >
          {plan.badge}
        </div>
      )}

      {/* Recomendado label */}
      {plan.recommended && (
        <div
          className="absolute top-0 left-0 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-br-xl"
          style={{ background: "#DA291C", color: "#fff" }}
        >
          ★ Recomendado
        </div>
      )}

      <div className={`flex flex-col flex-1 ${compact ? "p-5" : "p-7"}`} style={{ paddingTop: plan.recommended || plan.badge ? (compact ? "2.5rem" : "3rem") : undefined }}>
        {/* Header */}
        <div className="mb-4">
          <h3
            className="text-lg font-bold mb-1"
            style={{ color: plan.recommended ? "#fff" : "#2D2D2D" }}
          >
            {plan.name}
          </h3>
          <div className="flex items-end gap-1">
            <span
              className="font-black"
              style={{
                color: plan.recommended ? "#DA291C" : "#DA291C",
                fontSize: plan.price === "Consultar" ? "1.5rem" : "2rem",
                lineHeight: 1,
              }}
            >
              {plan.price}
            </span>
            {plan.priceNote && (
              <span
                className="text-xs mb-1"
                style={{ color: plan.recommended ? "#ccc" : "#717182" }}
              >
                {plan.priceNote}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2 mb-4 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check
                size={15}
                className="flex-shrink-0 mt-0.5"
                style={{ color: "#DA291C" }}
              />
              <span style={{ color: plan.recommended ? "#E6E6E6" : "#2D2D2D" }}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* Benefits */}
        {!compact && (
          <div className="mb-5">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: plan.recommended ? "#aaa" : "#717182" }}
            >
              Beneficios
            </p>
            <div className="flex flex-wrap gap-1">
              {plan.benefits.map((b, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: plan.recommended
                      ? "rgba(218,41,28,0.18)"
                      : "#F5F5F5",
                    color: plan.recommended ? "#fff" : "#2D2D2D",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <a
          href={getWhatsAppLink(plan)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "#DA291C",
            color: "#fff",
          }}
        >
          <MessageCircle size={18} />
          LO QUIERO
        </a>
      </div>
    </div>
  );
}
