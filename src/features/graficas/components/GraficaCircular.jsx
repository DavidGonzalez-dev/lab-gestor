import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./GraficaCircular.css"

const data = [
  { name: 'Certificado firmado', value: 40 },
  { name: 'Certificado sin empezar', value: 30 },
  { name: 'Certificado en revisión', value: 30 },
];

const COLORS = ['#38A169', '#ECC94B', '#ED8936'];

const GraficaCircular = () => (
  <div className="seccionGraficaC">
    <div className="GraficaCircular">
    <h2 className="tituloCertificados">Avance de Certificados</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={60} fill="#8884d8" label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    
  </div>
);

export default GraficaCircular;
