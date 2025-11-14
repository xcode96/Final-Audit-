
import React from 'react';
import type { SectionData } from '../types';
import { CircleProgress } from './DashboardComponents';
import { PencilIcon, TrashIcon } from './icons';

interface SectionCardProps {
    section: SectionData;
    onClick: () => void;
    answered: number;
    total: number;
    isAdmin: boolean;
    onEdit: (section: SectionData) => void;
    onDelete: (sectionId: string) => void;
}

const colorClasses: { [key: string]: { text: string; bg: string; } } = {
    yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    green: { text: 'text-green-400', bg: 'bg-green-500/20' },
    red: { text: 'text-red-400', bg: 'bg-red-500/20' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/20' },
    teal: { text: 'text-teal-400', bg: 'bg-teal-500/20' },
};

const SectionCard: React.FC<SectionCardProps> = ({ section, onClick, answered, total, isAdmin, onEdit, onDelete }) => {
    const Icon = section.icon;
    const percentage = total > 0 ? (answered / total) * 100 : 0;
    const colors = colorClasses[section.color] || { text: 'text-slate-400', bg: 'bg-slate-500/20' };

    return (
        <div 
            onClick={onClick}
            className="group bg-dark-card p-5 rounded-xl border border-dark-border hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full relative"
        >
             {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(section);}} className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-dark-text-secondary hover:text-white transition-colors">
                        <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(section.id);}} className="p-1.5 bg-red-800/50 hover:bg-red-700/60 rounded-md text-red-400 hover:text-white transition-colors">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            )}
            <div className="flex justify-between items-start">
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                   <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                 <CircleProgress percentage={percentage} colorClass={colors.text} />
            </div>
            <div className="mt-4 flex-grow">
                <h3 className={`font-bold text-lg ${colors.text}`}>{section.title}</h3>
                <p className="text-dark-text-secondary text-sm mt-1">{section.description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-dark-border/50">
                 <p className={`font-bold text-sm ${colors.text}`}>{answered} / {total} Done</p>
            </div>
        </div>
    );
};

export default SectionCard;
