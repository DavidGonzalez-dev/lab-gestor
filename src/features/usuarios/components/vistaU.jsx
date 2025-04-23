import React, { useState, useEffect } from "react";
import UserTable from "./vista";
import { fetchUsers } from "../services/usuarios";

const ParentComponent = () => {
  const [rowData, setRowData] = useState([]);
  const columnDefs = [
    { headerName: "ID", field: "ID", sortable: true, filter: true },
    { headerName: "Nombres", field: "Nombres", sortable: true, filter: true },
    {
      headerName: "Apelllidos",
      field: "Apellidos",
      sortable: true,
      filter: true,
    },
    { headerName: "Correo", field: "Correo", sortable: true, filter: true },
  ];

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setRowData(users);
      } catch (error) {
        console.error("Error cargando los usuarios:", error);
      }
    };

    loadUsers();
  }, []);

  return <UserTable rowData={rowData} columnDefs={columnDefs} />;
};

export default ParentComponent;
