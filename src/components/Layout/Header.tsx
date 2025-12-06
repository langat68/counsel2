import { Bell, Search, User } from "lucide-react";
import "./Header.css";

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="header">
            {/* Title Section */}
            <div className="header-left">
                <h1 className="header-title">{title}</h1>
                {subtitle && <p className="header-subtitle">{subtitle}</p>}
            </div>

            {/* Right Section */}
            <div className="header-right">
                {/* Search */}
                <div className="header-search">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search clients, cases..."
                        className="search-input"
                    />
                </div>

                {/* Notifications */}
                <button className="icon-button notification-button">
                    <Bell className="icon" />
                    <span className="notification-badge">3</span>
                </button>

                {/* User Menu */}
                <div className="user-menu">
                    <button className="avatar-button">
                        <div className="avatar">JD</div>
                    </button>

                    <div className="user-dropdown">
                        <div className="dropdown-user-info">
                            <p className="name">John Doe</p>
                            <p className="email">john.doe@lawfirm.com</p>
                        </div>

                        <button className="dropdown-item">
                            <User className="dropdown-icon" /> Profile
                        </button>

                        <button className="dropdown-item">Settings</button>

                        <button className="dropdown-item logout">Log out</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
