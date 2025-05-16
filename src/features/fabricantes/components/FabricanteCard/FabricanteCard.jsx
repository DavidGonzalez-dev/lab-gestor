import { useState } from "react";
import { Button } from "@shared/components";
import { ArrowBackIcon, EditIcon } from "@shared/iconos";
import { FabricanteEditForm } from "../FabricanteEditForm/FabricanteEditForm";

import styles from "./FabricanteCard.module.css";

export function FabricanteCard({ fabricante }) {
  
    const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className={styles.mainContainer}>

      {/* Contenedor de la informacion */}
      <div className={styles.infoContainer}>
        <p>
          <strong>Nombres:</strong> {fabricante.nombre}
        </p>
        <p>
          <strong>Direccion:</strong> {fabricante.direccion}
        </p>


        {/* 👇 Aquí montamos el modal */}
        <FabricanteEditForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fabricante={fabricante}
        />
      </div>

      {/* Contenedor de los botones */}
      <div className={styles.buttonContainer}>

        <Button variant={"buttonCancel"} parentMethod={() => window.location.href = "/fabricantes"}>
          Atras
          <ArrowBackIcon />
        </Button>

        <Button variant="buttonEdit" parentMethod={() => setIsModalOpen(true)}>
          Editar
          <EditIcon/>
        </Button>

      </div>
    </div>
  );
}