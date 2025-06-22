import styles from './TablaControlesNegativos.module.css'

import { Table, ComponentLoader, Modal } from "@shared/components"
import { TrashIcon, EditIcon } from "@shared/iconos"
import { ButtonCellRenderer } from "@shared/components/Table/ButtonCellRenderer/ButtonCellRenderer"
import { ConfirmAlert, SuccessAlert, ErrorAlert } from "@shared/components/alerts"
import { EditControlNegativo } from '../EditControlNegativo/EditControlNegativo'

import { useState, useEffect } from 'react'
import { GetControlesNegativosProducto, DeleteControlNegativo } from '../../services'
import { dateTimeFormatter } from '@shared/utils'

export const TablaControlesNegativos = ({ numeroRegistroProducto }) => {

    const [rowData, setRowData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [editData, setEditData] = useState(null)
    const [openModal, setOpenModal] = useState(false)


    const colDefs = [
        {
            field: "medioCultivo",
            headerName: "Medio Cultivo",
        },
        {
            field: "fechayhoraIncubacion",
            headerName: "Incubación",
            valueFormatter: (params) => {
                return dateTimeFormatter(params.value);
            }
        },
        {
            field: "fechayhoraLectura",
            headerName: "Lectura",
            valueFormatter: (params) => {
                return dateTimeFormatter(params.value);
            }
        },
        {
            field: "resultado",
            headerName: "Resultado",
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
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: (params) => ({
                parentMethod: () => handleDelete(params.data),
                icon: TrashIcon,
                variant: "buttonCancel",
            }),
            flex: 0,
            width: 50
        }
    ]


    // Funcion para eliminar el registro de control negativo
    const handleDelete = async (data) => {

        ConfirmAlert.fire({
            title: "¿Estas seguro de eliminar este registro?",
            text: "Este registro no se podra recuperar de ninguna manera."
        })
            .then(async (result) => {

                if (result.isConfirmed) {

                    try {
                        const success = await DeleteControlNegativo(data.id)
                        if (success) {
                            SuccessAlert.fire({
                                title: "Registro eliminado con exito."
                            })
                                .then(() => setRowData(prevData => prevData.filter(registro => registro.id != data.id)))
                        }
                    } catch (error) {
                        ErrorAlert.fire({
                            title: "Hubo un error al eliminar el registro",
                            text: error.message
                        })
                    }
                }

            })


    }


    // Funcion para mostraer el modal de registro de control negativo
    const handleEdit = (data) => {
        setEditData(data)
        toggleOpenModal()
    }

    // Funcion para mostrar y ocultar el modal
    const toggleOpenModal = () => {
        setOpenModal(!openModal)
    }


    // Logica de carga de datos
    const loadRowData = async () => {
        try {
            setIsLoading(true)
            const data = await GetControlesNegativosProducto(numeroRegistroProducto)
            if (data) {
                setRowData(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadRowData()
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
            <Modal isOpen={openModal} onClose={toggleOpenModal} title="Editar Control Negativo">
                <EditControlNegativo initialValues={editData} onClose={toggleOpenModal}/>
            </Modal>
        </>
    )

}