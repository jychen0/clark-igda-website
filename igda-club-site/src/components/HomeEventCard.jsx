function HomeEventCard({ title, date, time, location, desc }) {
    return (
        <div className="event-card border rounded-2xl p-4 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p>{date} • {time}</p>
            <p className="text-sm text-gray-500">{location}</p>
            <p className="mt-2">{desc}</p>
        </div>
    );
}

export default HomeEventCard;
