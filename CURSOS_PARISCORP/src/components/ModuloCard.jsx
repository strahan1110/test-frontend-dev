
import React, { useState } from "react";
import ClaseItem from "./ClaseItem";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ModuloCard = ({ modulo, onClassSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const clasesCompletadas = modulo.clases.filter(clase => clase.completado).length;
  const totalClases = modulo.clases.length;
  const progreso = totalClases > 0 ? Math.round((clasesCompletadas / totalClases) * 100) : 0;

  const handleClassClick = (clase) => {
    if (onClassSelect) {
      onClassSelect(clase);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{modulo.titulo}</h3>
            <p className="text-gray-600 text-sm">{modulo.descripcion}</p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={expanded ? "Colapsar módulo" : "Expandir módulo"}
          >
            {expanded ? (
              <ChevronUp className="text-gray-500" size={20} />
            ) : (
              <ChevronDown className="text-gray-500" size={20} />
            )}
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progreso</span>
            <span className="font-medium text-secondary">
              {clasesCompletadas} de {totalClases} clases
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500", 
                progreso === 100 ? "bg-green-500" : "bg-secondary"
              )}
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        {expanded && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <h4 className="font-medium text-gray-700 mb-3">Clases</h4>
            <div className="space-y-3">
              {modulo.clases.map((clase, index) => (
                <ClaseItem 
                  key={index} 
                  clase={clase} 
                  index={index}
                  onClick={handleClassClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuloCard;
