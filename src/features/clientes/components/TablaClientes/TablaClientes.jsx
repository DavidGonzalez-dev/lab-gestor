import { useEffect, useState } from "react"
import { getClientes } from "../../services"
import { Table, Input } from "@shared/components"
import { SearchIcono } from "@shared/iconos"
import { ButtonCellRenderer } from "@shared/components/Table/ButtonCellRenderer/ButtonCellRenderer"
import { PerfilIcon, TrashIcon } from "@shared/iconos"

import styles from "./TablaClientes.module.css"

const TablaClientes = () => {
    const [rowData, setRowData] = useState([])
    const [searchText, setSearchText] = useState("")
    const colDefs = [
        {
            headerName: "Nombre Cliente",
            field: "nombre",
            sortable: true,
            unSortIcon: true
        },
        {
            headerName: "Direccion Cliente",
            field: "direccion",
        },
        {
            headerName: "Ver",
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: (p) => ({
                icon: PerfilIcon,
            })
        },
        {
            headerName: "Eliminar",
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: (p) => ({
                icon: TrashIcon,
                variant: "buttonCancel"
            })
        }
    ]

    //? ----------------------------------------------
    //? Logica de Filtrado
    //? ----------------------------------------------
    // Actualiza el estado del texto de busqueda por nombre del cliente
    const handleSearch = (event) => {
        setSearchText(event.target.value)
        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.onFilterChange()
        }
    }

    // Funcion para verificar si se esta buscando algun producto
    const isExternalFilterPresent = () => {
        return searchText !== ""
    }

    // Funcion para determinar si un nodo(fila) pasa un filtro o no
    const doesExternalFilterPass = (node) => {
        return node.data.nombre.toLowerCase().includes(searchText.toLowerCase())
    }

    //? ----------------------------------------------
    //? Carga de datos
    //? ----------------------------------------------

    // Funcion para cargar los clientes
    const loadClientes = async () => {
        try {
            const clientes = await getClientes()
            setRowData(clientes)
        }
        catch (err) {
            console.log(err)
        }
    }

    // Efectua la carga de usuario al momento de renderizar el componte
    useEffect(() => {
        loadClientes()
    }, [])
    return (
        <div className="container">
            <div className={`${styles.searchBarContainer} mb-2 w-50`}>
                <Input
                    type="text"
                    placeholder="Buscar Nombre Cliente"
                    value={searchText}
                    onChange={handleSearch}
                    variant={"searchBar"}
                />
                <SearchIcono />
            </div>

            <Table
                rowData={rowData}
                columnDefs={colDefs}
                isExternalFilterPresent={isExternalFilterPresent}
                doesExternalFilterPass={doesExternalFilterPass}
            />
        </div>
    )
}

export default TablaClientes