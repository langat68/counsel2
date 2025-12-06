import { useState } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { Plus, ChevronLeft, ChevronRight, Clock, MapPin, Video, Users } from "lucide-react";
import { format, isSameDay, addMonths, subMonths } from "date-fns";
import { mockAppointments } from "../data/mockData";
import "./CalendarPage.css";

const typeColors: Record<string, string> = {
    "Court Hearing": "court",
    Deadline: "deadline",
    Meeting: "meeting",
    Consultation: "consultation",
    Deposition: "deposition",
    Other: "other",
};

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const appointmentsOnSelectedDate = mockAppointments.filter((apt) =>
        isSameDay(apt.date, selectedDate)
    );

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const handleNewAppointment = () => {
        alert("New appointment form would open here");
    };

    return (
        <DashboardLayout title="Calendar" subtitle="Manage appointments and deadlines">
            <div className="calendar-page-grid">
                {/* Calendar */}
                <div className="calendar-section">
                    <div className="card">
                        <div className="card-header">
                            <div className="header-left">
                                <h3>{format(currentMonth, "MMMM yyyy")}</h3>
                                <div className="month-controls">
                                    <button onClick={handlePrevMonth}>
                                        <ChevronLeft />
                                    </button>
                                    <button onClick={handleNextMonth}>
                                        <ChevronRight />
                                    </button>
                                </div>
                            </div>
                            <button className="new-appointment-btn" onClick={handleNewAppointment}>
                                <Plus /> New Appointment
                            </button>
                        </div>

                        <div className="card-content">
                            {/* Calendar grid (simplified example) */}
                            <p className="calendar-placeholder">
                                Calendar grid would go here (you can implement your own or integrate a date picker)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Appointments for selected date */}
                <div className="appointments-section">
                    <div className="card sticky">
                        <div className="card-header">
                            <h4>
                                {format(selectedDate, "EEEE, MMMM d")}
                                {isSameDay(selectedDate, new Date()) && <span className="badge">Today</span>}
                            </h4>
                        </div>

                        <div className="card-content">
                            {appointmentsOnSelectedDate.length > 0 ? (
                                appointmentsOnSelectedDate.map((apt) => (
                                    <div key={apt.id} className={`appointment ${typeColors[apt.type]}`}>
                                        <div className="appointment-header">
                                            <strong>{apt.title}</strong>
                                            <span className="appointment-type">{apt.type}</span>
                                        </div>
                                        <div className="appointment-details">
                                            <div>
                                                <Users /> {apt.clientName}
                                            </div>
                                            <div>
                                                <Clock /> {apt.time} {apt.duration > 0 && `• ${apt.duration} min`}
                                            </div>
                                            {apt.location && (
                                                <div>
                                                    {apt.isVirtual ? <Video /> : <MapPin />} {apt.location}
                                                </div>
                                            )}
                                        </div>
                                        {apt.description && <p className="appointment-description">{apt.description}</p>}
                                    </div>
                                ))
                            ) : (
                                <div className="no-appointments">
                                    <div className="icon">
                                        <Clock />
                                    </div>
                                    <p>No Appointments</p>
                                    <p>Nothing scheduled for this day</p>
                                    <button className="add-event-btn" onClick={handleNewAppointment}>
                                        <Plus /> Add Event
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
