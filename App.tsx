
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { INITIAL_FRAMEWORKS } from './constants';
import type { ResponseState, SectionData, Question, QuestionResponse, SubSectionData, ResultStatus, Framework, SubSectionResponse, GitHubSettings, SyncedData, SerializableFramework, SerializableSectionData } from './types';
import Section from './components/Section';
import SummaryModal from './components/SummaryModal';
import SectionCard from './components/SectionCard';
import SubSectionDetailView from './components/SubSectionDetailView';
import { YourProgressCard, RadarChartCard } from './components/DashboardComponents';
import ProgressBar from './components/ProgressBar';
import AdminLogin from './AdminLogin';
import FrameworkModal from './components/FrameworkModal';
import SectionModal from './components/SectionModal';
import SubSectionModal from './components/SubSectionModal';
import GitHubSyncModal from './components/GitHubSyncModal';
import { LogoutIcon, PlusIcon, ShieldIcon, UsersIcon, LockIcon, CodeIcon, OperationIcon, FolderIcon, PeopleIcon, PhysicalSecurityIcon, TechnologicalIcon, SyncIcon, PencilIcon, TrashIcon } from './components/icons';

declare const jspdf: any;
declare const XLSX: any;

const icons: { [key: string]: React.FC<{className?: string}> } = { ShieldIcon, UsersIcon, LockIcon, CodeIcon, OperationIcon, FolderIcon, PeopleIcon, PhysicalSecurityIcon, TechnologicalIcon };
const iconNames = Object.keys(icons);


const getIconName = (IconComponent: React.FC<any>): string => {
    for (const name of iconNames) {
        if (icons[name as keyof typeof icons] === IconComponent) {
            return name;
        }
    }
    return 'FolderIcon'; // Default fallback
};

const serializeFrameworks = (frameworksToSerialize: Framework[]): SerializableFramework[] => {
    return frameworksToSerialize.map(fw => {
        const { icon, sections, ...restFw } = fw;
        return {
            ...restFw,
            iconName: getIconName(icon),
            sections: sections.map(sec => {
                const { icon, ...restSec } = sec;
                return {
                    ...restSec,
                    iconName: getIconName(icon),
                };
            }),
        };
    });
};

