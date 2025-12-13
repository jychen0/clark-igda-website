import React, { useState, useEffect } from "react";
import "../css/Home.css";
import GenericHeader from "../components/GenericHeader";
import HomeEventCard from "../components/HomeEventCard";
import HomeAnnouncementCard from "../components/HomeAnnouncementCard";

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);

    const announcements = [
        { title: 'Welcome to Fall 2025', date: 'Nov 1, 2025', tag: 'General', desc: 'Welcome back everyone!...' },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/get-all-events");
                if (!res.ok) throw new Error("Failed fetching events");
                const data = await res.json();

                if (data.message === "success") {
                    setEvents(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const upcomingEvents = events
        .filter(event => {
            const start = event.date?.start;
            if (!start) return false;

            return new Date(start) >= new Date();
        })
        .sort((a, b) => new Date(a.date.start) - new Date(b.date.start));

    const maxIndex = Math.max(0, upcomingEvents.length - 3);
    const next = () => setIndex(i => Math.min(i + 1, maxIndex));
    const prev = () => setIndex(i => Math.max(i - 1, 0));

    return (
        <>
            <GenericHeader
                title="Welcome to Clark University IGDA"
                subtitle="Clark University International Game Developers Association"
                gradientColors={["#550100", "#A11812", "#550100"]}
            />

            <div className="home-container">

                <section className="upcoming-events">
                    <h2>Upcoming Events</h2>

                    {loading && <p>Loading events...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {!loading && !error && upcomingEvents.length === 0 && (
                        <p className="no-events">No Upcoming Events</p>
                    )}

                    {upcomingEvents.length > 0 && upcomingEvents.length < 3 && (
                        <div className="event-grid">
                            {upcomingEvents.map((event, i) => (
                                <HomeEventCard
                                    title={event.eventName || event.title} 
                                    start={event.date?.start}
                                    end={event.date?.end}
                                    location={event.location}
                                    desc={event.overview || event.desc}
                                />

                            ))}
                        </div>
                    )}

                    {upcomingEvents.length >= 3 && (
                        <div className="carousel-container">
                            <button
                                className="carousel-btn"
                                onClick={prev}
                                disabled={index === 0}
                            >
                                ←
                            </button>

                            <div className="event-grid">
                                {upcomingEvents.slice(index, index + 3).map((event, i) => (
                                    <HomeEventCard key={i} {...event} />
                                ))}
                            </div>

                            <button
                                className="carousel-btn"
                                onClick={next}
                                disabled={index === maxIndex}
                            >
                                →
                            </button>
                        </div>
                    )}
                </section>

                <section className="announcements">
                    <h2>Announcements</h2>
                    {announcements.map((a, i) => (
                        <HomeAnnouncementCard key={i} {...a} />
                    ))}
                </section>

            </div>
        </>
    );
}

export default Home;
