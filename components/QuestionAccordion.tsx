import React, { useState } from 'react';
import type { Question, QuestionResponse, WorkflowStatus, ResultStatus, QuestionPriority } from '../types';
import { TrashIcon } from './icons';

interface QuestionAccordionProps {
    question: Question;
    response: QuestionResponse;
    onChange: (newResponse: Partial<QuestionResponse>) => void;
    isAdmin: boolean;
    onQuestionChange: (updatedQuestion: Question) => void;
    onQuestionDelete: () => void;
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

const AdminEditableText: React.FC<{value: string, onChange: (value: string) => void, isTextArea?: boolean}> = ({value, onChange, isTextArea}) => (
    isTextArea ? 
    <textarea value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm" rows={5} />
    :
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm" />
)


const QuestionAccordion: React.FC<QuestionAccordionProps> = ({ question, response, onChange, isAdmin, onQuestionChange, onQuestionDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const currentResponse: QuestionResponse = response || {
        workflowStatus: 'To do', resultStatus: 'Not assessed', notes: '', evidence: '',
    };

    const handleFieldChange = (field: keyof QuestionResponse, value: string) => { onChange({ [field]: value }); };
    const handleQuestionFieldChange = (field: keyof Question, value: string) => { onQuestionChange({ ...question, [field]: value }); };

    return (
        <div className="border-b border-dark-border last:border-b-0">
            <div className="w-full text-left p-4 hover:bg-slate-800/50 transition-colors grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12 md:col-span-6 flex items-start gap-3">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 text-dark-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    {isAdmin ? (
                        <AdminEditableText value={question.text} onChange={(val) => handleQuestionFieldChange('text', val)} isTextArea />
                    ) : (
                        <span className="text-dark-text-primary cursor-pointer" onClick={() => setIsOpen(!isOpen)}>{question.text}</span>
                    )}
                </div>
                <div className="col-span-4 md:col-span-2 text-center">
                    {isAdmin ? (
                         <select value={question.priority} onChange={(e) => handleQuestionFieldChange('priority', e.target.value)} className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md text-xs">
                             <option>Essential</option><option>Advanced</option><option>Optional</option>
                         </select>
                    ) : (
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${priorityColors[question.priority]}`}>{question.priority}</span>
                    )}
                </div>
                <div className="col-span-4 md:col-span-2 text-center">
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${workflowStatusColors[currentResponse.workflowStatus]}`}>{currentResponse.workflowStatus}</span>
                </div>
                <div className="col-span-4 md:col-span-2 text-center flex items-center justify-center gap-2">
                     <span className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${resultColors[currentResponse.resultStatus]}`}>{currentResponse.resultStatus.replace(' Compliant', '')}</span>
                      {isAdmin && (
                        <button onClick={onQuestionDelete} className="p-1.5 text-red-500 hover:text-white hover:bg-red-500/50 rounded-md transition-colors">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="p-5 bg-dark-bg/50 border-t border-dark-border space-y-6">
                    <div>
                        <h4 className="font-semibold text-indigo-400 mb-1">Details / Description</h4>
                        {isAdmin ? (
                            <AdminEditableText value={question.description} onChange={(val) => handleQuestionFieldChange('description', val)} isTextArea />
                        ) : (
                            <p className="text-dark-text-secondary text-sm whitespace-pre-wrap">{question.description}</p>
                        )}
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-indigo-400 mb-1">What to Show / Evidence</h4>
                         {isAdmin ? (
                            <AdminEditableText value={question.evidenceGuidance} onChange={(val) => handleQuestionFieldChange('evidenceGuidance', val)} isTextArea />
                        ) : (
                            <p className="text-dark-text-secondary text-sm whitespace-pre-wrap">{question.evidenceGuidance}</p>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium text-dark-text-secondary mb-1">Status</label>
                             <select value={currentResponse.workflowStatus} onChange={(e) => handleFieldChange('workflowStatus', e.target.value)} className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                                 <option>To do</option><option>In Progress</option><option>Done</option>
                             </select>
                        </div>
                         <div>
                             <label className="block text-sm font-medium text-dark-text-secondary mb-1">Result</label>
                             <select value={currentResponse.resultStatus} onChange={(e) => handleFieldChange('resultStatus', e.target.value)} className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                                 <option value="Not assessed">Not assessed</option><option value="Compliant">Compliant</option><option value="Partially Compliant">Partially Compliant</option><option value="Non-Compliant">Non-Compliant</option><option value="Not Applicable">Not Applicable</option>
                             </select>
                        </div>
                    </div>
                    
                    <div>
                         <label className="block text-sm font-medium text-dark-text-secondary mb-1">Observation & Notes</label>
                         <textarea placeholder="Add your notes, observations, or implementation details here..." value={currentResponse.notes} onChange={(e) => handleFieldChange('notes', e.target.value)} className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm" rows={4} />
                    </div>
                    
                    <div>
                         <label className="block text-sm font-medium text-dark-text-secondary mb-1">Evidence (Links/References)</label>
                         <textarea placeholder="Link to documents, screenshots, or other evidence..." value={currentResponse.evidence} onChange={(e) => handleFieldChange('evidence', e.target.value)} className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm" rows={2} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionAccordion;