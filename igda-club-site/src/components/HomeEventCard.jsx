import { Link } from "react-router-dom";
import "../css/HomeEventCard.css";

function HomeEventCard({ title, start, end, location, desc }) {
    const dateObj = new Date(start);

    const formattedDate = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    return (
        <div className="event-card">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p>{formattedDate} • {formattedTime}</p>
            {location?.location && (
                <p className="text-sm text-gray-500">{location.location}</p>
            )}
            {desc && <p className="mt-2">{desc}</p>}

            <div className="mt-3">
              <Link to="/home" className="btn btn-outline-danger btn-sm">
                View Event Info
              </Link>
            </div>
        </div>
    );
}

export default HomeEventCard;
