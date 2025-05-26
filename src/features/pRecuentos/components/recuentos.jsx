import React, { useState } from "react"
import { Modal, Button } from "@shared/components"
import { RegistroRecuento } from "./registroRP/RegistroRecuento"
import { EditarRp } from "./editarRP/EditarPruebaRecuento"

export function RecuentosPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [modalTitle, setModalTitle] = useState("")

  const recuento = {
    id: 3,
    metodoUsado: "aaa-02-asd",
    concepto: false,
    especificacion: "asdasdas",
    volumenDiluyente: "10ml",
    tiempoDisolucion: "10min",
    cantidadMuestra: "10mg",
    tratamiento: "asdasdasdasdasdasd",
    nombreRecuento: "prueba uno",
    numeroRegistroProducto: "AAAA-0000-0000"
  };

  const abrirModalRegistro = () => {
    setModalTitle("Registrar Recuento")
    setModalContent(<RegistroRecuento onClose={() => setIsOpen(false)} />);
    setIsOpen(true);
  };

  const abrirModalEdicion = (data) => {
    setModalTitle("Editar Recuento");
    setModalContent(<EditarRp data={data} onClose={() => setIsOpen(false)} />);
    setIsOpen(true);
  };

  return (
    <div>
      <Button parentMethod={abrirModalRegistro} variant="buttonAccept">Registro Recuento</Button>
      {/* Simulación de botón para editar */}
      <Button parentMethod={() => abrirModalEdicion(recuento)} variant="lightBlue">Editar Recuento</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
}
