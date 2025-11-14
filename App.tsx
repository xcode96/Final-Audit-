
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { INITIAL_FRAMEWORKS } from './constants';
import type { ResponseState, SectionData, Question, QuestionResponse, SubSectionData, ResultStatus, Framework, SubSectionResponse } from './types';
import Section from './components/Section';
import SummaryModal from './components/SummaryModal';
import SectionCard from './components/SectionCard';
import SubSectionDetailView from './components/SubSectionDetailView';
import { YourProgressCard, RadarChartCard } from './components/DashboardComponents';
import ProgressBar from './components/ProgressBar';
import AdminLogin from './AdminLogin';
import FrameworkModal from './FrameworkModal';
import SectionModal from './components/SectionModal';
import SubSectionModal from './components/SubSectionModal';
import { LogoutIcon, PlusIcon, ShieldIcon, UsersIcon, LockIcon, CodeIcon, OperationIcon, FolderIcon, PeopleIcon, PhysicalSecurityIcon, TechnologicalIcon } from './components/icons';

declare const jspdf: any;
declare const XLSX: any;

const icons = { ShieldIcon, UsersIcon, LockIcon, CodeIcon, OperationIcon, FolderIcon, PeopleIcon, PhysicalSecurityIcon, TechnologicalIcon };

const FrameworkCard: React.FC<{
    framework: Framework;
    onClick: () => void;
    answered: number;
    total: number;
    isAdmin: boolean;
    onEdit: (framework: Framework) => void;
    onDelete: (frameworkId: string) => void;
}> = ({ framework, onClick, answered, total, isAdmin, onEdit, onDelete }) => {
    const Icon = framework.icon;
    const isDisabled = framework.sections.length === 0 && !isAdmin;

    return (
        <div
            onClick={!isDisabled ? onClick : undefined}
            className={`group bg-dark-card p-6 rounded-xl border border-dark-border transition-all duration-300 flex flex-col h-full relative ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-500/50 hover:shadow-lg cursor-pointer'}`}
        >
            {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(framework);}} className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-dark-text-secondary hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(framework.id);}} className="p-1.5 bg-red-800/50 hover:bg-red-700/60 rounded-md text-red-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                    </button>
                </div>
            )}
            <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                   <Icon className="w-7 h-7 text-indigo-400" />
                </div>
                 {!isDisabled && <span className="text-dark-text-secondary text-sm">{answered} / {total}</span>}
            </div>
            <div className="mt-4 flex-grow">
                <h3 className="font-bold text-lg text-dark-text-primary">{framework.title}</h3>
                <p className="text-dark-text-secondary text-sm mt-1">{framework.description}</p>
                {isDisabled && !isAdmin && <p className="text-yellow-400 text-xs mt-2 font-semibold">Coming Soon</p>}
            </div>
             {(!isDisabled || isAdmin) && total > 0 && (
                <div className="mt-4 pt-4 border-t border-dark-border/50">
                    <div className="w-full bg-dark-border rounded-full h-2.5">
                        <div 
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${(answered/total)*100}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};


const App: React.FC = () => {
    const [frameworks, setFrameworks] = useState<Framework[]>(() => {
        try {
            const savedFrameworks = window.localStorage.getItem('audit-frameworks');
            return savedFrameworks ? JSON.parse(savedFrameworks) : INITIAL_FRAMEWORKS;
        } catch (error) {
            console.error("Could not load frameworks from local storage", error);
            return INITIAL_FRAMEWORKS;
        }
    });
    
    const [responses, setResponses] = useState<ResponseState>(() => {
        try {
            const savedResponses = window.localStorage.getItem('iso27001-checklist-responses');
            return savedResponses ? JSON.parse(savedResponses) : {};
        } catch (error) {
            console.error("Could not load responses from local storage", error);
            return {};
        }
    });
    
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    
    const [selectedFrameworkId, setSelectedFrameworkId] = useState<string | null>(null);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [selectedSubSectionId, setSelectedSubSectionId] = useState<string | null>(null);
    const [isExportingPdf, setIsExportingPdf] = useState(false);
    const [isExportingExcel, setIsExportingExcel] = useState(false);

    const [isFrameworkModalOpen, setIsFrameworkModalOpen] = useState(false);
    const [editingFramework, setEditingFramework] = useState<Framework | null>(null);

    const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<SectionData | null>(null);
    
    const [isSubSectionModalOpen, setIsSubSectionModalOpen] = useState(false);
    const [editingSubSection, setEditingSubSection] = useState<SubSectionData | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('admin')) {
            const loggedIn = sessionStorage.getItem('isAdmin') === 'true';
            if (loggedIn) {
                setIsAdmin(true);
            } else {
                setShowLogin(true);
            }
        }
    }, []);

    useEffect(() => {
        try {
            window.localStorage.setItem('iso27001-checklist-responses', JSON.stringify(responses));
        } catch (error) {
            console.error("Could not save responses to local storage", error);
        }
    }, [responses]);

    useEffect(() => {
        if (isAdmin) {
            try {
                window.localStorage.setItem('audit-frameworks', JSON.stringify(frameworks));
            } catch (error) {
                console.error("Could not save frameworks to local storage", error);
            }
        }
    }, [frameworks, isAdmin]);

    const selectedFramework = useMemo(() => {
        if (!selectedFrameworkId) return null;
        return frameworks.find(f => f.id === selectedFrameworkId) || null;
    }, [selectedFrameworkId, frameworks]);

    const totalQuestions = useMemo(() => {
        if (!selectedFramework) return 0;
        return selectedFramework.sections.reduce((total, section) => {
            return total + section.subSections.reduce((subTotal, sub) => subTotal + sub.questions.length, 0);
        }, 0);
    }, [selectedFramework]);
    
    const answeredQuestions = useMemo(() => {
        if (!selectedFramework) return 0;
        const subSectionIds = new Set(selectedFramework.sections.flatMap(s => s.subSections.map(ss => ss.id)));
        return Object.keys(responses).reduce((count, subSectionId) => {
            if(subSectionIds.has(subSectionId)) {
                const subSectionResponses = responses[subSectionId];
                return count + Object.values(subSectionResponses).filter(r => (r as QuestionResponse).resultStatus !== 'Not assessed').length;
            }
            return count;
        }, 0);
    }, [responses, selectedFramework]);
    
    const frameworkProgress = useMemo(() => {
        const progress: { [frameworkId: string]: { answered: number; total: number } } = {};
        frameworks.forEach(framework => {
            const subSectionIds = new Set(framework.sections.flatMap(s => s.subSections.map(ss => ss.id)));
            let total = 0;
            let answered = 0;

            framework.sections.forEach(s => s.subSections.forEach(ss => total += ss.questions.length));
            Object.keys(responses).forEach((subSectionId) => {
                if(subSectionIds.has(subSectionId)) {
                    const subSectionResponses = responses[subSectionId] as SubSectionResponse;
                    answered += Object.values(subSectionResponses).filter(r => (r as QuestionResponse).resultStatus !== 'Not assessed').length;
                }
            });
            progress[framework.id] = { answered, total };
        });
        return progress;
    }, [responses, frameworks]);
    
    const sectionProgress = useMemo(() => {
        if (!selectedFramework) return {};
        const progress: { [sectionId: string]: { answered: number; total: number } } = {};
        selectedFramework.sections.forEach(section => {
            let sectionAnswered = 0;
            let sectionTotal = 0;
            section.subSections.forEach(sub => {
                sectionTotal += sub.questions.length;
                const subResponse = responses[sub.id];
                if (subResponse) {
                    sectionAnswered += Object.values(subResponse).filter(r => (r as QuestionResponse).resultStatus !== 'Not assessed').length;
                }
            });
            progress[section.id] = { answered: sectionAnswered, total: sectionTotal };
        });
        return progress;
    }, [responses, selectedFramework]);

    const subSectionProgress = useMemo(() => {
        if (!selectedFramework) return {};
        const progress: { [subSectionId: string]: { answered: number; total: number } } = {};
        selectedFramework.sections.forEach(section => {
            section.subSections.forEach(sub => {
                const subResponse = responses[sub.id];
                const answered = subResponse ? Object.values(subResponse).filter(r => (r as QuestionResponse).resultStatus !== 'Not assessed').length : 0;
                progress[sub.id] = { answered, total: sub.questions.length };
            });
        });
        return progress;
    }, [responses, selectedFramework]);

    const selectedSection = useMemo(() => {
        if (!selectedFramework || !selectedSectionId) return null;
        return selectedFramework.sections.find(s => s.id === selectedSectionId) || null;
    }, [selectedFramework, selectedSectionId]);
    
    const selectedSubSection = useMemo(() => {
        if (!selectedSection || !selectedSubSectionId) return null;
        return selectedSection.subSections.find(ss => ss.id === selectedSubSectionId) || null;
    }, [selectedSection, selectedSubSectionId]);

    const handleResponseChange = useCallback((subSectionId: string, questionIndex: number, newResponse: Partial<QuestionResponse>) => {
        setResponses(prev => {
            const currentResponse = prev[subSectionId]?.[`q${questionIndex}`] || {
                workflowStatus: 'To do', resultStatus: 'Not assessed', notes: '', evidence: '',
            };
            return { ...prev, [subSectionId]: { ...prev[subSectionId], [`q${questionIndex}`]: { ...currentResponse, ...newResponse }}};
        });
    }, []);
    
    const resetChecklist = useCallback(() => {
        if (!selectedFramework) return;
        if (window.confirm(`Are you sure you want to reset all responses for ${selectedFramework.title}? This action cannot be undone.`)) {
            const subSectionIdsToDelete = new Set(selectedFramework.sections.flatMap(s => s.subSections.map(ss => ss.id)));
            const newResponses = { ...responses };
            subSectionIdsToDelete.forEach(id => delete newResponses[id]);
            setResponses(newResponses);
        }
    }, [responses, selectedFramework]);

    const summaryData = useMemo(() => {
        const summary: Record<ResultStatus, number> = { 'Compliant': 0, 'Partially Compliant': 0, 'Non-Compliant': 0, 'Not Applicable': 0, 'Not assessed': totalQuestions };
        if (!selectedFramework) return summary;

        const subSectionIds = new Set(selectedFramework.sections.flatMap(s => s.subSections.map(ss => ss.id)));
        let answered = 0;
        
        Object.keys(responses).forEach(subSectionId => {
             if (subSectionIds.has(subSectionId)) {
                 Object.values(responses[subSectionId] as SubSectionResponse).forEach(response => {
                    const qResponse = response as QuestionResponse;
                    if (qResponse.resultStatus !== 'Not assessed') {
                        summary[qResponse.resultStatus]++;
                        answered++;
                    }
                 });
             }
        });
        summary['Not assessed'] = totalQuestions - answered;
        return summary;
    }, [responses, totalQuestions, selectedFramework]);
    
    const handleExportJson = useCallback(() => {
        if (!selectedFramework) return;
        const subSectionIds = new Set(selectedFramework.sections.flatMap(s => s.subSections.map(ss => ss.id)));
        const frameworkResponses: ResponseState = {};
        Object.entries(responses).forEach(([id, value]) => { if (subSectionIds.has(id)) { frameworkResponses[id] = value as SubSectionResponse; }});
        const dataStr = JSON.stringify({ framework: selectedFramework.title, exportDate: new Date().toISOString(), responses: frameworkResponses, }, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${selectedFramework.id}-audit-export.json`;
        link.click();
        URL.revokeObjectURL(link.href);
    }, [responses, selectedFramework]);

    const handleExportExcel = useCallback(() => {
        if (!selectedFramework) return;
        setIsExportingExcel(true);
        try {
            const data: any[] = [];
            selectedFramework.sections.forEach(section => {
                section.subSections.forEach(subSection => {
                    subSection.questions.forEach((question, index) => {
                        const response = responses[subSection.id]?.[`q${index}`] || {
                            workflowStatus: 'To do', resultStatus: 'Not assessed', notes: '', evidence: '',
                        };
                        data.push({
                            "Section": section.title,
                            "Subsection": subSection.title,
                            "Control": question.text,
                            "Priority": question.priority,
                            "Status": response.workflowStatus,
                            "Result": response.resultStatus,
                            "Notes": response.notes,
                            "Evidence": response.evidence
                        });
                    });
                });
            });
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Results");
            XLSX.writeFile(workbook, `${selectedFramework.id}-audit-export.xlsx`);
        } catch (error) {
            console.error("Failed to generate Excel file", error);
            alert("Could not generate Excel file. Please ensure you are online to load the required library.");
        } finally {
            setIsExportingExcel(false);
        }
    }, [selectedFramework, responses]);
    
    const handleExportPdf = useCallback(() => {
        if (!selectedFramework) return;
        setIsExportingPdf(true);
        try {
            const doc = new jspdf.jsPDF();
            doc.setFontSize(18);
            doc.text(`Audit Report: ${selectedFramework.title}`, 14, 22);
            doc.setFontSize(11);
            doc.setTextColor(100);
            doc.text(`Exported on: ${new Date().toLocaleDateString()}`, 14, 30);
    
            doc.setFontSize(14);
            doc.text('Compliance Summary', 14, 40);
            let y = 48;
            Object.entries(summaryData).forEach(([status, count]) => {
                doc.setFontSize(10);
                const percentage = totalQuestions > 0 ? (Number(count) / totalQuestions * 100).toFixed(1) : 0;
                doc.text(`${status}: ${count} / ${totalQuestions} (${percentage}%)`, 16, y);
                y += 7;
            });
            doc.save(`${selectedFramework.id}-audit-report.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            setIsExportingPdf(false);
        }
    }, [selectedFramework, totalQuestions, summaryData]);

    // Admin handlers
    const handleLogin = (success: boolean) => {
        if (success) {
            setIsAdmin(true);
            setShowLogin(false);
            sessionStorage.setItem('isAdmin', 'true');
            window.history.replaceState({}, '', window.location.pathname);
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
        sessionStorage.removeItem('isAdmin');
        window.location.search = '';
    };

    const handleSaveFramework = (frameworkData: Omit<Framework, 'id' | 'icon' | 'sections'>) => {
        if (editingFramework) {
            setFrameworks(frameworks.map(f => f.id === editingFramework.id ? { ...f, ...frameworkData } : f));
        } else {
            const newFramework: Framework = {
                id: frameworkData.title.toLowerCase().replace(/\s+/g, '-'),
                icon: PlusIcon,
                sections: [],
                ...frameworkData,
            };
            setFrameworks([...frameworks, newFramework]);
        }
        setIsFrameworkModalOpen(false);
        setEditingFramework(null);
    };

    const handleEditFramework = (framework: Framework) => {
        setEditingFramework(framework);
        setIsFrameworkModalOpen(true);
    };

    const handleAddNewFramework = () => {
        setEditingFramework(null);
        setIsFrameworkModalOpen(true);
    };
    
    const handleDeleteFramework = (frameworkId: string) => {
        if (window.confirm("Are you sure you want to delete this framework and all its data? This cannot be undone.")) {
            setFrameworks(frameworks.filter(f => f.id !== frameworkId));
        }
    };

    const handleAddNewSection = () => {
        setEditingSection(null);
        setIsSectionModalOpen(true);
    };

    const handleEditSection = (section: SectionData) => {
        setEditingSection(section);
        setIsSectionModalOpen(true);
    };

    const handleDeleteSection = (sectionId: string) => {
        if (!selectedFramework) return;
        if (window.confirm("Are you sure you want to delete this category and all its questions? This action cannot be undone.")) {
            setFrameworks(frameworks.map(fw => {
                if (fw.id !== selectedFrameworkId) return fw;
                return { ...fw, sections: fw.sections.filter(s => s.id !== sectionId) };
            }));
        }
    };

    const handleSaveSection = (sectionData: Omit<SectionData, 'id' | 'subSections' | 'icon'> & { iconName: keyof typeof icons }) => {
        if (!selectedFrameworkId) return;
        const { iconName, ...restOfData } = sectionData;
        const IconComponent = icons[iconName];

        if (editingSection) {
            setFrameworks(frameworks.map(fw => {
                if (fw.id !== selectedFrameworkId) return fw;
                return { ...fw, sections: fw.sections.map(s => s.id === editingSection.id ? { ...s, ...restOfData, icon: IconComponent } : s) };
            }));
        } else {
            const newSection: SectionData = {
                id: restOfData.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
                subSections: [],
                ...restOfData,
                icon: IconComponent,
            };
            setFrameworks(frameworks.map(fw => {
                if (fw.id !== selectedFrameworkId) return fw;
                return { ...fw, sections: [...fw.sections, newSection] };
            }));
        }
        setIsSectionModalOpen(false);
        setEditingSection(null);
    };

    const handleAddNewSubSection = () => {
        if (!selectedSectionId) return;
        setEditingSubSection(null);
        setIsSubSectionModalOpen(true);
    };
    
    const handleEditSubSection = (subSection: SubSectionData) => {
        if (!selectedSectionId) return;
        setEditingSubSection(subSection);
        setIsSubSectionModalOpen(true);
    };
    
    const handleDeleteSubSection = (subSectionId: string) => {
        if (!selectedFrameworkId || !selectedSectionId) return;
        if (window.confirm("Are you sure you want to delete this subsection and all its questions?")) {
            setFrameworks(prev => prev.map(fw => {
                if (fw.id !== selectedFrameworkId) return fw;
                return {
                    ...fw,
                    sections: fw.sections.map(s => {
                        if (s.id !== selectedSectionId) return s;
                        return { ...s, subSections: s.subSections.filter(ss => ss.id !== subSectionId) };
                    })
                };
            }));
        }
    };
    
    const handleSaveSubSection = (subSectionData: Omit<SubSectionData, 'id' | 'questions'>) => {
        if (!selectedFrameworkId || !selectedSectionId) return;
        
        setFrameworks(prev => prev.map(fw => {
            if (fw.id !== selectedFrameworkId) return fw;
            return {
                ...fw,
                sections: fw.sections.map(s => {
                    if (s.id !== selectedSectionId) return s;
                    
                    if (editingSubSection) { // Editing existing
                        return {
                            ...s,
                            subSections: s.subSections.map(ss => 
                                ss.id === editingSubSection.id ? { ...ss, ...subSectionData } : ss
                            )
                        };
                    } else { // Adding new
                        const newSubSection: SubSectionData = {
                            id: subSectionData.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
                            questions: [],
                            ...subSectionData
                        };
                        return { ...s, subSections: [...s.subSections, newSubSection] };
                    }
                })
            };
        }));
    
        setIsSubSectionModalOpen(false);
        setEditingSubSection(null);
    };

    const handleQuestionChange = useCallback((sectionId: string, subSectionId: string, qIndex: number, updatedQuestion: Question) => {
        setFrameworks(prevFrameworks => prevFrameworks.map(fw => {
            if (fw.id !== selectedFrameworkId) return fw;
            return {
                ...fw,
                sections: fw.sections.map(s => {
                    if (s.id !== sectionId) return s;
                    return {
                        ...s,
                        subSections: s.subSections.map(ss => {
                            if (ss.id !== subSectionId) return ss;
                            const newQuestions = [...ss.questions];
                            newQuestions[qIndex] = updatedQuestion;
                            return { ...ss, questions: newQuestions };
                        })
                    }
                })
            };
        }));
    }, [selectedFrameworkId]);

    const handleQuestionDelete = useCallback((sectionId: string, subSectionId: string, qIndex: number) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;
        setFrameworks(prevFrameworks => prevFrameworks.map(fw => {
            if (fw.id !== selectedFrameworkId) return fw;
            return {
                ...fw,
                sections: fw.sections.map(s => {
                    if (s.id !== sectionId) return s;
                    return {
                        ...s,
                        subSections: s.subSections.map(ss => {
                            if (ss.id !== subSectionId) return ss;
                            const newQuestions = ss.questions.filter((_, i) => i !== qIndex);
                            return { ...ss, questions: newQuestions };
                        })
                    }
                })
            };
        }));
    }, [selectedFrameworkId]);
    
    const handleQuestionAdd = useCallback((sectionId: string, subSectionId: string) => {
        const newQuestion: Question = {
            text: 'New Question',
            priority: 'Optional',
            description: 'Meaning: ...',
            evidenceGuidance: 'What to Show / Evidence: ...'
        };
        setFrameworks(prevFrameworks => prevFrameworks.map(fw => {
            if (fw.id !== selectedFrameworkId) return fw;
            return {
                ...fw,
                sections: fw.sections.map(s => {
                    if (s.id !== sectionId) return s;
                    return {
                        ...s,
                        subSections: s.subSections.map(ss => {
                            if (ss.id !== subSectionId) return ss;
                            return { ...ss, questions: [...ss.questions, newQuestion] };
                        })
                    }
                })
            };
        }));
    }, [selectedFrameworkId]);

    if (showLogin) {
        return <AdminLogin onLogin={handleLogin} />;
    }
    
    const renderCurrentView = () => {
        if (!selectedFramework) {
            return (
                <div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-center">Select an Audit Framework</h2>
                            <p className="text-center text-dark-text-secondary mt-2 max-w-2xl mx-auto">Choose a security framework to begin your audit. Your progress is saved automatically.</p>
                        </div>
                         {isAdmin && <button onClick={handleAddNewFramework} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"><PlusIcon className="w-5 h-5" /> Add Framework</button>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
                        {frameworks.map(fw => (
                            <FrameworkCard
                                key={fw.id}
                                framework={fw}
                                onClick={() => setSelectedFrameworkId(fw.id)}
                                answered={frameworkProgress[fw.id]?.answered || 0}
                                total={frameworkProgress[fw.id]?.total || 0}
                                isAdmin={isAdmin}
                                onEdit={handleEditFramework}
                                onDelete={handleDeleteFramework}
                            />
                        ))}
                    </div>
                </div>
            );
        }

        if (selectedSubSection && selectedSection) {
            return (
                <SubSectionDetailView
                    section={selectedSection}
                    subSection={selectedSubSection}
                    responses={responses[selectedSubSection.id] || {}}
                    onResponseChange={handleResponseChange}
                    onBack={() => setSelectedSubSectionId(null)}
                    isAdmin={isAdmin}
                    onQuestionChange={handleQuestionChange}
                    onQuestionDelete={handleQuestionDelete}
                    onQuestionAdd={handleQuestionAdd}
                />
            );
        }

        if (selectedSection) {
            return (
                <div>
                    <button onClick={() => setSelectedSectionId(null)} className="mb-6 flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                        Back to Dashboard
                    </button>
                    <Section
                        section={selectedSection}
                        subSectionProgress={subSectionProgress}
                        onSubSectionSelect={(subSectionId) => setSelectedSubSectionId(subSectionId)}
                        isAdmin={isAdmin}
                        onAddSubSection={handleAddNewSubSection}
                        onEditSubSection={handleEditSubSection}
                        onDeleteSubSection={handleDeleteSubSection}
                    />
                </div>
            );
        }

        return (
            <div>
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <div>
                        <button onClick={() => { setSelectedFrameworkId(null); setSelectedSectionId(null); setSelectedSubSectionId(null); }} className="flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                            Back to Frameworks
                        </button>
                        <h2 className="text-3xl font-bold mt-2">{selectedFramework.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                         <button onClick={() => setIsSummaryOpen(true)} className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-md hover:bg-slate-600 transition-colors">Summary</button>
                         <button onClick={handleExportJson} className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-md hover:bg-slate-600 transition-colors">JSON</button>
                         <button onClick={handleExportExcel} disabled={isExportingExcel} className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-md hover:bg-slate-600 transition-colors disabled:opacity-50">
                            {isExportingExcel ? 'Exporting...' : 'Excel'}
                         </button>
                         <button onClick={handleExportPdf} disabled={isExportingPdf} className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-md hover:bg-slate-600 transition-colors disabled:opacity-50">
                            {isExportingPdf ? 'Exporting...' : 'PDF'}
                         </button>
                         <button onClick={resetChecklist} className="px-4 py-2 bg-red-600/80 text-white text-sm font-semibold rounded-md hover:bg-red-700/80 transition-colors">Reset</button>
                    </div>
                </div>
                
                <ProgressBar total={totalQuestions} current={answeredQuestions} />
                
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <YourProgressCard answered={answeredQuestions} total={totalQuestions} />
                    <RadarChartCard sectionProgress={sectionProgress} sections={selectedFramework.sections} />
                </div>
                
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-dark-text-primary">Audit Categories</h3>
                        {isAdmin && (
                            <button onClick={handleAddNewSection} className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-1.5">
                                <PlusIcon className="w-4 h-4" />
                                Add Category
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedFramework.sections.map(section => (
                            <SectionCard
                                key={section.id}
                                section={section}
                                onClick={() => setSelectedSectionId(section.id)}
                                answered={sectionProgress[section.id]?.answered || 0}
                                total={sectionProgress[section.id]?.total || 0}
                                isAdmin={isAdmin}
                                onEdit={handleEditSection}
                                onDelete={handleDeleteSection}
                            />
                        ))}
                    </div>
                </div>

                <SummaryModal isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} summary={summaryData} totalQuestions={totalQuestions} />
            </div>
        );
    };

    return (
        <div className="bg-dark-bg text-dark-text-primary min-h-screen font-sans">
            <header className="bg-dark-card border-b border-dark-border sticky top-0 z-30">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">Audit Checklist Tool</h1>
                    {isAdmin && <button onClick={handleLogout} className="flex items-center gap-2 text-sm px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"><LogoutIcon className="w-4 h-4" /> Logout</button>}
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {renderCurrentView()}
            </main>

            {isFrameworkModalOpen && (
                <FrameworkModal
                    isOpen={isFrameworkModalOpen}
                    onClose={() => { setIsFrameworkModalOpen(false); setEditingFramework(null); }}
                    onSave={handleSaveFramework}
                    framework={editingFramework}
                />
            )}

            {isSectionModalOpen && (
                <SectionModal
                    isOpen={isSectionModalOpen}
                    onClose={() => { setIsSectionModalOpen(false); setEditingSection(null); }}
                    onSave={handleSaveSection}
                    section={editingSection}
                />
            )}
            
            {isSubSectionModalOpen && (
                <SubSectionModal
                    isOpen={isSubSectionModalOpen}
                    onClose={() => { setIsSubSectionModalOpen(false); setEditingSubSection(null); }}
                    onSave={handleSaveSubSection}
                    subSection={editingSubSection}
                />
            )}
        </div>
    );
};

export default App;
