import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./TablaClientes.css"


const TablaClientes = () => {
    return (
      <div className="seccionTablaCliente">
        <h2 className="tituloCliente">Cliente</h2>
        <div className="contendorTablaCliente">
        <table className="tablaCliente">
          <thead className="encabezadoCliente">
            <tr>
              <th className="idCliente"># Cliente</th>
              <th className='nombreCliente'>Nombre del Cliente</th>
              <th className='direccionCliente'>Dirección del Cliente</th>
              <th className='detallesCliente'>Detalles</th>
              <th className='eliminarCliente'>Editar</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i} className="informacionCliente">
                <td className="idCliente">000-000-000</td>
                <td className="nombreCliente">Nombre </td>
                <td className="direccionCliente">Direccion</td>  
                <td className="detallesCliente"><button>Ver</button></td>
                <td className="eliminarCliente"><button>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  };
  
  export default TablaClientes;
  