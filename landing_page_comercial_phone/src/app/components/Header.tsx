import { useState } from "react";
import { Home, Smartphone, User, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";

import logoPorta from '@/assets/logo-porta.png'

export function Header() {
  const { category, setCategory, setIsAdminOpen, isLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      style={{ borderBottom: "3px solid #DA291C" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logos izquierda */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
                src={logoPorta}
                alt="Porta Empresas Pueyrredón"
                className="h-20 w-auto"
              />
            <div className="flex flex-col leading-none">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#DA291C" }}
              >
                agente oficial claro
              </span>
              <span
                className="text-lg font-black tracking-tight"
                style={{ color: "#2D2D2D" }}
              >
                Comercial Phone
              </span>
            </div>
            <div
              className="w-px h-10 hidden sm:block"
              style={{ background: "#E6E6E6" }}
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-xs font-medium" style={{ color: "#717182" }}>
                Empresas
              </span>
              <span
                className="text-base font-bold"
                style={{ color: "#DA291C" }}
              >
                Claro
              </span>
            </div>
          </div>

          {/* Selector central — desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setCategory("hogar")}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={
                category === "hogar"
                  ? { background: "#DA291C", color: "#fff" }
                  : { color: "#2D2D2D" }
              }
            >
              <Home size={16} />
              Plan Hogar
            </button>
            <button
              onClick={() => setCategory("movil")}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={
                category === "movil"
                  ? { background: "#DA291C", color: "#fff" }
                  : { color: "#2D2D2D" }
              }
            >
              <Smartphone size={16} />
              Plan Móvil
            </button>
          </nav>

          {/* Derecha */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-2 p-2 rounded-full transition-all hover:bg-gray-100"
              title="Panel Administrativo"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: isLoggedIn ? "#DA291C" : "#2D2D2D" }}
              >
                {isLoggedIn ? <User size={16} /> : <User size={16} />}
              </div>
            </button>
            
            {/* Hamburguesa mobile */}
            <button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-4 flex flex-col gap-2">
          <button
            onClick={() => { setCategory("hogar"); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
            style={
              category === "hogar"
                ? { background: "#DA291C", color: "#fff" }
                : { background: "#F5F5F5", color: "#2D2D2D" }
            }
          >
            <Home size={18} />
            Plan Hogar
          </button>
          <button
            onClick={() => { setCategory("movil"); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
            style={
              category === "movil"
                ? { background: "#DA291C", color: "#fff" }
                : { background: "#F5F5F5", color: "#2D2D2D" }
            }
          >
            <Smartphone size={18} />
            Plan Móvil
          </button>
        </div>
      )}
    </header>
  );
}
