import React from "react";
import { Link } from "react-router-dom";
import "../css/EventCard.css";

function TeamMember({ id, fullName, discordContact, cStudent }) {
    const clarkStudent = cStudent ? "Clark Student" : "Not a Clark Student";
    const number = parseInt(id)+1;

    return (
        <div>
            <p><strong>Team Member {number}:</strong></p>
            <p> Name: {fullName}, Discord: {discordContact}, {clarkStudent}</p>
        </div>
    );
}

export default TeamMember;