import { useEffect, useState } from 'react';
import { GetEstadisticasProductoTipo } from '../../services';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#61696C', '#1D5CC9', '#22861E', '#f87171'];

export const PieChartEstadosProductos = () => {

    const [data, setData] = useState([])

    // Funcion para formatear los datos
    const formatearEstados = (data) => {
        return data.map(item => ({
            estado: item.nombre_estado,
            cantidad: item.cantidad_productos
        }));
    }

    // Logica de carga de datos
    const loadData = async () => {
        try {
            const data = await GetEstadisticasProductoTipo()
            setData(formatearEstados(data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="cantidad"
                    nameKey="estado"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}