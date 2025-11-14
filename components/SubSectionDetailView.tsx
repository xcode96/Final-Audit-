import React from 'react';
import type { SectionData, SubSectionData, SubSectionResponse, QuestionResponse, Question } from '../types';
import QuestionAccordion from './QuestionAccordion';
import { PlusIcon } from './icons';

interface SubSectionDetailViewProps {
    section: SectionData;
    subSection: SubSectionData;
    responses: SubSectionResponse;
    onResponseChange: (subSectionId: string, questionIndex: number, newResponse: Partial<QuestionResponse>) => void;
    onBack: () => void;
    isAdmin: boolean;
    onQuestionChange: (sectionId: string, subSectionId: string, qIndex: number, updatedQuestion: Question) => void;
    onQuestionDelete: (sectionId: string, subSectionId: string, qIndex: number) => void;
    onQuestionAdd: (sectionId: string, subSectionId: string) => void;
}

const SubSectionDetailView: React.FC<SubSectionDetailViewProps> = ({ 
    section, 
    subSection, 
    responses, 
    onResponseChange, 
    onBack, 
    isAdmin,
    onQuestionChange,
    onQuestionDelete,
    onQuestionAdd
}) => {
    const Icon = section.icon;

    const answeredCount = Object.keys(responses).filter(key => responses[key].resultStatus !== 'Not assessed').length;
    const totalCount = subSection.questions.length;
    
    const colorClasses: { [key: string]: { text: string; bg: string; } } = {
        yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/20' },
        green: { text: 'text-green-400', bg: 'bg-green-500/20' },
        red: { text: 'text-red-400', bg: 'bg-red-500/20' },
        purple: { text: 'text-purple-400', bg: 'bg-purple-500/20' },
        teal: { text: 'text-teal-400', bg: 'bg-teal-500/20' },
    };

    const colors = colorClasses[section.color] || { text: 'text-slate-400', bg: 'bg-slate-500/20' };

    return (
         <div>
            <button 
                onClick={onBack}
                className="mb-6 flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Back to {section.title}
            </button>

            <div className="bg-dark-card rounded-xl shadow-lg overflow-hidden border border-dark-border">
                {/* Header */}
                <div className="p-5 md:p-6 bg-slate-900/50">
                    <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-14 h-14 ${colors.bg} rounded-lg flex items-center justify-center`}>
                           <Icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                        <div>
                            <h2 className={`text-2xl font-bold ${colors.text}`}>{section.title} / {subSection.title}</h2>
                            <p className="text-dark-text-secondary mt-1">{subSection.description}</p>
                        </div>
                    </div>
                     <div className="mt-4 flex justify-between items-center">
                        <p className="text-dark-text-secondary text-sm">Showing {totalCount} items.</p>
                        {isAdmin && (
                            <button onClick={() => onQuestionAdd(section.id, subSection.id)} className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-1.5">
                                <PlusIcon className="w-4 h-4" />
                                Add Question
                            </button>
                        )}
                    </div>
                </div>

                {/* Questions List */}
                <div className="bg-dark-card p-2 sm:p-4">
                    <div className="border-b border-dark-border px-4 py-2 text-xs text-dark-text-secondary uppercase tracking-wider hidden md:grid grid-cols-12 gap-4">
                        <div className="col-span-6">Control</div>
                        <div className="col-span-2 text-center">Priority</div>
                        <div className="col-span-2 text-center">Status</div>
                        <div className="col-span-2 text-center">Result</div>
                    </div>
                    {subSection.questions.map((question, index) => (
                        <QuestionAccordion
                            key={question.id || index}
                            question={question}
                            response={responses[`q${index}`]}
                            onChange={(newResponse) => onResponseChange(subSection.id, index, newResponse)}
                            isAdmin={isAdmin}
                            onQuestionChange={(updatedQuestion) => onQuestionChange(section.id, subSection.id, index, updatedQuestion)}
                            onQuestionDelete={() => onQuestionDelete(section.id, subSection.id, index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubSectionDetailView;