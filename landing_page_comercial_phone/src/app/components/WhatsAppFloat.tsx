import { MessageCircle } from "lucide-react";

const WA_NUMBER = "541160262100";
const WA_MSG = encodeURIComponent("Hola! Me interesa conocer los planes disponibles.");

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
      style={{ background: "#25D366" }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} style={{ color: "#fff" }} />
      <span
        className="text-sm font-bold overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300 whitespace-nowrap"
        style={{ color: "#fff" }}
      >
        ¡Hablá con un asesor!
      </span>
    </a>
  );
}
