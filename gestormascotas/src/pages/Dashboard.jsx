import { Link } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";
import useFetchMascotas from "../hooks/users/useFetchMascota";
import usePetActions from "../hooks/users/mascotaActions";

const Dashboard = () => {
  const { mascotas, getMascotas } = useFetchMascotas();
  const { deletePet, handleUpdatePet } = usePetActions(getMascotas);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/pets"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-full text-center hover:bg-green-200 transition-colors block"
      >
        Agregar Mascota
      </Link>

      <Title text="Lista de Mascotas" />

      <p className="mt-1 text-sm text-gray-600 mb-4">
        Gestión de todas las mascotas registradas.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="px-4 py-2 border-b">Mascota</th>
              <th className="px-4 py-2 border-b">Edad</th>
              <th className="px-4 py-2 border-b">Raza</th>
              <th className="px-4 py-2 border-b">Especie</th>
              <th className="px-4 py-2 border-b">Propietario</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas?.map((mascota) => (
              <tr
                key={mascota.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{mascota.mascota}</td>
                <td className="px-4 py-2">{mascota.edad}</td>
                <td className="px-4 py-2">{mascota.raza}</td>
                <td className="px-4 py-2">{mascota.especie}</td>
                <td className="px-4 py-2">{mascota.propietario}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button text="Editar" onClick={() => handleUpdatePet(mascota.id)} />
                  <Button text="Eliminar" onClick={() => deletePet(mascota.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;