
import { toast } from "@/components/ui/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

// Función para iniciar sesión y obtener el token JWT
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    const data = await response.json();
    
    // Guardar token en localStorage
    localStorage.setItem("auth_token", data.access_token);
    
    return data;
  } catch (error) {
    toast({
      title: "Error de autenticación",
      description: error.message || "No se pudo iniciar sesión. Por favor, intenta de nuevo.",
      variant: "destructive",
    });
    throw error;
  }
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem("auth_token");
  window.location.href = "/";
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem("auth_token");
};

// Función para obtener el token
export const getToken = () => {
  return localStorage.getItem("auth_token");
};

// Función para obtener todos los módulos
export const getModulos = async () => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }
    
    const response = await fetch(`${API_URL}/api/modulos`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al obtener los módulos");
    }

    return await response.json();
  } catch (error) {
    toast({
      title: "Error al cargar los módulos",
      description: error.message || "No se pudieron obtener los módulos. Por favor, intenta de nuevo.",
      variant: "destructive",
    });
    throw error;
  }
};
