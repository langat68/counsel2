import React from 'react';
import { Appointment } from '@/types';
import { format, isToday, isTomorrow } from 'date-fns';
import { Calendar, Clock, MapPin, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './UpcomingAppointments.scss';

interface UpcomingAppointmentsProps {
    appointments: Appointment[];
}

const typeColors: Record<string, string> = {
    'Court Hearing': 'type-danger',
    Deadline: 'type-warning',
    Meeting: 'type-info',
    Consultation: 'type-primary',
    Deposition: 'type-success',
    Other: 'type-muted',
};

export default function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
    const sortedAppointments = appointments
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 4);

    const getDateLabel = (date: Date) => {
        if (isToday(date)) return 'Today';
        if (isTomorrow(date)) return 'Tomorrow';
        return format(date, 'MMM d');
    };

    return (
        <div className="upcoming-card">
            <div className="upcoming-card__header">
                <h3>Upcoming Schedule</h3>

                <Link to="/calendar" className="upcoming-card__view-btn">
                    View calendar
                    <ArrowRight size={16} />
                </Link>
            </div>

            <div className="upcoming-card__content">
                {sortedAppointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="upcoming-item"
                    >
                        {/* Date */}
                        <div className="upcoming-item__date">
                            <span
                                className={
                                    isToday(appointment.date)
                                        ? 'date-label date-label--highlight'
                                        : 'date-label'
                                }
                            >
                                {getDateLabel(appointment.date)}
                            </span>

                            <span className="date-number">
                                {format(appointment.date, 'd')}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="upcoming-item__divider" />

                        {/* Content */}
                        <div className="upcoming-item__info">
                            <div className="upcoming-item__top">
                                <p className="title">{appointment.title}</p>
                                <span className={`type-badge ${typeColors[appointment.type]}`}>
                                    {appointment.type}
                                </span>
                            </div>

                            <p className="client">{appointment.clientName}</p>

                            <div className="meta">
                                <span className="meta__item">
                                    <Clock size={14} />
                                    {appointment.time}
                                </span>

                                {appointment.location && (
                                    <span className="meta__item">
                                        {appointment.isVirtual ? (
                                            <Video size={14} />
                                        ) : (
                                            <MapPin size={14} />
                                        )}
                                        <span className="location">{appointment.location}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
