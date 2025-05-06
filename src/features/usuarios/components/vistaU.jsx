import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

// Registro de módulos
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const UserTable = ({ rowData, columnDefs, defaultColDef, onGridReady }) => {
  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowModelType="clientSide" // 👈 importante para v33+
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default UserTable;
