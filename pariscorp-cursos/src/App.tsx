
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Modulos from "./pages/Modulos";

const queryClient = new QueryClient();

// Componente para rutas protegidas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('auth_token');
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/modulos" 
            element={
              <ProtectedRoute>
                <Modulos />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
