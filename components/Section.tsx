import React from 'react';
import type { SectionData, SubSectionData } from '../types';

interface SectionProps {
    section: SectionData;
    subSectionProgress: { [subSectionId: string]: { answered: number; total: number } };
    onSubSectionSelect: (subSectionId: string) => void;
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
}> = ({ subSection, progress, onClick }) => {
    const percentage = progress.total > 0 ? (progress.answered / progress.total) * 100 : 0;

    return (
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-800/50 transition-colors duration-200 border-b border-dark-border last:border-b-0"
        >
            <div className="flex-1 pr-4">
                <h3 className="font-semibold text-dark-text-primary">{subSection.title}</h3>
                {subSection.description && <p className="text-sm text-dark-text-secondary mt-1 line-clamp-2">{subSection.description}</p>}
            </div>
            <div className="flex items-center gap-4 text-dark-text-secondary flex-shrink-0">
                <span className="text-sm font-semibold w-10 text-right">{Math.round(percentage)}%</span>
                <ChevronRightIcon className="w-5 h-5" />
            </div>
        </button>
    );
};

const Section: React.FC<SectionProps> = ({ section, subSectionProgress, onSubSectionSelect }) => {
    return (
        <div className="bg-dark-card rounded-xl shadow-lg overflow-hidden border border-dark-border">
            <div className="p-4 md:p-6 bg-slate-900/50 border-b border-dark-border">
                <h2 className="text-2xl font-bold text-indigo-400">{section.title}</h2>
                <p className="text-dark-text-secondary mt-1">{section.description}</p>
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
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Section;