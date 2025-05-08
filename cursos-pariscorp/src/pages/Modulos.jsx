import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getModulos, isAuthenticated, logout } from "@/services/authenticationService";
import ModuloCard from "@/components/ModuloCard";
import { LogOut, Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Modulos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClase, setSelectedClase] = useState(null);
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
      return;
    }

    const loadModulos = async () => {
      try {
        const data = await getModulos();
        setModulos(data);
      } catch (error) {
        console.error("Error al cargar módulos:", error);
        toast({
          title: "Error al cargar los módulos",
          description: "Hubo un problema al obtener los módulos. Por favor, intenta de nuevo más tarde.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadModulos();
  }, [navigate, toast]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Calculate general statistics
  const totalModulos = modulos.length;
  const totalClases = modulos.reduce((acc, modulo) => acc + modulo.clases.length, 0);
  const clasesCompletadas = modulos.reduce((acc, modulo) => {
    return acc + modulo.clases.filter(clase => clase.completado).length;
  }, 0);
  const progresoGeneral = totalClases > 0 ? Math.round((clasesCompletadas / totalClases) * 100) : 0;

  const handleClassSelect = (clase) => {
    setSelectedClase(clase);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white w-full rounded-b-2xl shadow-xl">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xl font-bold text-secondary flex items-center gap-2">
              <img src="cap.svg" alt="Logo" className="w-10 h-10 " />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              <span className="hidden sm:inline">Módulos</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 bg-white hover:bg-red-100 hover:text-red-500 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`flex-1 flex ${isMobile ? 'flex-col' : 'flex-row'} w-full`}>
        {/* Video Content */}
        <div className={`${isMobile ? 'w-full' : sidebarOpen ? 'w-3/5' : 'w-full'}`}>
          <div className="h-full flex flex-col p-4">
            {selectedClase ? (
              <div className="space-y-4">
                <div className="relative aspect-video shadow-lg bg-black">
                  <iframe
                    src={selectedClase.video}
                    title="YouTube video player"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
                  ></iframe>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">{selectedClase.titulo}</h3>
                  <p className="text-sm text-gray-600">{selectedClase.descripcion}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Selecciona una clase para ver su video</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Modules List */}
        {sidebarOpen && (
          <div className={`${isMobile ? 'w-full border-t border-gray-200' : 'w-2/5 border-l border-gray-200'} bg-white shadow-lg`}>
            <div className="p-4 space-y-6">
              {/* Progress Summary */}
              <div className="space-y-6">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <h3 className="font-medium text-gray-900">Progreso General</h3>
                  <span className="text-sm text-gray-600">{progresoGeneral}%</span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="absolute top-0 left-0 bg-primary h-2 rounded-full" 
                    style={{ width: `${progresoGeneral}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" size="sm" className="border border-gray-200 rounded-xl hover:bg-secondary">
                    <p className="text-gray-500">Módulos</p>
                    <p className="font-medium text-gray-500">{totalModulos}</p>
                  </Button>
                  <Button variant="ghost" size="sm" className="border border-gray-200 rounded-xl hover:bg-secondary">
                    <p className="text-gray-300">Clases</p>
                    <p className="font-medium text-gray-300">{clasesCompletadas}/{totalClases}</p>
                  </Button>
                </div>

                <div className="mt-6 p-2 border-b border-primary"></div>
              </div>

              {/* Module list */}
              <div className="space-y-6 overflow-y-auto">
                {loading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {modulos.length > 0 ? (
                      modulos.map((modulo, index) => (
                        <ModuloCard
                          key={index}
                          modulo={modulo}
                          onClassSelect={handleClassSelect}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <div className="mx-auto h-24 w-24 text-gray-400">
                          <img src="cap.svg" alt="Logo" className="w-10 h-10 text-secondary" />
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No hay módulos disponibles</h3>
                        <p className="mt-1 text-gray-500">No se encontraron módulos para mostrar.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ParisCorp Cursos. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Modulos;