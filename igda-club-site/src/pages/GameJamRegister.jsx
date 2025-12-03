import React from "react";
import { Link } from "react-router-dom";
import "../css/FormPages.css";
import GenericHeader from "../components/GenericHeader";

function GameJamRegister() {
  return (
    <>
      <GenericHeader
        title="Game Jam Sign Up"
        subtitle="Register your team for the upcoming Game Jam! Whether you’re flying solo or bringing a full squad, we’re excited to see what you create."
        gradientColors={["#550100", "#A11812", "#550100"]}
      />

      <div className="container my-5 form-page">
        <Link to="/events/gamejam" className="text-danger mb-3 d-inline-block">
          ← Back to Game Jams
        </Link>

        <div className="alert alert-danger-light border border-danger-subtle text-center">
          <strong>Join Our Discord!</strong> All Game Jam communication, announcements, and updates happen on our Discord server.
          <div className="mt-2">
            <a href="https://discord.gg/" className="btn btn-outline-danger">
              Join Clark IGDA Discord
            </a>
          </div>
        </div>

        <form className="card shadow-sm p-4 border-0 mx-auto" style={{ maxWidth: "700px" }}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Discord Contact <span className="text-danger">*</span>
            </label>
            <input className="form-control" placeholder="username#1234 or @username" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Team Name <span className="text-danger">*</span></label>
            <input className="form-control" placeholder="The Code Wizards" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Teammates & Discord Usernames
            </label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="John Doe (@johndoe)\nJane Smith (@janesmith)"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Would you take on more members? <span className="text-danger">*</span>
            </label>
            <div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="members" id="yes" />
                <label className="form-check-label" htmlFor="yes">
                  Yes, open to new members joining our team
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="members" id="no" />
                <label className="form-check-label" htmlFor="no">
                  No, our team is complete
                </label>
              </div>
            </div>
          </div>

          <button className="btn btn-danger w-100 mt-3">Submit Registration</button>
        </form>
      </div>
    </>
  );
}

export default GameJamRegister;
