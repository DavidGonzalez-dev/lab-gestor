import { useEffect, useState } from 'react';
import { GetEstadisticasProductoSemana } from '../../services';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ProductosIngresadosSemana = () => {

    const [data, setData] = useState([])

    // Funcion para formater los datos
    const formatData = (data) => {
        const diasOrdenados = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

        return diasOrdenados.map(dia => ({
            dia,
            cantidad: data[dia] ?? 0  // Usa 0 si no existe el día
        }));
    }

    // Funcion para carga de datos
    const loadData = async () => {
        try {
            const data = await GetEstadisticasProductoSemana()
            console.log(data)
            setData(formatData(data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])
    return (
        <ResponsiveContainer width="100%" height={300} >
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#4f46e5" />
            </BarChart>
        </ResponsiveContainer >
    )

}