import { useNavigate } from "react-router-dom";
import { Users, Briefcase, Clock, FileText } from "lucide-react";

import { DashboardLayout } from "../Layout/DashBoardLayout";
import StatCard from "../Dashboard/StatCard";
import RecentClients from "../Dashboard/RecentClients";
import UpcomingAppointments from "../Dashboard/UpcomingAppointments";
import QuickActions from "../Dashboard/QuickActions";
import CaseChart from "../Dashboard/CaseChart";

import "./Dashboard.scss";

export default function Dashboard() {
    const navigate = useNavigate();

    const handleNewClient = () => {
        navigate("/clients");
    };

    const handleUploadDocument = () => {
        navigate("/documents");
    };

    const handleNewAppointment = () => {
        navigate("/calendar");
    };

    const handleNewNote = () => {
        navigate("/notes");
    };

    // Placeholder stats data
    const stats = {
        totalClients: 0,
        activeCases: 0,
        pendingCases: 0,
        closedCases: 0,
        documentsUploaded: 0,
    };

    // Placeholder clients data
    const clients = [];

    // Placeholder appointments data
    const appointments = [];

    const caseData = {
        active: stats.activeCases,
        pending: stats.pendingCases,
        closed: stats.closedCases,
        onHold: 0,
    };

    return (
        <DashboardLayout
            title="Dashboard"
            subtitle="Welcome back! Here's your practice overview."
        >
            <div className="dashboard">

                {/* Stats Section */}
                <div className="stats-grid">
                    <StatCard
                        title="Total Clients"
                        value={stats.totalClients}
                        icon={Users}
                        trend={{ value: 0, isPositive: true }}
                        delay={0}
                    />

                    <StatCard
                        title="Active Cases"
                        value={stats.activeCases}
                        icon={Briefcase}
                        trend={{ value: 0, isPositive: true }}
                        delay={50}
                        iconClassName="icon-success"
                    />

                    <StatCard
                        title="Pending Cases"
                        value={stats.pendingCases}
                        icon={Clock}
                        delay={100}
                        iconClassName="icon-warning"
                    />

                    <StatCard
                        title="Documents"
                        value={stats.documentsUploaded}
                        icon={FileText}
                        trend={{ value: 0, isPositive: true }}
                        delay={150}
                        iconClassName="icon-info"
                    />
                </div>

                {/* Main Content */}
                <div className="content-grid">
                    {/* Left Column */}
                    <div className="left-column">
                        <RecentClients clients={clients} />
                        <UpcomingAppointments appointments={appointments} />
                    </div>

                    {/* Right Column */}
                    <div className="right-column">
                        <QuickActions
                            onNewClient={handleNewClient}
                            onUploadDocument={handleUploadDocument}
                            onNewAppointment={handleNewAppointment}
                            onNewNote={handleNewNote}
                        />
                        <CaseChart data={caseData} />
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}