import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "@/services/authenticationService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect to modules if already authenticated
    if (isAuthenticated()) {
      navigate("/modulos");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor ingresa tu nombre de usuario y contraseña",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await login(username, password);
      navigate("/modulos");
    } catch (error) {
      console.error("Error de login:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-primary-400">
      <div className="animate-fade-in absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[600px] min-w-[500px] min-h-[300px] m-auto p-8 bg-transparent rounded-3xl shadow-2xl transition-all duration-300">
        <div className="overflow-hidden">
          <div className="p-6 pt-16">
            <div className="flex items-center justify-center mb-10">
              <div className="animate-pulse mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20">
                <img src="cap.svg" alt="Logo" className="w-10 h-10 text-primary" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3 animate-slide-in-down">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario" 
                  className="pl-5 w-full border-gray-200 relative text-xs"
                  required
                  onFocus={(e) => e.target.placeholder = ''}
                  onBlur={(e) => e.target.placeholder = 'Ingresa tu usuario'}
                />
              </div>
              <div className="space-y-3 animate-slide-in-down">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*****" 
                    className="animate-fade-in duration-1000 pl-5 w-full border-gray-200 relative text-xs transition-opacity"
                    required
                    onFocus={(e) => e.target.placeholder = ''}
                    onBlur={(e) => e.target.placeholder = '*****'}
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center">
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ?  <Eye className="w-5 h-5 text-white" />:  <EyeOff className="w-5 h-5 text-white" />}
                    </button>
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                className="font-semibold text-sm text-black animate-pulse w-full bg-primary  text-white py-3 px-4 transition-all shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="relative inline-block text-left">
                      <span className="relative">Cargando...</span>
                      <span className="absolute top-0 -mt-2 ml-2">
                        <span className="h-2 w-2 rounded-full bg-secondary animate-ping"></span>
                      </span>
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="mr-2 h-5 w-5" />
                    Iniciar sesión
                  </span>
                )}
              </Button>
            </form>
            <div className="mt-8 text-center text-sm text-gray-500">
              <div className="bg-gray-50 py-3 px-4 rounded-lg">
                <p className="font-normal text-xs">Credenciales demo <b>usuario / contraseña</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 