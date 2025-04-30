import react, { useState, useEffect, useMemo } from "react";
import UserTable from "./vista";
import VistaUsuarios from "../services/usuarios";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { VerUsuarios } from "@features/usuarios/components/buttonsUsuarios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ParentComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const VerUsuarios = ({ data }) => {
    return (
      <Button
        label="Ver"
        parentMethod={() => console.log("Viendo usuario:", data)}
        type="button"
        className="button"
        Icon={eye}
      />
    );
  };
  const columnDefs = [
    { headerName: "# Cédula", field: "ID", sortable: true, filter: true },
    {
      headerName: "Nombres",
      field: "nombres",
      sortable: true,
      filter: true,
    },
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
      cellRendererFramework: <VerUsuarios />,
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
        console.log("se cargo con exito");
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
      <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
        <UserTable rowData={rowData} columnDefs={columnDefs} theme={myTheme} />
      </div>
    </div>
  );
};

export default ParentComponent;
