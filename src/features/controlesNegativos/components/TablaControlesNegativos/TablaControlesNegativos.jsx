import styles from './TablaControlesNegativos.module.css'

import { Table, ComponentLoader } from "@shared/components"
import { ButtonCellRenderer } from "@shared/components/Table/ButtonCellRenderer/ButtonCellRenderer"

import { useState, useEffect } from 'react'
import { GetControlesNegativosProducto } from '../../services'
import { dateTimeFormatter } from '@shared/utils'

export const TablaControlesNegativos = ({ numeroRegistroProducto }) => {

    const [rowData, setRowData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


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
        }
    ]


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
        console.log(rowData)
    }, [])

    if (isLoading) {
        return <ComponentLoader />
    }

    return (
        <Table
            rowData={rowData}
            columnDefs={colDefs}
        />
    )

}