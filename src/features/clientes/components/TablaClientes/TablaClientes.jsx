import { Table, Input, ComponentLoader } from "@shared/components"
import { ButtonCellRenderer } from "@shared/components/Table/ButtonCellRenderer/ButtonCellRenderer"
import { EyeIcon, TrashIcon, SearchIcono } from "@shared/iconos"
import Swal from "sweetalert2"

import { useEffect, useState } from "react"
import { getClientes, eliminarCliente } from "../../services"

import styles from "./TablaClientes.module.css"

const TablaClientes = () => {
  const [rowData, setRowData] = useState([])
  const [searchText, setSearchText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
      headerName: "Detalles",
      flex: 0,
      width: 10,
      cellRenderer: ButtonCellRenderer,
      cellRendererParams: (p) => ({
        icon: EyeIcon,
        parentMethod: () => window.location.href = `/clientes/${p.data.id}`
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
        parentMethod: () => handleEliminarCliente(p.data.id)
      })
    }
  ]

  //? ----------------------------------------------
  //? Funcionalidades de los Botones
  //? ----------------------------------------------
  const handleEliminarCliente = async (id) => {
    console.log(id)
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro de eliminar el cliente?",
      text: "Al eliminar este cliente es posible que los productos relacionados se actualicen, por ende, se recomienda solo eliminar clientes que aun no esten relacionados con algun producto.",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      heightAuto: false,
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          await eliminarCliente(id)
          Swal.fire({
            icon: "success",
            title: "El cliente ha sido eliminado con exito",
            heightAuto: false,
            scrollbarPadding: false,
          })
          setRowData(prevData =>
            prevData.filter(cliente => cliente.id !== id)
          )
        }
        catch (err) {
          Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: err.message
          })
        }
      }
    })
  }

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
      setIsLoading(true)
      const clientes = await getClientes()
      setRowData(clientes)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }


  // Efectua la carga de usuario al momento de renderizar el componte
  useEffect(() => {
    loadClientes()
  }, [])


  if (isLoading) {
    return <ComponentLoader />
  }
  
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
