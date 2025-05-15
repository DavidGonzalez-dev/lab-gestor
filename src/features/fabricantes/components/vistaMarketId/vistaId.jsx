import React, { useState } from "react";
import styles from "./vistaId.module.css";
import { Button } from "@shared/components";
import { TrashIcon } from "@shared/iconos";
import { EditMarketModal } from "./editMarket";

/// función para volver atrás
const redirectPrevious = () => {
  window.location.href = "/fabricantes";
};

export function Vistamarket({ fabricante }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    console.log("Guardado");
    setIsModalOpen(false);
  };
  console.log(isModalOpen);
  return (
    <div className={styles.box}>
      <p>
        <strong>Nombres:</strong> {fabricante.nombre}
      </p>
      <p>
        <strong>Direccion:</strong> {fabricante.direccion}
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
      <EditMarketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fabricante={fabricante}
      />
    </div>
  );
}
