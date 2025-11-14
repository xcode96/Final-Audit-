import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import type { GitHubSettings } from '../types';

interface GitHubSyncModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveSettings: (settings: GitHubSettings) => void;
    onPush: () => void;
    onPull: () => void;
    initialSettings: GitHubSettings;
    syncStatus: string;
    isSyncing: boolean;
}

const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({ isOpen, onClose, onSaveSettings, onPush, onPull, initialSettings, syncStatus, isSyncing }) => {
    const [settings, setSettings] = useState<GitHubSettings>(initialSettings);

    useEffect(() => {
        setSettings(initialSettings);
    }, [initialSettings, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSaveSettings(settings);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Sync with GitHub">
            <div className="p-6 space-y-4">
                <div className="bg-yellow-900/50 border border-yellow-700/50 text-yellow-300 text-sm rounded-lg p-3">
                    <p><strong className="font-bold">Security Warning:</strong> Your Personal Access Token (PAT) will be stored in your browser's local storage. This is convenient but insecure. Do not use this feature on a shared computer. For better security, enter the token for each session and do not save it.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-1">GitHub Personal Access Token (PAT)</label>
                    <input
                        type="password"
                        name="pat"
                        value={settings.pat}
                        onChange={handleChange}
                        className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="ghp_..."
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-dark-text-secondary mb-1">Repository Owner</label>
                        <input
                            type="text"
                            name="owner"
                            value={settings.owner}
                            onChange={handleChange}
                            className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., your-username"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-dark-text-secondary mb-1">Repository Name</label>
                        <input
                            type="text"
                            name="repo"
                            value={settings.repo}
                            onChange={handleChange}
                            className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., audit-data"
                        />
                    </div>
                </div>
                
                <div className="text-xs text-dark-text-secondary p-2 bg-dark-bg rounded-md border border-dark-border">
                    <strong>Note:</strong> The repository must already exist and contain at least one file (like a README) to have a default branch for syncing. The data will be saved to <strong>audit-data.json</strong>.
                </div>

                {syncStatus && (
                    <div className="text-center text-sm text-dark-text-secondary p-2 bg-dark-bg rounded-md">
                        {syncStatus}
                    </div>
                )}
            </div>

            <div className="sticky bottom-0 bg-dark-card/80 backdrop-blur-sm border-t border-dark-border p-4 flex justify-between items-center gap-3">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors text-sm"
                    disabled={isSyncing}
                >
                    Save Settings
                </button>
                 <div className="flex gap-3">
                    <button
                        onClick={onPull}
                        disabled={isSyncing}
                        className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isSyncing ? 'Syncing...' : 'Pull from GitHub'}
                    </button>
                     <button
                        onClick={onPush}
                        disabled={isSyncing}
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isSyncing ? 'Syncing...' : 'Push to GitHub'}
                    </button>
                 </div>
            </div>
        </Modal>
    );
};

export default GitHubSyncModal;
