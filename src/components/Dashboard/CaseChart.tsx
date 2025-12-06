import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts';

import './CaseChart.scss';

interface CaseChartProps {
    data: {
        active: number;
        pending: number;
        closed: number;
        onHold: number;
    };
}

const COLORS = {
    Active: 'hsl(142, 76%, 36%)',
    Pending: 'hsl(38, 92%, 50%)',
    Closed: 'hsl(215, 20%, 55%)',
    'On Hold': 'hsl(199, 89%, 48%)',
};

const CaseChart: React.FC<CaseChartProps> = ({ data }) => {
    const chartData = [
        { name: 'Active', value: data.active },
        { name: 'Pending', value: data.pending },
        { name: 'Closed', value: data.closed },
        { name: 'On Hold', value: data.onHold },
    ].filter((item) => item.value > 0);

    return (
        <div className="case-chart">
            <div className="case-chart-header">
                <h3>Cases by Status</h3>
            </div>

            <div className="case-chart-content">
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                                stroke="transparent"
                            >
                                {chartData.map((entry) => (
                                    <Cell
                                        key={entry.name}
                                        fill={COLORS[entry.name as keyof typeof COLORS]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1c23',
                                    border: '1px solid #2a2d35',
                                    borderRadius: '8px',
                                    color: '#f8f9fa',
                                }}
                            />

                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CaseChart;
