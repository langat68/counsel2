import React, { useState } from "react";
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

import {
    mockClients,
    mockAppointments,
    mockStats,
} from "@/data/mockData";
import { toast } from "sonner";

export default function Dashboard() {
    const navigate = useNavigate();

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

    const caseData = {
        active: mockStats.activeCases,
        pending: mockStats.pendingCases,
        closed: mockStats.closedCases,
        onHold: 1,
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
                        value={mockStats.totalClients}
                        icon={Users}
                        trend={{ value: 12, isPositive: true }}
                        delay={0}
                    />

                    <StatCard
                        title="Active Cases"
                        value={mockStats.activeCases}
                        icon={Briefcase}
                        trend={{ value: 8, isPositive: true }}
                        delay={50}
                        iconClassName="icon-success"
                    />

                    <StatCard
                        title="Pending Cases"
                        value={mockStats.pendingCases}
                        icon={Clock}
                        delay={100}
                        iconClassName="icon-warning"
                    />

                    <StatCard
                        title="Documents"
                        value={mockStats.documentsUploaded}
                        icon={FileText}
                        trend={{ value: 24, isPositive: true }}
                        delay={150}
                        iconClassName="icon-info"
                    />
                </div>

                {/* Main Content */}
                <div className="content-grid">

                    {/* Left Column */}
                    <div className="left-column">
                        <RecentClients clients={mockClients} />
                        <UpcomingAppointments appointments={mockAppointments} />
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
