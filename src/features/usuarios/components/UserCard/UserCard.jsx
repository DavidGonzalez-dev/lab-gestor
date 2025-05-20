import { useState } from "react"
import { PillType, PillState } from "@shared/components"
import styles from "./UserCard.module.css"
import { Button } from "@shared/components"
import { ArrowBackIcon, EditIcon } from "@shared/iconos"
import { EditUserModal } from "../EditUserForm/EditUserForm"

/// función para volver atrás
const redirectPrevious = () => {
  window.location.href = "/usuarios"
};

export function DetalleUsuario({ usuario }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSave = () => {
    setIsModalOpen(false)
  };

  return (
    <div className={styles.mainContainer}>

      {/* Contenido de la tarjeta */}
      <div className={styles.box}>

        {/* Contedor con informacion de texto plano */}
        <div className={styles.infoContainer}>

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
              <strong className={styles.texts}>Firma:</strong> {usuario.firma}
            </p>


          {/* Contenedor de los estados con pildora */}
            <p>
              <strong className={styles.texts}>Rol:</strong>{" "}
              <PillType
                value={usuario.rol.nombreRol}
                variant={usuario.rol.nombreRol !== "admin" ? "lightBlue" : "darkBlue"}
              />
            </p>
            <p>
              <strong className={styles.texts}>Estado:</strong>{" "}
              <PillState
                value={usuario.estado}
                variant={usuario.estado ? "green" : "red"}
              />
            </p>
        </div>


        {/* Modal para editar el usuario */}
        <EditUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          usuario={usuario}
          onSave={handleSave}
        />
      </div>

      {/* Contenedor de botones de accion */}
      <div className={styles.buttonGroup}>
        <Button variant="buttonCancel" parentMethod={redirectPrevious}>
          Atras <ArrowBackIcon />
        </Button>

        <Button variant="buttonEdit" parentMethod={() => setIsModalOpen(true)}>
          Editar <EditIcon/>
        </Button>
      </div>
    </div>
  );
}
