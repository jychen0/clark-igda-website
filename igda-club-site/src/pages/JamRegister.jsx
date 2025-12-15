import { Container, Row, Col } from "react-bootstrap";
import React, {useEffect, useState} from "react";
import StepOne from "../components/JamRegister/JamRegisterOne";
import StepTwo from "../components/JamRegister/JamRegisterTwo";
import StepThree from "../components/JamRegister/JamRegisterThree";
import StepFinal from "../components/JamRegister/JamRegisterFinal";
import GenericHeader from "../components/GenericHeader";

function JamRegister() {
    //state for steps
    const [step, setStep] = useState(1);

    //state for form data
    const [formData, setFormData] = useState({
        teamSignup: "register",
        availability: "remote",
        selectedTracks: [],
        teamName: "",
        acceptMembers: true,
    })
    const [memberData, setMemberData] = useState([
        { id: 0, fullName: "", discordContact: "", cStudent: false},
        ],
    )

    // function for going to next step by increasing step state by 1
    const nextStep = (int) => {
        setStep(int);
    };

    const prevStep = (int) => {
        setStep(int);
    };

    // handling form input data by taking onchange value and updating our previous form data state
    const handleInputData = input => e => {
        //console.log("handling input data");
        if (input === "members") {
            const { id }  = e.target;
            const { name }  = e.target;
            const value = e.target.type === "text" ? e.target.value : (!memberData[id].cStudent);
            console.log(id);
            console.log(name);
            console.log(value);

            setMemberData(
                memberData.map(member =>
                    member.id.toString() === id.toString()
                        ? {...member, [name] : value}
                        : member
                ))

            //buggy but works for the demo
            //just don't delete all the info from not the last member in the list
            if (name === "fullName") {
                if ((value === "") && (memberData[id].discordContact === "")) {
                    if (id.toString() !== (5).toString()) {
                        if (memberData.length > 1) {setMemberData(memberData.filter((_, i) => i !== memberData.length - 1));}
                    }
                } else {
                    if (id.toString() === (memberData.length - 1).toString()) {
                        if (memberData.length < 6) {setMemberData(prevMembers => [...prevMembers, { id: memberData.length, fullName: "", discordContact: "", cStudent: false}])}
                    }
                }
            } else if (name === "discordContact") {
                if ((memberData[id].fullName === "") && (value === "")) {
                    if (id.toString() !== (5).toString()) {
                        if (memberData.length > 1) {setMemberData(memberData.filter((_, i) => i !== memberData.length - 1));}
                    }
                } else {
                    if (id.toString() === (memberData.length - 1).toString()) {
                        if (memberData.length < 6) {setMemberData(prevMembers => [...prevMembers, { id: memberData.length, fullName: "", discordContact: "", cStudent: false}])}
                    }
                }
            }
            console.log(memberData);
            return
        }
        //toggle to take correct value from input depending on input type
        if (e.target.type === "text") {
            const {value } = e.target;
            //updating for data state taking previous state and then adding new value to create new object
            setFormData(prevState => ({...prevState, [input]: value}));

        } else if (e.target.name === "tracks") {

            const { id } = e.target;
            if (formData.selectedTracks.includes(id)) {
                setFormData(prevState => ({...prevState, [input]: formData.selectedTracks.filter((item) => item !== id)}));
            } else {
                setFormData(prevState => ({...prevState, [input]: [...formData.selectedTracks, id]}));
            }

        } else if ((e.target.type === "radio") || e.target.type === "checkbox") {
            if (e.target.type === "checkbox") {
                setFormData(prevState => ({...prevState, [input]: !formData.acceptMembers}));
            } else {
                const {id } = e.target;
                setFormData(prevState => ({...prevState, [input]: id}));
            }
        } else {
            console.log(e.target.type)
        }
        console.log(formData);
    }

// javascript switch case to show different form in each step
    switch (step) {
        // case 1 to show StepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
        case 1:
            return (
                <>
                    <GenericHeader
                        title="Game Jam Sign Up"
                        subtitle="Register your team for the upcoming Game Jam! Whether you’re flying solo or bringing a full squad, we’re excited to see what you create."
                        gradientColors={["#550100", "#A11812", "#550100"]}
                    />

                    <div className="alert alert-danger-light border border-danger-subtle text-center">
                        <strong>Join Our Discord!</strong> All Game Jam communication, announcements, and updates happen on our Discord server.
                        <div className="mt-2">
                            <a href="https://discord.gg/DuzBk2sb9w" className="btn btn-outline-danger">
                                Join Clark IGDA Discord
                            </a>
                        </div>
                    </div>

                    <div className="JamRegister StepOne">
                        <Container>
                            <Row>
                                <Col  md={{ span: 8, offset: 2 }} className="custom-margin">
                                    <StepOne nextStep={nextStep} handleFormData={handleInputData} teamInfo={formData} memberInfo={memberData} />
                                </Col>
                            </Row>
                        </Container>
                    </div>

                </>
            );
        // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
        case 2:
            return (
                <>
                    <GenericHeader
                        title="Game Jam Sign Up"
                        subtitle="Joining a Team..."
                        gradientColors={["#550100", "#A11812", "#550100"]}
                    />

                    <div className="alert alert-danger-light border border-danger-subtle text-center">
                        <strong>Join Our Discord!</strong> All Game Jam communication, announcements, and updates happen on our Discord server.
                        <div className="mt-2">
                            <a href="https://discord.gg/DuzBk2sb9w" className="btn btn-outline-danger">
                                Join Clark IGDA Discord
                            </a>
                        </div>
                    </div>

                    <div className="JamRegister StepTwo">
                        <Container>
                            <Row>
                                <Col  md={{ span: 8, offset: 2 }} className="custom-margin">
                                    <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} teamInfo={formData} memberInfo={memberData} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </>
            );

        case 3:
            return (
                <>
                    <GenericHeader
                        title="Game Jam Sign Up"
                        subtitle="Register a team..."
                        gradientColors={["#550100", "#A11812", "#550100"]}
                    />

                    <div className="alert alert-danger-light border border-danger-subtle text-center">
                        <strong>Join Our Discord!</strong> All Game Jam communication, announcements, and updates happen on our Discord server.
                        <div className="mt-2">
                            <a href="https://discord.gg/DuzBk2sb9w" className="btn btn-outline-danger">
                                Join Clark IGDA Discord
                            </a>
                        </div>
                    </div>

                    <div className="JamRegister StepTwo">
                        <Container>
                            <Row>
                                <Col  md={{ span: 8, offset: 2 }} className="custom-margin">
                                    <StepThree nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} teamInfo={formData} memberInfo={memberData} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </>
            );
        // Only formData is passed as prop to show the final value at form submit
        case 4:
            return (
                <>
                    <GenericHeader
                        title="Game Jam Sign Up"
                        subtitle="Thank you for signing up!"
                        gradientColors={["#550100", "#A11812", "#550100"]}
                    />

                    <div className="alert alert-danger-light border border-danger-subtle text-center">
                        <strong>Join Our Discord!</strong> All Game Jam communication, announcements, and updates happen on our Discord server.
                        <div className="mt-2">
                            <a href="https://discord.gg/DuzBk2sb9w" className="btn btn-outline-danger">
                                Join Clark IGDA Discord
                            </a>
                        </div>
                    </div>

                    <div className="JamRegister StepFinal">
                        <Container>
                            <Row>
                                <Col  md={{ span: 8, offset: 2 }} className="custom-margin">
                                    <StepFinal teamInfo={formData} memberInfo={memberData}  />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </>
            );
        // default case to show nothing
        default:
            return (
                <>
                    <div className="JamRegister">
                    </div>
                </>
            );
    }
}

export default JamRegister