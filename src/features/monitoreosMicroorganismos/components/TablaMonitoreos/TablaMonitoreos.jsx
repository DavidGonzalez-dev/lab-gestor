import { useEffect, useState } from "react"
import { GetMonitoreosDeteccionById } from "../../services"
import { dateTimeFormatter } from '@shared/utils'

import { Table } from "@shared/components"
import { ButtonCellRenderer } from "@shared/components/Table/ButtonCellRenderer/ButtonCellRenderer"
import { EditIcon, TrashIcon } from "@shared/iconos"



import styles from "./TablaMonitoreos.module.css"

export const TablaMonitoreos = ({ idRecuento }) => {

    const [rowData, setRowData] = useState([])

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
            width: 100
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

    // Funcion para borrado de datos
    const handleDelete = (data) => {
        console.log(data)
    }

    // Funcion para edicion de datos
    const handleEdit = (data) => {
        console.log(data)
    }


    // Logica de carga de datos
    const loadData = async () => {
        try {

            const data = await GetMonitoreosDeteccionById(idRecuento)
            setRowData(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Table
            rowData={rowData}
            columnDefs={colDefs}
        />
    )

}