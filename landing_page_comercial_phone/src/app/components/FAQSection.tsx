import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useApp } from "../context/AppContext";


export function FAQSection() {
  const { faqs } = useApp();
  const [open, setOpen] = useState<string | null>(null);
  const [showFaqs, setShowFaqs] = useState(false);

  return (
    <section className="py-12 px-4" style={{ background: "#E6E6E6" }}>
  <div className="max-w-3xl mx-auto text-center">

    <h2
      className="text-xl font-bold mb-3"
      style={{ color: "#2D2D2D" }}
    >
      ¿Tenés dudas?
    </h2>

    <button
      onClick={() => setShowFaqs(!showFaqs)}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all"
      style={{
        background: "#F5F5F5",
        color: "#2D2D2D",
        border: "1px solid #E6E6E6"
      }}
    >
      {showFaqs
        ? "Ocultar preguntas frecuentes"
        : "Ver preguntas frecuentes"}

      <ChevronDown
        size={18}
        style={{
          transform: showFaqs
            ? "rotate(180deg)"
            : "rotate(0deg)",
          transition: "0.3s"
        }}
      />
    </button>

    {showFaqs && (
      <div className="flex flex-col gap-3 mt-8">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="rounded-xl overflow-hidden transition-all duration-200"
            style={{
              border:
                open === faq.id
                  ? "2px solid #DA291C"
                  : "2px solid #E6E6E6"
            }}
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() =>
                setOpen(open === faq.id ? null : faq.id)
              }
            >
              <span
                className="text-sm font-semibold"
                style={{ color: "#2D2D2D" }}
              >
                {faq.question}
              </span>

              <ChevronDown
                size={18}
                style={{
                  color: "#DA291C",
                  transform:
                    open === faq.id
                      ? "rotate(180deg)"
                      : "rotate(0deg)"
                }}
              />
            </button>

            {open === faq.id && (
              <div
                className="px-5 pb-4 text-sm"
                style={{ color: "#717182" }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
</section>
  );
}
