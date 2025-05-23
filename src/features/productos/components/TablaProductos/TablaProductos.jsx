import { useEffect, useState } from "react"
import { GetRegistrosEntradaProducto, deleteProducto, GetRegsitrosEntradaProductoPorUsuario } from "../../services"
import useAuthStore from "@shared/stores/useAuthStore.js"
import { getDateComparatorFunction, dateFormatter } from "@shared/utils"

import { Table, PillType, ButtonCellRenderer, Input, SelectButton } from "@shared/components"
import { EyeIcon, TrashIcon, SearchIcono } from "@shared/iconos"

import styles from "./TablaProductos.module.css"
import Swal from "sweetalert2"

export const TablaProductos = () => {

    const [rowData, setRowData] = useState([]) // Estado para guardar la informacion de la tabla
    const [searchText, setSearchText] = useState("") // Estado para guardar el valor de busqueda de la barra de busqueda
    const [type, setType] = useState("all") // Estado para guardar el filtro del tipo de producto

    const { userId, userRole } = useAuthStore()


    //Funcion para definir la variante del componente pill
    const getPillVariant = (typeName) => {
        switch (typeName) {

            case "Producto Terminado":
                return "lightBlue"
            case "Material de Empaque":
                return "gray"
            case "Materia Prima":
                return "orange"
        }
    }

    // Defincion de las columnas
    const colDefs = userRole === "admin" 
    ? [
        {
            headerName: "Numero Registro",
            field: "numeroRegistroProducto",
            width: 180,
            flex: 0
        },
        {
            headerName: "Categoria",
            field: "producto.tipo.nombreTipo",
            width: 170,
            flex: 0,
            cellRenderer: PillType,
            cellRendererParams: (p) => ({
                variant: getPillVariant(p.data.producto.tipo.nombreTipo)
            })
        },
        {
            headerName: "Condiciones Ambientales",
            width: 180,
            flex: 0,
            field: "condicionesAmbientales",
        },
        {
            headerName: "Recepcion",
            field: "fechaRecepcion",
            width: 150,
            flex: 0,
            sortable: true,
            unSortIcon: true,
            filter: "agDateColumnFilter",
            valueFormatter: (p) => dateFormatter(p.value),
            filterParams: {
                comparator: getDateComparatorFunction()
            }
        },
        {
            headerName: "Inicio Analisis",
            field: "fechaInicioAnalisis",
            width: 180,
            flex: 0,
            sortable: true,
            unSortIcon: true,
            filter: "agDateColumnFilter",
            valueFormatter: (p) => dateFormatter(p.value),
            filterParams: {
                comparator: getDateComparatorFunction()
            }
        },
        {
            headerName: "Responsable",
            field: "usuario.firma",
            cellRenderer: (p) => {
                return(
                 <b>{p.data.usuario.firma}</b>
                ) 
            },
        },
        {
            headerName: "Detalles",
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: (p) => ({
                icon: EyeIcon,
                variant: "default",
                parentMethod: () => window.location.href = `productos/${p.data.numeroRegistroProducto}`
            })
        },
        {
            headerName: "Eliminar",
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: (p) => ({
                icon: TrashIcon,
                variant: "buttonCancel",
                parentMethod: () => eliminarProducto(p.data.numeroRegistroProducto)
            })
        }
    ] 
    : [
        {
            headerName: "Numero Registro",
            field: "numeroRegistroProducto",
        },
        {
            headerName: "Categoria",
            field: "producto.tipo.nombreTipo",
            cellRenderer: PillType,
            cellRendererParams: (p) => ({
                variant: getPillVariant(p.data.producto.tipo.nombreTipo)
            })
        },
        {
            headerName: "Condiciones Ambientales",
            field: "condicionesAmbientales",
        },
        {
            headerName: "Recepcion",
            field: "fechaRecepcion",
            sortable: true,
            unSortIcon: true,
            filter: "agDateColumnFilter",
            valueFormatter: (p) => dateFormatter(p.value),
            filterParams: {
                comparator: getDateComparatorFunction()
            }
        },
        {
            headerName: "Inicio Analisis",
            field: "fechaInicioAnalisis",
            sortable: true,
            unSortIcon: true,
            filter: "agDateColumnFilter",
            valueFormatter: (p) => dateFormatter(p.value),
            filterParams: {
                comparator: getDateComparatorFunction()
            }
        },
        {
            headerName: "Detalles",
            cellRenderer: ButtonCellRenderer,
            withth: 100,
            flex: 0,
            cellRendererParams: (p) => ({
                icon: EyeIcon,
                variant: "default",
                parentMethod: () => window.location.href = `productos/${p.data.numeroRegistroProducto}`
            })
        },
        {
            headerName: "Eliminar",
            cellRenderer: ButtonCellRenderer,
            width: 100,
            flex: 0,
            cellRendererParams: (p) => ({
                icon: TrashIcon,
                variant: "buttonCancel",
                parentMethod: () => eliminarProducto(p.data.numeroRegistroProducto)
            })
        }
    ] 

    //? ----------------------------------------------
    //? Logica de los filtros
    //? ----------------------------------------------
    // Funcion que maneja la busqueda por nombre o apellido
    const handleSearch = (event) => {
        setSearchText(event.target.value)
        console.log(searchText)
    }

    // Funcion que maneja el filtro por tipo de producto
    const handleTypeChange = (newValue) => {
        setType(newValue)
    }

    // Funcion para verificar si algun tipo de filtro activo
    const isExternalFilterPresent = () => {
        return searchText !== "" || type !== "all"
    }

    // Funcion para determinar si un nodo(fila) pasa un filtro
    const doesExternalFilterPass = (node) => {
        // Logica de filtrado por numero de registro
        let passesSearchFilter = true
        if (searchText != "") {
            passesSearchFilter = node.data.numeroRegistroProducto.toLowerCase().includes(searchText.toLowerCase())
        }

        // Logica de filtrado por tipo de producto
        let passesTypeFilter = true
        if (type != "all") {
            passesTypeFilter = node.data.producto.tipo.nombreTipo === type
        }
        return passesSearchFilter && passesTypeFilter
    }

    //? ----------------------------------------------
    //? Logica de los botones
    //? ----------------------------------------------
    const eliminarProducto = async (numeroRegistroProducto) => {

        Swal.fire({
            icon: "question",
            title: "Estas seguro de eliminar este producto?",
            text: "Al eliminar este producto estaras eliminando toda la informacion relacionada a este, es decir eliminaras sus pruebas de recuento, controles nevativos, etc. Estas seguro de continuar?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar",
            heightAuto: false,
            scrollbarPadding: false,
        })
            .then(async (result) => {

                if (result.isConfirmed) {

                    try {
                        const success = await deleteProducto(numeroRegistroProducto)
                        if (success) {

                            Swal.fire({
                                title: "Se elimino el producto con exito!",
                                icon: "success",
                                heightAuto: false,
                                scrollbarPadding: false,
                            })

                            setRowData((prevData) => prevData.filter(producto =>
                                producto.numeroRegistroProducto !== numeroRegistroProducto
                            ))
                        }
                    }

                    catch (err) {
                        Swal.fire({
                            icon: "error",
                            title: "Hubo un error al eliminar el producto",
                            text: err.message,
                            heightAuto: false,
                            scrollbarPadding: false,
                        })
                    }

                }

            })

    }

    //? ----------------------------------------------
    //? Carga de datos
    //? ----------------------------------------------
    // Funcion para cargar los registros de entrada de los productos desde el servidor
    const loadProducts = async () => {
        // Se hace la peticion al servicio
        try {
            // Hacemos el fetch de datos dependiendo del rol del usuario
            let data = []
            if (userRole === "admin") {
                data = await GetRegistrosEntradaProducto()
            }
            else {
                data = await GetRegsitrosEntradaProductoPorUsuario(userId)
                console.log(data)
            }

            setRowData(data)
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
        <div className="container">

            <div className={styles.filtersContainer}>

                <div className={styles.searchBarContainer}>
                    <Input
                        id="numeroRegistroInput"
                        type="text"
                        placeholder="Buscar por numero de registro"
                        onChange={handleSearch}
                        variant="searchBar"
                    />
                    <SearchIcono />
                </div>

                <div className={styles.selectTypeContainer}>
                    <SelectButton parentMethod={() => handleTypeChange("all")} selected={type === "all"} variant="neutral">
                        Todos
                    </SelectButton>
                    <SelectButton parentMethod={() => handleTypeChange("Materia Prima")} selected={type === "Materia Prima"} variant="neutral">
                        Materia Prima
                    </SelectButton>
                    <SelectButton parentMethod={() => handleTypeChange("Material de Empaque")} selected={type === "Material de Empaque"} variant="neutral">
                        Material de Empaque
                    </SelectButton>
                    <SelectButton parentMethod={() => handleTypeChange("Producto Terminado")} selected={type === "Producto Terminado"} variant="neutral">
                        Producto Terminado
                    </SelectButton>
                </div>

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