import { useEffect, useState } from "react"
import { GetMonitoreosDeteccionById, DeleteMonitoreoDeteccionById } from "../../services"
import { dateTimeFormatter } from '@shared/utils'

import { ConfirmAlert, SuccessAlert, ErrorAlert } from "@shared/components/Alerts"
import { Table, ComponentLoader, Modal } from "@shared/components"
import { ButtonCellRenderer } from "@shared/components/Table/ButtonCellRenderer/ButtonCellRenderer"
import { EditIcon, TrashIcon } from "@shared/iconos"
import { EditMonitoreoDeteccion } from "../EditMonitoreoDeteccion/EditMonitoreoDeteccion"



import styles from "./TablaMonitoreos.module.css"

export const TablaMonitoreos = ({ idRecuento }) => {

    const [rowData, setRowData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [editData, setEditData] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    const colDefs = [
        {
            field: "volumenMuestra",
            headerName: "Volumen Muestra",
        },
        {
            field: "nombreDiluyente",
            headerName: "Diluyente",
        },
        {
            field: "fechayhoraInicio",
            headerName: "Fecha y Hora Inicio",
            valueFormatter: params => dateTimeFormatter(params.value)
        },
        {
            field: "fechayhoraFinal",
            headerName: "Fecha y Hora Final",
            valueFormatter: params => dateTimeFormatter(params.value)
        },
        {
            field: "etapaDeteccion.nombreEtapa",
            headerName: "Etapa",
            flex: 0,
            width: 170
        },
        {
            field: "etapaDeteccion.temperaturaEtapa",
            headerName: "Temperatura",
            flex: 0,
            width: 100
        },
        {
            field: "etapaDeteccion.tiempoEtapa",
            headerName: "Tiempo",
            flex: 0,
            width: 100
        },
        {
            headerName: "Editar",
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: (params) => ({
                parentMethod: () => handleEdit(params.data),
                icon: EditIcon,

            }),
            flex: 0,
            width: 50
        },
        {
            headerName: "Eliminar",
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: (params) => ({
                parentMethod: () => handleDelete(params.data),
                icon: TrashIcon,
                variant: "buttonCancel"

            }),
            flex: 0,
            width: 50
        },

    ]


    // Funcion para manejo del modal
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    // Funcion para borrado de datos
    const handleDelete = (data) => {

        ConfirmAlert.fire({
            title: "¿Seguro quieres eliminar este registro de monitoreo?"
        })
            .then(async result => {

                if (result.isConfirmed) {
                    try {
                        setIsLoading(true)
                        const success = await DeleteMonitoreoDeteccionById(data.id)
                        if (success) {
                            SuccessAlert.fire({
                                title: "Se elimino el registro de deteccion con exito"
                            }).then(() => setRowData(prevData => prevData.filter(row => row.id !== data.id)))
                        }
                    } catch (error) {
                        ErrorAlert.fire({
                            title: "Ups! hubo un error al eliminar el registro",
                            text: error.message
                        })
                    } finally {
                        setIsLoading(false)
                    }
                }
            })
    }

    // Funcion para edicion de datos
    const handleEdit = (data) => {
        setEditData(data)
        toggleModal()
    }


    // Logica de carga de datos
    const loadData = async () => {
        try {
            setIsLoading(true)
            const data = await GetMonitoreosDeteccionById(idRecuento)
            setRowData(data)

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    if (isLoading) {
        return <ComponentLoader />
    }

    return (
        <>
            <Table
                rowData={rowData}
                columnDefs={colDefs}
            />
            <Modal isOpen={openModal} onClose={toggleModal} title="Editar Registro">
                <EditMonitoreoDeteccion onCancel={toggleModal} initialValues={editData}/>
            </Modal>
        </>
    )

}