import { useState, useEffect, useRef } from "react";

import { Table, PillType, PillState, Input, Button } from "@shared/components"
import { getUsuarios, DeshabilitarUsuario } from "../../services/";
import Swal from "sweetalert2";

import { ToTitleCase } from "@shared/utils";
import { SearchIcono } from '@shared/iconos'
import styles from "./TablaUsuarios.module.css"



export const TablaUsuarios = () => {


  //? ----------------------------------------------
  //? Definicion de los estados
  //? ----------------------------------------------
  const gridRef = useRef(null); // Referencia a la API del grid

  const [rowData, setRowData] = useState([]) // Estado para almacenar la informacion de la tabla
  const [searchText, setSearchText] = useState("") // Estado para almacenar el texto que se busca

  // Definición de columnas
  const columnDefs = [
    {
      headerName: "# Cédula",
      field: "ID",
      width: 120,
      flex: 0,
    },
    {
      headerName: "Nombres",
      field: "nombres",
      valueFormatter: p => ToTitleCase(p.value),
      minWidth: 150,
    },
    {
      headerName: "Apellidos",
      field: "apellidos",
      valueFormatter: p => ToTitleCase(p.value),
      minWidth: 150,
    },
    {
      headerName: "Correo",
      field: "correo",
      width: 200,
    },
    {
      headerName: "Rol",
      field: "rol.NombreRol",
      cellClass: "text-center",
      cellRenderer: PillType,
      cellRendererParams: (p) => ({
        variant: p.value === "admin" ? "darkBlue" : "lightBlue"
      }),
      width: 120,
    },
    {
      headerName: "Estado",
      field: "estado",
      cellClass: "text-center",
      cellRenderer: PillState,
      cellRendererParams: (p) => ({
        variant: p.value === true ? "green" : "red"
      })
    },
    {
      headerName: "Detalles",
      field: "detalles",
      width: 100,
    },
    {
      headerName: "Eliminar",
      field: "eliminar",
      width: 100,
      cellRenderer: Button,
      cellRendererParams: (p) => ({
        children: "Eliminar",
        variant: "buttonDelete",
        parentMethod: () => eliminarUsuario(p.data.ID),
      })
    },
  ];

  //? ----------------------------------------------
  //? Logica de la tabla
  //? ----------------------------------------------

  // Manejar búsqueda por nombre o apellido
  const handleSearch = (event) => {
    setSearchText(event.target.value)

    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.onFilterChanged()
    }
  };

  // Capturar la instancia de la API de AG Grid
  const onGridReady = (params) => {
    gridRef.current = params;
  }

  // Funcion para verificar si hay algun tipo de filtro activo
  const isExternalFilterPresent = () => {
    return searchText !== ""
  }


  // Funcion para determinar si una nodo(fila) pasa un filtro
  const doesExternalFilterPass = (node) => {
    console.log(node)
    if (searchText !== "") {
      return node.data.nombres.toLowerCase().includes(searchText.toLowerCase()) || node.data.apellidos.toLowerCase().includes(searchText.toLowerCase())
    }
  }

  //? ----------------------------------------------
  //? Logica de los botones de accion
  //? ----------------------------------------------
  const eliminarUsuario = (id) => {
    console.log(id)
    Swal.fire({
      title: "¿Estas seguro de dehabilitar este usuario?",
      text: "Al deshabilitar este usuario le estaras negando el acceso al sistema, asi como a todas las funcionalidades del mismo",
      icon: "warning",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red"

    }).then(async (result) => {

      // Si se confirma que se quiere enviar el formulario
      if (result.isConfirmed) {

        // Se hace llamada a la api
        try {
          const success = await DeshabilitarUsuario(id);
          if (success) {
            Swal.fire("El usuario se deshabilito con exito!", "", "success");
          }
        }
        catch (err) {
          Swal.fire({
            icon: "error",
            title: "Ups! algo salio mal",
            text: err.message
          })
        }
      }
    });
  }

  //? ----------------------------------------------
  //? Carga de datos
  //? ----------------------------------------------
  // Funcion para cargar los usuarios desde el servidor
  const loadUsers = async () => {
    try {
      const users = await getUsuarios();
      setRowData(users);
    } catch (error) {
      console.error("Error cargando los usuarios:", error);
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);


  return (
    <div className="container">
      <div className={`${styles.searchBarContainer} mb-2 w-50`}>
        <Input
          type="text"
          placeholder="Buscar Nombre"
          value={searchText}
          onChange={handleSearch}
          variant={"searchBar"}
        />
        <SearchIcono />
      </div>

      <Table
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
      />
    </div>
  )


};

