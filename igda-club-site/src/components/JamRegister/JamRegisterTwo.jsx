import React, {useEffect, useState} from "react";
import {Form, Card, Button, InputGroup} from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, prevStep, teamInfo, memberInfo }) => {
    //creating error state for validation
    const [error, setError] = useState(false);

    const tracks = [
        { id: 1, track: '2D Art' },
        { id: 2, track: '3D Art' },
        { id: 3, track: 'Programming' },
        { id: 4, track: 'Audio' },
        { id: 5, track: 'Design' },
        { id: 6, track: 'Writing' },
        { id: 7, track: 'Other: ' },
    ]

    // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();
        nextStep(4);
        // checking if value of first name and last name is empty show error else take to next step
        // if (validator.isEmpty(teamInfo.age) || validator.isEmpty(teamInfo.email)) {
        //     setError(true);
        // } else {
        //     nextStep(4);
        // }
    };
    return (
        <>
            <Card style={{ marginTop: 100 }}>
                <Card.Body>
                    <Form onSubmit={submitFormData}>
                        <Form.Group className="mb-3" key={"0"}>
                            <Form.Label>Member info:</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Full name:</InputGroup.Text>
                                <Form.Control
                                    style={{ border: error ? "2px solid red" : "" }}
                                    aria-label="Full name"
                                    name="fullName"
                                    id={"0"}
                                    defaultValue={memberInfo[0].fullName}
                                    type="text"
                                    placeholder="John Menticide"
                                    onChange={handleFormData("members")}
                                />
                                <InputGroup.Text>Discord Contact:</InputGroup.Text>
                                <Form.Control
                                    style={{ border: error ? "2px solid red" : "" }}
                                    aria-label="Discord Contact"
                                    name="discordContact"
                                    id={"0"}
                                    defaultValue={memberInfo[0].discordContact}
                                    type="text"
                                    placeholder="igda_jammer"
                                    onChange={handleFormData("members")}
                                />
                                <InputGroup.Text>Clark Student:</InputGroup.Text>
                                <InputGroup.Checkbox
                                    id={"0"}
                                    name="cStudent"
                                    type="checkbox"
                                    aria-label="Clark Student"
                                    checked={memberInfo[0].cStudent}
                                    onChange={handleFormData("members")}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>What are your preferred tracks / contributions?</Form.Label>
                            {tracks.map((item) => (
                                <Form.Check
                                    key={item.track}
                                    type="checkbox"
                                    name="tracks"
                                    id={item.track.toString()}
                                    label={item.track}
                                    checked={teamInfo.selectedTracks.includes(item.track.toString())}
                                    onChange={handleFormData("selectedTracks")}
                                />
                            ))}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>What is your availability to your team?</Form.Label>
                            <Form.Check
                                type="radio"
                                id={`full`}
                                label={`I'm fully available in person during the weekend, and simply can't make it to the mixer`}
                                name={"availability"}
                                checked={teamInfo.availability === "full"}
                                onChange={handleFormData("availability")}
                            />
                            <Form.Check
                                type="radio"
                                id={`partial`}
                                label={`I'm partially available in person during the weekend, and can show up on at least one day`}
                                name={"availability"}
                                checked={teamInfo.availability === "partial"}
                                onChange={handleFormData("availability")}
                            />
                            <Form.Check
                                type="radio"
                                id={`remote`}
                                label={`I will be fully remote`}
                                name={"availability"}
                                checked={teamInfo.availability === "remote"} //checked by default in JamRegister.jsx
                                onChange={handleFormData("availability")}
                            />
                        </Form.Group>

                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Button variant="primary" onClick={() => prevStep(1)}>
                                Previous
                            </Button>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default StepTwo;