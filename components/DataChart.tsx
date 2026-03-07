import React, { useEffect, useState, useRef } from 'react';

interface DataPoint {
    label: string;
    value: number;
}

interface DataChartProps {
    title: string;
    data: DataPoint[];
    color: string;
    unit?: string;
}

const DataChart: React.FC<DataChartProps> = ({ title, data: initialData, color, unit = '' }) => {
    const [data, setData] = useState(initialData);
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);

    // Sync state if initialData changes externally
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    // Simulate Real-time Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const newData = [...prevData];
                // Only update the last few points to simulate a trend
                const lastIdx = newData.length - 1;
                const randomFluctuation = (Math.random() - 0.4) * (newData[lastIdx].value * 0.01);
                newData[lastIdx] = {
                    ...newData[lastIdx],
                    value: Math.round(newData[lastIdx].value + randomFluctuation)
                };
                return newData;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Handle Path Animation
    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, [data]);

    const padding = 40;
    const width = 500;
    const height = 300;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const values = data.map(d => d.value);
    const min = Math.min(...values) * 0.99;
    const max = Math.max(...values) * 1.01;
    const range = max - min || 1;

    const points = data.map((d, i) => ({
        x: padding + (i / (data.length - 1)) * chartWidth,
        y: padding + chartHeight - ((d.value - min) / range) * chartHeight,
        value: d.value,
        label: d.label
    }));

    const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl w-full max-w-2xl mx-auto overflow-hidden group">
            <h3 className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-6 text-center">{title}</h3>

            <div className="relative">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                        <line
                            key={i}
                            x1={padding}
                            y1={padding + chartHeight * p}
                            x2={padding + chartWidth}
                            y2={padding + chartHeight * p}
                            stroke="white"
                            strokeWidth="0.5"
                            strokeOpacity="0.1"
                        />
                    ))}

                    {/* Main Path with drawing animation */}
                    <path
                        ref={pathRef}
                        d={pathData}
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-1000 ease-in-out"
                        style={{
                            filter: `drop-shadow(0 0 8px ${color})`,
                            strokeDasharray: pathLength,
                            strokeDashoffset: pathLength, // Simple trigger or keep 0
                            animation: 'draw 2s ease-out forwards'
                        }}
                    />

                    {/* Data Points and Labels */}
                    {points.map((p, i) => (
                        <g key={i} className="group/point cursor-pointer transition-all duration-500">
                            <circle
                                cx={p.x}
                                cy={p.y}
                                r="4"
                                fill={color}
                                className="transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            />
                            <text
                                x={p.x}
                                y={p.y - 15}
                                textAnchor="middle"
                                fill="white"
                                fontSize="11"
                                fontWeight="black"
                                className="transition-all duration-500 drop-shadow-md"
                            >
                                {p.value.toLocaleString()}{unit}
                            </text>
                            <text
                                x={p.x}
                                y={height - padding + 20}
                                textAnchor="middle"
                                fill="white"
                                fillOpacity="0.4"
                                fontSize="10"
                                fontWeight="bold"
                                className="uppercase tracking-tighter"
                            >
                                {p.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            <style>{`
        @keyframes draw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
        </div>
    );
};

export default DataChart;
