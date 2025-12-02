import React, { useState } from "react";
import "../css/GameExpoForm.css";
import GenericHeader from "../components/GenericHeader";
import { useNavigate, useSearchParams } from "react-router-dom";

function GameExpoForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exhibitorType = searchParams.get("type") || "unknown";

  const [formData, setFormData] = useState({
    email: "",
    boothNames: "",
    contact: "",
    showcaseTitle: "",
    description: "",
    links: "",
    equipment: "",
    shareTable: "",
    agree: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== "links") {
        setError("Please fill out all required fields.");
        return;
      }
    }

    if (!formData.agree) {
      setError("You must acknowledge the disclaimer before submitting.");
      return;
    }

    setError("");
    setSubmitted(true);

    // Later: replace this with MongoDB backend call
    console.log("Form submitted:", formData);
  };

  if (submitted) {
    return (
      <>
        <GenericHeader
          title="Game Expo Booth Application"
          gradientColors={["#550100", "#A11812", "#550100"]}
        />
        <div className="container text-center my-5">
          <h3 className="text-success">Thank you for your submission!</h3>
          <p>We'll review your application and contact you soon.</p>
          <button className="btn btn-outline-danger mt-3" onClick={() => navigate("/")}>
            Return Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <GenericHeader
        title="Game Expo Booth Application"
        subtitle="Fill out the form below to apply for a booth at the Clark University Game Expo."
        gradientColors={["#550100", "#A11812", "#550100"]}
      />

      <div className="container my-5 gameexpo-form">
        <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
          ← Back to Game Expo
        </button>

        <form className="card shadow-sm p-4 mx-auto" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Booth Names */}
          <div className="mb-3">
            <label className="form-label">Booth Exhibitor Names *</label>
            <input
              type="text"
              name="boothNames"
              className="form-control"
              placeholder="John Doe, Jane Smith, Alex Johnson"
              value={formData.boothNames}
              onChange={handleChange}
              required
            />
          </div>

          {/* Main Contact */}
          <div className="mb-3">
            <label className="form-label">Main Point of Contact *</label>
            <input
              type="text"
              name="contact"
              className="form-control"
              placeholder="John Doe"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          {/* Showcase Title */}
          <div className="mb-3">
            <label className="form-label">Showcase Title *</label>
            <input
              type="text"
              name="showcaseTitle"
              className="form-control"
              placeholder="My Awesome Game"
              value={formData.showcaseTitle}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Describe your game's genre, mechanics, target audience, and development tools..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Links */}
          <div className="mb-3">
            <label className="form-label">Relevant Links</label>
            <textarea
              name="links"
              className="form-control"
              placeholder="https://example.itch.io/my-game"
              rows="3"
              value={formData.links}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Equipment */}
          <div className="mb-3">
            <label className="form-label">
              Are you able to provide all necessary equipment to your booth? *
            </label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="equipYes"
                  name="equipment"
                  value="Yes"
                  className="form-check-input"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="equipYes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="equipNo"
                  name="equipment"
                  value="No"
                  className="form-check-input"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="equipNo">No</label>
              </div>
            </div>
          </div>

          {/* Share Table */}
          <div className="mb-3">
            <label className="form-label">
              If accepted, would you like to share a table with someone? *
            </label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="shareYes"
                  name="shareTable"
                  value="Yes"
                  className="form-check-input"
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="shareYes">
                  Yes, I'm willing to share a table
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="shareNo"
                  name="shareTable"
                  value="No"
                  className="form-check-input"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="shareNo">
                  No, I need a full table
                </label>
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              className="form-check-input"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="agree">
              I understand that due to limited booth availability, submission does not guarantee acceptance.
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-danger w-100 mt-3">
            Submit Application
          </button>

          <p className="text-center text-muted small mt-3">
            Applications close on <strong>November 15th, 2025</strong>
          </p>
        </form>
      </div>
    </>
  );
}

export default GameExpoForm;
