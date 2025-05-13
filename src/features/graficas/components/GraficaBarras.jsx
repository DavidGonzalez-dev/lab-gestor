import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./GraficaBarras.css"

const data = [
  { name: 'Aspirina', valor: 12 },
  { name: 'Acetona', valor: 9 },
  { name: 'Etanol', valor: 11 },
  { name: 'TabCin', valor: 7 },
  { name: 'Nekill', valor: 13 },
  { name: 'Tramadol', valor: 10 },
  { name: 'Advil', valor: 8 },
  { name: 'Diproina', valor: 9 },
  { name: 'Codeino', valor: 11 },
];

const GraficaBarras = () => (
  <div className="graficaBarras">
    <h2>Productos analizados este mes</h2>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="valor" fill="#3182CE" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default GraficaBarras;
