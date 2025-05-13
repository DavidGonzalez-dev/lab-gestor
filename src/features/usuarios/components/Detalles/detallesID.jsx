import React, { useState } from "react";
import { PillType, PillState } from "@shared/components";
import styles from "./detalles.module.css";
import { Button } from "@shared/components";
import { TrashIcon } from "@shared/iconos";
import { EditUserModal } from "./editUser";

/// función para volver atrás
const redirectPrevious = () => {
  window.location.href = "/usuarios";
};

export function DetalleUsuario({ usuario }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    console.log("Guardado");
    setIsModalOpen(false);
  };

  return (
    <div className={styles.box}>
      <p>
        <strong className={styles.texts}>Nombres:</strong> {usuario.nombres}
      </p>
      <p>
        <strong className={styles.texts}>Apellidos:</strong> {usuario.apellidos}
      </p>
      <p>
        <strong className={styles.texts}>Correo:</strong> {usuario.correo}
      </p>
      <p>
        <strong className={styles.texts}>Rol:</strong>{" "}
        <PillType
          value={usuario.rol.NombreRol}
          variant={usuario.rol.NombreRol !== "admin" ? "lightBlue" : "darkBlue"}
        />
      </p>
      <p>
        <strong className={styles.texts}>Estado:</strong>{" "}
        <PillState
          estado={usuario.estado}
          variant={usuario.estado ? "green" : "red"}
        />
      </p>
      <p>
        <strong className={styles.texts}>Firma:</strong> {usuario.firma}
      </p>

      <div className={styles.buttonGroup}>
        <Button variant="buttonCancel" parentMethod={redirectPrevious}>
          Cancelar <TrashIcon />
        </Button>

        <Button variant="buttonEdit" parentMethod={() => setIsModalOpen(true)}>
          Editar
        </Button>
      </div>

      <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        usuario={usuario}
        onSave={handleSave}
      />
    </div>
  );
}
