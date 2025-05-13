<<<<<<< HEAD
import { useEffect, useState } from "react";
import { getClientes } from "../../services";
import { Table, Input } from "@shared/components";
import { SearchIcono } from "@shared/iconos";
import { ButtonCellRenderer } from "@shared/components/Table/ButtonCellRenderer/ButtonCellRenderer";
import { PerfilIcon, TrashIcon } from "@shared/iconos";
=======
import { useEffect, useState } from "react"
import { getClientes, eliminarCliente } from "../../services"
import { Table, Input } from "@shared/components"
import { SearchIcono } from "@shared/iconos"
import { ButtonCellRenderer } from "@shared/components/Table/ButtonCellRenderer/ButtonCellRenderer"
import { PerfilIcon, TrashIcon } from "@shared/iconos"
import Swal from "sweetalert2"
>>>>>>> b0fa768395129d9a73217f57cb7952f33c5f51a4

import styles from "./TablaClientes.module.css";

const TablaClientes = () => {
<<<<<<< HEAD
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const colDefs = [
    {
      headerName: "Nombre Cliente",
      field: "nombre",
      sortable: true,
      unSortIcon: true,
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
        parentMethod: () => verClient(p.data),
      }),
    },
    {
      headerName: "Eliminar",
      cellRenderer: ButtonCellRenderer,
      cellRendererParams: (p) => ({
        icon: TrashIcon,
        variant: "buttonCancel",
      }),
    },
  ];

  //? ----------------------------------------------
  //? Logica de Filtrado
  //? ----------------------------------------------
  // Actualiza el estado del texto de busqueda por nombre del cliente
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.onFilterChange();
=======
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
            title: "¿Estas seguro d elminar el cliente?",
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
>>>>>>> b0fa768395129d9a73217f57cb7952f33c5f51a4
    }
  };

  // Funcion para verificar si se esta buscando algun producto
  const isExternalFilterPresent = () => {
    return searchText !== "";
  };

  // Funcion para determinar si un nodo(fila) pasa un filtro o no
  const doesExternalFilterPass = (node) => {
    return node.data.nombre.toLowerCase().includes(searchText.toLowerCase());
  };

  //? ----------------------------------------------
  //? Carga de datos
  //? ----------------------------------------------

  // Funcion para cargar los clientes
  const loadClientes = async () => {
    try {
      const clientes = await getClientes();
      setRowData(clientes);
    } catch (err) {
      console.log(err);
    }
  };

  //? ----------------------------------------------
  //? logica de los botones
  //? ----------------------------------------------

  //funcion para ver la vista del cliente individualmente
  const verClient = (client) => {
    //se redirige a la pagina dependiendo del id
    window.location.href = `/clientes/${client.id}`;
  };

  // Efectua la carga de usuario al momento de renderizar el componte
  useEffect(() => {
    loadClientes();
  }, []);
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
  );
};

export default TablaClientes;
