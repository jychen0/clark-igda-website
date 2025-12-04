import React from "react";
import { Card } from "react-bootstrap";

const Final = ({ teamInfo, memberInfo }) => {

    //destructuring the object from values
    const { teamSignup, availability, selectedTracks, teamName, acceptMembers } = teamInfo;
    const { teamMembers } = memberInfo;
    return (
        teamSignup === "join"
            ?
            <>
                <Card style={{ marginTop: 100, textAlign: "left" }}>
                    <Card.Body>
                        <p>
                            You have been signed up for a team, we will contact you with your team's info after the theme is announced!
                        </p>
                        <p>
                            <strong>Availability :</strong> {availability}{" "}
                        </p>
                        <p>
                            <strong>Selected Tracks :</strong> {selectedTracks}{" "}
                        </p>
                    </Card.Body>
                </Card>
            </>
            :
            <>
                <Card style={{ marginTop: 100, textAlign: "left" }}>
                    <Card.Body>
                        <p>
                            You're Team has been registered, updates will be through Discord, enjoy!
                        </p>
                        <p>
                            <strong>Team Name :</strong> {teamName}{" "}
                        </p>
                        <p>
                            <strong>Team Members :</strong> {teamMembers}{" "}
                        </p>
                        <p>
                            <strong>Accept Additional Members :</strong> {acceptMembers}{" "}
                        </p>
                    </Card.Body>
                </Card>
            </>
    );
};

export default Final;