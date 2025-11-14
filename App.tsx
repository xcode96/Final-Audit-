import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { CHECKLIST_DATA } from './constants';
import type { ResponseState, SectionData, QuestionResponse, SubSectionData } from './types';
import Section from './components/Section';
import SummaryModal from './components/SummaryModal';
import SectionCard from './components/SectionCard';
import SubSectionDetailView from './components/SubSectionDetailView';
import { YourProgressCard, RadarChartCard, SectionListCard } from './components/DashboardComponents';

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

    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [selectedSubSectionId, setSelectedSubSectionId] = useState<string | null>(null);


    useEffect(() => {
        try {
            window.localStorage.setItem('iso27001-checklist-responses', JSON.stringify(responses));
        } catch (error) {
            console.error("Could not save responses to local storage", error);
        }
    }, [responses]);

    const totalQuestions = useMemo(() => {
        return CHECKLIST_DATA.reduce((total, section) => {
            return total + section.subSections.reduce((subTotal, sub) => subTotal + sub.questions.length, 0);
        }, 0);
    }, []);
    
    const answeredQuestions = useMemo(() => {
        return Object.values(responses).reduce((count: number, subSection) => {
            return count + Object.values(subSection).filter((q: QuestionResponse) => q.resultStatus !== 'Not assessed').length;
        }, 0);
    }, [responses]);
    
    const sectionProgress = useMemo(() => {
        const progress: { [sectionId: string]: { answered: number; total: number } } = {};
        CHECKLIST_DATA.forEach(section => {
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
    }, [responses]);

    const subSectionProgress = useMemo(() => {
        const progress: { [subSectionId: string]: { answered: number; total: number } } = {};
        CHECKLIST_DATA.forEach(section => {
            section.subSections.forEach(sub => {
                const subResponse = responses[sub.id] || {};
                const answered = Object.values(subResponse).filter((r: QuestionResponse) => r.resultStatus !== 'Not assessed').length;
                const total = sub.questions.length;
                progress[sub.id] = { answered, total };
            });
        });
        return progress;
    }, [responses]);


    const selectedSection = useMemo(() => {
        if (!selectedSectionId) return null;
        return CHECKLIST_DATA.find(s => s.id === selectedSectionId) || null;
    }, [selectedSectionId]);
    
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
        if (window.confirm('Are you sure you want to reset all responses? This action cannot be undone.')) {
            setResponses({});
            try {
                window.localStorage.removeItem('iso27001-checklist-responses');
            } catch (error) {
                console.error("Could not clear responses from local storage", error);
            }
        }
    }, []);

    const summaryData = useMemo(() => {
        const summary = {
            'Compliant': 0,
            'Partially Compliant': 0,
            'Non-Compliant': 0,
            'Not Applicable': 0,
            'Not assessed': totalQuestions
        };

        let answered = 0;
        Object.values(responses).forEach(subSection => {
            Object.values(subSection).forEach((response: QuestionResponse) => {
                if (response.resultStatus !== 'Not assessed') {
                    summary[response.resultStatus]++;
                    answered++;
                }
            });
        });
        summary['Not assessed'] = totalQuestions - answered;
        return summary;
    }, [responses, totalQuestions]);

    const handleBackToDashboard = () => {
        setSelectedSectionId(null);
        setSelectedSubSectionId(null);
    }
    
    const handleBackToSections = () => {
        setSelectedSubSectionId(null);
    }

    const renderCurrentView = () => {
        if (selectedSection && selectedSubSection) {
            return (
                <SubSectionDetailView 
                    section={selectedSection}
                    subSection={selectedSubSection}
                    responses={responses[selectedSubSection.id] || {}}
                    onResponseChange={handleResponseChange}
                    onBack={handleBackToSections}
                />
            )
        }
        
        if (selectedSection) {
            return (
                 <div>
                    <button 
                        onClick={handleBackToDashboard}
                        className="mb-6 flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <Section 
                        key={selectedSection.id} 
                        section={selectedSection}
                        subSectionProgress={subSectionProgress}
                        onSubSectionSelect={setSelectedSubSectionId}
                    />
                </div>
            )
        }

        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <YourProgressCard answered={answeredQuestions} total={totalQuestions} />
              </div>
              <div className="lg:col-span-2">
                <RadarChartCard sectionProgress={sectionProgress} />
              </div>
               <div className="lg:col-span-3">
                 <SectionListCard 
                    sectionProgress={sectionProgress} 
                    onSectionSelect={(id) => setSelectedSectionId(id)}
                 />
               </div>
            </div>
    
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {CHECKLIST_DATA.map((section: SectionData) => {
                    const progress = sectionProgress[section.id] || { answered: 0, total: 0 };
                    return (
                        <SectionCard 
                            key={section.id} 
                            section={section}
                            answered={progress.answered}
                            total={progress.total}
                            onClick={() => setSelectedSectionId(section.id)}
                        />
                    );
                })}
            </div>
          </>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg font-sans text-dark-text-primary">
            <header className="bg-dark-card/80 backdrop-blur-sm shadow-lg sticky top-0 z-20 border-b border-dark-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">ISO 27001:2022 Dashboard</h1>
                        <p className="text-dark-text-secondary mt-1 hidden sm:block">Interactive Gap Analysis Tool</p>
                    </div>
                     <div className="flex items-center gap-2 flex-wrap justify-end">
                         <button
                            onClick={() => setIsSummaryOpen(true)}
                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-dark-bg"
                        >
                            Summary
                        </button>
                        <button
                            onClick={resetChecklist}
                            className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-dark-bg"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </header>
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderCurrentView()}
            </main>

            <SummaryModal 
                isOpen={isSummaryOpen}
                onClose={() => setIsSummaryOpen(false)}
                summary={summaryData}
                totalQuestions={totalQuestions}
            />
        </div>
    );
};

export default App;