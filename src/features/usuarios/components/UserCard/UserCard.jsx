import styles from "./UserCard.module.css"
import { useState } from "react"
import useAuthStore from "@shared/stores/useAuthStore"

import { PillType, PillState, Modal } from "@shared/components"
import { Button } from "@shared/components"
import { ArrowBackIcon, EditIcon } from "@shared/iconos"
import { EditUserForm } from "../EditUserForm/EditUserForm"

/// función para volver atrás
const redirectPrevious = () => {
  window.location.href = "/usuarios"
};

export function DetalleUsuario({ usuario }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { userId } = useAuthStore()


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  };

  return (
    <div className={styles.mainContainer}>

      {/* Contenido de la tarjeta */}
      <div className={styles.box}>

        <div className={styles.header}>
          <h2>Informacion del Usuario</h2>
          <hr />
        </div>

        {/* Contedor con informacion de texto plano */}
        <div className="row">

          <div className="col-lg-6">
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
          </div>

          <div className="col-lg-6">
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

          {/* Contenedor de botones de accion */}
          <div className={styles.buttonGroup}>
            {userId !== usuario.documento &&
              <Button variant="buttonCancel" parentMethod={redirectPrevious}>
                Atras <ArrowBackIcon />
              </Button>
            }


            <Button variant="buttonEdit" parentMethod={() => setIsModalOpen(true)}>
              Editar <EditIcon />
            </Button>
          </div>
        </div>


        {/* Modal para editar el usuario */}
        <Modal isOpen={isModalOpen} onClose={toggleModal} title="Editar Usuario">
          <EditUserForm usuario={usuario} onClose={toggleModal} editMode={userId === usuario.documento ? "restricted" : "adminMode"} />
        </Modal>
      </div>


    </div>
  );
}
