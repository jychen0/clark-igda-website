import React from "react";
import LargeEventCard from './LargeEventCard';
import {useState, useEffect} from 'react';

function EventList() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchEvents = async () => {
            //asynchronous function
            try{
                const res =await fetch("/get-all-events")
                if(!res.ok){
                    throw new Error("Failed fetching events, error:"+res.statusText);
                }
                const data = await res.json();
                if(data.message==="success"){
                    setEvents(data.data);
                }else{
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        }
        fetchEvents();
    }, [])

    return (
        <section id={"EventList"}>
            <ul className="list-group">
                {
                    events.map(function(event, idx) {
                        return(
                            <li key={event._id} className="list-group-item">
                                <LargeEventCard event={event} />
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default EventList;