import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Mascotas from "./pages/Macotas"; // Formulario para agregar/editar mascotas
import NotFound from "./pages/pagenotFoun";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/mascotas" element={<Dashboard />} />
          <Route path="/pets/:id?" element={<Mascotas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "16px",
          },
        }}
      />
    </>
  );
}

export default App;