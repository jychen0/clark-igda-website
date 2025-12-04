import React from "react";
import { Link } from "react-router-dom";
import "../css/About.css";
import GenericHeader from "../components/GenericHeader";

function About() {
  const eboard = [
    { name: "Maya Patten", role: "President", email: "mpatten@clarku.edu" },
    { name: "Chase Burdin", role: "Vice President", email: "cburdin@clarku.edu" },
    { name: "Maxwell DeRienze", role: "Treasurer", email: "mderienze@clarku.edu" },
    { name: "Charlie Schmerzler", role: "Secretary", email: "cschmerzler@clarku.edu" },
    { name: "Ren Grunberg", role: "Events Staff", email: "rgrunberg@clarku.edu" },
    { name: "Diego Delmont", role: "Event Staff", email: "ddelmont@clarku.edu" },
  ];

    function getRandomInteger() {
        return Math.floor(Math.random() * (1));
    }

    const IMG = (Math.random() * 10) < 5 ? "IMG_3477.jpg" : "IMG_3473.jpg";

  return (
    <>
      <GenericHeader
        title="About Us"
        gradientColors={["#550100", "#A11812", "#550100"]}
      />

      <div className="container my-5 about-page">
        {/* --- Top Section: IGDA Info --- */}
        <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0 info-card">
              <div className="card-body">
                <h5 className="card-title text-danger">What is IGDA?</h5>
                <p className="card-text">
                  The International Game Developers Association (IGDA) is the
                  world’s largest nonprofit membership organization serving
                  individuals who create video games.
                </p>
                <p className="card-text">
                  Clark University’s IGDA chapter brings together students who
                  are passionate about game development, from programming and
                  art to design and storytelling. Whether you’re an experienced
                  developer or just getting started, you’ll find a welcoming
                  community here.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0 info-card">
              <div className="card-body">
                <h5 className="card-title text-danger">Our Mission</h5>
                <blockquote className="blockquote">
                  <em>
                    "To foster a vibrant community of game developers at Clark
                    University by providing opportunities for learning,
                    collaboration, and creativity. We aim to support our members
                    in developing their skills, building meaningful connections,
                    and pursuing their passion for game development."
                  </em>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* --- What We Do Section --- */}
        <h4 className="mb-3 text-center">What We Do</h4>
        <div className="row mb-5">
          {[
            {
              title: "Game Development Workshops",
              text: "Regular workshops covering Unity, Unreal Engine, pixel art, sound design, and more.",
            },
            {
              title: "Game Jams",
              text: "Collaborative 48-hour game creation events where you can build games with fellow students.",
            },
            {
              title: "Industry Speakers",
              text: "Guest speakers from the game industry sharing their experiences and insights.",
            },
            {
              title: "Social Events",
              text: "Networking socials, game nights, and community-building activities.",
            },
          ].map((item, idx) => (
            <div key={idx} className="col-md-6 col-lg-3 mb-4">
              <div className="card shadow-sm border-0 what-we-do-card">
                <div className="card-body">
                  <h6 className="card-title text-danger">{item.title}</h6>
                  <p className="card-text">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- E-Board Section --- */}
        <h4 className="mb-3 text-center">E-Board Members</h4>
        <div className="row mb-5">
          {eboard.map((member, idx) => (
            <div key={idx} className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm eboard-card">
                <div className="card-body text-center">
                  <h6 className="card-title fw-bold">{member.name}</h6>
                  <p className="text-danger mb-1">{member.role}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-muted small email-link"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
            <img
                src={`${process.env.PUBLIC_URL}/assets/${IMG}`}
                alt={"Charlie in captivity"}
                className="img-fluid object-fit-cover"
                style={{ width: 600, maxHeight: 600, margin: "auto"}}
            />
        </div>

        {/* --- How to Join --- */}
        <div className="card shadow-sm join-card border-danger mb-5">
          <div className="card-body">
            <h5 className="card-title text-danger">How to Join</h5>
            <p>
              Joining Clark University IGDA is easy and free! We welcome students
              of all skill levels and majors. Whether you’re a computer science
              student, an art major, or just curious about game development,
              there’s a place for you here.
            </p>

            <div className="join-section mt-4">
              <h6 className="fw-bold">General Membership</h6>
              <p className="mb-2">
                Simply show up to any of our events and join the Discord!
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-danger">View Calendar</button>
                <button className="btn btn-outline-danger">Join Our Discord</button>
              </div>
            </div>

            <hr />

            <div className="join-section mt-3">
              <h6 className="fw-bold">E-Board Applications</h6>
              <p>
                Interested in joining the E-Board? Applications open at the
                beginning of each semester. E-Board members help plan events,
                manage club operations, and shape the future of IGDA at Clark.
              </p>
              <Link to="/eboard/application" className="btn btn-outline-secondary">
                E-Board Application Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
