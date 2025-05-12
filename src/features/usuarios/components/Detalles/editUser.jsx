import React from "react";
import styles from "./editUser.module.css"; // Ahorita te paso sugerencia de este CSS

export function EditUser({ isOpen, onClose, usuario, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // aquí puedes capturar y enviar los cambios
    onSave();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nombre:
            <input type="text" defaultValue={usuario.nombres} />
          </label>
          <label>
            Apellidos:
            <input type="text" defaultValue={usuario.apellidos} />
          </label>
          <label>
            Correo:
            <input type="email" defaultValue={usuario.correo} />
          </label>
          <div className={styles.buttons}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancelar
            </button>
            <button type="submit" className={styles.save}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
