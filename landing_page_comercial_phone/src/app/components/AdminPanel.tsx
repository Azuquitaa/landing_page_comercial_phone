import React, { useState } from "react";
import { X, Plus, Trash2, Star, Save, LogOut, Lock, Users, UserPlus, Shield ,RotateCcw, Download} from "lucide-react"; 
import { useApp } from "../context/AppContext";
import { Plan, Slide, FAQ } from "../data/initialData";

// const ADMIN_PASSWORD = "admin2024";

type AdminTab = "hogar" | "movil" | "slides" | "faqs" | "usuarios";

export function AdminPanel() {
  const {
    loading,
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
    currentUser,
    login,
    logout,
    saveContent,
    users,
    addUser,
    removeUser,
    resetContent,    
    restoreBackup,   
    createBackup,
    backupMessage
  } = useApp();

  // estado para username
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [tab, setTab] = useState<AdminTab>("hogar");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Estados para agregar usuario
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "editor">("editor");
  const [addUserError, setAddUserError] = useState("");
  const [addUserSuccess, setAddUserSuccess] = useState("");

  if (!isAdminOpen) return null;

  if (loading) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" 
         style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="text-white text-center">
        <div className="w-10 h-10 border-2 border-t-red-500 border-white/20 rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm">Cargando panel...</p>
      </div>
    </div>
  );
}
  // MODIFICAR handleLogin para usar la API
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(false);
    
    if (!username || !password) {
      setLoginError(true);
      return;
    }

    const user = await login(username, password);
    if (user) {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  }

  // MODIFICAR handleLogout para usar la función del contexto
  function handleLogout() {
    logout(); // ← Usa la función del contexto
    setUsername("");
    setPassword("");
  }

  function showSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  //NUEVA: Manejar guardado en servidor
  async function handleSave() {
    setSaving(true);
    const success = await saveContent();
    if (success) {
      showSaved();
    } else {
      alert('Error al guardar. Verifica tu conexión.');
    }
    setSaving(false);
  }

  //   Manejar agregar usuario
  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setAddUserError("");
    setAddUserSuccess("");

    if (!newUsername || !newPassword) {
      setAddUserError("Todos los campos son obligatorios");
      return;
    }

    if (newPassword.length < 6) {
      setAddUserError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const success = await addUser(newUsername, newPassword, newRole);
    if (success) {
      setAddUserSuccess(`Usuario "${newUsername}" creado exitosamente`);
      setNewUsername("");
      setNewPassword("");
      setNewRole("editor");
    } else {
      setAddUserError("El nombre de usuario ya existe o no tienes permisos");
    }
  }

  // Tus funciones existentes se mantienen IGUAL
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

  //  MODIFICAR tabs para incluir "usuarios" solo si es admin
  const allTabs: { id: AdminTab; label: string; adminOnly?: boolean }[] = [
    { id: "hogar", label: "Planes Hogar" },
    { id: "movil", label: "Planes Móvil" },
    { id: "slides", label: "Slides" },
    { id: "faqs", label: "FAQs" },
    { id: "usuarios", label: "Usuarios", adminOnly: true },
  ];

  //  Filtrar tabs según rol del usuario
  const tabs = allTabs.filter(t => !t.adminOnly || currentUser?.role === 'admin');

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
              {currentUser 
                ? `Conectado: ${currentUser.username} (${currentUser.role === 'admin' ? 'Admin' : 'Editor'})`
                : 'Comercial Phone — Gestión de contenidos'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn && (
                <>
                  {/* Mensaje de backup - SEPARADO del botón */}
                  {backupMessage && (
                    <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(37,211,102,0.2)", color: "#25D366" }}>
                      ✅ {backupMessage}
                    </span>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
                    style={{ color: "#aaa" }}
                  >
                    <LogOut size={14} />
                    Salir
                  </button>
                </>
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

        {/* Login -  MODIFICADO con username y password */}
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
              Ingresá tus credenciales para administrar el panel.
            </p>
            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full max-w-xs">
              {/* ✅ NUEVO: Campo de usuario */}
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: loginError ? "2px solid #DA291C" : "2px solid #E6E6E6" }}
              />
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
                  Usuario o contraseña incorrectos
                </p>
              )}
              <button
                type="submit"
                className="py-3 rounded-xl font-bold text-sm"
                style={{ background: "#DA291C", color: "#fff" }}
              >
                Ingresar
              </button>
              {/* <p className="text-xs text-center" style={{ color: "#aaa" }}>
                Admin: admin / Admin2024! | Editor: editor1 / Editor2024!
              </p> */}
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
                  className="px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px flex items-center gap-2"
                  style={
                    tab === t.id
                      ? { borderColor: "#DA291C", color: "#DA291C" }
                      : { borderColor: "transparent", color: "#717182" }
                  }
                >
                  {t.id === 'usuarios' && <Users size={14} />}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Plans editor - SE MANTIENE IGUAL */}
              {(tab === "hogar" || tab === "movil") && (
                <div className="flex flex-col gap-5">
                  {currentPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="rounded-xl p-5"
                      style={{ border: "2px solid #E6E6E6" }}
                    >
                      {/* ... Todo el contenido de edición de planes se mantiene IGUAL ... */}
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

                      {/* PRIMERA FILA: Nombre, Precio, Precio Regular */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
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
                            Precio Regular (tachado)
                          </label>
                          <input
                            value={plan.regularPrice ?? ""}
                            onChange={(e) => updatePlan(currentPlans, currentSetter, plan.id, "regularPrice", e.target.value)}
                            placeholder="Ej: $34.000"
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          />
                        </div>
                      </div>

                      {/* SEGUNDA FILA: PromoText, ShortDescription, Badge */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                            Texto Promo (ej: 200 MB)
                          </label>
                          <input
                            value={plan.promoText ?? ""}
                            onChange={(e) => updatePlan(currentPlans, currentSetter, plan.id, "promoText", e.target.value)}
                            placeholder="Ej: 200 MB"
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                            Descripción Corta
                          </label>
                          <input
                            value={plan.shortDescription ?? ""}
                            onChange={(e) => updatePlan(currentPlans, currentSetter, plan.id, "shortDescription", e.target.value)}
                            placeholder="Ej: Internet WiFi"
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                            Badge (ej: Más Popular)
                          </label>
                          <input
                            value={plan.badge ?? ""}
                            onChange={(e) => updatePlan(currentPlans, currentSetter, plan.id, "badge", e.target.value)}
                            placeholder="Ej: Más Popular"
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ border: "1.5px solid #E6E6E6" }}
                          />
                        </div>
                      </div>

                      {/* TERCERA FILA: PriceNote */}
                      <div className="mb-3">
                        <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#717182" }}>
                          Nota de Precio (ej: por mes)
                        </label>
                        <input
                          value={plan.priceNote ?? ""}
                          onChange={(e) => updatePlan(currentPlans, currentSetter, plan.id, "priceNote", e.target.value)}
                          placeholder="Ej: por mes"
                          className="w-full sm:w-1/3 px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ border: "1.5px solid #E6E6E6" }}
                        />
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

              {/* Slides editor - SE MANTIENE IGUAL */}
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

              {/* FAQs editor - SE MANTIENE IGUAL */}
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

              {/*  Gestión de Usuarios (solo admin) */}
              {tab === "usuarios" && currentUser?.role === 'admin' && (
                <div className="flex flex-col gap-6">
                  {/* Formulario para agregar usuario */}
                  <div className="rounded-xl p-5" style={{ border: "2px solid #E6E6E6" }}>
                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "#2D2D2D" }}>
                      <UserPlus size={18} style={{ color: "#DA291C" }} />
                      Agregar Nuevo Usuario
                    </h3>
                    <form onSubmit={handleAddUser} className="flex flex-col gap-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Nombre de usuario"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ border: "1.5px solid #E6E6E6" }}
                        />
                        <input
                          type="password"
                          placeholder="Contraseña (mín. 6 caracteres)"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ border: "1.5px solid #E6E6E6" }}
                        />
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value as "admin" | "editor")}
                          className="px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ border: "1.5px solid #E6E6E6" }}
                        >
                          <option value="editor">Editor (solo contenido)</option>
                          <option value="admin">Administrador (total)</option>
                        </select>
                      </div>
                      {addUserError && (
                        <p className="text-xs" style={{ color: "#DA291C" }}>{addUserError}</p>
                      )}
                      {addUserSuccess && (
                        <p className="text-xs" style={{ color: "#25D366" }}>{addUserSuccess}</p>
                      )}
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold self-start"
                        style={{ background: "#DA291C", color: "#fff" }}
                      >
                        <UserPlus size={14} />
                        Crear Usuario
                      </button>
                    </form>
                  </div>

                  {/* Lista de usuarios */}
                  <div>
                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "#2D2D2D" }}>
                      <Users size={18} style={{ color: "#DA291C" }} />
                      Usuarios Registrados ({users.length})
                    </h3>
                    <div className="flex flex-col gap-2">
                      {users.map(user => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 rounded-xl"
                          style={{ border: "1.5px solid #E6E6E6" }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ 
                                background: user.role === 'admin' 
                                  ? 'rgba(218,41,28,0.1)' 
                                  : 'rgba(37,211,102,0.1)' 
                              }}
                            >
                              <Shield 
                                size={18} 
                                style={{ 
                                  color: user.role === 'admin' ? '#DA291C' : '#25D366' 
                                }} 
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: "#2D2D2D" }}>
                                {user.username}
                                {user.id === currentUser?.id && (
                                  <span className="text-xs ml-2" style={{ color: "#717182" }}>(tú)</span>
                                )}
                              </p>
                              <p className="text-xs" style={{ color: "#717182" }}>
                                Rol: {user.role === 'admin' ? 'Administrador' : 'Editor'} • 
                                Creado: {new Date(user.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {user.id !== currentUser?.id && (
                            <button
                              onClick={() => removeUser(user.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-all"
                              style={{ color: "#DA291C" }}
                              title="Eliminar usuario"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer bar */}

            <div
              className="flex items-center justify-between px-6 py-3 flex-shrink-0 border-t"
              style={{ borderColor: "#E6E6E6" }}
            >
              <div className="flex items-center gap-2">
                <p className="text-xs" style={{ color: "#717182" }}>
                  {saved ? '✅ Cambios guardados' : 'Realiza cambios y guarda'}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botón RESET (solo admin) */}
                {currentUser?.role === 'admin' && (
                  <button
                    onClick={async () => {
                      if (window.confirm('⚠️ ¿Resetear TODOS los datos a valores originales? Esta acción no se puede deshacer.')) {
                        const success = await resetContent();
                        if (success) {
                          alert('✅ Datos reseteados a valores originales');
                        } else {
                          alert('❌ Error al resetear');
                        }
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                    style={{ background: "#FF9800", color: "#fff" }}
                    title="Resetear a valores originales"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                )}
                
                {/* Botón RESTAURAR BACKUP */}
                <button
                  onClick={async () => {
                    if (window.confirm('📦 ¿Restaurar último backup? Se perderán los cambios no guardados.')) {
                      const success = await restoreBackup();
                      if (success) {
                        alert('✅ Backup restaurado exitosamente');
                        window.location.reload();
                      } else {
                        alert('❌ No hay backup disponible');
                      }
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                  style={{ background: "#2196F3", color: "#fff" }}
                  title="Restaurar último backup"
                >
                  <Download size={14} />
                  Restaurar
                </button>
                
                {/* Botón GUARDAR */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                  style={{ background: saved ? "#25D366" : "#DA291C", color: "#fff" }}
                >
                  <Save size={15} />
                  {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar cambios"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}