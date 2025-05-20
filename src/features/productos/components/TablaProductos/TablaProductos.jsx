import { useEffect, useState } from "react"
import { GetRegistrosEntradaProducto } from "../../services"

import { Table } from "@shared/components"

import styles from "./TablaProductos.module.css"

export const TablaProductos = () => {

    const [rowData, setRowData] = useState([]) // Estado para guardar la informacion de la tabla
    const [searchText, setSearchText] = useState("") // Estado para guardar el valor de busqueda de la barra de busqueda
    const [type, setType] = useState("") // Estado para guardar el filtro del tipo de producto


    const colDefs = [
        {
            headerName: "Numero Registro",
            field: "numeroRegistroProducto",
        },
        {
            headerName: "Proposito Analisis",
        }
    ]


    //? ----------------------------------------------
    //? Carga de datos
    //? ----------------------------------------------
    // Funcion para cargar los registros de entrada de los productos desde el servidor
    const loadProducts = async () => {
        // Se hace la peticion al servicio
        try {
            const data = await GetRegistrosEntradaProducto()
            if (data) {
                setRowData(data)
            }
        }
        // Se maneja las exepciones
        catch (err) {
            console.log(err.message)
        }
    }
    // Carga de Datos
    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div className={styles.tableContainer}>
            <Table
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}