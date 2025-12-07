import { useNavigate } from "react-router-dom";
import {
    Users,
    Briefcase,
    Clock,
    FileText,
} from "lucide-react";

import DashboardLayout from "../Dashboard/";
import StatCard from "../Dashboard/StatCard";
import RecentClients from "../Dashboard/RecentClients";
import UpcomingAppointments from "../Dashboard/UpcomingAppointments";
import QuickActions from "../Dashboard/QuickActions";
import CaseChart from "../Dashboard/CaseChart";

import { Client, Appointment } from "@/types";
import { toast } from "sonner";

import "./Dashboard.scss";

export default function Dashboard() {
    const navigate = useNavigate();

    // Placeholder data - replace with real data from API/state management
    const stats = {
        totalClients: 0,
        activeCases: 0,
        pendingCases: 0,
        closedCases: 0,
        documentsUploaded: 0,
    };

    const clients: Client[] = [];
    const appointments: Appointment[] = [];

    const caseData = {
        active: stats.activeCases,
        pending: stats.pendingCases,
        closed: stats.closedCases,
        onHold: 0,
    };

    // Navigation handlers
    const handleNewClient = () => {
        navigate("/clients");
        toast.info("Opening client management...");
    };

    const handleUploadDocument = () => {
        navigate("/documents");
        toast.info("Opening document manager...");
    };

    const handleNewAppointment = () => {
        navigate("/calendar");
        toast.info("Opening calendar...");
    };

    const handleNewNote = () => {
        navigate("/notes");
        toast.info("Opening case notes...");
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