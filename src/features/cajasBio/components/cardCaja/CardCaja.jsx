import { useState } from "react";
import { Button } from "@shared/components";
import { Modal } from "@shared/components";
import { EditarCajaForm } from "../editCaja/EditCaja";
import Swal from "sweetalert2";
import { deleteCaja } from "../../services";
import styles from "./CardCaja.module.css";
import { EditIcon, TrashIcon } from "@shared/iconos";

export function CardCaja({ caja }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la caja definitivamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      heightAuto: false,
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCaja(caja.id);
          Swal.fire("Eliminado", "La caja ha sido eliminada.", "success");
          window.location.href = `/recuentos/${caja.idPruebaRecuento}`;
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin registro";
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("es-CO", options);
  };

  return (
    <div className={`${styles.cardDetalle} container`}>
      
        <h4 className={styles.cardTitle}>Tipo de Caja: {caja.tipo}</h4>
        <hr />

        <div className={`${styles.Contentenido} row`}>
          <div className='col-lg-6'>
            <p>
              <span className={styles.texto}>Método de Siembra:</span>{" "}
              {caja.metodoSiembra}
            </p>
            <p>
              <span className={styles.texto}>Resultado:</span>{" "}
              {caja.resultado || "Sin resultado"}
            </p>
            <p>
              <span className={styles.texto}>Media Aritmética:</span>{" "}
              {caja.medidaAritmetica}
            </p>
          </div>

          <div className='col-lg-6'>
            <p>
              <span className={styles.texto}>Factor de Disolución:</span>{" "}
              {caja.factorDisolucion}
            </p>
            <p>
              <span className={styles.texto}>Fecha Incubación:</span>{" "}
              {formatDate(caja.fechayhoraIncubacion)}
            </p>
            <p>
              <span className={styles.texto}>Fecha Lectura:</span>{" "}
              {formatDate(caja.fechayhoraLectura)}
            </p>
          </div>
        </div>
      

      <div className={styles.buttonContainer}>
        <Button variant="buttonCancel" parentMethod={handleDelete}>
          Eliminar <TrashIcon />
        </Button>
        <Button variant="default" parentMethod={() => setIsEditModalOpen(true)}>
          Editar <EditIcon />
        </Button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Caja Bioburden"
      >
        <EditarCajaForm
          caja={caja}
          onClose={() => setIsEditModalOpen(false)}
          onUpdated={() => {
            setIsEditModalOpen(false);
            location.reload();
          }}
        />
      </Modal>
    </div>
  );
}
