import { createContext, useContext, useState, ReactNode } from "react";
import {
  Plan,
  Slide,
  FAQ,
  initialPlansHogar,
  initialPlansMovil,
  initialSlides,
  initialFAQs,
} from "../data/initialData";

type Category = "hogar" | "movil";

interface AppContextValue {
  category: Category;
  setCategory: (c: Category) => void;
  plansHogar: Plan[];
  setPlansHogar: (p: Plan[]) => void;
  plansMovil: Plan[];
  setPlansMovil: (p: Plan[]) => void;
  slides: Slide[];
  setSlides: (s: Slide[]) => void;
  faqs: FAQ[];
  setFaqs: (f: FAQ[]) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (v: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category>("hogar");
  const [plansHogar, setPlansHogar] = useState<Plan[]>(initialPlansHogar);
  const [plansMovil, setPlansMovil] = useState<Plan[]>(initialPlansMovil);
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{
        category,
        setCategory,
        plansHogar,
        setPlansHogar,
        plansMovil,
        setPlansMovil,
        slides,
        setSlides,
        faqs,
        setFaqs,
        isAdminOpen,
        setIsAdminOpen,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
