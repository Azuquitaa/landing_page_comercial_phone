import React, { useState } from "react";
import { X, Plus, Trash2, Star, Save, LogOut, Lock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Plan, Slide, FAQ } from "../data/initialData";

const ADMIN_PASSWORD = "admin2024";

type AdminTab = "hogar" | "movil" | "slides" | "faqs";

export function AdminPanel() {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isLoggedIn,
    setIsLoggedIn,
    plansHogar,
    setPlansHogar,
    plansMovil,
    setPlansMovil,
    slides,
    setSlides,
    faqs,
    setFaqs,
  } = useApp();

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [tab, setTab] = useState<AdminTab>("hogar");
  const [saved, setSaved] = useState(false);

  if (!isAdminOpen) return null;

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setPassword("");
    setIsAdminOpen(false);
  }

  function showSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updatePlan(plans: Plan[], setter: (p: Plan[]) => void, id: string, field: keyof Plan, value: unknown) {
    setter(plans.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function toggleRecommended(plans: Plan[], setter: (p: Plan[]) => void, id: string) {
    setter(plans.map((p) => ({ ...p, recommended: p.id === id })));
  }

  function addPlan(plans: Plan[], setter: (p: Plan[]) => void, cat: "hogar" | "movil") {
    const newPlan: Plan = {
      id: `${cat}_${Date.now()}`,
      name: "Nuevo Plan",
      price: "$0",
      priceNote: "por mes",
      features: ["Característica 1"],
      benefits: ["Beneficio 1"],
      recommended: false,
      category: cat,
    };
    setter([...plans, newPlan]);
  }

  function deletePlan(plans: Plan[], setter: (p: Plan[]) => void, id: string) {
    setter(plans.filter((p) => p.id !== id));
  }

  function updateArrayField(plans: Plan[], setter: (p: Plan[]) => void, id: string, field: "features" | "benefits", index: number, value: string) {
    setter(
      plans.map((p) => {
        if (p.id !== id) return p;
        const arr = [...p[field]];
        arr[index] = value;
        return { ...p, [field]: arr };
      })
    );
  }

  function addArrayItem(plans: Plan[], setter: (p: Plan[]) => void, id: string, field: "features" | "benefits") {
    setter(
      plans.map((p) => {
        if (p.id !== id) return p;
        return { ...p, [field]: [...p[field], ""] };
      })
    );
  }

  function removeArrayItem(plans: Plan[], setter: (p: Plan[]) => void, id: string, field: "features" | "benefits", index: number) {
    setter(
      plans.map((p) => {
        if (p.id !== id) return p;
        return { ...p, [field]: p[field].filter((_, i) => i !== index) };
      })
    );
  }

  const tabs: { id: AdminTab; label: string }[] = [
    { id: "hogar", label: "Planes Hogar" },
    { id: "movil", label: "Planes Móvil" },
    { id: "slides", label: "Slides" },
    { id: "faqs", label: "FAQs" },
  ];

  const currentPlans = tab === "hogar" ? plansHogar : plansMovil;
  const currentSetter = tab === "hogar" ? setPlansHogar : setPlansMovil;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ background: "#2D2D2D" }}
        >
          <div>
            <h2 className="text-base font-bold" style={{ color: "#fff" }}>
              Panel Administrativo
            </h2>
            <p className="text-xs" style={{ color: "#aaa" }}>
              Comercial Phone — Gestión de contenidos
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
                style={{ color: "#aaa" }}
              >
                <LogOut size={14} />
                Salir
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-white/10"
              style={{ color: "#aaa" }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Login */}
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center flex-1 p-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(218,41,28,0.1)" }}
            >
              <Lock size={26} style={{ color: "#DA291C" }} />
            </div>
            <h3 className="text-lg font-bold mb-1" style={{ color: "#2D2D2D" }}>
              Acceso restringido
            </h3>
            <p className="text-sm mb-6" style={{ color: "#717182" }}>
              Ingresá tu contraseña para administrar el panel.
            </p>
            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full max-w-xs">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: loginError ? "2px solid #DA291C" : "2px solid #E6E6E6" }}
              />
              {loginError && (
                <p className="text-xs text-center" style={{ color: "#DA291C" }}>
                  Contraseña incorrecta
                </p>
              )}
              <button
                type="submit"
                className="py-3 rounded-xl font-bold text-sm"
                style={{ background: "#DA291C", color: "#fff" }}
              >
                Ingresar
              </button>
              <p className="text-xs text-center" style={{ color: "#aaa" }}>
                Demo: contraseña es "admin2024"
              </p>
            </form>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div
              className="flex gap-0 border-b flex-shrink-0 overflow-x-auto"
              style={{ borderColor: "#E6E6E6" }}
            >
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px"
                  style={
                    tab === t.id
                      ? { borderColor: "#DA291C", color: "#DA291C" }
                      : { borderColor: "transparent", color: "#717182" }
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Plans editor */}
              {(tab === "hogar" || tab === "movil") && (
                <div className="flex flex-col gap-5">
                  {currentPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="rounded-xl p-5"
                      style={{ border: "2px solid #E6E6E6" }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleRecommended(currentPlans, currentSetter, plan.id)}
                            title="Marcar como recomendado"
                          >
                            <Star
                              size={18}
                              fill={plan.recommended ? "#DA291C" : "none"}
                              style={{ color: plan.recommended ? "#DA291C" : "#ccc" }}
                            />
                          </button>
                          <span className="text-xs font-medium" style={{ color: "#717182" }}>
                            {plan.recommended ? "Plan recomendado" : "Marcar como recomendado"}
                          </span>
                        </div>
                        <button
                          onClick={() => deletePlan(currentPlans, currentSetter, plan.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-red-50"
                          style={{ color: "#DA291C" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                            Nombre
                          </label>
                          <input
                            value={plan.name}
                            onChange={(e) => updatePlan(currentPlans, currentSetter, plan.id, "name", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                            Precio
                          </label>
                          <input
                            value={plan.price}
                            onChange={(e) => updatePlan(currentPlans, currentSetter, plan.id, "price", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                            Badge (ej: Popular)
                          </label>
                          <input
                            value={plan.badge ?? ""}
                            onChange={(e) => updatePlan(currentPlans, currentSetter, plan.id, "badge", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Features */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#717182" }}>
                              Características
                            </label>
                            <button
                              onClick={() => addArrayItem(currentPlans, currentSetter, plan.id, "features")}
                              className="text-xs flex items-center gap-1 px-2 py-1 rounded-lg"
                              style={{ background: "rgba(218,41,28,0.08)", color: "#DA291C" }}
                            >
                              <Plus size={12} /> Agregar
                            </button>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            {plan.features.map((f, i) => (
                              <div key={i} className="flex gap-1">
                                <input
                                  value={f}
                                  onChange={(e) => updateArrayField(currentPlans, currentSetter, plan.id, "features", i, e.target.value)}
                                  className="flex-1 px-3 py-1.5 rounded-lg text-sm outline-none"
                                  style={{ border: "1.5px solid #E6E6E6" }}
                                />
                                <button
                                  onClick={() => removeArrayItem(currentPlans, currentSetter, plan.id, "features", i)}
                                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 flex-shrink-0"
                                  style={{ color: "#DA291C" }}
                                >
                                  <X size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Benefits */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#717182" }}>
                              Beneficios
                            </label>
                            <button
                              onClick={() => addArrayItem(currentPlans, currentSetter, plan.id, "benefits")}
                              className="text-xs flex items-center gap-1 px-2 py-1 rounded-lg"
                              style={{ background: "rgba(218,41,28,0.08)", color: "#DA291C" }}
                            >
                              <Plus size={12} /> Agregar
                            </button>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            {plan.benefits.map((b, i) => (
                              <div key={i} className="flex gap-1">
                                <input
                                  value={b}
                                  onChange={(e) => updateArrayField(currentPlans, currentSetter, plan.id, "benefits", i, e.target.value)}
                                  className="flex-1 px-3 py-1.5 rounded-lg text-sm outline-none"
                                  style={{ border: "1.5px solid #E6E6E6" }}
                                />
                                <button
                                  onClick={() => removeArrayItem(currentPlans, currentSetter, plan.id, "benefits", i)}
                                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 flex-shrink-0"
                                  style={{ color: "#DA291C" }}
                                >
                                  <X size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addPlan(currentPlans, currentSetter, tab as "hogar" | "movil")}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border-2 border-dashed transition-all hover:border-red-300"
                    style={{ borderColor: "#E6E6E6", color: "#717182" }}
                  >
                    <Plus size={16} />
                    Agregar plan
                  </button>
                </div>
              )}

              {/* Slides editor */}
              {tab === "slides" && (
                <div className="flex flex-col gap-4">
                  {slides.map((slide, si) => (
                    <div key={slide.id} className="rounded-xl p-5 flex flex-col gap-3" style={{ border: "2px solid #E6E6E6" }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#DA291C" }}>
                          Slide {si + 1}
                        </span>
                        <button
                          onClick={() => setSlides(slides.filter((_, i) => i !== si))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50"
                          style={{ color: "#DA291C" }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                            Ícono
                          </label>
                          <select
                            value={slide.icon}
                            onChange={(e) => setSlides(slides.map((s, i) => i === si ? { ...s, icon: e.target.value } : s))}
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          >
                            {["Zap", "Gift", "Headphones", "UserCheck", "Shield", "Tag", "Star", "Award"].map((ic) => (
                              <option key={ic} value={ic}>{ic}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                            Título
                          </label>
                          <input
                            value={slide.title}
                            onChange={(e) => setSlides(slides.map((s, i) => i === si ? { ...s, title: e.target.value } : s))}
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                            Descripción
                          </label>
                          <input
                            value={slide.description}
                            onChange={(e) => setSlides(slides.map((s, i) => i === si ? { ...s, description: e.target.value } : s))}
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setSlides([...slides, { id: `s_${Date.now()}`, icon: "Star", title: "Nuevo slide", description: "Descripción del slide" }])}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border-2 border-dashed transition-all hover:border-red-300"
                    style={{ borderColor: "#E6E6E6", color: "#717182" }}
                  >
                    <Plus size={16} />
                    Agregar slide
                  </button>
                </div>
              )}

              {/* FAQs editor */}
              {tab === "faqs" && (
                <div className="flex flex-col gap-4">
                  {faqs.map((faq, fi) => (
                    <div key={faq.id} className="rounded-xl p-5 flex flex-col gap-3" style={{ border: "2px solid #E6E6E6" }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#DA291C" }}>
                          FAQ {fi + 1}
                        </span>
                        <button
                          onClick={() => setFaqs(faqs.filter((_, i) => i !== fi))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50"
                          style={{ color: "#DA291C" }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                          Pregunta
                        </label>
                        <input
                          value={faq.question}
                          onChange={(e) => setFaqs(faqs.map((f, i) => i === fi ? { ...f, question: e.target.value } : f))}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ border: "1.5px solid #E6E6E6" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                          Respuesta
                        </label>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => setFaqs(faqs.map((f, i) => i === fi ? { ...f, answer: e.target.value } : f))}
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                          style={{ border: "1.5px solid #E6E6E6" }}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setFaqs([...faqs, { id: `f_${Date.now()}`, question: "Nueva pregunta", answer: "Respuesta", category: "general" }])}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border-2 border-dashed transition-all hover:border-red-300"
                    style={{ borderColor: "#E6E6E6", color: "#717182" }}
                  >
                    <Plus size={16} />
                    Agregar FAQ
                  </button>
                </div>
              )}
            </div>

            {/* Footer bar */}
            <div
              className="flex items-center justify-between px-6 py-3 flex-shrink-0 border-t"
              style={{ borderColor: "#E6E6E6" }}
            >
              <p className="text-xs" style={{ color: "#717182" }}>
                Los cambios se aplican en tiempo real en la landing.
              </p>
              <button
                onClick={showSaved}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                style={{ background: saved ? "#25D366" : "#DA291C", color: "#fff" }}
              >
                <Save size={15} />
                {saved ? "¡Guardado!" : "Guardar cambios"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
