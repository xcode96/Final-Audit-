
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import type { SectionData } from '../types';
import { ShieldIcon, UsersIcon, LockIcon, CodeIcon, OperationIcon, FolderIcon, PeopleIcon, PhysicalSecurityIcon, TechnologicalIcon } from './icons';

const icons = {
  ShieldIcon,
  UsersIcon,
  LockIcon,
  CodeIcon,
  OperationIcon,
  FolderIcon,
  PeopleIcon,
  PhysicalSecurityIcon,
  TechnologicalIcon,
};
const iconNames = Object.keys(icons) as (keyof typeof icons)[];

const colors = ['yellow', 'green', 'red', 'purple', 'teal'];
const colorClasses: { [key: string]: { bg: string; } } = {
    yellow: { bg: 'bg-yellow-400' },
    green: { bg: 'bg-green-400' },
    red: { bg: 'bg-red-400' },
    purple: { bg: 'bg-purple-400' },
    teal: { bg: 'bg-teal-400' },
};


interface SectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<SectionData, 'id' | 'subSections' | 'icon'> & { iconName: keyof typeof icons }) => void;
    section: SectionData | null;
}

const getIconName = (IconComponent: React.FC<any>): keyof typeof icons | null => {
    for (const name of iconNames) {
        if (icons[name] === IconComponent) {
            return name;
        }
    }
    return null;
}

const SectionModal: React.FC<SectionModalProps> = ({ isOpen, onClose, onSave, section }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('green');
    const [iconName, setIconName] = useState<keyof typeof icons>('ShieldIcon');

    useEffect(() => {
        if (section) {
            setTitle(section.title);
            setDescription(section.description);
            setColor(section.color);
            const currentIconName = getIconName(section.icon);
            if (currentIconName) setIconName(currentIconName);
        } else {
            setTitle('');
            setDescription('');
            setColor('green');
            setIconName('ShieldIcon');
        }
    }, [section, isOpen]);

    const handleSave = () => {
        if (title.trim()) {
            onSave({ title, description, color, iconName });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={section ? 'Edit Category' : 'Add New Category'}>
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="section-title" className="block text-sm font-medium text-dark-text-secondary mb-1">Category Title</label>
                    <input
                        id="section-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., A.9 - New Controls"
                    />
                </div>
                <div>
                    <label htmlFor="section-description" className="block text-sm font-medium text-dark-text-secondary mb-1">Description</label>
                    <textarea
                        id="section-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 bg-dark-bg border border-dark-border text-dark-text-primary rounded-md focus:ring-2 focus:ring-indigo-500"
                        rows={3}
                        placeholder="A brief description of this audit category..."
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">Color</label>
                    <div className="flex gap-3">
                        {colors.map(c => (
                            <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full ${colorClasses[c].bg} ${color === c ? 'ring-2 ring-offset-2 ring-offset-dark-card ring-white' : ''} transition`}></button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">Icon</label>
                    <div className="flex flex-wrap gap-2">
                        {iconNames.map(name => {
                            const Icon = icons[name];
                            return (
                                <button 
                                    key={name} 
                                    onClick={() => setIconName(name)} 
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${iconName === name ? 'bg-indigo-600 text-white' : 'bg-dark-bg text-dark-text-secondary hover:bg-slate-700'} transition-colors`}
                                >
                                    <Icon className="w-6 h-6" />
                                </button>
                            );
                        })}
                    </div>
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

export default SectionModal;
