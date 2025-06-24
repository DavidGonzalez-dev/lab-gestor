import styles from "./modal.module.css";
import { CloseIcon } from "@shared/iconos";

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Capa de fondo para el modal
    <div className={styles.overlay}>
      {/* Contenido del modal */}
      <div className={styles.modal}>

        {/* Encabezado del modal con título y botón de cierre */}
        <div className={styles.header}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}><CloseIcon /></button>
        </div>
        <hr />

        {/* Contenido del modal */}
        <div className={styles.content}>
          {children}
        </div>

      </div>
    </div>
  );
};