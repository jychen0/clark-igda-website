import React, { useEffect, useState } from "react";
import "../css/Calendar.css";
import { useLocation } from "react-router-dom";
import GenericHeader from "../components/GenericHeader";

function CalendarPage() {
    const today = new Date();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const queryMonth = parseInt(queryParams.get("month"));
    const queryYear = parseInt(queryParams.get("year"));
    const queryDay = parseInt(queryParams.get("day"));

    const [currentMonth, setCurrentMonth] = useState(!isNaN(queryMonth) ? queryMonth : today.getMonth());
    const [currentYear, setCurrentYear] = useState(!isNaN(queryYear) ? queryYear : today.getFullYear());
    const [selectedDay, setSelectedDay] = useState(!isNaN(queryDay) ? queryDay : null);

    //used to prevent user from going past January 2023 in the Calendar
    const [firstYear, setFirstYear] = useState(false);
    const [firstMonth, setFirstMonth] = useState(false);
    //variables for getting info from DB
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    // used to select an event to show details
    const [selectedEvent, setSelectedEvent] = useState(null);
    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            //asynchronous function
            try {
                const res = await fetch("/get-all-events")
                if (!res.ok) {
                    throw new Error("Failed fetching events, error:" + res.statusText);
                }
                const data = await res.json();
                if (data.message === "success") {
                    setEvents(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        }
        fetchEvents();
    }, [])

    // Track active filters
    const [activeFilters, setActiveFilters] = useState([
        "Expo", //expo
        "Game Jam", //game jam
        "Asset Jam", //asset jam
        "Workshop", //workshop
        "Industry Talk", //talk
        "Mixer",  //mixer
        "Info Session", //info session
        "Field Trip", //field trip
    ]);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
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
            if ((currentYear + 1) > 2023) {
                setFirstYear(false);//re-enable previous year button
            }
        } else {
            setCurrentMonth(currentMonth + 1);
            setFirstMonth(false); //re-enable previous month button
        }
    };
    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
            if ((currentYear - 1) <= 2023) {
                setFirstYear(true);//jan 2024
            }
        } else {
            setCurrentMonth(currentMonth - 1);
            if ((currentMonth - 1) === 0) {
                if ((currentYear) <= 2023) {
                    setFirstMonth(true); //jan 2023
                }
            }
        }
    };
    //currentYear seems to lag 1 value behind what it should be, maybe the setYear functions are updated later?
    const nextYear = () => {
        if ((currentYear + 1) > 2023) {
            setFirstYear(false);//re-enable previous year button
        }
        if ((currentMonth) === 0) {
            setFirstMonth(false);//re-enable previous month button
        }
        setCurrentYear(currentYear + 1);
    }
    const prevYear = () => {
        //IGDA club revived in 2023, prevent calendar from going further
        //toggling disabled state should disable all mouse events
        setCurrentYear(currentYear - 1);
        if ((currentYear - 1) <= 2023) {
            setFirstYear(true);//disable previous year button
            if ((currentMonth) === 0) {
                setFirstMonth(true);//disable previous month button
            }
        }
    }

    // Filter event list for a specific date
    const getEventForDate = (date) =>
        events.filter(
            (event) =>
                (
                    //start time is within day
                    (date.getTime() <= new Date(event.date.start).getTime() && new Date(event.date.start).getTime() < (date.getTime() + 86400000)) ||
                    //end time is within day
                    (date.getTime() <= new Date(event.date.end).getTime() && new Date(event.date.end).getTime() < (date.getTime() + 86400000)) ||
                    //start time is before & end time is after day
                    //this case is only reached during game & asset jams, all other events the first testcase is enough
                    (date.getTime() > new Date(event.date.start).getTime() && new Date(event.date.end).getTime() > (date.getTime() + 86400000))
                )
                && activeFilters.includes(event.eventType)
        );

    // Filter control logic
    const toggleFilter = (eventType) => {
        if (activeFilters.includes(eventType)) {
            setActiveFilters(activeFilters.filter((t) => t !== eventType));
        } else {
            setActiveFilters([...activeFilters, eventType]);
        }
    };

    const selectAll = () => {
        setActiveFilters(["Expo", "Game Jam", "Asset Jam", "Workshop", "Industry Talk", "Mixer", "Info Session", "Field Trip"]);
    };

    const clearAll = () => {
        setActiveFilters([]);
    };

    const resetToToday = () => {
        const now = new Date();
        setCurrentMonth(now.getMonth());
        setCurrentYear(now.getFullYear());

        setFirstYear(now.getFullYear() <= 2023);
        setFirstMonth(now.getFullYear() <= 2023 && now.getMonth() === 0);
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
                                    {["Expo", "Game Jam", "Asset Jam", "Workshop", "Industry Talk", "Mixer", "Info Session", "Field Trip"].map((type) => (
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

                        {/* Controls + Legend Box (match filter box styling) */}
                        <div className="card shadow-sm border-0 mt-3">
                            <div className="card-body">
                                <button className="btn btn-outline-primary w-100 mb-3" onClick={resetToToday}>
                                    Reset to Today
                                </button>

                                <h6 className="mb-2">Legend</h6>
                                <div className="calendar-legend">
                                    {[
                                        ["Expo", "event-expo"],
                                        ["Game Jam", "event-game-jam"],
                                        ["Asset Jam", "event-asset-jam"],
                                        ["Workshop", "event-workshop"],
                                        ["Industry Talk", "event-industry-talk"],
                                        ["Mixer", "event-mixer"],
                                        ["Info Session", "event-info-session"],
                                        ["Field Trip", "event-field-trip"],
                                    ].map(([label, cls]) => (
                                        <div key={label} className="legend-item">
                                            <span className={`legend-color ${cls}`}></span> {label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Calendar */}
                    <div className="col-md-9">
                        <div className="calendar-container shadow-sm rounded-3 p-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <button id="prevYear" className="btn btn-outline-dark" onClick={prevYear} disabled={firstYear} style={{ marginRight: "5px" }}>
                                        <img className="img-fluid"
                                            src={`${process.env.PUBLIC_URL}/icons/much-less-than.png`} alt="previous year"
                                            style={{ display: "inline-block", width: "18px", height: "18px", verticalAlign: "-.125em" }}
                                        />
                                    </button>
                                    <button id="prevMonth" className="btn btn-outline-dark" disabled={firstMonth} onClick={prevMonth}>
                                        <img className="img-fluid"
                                            src={`${process.env.PUBLIC_URL}/icons/less-than.png`} alt="previous month"
                                            style={{ display: "inline-block", width: "18px", height: "18px", verticalAlign: "-.125em" }}
                                        />
                                    </button>
                                </div>
                                <h4 className="mb-0">
                                    {monthNames[currentMonth]} {currentYear}
                                </h4>
                                <div>
                                    <button id="nextMonth" className="btn btn-outline-dark" onClick={nextMonth} style={{ marginRight: "5px" }}>
                                        <img className="img-fluid"
                                            src={`${process.env.PUBLIC_URL}/icons/greater-than.png`} alt="next month"
                                            style={{ display: "inline-block", width: "18px", height: "18px", verticalAlign: "-.125em" }}
                                        />
                                    </button>
                                    <button id="nextYear" className="btn btn-outline-dark" onClick={nextYear}>
                                        <img className="img-fluid"
                                            src={`${process.env.PUBLIC_URL}/icons/much-greater-than.png`} alt="next year"
                                            style={{ display: "inline-block", width: "18px", height: "18px", verticalAlign: "-.125em" }}
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="calendar-grid">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <div key={day} className="calendar-header">{day}</div>
                                ))}

                                {calendarDays.map((date, i) => {
                                    const dayEvents = date ? getEventForDate(date) : [];
                                    console.log(date);
                                    console.log(dayEvents);
                                    return (
                                        <div key={i} className="calendar-cell">
                                            {date && (
                                                <>
                                                    <div
                                                        className={`calendar-date ${date.getDate() === today.getDate() &&
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
                                                            className={`calendar-event event-${event.eventType.toLowerCase().replace(" ", "-")}`}
                                                            onClick={() => handleEventClick(event)}
                                                        >
                                                            {event.eventName}
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

                {/* Event Details Box */}
                {selectedEvent && (
                    <div className="event-details-container mt-4">
                        <div className="event-details-box shadow-sm p-3 rounded-3">
                            <h5>{selectedEvent.eventName}</h5>
                            <p><strong>Type:</strong> {selectedEvent.eventType}</p>
                            <p><strong>Starts:</strong> {new Date(selectedEvent.date.start).toLocaleString()}</p>
                            <p><strong>Ends:</strong> {new Date(selectedEvent.date.end).toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CalendarPage;
