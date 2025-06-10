import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

const useFetchMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las mascotas
  const getMascotas = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener mascotas");
      }
      const data = await response.json();
      setMascotas(data);
      setError(null);
      return data;
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
      setError(error.message);
      toast.error("No se pudieron cargar las mascotas");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Obtener una mascota por ID
  const getMascotaById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la mascota");
      }
      const data = await response.json();
      setError(null);
      return data;
    } catch (error) {
      console.error("Error al obtener la mascota:", error);
      setError(error.message);
      toast.error("No se pudo cargar la mascota");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva mascota
  const createMascota = async (mascotaData) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mascotaData),
      });

      if (!response.ok) {
        throw new Error("Error al crear mascota");
      }

      const data = await response.json();
      setMascotas(prev => [...prev, data]);
      toast.success("Mascota creada exitosamente");
      return data;
    } catch (error) {
      console.error("Error al crear mascota:", error);
      setError(error.message);
      toast.error("Error al crear mascota");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar mascota existente
  const updateMascota = async (id, mascotaData) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mascotaData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar mascota");
      }

      const data = await response.json();
      setMascotas(prev => 
        prev.map(m => m.id === id ? data : m)
      );
      toast.success("Mascota actualizada exitosamente");
      return data;
    } catch (error) {
      console.error("Error al actualizar mascota:", error);
      setError(error.message);
      toast.error("Error al actualizar mascota");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar mascota
  const deleteMascota = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar mascota");
      }

      setMascotas(prev => prev.filter(m => m.id !== id));
      toast.success("Mascota eliminada exitosamente");
      return true;
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
      setError(error.message);
      toast.error("Error al eliminar mascota");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMascotas();
  }, []);

  return {
    mascotas,
    loading,
    error,
    getMascotaById,
    getMascotas,
    createMascota,
    updateMascota,
    deleteMascota,
    setMascotas,
  };
};

export default useFetchMascotas;