import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/GameExpo.css";
import EventList from "../components/EventList";
import GenericHeader from "../components/GenericHeader";

function Events() {
    return (
        <>
            <GenericHeader
                title="Clark University IGDA list of events"
                subtitle="past & present"
                gradientColors={["#550100", "#A11812", "#550100"]}
            />
            <div>
                <EventList />
            </div>
        </>
    );
}

export default Events;