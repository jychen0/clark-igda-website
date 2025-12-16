import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenericHeader from "../components/GenericHeader";
import "../css/EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
          //const res = await fetch(`/events/${id}`);
        const res = await fetch(`/get-event-by-id?id=${id}`);
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) return <p className="event-loading">Loading event...</p>;
  if (error) return <p className="event-error">{error}</p>;
  if (!event) return null;

  return (
    <>
      <GenericHeader
        title={event.eventName}
        subtitle={event.eventType}
        gradientColors={["#550100", "#A11812", "#550100"]}
      />

      <div className="event-details-container">
        {event.posterIMG && (
          <img
              src={`${process.env.PUBLIC_URL}/assets/event_posters/${event.posterIMG}`}
              alt={event.eventName}
              className="event-poster"
          />
        )}

        <div className="event-info">
          <p>
            <strong>Date:</strong>{" "}
            {new Date(event.date.start).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {new Date(event.date.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" – "}
            {new Date(event.date.end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {event.location?.held === 1 ? event.location.location : "Virtual"}
          </p>

          {event.capacity && (
            <p>
              <strong>Capacity:</strong> {event.capacity}
            </p>
          )}
        </div>

        {event.overview && (
          <section className="event-section">
            <h3>About This Event</h3>
            <p>{event.overview}</p>
          </section>
        )}

        {event.speakers?.length > 0 && (
          <section className="event-section">
            <h3>Speakers</h3>
            <div className="speaker-grid">
              {event.speakers.map((s, i) => (
                <div key={i} className="speaker-card">
                  <h4>{s.speakerName}</h4>
                  {s.speakerPos && <p>{s.speakerPos}</p>}
                  {s.speakerCred && <p>{s.speakerCred}</p>}
                  {s.speakerInfo && (
                    <a href={`https://www.linkedin.com/in/${s.speakerInfo}`}target="_blank" rel="noreferrer">
                      Social / Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Target Tracks */}
        {event.targetTracks?.length > 0 && (
          <section className="event-section">
            <h3>Target Tracks</h3>
            <div className="track-tags">
              {event.targetTracks.map((track) => (
                <span key={track} className="track-tag">
                  {track}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default EventDetails;
