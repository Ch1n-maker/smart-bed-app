import { useBedStore } from '../../store/useBedStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PressureChart() {
  const pressureHistory = useBedStore(s => s.pressureHistory);

  const data = pressureHistory.slice(-60).map(p => ({
    time: new Date(p.time).toLocaleTimeString('zh-CN', { second: '2-digit' }),
    value: p.value,
  }));

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-text mb-3">压力趋势</h3>
      <div style={{ width: '100%', height: 160 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 10 }} domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1565C0"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#1565C0' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
