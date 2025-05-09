import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { themeQuartz, iconSetQuartzBold } from 'ag-grid-community';

// Registro de  que se van a utilizar
ModuleRegistry.registerModules([AllCommunityModule]);


// Declaracion del tema
const myTheme = themeQuartz
  .withPart(iconSetQuartzBold)
  .withParams({
    borderRadius: 10,
    browserColorScheme: "light",
    fontFamily: "inherit",
    headerBackgroundColor: "#1F5C99",
    headerFontSize: 14,
    headerRowBorder: true,
    headerTextColor: "#FFFFFF",
    iconSize: 16,
    wrapperBorder: false,
    wrapperBorderRadius: 10
  });

export const Table = ({ rowData, columnDefs, onGridReady, isExternalFilterPresent, doesExternalFilterPass }) => {

  return (
    <div style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: false, suppressMovable: true, minWidth: 100, resizable: false, flex: 1 }}
        onGridReady={onGridReady}
        theme={myTheme}
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
      />
    </div>
  );
};

