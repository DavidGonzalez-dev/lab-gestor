import { useState } from "react"
import {Button, Modal } from "@shared/components"
import { EditIcon, TrashIcon,ArrowBackIcon } from "@shared/iconos"
import { EditarOrganismos} from '../editMicro/EditarOrganismo'
import Swal from "sweetalert2";
import {  EliminarOrganismo } from "../../services"
import styles from "./OrganismosCard.module.css"

export function ButtonAtras(Organismo){
  return (<Button variant={"buttonCancel"} parentMethod={() => window.location.href =`/productos/${Organismo.numeroRegistroProducto}`}>
          Atras
          <ArrowBackIcon />
        </Button>)
}

export function OrganismoCard({ Organismo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el Organismo de forma permanente.",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      heightAuto: false,
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await  EliminarOrganismo(Organismo.id);
          Swal.fire({
            title: "¡Se eliminó el Organismo con éxito!",
            icon: "success",
            heightAuto: false,
            scrollbarPadding: false,
          }).then(() => {
            window.location.href = "/productos";
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Hubo un error al eliminar el Organismo",
            text: err.message,
            heightAuto: false,
            scrollbarPadding: false,
          });
        }
      }
    });
  };
  return (
    <div>
      <p className={styles.nuemroR}><span className={styles.texto}>Numero registro producto: </span>{Organismo.numeroRegistroProducto}</p>
      <div className={styles.infoContainer}>
        <div className="row">

          <div className="col-lg-5">
            <p className={styles.contenido}>
              <span className={styles.texto}>Nombre Prueba: </span>
              <br />
              {Organismo.nombreMicroorganismo}
            </p>
            <p className={styles.contenido}>
              <span className={styles.texto}>Cantidad Muestra: </span>
              <br />
              {Organismo.cantidadMuestra}
            </p>
            <div>
              <p className={styles.contenido}>
                <span className={styles.texto}>Método: </span>
                <br />
                {Organismo.metodoUsado}
              </p>
              <p className={styles.contenido}>
                <span className={styles.texto}>Especificación: </span>
                <br />
                {Organismo.especificacion}
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <p className={styles.contenido}>
              <span className={styles.texto}>Tratamiento: </span>
              <br />
              {Organismo.tratamiento} 
            </p>
            <p className={styles.contenido}> 
              <span className={styles.texto}>Volumen Diluyente: </span>
              <br />
              {Organismo.volumenDiluyente}
            </p>
            <p className={styles.contenido}> 
              <span className={styles.texto}>Resultado: </span>
              {Organismo.resultado ? Organismo.resultado : "Sin resultado"}
            </p>
          </div>
        </div>

        <div className={`${styles.buttonContainer} mt-6`}>
          <Button variant="buttonCancel" parentMethod={handleDelete}>
            Eliminar <TrashIcon />
          </Button>

          <Button variant="buttonEdit" parentMethod={() => setIsModalOpen(true)}>
            Editar <EditIcon />
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Editar Organismo"
        >
          <EditarOrganismos data={Organismo} onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>

    </div>
  );
}