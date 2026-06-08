import { Plan } from "../data/initialData";

interface Props {
  plan: Plan;
}

export function HeroPlanCard({ plan }: Props) {
  return (
    <div className="rounded-3xl overflow-hidden">
  {/* Parte roja */}
  <div
    className="p-6 text-center"
    style={{ background: "#DA291C" }}
  >
    <p className="text-sm text-white uppercase">
      Desde
    </p>

    <h2 className="text-6xl font-black text-white">
      {plan.price}
    </h2>

    {plan.regularPrice && (
      <p className="text-white/80">
        Precio regular:
        <span className="line-through ml-1">
          {plan.regularPrice}
        </span>
      </p>
    )}
  </div>

  {/* Parte inferior */}
  <div
    className="p-5 backdrop-blur-md"
    style={{
      background: "rgba(0,0,0,.55)",
      color: "#fff",
    }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase opacity-80">
          Promo
        </p>

        <p className="font-bold">
          {plan.promoText}
        </p>
      </div>

      <div className="w-px h-14 bg-white/30" />

      <div className="text-right">
        <p className="text-3xl font-black">
          {plan.features[0]}
        </p>

        <p className="text-sm opacity-80">
          {plan.shortDescription}
        </p>
      </div>
    </div>
  </div>
</div>
  );
}