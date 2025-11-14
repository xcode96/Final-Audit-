
import React from 'react';

interface SummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    summary: { [key: string]: number };
    totalQuestions: number;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ isOpen, onClose, summary, totalQuestions }) => {
    if (!isOpen) return null;

    const statusConfig = {
        'Compliant': { color: 'bg-status-compliant', text: 'Compliant' },
        'Partially Compliant': { color: 'bg-status-partial', text: 'Partially Compliant' },
        'Non-Compliant': { color: 'bg-status-noncompliant', text: 'Non-Compliant' },
        'Not Applicable': { color: 'bg-slate-500', text: 'Not Applicable' },
        'Not assessed': { color: 'bg-status-unanswered', text: 'Not assessed' },
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-dark-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-dark-border"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-dark-card/80 backdrop-blur-sm border-b border-dark-border p-6 z-10 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-indigo-400">Audit Summary</h2>
                    <button onClick={onClose} className="text-dark-text-secondary hover:text-dark-text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-dark-text-primary mb-3">Compliance Status Overview</h3>
                        <div className="flex w-full h-8 rounded-full overflow-hidden bg-dark-bg">
                            {Object.entries(summary).map(([status, count]) => {
                                if (count === 0) return null;
                                const percentage = (Number(count) / totalQuestions) * 100;
                                const config = statusConfig[status as keyof typeof statusConfig];
                                return (
                                    <div
                                        key={status}
                                        className={`${config.color} transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                        title={`${config.text}: ${count} (${percentage.toFixed(1)}%)`}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(summary).map(([status, count]) => {
                            const config = statusConfig[status as keyof typeof statusConfig];
                             const percentage = totalQuestions > 0 ? (Number(count) / totalQuestions) * 100 : 0;
                            return (
                                <div key={status} className="bg-dark-bg p-4 rounded-lg border border-dark-border">
                                    <div className="flex items-center">
                                        <span className={`w-4 h-4 rounded-full mr-3 ${config.color}`}></span>
                                        <span className="font-semibold text-dark-text-primary">{config.text}</span>
                                    </div>
                                    <div className="mt-2 text-right">
                                        <span className="text-2xl font-bold text-dark-text-primary">{count}</span>
                                        <span className="ml-2 text-dark-text-secondary">({percentage.toFixed(1)}%)</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="sticky bottom-0 bg-dark-card/80 backdrop-blur-sm border-t border-dark-border p-4 text-right">
                     <button
                        onClick={onClose}
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-dark-card"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummaryModal;