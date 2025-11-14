import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import type { Framework } from '../types';

interface FrameworkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (frameworkData: Omit<Framework, 'id' | 'icon' | 'sections'>) => void;
    framework: Framework | null;
}

const FrameworkModal: React.FC<FrameworkModalProps> = ({ isOpen, onClose, onSave, framework }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (framework) {
            setTitle(framework.title);
            setDescription(framework.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [framework, isOpen]);

    const handleSave = () => {
        if (title.trim()) {
            onSave({ title, description });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={framework ? 'Edit Framework' : 'Add New Framework'}>
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="framework-title" className="block text-sm font-medium text-dark-text-secondary mb-1">Framework Title</label>
                    <input
                        id="framework-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., NIST CSF"
                    />
                </div>
                <div>
                    <label htmlFor="framework-description" className="block text-sm font-medium text-dark-text-secondary mb-1">Description</label>
                    <textarea
                        id="framework-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500"
                        rows={3}
                        placeholder="A brief description of the framework..."
                    />
                </div>
            </div>
            <div className="sticky bottom-0 bg-dark-card/80 backdrop-blur-sm border-t border-dark-border p-4 flex justify-end gap-3">
                 <button
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors"
                >
                    Cancel
                </button>
                 <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                >
                    Save
                </button>
            </div>
        </Modal>
    );
};

export default FrameworkModal;