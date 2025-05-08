import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Modulos() {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/modulos`);
        setModulos(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Sesión expirada");
          navigate("/login", { replace: true });
        } else {
          toast.error(`Error cargando módulos: ${error.response?.data?.message || error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    
    fetchModulos();
    
  }, [navigate]);

  if (loading) return <div className="min-h-screen bg-[#f7f9fc] p-6">Cargando módulos...</div>;

  return (
    <div className="min-h-screen bg-[#f7f9fc] p-6">
      {modulos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay módulos disponibles</p>
        </div>
      ) : (
        modulos.map((modulo) => (
          <div key={modulo.id || Math.random()} className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[#4b2aad]">{modulo.titulo || "Módulo sin título"}</h1>
            <p className="text-gray-700 mb-6">{modulo.descripcion || "Sin descripción"}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(modulo.clases || []).map((clase, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 shadow-sm border ${
                    clase.completado ? "bg-green-100 border-green-400" : "bg-white"
                  }`}
                >
                  <h2 className="text-xl font-semibold text-[#2b0c9c]">{clase.titulo || "Clase sin título"}</h2>
                  <p className="text-sm text-gray-600 mb-2">{clase.descripcion || "Sin descripción"}</p>
                  <p className="text-xs text-gray-500">Duración: {clase.duracion || "No especificada"}</p>

                  {clase.video_url && (
                    <div className="mt-2">
                      <video 
                        controls 
                        className="w-full rounded-md" 
                        poster={clase.thumbnail_url} 
                        preload="none" 
                        loading="lazy"
                      >
                        <source src={clase.video_url} type="video/mp4" />
                      </video>
                    </div>
                  )}

                  <p className="mt-2 text-sm">
                    Estado:{" "}
                    <span className={clase.completado ? "text-green-600" : "text-red-500"}>
                      {clase.completado ? "Completado" : "Pendiente"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Modulos;