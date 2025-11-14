
import React from 'react';

interface ProgressBarProps {
    total: number;
    current: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="w-full">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-dark-text-primary">{Math.round(percentage)}% Complete</span>
                <span className="text-sm font-medium text-dark-text-secondary">{current} / {total} answered</span>
            </div>
            <div className="w-full bg-dark-border rounded-full h-2.5">
                <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;