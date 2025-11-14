


import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FRAMEWORKS } from './constants';
import type { ResponseState, SectionData, QuestionResponse, SubSectionData, ResultStatus, Framework, SubSectionResponse } from './types';
import Section from './components/Section';
import SummaryModal from './components/SummaryModal';
import SectionCard from './components/SectionCard';
import SubSectionDetailView from './components/SubSectionDetailView';
import { YourProgressCard, RadarChartCard } from './components/DashboardComponents';
import ProgressBar from './components/ProgressBar';

declare const jspdf: any;

const FrameworkCard: React.FC<{
    framework: Framework;
    onClick: () => void;
    answered: number;
    total: number;
}> = ({ framework, onClick, answered, total }) => {
    const Icon = framework.icon;
    const isDisabled = framework.sections.length === 0;

    return (
        <div
            onClick={!isDisabled ? onClick : undefined}
            className={`group bg-dark-card p-6 rounded-xl border border-dark-border transition-all duration-300 flex flex-col h-full ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-500/50 hover:shadow-lg cursor-pointer'}`}
        >
            <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                   <Icon className="w-7 h-7 text-indigo-400" />
                </div>
                 {!isDisabled && <span className="text-dark-text-secondary text-sm">{answered} / {total}</span>}
            </div>
            <div className="mt-4 flex-grow">
                <h3 className="font-bold text-lg text-dark-text-primary">{framework.title}</h3>
                <p className="text-dark-text-secondary text-sm mt-1">{framework.description}</p>
                {isDisabled && <p className="text-yellow-400 text-xs mt-2 font-semibold">Coming Soon</p>}
            </div>
             {!isDisabled && total > 0 && (
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
    const [responses, setResponses] = useState<ResponseState>(() => {
        try {
            const savedResponses = window.localStorage.getItem('iso27001-checklist-responses');
            return savedResponses ? JSON.parse(savedResponses) : {};
        } catch (error) {
            console.error("Could not load responses from local storage", error);
            return {};
        }
    });
    
    const [selectedFrameworkId, setSelectedFrameworkId] = useState<string | null>(null);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [selectedSubSectionId, setSelectedSubSectionId] = useState<string | null>(null);
    const [isExportingPdf, setIsExportingPdf] = useState(false);


    useEffect(() => {
        try {
            window.localStorage.setItem('iso27001-checklist-responses', JSON.stringify(responses));
        } catch (error) {
            console.error("Could not save responses to local storage", error);
        }
    }, [responses]);

    const selectedFramework = useMemo(() => {
        if (!selectedFrameworkId) return null;
        return FRAMEWORKS.find(f => f.id === selectedFrameworkId) || null;
    }, [selectedFrameworkId]);

    const totalQuestions = useMemo(() => {
        if (!selectedFramework) return 0;
        return selectedFramework.sections.reduce((total, section) => {
            return total + section.subSections.reduce((subTotal, sub) => subTotal + sub.questions.length, 0);
        }, 0);
    }, [selectedFramework]);
    
    const answeredQuestions = useMemo(() => {
        if (!selectedFramework) return 0;
        const subSectionIds = new Set(selectedFramework.sections.flatMap(s => s.subSections.map(ss => ss.id)));
        
        return Object.entries(responses).reduce((count, [subSectionId, subSectionResponses]) => {
            if(subSectionIds.has(subSectionId)) {
                // FIX: Cast subSectionResponses to SubSectionResponse to resolve TypeScript error with Object.values
                const typedResponses = subSectionResponses as SubSectionResponse;
                return count + Object.values(typedResponses).filter((r: QuestionResponse) => r.resultStatus !== 'Not assessed').length;
            }
            return count;
        }, 0);
    }, [responses, selectedFramework]);
    
    const frameworkProgress = useMemo(() => {
        const progress: { [frameworkId: string]: { answered: number; total: number } } = {};
        FRAMEWORKS.forEach(framework => {
            if (framework.sections.length === 0) {
                progress[framework.id] = { answered: 0, total: 0 };
                return;
            }
            const subSectionIds = new Set(framework.sections.flatMap(s => s.subSections.map(ss => ss.id)));
            let total = 0;
            let answered = 0;

            framework.sections.forEach(s => {
                s.subSections.forEach(ss => {
                    total += ss.questions.length;
                });
            });

            Object.entries(responses).forEach(([subSectionId, subSectionResponses]) => {
                if(subSectionIds.has(subSectionId)) {
                    // FIX: Cast subSectionResponses to SubSectionResponse to resolve TypeScript error with Object.values
                    const typedResponses = subSectionResponses as SubSectionResponse;
                    answered += Object.values(typedResponses).filter((r: QuestionResponse) => r.resultStatus !== 'Not assessed').length;
                }
            });
            progress[framework.id] = { answered, total };
        });
        return progress;
    }, [responses]);
    
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
                    sectionAnswered += Object.values(subResponse).filter((r: QuestionResponse) => r.resultStatus !== 'Not assessed').length;
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
                const subResponse = responses[sub.id] || {};
                const answered = Object.values(subResponse).filter((r: QuestionResponse) => r.resultStatus !== 'Not assessed').length;
                const total = sub.questions.length;
                progress[sub.id] = { answered, total };
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
                workflowStatus: 'To do',
                resultStatus: 'Not assessed',
                notes: '',
                evidence: '',
            };

            return {
                ...prev,
                [subSectionId]: {
                    ...prev[subSectionId],
                    [`q${questionIndex}`]: { ...currentResponse, ...newResponse }
                }
            };
        });
    }, []);
    
    const resetChecklist = useCallback(() => {
        if (!selectedFramework) return;
        if (window.confirm(`Are you sure you want to reset all responses for ${selectedFramework.title}? This action cannot be undone.`)) {
            
            const subSectionIdsToDelete = new Set(selectedFramework.sections.flatMap(s => s.subSections.map(ss => ss.id)));
            const newResponses = { ...responses };
            subSectionIdsToDelete.forEach(id => delete newResponses[id]);
            setResponses(newResponses);
            
            try {
                 window.localStorage.setItem('iso27001-checklist-responses', JSON.stringify(newResponses));
            } catch (error) {
                console.error("Could not clear responses from local storage", error);
            }
        }
    }, [responses, selectedFramework]);

    const summaryData = useMemo(() => {
        const summary: Record<ResultStatus, number> = {
            'Compliant': 0,
            'Partially Compliant': 0,
            'Non-Compliant': 0,
            'Not Applicable': 0,
            'Not assessed': totalQuestions
        };

        if (!selectedFramework) return summary;

        const subSectionIds = new Set(selectedFramework.sections.flatMap(s => s.subSections.map(ss => ss.id)));
        let answered = 0;
        
        Object.entries(responses).forEach(([subSectionId, subSectionResponses]) => {
             if (subSectionIds.has(subSectionId)) {
                 // FIX: Cast subSectionResponses to SubSectionResponse to resolve TypeScript error with Object.values
                 const typedResponses = subSectionResponses as SubSectionResponse;
                 // FIX: Switched from Object.keys to Object.values with a type annotation to fix an indexing error. This approach is consistent with other parts of the file.
                 Object.values(typedResponses).forEach((response: QuestionResponse) => {
                    if (response.resultStatus !== 'Not assessed') {
                        summary[response.resultStatus]++;
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
        // FIX: Replaced for...in loop with Object.entries().forEach to resolve potential type inference issues with object keys during iteration. This provides a safer way to iterate over own properties.
        Object.entries(responses).forEach(([id, value]) => {
            if (subSectionIds.has(id)) {
                frameworkResponses[id] = value;
            }
        });
        
        const dataStr = JSON.stringify({
            framework: selectedFramework.title,
            exportDate: new Date().toISOString(),
            responses: frameworkResponses,
        }, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedFramework.id}-audit-export.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [responses, selectedFramework]);
    
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
                // FIX: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
                const percentage = totalQuestions > 0 ? (Number(count) / totalQuestions * 100).toFixed(1) : 0;
                doc.text(`${status}: ${count} / ${totalQuestions} (${percentage}%)`, 16, y);
                y += 7;
            });
            
            doc.save(`${selectedFramework.id}-audit-report.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF", error);
            alert("Could not generate PDF. Please ensure you are online to load the PDF generation library.");
        } finally {
            setIsExportingPdf(false);
        }
    }, [selectedFramework, totalQuestions, summaryData, responses]);
    
    const renderCurrentView = () => {
        if (!selectedFramework) {
            return (
                <div>
                    <h2 className="text-3xl font-bold text-center">Select an Audit Framework</h2>
                    <p className="text-center text-dark-text-secondary mt-2 max-w-2xl mx-auto">Choose a security framework to begin your audit. Your progress is saved automatically.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
                        {FRAMEWORKS.map(fw => (
                            <FrameworkCard
                                key={fw.id}
                                framework={fw}
                                onClick={() => setSelectedFrameworkId(fw.id)}
                                answered={frameworkProgress[fw.id]?.answered || 0}
                                total={frameworkProgress[fw.id]?.total || 0}
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
                />
            );
        }

        if (selectedSection) {
            return (
                <div>
                    <button onClick={() => setSelectedSectionId(null)} className="mb-6 flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <Section
                        section={selectedSection}
                        subSectionProgress={subSectionProgress}
                        onSubSectionSelect={(subSectionId) => {
                            setSelectedSubSectionId(subSectionId);
                        }}
                    />
                </div>
            );
        }

        // Dashboard View
        return (
            <div>
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <div>
                        <button onClick={() => { setSelectedFrameworkId(null); setSelectedSectionId(null); setSelectedSubSectionId(null); }} className="flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            Back to Frameworks
                        </button>
                        <h2 className="text-3xl font-bold mt-2">{selectedFramework.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                         <button onClick={() => setIsSummaryOpen(true)} className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-md hover:bg-slate-600 transition-colors">View Summary</button>
                         <button onClick={handleExportJson} className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-md hover:bg-slate-600 transition-colors">Export JSON</button>
                         <button onClick={handleExportPdf} disabled={isExportingPdf} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {isExportingPdf ? 'Exporting...' : 'Export PDF'}
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
                    <h3 className="text-xl font-bold mb-4 text-dark-text-primary">Audit Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedFramework.sections.map(section => (
                            <SectionCard
                                key={section.id}
                                section={section}
                                onClick={() => setSelectedSectionId(section.id)}
                                answered={sectionProgress[section.id]?.answered || 0}
                                total={sectionProgress[section.id]?.total || 0}
                            />
                        ))}
                    </div>
                </div>


                <SummaryModal 
                    isOpen={isSummaryOpen} 
                    onClose={() => setIsSummaryOpen(false)} 
                    summary={summaryData} 
                    totalQuestions={totalQuestions}
                />
            </div>
        );
    };

    return (
        <div className="bg-dark-bg text-dark-text-primary min-h-screen font-sans">
            <header className="bg-dark-card border-b border-dark-border sticky top-0 z-30">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        Audit Checklist Tool
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {renderCurrentView()}
            </main>
        </div>
    );
};

// FIX: Add default export to resolve "Module has no default export" error in index.tsx
export default App;