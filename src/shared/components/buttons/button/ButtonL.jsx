import React, { useState } from "react";
import Button from "./Button";
import ArrowBack from "@shared/iconos/arrow-back.astro";
import Check from "@shared/iconos/check";
import Trash from "@shared/iconos/Trash";

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
        className="accept-button"
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
