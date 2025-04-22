import React, { useState } from "react";
import Button from "./Button";
import { Check } from "@shared/iconos/Icono-check";
import Trash from "@shared/iconos/Icono-Trash";

const SmartButtons = () => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (label) => {
    setClickedButton(label);
    console.log(`Botón presionado: ${label}`);
  };

  return (
    <div>
      <Button
        lable="Aceptar"
        parentMethod={() => handleButtonClick("Aceptar")}
        type="button"
        className="button"
        Icon={Check}
      />
      <Button
        lable="Eliminar"
        parentMethod={() => handleButtonClick("Cancelar")}
        type="button"
        className="cancel-button"
        Icon={Trash}
      />
      {clickedButton && <p>Botón presionado: {clickedButton}</p>}
    </div>
  );
};

export default SmartButtons;
