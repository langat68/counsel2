import React from 'react';
import { Client } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import './RecentClients.scss';

interface RecentClientsProps {
    clients: Client[];
}

const statusVariants: Record<
    string,
    'active' | 'pending' | 'closed' | 'warning'
> = {
    Active: 'active',
    Pending: 'pending',
    Closed: 'closed',
    'On Hold': 'warning',
};

const RecentClients: React.FC<RecentClientsProps> = ({ clients }) => {
    const recentClients = clients
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, 5);

    return (
        <div className="recent-clients card slide-up" style={{ animationDelay: '200ms' }}>
            <div className="card-header">
                <h3>Recent Clients</h3>

                <Link to="/clients">
                    <button className="ghost-btn small-btn">
                        View all
                        <ArrowRight className="icon-right" />
                    </button>
                </Link>
            </div>

            <div className="card-content">
                {recentClients.map((client) => {
                    const initials = client.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('');

                    return (
                        <div key={client.id} className="client-item">
                            {/* Avatar */}
                            <div className="client-info">
                                <div className="avatar">
                                    <span className="avatar-fallback">{initials}</span>
                                </div>

                                {/* Texts */}
                                <div>
                                    <p className="client-name">{client.name}</p>
                                    <p className="client-sub">
                                        {client.caseType} • Updated{' '}
                                        {formatDistanceToNow(client.updatedAt, { addSuffix: true })}
                                    </p>
                                </div>
                            </div>

                            {/* Badge */}
                            <span className={`status-badge ${statusVariants[client.status]}`}>
                                {client.status}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentClients;
