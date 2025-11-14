import React, { useState } from 'react';
import type { Question, QuestionResponse, WorkflowStatus, ResultStatus, QuestionPriority } from '../types';

interface QuestionAccordionProps {
    question: Question;
    response: QuestionResponse;
    onChange: (newResponse: Partial<QuestionResponse>) => void;
}

const priorityColors: Record<QuestionPriority, string> = {
    'Essential': 'bg-red-500/80 text-white',
    'Advanced': 'bg-yellow-500/80 text-black',
    'Optional': 'bg-blue-500/80 text-white',
};
const resultColors: Record<ResultStatus, string> = {
    'Not assessed': 'border-slate-500 text-slate-300',
    'Compliant': 'border-green-500 text-green-300',
    'Partially Compliant': 'border-yellow-500 text-yellow-300',
    'Non-Compliant': 'border-red-500 text-red-300',
    'Not Applicable': 'border-gray-500 text-gray-300'
};
const workflowStatusColors: Record<WorkflowStatus, string> = {
    'To do': 'bg-slate-600 text-slate-200',
    'In Progress': 'bg-sky-600 text-white',
    'Done': 'bg-indigo-600 text-white',
};

const QuestionAccordion: React.FC<QuestionAccordionProps> = ({ question, response, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const currentResponse: QuestionResponse = response || {
        workflowStatus: 'To do',
        resultStatus: 'Not assessed',
        notes: '',
        evidence: '',
    };

    const handleFieldChange = (field: keyof QuestionResponse, value: string) => {
        onChange({ [field]: value });
    };

    return (
        <div className="border-b border-dark-border last:border-b-0">
            {/* Collapsed View */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-4 hover:bg-slate-800/50 transition-colors grid grid-cols-12 gap-4 items-center"
            >
                <div className="col-span-12 md:col-span-6 flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 flex-shrink-0 mt-0.5 text-dark-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <span className="text-dark-text-primary">{question.text}</span>
                </div>
                <div className="col-span-4 md:col-span-2 text-center">
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${priorityColors[question.priority]}`}>{question.priority}</span>
                </div>
                <div className="col-span-4 md:col-span-2 text-center">
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${workflowStatusColors[currentResponse.workflowStatus]}`}>{currentResponse.workflowStatus}</span>
                </div>
                <div className="col-span-4 md:col-span-2 text-center">
                     <span className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${resultColors[currentResponse.resultStatus]}`}>{currentResponse.resultStatus.replace(' Compliant', '')}</span>
                </div>
            </button>

            {/* Expanded View */}
            {isOpen && (
                <div className="p-5 bg-dark-bg/50 border-t border-dark-border space-y-6">
                    <div>
                        <h4 className="font-semibold text-indigo-400 mb-1">Description</h4>
                        <p className="text-dark-text-secondary text-sm">{question.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <label htmlFor={`status-${question.text}`} className="block text-sm font-medium text-dark-text-secondary mb-1">Status</label>
                             <select
                                id={`status-${question.text}`}
                                value={currentResponse.workflowStatus}
                                onChange={(e) => handleFieldChange('workflowStatus', e.target.value)}
                                className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                             >
                                 <option>To do</option>
                                 <option>In Progress</option>
                                 <option>Done</option>
                             </select>
                        </div>
                         <div>
                             <label htmlFor={`result-${question.text}`} className="block text-sm font-medium text-dark-text-secondary mb-1">Result</label>
                             <select
                                id={`result-${question.text}`}
                                value={currentResponse.resultStatus}
                                onChange={(e) => handleFieldChange('resultStatus', e.target.value)}
                                className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                             >
                                 <option value="Not assessed">Not assessed</option>
                                 <option value="Compliant">Compliant</option>
                                 <option value="Partially Compliant">Partially Compliant</option>
                                 <option value="Non-Compliant">Non-Compliant</option>
                                 <option value="Not Applicable">Not Applicable</option>
                             </select>
                        </div>
                    </div>
                    
                    <div>
                         <label htmlFor={`notes-${question.text}`} className="block text-sm font-medium text-dark-text-secondary mb-1">Observation & Notes</label>
                         <textarea
                            id={`notes-${question.text}`}
                            placeholder="Add your notes, observations, or implementation details here..."
                            value={currentResponse.notes}
                            onChange={(e) => handleFieldChange('notes', e.target.value)}
                            className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                            rows={4}
                        />
                    </div>
                    
                    <div>
                         <label htmlFor={`evidence-${question.text}`} className="block text-sm font-medium text-dark-text-secondary mb-1">Evidence</label>
                         <textarea
                            id={`evidence-${question.text}`}
                            placeholder="Link to documents, screenshots, or other evidence..."
                            value={currentResponse.evidence}
                            onChange={(e) => handleFieldChange('evidence', e.target.value)}
                            className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                            rows={2}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionAccordion;
