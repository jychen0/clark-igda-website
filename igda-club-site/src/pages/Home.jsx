import GenericHeader from "../components/GenericHeader";
import HomeEventCard from '../components/HomeEventCard';
import HomeAnnouncementCard from '../components/HomeAnnouncementCard';

function Home() {
    const events = [
        { title: 'Game Jam 2025', date: 'Nov 15, 2025', time: '6:00 PM - 10:00 PM', location: 'Academic Commons 201', desc: 'Join us for our annual 48-hour game jam!' },
    ];

    const announcements = [
        { title: 'Welcome to Fall 2025', date: 'Nov 1, 2025', tag: 'General', desc: 'Welcome back everyone!...' },
    ];

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
                    <div className="event-grid">
                        {events.map((event, i) => <HomeEventCard key={i} {...event} />)}
                    </div>
                </section>

                <section className="announcements">
                    <h2>Announcements</h2>
                    {announcements.map((a, i) => <HomeAnnouncementCard key={i} {...a} />)}
                    <button className="show-more-btn">Show More Announcements</button>
                </section>
            </div>

        </>
    );
}

export default Home;
