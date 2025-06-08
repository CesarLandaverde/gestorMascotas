import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

const useFetchMascotas = () => {
  const [mascotas, setMascotas] = useState([]);

  // Obtener todas las mascotas
  const getMascotas = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener mascotas");
      }
      const data = await response.json();
      setMascotas(data);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
      toast.error("No se pudieron cargar las mascotas");
    }
  };

  // Obtener una mascota por ID
  const getMascotaById = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la mascota");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener la mascota:", error);
      toast.error("No se pudo cargar la mascota");
      return null;
    }
  };

  useEffect(() => {
    getMascotas();
  }, []);

  return {
    mascotas,
    getMascotaById,
    getMascotas,
  };
};

export default useFetchMascotas;