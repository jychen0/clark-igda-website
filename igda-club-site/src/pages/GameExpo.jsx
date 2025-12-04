import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/GameExpo.css";
import GenericHeader from "../components/GenericHeader";

function GameExpo() {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // We will need a way to update the eventDate
    const eventDate = new Date(2026, 3, 18, 14, 0, 0);
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = new Date();
        const diff = eventDate - now;
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
        };
    }

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(getTimeLeft()), 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <GenericHeader
                title="Clark University Game Expo"
                subtitle="Showcase your games, get feedback from industry professionals, and celebrate the creativity of our game development community!"
                gradientColors={["#550100", "#A11812", "#550100"]}
            />

            <div className="container my-5 gameexpo-page">
                <div className="text-center mb-5">
                    <div className="card shadow-sm border-0 event-card mx-auto">
                        <div className="card-body">
                            <h5 className="text-danger">Fall {eventDate.getFullYear()} Game Expo</h5>
                            <h4 className="fw-bold">{month[eventDate.getMonth()]} {eventDate.getDay()}, {eventDate.getFullYear()}</h4>
                            <p className="text-muted">
                                2:00 PM – 6:00 PM • Center for Media Arts, Computing, and Design (MACD)
                            </p>

                            <p className="mt-3 text-muted">Event starts in:</p>
                            <div className="countdown d-flex justify-content-center gap-4">
                                {["Days", "Hours", "Minutes"].map((label, i) => {
                                    const value = [timeLeft.days, timeLeft.hours, timeLeft.minutes][i];
                                    return (
                                        <div key={label} className="countdown-box">
                                            <div className="countdown-number">{value}</div>
                                            <div className="countdown-label">{label}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <a
                                href="https://eventbrite.com"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-danger mt-4"
                            >
                                RSVP on Eventbrite
                            </a>
                        </div>
                    </div>
                </div>

                <h4 className="text-center mb-4">Exhibitor Registration</h4>
                <div className="row mb-5">
                    <div className="col-md-6 mb-4">
                        <div className="card registration-card shadow-sm border-danger">
                            <div className="card-body">
                                <h5 className="text-danger">Clark Students</h5>
                                <p>
                                    Clark students can showcase their games and sign up for portfolio reviews
                                    with industry professionals.
                                </p>
                                <div className="d-flex flex-column gap-2">
                                    <Link
                                        to="/events/expo/application?type=clarkstudent"
                                        className="btn btn-danger d-flex justify-content-between align-items-center"
                                    >
                                        Sign Up for Booth <i className="bi bi-box-arrow-up-right"></i>
                                    </Link>
                                    <Link
                                        to="/events/expo/portfolio-review"
                                        className="btn btn-outline-danger d-flex justify-content-between align-items-center"
                                    >
                                        Sign Up for Portfolio Review <i className="bi bi-box-arrow-up-right"></i>
                                    </Link>
                                </div>
                                <small className="text-muted d-block mt-3">
                                    <strong>Note:</strong> Booth applications close on November 15th.
                                    Portfolio review slots are limited and assigned first-come, first-served.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card registration-card shadow-sm border-secondary">
                            <div className="card-body">
                                <h5 className="text-secondary">Non-Clark Students</h5>
                                <p>
                                    Students from other universities and industry professionals are welcome
                                    to showcase their games at our expo!
                                </p>
                                <Link
                                    to="/events/expo/application?type=nonclark"
                                    className="btn btn-outline-secondary d-flex justify-content-between align-items-center"
                                >
                                    Register for Booth <i className="bi bi-box-arrow-up-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <h4 className="text-center mb-4">Expo Layout</h4>
                <div className="row mb-4">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm layout-card">
                            {/* <img src={upperLevel} alt="Upper Level Layout" className="card-img-top" /> */}
                            <div className="card-body text-center">
                                <h6>Upper Level</h6>
                                <p className="small text-muted">
                                    Main stage, booths 1-10, portfolio reviews
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm layout-card">
                            {/* <img src={lowerLevel} alt="Lower Level Layout" className="card-img-top" /> */}
                            <div className="card-body text-center">
                                <h6>Lower Level</h6>
                                <p className="small text-muted">
                                    Game booths 11-20, refreshments area
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="alert alert-light border mt-3 layout-notes">
                    <h6 className="fw-bold text-danger">Layout Notes:</h6>
                    <ul>
                        <li>Main stage hosts opening ceremony, presentations, and awards.</li>
                        <li>20 game showcase booths across both levels.</li>
                        <li>Portfolio review stations on the upper level.</li>
                        <li>Food and refreshments on the lower level.</li>
                    </ul>
                    <small className="text-muted">*Final booth assignments available one week before event.</small>
                </div>

                <h4 className="text-center my-4">What to Expect</h4>
                <div className="row mb-5">
                    {[
                        {
                            title: "Game Showcases",
                            text: "Play student-created games from Clark and other universities. Vote for your favorites!",
                        },
                        {
                            title: "Industry Professionals",
                            text: "Meet and network with game developers, recruiters, and veterans of the industry.",
                        },
                        {
                            title: "Portfolio Reviews",
                            text: "Get personalized feedback on your portfolio and projects from professionals.",
                        },
                    ].map((item, idx) => (
                        <div key={idx} className="col-md-4 mb-4">
                            <div className="card shadow-sm text-center what-card border-0">
                                <div className="card-body">
                                    <h6 className="text-danger">{item.title}</h6>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default GameExpo;
