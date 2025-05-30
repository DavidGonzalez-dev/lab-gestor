import { useState } from "react"

import { Button, Modal } from "@shared/components"
import { EditEntryDetailsForm } from "../EditEntryDetailsForm/EditEntryDetailsForm"
import { EditIcon } from "@shared/iconos"

import styles from "./EntryDetailsCard.module.css"

export const EntryDetailsCard = ({ data }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <article className={`p-5 ${styles.detailsCard}`}>
            <h2>Detalles de Entrada</h2>
            <div className={styles.infoContainer}>
                <p>
                    <b>Condiciones Ambienta les: </b>
                    {data.condicionesAmbientales}
                </p>
                <p>
                    <b>Fecha Recepcion: </b>
                    {new Date(data.fechaRecepcion).toISOString().split("T")[0]}
                </p>
                <p>
                    <b>Fecha Incio Analisis: </b>
                    {new Date(data.fechaInicioAnalisis).toISOString().split("T")[0]}
                </p>
                <p>
                    <b>Fecha Fin Analisis: </b>
                    {
                        data.fechaFinAnalisis
                            ? new Date(data.fechaFinAnalisis).toISOString().split("T")[0]
                            : "N/A"
                    }
                </p>
                <p><b>Proposito Analisis: </b>{data.propositoAnalisis}</p>

                <Button parentMethod={() => setIsModalOpen(true)}>
                    Editar
                    <EditIcon />
                </Button>

                <Modal title="Editar Detalles de Entrada" isOpen={isModalOpen} onClose={closeModal}>
                    <EditEntryDetailsForm initialValues={{
                        numeroRegistroProducto: data.numeroRegistroProducto,
                        condicionesAmbientales: data.condicionesAmbientales,
                        propositoAnalisis: data.propositoAnalisis,
                        fechaRecepcion: data.fechaRecepcion,
                        fechaInicioAnalisis: data.fechaInicioAnalisis,
                        fechaFinalAnalisis: data.fechaFinalAnalisis
                    }} closeModal={closeModal}/>
                </Modal>
            </div>
        </article>
    )
}