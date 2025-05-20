import { useState } from "react";
import styles from "./ClientCard.module.css";
import { Button } from "@shared/components";
import { ArrowBackIcon, EditIcon } from "@shared/iconos";
import { EditClientModal } from "../ClientEditForm/ClientEditForm";

export function ClientCard({ cliente }) {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className={styles.mainContainer}>

      {/* Contenedor de la informacion */}
      <div className={styles.infoContainer}>
        <p>
          <strong>Nombres:</strong> {cliente.nombre}
        </p>
        <p>
          <strong>Direccion:</strong> {cliente.direccion}
        </p>


        {/* 👇 Aquí montamos el modal */}
        <EditClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cliente={cliente}
        />
      </div>

      {/* Contenedor de los botones */}
      <div className={styles.buttonContainer}>

        <Button variant={"buttonCancel"} parentMethod={() => window.location.href = "/clientes"}>
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
