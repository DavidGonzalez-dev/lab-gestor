import { useEffect, useState } from "react"
import { getFabricantes, eliminarFabricante } from "../../services"
import { Table, Input } from "@shared/components"
import { SearchIcono } from "@shared/iconos"
import { ButtonCellRenderer } from "@shared/components/Table/ButtonCellRenderer/ButtonCellRenderer"
import { EyeIcon, TrashIcon } from "@shared/iconos"

import styles from "./TablaFabricantes.module.css"
import Swal from "sweetalert2"

const TablaFabricantes = () => {
    const [rowData, setRowData] = useState([])
    const [searchText, setSearchText] = useState("")
    const colDefs = [
        {
            headerName: "Nombre Fabricante",
            field: "nombre",
            sortable: true,
            unSortIcon: true
        },
        {
            headerName: "Direccion Fabricante",
            field: "direccion",
        },
        {
            headerName: "Ver",
            flex: 0,
            width: 10,
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: (p) => ({
                icon: EyeIcon,
                parentMethod: () => window.location.href = `fabricantes/${p.data.id}`
            })
        },
        {
            headerName: "Eliminar",
            flex: 0,
            width: 10,
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: (p) => ({
                icon: TrashIcon,
                variant: "buttonCancel",
                parentMethod: () => handleEliminarFabricante(p.data.id)
            })
        }
    ]


    //? ----------------------------------------------
    //? Funcionalidades de los Botones
    //? ----------------------------------------------
    const handleEliminarFabricante = async (id) => {
        console.log(id)
        Swal.fire({
            icon: "warning",
            title: "¿Estas seguro d elminar el fabricante?",
            text: "Al eliminar este fabricante es posible que los productos relacionados se actualicen, por ende, se recomienda solo eliminar fabricantes que aun no esten relacionados con algun producto.",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red",
            confirmButtonText: "Aceptar",
            showCancelButton: true,
            heightAuto: false,
            scrollbarPadding: false,
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await eliminarFabricante(id)
                    Swal.fire({
                        icon: "success",
                        title: "El fabricante ha sido eliminado con exito",
                        heightAuto: false,
                        scrollbarPadding: false,
                    })
                    setRowData(prevData =>
                        prevData.filter(fabricante => fabricante.id !== id)
                    )
                }
                catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Hubo un error",
                        text: err.message,
                        heightAuto: false,
                        scrollbarPadding: false,
                    })
                }
            }
        })
    }

    //? ----------------------------------------------
    //? Logica de Filtrado
    //? ----------------------------------------------
    // Actualiza el estado del texto de busqueda por nombre del Fabricante
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

    // Funcion para cargar los Fabricantes
    const loadFabricantes = async () => {
        try {
            const fabricantes = await getFabricantes()
            setRowData(fabricantes)
        }
        catch (err) {
            console.log(err)
        }
    }

    // Efectua la carga de usuario al momento de renderizar el componte
    useEffect(() => {
        loadFabricantes()
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

export default TablaFabricantes