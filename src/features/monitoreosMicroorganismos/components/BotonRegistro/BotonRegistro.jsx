import { useState } from "react"

import { Button, Modal } from "@shared/components"
import { Plus } from "@shared/iconos"
import { RegistroMonitoreoDeteccion } from "../RegistroMonitoreoDeteccion/RegistroMonitoreoDeteccion"

export const BotonRegistro = ({idDeteccion}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpenModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Button variant="buttonAccept" parentMethod={toggleOpenModal}>
                <Plus />
                Registrar Monitoreo
            </Button>
            <Modal isOpen={isOpen} onClose={toggleOpenModal} title="Registrar Monitoreo">
                <RegistroMonitoreoDeteccion onCancel={toggleOpenModal} idDeteccion={idDeteccion}/>
            </Modal>
        </>
    )
}