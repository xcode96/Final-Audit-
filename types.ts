// FIX: Import FC type from React to resolve 'Cannot find namespace "React"' error.
import type { FC } from 'react';

export type ResponseStatus = 'Unanswered' | 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Not Applicable';

export type WorkflowStatus = 'To do' | 'In Progress' | 'Done';
export type ResultStatus = 'Not assessed' | 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Not Applicable';
export type QuestionPriority = 'Essential' | 'Optional' | 'Advanced';


export interface Question {
    text: string;
    priority: QuestionPriority;
    description: string;
}

export interface QuestionResponse {
    workflowStatus: WorkflowStatus;
    resultStatus: ResultStatus;
    notes: string;
    evidence: string;
}

export interface SubSectionResponse {
    [questionKey: string]: QuestionResponse;
}

export interface ResponseState {
    [subSectionId: string]: SubSectionResponse;
}

export interface SubSectionData {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
}

export interface SectionData {
    id: string;
    title: string;
    description: string;
    color: string;
    // FIX: Use imported FC type instead of React.FC.
    icon: FC<{className?: string}>;
    subSections: SubSectionData[];
}