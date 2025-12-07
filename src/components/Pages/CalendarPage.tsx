import { useState } from 'react';
import { DashboardLayout } from '../Layout/DashBoardLayout';
import { Appointment } from '@/types';
import "./CalendarPage.scss"
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    MapPin,
    Video,
    Users,
} from 'lucide-react';

import {
    isSameDay,
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
} from 'date-fns';

import './CalendarPage.scss';

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    // Placeholder appointments data
    const appointments: Appointment[] = [];

    const appointmentsOnSelectedDate = appointments.filter((apt) =>
        isSameDay(apt.date, selectedDate)
    );

    const daysArray = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    return (
        <DashboardLayout title="Calendar" subtitle="Manage appointments and deadlines">
            <div className="calendar-page">
                {/* LEFT: CALENDAR */}
                <div className="calendar-container">
                    <div className="calendar-card">
                        <div className="calendar-header">
                            <h2>{format(currentMonth, 'MMMM yyyy')}</h2>

                            <div className="month-nav">
                                <button onClick={handlePrevMonth}>
                                    <ChevronLeft size={18} />
                                </button>
                                <button onClick={handleNextMonth}>
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            <button className="btn-gold">
                                <Plus size={16} />
                                New Appointment
                            </button>
                        </div>

                        <div className="calendar-grid">
                            {daysArray.map((date) => {
                                const isToday = isSameDay(date, new Date());
                                const isSelected = isSameDay(date, selectedDate);

                                const dayAppointments = appointments.filter((apt) =>
                                    isSameDay(apt.date, date)
                                );

                                return (
                                    <button
                                        key={date.toString()}
                                        className={`day-cell 
                      ${isToday ? 'today' : ''} 
                      ${isSelected ? 'selected' : ''}`}
                                        onClick={() => setSelectedDate(date)}
                                    >
                                        <span className="day-number">{format(date, 'd')}</span>

                                        {/* Appointment badges */}
                                        <div className="day-badges">
                                            {dayAppointments.slice(0, 2).map((apt) => (
                                                <span key={apt.id} className="apt-badge">
                                                    {apt.title.slice(0, 12)}...
                                                </span>
                                            ))}

                                            {dayAppointments.length > 2 && (
                                                <span className="more-count">
                                                    +{dayAppointments.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* RIGHT: LIST OF APPOINTMENTS */}
                <div className="appointments-container">
                    <div className="appointments-card">
                        <div className="appointments-header">
                            <h3>{format(selectedDate, 'EEEE, MMMM d')}</h3>
                        </div>

                        <div className="appointments-list">
                            {appointmentsOnSelectedDate.length > 0 ? (
                                appointmentsOnSelectedDate.map((appointment) => (
                                    <div key={appointment.id} className="appointment-item">
                                        <div className="apt-top">
                                            <h4>{appointment.title}</h4>
                                            <span className="apt-type">{appointment.type}</span>
                                        </div>

                                        <div className="apt-meta">
                                            <div className="meta-row">
                                                <Users size={14} />
                                                {appointment.clientName}
                                            </div>

                                            <div className="meta-row">
                                                <Clock size={14} />
                                                {appointment.time}
                                                {appointment.duration > 0 && ` • ${appointment.duration} min`}
                                            </div>

                                            {appointment.location && (
                                                <div className="meta-row">
                                                    {appointment.isVirtual ? (
                                                        <Video size={14} />
                                                    ) : (
                                                        <MapPin size={14} />
                                                    )}
                                                    {appointment.location}
                                                </div>
                                            )}
                                        </div>

                                        {appointment.description && (
                                            <p className="apt-description">{appointment.description}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="no-appointments">
                                    <div className="icon-circle">
                                        <Clock size={28} />
                                    </div>
                                    <h4>No Appointments</h4>
                                    <p>Nothing scheduled for this day.</p>
                                    <button className="btn-outline-sm">
                                        <Plus size={14} />
                                        Add Event
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}