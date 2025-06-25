import styles from './VistaCajas.module.css'
import { Button } from "@shared/components"
import { deleteCaja } from '../../services'
import Swal from 'sweetalert2'
import { EyeIcon, TrashIcon } from "@shared/iconos"

export function CardCaja({ caja, onDeleted }) {
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
          await deleteCaja(caja.id)
          Swal.fire("Eliminado", "La caja ha sido eliminada.", "success")
          onDeleted() // refresca lista
        } catch (error) {
          Swal.fire("Error", error.message, "error")
        }
      }
    })
  }

  return (
    <div className={styles.cardCaja}>
      <div className={styles.cardHeader}>
        {caja.tipo}
      </div>

      <div>
        <p><strong className={styles.texto}>Método:</strong> {caja.metodoSiembra}</p>
        <p><strong className={styles.texto}>Resultado:</strong> {caja.resultado || "Sin resultado"}</p>
      </div>

      <div className={styles.cardFooter}>
        <Button variant="default" parentMethod={() =>window.location.href = `/CajasBioburden/${caja.id}`}
        >Ver más <EyeIcon/></Button>
        <Button variant="buttonCancel" parentMethod={handleDelete}>Eliminar <TrashIcon/></Button>
      </div>
    </div>
  )
}