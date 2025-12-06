import React from 'react';
import type { LucideIcon } from 'lucide-react';
import './StatCard.scss';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
    iconClassName?: string;
    delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    trend,
    className = '',
    iconClassName = '',
    delay = 0,
}) => {
    return (
        <div
            className={`stat-card slide-up ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="stat-content">
                <div className="stat-left">
                    <p className="stat-title">{title}</p>

                    <p className="stat-value">{value}</p>

                    {trend && (
                        <p
                            className={`stat-trend ${trend.isPositive ? 'positive' : 'negative'
                                }`}
                        >
                            {trend.isPositive ? '+' : ''}
                            {trend.value}% from last month
                        </p>
                    )}
                </div>

                <div className={`stat-icon ${iconClassName || ''}`}>
                    <Icon className="icon" />
                </div>
            </div>
        </div>
    );
};

export default StatCard;
