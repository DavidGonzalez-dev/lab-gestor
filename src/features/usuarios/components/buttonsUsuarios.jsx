import { useState } from "react";
import Button from "@shared/components/buttons/button/Button";
import { plus } from "@shared/iconos/Icono-plus";
import { eye } from "@shared/iconos/Icono-eye";

const RegistrarUsuario = () => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (label) => {
    setClickedButton(label);
    console.log(`Botón presionado: ${label}`);
  };

  return (
    <div>
      <Button
        label="Registrar Usuario"
        parentMethod={() => handleButtonClick("Aceptar")}
        type="button"
        className="button-accept"
        Icon={plus}
      />
    </div>
  );
};
const VerUsuarios = () => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (label) => {
    setClickedButton(label);
    console.log(`Botón presionado: ${label}`);
  };

  return (
    <div>
      <Button
        label="Ver"
        parentMethod={() => handleButtonClick("Aceptar")}
        type="button"
        className="button"
        Icon={eye}
      />
    </div>
  );
};

export { RegistrarUsuario, VerUsuarios };
