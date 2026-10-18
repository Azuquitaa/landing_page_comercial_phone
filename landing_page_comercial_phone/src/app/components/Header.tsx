import { useState } from "react";
import { Home, Smartphone, User, Menu, X, Building2 } from "lucide-react";
import { useApp } from "../context/AppContext";

import logoPorta from '@/assets/logo-porta.png'
import logoClaro from '@/assets/logo_claro.png'

export function Header() {
  const { category, setCategory, setIsAdminOpen, isLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      style={{ borderBottom: "3px solid #DA291C" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/*  LOGOS IZQUIERDA - Más pequeño */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <img
              src={logoPorta}
              alt="Porta Empresas Pueyrredón"
              className="h-10 sm:h-12 w-auto"
            />
            
            <div className="flex flex-col leading-none">
              <span
                className="text-[8px] sm:text-[10px] font-bold tracking-widest uppercase"
                style={{ color: "#DA291C" }}
              >
                agente oficial claro
              </span>
              <span
                className="text-xs sm:text-sm font-black tracking-tight"
                style={{ color: "#2D2D2D" }}
              >
                Comercial Phone
              </span>
            </div>
            
            <div
              className="w-px h-6 sm:h-8 hidden sm:block mx-0.5"
              style={{ background: "#E6E6E6" }}
            />
            
            <div className="hidden sm:flex flex-col items-center leading-none">
              <img
                src={logoClaro}
                alt="Claro Comercializadora Empresas"
                className="h-8 sm:h-10 w-auto"
              />
              <span
                className="text-[8px] sm:text-[10px] font-bold mt-0.5"
                style={{ color: "#DA291C" }}
              >
                Comercializadora
              </span>
            </div>
          </div>

          {/* SELECTOR DE PLANES - Centrado */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-100 rounded-full p-1 absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => setCategory("hogar")}
              className="flex items-center gap-2 px-4 xl:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
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
              className="flex items-center gap-2 px-4 xl:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={
                category === "movil"
                  ? { background: "#DA291C", color: "#fff" }
                  : { color: "#2D2D2D" }
              }
            >
              <Smartphone size={16} />
              Plan Móvil
            </button>
            <button
              onClick={() => setCategory("pymes")}
              className="flex items-center gap-2 px-4 xl:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={
                category === "pymes"
                  ? { background: "#DA291C", color: "#fff" }
                  : { color: "#2D2D2D" }
              }
            >
              <Building2 size={16} />
              Plan Pymes
            </button>
          </div>

          {/* DERECHA - Admin panel oculto */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-1.5 rounded-full transition-all hover:bg-gray-100 opacity-30 hover:opacity-100"
              title="Panel Administrativo"
              style={{ color: "#aaa" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs"
                style={{ background: isLoggedIn ? "#DA291C" : "#ccc" }}
              >
                <User size={13} />
              </div>
            </button>
            
            <button
              className="lg:hidden p-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 px-4 py-4 flex flex-col gap-2">
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
          <button
            onClick={() => { setCategory("pymes"); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
            style={
              category === "pymes"
                ? { background: "#DA291C", color: "#fff" }
                : { background: "#F5F5F5", color: "#2D2D2D" }
            }
          >
            <Smartphone size={18} />
            Plan Pymes
          </button>
          
          <div className="border-t border-gray-200 mt-2 pt-2 flex flex-col gap-1">
            <a href="#planes" className="px-4 py-2 text-sm hover:bg-gray-50 rounded-lg">Planes</a>
            <a href="#beneficios" className="px-4 py-2 text-sm hover:bg-gray-50 rounded-lg">Beneficios</a>
            <a href="#faqs" className="px-4 py-2 text-sm hover:bg-gray-50 rounded-lg">FAQ</a>
            <a href="#contacto" className="px-4 py-2 text-sm hover:bg-gray-50 rounded-lg">Contacto</a>
          </div>
        </div>
      )}
    </header>
  );
}