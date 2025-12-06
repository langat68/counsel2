import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    FileText,
    FolderOpen,
    Calendar,
    Settings,
    Scale,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import "./Sidebar.css";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Case Notes", href: "/notes", icon: FileText },
    { name: "Documents", href: "/documents", icon: FolderOpen },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            {/* Logo */}
            <div className="sidebar-header">
                {!collapsed && (
                    <div className="sidebar-logo">
                        <div className="logo-icon">
                            <Scale />
                        </div>

                        <div className="logo-text">
                            <span className="title">CounselDesk</span>
                            <span className="subtitle">Legal Practice</span>
                        </div>
                    </div>
                )}

                {collapsed && (
                    <div className="sidebar-logo-collapsed">
                        <Scale />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={`nav-item ${isActive ? "active" : ""}`}
                        >
                            <Icon className="nav-icon" />
                            {!collapsed && <span className="nav-label">{item.name}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Collapse Button */}
            <div className="sidebar-footer">
                <button
                    className="collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </div>
        </aside>
    );
}
