import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
const WA_NUMBER = "541160262100";
const WA_MSG = encodeURIComponent("Hola! Me interesa conocer los planes disponibles.");

export function Footer() {
  return (
    <footer style={{ background: "#1a1a1a" }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span
                className="text-xs font-bold tracking-widest uppercase block"
                style={{ color: "#DA291C" }}
              >
                agente oficial claro
              </span>
              <span className="text-2xl font-black" style={{ color: "#fff" }}>
                Comercial Phone
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#888" }}>
              Conectamos personas con la mejor experiencia en internet, telefonía móvil y entretenimiento.            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#888" }}>
               Horario de atención lunes a viernes de 9:00 a 18:00
            </p>
            
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/comercial.phone.corporativo_?igsh=NW5mM3lzZWMwdjV5" },
                { Icon: Facebook, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Planes */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#fff" }}>
              Planes
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                  "Internet Fibra Óptica",
                  "Internet + TV",
                  "Portabilidad Claro",
                  "Línea Nueva",
                  "Beneficios",
                  "Preguntas Frecuentes"
                ].map((p) => (
                <li key={p}>
                  <a href="#planes" className="text-sm transition-colors hover:text-white" style={{ color: "#888" }}>
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#fff" }}>
              Contacto
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#DA291C" }} />
                <span className="text-sm" style={{ color: "#888" }}>
                  Av. Corrientes 1234, Piso 5<br />
                  Buenos Aires, Argentina
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="flex-shrink-0" style={{ color: "#DA291C" }} />
                <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`} className="text-sm hover:text-white transition-colors" style={{ color: "#888" }}>
                  +54 1160262100
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="flex-shrink-0" style={{ color: "#DA291C" }} />
                <a 
                  href="mailto:contacto@comercialphone.com.ar" 
                  className="text-sm hover:text-white transition-colors" 
                  style={{ color: "#888" }}
                >
                  contacto@comercialphone.com.ar
                </a>
              </li>
            </ul>
          </div>

          {/* Mapa */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#fff" }}>
              Ubicación
            </h4>
            <div className="rounded-xl overflow-hidden" style={{ height: "160px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26271.76940239565!2d-58.411380451171876!3d-34.60368439999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20CABA!5e0!3m2!1ses!2sar!4v1715817600000"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-4 py-4"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "#555" }}>
            © 2024 Comercial Phone — Comercializadora Empresas Claro. Todos los derechos reservados.
          </p>
          
          <p className="text-xs" style={{ color: "#555" }}>
            Página web Desarrollada por <a href="https://api.whatsapp.com/send/?phone=542236883110&text&type=phone_number&app_absent=0">IkuroSoft</a>
          </p>
          
          <p className="text-xs" style={{ color: "#555" }}>
            Distribuidor Oficial Autorizado de Claro Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
