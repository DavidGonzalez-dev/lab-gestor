import { useState } from "react";
import {Button, Modal } from "@shared/components";
import { EditIcon, TrashIcon,ArrowBackIcon } from "@shared/iconos";
import { EditarRp } from "../editarRP/EditarPruebaRecuento";
import Swal from "sweetalert2";
import { EliminarRecuento } from "../../services";
import styles from "./RecuentoCard.module.css";

export function ButtonAtras(recuento){
  return (<Button variant={"buttonCancel"} parentMethod={() => window.location.href =`/productos/${recuento.numeroRegistroProducto}`}>
          Atras
          <ArrowBackIcon />
        </Button>)
}

export function RecuentoCard({ recuento }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el recuento de forma permanente.",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      heightAuto: false,
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await EliminarRecuento(recuento.id);
          Swal.fire({
            title: "¡Se eliminó el recuento con éxito!",
            icon: "success",
            heightAuto: false,
            scrollbarPadding: false,
          }).then(() => {
            window.location.href = "/productos";
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Hubo un error al eliminar el recuento",
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

      <p className={styles.nuemroR}><span className={styles.texto}>Numero registro producto: </span>{recuento.numeroRegistroProducto}</p>
      <div className={styles.infoContainer}>
        <div className="row">

          <div className="col-lg-5">
            <p className={styles.contenido}>
              <span className={styles.texto}>Nombre Prueba: </span>
              <br />
              {recuento.nombreRecuento}
            </p>
            <p className={styles.contenido}>
              <span className={styles.texto}>Cantidad Muestra: </span>
              <br />
              {recuento.cantidadMuestra}
            </p>
            <div>
              <p className={styles.contenido}>
                <span className={styles.texto}>Método: </span>
                <br />
                {recuento.metodoUsado}
              </p>
              <p className={styles.contenido}>
                <span className={styles.texto}>Especificación: </span>
                <br />
                {recuento.especificacion}
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <p className={styles.contenido}>
              <span className={styles.texto}>Tratamiento: </span>
              <br />
              {recuento.tratamiento} 
            </p>
            <p className={styles.contenido}> 
              <span className={styles.texto}>Volumen Diluyente: </span>
              <br />
              {recuento.volumenDiluyente}
            </p>
            <p className={styles.contenido}>
              <span className={styles.texto}>Tiempo Disolución: </span>
              <br />
              {recuento.tiempoDisolucion}
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
          title="Editar Recuento"
        >
          <EditarRp data={recuento} onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}
