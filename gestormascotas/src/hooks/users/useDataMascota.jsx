import { useEffect } from "react";
import { url } from "../../utils/apiUrl"; // URL de la API
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchUser from "./useFetchUsers";

const useDataMascota = (methods) => {
  const { getUserById, getUsers } = useFetchUser();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const saveMascota = async (dataForm) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });

      if (!response.ok) {
        toast.error("No se pudo agregar la mascota");
        throw new Error("Error al guardar");
      }

      toast.success("Mascota guardada con éxito");
      navigate("/home");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      reset();
      getUsers();
    }
  };

  const editMascota = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });

      if (!response.ok) {
        toast.error("No se pudo actualizar la mascota");
        throw new Error("Error al actualizar");
      }

      toast.success("Mascota actualizada con éxito");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      reset();
      getUsers();
    }
  };

  const handleMascotaAction = (dataForm) => {
    if (id) {
      editMascota(dataForm);
    } else {
      saveMascota(dataForm);
    }
  };

  const handleUpdateMascota = (id) => {
    navigate(`/users/${id}`);
  };

  const loadMascota = async () => {
    if (id) {
      const mascota = await getUserById(id);
      if (mascota) {
        reset({
          edad: mascota?.edad,
          raza: mascota?.raza,
          especie: mascota?.especie,
          mascota: mascota?.mascota,
          propietario: mascota?.propietario,
        });
      }
    }
  };

  useEffect(() => {
    loadMascota();
  }, [id]);

  return {
    register,
    handleSubmit: handleSubmit(handleMascotaAction),
    errors,
    getUserById,
    handleUpdateMascota,
    loadMascota,
  };
};

export default useDataMascota;