const deserializeFrameworks = (frameworksToDeserialize: SerializableFramework[]): Framework[] => {
    return frameworksToDeserialize.map(fw => {
        const { iconName, sections, ...restFw } = fw;
        return {
            ...restFw,
            icon: icons[iconName] || FolderIcon,
            sections: sections.map(sec => {
                const { iconName, ...restSec } = sec;
                return {
                    ...restSec,
                    icon: icons[iconName] || FolderIcon,
                };
            }),
        };
    });
};

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
                <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(framework);}} className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-dark-text-secondary hover:text-white transition-colors">
                        <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(framework.id);}} className="p-1.5 bg-red-800/50 hover:bg-red-700/60 rounded-md text-red-400 hover:text-white transition-colors">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            )}
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center">
                   <Icon className="w-7 h-7 text-indigo-400" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-dark-text-primary group-hover:text-indigo-300 transition-colors">{framework.title}</h3>
                </div>
            </div>
            <div className="mt-4 flex-grow">
                <p className="text-dark-text-secondary text-sm line-clamp-3">{framework.description}</p>
                 {isDisabled && <p className="text-xs text-yellow-400 mt-2">No categories defined. Click to manage in Admin mode.</p>}
            </div>
            <div className="mt-4 pt-4 border-t border-dark-border/50">
                 <ProgressBar total={total} current={answered} />
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [responses, setResponses] = useState<ResponseState>(() => {
        try {
            const saved = localStorage.getItem('iso27001-checklist-responses');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error("Error parsing responses from localStorage", error);
            return {};
        }
    });

    const [frameworks, setFrameworks] = useState<Framework[]>(() => {
        try {
            const saved = localStorage.getItem('audit-frameworks');
            if (saved) {
                // Data in local storage is serialized, so we must deserialize it on load.
                return deserializeFrameworks(JSON.parse(saved));
            }
            return INITIAL_FRAMEWORKS;
        } catch (error) {
            console.error("Error parsing/deserializing frameworks from localStorage", error);
            return INITIAL_FRAMEWORKS;
        }
    });

    const [selectedFrameworkId, setSelectedFrameworkId] = useState<string | null>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [selectedSubSectionId, setSelectedSubSectionId] = useState<string | null>(null);
    const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
    
    // Admin State
    const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('isAdmin') === 'true');
    const [showLogin, setShowLogin] = useState(false);
    const [isFrameworkModalOpen, setFrameworkModalOpen] = useState(false);
    const [editingFramework, setEditingFramework] = useState<Framework | null>(null);
    const [isSectionModalOpen, setSectionModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<SectionData | null>(null);
    const [isSubSectionModalOpen, setSubSectionModalOpen] = useState(false);
    const [editingSubSection, setEditingSubSection] = useState<SubSectionData | null>(null);

    // GitHub Sync State
    const [isSyncModalOpen, setSyncModalOpen] = useState(false);
    const [githubSettings, setGithubSettings] = useState<GitHubSettings>(() => {
        const saved = localStorage.getItem('github-sync-settings');
        return saved ? JSON.parse(saved) : { pat: '', owner: '', repo: '' };
    });
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncStatus, setSyncStatus] = useState('');


    useEffect(() => {
        localStorage.setItem('iso27001-checklist-responses', JSON.stringify(responses));
    }, [responses]);
    
    useEffect(() => {
        if (isAdmin) {
            // Serialize frameworks before saving to localStorage to handle non-JSON-friendly data like components.
            const serializableFrameworks = serializeFrameworks(frameworks);
            localStorage.setItem('audit-frameworks', JSON.stringify(serializableFrameworks));
        }
    }, [frameworks, isAdmin]);

     useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('admin') !== null && !isAdmin) {
            setShowLogin(true);
        }
    }, [isAdmin]);

    const handleLogin = (success: boolean) => {
        if (success) {
            setIsAdmin(true);
            sessionStorage.setItem('isAdmin', 'true');
            setShowLogin(false);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    };
    
     const handleLogout = () => {
        setIsAdmin(false);
        sessionStorage.removeItem('isAdmin');
    };

    const selectedFramework = useMemo(() => frameworks.find(f => f.id === selectedFrameworkId), [frameworks, selectedFrameworkId]);
    const selectedSection = useMemo(() => selectedFramework?.sections.find(s => s.id === selectedSectionId), [selectedFramework, selectedSectionId]);
    const selectedSubSection = useMemo(() => selectedSection?.subSections.find(sub => sub.id === selectedSubSectionId), [selectedSection, selectedSubSectionId]);

    const handleResponseChange = useCallback((subSectionId: string, questionIndex: number, newResponse: Partial<QuestionResponse>) => {
        setResponses(prev => {
            const currentSubSectionResponses = prev[subSectionId] || {};
            const questionKey = `q${questionIndex}`;
            const currentQuestionResponse = currentSubSectionResponses[questionKey] || {
                workflowStatus: 'To do', resultStatus: 'Not assessed', notes: '', evidence: '',
            };
            return {
                ...prev,
                [subSectionId]: {
                    ...currentSubSectionResponses,
                    [questionKey]: { ...currentQuestionResponse, ...newResponse },
                },
            };
        });
    }, []);
    
    const frameworkProgress = useMemo(() => {
        const progress: { [fwId: string]: { answered: number, total: number } } = {};
        frameworks.forEach(fw => {
            let total = 0;
            let answered = 0;
            fw.sections.forEach(sec => {
                sec.subSections.forEach(sub => {
                    total += sub.questions.length;
                    const subResponse = responses[sub.id] || {};
                    answered += Object.values(subResponse).filter(r => r.resultStatus !== 'Not assessed').length;
                });
            });
            progress[fw.id] = { answered, total };
        });
        return progress;
    }, [frameworks, responses]);


    const totalQuestions = useMemo(() => {
        if (!selectedFramework) return 0;
        return selectedFramework.sections.reduce((sum, section) => sum + section.subSections.reduce((subSum, sub) => subSum + sub.questions.length, 0), 0);
    }, [selectedFramework]);

    const answeredQuestions = useMemo(() => {
        if (!selectedFramework) return 0;
        return selectedFramework.sections.reduce((sum, section) => 
            sum + section.subSections.reduce((subSum, sub) => {
                const subResponses = responses[sub.id] || {};
                return subSum + Object.values(subResponses).filter(res => res.resultStatus !== 'Not assessed').length;
            }, 0), 0);
    }, [selectedFramework, responses]);

    const summaryData = useMemo(() => {
        const summary: { [key in ResultStatus]: number } = { 'Not assessed': 0, 'Compliant': 0, 'Partially Compliant': 0, 'Non-Compliant': 0, 'Not Applicable': 0 };
        if (!selectedFramework) return summary;

        selectedFramework.sections.forEach(section => {
            section.subSections.forEach(subSection => {
                const subResponses = responses[subSection.id] || {};
                const answeredInSub = Object.values(subResponses);
                answeredInSub.forEach(response => {
                    summary[response.resultStatus]++;
                });
                const unanswered = subSection.questions.length - answeredInSub.length;
                if (unanswered > 0) {
                    summary['Not assessed'] += unanswered;
                }
            });
        });
        return summary;
    }, [selectedFramework, responses]);

    const sectionProgress = useMemo(() => {
        const progress: { [sectionId: string]: { answered: number; total: number } } = {};
        if (!selectedFramework) return progress;
        selectedFramework.sections.forEach(section => {
            let total = 0;
            let answered = 0;
            section.subSections.forEach(sub => {
                total += sub.questions.length;
                const subResponses = responses[sub.id] || {};
                answered += Object.values(subResponses).filter(res => res.resultStatus !== 'Not assessed').length;
            });
            progress[section.id] = { answered, total };
        });
        return progress;
    }, [selectedFramework, responses]);

    const subSectionProgress = useMemo(() => {
        const progress: { [subSectionId: string]: { answered: number; total: number } } = {};
        if (!selectedFramework) return progress;
        selectedFramework.sections.forEach(section => {
            section.subSections.forEach(subSection => {
                const total = subSection.questions.length;
                const subResponses = responses[subSection.id] || {};
                const answered = Object.values(subResponses).filter(res => res.resultStatus !== 'Not assessed').length;
                progress[subSection.id] = { answered, total };
            });
        });
        return progress;
    }, [selectedFramework, responses]);

    const handleReset = () => {
        if (selectedFramework && window.confirm('Are you sure you want to reset all progress for this framework? This cannot be undone.')) {
            const subSectionIds = new Set(selectedFramework.sections.flatMap(s => s.subSections.map(sub => sub.id)));
            setResponses(prev => {
                const newResponses = { ...prev };
                subSectionIds.forEach(id => delete newResponses[id]);
                return newResponses;
            });
        }
    };
    
    const handleExportJson = () => {
        if (!selectedFramework) return;
        const dataToExport: ResponseState = {};
        selectedFramework.sections.forEach(s => {
            s.subSections.forEach(sub => {
                if (responses[sub.id]) {
                    dataToExport[sub.id] = responses[sub.id];
                }
            });
        });
        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedFramework.id}-responses.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleExportPdf = () => {
        if (!selectedFramework) return;
        const { jsPDF } = jspdf;
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(`${selectedFramework.title} - Audit Summary`, 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
        
        doc.setFontSize(12);
        doc.text(`Overall Progress: ${answeredQuestions} / ${totalQuestions} answered (${((answeredQuestions / totalQuestions) * 100).toFixed(1)}%)`, 14, 40);

        let y = 50;
        Object.entries(summaryData).forEach(([status, count]) => {
            doc.text(`${status}: ${count}`, 14, y);
            y += 7;
        });

        doc.save(`${selectedFramework.id}-summary.pdf`);
    };
    
    const handleExportExcel = () => {
        if (!selectedFramework) return;
        const worksheetData: any[] = [];
        worksheetData.push(['Section', 'Subsection', 'Control', 'Priority', 'Status', 'Result', 'Notes', 'Evidence']);
        
        selectedFramework.sections.forEach(section => {
            section.subSections.forEach(subSection => {
                subSection.questions.forEach((q, index) => {
                    const res = responses[subSection.id]?.[`q${index}`] || { workflowStatus: 'To do', resultStatus: 'Not assessed', notes: '', evidence: '' };
                    worksheetData.push([
                        section.title,
                        subSection.title,
                        q.text,
                        q.priority,
                        res.workflowStatus,
                        res.resultStatus,
                        res.notes,
                        res.evidence,
                    ]);
                });
            });
        });
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(wb, ws, "Audit Checklist");
        XLSX.writeFile(wb, `${selectedFramework.id}-checklist.xlsx`);
    };

    // Admin handlers
    const handleAddNewFramework = () => {
        setEditingFramework(null);
        setFrameworkModalOpen(true);
    };
    
    const handleEditFramework = (framework: Framework) => {
        setEditingFramework(framework);
        setFrameworkModalOpen(true);
    };

    const handleDeleteFramework = (frameworkId: string) => {
        if (window.confirm('Are you sure you want to delete this framework and all its data? This cannot be undone.')) {
            setFrameworks(prev => prev.filter(f => f.id !== frameworkId));
        }
    };

    const handleSaveFramework = (data: Omit<Framework, 'id' | 'icon' | 'sections'>) => {
        if (editingFramework) {
            setFrameworks(prev => prev.map(f => f.id === editingFramework.id ? { ...f, ...data } : f));
        } else {
            const newFramework: Framework = {
                ...data,
                id: data.title.toLowerCase().replace(/\s+/g, '-'),
                icon: FolderIcon,
                sections: []
            };
            setFrameworks(prev => [...prev, newFramework]);
        }
        setFrameworkModalOpen(false);
    };
    
    const handleAddNewSection = () => {
        setEditingSection(null);
        setSectionModalOpen(true);
    };
    
    const handleEditSection = (section: SectionData) => {
        setEditingSection(section);
        setSectionModalOpen(true);
    };

    const handleDeleteSection = (sectionId: string) => {
        if (window.confirm('Are you sure you want to delete this category and all its content? This is irreversible.')) {
            setFrameworks(prev => prev.map(f => 
                f.id === selectedFrameworkId ? { ...f, sections: f.sections.filter(s => s.id !== sectionId) } : f
            ));
        }
    };
    
    const handleSaveSection = (data: Omit<SectionData, 'id' | 'subSections' | 'icon'> & { iconName: keyof typeof icons }) => {
        const { iconName, ...rest } = data;
        const newSectionData = { ...rest, icon: icons[iconName] };

        if (editingSection) {
            setFrameworks(prev => prev.map(f => 
                f.id === selectedFrameworkId ? { ...f, sections: f.sections.map(s => s.id === editingSection.id ? {...s, ...newSectionData} : s) } : f
            ));
        } else {
            const newSection: SectionData = {
                ...newSectionData,
                id: `${selectedFrameworkId}-${data.title.toLowerCase().replace(/\s+/g, '-')}`,
                subSections: []
            };
            setFrameworks(prev => prev.map(f => 
                f.id === selectedFrameworkId ? { ...f, sections: [...f.sections, newSection] } : f
            ));
        }
        setSectionModalOpen(false);
    };
    
     const handleAddNewSubSection = () => {
        setEditingSubSection(null);
        setSubSectionModalOpen(true);
    };
    
    const handleEditSubSection = (subSection: SubSectionData) => {
        setEditingSubSection(subSection);
        setSubSectionModalOpen(true);
    };

    const handleDeleteSubSection = (subSectionId: string) => {
        if (window.confirm('Are you sure you want to delete this subsection?')) {
            setFrameworks(prev => prev.map(f => {
                if (f.id !== selectedFrameworkId) return f;
                return {
                    ...f,
                    sections: f.sections.map(s => 
                        s.id !== selectedSectionId ? s : { ...s, subSections: s.subSections.filter(sub => sub.id !== subSectionId) }
                    )
                };
            }));
        }
    };
    
    const handleSaveSubSection = (data: Omit<SubSectionData, 'id' | 'questions'>) => {
        if (editingSubSection) {
             setFrameworks(prev => prev.map(f => {
                if (f.id !== selectedFrameworkId) return f;
                return {
                    ...f,
                    sections: f.sections.map(s => 
                        s.id !== selectedSectionId ? s : { ...s, subSections: s.subSections.map(sub => sub.id === editingSubSection.id ? {...sub, ...data} : sub) }
                    )
                };
            }));
        } else {
            const newSubSection: SubSectionData = {
                ...data,
                id: `${selectedSectionId}-${data.title.toLowerCase().replace(/\s+/g, '-')}`,
                questions: []
            };
             setFrameworks(prev => prev.map(f => {
                if (f.id !== selectedFrameworkId) return f;
                return {
                    ...f,
                    sections: f.sections.map(s => 
                        s.id !== selectedSectionId ? s : { ...s, subSections: [...s.subSections, newSubSection] }
                    )
                };
            }));
        }
        setSubSectionModalOpen(false);
    };

    const handleQuestionChange = (sectionId: string, subSectionId: string, qIndex: number, updatedQuestion: Question) => {
        setFrameworks(prev => prev.map(f => {
            if (f.id !== selectedFrameworkId) return f;
            return { ...f, sections: f.sections.map(s => {
                if (s.id !== sectionId) return s;
                return { ...s, subSections: s.subSections.map(sub => {
                    if (sub.id !== subSectionId) return sub;
                    const newQuestions = [...sub.questions];
                    newQuestions[qIndex] = updatedQuestion;
                    return { ...sub, questions: newQuestions };
                })};
            })};
        }));
    };

    const handleQuestionDelete = (sectionId: string, subSectionId: string, qIndex: number) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;
        setFrameworks(prev => prev.map(f => {
            if (f.id !== selectedFrameworkId) return f;
            return { ...f, sections: f.sections.map(s => {
                if (s.id !== sectionId) return s;
                return { ...s, subSections: s.subSections.map(sub => {
                    if (sub.id !== subSectionId) return sub;
                    const newQuestions = sub.questions.filter((_, idx) => idx !== qIndex);
                    return { ...sub, questions: newQuestions };
                })};
            })};
        }));
    };

    const handleQuestionAdd = (sectionId: string, subSectionId: string) => {
        const newQuestion: Question = {
            id: `q${Date.now()}`,
            text: "New Question",
            priority: 'Optional',
            description: "Meaning:\n...",
            evidenceGuidance: "What to Show / Evidence:\n..."
        };
        setFrameworks(prev => prev.map(f => {
            if (f.id !== selectedFrameworkId) return f;
            return { ...f, sections: f.sections.map(s => {
                if (s.id !== sectionId) return s;
                return { ...s, subSections: s.subSections.map(sub => {
                    if (sub.id !== subSectionId) return sub;
                    return { ...sub, questions: [...sub.questions, newQuestion] };
                })};
            })};
        }));
    };
    
    // GitHub Sync Handlers
    const handleSaveGithubSettings = (settings: GitHubSettings) => {
        setGithubSettings(settings);
        localStorage.setItem('github-sync-settings', JSON.stringify(settings));
        setSyncStatus('Settings saved.');
    };

    const handleSync = async (action: 'push' | 'pull') => {
        const { pat, owner, repo } = githubSettings;
        if (!pat || !owner || !repo) {
            setSyncStatus('Error: PAT, Owner, and Repo Name are required.');
            return;
        }
        setIsSyncing(true);
        setSyncStatus(`Performing ${action}...`);
        
        const filePath = 'audit-data.json';
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
        const headers = {
            'Authorization': `token ${pat}`,
            'Accept': 'application/vnd.github.v3+json',
        };

        try {
            if (action === 'push') {
                const serializableFrameworks = serializeFrameworks(frameworks);
                const dataToSync: SyncedData = { frameworks: serializableFrameworks, responses };
                const content = btoa(JSON.stringify(dataToSync, null, 2));

                let sha: string | undefined;
                const getFileResponse = await fetch(apiUrl, { headers });

                if (getFileResponse.status === 404) {
                    setSyncStatus('File not found. Attempting to create a new file...');
                    sha = undefined;
                } else if (getFileResponse.ok) {
                    const fileData = await getFileResponse.json();
                    sha = fileData.sha;
                    setSyncStatus('File found. Preparing to update...');
                } else {
                    const errorData = await getFileResponse.json();
                    throw new Error(`Failed to check for file: ${errorData.message || getFileResponse.statusText}`);
                }

                const body = JSON.stringify({
                    message: `Sync audit data from tool on ${new Date().toISOString()}`,
                    content: content,
                    sha: sha,
                });

                const putResponse = await fetch(apiUrl, { method: 'PUT', headers, body });
                if (!putResponse.ok) {
                    const errorData = await putResponse.json();
                    if (putResponse.status === 404) {
                        throw new Error(`Push failed (404 Not Found). Please ensure the repository and default branch exist. An empty repository needs at least one file (like a README) to have a default branch.`);
                    }
                    if (putResponse.status === 401) {
                         throw new Error(`Push failed (401 Unauthorized). Please check your Personal Access Token.`);
                    }
                    throw new Error(`Push failed: ${errorData.message || putResponse.statusText}`);
                }
                setSyncStatus('Push successful!');

            } else { // pull
                const response = await fetch(apiUrl, { headers });
                if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);
                const data = await response.json();
                const content = atob(data.content);
                const syncedData: SyncedData = JSON.parse(content);
                
                if (syncedData.frameworks && syncedData.responses) {
                     if (window.confirm("This will overwrite your local data with data from GitHub. Are you sure?")) {
                        const deserializedFrameworks = deserializeFrameworks(syncedData.frameworks);
                        setFrameworks(deserializedFrameworks);
                        setResponses(syncedData.responses);
                        setSyncStatus('Pull successful! Data has been updated.');
                    } else {
                         setSyncStatus('Pull cancelled by user.');
                    }
                } else {
                    throw new Error("Invalid data structure in fetched file.");
                }
            }
        } catch (error: any) {
            setSyncStatus(`Error during ${action}: ${error.message}`);
            console.error(error);
        } finally {
            setIsSyncing(false);
        }
    };


    const renderCurrentView = () => {
        if (showLogin) {
            return <AdminLogin onLogin={handleLogin} />;
        }
        if (selectedFramework && selectedSection && selectedSubSection) {
            return <SubSectionDetailView 
                        section={selectedSection} 
                        subSection={selectedSubSection}
                        responses={responses[selectedSubSection.id] || {}}
                        onResponseChange={handleResponseChange}
                        onBack={() => setSelectedSubSectionId(null)}
                        isAdmin={isAdmin}
                        onQuestionChange={handleQuestionChange}
                        onQuestionDelete={handleQuestionDelete}
                        onQuestionAdd={handleQuestionAdd}
                    />;
        }
        if (selectedFramework && selectedSection) {
            return (
                <div>
                     <button onClick={() => setSelectedSectionId(null)} className="mb-6 flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                        Back to Dashboard
                    </button>
                    <Section 
                        section={selectedSection} 
                        subSectionProgress={subSectionProgress}
                        onSubSectionSelect={(subId) => setSelectedSubSectionId(subId)}
                        isAdmin={isAdmin}
                        onAddSubSection={handleAddNewSubSection}
                        onEditSubSection={handleEditSubSection}
                        onDeleteSubSection={handleDeleteSubSection}
                    />
                </div>
            );
        }
        if (selectedFramework) {
            return (
                <div className="space-y-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div>
                             <button onClick={() => setSelectedFrameworkId(null)} className="mb-2 flex items-center gap-2 text-sm text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                                Back to Framework Selection
                            </button>
                            <h1 className="text-3xl font-bold text-white">{selectedFramework.title}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={handleReset} className="px-3 py-1.5 bg-red-800/60 text-red-300 text-sm font-semibold rounded-md hover:bg-red-700/60 transition-colors">Reset</button>
                            <button onClick={() => setSummaryModalOpen(true)} className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-colors">Summary</button>
                            <button onClick={handleExportJson} className="px-3 py-1.5 bg-slate-600 text-white text-sm font-semibold rounded-md hover:bg-slate-700 transition-colors">JSON</button>
                            <button onClick={handleExportExcel} className="px-3 py-1.5 bg-slate-600 text-white text-sm font-semibold rounded-md hover:bg-slate-700 transition-colors">Excel</button>
                            <button onClick={handleExportPdf} className="px-3 py-1.5 bg-slate-600 text-white text-sm font-semibold rounded-md hover:bg-slate-700 transition-colors">PDF</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <YourProgressCard answered={answeredQuestions} total={totalQuestions} />
                        <div className="lg:col-span-2">
                             <RadarChartCard sectionProgress={sectionProgress} sections={selectedFramework.sections} />
                        </div>
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
                    {isAdmin && (
                        <div className="pt-4 border-t border-dark-border">
                            <button onClick={handleAddNewSection} className="w-full p-4 bg-dark-card border-2 border-dashed border-dark-border rounded-xl text-dark-text-secondary hover:text-white hover:border-indigo-500 transition-colors flex items-center justify-center gap-2">
                                <PlusIcon className="w-5 h-5" />
                                Add New Category
                            </button>
                        </div>
                    )}
                </div>
            );
        }
        return (
             <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Select an Audit Framework</h1>
                    <p className="text-dark-text-secondary mt-2">Choose a framework to begin your audit. Your progress is saved automatically.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {frameworks.map(fw => {
                        const progress = frameworkProgress[fw.id] || { answered: 0, total: 0 };
                        return (
                            <FrameworkCard 
                                key={fw.id} 
                                framework={fw} 
                                onClick={() => setSelectedFrameworkId(fw.id)}
                                answered={progress.answered}
                                total={progress.total}
                                isAdmin={isAdmin}
                                onEdit={handleEditFramework}
                                onDelete={handleDeleteFramework}
                             />
                        );
                    })}
                </div>
                {isAdmin && (
                    <div className="pt-4 border-t border-dark-border">
                        <button onClick={handleAddNewFramework} className="w-full p-4 bg-dark-card border-2 border-dashed border-dark-border rounded-xl text-dark-text-secondary hover:text-white hover:border-indigo-500 transition-colors flex items-center justify-center gap-2">
                            <PlusIcon className="w-5 h-5" />
                            Add New Framework
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-dark-text-primary">
                 <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-indigo-400">Audit Tool</h1>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSyncModalOpen(true)} className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-md text-dark-text-secondary hover:text-white transition-colors">
                            <SyncIcon className="w-5 h-5" />
                        </button>
                         {isAdmin && <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 text-sm font-semibold rounded-md hover:bg-slate-600 transition-colors"><LogoutIcon className="w-4 h-4" /> Logout</button>}
                    </div>
                </header>
                {renderCurrentView()}
            </div>
            
            <SummaryModal 
                isOpen={isSummaryModalOpen} 
                onClose={() => setSummaryModalOpen(false)} 
                summary={summaryData}
                totalQuestions={totalQuestions}
            />
            {isAdmin && (
                <>
                    <FrameworkModal 
                        isOpen={isFrameworkModalOpen}
                        onClose={() => setFrameworkModalOpen(false)}
                        onSave={handleSaveFramework}
                        framework={editingFramework}
                    />
                    <SectionModal
                        isOpen={isSectionModalOpen}
                        onClose={() => setSectionModalOpen(false)}
                        onSave={handleSaveSection}
                        section={editingSection}
                    />
                    <SubSectionModal
                        isOpen={isSubSectionModalOpen}
                        onClose={() => setSubSectionModalOpen(false)}
                        onSave={handleSaveSubSection}
                        subSection={editingSubSection}
                    />
                </>
            )}
            <GitHubSyncModal
                isOpen={isSyncModalOpen}
                onClose={() => setSyncModalOpen(false)}
                onSaveSettings={handleSaveGithubSettings}
                onPush={() => handleSync('push')}
                onPull={() => handleSync('pull')}
                initialSettings={githubSettings}
                syncStatus={syncStatus}
                isSyncing={isSyncing}
            />
        </>
    );
};

export default App;
