import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";

const Welcome = ()=>{
    const [showWelcome, setShowWelcome] = useState(true);
    const navigate = useNavigate();
    const handleAcepted = ()=>{
        setShowWelcome(false);
        navigate("/mascotas");
    };

    if (!showWelcome) return null;

    return(
       <div className="flex items-center justify-center min-h-screen bg-gray-100">

  <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center border-2 border-green-500">

    <Title text="Bienvenido a la veterinaria Amigos Peludos" />

    <p className="mb-6 text-gray-700">¡Gracias por confiar en nosotros!</p>

    <Button type="button" onClick={handleAcepted} text="Ingresar" />
  </div>
</div>
    );
}
 export default Welcome;