import { useState } from "react";
import { Button } from "@shared/components/buttons/button/Button";
import { AnalistaIcon, AdminIcon, TrashIcon, CheckIcon } from "@shared/iconos";

const VerUsuarios = ({ data }) => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (label) => {
    setClickedButton(label);
    console.log(`Botón presionado: ${label}`, data);
  };

  return (
    <div>
      <Button
        parentMethod={() => handleButtonClick("Ver")}
        type="button"
        variant="default"
      >
        Ver
      </Button>
    </div>
  );
};

const EliminarUsuario = ({ data }) => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (label) => {
    setClickedButton(label);
    console.log(`Botón presionado: ${label}`, data);
  };

  return (
    <div>
      <Button
        parentMethod={() => handleButtonClick("Eliminar")}
        type="button"
        variant="buttonCancel"
      >
        Eliminar
        <TrashIcon />
      </Button>
    </div>
  );
};

export { VerUsuarios, EliminarUsuario };
