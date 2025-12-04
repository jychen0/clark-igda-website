import React, { useState } from "react";
import { Form, Card, Button, InputGroup } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepThree = ({ nextStep, handleFormData, prevStep, teamInfo, memberInfo }) => {
    //creating error state for validation
    const [error, setError] = useState(false);

    // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();

        // checking if value of first name and last name is empty show error else take to next step
        if (validator.isEmpty(teamInfo.teamName)) {
            setError(true);
        } else {
            nextStep(4);
        }
    };
    return (
        <>
            <Card style={{ marginTop: 100 }}>
                <Card.Body>
                    <Form onSubmit={submitFormData}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter a Team Name:</Form.Label>
                            <Form.Control
                                style={{ border: error ? "2px solid red" : "" }}
                                type="text"
                                placeholder="Team Edgecase"
                                onChange={handleFormData("teamName")}
                            />
                            {error ? (
                                <Form.Text style={{ color: "red" }}>
                                    This is a required field
                                </Form.Text>
                            ) : (
                                ""
                            )}
                        </Form.Group>

                        {memberInfo.map((item) => (
                            <Form.Group className="mb-3" key={item.id.toString()}>
                                <Form.Label>Member {item.id+1} info:</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Full name:</InputGroup.Text>
                                    <Form.Control
                                        style={{ border: error ? "2px solid red" : "" }}
                                        aria-label="Full name"
                                        name="fullName"
                                        id={item.id.toString()}
                                        defaultValue={memberInfo[item.id].fullName}
                                        type="text"
                                        placeholder="John Menticide"
                                        onChange={handleFormData("members")}
                                    />
                                    <InputGroup.Text>Discord Contact:</InputGroup.Text>
                                    <Form.Control
                                        style={{ border: error ? "2px solid red" : "" }}
                                        aria-label="Discord Contact"
                                        name="discordContact"
                                        id={item.id.toString()}
                                        defaultValue={memberInfo[item.id].discordContact}
                                        type="text"
                                        placeholder="igda_jammer"
                                        onChange={handleFormData("members")}
                                    />
                                    <InputGroup.Text>Clark Student:</InputGroup.Text>
                                    <InputGroup.Checkbox
                                        id={item.id.toString()}
                                        name="cStudent"
                                        type="checkbox"
                                        aria-label="Clark Student"
                                        checked={memberInfo[item.id].cStudent}
                                        onChange={handleFormData("members")}
                                    />
                                </InputGroup>
                            </Form.Group>
                        ))}

                        <Form.Group className="mb-3">
                            <Form.Label>If applicable, would your team be willing to take on additional members?</Form.Label>
                            <Form.Check
                                type="checkbox"
                                id="acceptMembers"
                                label="Yes"
                                name="acceptMembers"
                                checked={teamInfo.acceptMembers}
                                onChange={handleFormData("acceptMembers")}
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

export default StepThree;