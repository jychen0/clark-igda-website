import React from "react";
import { Link } from "react-router-dom";
import "../css/EventCard.css";

function LargeEventCard({ event }) {
  const location = event.location.held ? "In Person" : "Virtual";
  let link;
  if (event.location.held) {
    link = 'https://www.google.com/maps/place/Clark+University+Center+for+Media+Arts,+Computing,+and+Design/@42.2520511,-71.8234891,17z/data=!3m1!4b1!4m6!3m5!1s0x89e407453d81d4db:0xe52ccf58849345d1!8m2!3d42.2520472!4d-71.8209142!16s%2Fg%2F11vf1slnz3'
  } else {
    link = 'https://discord.gg/QDZrPtB94V';
  }
  const startTime = new Date(event.date.start);
  const endTime = new Date(event.date.end);

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const timeFrame =
    startTime.getDate() === endTime.getDate()
      ? `${dayNames[startTime.getDay()]}, ${monthNames[startTime.getMonth()]} ${startTime.getDate()}`
      : `${dayNames[startTime.getDay()]}, ${monthNames[startTime.getMonth()]} ${startTime.getDate()} - ${dayNames[endTime.getDay()]}, ${monthNames[endTime.getMonth()]} ${endTime.getDate()}`;

  const eventYear = startTime.getFullYear();
  const eventMonth = startTime.getMonth();
  const eventDay = startTime.getDate();

  return (
    <div className="large-event-card card mb-4 shadow-sm border-0 overflow-hidden">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`${process.env.PUBLIC_URL}/assets/event_posters/${event.posterIMG}`}
            alt={event.eventName}
            className="img-fluid h-100 w-100 object-fit-cover"
          />
        </div>

        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100 justify-content-between">
            <div>
              <h5 className="card-title fw-bold">{event.eventName}</h5>
              <p className="card-text text-muted mb-2">{event.overview}</p>
              <p className="card-text small mb-1">
                <strong>Location:</strong> {location} —
                <a href={link} style={{ color: "black" }} target="_blank" rel="noopener noreferrer">
                  {event.location.location}
                </a>
              </p>
              <p className="card-text small mb-1">
                <strong>Date:</strong>{" "}
                <Link
                  to={`/calendar?year=${eventYear}&month=${eventMonth}&day=${eventDay}`}
                  className="text-decoration-none"
                >
                  {timeFrame}
                </Link>
              </p>
            </div>
            <div className="mt-3">
              <Link
                to={`/events/${event._id}`}
                className="btn btn-outline-danger btn-sm"
              >
                View Event Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LargeEventCard;
