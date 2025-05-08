// src/components/Sidebar.jsx
import { Book, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-primary text-white fixed top-0 left-0 flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Cursos ParisCorp</h1>
        <nav className="flex flex-col gap-4">
          <Link to="/modulos" className="flex items-center gap-2 hover:text-secondary">
            <Book size={20} /> Módulos
          </Link>
        </nav>
      </div>
      <div className="p-6">
        <button className="flex items-center gap-2 hover:text-secondary">
          <LogOut size={20} /> Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
