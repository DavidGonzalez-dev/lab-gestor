import React, { useState } from "react";
import styles from "./detalles.module.css";
import { Button } from "@shared/components";
import { TrashIcon } from "@shared/iconos";
import { EditClientModal } from "./editClient";

/// función para volver atrás
const redirectPrevious = () => {
  window.location.href = "/clientes";
};

export function DetalleClient({ cliente }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    console.log("Guardado");
    setIsModalOpen(false);
  };
  console.log(isModalOpen);
  return (
    <div className={styles.box}>
      <p>
        <strong>Nombres:</strong> {cliente.nombre}
      </p>
      <p>
        <strong>Direccion:</strong> {cliente.direccion}
      </p>

      <div className={styles.buttonGroup}>
        <Button variant="buttonCancel" parentMethod={redirectPrevious}>
          Cancelar <TrashIcon />
        </Button>

        <Button variant="buttonEdit" parentMethod={() => setIsModalOpen(true)}>
          Editar
        </Button>
      </div>

      {/* 👇 Aquí montamos el modal */}
      <EditClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cliente={cliente}
      />
    </div>
  );
}
