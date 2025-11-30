import React, { useState } from "react";
import "../css/Calendar.css";
import GenericHeader from "../components/GenericHeader";

function CalendarPage() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    // Track active filters
    const [activeFilters, setActiveFilters] = useState([
        "Game Jam",
        "Workshop",
        "Speaker",
        "Social",
        "Showcase",
    ]);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Placeholder events (MongoDB later)
    const events = [
        { date: new Date(2025, 10, 15), title: "Game Jam 2025", type: "Game Jam" },
        { date: new Date(2025, 10, 18), title: "Unity Workshop", type: "Workshop" },
        { date: new Date(2025, 10, 22), title: "Industry Speaker Series", type: "Speaker" },
    ];

    // Calendar logic
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDayOfMonth.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(new Date(currentYear, currentMonth, i));
    }

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    // Filter event list for a specific date
    const getEventForDate = (date) =>
        events.filter(
            (event) =>
                event.date.getFullYear() === date.getFullYear() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getDate() === date.getDate() &&
                activeFilters.includes(event.type)
        );

    // Filter control logic
    const toggleFilter = (type) => {
        if (activeFilters.includes(type)) {
            setActiveFilters(activeFilters.filter((t) => t !== type));
        } else {
            setActiveFilters([...activeFilters, type]);
        }
    };

    const selectAll = () => {
        setActiveFilters(["Game Jam", "Workshop", "Speaker", "Social", "Showcase"]);
    };

    const clearAll = () => {
        setActiveFilters([]);
    };

    return (
        <>
            <GenericHeader
                title="Event Calendar"
                gradientColors={["#550100", "#A11812", "#550100"]}
            />

            <div className="calendar-page container my-5">
                <div className="row">
                    {/* Filters */}
                    <div className="col-md-3 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="card-title">Event Filters</h5>
                                <ul className="list-unstyled">
                                    {["Game Jam", "Workshop", "Speaker", "Social", "Showcase"].map((type) => (
                                        <li key={type} className="mb-2">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={activeFilters.includes(type)}
                                                    onChange={() => toggleFilter(type)}
                                                    className="me-2"
                                                />
                                                {type}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                <div className="d-flex flex-column">
                                    <button className="btn btn-outline-danger mb-2" onClick={selectAll}>
                                        Select All
                                    </button>
                                    <button className="btn btn-outline-secondary" onClick={clearAll}>
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calendar */}
                    <div className="col-md-9">
                        <div className="calendar-container shadow-sm rounded-3 p-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <button className="btn btn-outline-dark" onClick={prevMonth}>‹</button>
                                <h4 className="mb-0">
                                    {monthNames[currentMonth]} {currentYear}
                                </h4>
                                <button className="btn btn-outline-dark" onClick={nextMonth}>›</button>
                            </div>

                            <div className="calendar-grid">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <div key={day} className="calendar-header">{day}</div>
                                ))}

                                {calendarDays.map((date, i) => {
                                    const dayEvents = date ? getEventForDate(date) : [];
                                    return (
                                        <div key={i} className="calendar-cell">
                                            {date && (
                                                <>
                                                    <div
                                                        className={`calendar-date ${
                                                            date.getDate() === today.getDate() &&
                                                            date.getMonth() === today.getMonth() &&
                                                            date.getFullYear() === today.getFullYear()
                                                                ? "today"
                                                                : ""
                                                        }`}
                                                    >
                                                        {date.getDate()}
                                                    </div>
                                                    {dayEvents.map((event, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`calendar-event event-${event.type.toLowerCase().replace(" ", "-")}`}
                                                        >
                                                            {event.title}
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CalendarPage;
