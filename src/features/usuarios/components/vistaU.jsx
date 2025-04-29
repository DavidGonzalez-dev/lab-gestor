import React, { useState, useEffect } from "react";
import UserTable from "./vista";
import VistaUsuarios from "../services/";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ParentComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const columnDefs = [
    { headerName: "# Cédula", field: "ID", sortable: true, filter: true },
    { headerName: "Nombres", field: "nombres", sortable: true, filter: true },
    {
      headerName: "Apellidos",
      field: "apellidos",
      sortable: true,
      filter: true,
    },
    { headerName: "Correo", field: "correo", sortable: true, filter: true },
    {
      headerName: "Detalles",
      field: "detalles",
      cellRendererFramework: (params) => (
        <button
          className="detalles-btn"
          onClick={() => verDetalles(params.data)}
        >
          Ver
        </button>
      ),
    },
    {
      headerName: "Eliminar",
      field: "eliminar",
      cellRendererFramework: (params) => (
        <button
          className="eliminar-btn"
          onClick={() => eliminarUsuario(params.data)}
        >
          Eliminar
        </button>
      ),
    },
  ];

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

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    const filteredData = rowData.filter((user) =>
      user.nombres.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRowData(filteredData);
  };

  return (
    <div>
      {}
      <input
        type="text"
        placeholder="Buscar Nombre"
        value={searchText}
        onChange={handleSearch}
        className="buscar-input"
      />
      <div className="filter-buttons">
        <button>Categoría</button>
        <button>Fecha</button>
        <button>Añadir Filtro</button>
        <button>Eliminar Filtros</button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: "50%" }}>
        <UserTable rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default ParentComponent;
