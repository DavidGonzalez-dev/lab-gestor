import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./TablaProductos.css"


const TablaProductos = () => {
    return (
      <div className="seccionTablaProductos">
        <h2 className="tituloProductos">Productos</h2>
        <div className="contenedorTablaProducto">
        <table className="tablaProductos">
          <thead className="encabezado">
            <tr>
              <th className='registro'># Registro</th>
              <th className='nombreProducto'>Producto</th>
              <th className='respondable'>Responsable</th>
              <th className='ingreso'>Ingreso</th>
              <th className='estado'>Estado</th>
              <th className='categoria'>Categoría</th>
              <th className='detallesProductos'>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i} className="informacionProductos">
                <td className="registro">000-000-000</td>
                <td className="nombreProducto">Nombre</td>
                <td className="responsable">Nombre</td>
                <td className="ingreso">dd/mm/yyyy</td>
                <td className="estado"><button >Ingresado</button></td>
                <td className="categoria"><button>Materia Prima</button></td>
                <td className="detallesProductos"><button>Ver</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  };
  
  export default TablaProductos;
  