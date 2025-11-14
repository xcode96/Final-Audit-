import React, { useRef, useEffect } from 'react';
import { CHECKLIST_DATA } from '../constants';
import ProgressBar from './ProgressBar';

interface YourProgressCardProps {
    answered: number;
    total: number;
}

export const YourProgressCard: React.FC<YourProgressCardProps> = ({ answered, total }) => (
    <div className="bg-dark-card p-6 rounded-xl border border-dark-border h-full">
        <h3 className="font-bold text-lg text-violet-400">Your Progress</h3>
        <p className="text-dark-text-secondary text-sm mt-1">You've completed {answered} out of {total} items.</p>
        <div className="mt-4">
            <ProgressBar total={total} current={answered} />
        </div>
        <div className="mt-6 text-center text-dark-text-secondary">
             <p>Select a category below to continue your audit.</p>
        </div>
    </div>
);

interface RadarChartCardProps {
    sectionProgress: { [sectionId: string]: { answered: number; total: number } };
}

export const RadarChartCard: React.FC<RadarChartCardProps> = ({ sectionProgress }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<any>(null);

    const chartData = {
        labels: CHECKLIST_DATA.map(s => s.title.replace(/ *\([^)]*\) */g, "")),
        datasets: [{
            label: 'Category Progress',
            data: CHECKLIST_DATA.map(s => {
                const progress = sectionProgress[s.id];
                if (!progress || progress.total === 0) return 0;
                return (progress.answered / progress.total) * 100;
            }),
            fill: true,
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: 'rgb(129, 140, 248)',
            pointBackgroundColor: 'rgb(129, 140, 248)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(99, 102, 241)'
        }]
    };

    useEffect(() => {
        if (!canvasRef.current || !(window as any).Chart) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new (window as any).Chart(ctx, {
            type: 'radar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: {
                            color: '#9ca3af',
                            font: {
                                size: 11
                            }
                        },
                        ticks: {
                            color: '#9ca3af',
                            backdropColor: 'transparent',
                            stepSize: 25,
                             callback: function(value: any) {
                                return value + "%"
                            }
                        },
                        min: 0,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [chartData]);


    return (
        <div className="bg-dark-card p-6 rounded-xl border border-dark-border h-full min-h-[300px]">
             <h3 className="font-bold text-lg text-dark-text-primary mb-2">Category Progress</h3>
            <div className="relative h-[250px] md:h-[300px]">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
};

interface SectionListCardProps {
    sectionProgress: { [sectionId: string]: { answered: number; total: number } };
    onSectionSelect: (id: string) => void;
}

const colorClasses: { [key: string]: { text: string; bg: string; } } = {
    yellow: { text: 'text-yellow-400', bg: 'bg-yellow-400' },
    green: { text: 'text-green-400', bg: 'bg-green-400' },
    red: { text: 'text-red-400', bg: 'bg-red-400' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-400' },
    teal: { text: 'text-teal-400', bg: 'bg-teal-400' },
};

export const SectionListCard: React.FC<SectionListCardProps> = ({ sectionProgress, onSectionSelect }) => {
    return (
        <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
            <h3 className="font-bold text-lg text-dark-text-primary mb-4">Quick Links</h3>
            <div className="space-y-3">
                {CHECKLIST_DATA.map(section => {
                    const progress = sectionProgress[section.id] || { answered: 0, total: 0 };
                    const percentage = progress.total > 0 ? (progress.answered / progress.total) * 100 : 0;
                    const Icon = section.icon;
                    const colors = colorClasses[section.color] || { text: 'text-slate-400', bg: 'bg-slate-400' };

                    return (
                        <div key={section.id} onClick={() => onSectionSelect(section.id)} className="group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Icon className={`w-5 h-5 ${colors.text}`} />
                                <span className="font-semibold text-dark-text-secondary group-hover:text-dark-text-primary transition-colors">{section.title}</span>
                            </div>
                            <div className="w-full bg-dark-border rounded-full h-1 mt-1.5">
                                <div className={`${colors.bg} h-1 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

interface CircleProgressProps {
    percentage: number;
    colorClass?: string;
}

export const CircleProgress: React.FC<CircleProgressProps> = ({ percentage, colorClass = 'text-indigo-400' }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-10 h-10">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    className="text-dark-border"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    className={colorClass}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${circumference}, ${circumference}`}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    transform="rotate(-90 18 18)"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-dark-text-secondary">{Math.round(percentage)}%</span>
            </div>
        </div>
    );
};