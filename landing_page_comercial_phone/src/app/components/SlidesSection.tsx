import React, { useState, useEffect, useCallback } from "react";
import {
  Zap,
  Gift,
  Headphones,
  UserCheck,
  Shield,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Gift,
  Headphones,
  UserCheck,
  Shield,
  Tag,
};

export function SlidesSection() {
  const { slides } = useApp();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % (slides.length || 1)), [slides.length]);
  const prev = () => setCurrent((c) => (c - 1 + (slides.length || 1)) % (slides.length || 1));

  useEffect(() => {
    if (slides.length > 0) {
      const id = setInterval(next, 4000);
      return () => clearInterval(id);
    }
  }, [next, slides.length]);

  // ✅ El return de protección va DESPUÉS de todos los hooks
  if (!slides || slides.length === 0) {
    return (
      <section className="py-16 px-4" style={{ background: "#2D2D2D" }}>
        <div className="max-w-7xl mx-auto text-center">
          <p style={{ color: "#aaa" }}>Cargando beneficios...</p>
        </div>
      </section>
    );
  }

  const visibleCount = 3;
  const getVisible = () => {
    return Array.from({ length: visibleCount }, (_, i) => slides[(current + i) % slides.length]);
  };

  return (
    <section className="py-16 px-4" style={{ background: "#2D2D2D" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3"
            style={{ background: "rgba(218,41,28,0.2)", color: "#DA291C" }}
          >
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#E6E6E6" }}>
             Más gigas, más velocidad y más beneficios
          </h2>
          <p className="text-sm sm:text-base" style={{ color: "#aaa" }}>
            Planes móviles e internet hogar con promociones exclusivas y atención personalizada.
          </p>
        </div>

        {/* Desktop: mostrar 3 slides */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {getVisible().map((slide, i) => {
            const Icon = ICON_MAP[slide.icon] || Shield;
            return (
              <div
                key={slide.id + i}
                className="flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300"
                style={{
                  background: i === 1 ? "#DA291C" : "rgba(255,255,255,0.05)",
                  border: i === 1 ? "2px solid #DA291C" : "2px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: i === 1 ? "#fff" : "rgba(218,41,28,0.2)" }}
                >
                  <Icon size={26} style={{ color: i === 1 ? "#DA291C" : "#DA291C" }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "#fff" }}>
                  {slide.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: i === 1 ? "rgba(255,255,255,0.85)" : "#aaa" }}>
                  {slide.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile: mostrar 1 slide */}
        <div className="md:hidden">
           {slides[current] && (() => {
            const slide = slides[current];
            const Icon = ICON_MAP[slide.icon] || Shield;
            return (
              <div
                className="flex flex-col items-center text-center p-8 rounded-2xl"
                style={{ background: "#DA291C" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "#fff" }}
                >
                  <Icon size={26} style={{ color: "#DA291C" }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "#fff" }}>
                  {slide.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {slide.description}
                </p>
              </div>
            );
          })()}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
            style={{ border: "2px solid rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  background: i === current ? "#DA291C" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
            style={{ border: "2px solid rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
