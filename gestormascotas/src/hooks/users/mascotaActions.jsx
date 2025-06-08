import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const usePetActions = (getPets) => {
  const navigate = useNavigate();

  // Función para eliminar una mascota por su id
  const deletePet = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }
      toast.success("Mascota eliminada correctamente");
      console.log("Pet deleted:", response);
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Error al eliminar mascota");
    } finally {
      getPets(); // Actualiza la lista después
    }
  };

  // Función para redirigir a la edición de una mascota
  const handleUpdatePet = (id) => {
    navigate(`/pets/${id}`);
  };

  return {
    deletePet,
    handleUpdatePet,
  };
};

export default usePetActions;