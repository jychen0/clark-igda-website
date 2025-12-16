import React from "react";
import { Card } from "react-bootstrap";
import TeamMember from "../TeamMember";

const Final = ({ teamInfo, memberInfo }) => {

    //destructuring the object from values
    const { teamSignup, availability, selectedTracks, teamName, acceptMembers } = teamInfo;
    console.log(memberInfo);
    const acceptingMembers = acceptMembers ? "Yes, we are accepting members" : "No, we are not accepting members";
    return (
        teamSignup === "join"
            ?
            <>
                <Card style={{ marginTop: 100, textAlign: "left" }}>
                    <Card.Body>
                        <p>You have been signed up for a team, we will contact you with your team's info after the theme is announced!</p>
                        <ul id="teamList">
                            {memberInfo.filter(member => {
                                return member.fullName !== null || member.fullName !== "";
                            }).map((member, index) => (
                                <li key={index}>
                                    <TeamMember
                                        id={member.id}
                                        fullName={member.fullName}
                                        discordContact={member.discordContact}
                                        cStudent={member.cStudent}
                                    />
                                </li>
                            ))}
                        </ul>
                        <p>Availability: {availability}</p>
                        <p>Preferred Tracks: {selectedTracks}</p>
                    </Card.Body>
                </Card>
            </>
            :
            <>
                <Card style={{ marginTop: 100, textAlign: "left" }}>
                    <Card.Body>
                        <p>You're Team has been registered, updates will be through Discord, enjoy!</p>
                        <ul id="teamList">
                            {memberInfo.filter(member => {
                                return member.fullName !== null || member.fullName !== "";
                            }).map((member, index) => (
                                <li key={index}>
                                    <TeamMember
                                        id={member.id}
                                        fullName={member.fullName}
                                        discordContact={member.discordContact}
                                        cStudent={member.cStudent}
                                    />
                                </li>
                            ))}
                        </ul>
                        <p>Team Name: {teamName}</p>
                        <p>Accepting other members?: {acceptingMembers}</p>
                    </Card.Body>
                </Card>
            </>
    );
};

export default Final;