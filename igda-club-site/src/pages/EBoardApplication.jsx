import React from "react";
import { Link } from "react-router-dom";
import "../css/FormPages.css";
import GenericHeader from "../components/GenericHeader";

function EBoardApplication() {
  return (
    <>
      <GenericHeader
        title="E-Board Application"
        subtitle="Join the Clark University IGDA leadership team! Help organize events, build community, and shape the future of game development at Clark."
        gradientColors={["#550100", "#A11812", "#550100"]}
      />

      <div className="container my-5 form-page">
        <Link to="/about" className="text-danger mb-3 d-inline-block">
          ← Back to About
        </Link>

        <form className="card shadow-sm p-4 border-0 mx-auto" style={{ maxWidth: "700px" }}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name <span className="text-danger">*</span></label>
            <input className="form-control" placeholder="Your full name" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Discord <span className="text-danger">*</span></label>
            <input className="form-control" placeholder="username#1234 or @username" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Clark Email <span className="text-danger">*</span></label>
            <input className="form-control" placeholder="your.name@clarku.edu" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Year <span className="text-danger">*</span></label>
            {["Freshman", "Sophomore", "Junior", "Senior", "Grad Student"].map((year, i) => (
              <div key={i} className="form-check">
                <input className="form-check-input" type="radio" name="year" id={year} />
                <label className="form-check-label" htmlFor={year}>{year}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Tracks of Interest <span className="text-danger">*</span></label>
            {["Programming", "2D Art", "3D Art", "Design", "Production", "Audio", "Writing", "Other"].map((t, i) => (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" id={t} />
                <label className="form-check-label" htmlFor={t}>{t}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Other Commitments</label>
            <textarea className="form-control" rows="2" placeholder="Clubs, work, sports, etc." />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Prior Experience</label>
            <textarea className="form-control" rows="2" placeholder="Describe your involvement with IGDA or game dev at Clark." />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Why do you want to join IGDA? <span className="text-danger">*</span></label>
            <textarea className="form-control" rows="2" placeholder="Tell us what you hope to contribute." required />
          </div>

          <button className="btn btn-danger w-100 mt-3">Submit Application</button>
          <p className="text-center text-muted small mt-3">
            Questions? Reach out to a current E-Board member on Discord.
          </p>
        </form>
      </div>
    </>
  );
}

export default EBoardApplication;
