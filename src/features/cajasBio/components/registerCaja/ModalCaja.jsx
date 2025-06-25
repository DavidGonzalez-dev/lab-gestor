import { useState } from "react"
import { Modal } from "@shared/components/modals/modal"
import { CajaRegister } from "@features/cajasBio/components/registerCaja/RegisterCaja"
import {Button} from "@shared/components"
import {Plus} from "@shared/iconos"

export function CajaModal({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button variant="default" parentMethod={() => setIsModalOpen(true)}>Registrar Caja Bioburden<Plus></Plus></Button>      

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar caja"
        variant="buttonSegundary"
      >
        <CajaRegister id={id} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}