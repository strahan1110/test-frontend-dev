import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Book, LogOut, X } from "lucide-react";
import { logout } from "@/services/authenticationService";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { name: "Módulos", path: "/", icon: <Book size={20} /> },
  ];
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-white z-40 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        >
        </div>
      )}
      
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[280px] bg-gray-100",
          "transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Close Button */}
          <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={logout}
                >
                  <LogOut size={16} />
                  <span className=" sm:inline">Cerrar Sesión</span>
          </Button>

                
            
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                <X size={20} />
                <span className="sr-only">Cerrar menú </span>
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-xl transition-all",
                  location.pathname === item.path
                    ? "bg-secondary text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={isMobile ? toggleSidebar : undefined}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
          {/* Button to hide sidebar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute bottom-4 right-4 lg:hidden"
          >
            <X size={20} />
            <span className="sr-only">Cerrar menú </span>
          </Button>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
