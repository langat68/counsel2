import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-content">
                <Header title={title} subtitle={subtitle} />

                <main className="dashboard-main">
                    {children}
                </main>
            </div>
        </div>
    );
}
