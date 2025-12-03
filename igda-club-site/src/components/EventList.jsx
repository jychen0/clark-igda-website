import React, { useState, useEffect } from "react";
import LargeEventCard from "./LargeEventCard";

function EventList() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [filterLocation, setFilterLocation] = useState("All");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/get-all-events");
                if (!res.ok) throw new Error("Failed fetching events");
                const data = await res.json();
                if (data.message === "success") {
                    setEvents(data.data);
                    setFilteredEvents(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        let filtered = events;

        if (searchTerm.trim()) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter((event) => {
                const nameMatch = event.eventName?.toLowerCase().includes(lowerSearch);
                const overviewMatch = event.overview?.toLowerCase().includes(lowerSearch);
                const locationMatch = event.location?.location?.toLowerCase().includes(lowerSearch);
                return nameMatch || overviewMatch || locationMatch;
            });
        }

        if (filterType !== "All") {
            filtered = filtered.filter((event) => event.eventType === filterType);
        }

        if (filterLocation !== "All") {
            const isInPerson = filterLocation === "In Person";
            filtered = filtered.filter((event) => event.location?.held === 1);
        }

        setFilteredEvents(filtered);
    }, [searchTerm, filterType, filterLocation, events]);

    return (
        <section id="EventList" className="container my-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <input
                    type="text"
                    className="form-control w-50 mb-2"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="d-flex flex-wrap gap-2">
                    <select
                        className="form-select w-auto mb-2"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">All Types</option>
                        <option value="Expo">Expo</option>
                        <option value="Game Jam">Game Jam</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Industry Talk">Industry Talk</option>
                        <option value="Mixer">Mixer</option>
                    </select>

                    <select
                        className="form-select w-auto mb-2"
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                    >
                        <option value="All">All Locations</option>
                        <option value="In Person">In Person</option>
                        <option value="Virtual">Virtual</option>
                    </select>
                </div>
            </div>

            <ul className="list-unstyled">
                {error && <li className="text-danger">{error}</li>}
                {filteredEvents.map((event) => (
                    <li key={event._id}>
                        <LargeEventCard event={event} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default EventList;
