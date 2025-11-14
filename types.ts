import type { FC } from 'react';

export type WorkflowStatus = 'To do' | 'In Progress' | 'Done';
export type ResultStatus = 'Not assessed' | 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Not Applicable';
export type QuestionPriority = 'Essential' | 'Optional' | 'Advanced';


export interface Question {
    id?: string; // Optional ID for client-side keying
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

// Types for GitHub Sync
export interface GitHubSettings {
    pat: string;
    owner: string;
    repo: string;
}

// Types for serialization (e.g., for GitHub Sync)
export interface SerializableSectionData extends Omit<SectionData, 'icon'> {
    iconName: string; 
}

export interface SerializableFramework extends Omit<Framework, 'icon' | 'sections'> {
    iconName: string;
    sections: SerializableSectionData[];
}

export interface SyncedData {
    frameworks: SerializableFramework[];
    responses: ResponseState;
}