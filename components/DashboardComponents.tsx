import React, { useRef, useEffect, useState } from 'react';
import type { SectionData } from '../types';
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
    sections: SectionData[];
}

export const RadarChartCard: React.FC<RadarChartCardProps> = ({ sectionProgress, sections }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<any>(null);

    const chartData = {
        labels: sections.map(s => s.title.replace(/ *\([^)]*\) */g, "")),
        datasets: [{
            label: 'Category Progress',
            data: sections.map(s => {
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
    sections: SectionData[];
    sectionProgress: { [sectionId: string]: { answered: number; total: number } };
    subSectionProgress: { [subSectionId: string]: { answered: number; total: number } };
    onSubSectionSelect: (sectionId: string, subSectionId: string) => void;
}


const colorClasses: { [key: string]: { text: string; bg: string; } } = {
    yellow: { text: 'text-yellow-400', bg: 'bg-yellow-400' },
    green: { text: 'text-green-400', bg: 'bg-green-400' },
    red: { text: 'text-red-400', bg: 'bg-red-400' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-400' },
    teal: { text: 'text-teal-400', bg: 'bg-teal-400' },
};

export const SectionListCard: React.FC<SectionListCardProps> = ({ sections, sectionProgress, subSectionProgress, onSubSectionSelect }) => {
    const [expandedSectionIds, setExpandedSectionIds] = useState<string[]>(() => sections.map(s => s.id));

    const handleSectionToggle = (sectionId: string) => {
        setExpandedSectionIds(prevIds =>
            prevIds.includes(sectionId)
                ? prevIds.filter(id => id !== sectionId)
                : [...prevIds, sectionId]
        );
    };
    
    const expandAll = () => setExpandedSectionIds(sections.map(s => s.id));
    const collapseAll = () => setExpandedSectionIds([]);


    return (
        <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-dark-text-primary">Audit Sections</h3>
                <div className="flex items-center gap-2">
                    <button onClick={expandAll} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Expand All</button>
                    <span className="text-dark-text-secondary">|</span>
                    <button onClick={collapseAll} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Collapse All</button>
                </div>
            </div>
            <div className="space-y-2">
                {sections.map(section => {
                    const isExpanded = expandedSectionIds.includes(section.id);
                    const progress = sectionProgress[section.id] || { answered: 0, total: 0 };
                    const percentage = progress.total > 0 ? (progress.answered / progress.total) * 100 : 0;
                    const Icon = section.icon;
                    const colors = colorClasses[section.color] || { text: 'text-slate-400', bg: 'bg-slate-400' };

                    return (
                        <div key={section.id} className="bg-dark-bg/50 rounded-lg overflow-hidden border border-dark-border transition-all duration-300">
                            <button onClick={() => handleSectionToggle(section.id)} className="w-full flex flex-col p-4 text-left group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Icon className={`w-6 h-6 ${colors.text}`} />
                                        <span className="font-semibold text-dark-text-primary group-hover:text-white transition-colors">{section.title}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-mono text-dark-text-secondary">{progress.answered}/{progress.total}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 text-dark-text-secondary transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full bg-dark-border rounded-full h-1 mt-3">
                                    <div className={`${colors.bg} h-1 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                                </div>
                            </button>
                            {isExpanded && (
                                <div className="pl-8 pr-4 pb-2 border-t border-dark-border">
                                    <ul className="space-y-1 py-2">
                                        {section.subSections.map(subSection => {
                                            const subProgress = subSectionProgress[subSection.id] || { answered: 0, total: 0 };
                                            const subPercentage = subProgress.total > 0 ? (subProgress.answered / subProgress.total) * 100 : 0;
                                            
                                            return (
                                                <li key={subSection.id}>
                                                    <button onClick={() => onSubSectionSelect(section.id, subSection.id)} className="w-full text-left p-2 rounded-md hover:bg-slate-700/50 flex items-center justify-between group">
                                                        <span className="text-sm text-dark-text-secondary group-hover:text-dark-text-primary">{subSection.title}</span>
                                                        <span className="text-xs font-mono text-dark-text-secondary">{Math.round(subPercentage)}%</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

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