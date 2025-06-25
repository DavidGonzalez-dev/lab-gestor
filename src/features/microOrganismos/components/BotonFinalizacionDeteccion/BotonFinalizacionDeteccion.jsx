
import { Modal, Button } from "@shared/components"
import { FormularioRegistroResultado } from "../FormularioRegistroResultado/FormularioRegistroResultado"
import { useState } from "react"

export const BotonFinalizacionDeteccion = ({ idDeteccion }) => {

    const [openModal, setOpenModal] = useState(false)

    // Funcion para abrir y cerrar modal
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <>
            <Button parentMethod={toggleModal}>
                Registrar Resultado
            </Button>
            <Modal onClose={toggleModal} title="Registrar resultado" isOpen={openModal}>
                <FormularioRegistroResultado idDeteccion={idDeteccion} onCancel={toggleModal}/>
            </Modal>
        </>
    )
}