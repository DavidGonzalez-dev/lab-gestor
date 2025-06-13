import { useState } from "react";
import { Input, CustomTextArea, Button, Modal } from "@shared/components";
import { EditIcon, TrashIcon } from "@shared/iconos";
import { EditarRp } from "../editarRP/EditarPruebaRecuento";
import Swal from "sweetalert2";
import { EliminarRecuento } from "../../services";
import styles from "./RecuentoCard.module.css";

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
    <div className={styles.infoContainer}>
      <div className="row">
        <div>
          <span>{recuento.numeroRegistroProducto}</span>
          <h2>{recuento.nombreRecuento}</h2>
        </div>

        <div className="col-lg-6">
          <Input label="Nombre Recuento" value={recuento.nombreRecuento} disabled />
          <Input label="Cantidad Muestra" value={recuento.cantidadMuestra} disabled />
          <div>
            <Input label="Método" value={recuento.metodoUsado} disabled />
            <Input label="Especificación" value={recuento.especificacion} disabled />
          </div>
        </div>

        <div className="col-lg-6">
          <CustomTextArea label="Tratamiento" value={recuento.tratamiento} disabled />
          <div>
            <Input label="Volumen Diluyente" value={recuento.volumenDiluyente} disabled />
            <Input label="Tiempo Disolución" value={recuento.tiempoDisolucion} disabled />
          </div>
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
  );
}
