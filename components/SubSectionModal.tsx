
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import type { SubSectionData } from '../types';

interface SubSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<SubSectionData, 'id' | 'questions'>) => void;
    subSection: SubSectionData | null;
}

const SubSectionModal: React.FC<SubSectionModalProps> = ({ isOpen, onClose, onSave, subSection }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (subSection) {
            setTitle(subSection.title);
            setDescription(subSection.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [subSection, isOpen]);

    const handleSave = () => {
        if (title.trim()) {
            onSave({ title, description });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={subSection ? 'Edit Subsection' : 'Add New Subsection'}>
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="subsection-title" className="block text-sm font-medium text-dark-text-secondary mb-1">Subsection Title</label>
                    <input
                        id="subsection-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., 4.4 Information security management system"
                    />
                </div>
                <div>
                    <label htmlFor="subsection-description" className="block text-sm font-medium text-dark-text-secondary mb-1">Description</label>
                    <textarea
                        id="subsection-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500"
                        rows={3}
                        placeholder="A brief description of this subsection..."
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

export default SubSectionModal;
