import type { FC } from 'react';

export type WorkflowStatus = 'To do' | 'In Progress' | 'Done';
export type ResultStatus = 'Not assessed' | 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Not Applicable';
export type QuestionPriority = 'Essential' | 'Optional' | 'Advanced';


export interface Question {
    text: string;
    priority: QuestionPriority;
    description: string;
    evidenceGuidance: string;
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
    icon: FC<{className?: string}>;
    subSections: SubSectionData[];
}

export interface Framework {
    id: string;
    title: string;
    description: string;
    icon: FC<{className?: string}>;
    sections: SectionData[];
}
