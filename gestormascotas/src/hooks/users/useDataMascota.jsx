import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchMascotas from "./useFetchMascota";

const useDataMascota = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { 
    getMascotaById, 
    createMascota, 
    updateMascota,
    loading 
  } = useFetchMascotas();
  
  const methods = useForm({
    defaultValues: {
      mascota: "",
      edad: "",
      raza: "",
      especie: "",
      propietario: ""
    }
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue
  } = methods;

  const loadMascota = async () => {
    if (!id) return;
    
    try {
      const mascota = await getMascotaById(id);
      if (mascota) {
        // Establece los valores del formulario
        Object.entries(mascota).forEach(([key, value]) => {
          setValue(key, value);
        });
      }
    } catch (error) {
      toast.error("Error al cargar los datos de la mascota");
      console.error("Error loading pet data:", error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      if (id) {
        // Modo edición
        await updateMascota(id, formData);
        toast.success("Mascota actualizada correctamente");
      } else {
        // Modo creación
        await createMascota(formData);
        toast.success("Mascota creada correctamente");
      }
      navigate("/mascotas"); // Redirige a la lista de mascotas
    } catch (error) {
      toast.error("Error al guardar los datos");
      console.error("Error saving pet:", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    loading,
    loadMascota,
    onSubmit,
    reset,
    methods
  };
};

export default useDataMascota;