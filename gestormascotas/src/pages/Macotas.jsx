import { useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import useDataMascota from "../hooks/users/useDataMascota";

const especieOptions = [
  { value: "Perro", label: "Perro" },
  { value: "Gato", label: "Gato" },
  { value: "Ave", label: "Ave" },
  { value: "Otro", label: "Otro" },
];

const Mascotas = () => {
  const { 
    register, 
    handleSubmit, 
    errors, 
    loading,
    loadMascota,
    onSubmit 
  } = useDataMascota();

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    loadMascota();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/mascotas"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-auto text-center hover:bg-green-200 transition-colors"
      >
        Volver al listado
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-b border-gray-900/10 pb-12 bg-white shadow-md rounded-lg flex flex-col p-4"
      >
        <Title text="Información de la Mascota" />

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <InputText
            type="text"
            name="mascota"
            label="Nombre de la Mascota"
            placeholder="Ej: Firulais"
            register={register}
            errors={errors}
            validation={{ required: "El nombre es obligatorio" }}
          />

          <InputText
            type="number"
            name="edad"
            label="Edad"
            placeholder="Edad en años"
            register={register}
            errors={errors}
            validation={{ 
              required: "La edad es obligatoria",
              min: { value: 0, message: "La edad no puede ser negativa" }
            }}
          />

          <InputText
            type="text"
            name="raza"
            label="Raza"
            placeholder="Ej: Labrador"
            register={register}
            errors={errors}
          />

          <SelectInput
            label="Especie"
            options={especieOptions}
            register={register}
            errors={errors}
            name="especie"
            validation={{ required: "La especie es obligatoria" }}
          />

          <InputText
            type="text"
            name="propietario"
            label="Propietario"
            placeholder="Nombre del dueño"
            register={register}
            errors={errors}
          />
        </div>

        <Button 
          type="submit" 
          text={loading ? "Guardando..." : "Guardar Mascota"}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Mascotas;