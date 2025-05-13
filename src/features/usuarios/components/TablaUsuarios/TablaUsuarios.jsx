import { useState, useEffect, useRef } from "react";

import {
  Table,
  PillType,
  PillState,
  Input,
  ButtonCellRenderer,
} from "@shared/components";

import { getUsuarios, DeshabilitarUsuario } from "../../services/";
import Swal from "sweetalert2";

import { ToTitleCase } from "@shared/utils";
import { SearchIcono, TrashIcon, EyeIcon } from "@shared/iconos";
import styles from "./TablaUsuarios.module.css";

export const TablaUsuarios = () => {
  //? ----------------------------------------------
  //? Definicion de los estados
  //? ----------------------------------------------
  const [rowData, setRowData] = useState([]) // Estado para almacenar la informacion de la tabla
  const [searchText, setSearchText] = useState("") // Estado para almacenar el texto que se busca
  // Definición de columnas
  const columnDefs = [
    {
      headerName: "# Cédula",
      field: "documento",
      width: 120,
      flex: 0,
    },
    {
      headerName: "Nombres",
      field: "nombres",
      valueFormatter: (p) => ToTitleCase(p.value),
      minWidth: 150,
    },
    {
      headerName: "Apellidos",
      field: "apellidos",
      valueFormatter: (p) => ToTitleCase(p.value),
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
        variant: p.value === "admin" ? "darkBlue" : "lightBlue",
      }),
      width: 120,
    },
    {
      headerName: "Estado",
      field: "estado",
      cellClass: "text-center",
      cellRenderer: PillState,
      cellRendererParams: (p) => ({
        variant: p.value === true ? "green" : "red",
      }),
    },
    {
      headerName: "Detalles",
      field: "detalles",
      width: 100,
      cellRenderer: ButtonCellRenderer,
      cellRendererParams: (p) => ({
        icon: EyeIcon,
        variant: "default",
        parentMethod: () => verUsuario(p.data),
      }),
    },
    {
      headerName: "Eliminar",
      field: "eliminar",
      width: 100,
      cellClass: "custom-cell-center",
      cellRenderer: ButtonCellRenderer,
      cellRendererParams: (p) => ({
        icon: TrashIcon,
        variant: "buttonCancel",
        parentMethod: () => eliminarUsuario(p.data),
      }),
    },
  ];

  //? ----------------------------------------------
  //? Logica de los filtros
  //? ----------------------------------------------

  // Manejar búsqueda por nombre o apellido
  const handleSearch = (event) => {
    setSearchText(event.target.value);

    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.onFilterChanged();
    }
  };

  // Funcion para verificar si hay algun tipo de filtro activo
  const isExternalFilterPresent = () => {
    return searchText !== ""
  }

  // Funcion para determinar si una nodo(fila) pasa un filtro
  const doesExternalFilterPass = (node) => {
    if (searchText !== "") {
      return (
        node.data.nombres.toLowerCase().includes(searchText.toLowerCase()) ||
        node.data.apellidos.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  };

  //? ----------------------------------------------
  //? Logica de los botones de accion
  //? ----------------------------------------------
  const verUsuario = (usuario) => {
    //se redirige a la pagina dependiendo del id
    window.location.href = `/usuarios/${usuario.ID}`;
  };
  const eliminarUsuario = (data) => {
    // Se verifica si el usuario esta desactivado
    if (!data.estado) {
      Swal.fire({
        icon: "error",
        title: "Este usuario ya esta inhabilitado",
        text: "Si quieres cambiar el estado de este usuario tienes que modificarlo directamente desde la pagina de perfil del usuario",
      });
    }
    // En caso de no estarlo se sigue con el flujo normal
    else {
      Swal.fire({
        title: "¿Estas seguro de dehabilitar este usuario?",
        text: "Al deshabilitar este usuario le estaras negando el acceso al sistema, asi como a todas las funcionalidades del mismo",
        icon: "warning",
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red",
      }).then(async (result) => {
        // Si se confirma que se quiere enviar el formulario
        if (result.isConfirmed) {
          // Se hace llamada a la api
          try {
            const success = await DeshabilitarUsuario(data.documento);
            if (success) {
              Swal.fire({
                title: "Elusuario se deshabilitó con exito!",
                icon: "success",
                heightAuto: false,
                scrollbarPadding: false,
              });

              // Se actualiza el estado local para reflejar los cambios
<<<<<<< HEAD
              setRowData((prevData) =>
                prevData.map((usuario) =>
                  usuario.ID === data.ID
                    ? { ...usuario, estado: false }
                    : usuario
=======
              setRowData(prevData =>
                prevData.map(usuario =>
                  usuario.documento === data.documento ? { ...usuario, estado: false } : usuario
>>>>>>> b0fa768395129d9a73217f57cb7952f33c5f51a4
                )
              );
            }
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Ups! algo salio mal",
              text: err.message,
<<<<<<< HEAD
=======
<<<<<<< HEAD
            });
=======
>>>>>>> serviciosId
              heightAuto: false,
              scrollbarPadding: false,
            })
>>>>>>> b0fa768395129d9a73217f57cb7952f33c5f51a4
          }
        }
      });
    }
  };

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
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
      />
    </div>
  );
};
