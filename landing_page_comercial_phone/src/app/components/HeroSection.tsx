import React, { useState } from "react";
import { Send, Home, Smartphone } from "lucide-react";
import { useApp } from "../context/AppContext";
import { HeroPlanCard  } from "./HeroPlanCard";

import videoHero from '@/assets/video-hero.mp4'

const WA_NUMBER = "5491100000000";

interface LeadForm {
  celular: string;
  dni: string;
}

export function HeroSection() {
  const { category, setCategory, plansHogar, plansMovil } = useApp();
  const [form, setForm] = useState<LeadForm>({ celular: "", dni: "" });
  const [submitted, setSubmitted] = useState(false);

  const plans = category === "hogar" ? plansHogar : plansMovil;
  const recommended = plans.find((p) => p.recommended) ?? plans[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola. Estoy interesado en un plan ${category}. DNI: ${form.dni}. Celular: ${form.celular}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section className="relative pt-30 pb-16 px-4 overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src={videoHero}
          type="video/mp4"
        />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,.55)"
        }}
      />

      {/* Category toggle — mobile */}
      <div className="md:hidden flex items-center gap-2 justify-center mb-8">
        <button
          onClick={() => setCategory("hogar")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
          style={category === "hogar" ? { background: "#DA291C", color: "#fff" } : { background: "#E6E6E6", color: "#2D2D2D" }}
        >
          <Home size={16} />
          Hogar
        </button>
        <button
          onClick={() => setCategory("movil")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
          style={category === "movil" ? { background: "#DA291C", color: "#fff" } : { background: "#E6E6E6", color: "#2D2D2D" }}
        >
          <Smartphone size={16} />
          Móvil
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-20">
      
        {/* Headline 
        <div className="text-center mb-8">
          <h1
            className="text-4xl lg:text-5xl font-black mb-3"
            style={{ color: "#FFFFFF" }}
          >
            {category === "hogar"
              ? "Los mejores planes de Internet para tu hogar"
              : "Los mejores planes móviles para tu empresa"}
          </h1>

          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Completá tus datos y un asesor se contactará con vos para acceder a las promociones vigentes.
          </p>
        </div>
        */}
        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left — Plan recomendado */}
          <div className="transition-all duration-500">
            {recommended && <HeroPlanCard plan={recommended} />}
          </div>

          {/* Right — Formulario */}
          <div
            className="rounded-2xl p-5 sm:p-6 max-w-md mx-auto"
            style={{
              background: "#fff",
              border: "2px solid #E6E6E6",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div className="mb-6">
              <h2
                className="text-lg font-bold mb-1"
                style={{ color: "#2D2D2D" }}
              >
                Solicitá tu plan ahora
              </h2>
              <p className="text-sm" style={{ color: "#717182" }}>
                Completá tus datos y un asesor te contactará a la brevedad.
              </p>
            </div>

            {submitted ? (
              <div
                className="flex flex-col items-center justify-center py-10 rounded-xl text-center gap-3"
                style={{ background: "rgba(37,211,102,0.08)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: "#25D366", color: "#fff" }}
                >
                  ✓
                </div>
                <p className="font-semibold text-base" style={{ color: "#2D2D2D" }}>
                  ¡Gracias! Te contactamos pronto.
                </p>
                <p className="text-sm" style={{ color: "#717182" }}>
                  Un asesor se comunicará con vos en breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#2D2D2D" }}>
                    Número celular <span className="font-normal normal-case" style={{ color: "#717182" }}>(sin el 15)</span>
                  </label>
                  <div className="flex">
                    <span
                      className="flex items-center px-3 rounded-l-xl text-sm font-medium border-r-0"
                      style={{ background: "#E6E6E6", border: "1.5px solid #E6E6E6", color: "#717182" }}
                    >
                      +54
                    </span>
                    <input
                      required
                      type="tel"
                      placeholder="11 2345 6789"
                      value={form.celular}
                      onChange={(e) => setForm({ ...form, celular: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-r-xl text-sm outline-none transition-all"
                      style={{
                        border: "1.5px solid #E6E6E6",
                        borderLeft: "none",
                        color: "#2D2D2D",
                        background: "#FAFAFA",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#DA291C")}
                      onBlur={(e) => (e.target.style.borderColor = "#E6E6E6")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#2D2D2D" }}>
                    DNI *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ej: 30123456"
                    value={form.dni}
                    onChange={(e) => setForm({ ...form, dni: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      border: "1.5px solid #E6E6E6",
                      color: "#2D2D2D",
                      background: "#FAFAFA",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#DA291C")}
                    onBlur={(e) => (e.target.style.borderColor = "#E6E6E6")}
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95 mt-2"
                  style={{ background: "#DA291C", color: "#fff" }}
                >
                  <Send size={18} />
                  Quiero que me contacten
                </button>

                <p className="text-xs text-center" style={{ color: "#aaa" }}>
                  Tus datos son confidenciales. No compartimos tu información.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
