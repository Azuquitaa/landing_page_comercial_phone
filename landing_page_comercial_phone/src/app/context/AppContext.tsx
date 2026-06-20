import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

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
  currentUser: User | null;
  users: User[];
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
  addUser: (username: string, password: string, role: 'admin' | 'editor') => Promise<boolean>;
  removeUser: (userId: string) => Promise<boolean>;
  saveContent: () => Promise<boolean>;
  resetContent: () => Promise<boolean>;      // ← NUEVO
  createBackup: () => Promise<boolean>;       // ← NUEVO
  restoreBackup: () => Promise<boolean>;      // ← NUEVO
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextValue | null>(null);

const API_URL = window.location.origin + '/api';

export function AppProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category>("movil");
  const [plansHogar, setPlansHogar] = useState<Plan[]>(initialPlansHogar);
  const [plansMovil, setPlansMovil] = useState<Plan[]>(initialPlansMovil);
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContentFromServer();
    
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('current_user');
    if (savedToken && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsLoggedIn(true);
        setAuthToken(savedToken);
      } catch (e) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin' && authToken) {
      loadUsers();
    }
  }, [currentUser, authToken]);

  async function loadContentFromServer() {
    try {
      const response = await fetch(`${API_URL}/data.php`);
      if (response.ok) {
        const data = await response.json();
        // Si el servidor tiene datos, usarlos
        if (data.plansHogar && data.plansHogar.length > 0) {
          setPlansHogar(data.plansHogar);
        }
        if (data.plansMovil && data.plansMovil.length > 0) {
          setPlansMovil(data.plansMovil);
        }
        if (data.slides && data.slides.length > 0) {
          setSlides(data.slides);
        }
        if (data.faqs && data.faqs.length > 0) {
          setFaqs(data.faqs);
        }
        console.log('✅ Datos cargados del servidor');
      }
    } catch (err) {
      console.log('ℹ️ Usando datos locales (initialData.ts)');
    } finally {
      setLoading(false);
    }
  }

  // ✅ CREAR BACKUP: Guarda estado actual como respaldo
  async function createBackup(): Promise<boolean> {
    if (!authToken) return false;
    
    try {
      const response = await fetch(`${API_URL}/backup.php?action=backup`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      if (response.ok) {
        console.log('✅ Backup creado exitosamente');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error creando backup:', err);
      return false;
    }
  }

  // ✅ RESTAURAR BACKUP: Vuelve al último backup
  async function restoreBackup(): Promise<boolean> {
    if (!authToken) return false;
    
    try {
      const response = await fetch(`${API_URL}/backup.php?action=restore`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      if (response.ok) {
        // Recargar datos del servidor
        await loadContentFromServer();
        console.log('✅ Backup restaurado exitosamente');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error restaurando backup:', err);
      return false;
    }
  }

  // ✅ RESET: Volver a initialData.ts (valores originales)
  async function resetContent(): Promise<boolean> {
    if (!authToken) return false;
    
    try {
      const response = await fetch(`${API_URL}/backup.php?action=reset`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      if (response.ok) {
        // Volver a los valores iniciales
        setPlansHogar(initialPlansHogar);
        setPlansMovil(initialPlansMovil);
        setSlides(initialSlides);
        setFaqs(initialFAQs);
        console.log('✅ Contenido reseteado a valores originales');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error reseteando contenido:', err);
      return false;
    }
  }

  async function login(username: string, password: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/auth.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        setAuthToken(data.token);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('current_user', JSON.stringify(data.user));
        
        // ✅ Al iniciar sesión, crear backup automático
        await createBackup();
        console.log('🔒 Sesión iniciada y backup creado');
        
        return data.user;
      }
      return null;
    } catch (err) {
      console.error('Error en login:', err);
      return null;
    }
  }

  async function logout() {
    // ✅ Al cerrar sesión, guardar estado actual en el servidor
    if (authToken) {
      await saveContent();
    }
    
    setCurrentUser(null);
    setIsLoggedIn(false);
    setAuthToken(null);
    setIsAdminOpen(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    console.log('👋 Sesión cerrada. Datos guardados.');
  }

  async function saveContent(): Promise<boolean> {
    if (!authToken) {
      console.error('No hay token de autenticación');
      return false;
    }

    try {
      const content = {
        plansHogar,
        plansMovil,
        slides,
        faqs
      };

      const response = await fetch(`${API_URL}/data.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(content)
      });

      if (response.ok) {
        console.log('✅ Contenido guardado en el servidor');
        return true;
      } else {
        console.error('Error del servidor al guardar');
        return false;
      }
    } catch (err) {
      console.error('Error guardando datos:', err);
      return false;
    }
  }

  async function loadUsers() {
    if (!authToken) return;
    
    try {
      const response = await fetch(`${API_URL}/users.php`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Error cargando usuarios:', err);
    }
  }

  async function addUser(username: string, password: string, role: 'admin' | 'editor'): Promise<boolean> {
    if (!authToken || currentUser?.role !== 'admin') return false;

    try {
      const response = await fetch(`${API_URL}/users.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ username, password, role })
      });

      if (response.ok) {
        await loadUsers();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error agregando usuario:', err);
      return false;
    }
  }

  async function removeUser(userId: string): Promise<boolean> {
    if (!authToken || currentUser?.role !== 'admin') return false;
    if (userId === currentUser?.id) return false;

    try {
      const response = await fetch(`${API_URL}/users.php?id=${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });

      if (response.ok) {
        await loadUsers();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      return false;
    }
  }

  const value: AppContextValue = {
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
    currentUser,
    users,
    login,
    logout,
    addUser,
    removeUser,
    saveContent,
    resetContent,       // ← NUEVO
    createBackup,       // ← NUEVO
    restoreBackup,      // ← NUEVO
    loading,
    error
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}