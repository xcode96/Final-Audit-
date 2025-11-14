
import React from 'react';
import type { SectionData, SubSectionData } from '../types';
import { PencilIcon, PlusIcon, TrashIcon } from './icons';

interface SectionProps {
    section: SectionData;
    subSectionProgress: { [subSectionId: string]: { answered: number; total: number } };
    onSubSectionSelect: (subSectionId: string) => void;
    isAdmin: boolean;
    onAddSubSection: () => void;
    onEditSubSection: (subSection: SubSectionData) => void;
    onDeleteSubSection: (subSectionId: string) => void;
}

const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className || "w-5 h-5"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

const SubSectionRow: React.FC<{
    subSection: SubSectionData;
    progress: { answered: number; total: number };
    onClick: () => void;
    isAdmin: boolean;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ subSection, progress, onClick, isAdmin, onEdit, onDelete }) => {
    const percentage = progress.total > 0 ? (progress.answered / progress.total) * 100 : 0;

    return (
        <div
            className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-800/50 transition-colors duration-200 border-b border-dark-border last:border-b-0 group"
        >
            <div className="flex-1 pr-4 cursor-pointer" onClick={onClick}>
                <h3 className="font-semibold text-dark-text-primary">{subSection.title}</h3>
                {subSection.description && <p className="text-sm text-dark-text-secondary mt-1 line-clamp-2">{subSection.description}</p>}
            </div>
            <div className="flex items-center gap-4 text-dark-text-secondary flex-shrink-0">
                 {isAdmin && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-dark-text-secondary hover:text-white transition-colors">
                            <PencilIcon className="w-4 h-4" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 bg-red-800/50 hover:bg-red-700/60 rounded-md text-red-400 hover:text-white transition-colors">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}
                <span className="text-sm font-semibold w-10 text-right">{Math.round(percentage)}%</span>
                <div onClick={onClick} className="cursor-pointer">
                    <ChevronRightIcon className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
};

const Section: React.FC<SectionProps> = ({ section, subSectionProgress, onSubSectionSelect, isAdmin, onAddSubSection, onEditSubSection, onDeleteSubSection }) => {
    return (
        <div className="bg-dark-card rounded-xl shadow-lg overflow-hidden border border-dark-border">
            <div className="p-4 md:p-6 bg-slate-900/50 border-b border-dark-border flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-indigo-400">{section.title}</h2>
                    <p className="text-dark-text-secondary mt-1">{section.description}</p>
                </div>
                {isAdmin && (
                     <button onClick={onAddSubSection} className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-1.5 flex-shrink-0">
                        <PlusIcon className="w-4 h-4" />
                        Add Subsection
                    </button>
                )}
            </div>
            <div className="bg-dark-card">
                {section.subSections.map(sub => {
                    const progress = subSectionProgress[sub.id] || { answered: 0, total: 0 };
                    return (
                        <SubSectionRow
                            key={sub.id}
                            subSection={sub}
                            progress={progress}
                            onClick={() => onSubSectionSelect(sub.id)}
                            isAdmin={isAdmin}
                            onEdit={() => onEditSubSection(sub)}
                            onDelete={() => onDeleteSubSection(sub.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Section;
