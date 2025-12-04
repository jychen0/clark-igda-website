import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, teamInfo, memberInfo }) => {
    //creating error state for validation
    const [error, setError] = useState(false);

    // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();
        teamInfo.teamSignup === "join" ? nextStep(2) : nextStep(3)
    };

    return (
        <div>
            <Card style={{ marginTop: 100 }}>
                <Card.Body>
                    <Form onSubmit={submitFormData}>
                        <Form.Group className="mb-3">
                            <Form.Label>Are you looking to join a team, or register as your own team / Solo?</Form.Label>
                            <Form.Check
                                type="radio"
                                id={`register`}
                                label={`I want to register my own team`}
                                name={"teamSignup"}
                                checked={teamInfo.teamSignup === "register"} //checked by default in JamRegister.jsx
                                onChange={handleFormData("teamSignup")}
                            />
                            <Form.Check
                                type="radio"
                                id={`join`}
                                label={`I want to join a team`}
                                name={"teamSignup"}
                                checked={teamInfo.teamSignup === "join"}
                                onChange={handleFormData("teamSignup")}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StepOne;