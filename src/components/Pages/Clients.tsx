

import { useState } from 'react';
import { Search, Plus, Mail, Phone, Building2, MoreHorizontal } from 'lucide-react';
import { Client, CaseStatus, CaseType } from '@/types';
import { format } from 'date-fns';
import "./Clients.scss"

export default function Clients() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    // Placeholder clients data
    const clients: Client[] = [];

    const caseTypes: CaseType[] = [
        'Corporate', 'Criminal', 'Family', 'Immigration', 'Real Estate', 'Personal Injury',
        'Intellectual Property', 'Employment', 'Tax', 'Other'
    ];

    const filteredClients = clients.filter((client) => {
        const matchesSearch =
            client.name.toLowerCase().includes(search.toLowerCase()) ||
            client.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
        const matchesType = typeFilter === 'all' || client.caseType === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div>
            <h1>Clients</h1>
            <p>Manage your client portfolio</p>

            <div>
                {/* Search & Filters */}
                <div>
                    <div>
                        <Search />
                        <input
                            placeholder="Search clients..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Closed">Closed</option>
                        <option value="On Hold">On Hold</option>
                    </select>

                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="all">All Types</option>
                        {caseTypes.map((t) => (
                            <option key={t}>{t}</option>
                        ))}
                    </select>

                    <button>
                        <Plus /> Add Client
                    </button>
                </div>

                {/* Table */}
                <table>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Case Type</th>
                            <th>Status</th>
                            <th>Last Updated</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                                <tr key={client.id} onClick={() => setSelectedClient(client)}>
                                    <td>
                                        <div>
                                            <div>{client.name.split(' ').map((n) => n[0]).join('')}</div>
                                            <div>
                                                <p>{client.name}</p>
                                                <p>{client.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{client.caseType}</td>
                                    <td>{client.status}</td>
                                    <td>{format(client.updatedAt, 'MMM d, yyyy')}</td>

                                    <td>
                                        <button>
                                            <MoreHorizontal />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>
                                    <div>
                                        <Search />
                                        <h3>No Clients Found</h3>
                                        <p>Add your first client to get started</p>
                                        <button>
                                            <Plus /> Add Client
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {filteredClients.length > 0 && (
                    <p>
                        Showing {filteredClients.length} of {clients.length} clients
                    </p>
                )}
            </div>

            {/* Details */}
            <div>
                {selectedClient ? (
                    <div>
                        <div>
                            <div>{selectedClient.name.split(' ').map((n) => n[0]).join('')}</div>
                            <div>
                                <h3>{selectedClient.name}</h3>
                                <span>{selectedClient.status}</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <Mail /> {selectedClient.email}
                            </div>
                            <div>
                                <Phone /> {selectedClient.phone}
                            </div>
                            {selectedClient.company && (
                                <div>
                                    <Building2 /> {selectedClient.company}
                                </div>
                            )}
                        </div>

                        <div>
                            <h4>Case Information</h4>

                            <div>
                                <span>Case Type</span>
                                <span>{selectedClient.caseType}</span>
                            </div>

                            <div>
                                <span>Created</span>
                                <span>{format(selectedClient.createdAt, 'MMM d, yyyy')}</span>
                            </div>

                            <div>
                                <span>Last Activity</span>
                                <span>{format(selectedClient.updatedAt, 'MMM d, yyyy')}</span>
                            </div>
                        </div>

                        <div>
                            <button>View Full Profile</button>
                            <button>Edit</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Search />
                        <h3>No Client Selected</h3>
                        <p>Click on a client from the list to view their details</p>
                    </div>
                )}
            </div>
        </div>
    );
}