import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { themeQuartz, iconSetQuartzBold } from 'ag-grid-community';
import { useEffect, useRef } from "react";

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

export const Table = ({ rowData, columnDefs, isExternalFilterPresent, doesExternalFilterPass }) => {
  const gridRef = useRef(null) // Referencia a la tabla


  // Previene que la informacion de la tabla no se ordene por defecto
  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.applyColumnState({
        defaultState: { sort: null },
      })
    }
  }, [rowData])


  // Capturar la instancia de la api de AGGrid
  const onGridReady = (params) => {
    gridRef.current = params
  }


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
        pagination={true}
        paginationAutoPageSize={true}
      />
    </div>
  );
};

