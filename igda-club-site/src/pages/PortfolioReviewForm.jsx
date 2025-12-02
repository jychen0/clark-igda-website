import React, { useState } from "react";
import "../css/PortfolioReviewForm.css";
import GenericHeader from "../components/GenericHeader";
import { useNavigate } from "react-router-dom";

function PortfolioReviewForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    discord: "",
    program: "",
    resumeHelp: "",
    portfolioLink: "",
    portfolioTypes: [],
    timeslots: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "portfolioTypes") {
      setFormData((prev) => ({
        ...prev,
        portfolioTypes: checked
          ? [...prev.portfolioTypes, value]
          : prev.portfolioTypes.filter((t) => t !== value),
      }));
    } else if (type === "checkbox" && name === "timeslots") {
      setFormData((prev) => ({
        ...prev,
        timeslots: checked
          ? [...prev.timeslots, value]
          : prev.timeslots.filter((t) => t !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (
      !formData.name ||
      !formData.discord ||
      !formData.program ||
      !formData.resumeHelp ||
      formData.portfolioTypes.length === 0 ||
      formData.timeslots.length === 0
    ) {
      setError("Please fill out all required fields before submitting.");
      return;
    }

    setError("");
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <GenericHeader
          title="Portfolio Review Registration"
          gradientColors={["#550100", "#A11812", "#550100"]}
        />
        <div className="container text-center my-5">
          <h3 className="text-success">Thank you for registering!</h3>
          <p>We’ll contact you soon with your assigned review time.</p>
          <button
            className="btn btn-outline-danger mt-3"
            onClick={() => navigate("/")}
          >
            Return Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <GenericHeader
        title="Portfolio Review Sign Up"
        subtitle="Register for a one-on-one portfolio review with industry professionals at the Game Expo."
        gradientColors={["#550100", "#A11812", "#550100"]}
      />

      <div className="container my-5 portfolio-form">
        <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
          ← Back to Game Expo
        </button>

        <div className="alert alert-danger">
          <strong>Clark Students Only:</strong> Joining our Discord server is
          required for portfolio reviews.
          <div className="mt-2">
            <a
              href="https://discord.gg/example"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light btn-sm"
            >
              Join Clark IGDA Discord
            </a>
          </div>
        </div>

        <form className="card shadow-sm p-4 mx-auto" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Preferred Name */}
          <div className="mb-3">
            <label className="form-label">Preferred Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Discord */}
          <div className="mb-3">
            <label className="form-label">Discord Username *</label>
            <input
              type="text"
              name="discord"
              className="form-control"
              placeholder="@username1234 or @username"
              value={formData.discord}
              onChange={handleChange}
              required
            />
          </div>

          {/* Program */}
          <div className="mb-3">
            <label className="form-label">
              What program are you in? (Clark students only) *
            </label>
            <select
              name="program"
              className="form-select"
              value={formData.program}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option>Undergrad Interactive Media: Game Design & Development</option>
              <option>Graduate Interactive Media: Game Design & Development</option>
              <option>Computer Science</option>
              <option>Data Science</option>
              <option>Other</option>
            </select>
          </div>

          {/* Resume Help */}
          <div className="mb-3">
            <label className="form-label">
              Are you looking for help to write a resume/make a portfolio? *
            </label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="resumeHelp"
                  value="Yes"
                  onChange={handleChange}
                  className="form-check-input"
                  required
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="resumeHelp"
                  value="No"
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
          </div>

          {/* Portfolio Link */}
          <div className="mb-3">
            <label className="form-label">
              If you have a portfolio or resume, could you share the link here?
            </label>
            <input
              type="url"
              name="portfolioLink"
              className="form-control"
              placeholder="https://yourportfolio.com or https://drive.google.com/..."
              value={formData.portfolioLink}
              onChange={handleChange}
            />
          </div>

          {/* Portfolio Types */}
          <div className="mb-3">
            <label className="form-label">Portfolio Type(s) *</label>
            <small className="text-muted d-block">
              Select all that apply
            </small>
            <div className="row">
              {[
                "Production",
                "Audio",
                "Programming",
                "2D Art",
                "3D Art",
                "Writing",
                "Design",
                "UI / UX",
                "Other",
              ].map((type) => (
                <div className="col-md-4" key={type}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="portfolioTypes"
                      value={type}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">{type}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mb-3 timeslot-box p-3 rounded">
            <label className="form-label">
              Please select what time slot(s) you are available for your review *
            </label>
            <small className="text-muted d-block mb-2">
              You will only receive one time slot. Select all times you are
              available.
            </small>
            <div className="d-flex flex-wrap gap-3">
              {[
                "2:00",
                "2:20",
                "2:40",
                "3:00",
                "3:20",
                "3:40",
                "4:00",
                "4:20",
                "4:40",
                "5:00",
                "5:20",
                "5:40",
              ].map((time) => (
                <div className="form-check" key={time}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="timeslots"
                    value={time}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{time}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-danger w-100 mt-3">
            Submit Registration
          </button>

          <p className="text-center text-muted small mt-3">
            Registration closes on <strong>April 15th, 2025</strong>
          </p>
        </form>
      </div>
    </>
  );
}

export default PortfolioReviewForm;
