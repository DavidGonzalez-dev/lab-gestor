import React, { useState } from "react"
import { Modal,Button } from "@shared/components"
import { RegistroRecuento } from "./registroRP/registroRp"
import { EditarRp } from "./editarRP/editarRp"

export function RecuentosPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [modalTitle, setModalTitle] = useState("")

  const abrirModalRegistro = () => {
    setModalTitle("Registrar Recuento")
    setModalContent(<RegistroRecuento onClose={() => setIsOpen(false)} />);
    setIsOpen(true);
  };

  const abrirModalEdicion = (recuentoId) => {
    setModalTitle("Editar Recuento");
    setModalContent(<EditarRp recuentoId={recuentoId} onClose={() => setIsOpen(false)} />);
    setIsOpen(true);
  };

  return (
    <div>
      <Button parentMethod={abrirModalRegistro} variant="buttonAccept">Registro Recuento</Button>
      {/* Simulación de botón para editar */}
      <Button parentMethod={abrirModalEdicion} variant="lightBlue">Editar Recuento</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
}
