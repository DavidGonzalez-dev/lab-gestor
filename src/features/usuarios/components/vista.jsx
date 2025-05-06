import React, { useState, useEffect, useMemo, useRef } from "react";
import UserTable from "./UserTable";
import { VistaUsuarios } from "../services/index";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import {
  VerUsuarios,
  EliminarUsuario,
} from "@features/usuarios/components/buttonsUsuarios";

// Registro de módulos para AG Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ParentComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const gridRef = useRef(null); // ✅ Referencia a la API del grid

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await VistaUsuarios();
        setRowData(users);
      } catch (error) {
        console.error("Error cargando los usuarios:", error);
      }
    };

    loadUsers();
  }, []);

  // Manejar búsqueda rápida
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (gridRef.current) {
      gridRef.current.setQuickFilter(value);
    } else {
      console.warn("gridApi aún no está disponible.");
    }
  };

  // Capturar la instancia de la API de AG Grid
  const onGridReady = (params) => {
    console.log("Grid API inicializada:", params.api);
    gridRef.current = params.api;
  };

  // Definición de columnas
  const columnDefs = [
    { headerName: "# Cédula", field: "ID" },
    { headerName: "Nombres", field: "nombres" },
    { headerName: "Apellidos", field: "apellidos" },
    { headerName: "Correo", field: "correo" },
    {
      headerName: "Detalles",
      field: "detalles",
      cellRenderer: (params) => <VerUsuarios data={params.data} />,
    },
    {
      headerName: "Eliminar",
      field: "eliminar",
      cellRenderer: (params) => <EliminarUsuario data={params.data} />,
    },
  ];

  // Definiciones por defecto para las columnas
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: "agTextColumnFilter",
      flex: 2,
    }),
    []
  );

  return (
    <div className="container">
      <div className="input-group m-2">
        <span className="input-group-text">🔍</span>
        <input
          type="text"
          placeholder="Buscar Nombre"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      <UserTable
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default ParentComponent;
