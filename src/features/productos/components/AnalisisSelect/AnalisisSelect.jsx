import { useState } from "react"
import { DropDownButton, Modal } from "@shared/components"
import { RegistroOrganismo } from "@features/microOrganismos/components/registerMicro/RegistroOrganismo"
import { RegistroRecuento } from "@features/pRecuentos/components/registroRP/RegistroRecuento"

export const AnalisisSelect = ({numeroRegistroProducto}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleSelect = (type) => {
        setModalType(type)
        setIsDropdownOpen(false)
        setIsModalOpen(true)
        console.log(`Tipo seleccionado ${type}`)
    }

    const analisisOptions = [
        {
            id: "pruebaRecuento", label: "Prueba de Recuento"
        },
        {
            id: "controlNegativo", label: "Control Negativo de Medios"
        },
        {
            id: "deteccionMicroorganimos", label: "Deteccion Especifica de Microorganismos"
        },
    ]

    return (

        <>
            <DropDownButton
                isOpen={isDropdownOpen}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                options={analisisOptions}
                onSelect={handleSelect}
            />

            {/* Montamos el modal */}
            <Modal isOpen={isModalOpen} title="Registro de Analisis" onClose={closeModal}>
                
                {modalType === "pruebaRecuento" && (
                    <RegistroRecuento onClose={closeModal} numeroRegistroProducto={numeroRegistroProducto}/>
                )}
                {modalType === "deteccionMicroorganimos" && (
                    <RegistroOrganismo onClose={closeModal} numeroRegistroProducto={numeroRegistroProducto}/>
                )}

            </Modal>
        </>
    )
}