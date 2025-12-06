import React from 'react';
import { UserPlus, FileUp, CalendarPlus, FileText } from 'lucide-react';
import './QuickActions.scss';

interface QuickAction {
    label: string;
    icon: React.ElementType;
    onClick: () => void;
}

interface QuickActionsProps {
    onNewClient: () => void;
    onUploadDocument: () => void;
    onNewAppointment: () => void;
    onNewNote: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
    onNewClient,
    onUploadDocument,
    onNewAppointment,
    onNewNote
}) => {
    const actions: QuickAction[] = [
        { label: 'New Client', icon: UserPlus, onClick: onNewClient },
        { label: 'Upload Document', icon: FileUp, onClick: onUploadDocument },
        { label: 'Schedule', icon: CalendarPlus, onClick: onNewAppointment },
        { label: 'Add Note', icon: FileText, onClick: onNewNote },
    ];

    return (
        <div className="quick-actions card slide-up">
            <div className="card-header">
                <h3>Quick Actions</h3>
            </div>

            <div className="card-content actions-grid">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.label}
                            className="action-btn"
                            onClick={action.onClick}
                        >
                            <Icon className="action-icon" />
                            <span>{action.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickActions;
