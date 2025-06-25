import { useEffect, useState } from "react"
import { getCajasByPruebaRecuento } from "../../services"
import { CajaModal } from "@features/cajasBio/components/registerCaja/ModalCaja"
import { CardCaja } from "./VistaCajas"

import { ComponentLoader } from "@shared/components"

export function CajasBioburdenList({ id }) {
  const [cajas, setCajas] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCajas = async () => {
    try {
      setIsLoading(true)
      const data = await getCajasByPruebaRecuento(id)
      setCajas(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchCajas()
    }
  }, [id])

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", height: "80%", width: "fit-content", border: "1px solid var(--color-primario)", borderRadius: "10px", padding: "20px" }}>

      <div style={{ placeContent: "center" }}>
        <CajaModal id={id} />
      </div>

      <div style={{ maxHeight: "90%", overflow: "scroll", display: "flex", flexDirection: "column", gap: "20px", padding: "0px 10px" }}>
        {isLoading 
        ? <ComponentLoader/> 
        : cajas.map((caja) => (
          <CardCaja key={caja.id} caja={caja} onDeleted={fetchCajas} />
        ))}
        
      </div>


    </div>
  )
}