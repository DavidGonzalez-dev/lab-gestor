import { useEffect, useState } from "react"
import { getCajasByPruebaRecuento } from "../../services"
import { CajaModal } from "@features/cajasBio/components/registerCaja/ModalCaja"
import { CardCaja } from "./VistaCajas"

export function CajasBioburdenList({ id }) {
  const [cajas, setCajas] = useState([])

  const fetchCajas = async () => {
    try {
      const data = await getCajasByPruebaRecuento(id)
      setCajas(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchCajas()
    }
  }, [id])

  return (
    <div>
      <div>
        {cajas.map((caja) => (
          <CardCaja key={caja.id} caja={caja} onDeleted={fetchCajas} />
        ))}
      </div>

      <CajaModal id={id} />
    </div>
  )
}