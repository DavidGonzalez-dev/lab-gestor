import { useState } from "react";
import Button from "./Button";
import { plus } from "@shared/iconos/Icono-plus";

const SmartButtons = () => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (label) => {
    setClickedButton(label);
    console.log(`Botón presionado: ${label}`);
  };

  return (
    <div>
      <Button
        label="Aceptar"
        parentMethod={() => handleButtonClick("Aceptar")}
        type="button"
        className="button"
        Icon={Check}
      />
      <Button
        label="Eliminar"
        parentMethod={() => handleButtonClick("Cancelar")}
        type="button"
        className="cancel-button"
        Icon={Trash}
      />
      {clickedButton && <p>Botón presionado: {clickedButton}</p>}
    </div>
  );
};
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

export { SmartButtons, RegistrarUsuario };
