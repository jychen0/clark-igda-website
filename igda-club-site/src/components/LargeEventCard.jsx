import React from "react";
import "../css/EventCard.css";

const day = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
const month = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function LargeEventCard(props) {
    const event = props.event;
    const event_classes = "card "
    const location = event.location.held ? "In Person" : "Virtual"
    const startTime = new Date(event.date.start);
    const endTime = new Date(event.date.end);
    const timeFrame = startTime.getDate() === endTime.getDate() ? day[startTime.getDay()]+", "+month[startTime.getMonth()]+" "+startTime.getDate() :
        day[startTime.getDay()]+", "+month[startTime.getMonth()]+" "+startTime.getDate()+" to "+day[endTime.getDay()]+", "+month[endTime.getMonth()]+" "+endTime.getDate()

    const speakers = event.speakers;
    speakers.forEach(speaker => {
        const speakerText = speaker.speakerName
    })
    return (
        <div className="card eventCard">
            <img className="card-img-top" src={`${process.env.PUBLIC_URL}/assets/event_posters/${props.event.posterIMG}`} alt={event.posterIMG}/>
            <div className="card-body">
                <h5 className="card-title">{event.eventName}</h5>
                <p className="card-text">{event.overview}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">event speaker</li>
                <li className="list-group-item">{location} - {event.location.location}</li>
                <a href="/calendar" className="card-link">{timeFrame}</a>
            </ul>
            <div className="card-body">
                <a href="/home" className="card-link">Event info link</a>
            </div>
        </div>
    )
}

export default LargeEventCard;