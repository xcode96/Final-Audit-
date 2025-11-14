import React from 'react';
import type { SectionData, SubSectionData, SubSectionResponse, QuestionResponse } from '../types';
import QuestionAccordion from './QuestionAccordion';
import ProgressBar from './ProgressBar';

interface SubSectionDetailViewProps {
    section: SectionData;
    subSection: SubSectionData;
    responses: SubSectionResponse;
    onResponseChange: (subSectionId: string, questionIndex: number, newResponse: Partial<QuestionResponse>) => void;
    onBack: () => void;
}

const SubSectionDetailView: React.FC<SubSectionDetailViewProps> = ({ section, subSection, responses, onResponseChange, onBack }) => {
    const Icon = section.icon;

    // FIX: Explicitly type the parameter 'r' in the filter function to 'QuestionResponse' to resolve the 'Property 'resultStatus' does not exist on type 'unknown'' error.
    const answeredCount = Object.values(responses).filter((r: QuestionResponse) => r.resultStatus !== 'Not assessed').length;
    const totalCount = subSection.questions.length;
    const percentage = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;
    
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
                    <div className="mt-4">
                      <p className="text-dark-text-secondary text-sm">{answeredCount} out of {totalCount} ({Math.round(percentage)}%) complete. Showing {totalCount} items.</p>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                         <button className="px-3 py-1.5 bg-slate-700 text-white text-sm font-semibold rounded-md hover:bg-slate-600 transition-colors">Reset</button>
                         <button className="px-3 py-1.5 bg-slate-700 text-white text-sm font-semibold rounded-md hover:bg-slate-600 transition-colors flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.59L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z" clipRule="evenodd" />
                            </svg>
                            Filters
                        </button>
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
                            key={index}
                            question={question}
                            response={responses[`q${index}`]}
                            onChange={(newResponse) => onResponseChange(subSection.id, index, newResponse)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubSectionDetailView;