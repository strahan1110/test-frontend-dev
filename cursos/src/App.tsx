import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Modulos from "./pages/Modulos";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

function AppWrapper() {
  const location = useLocation();
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token && token.length > 30; 
  };

console.log("Authentication status:", localStorage.getItem("token"));

  const showSidebar = location.pathname !== "/login";

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? "ml-64 w-full min-h-screen p-6" : "w-full min-h-screen p-6"}>
        <Routes>
          <Route
            path="/modulos"
            element={isAuthenticated ? <Modulos /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/modulos" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return <AppWrapper />;
}

export default App;

