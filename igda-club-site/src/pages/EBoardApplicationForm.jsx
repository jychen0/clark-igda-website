import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/FormPages.css";
import GenericHeader from "../components/GenericHeader";

function EBoardApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    discord: "",
    email: "",
    year: "",
    tracks: [],
    commitments: "",
    experience: "",
    motivation: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (value) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.includes(value)
        ? prev.tracks.filter(t => t !== value)
        : [...prev.tracks, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const responsePayload = {
      name: formData.name,
      email: formData.email,
      responses: {
        Discord: formData.discord,
        Year: formData.year,
        "Tracks of Interest": formData.tracks.join(", "),
        "Other Commitments": formData.commitments,
        "Prior Experience": formData.experience,
        "Why Join IGDA": formData.motivation,
      },
    };

    try {
      const res = await fetch(process.env.PUBLIC_URL + "/applications/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responsePayload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Submission failed. Please fill all required fields.");
        return;
      }

      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="card shadow-sm p-4 border-0 mx-auto" style={{ maxWidth: "700px" }}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name <span className="text-danger">*</span></label>
            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Discord <span className="text-danger">*</span></label>
            <input
              className="form-control"
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              placeholder="username#1234 or @username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Clark Email <span className="text-danger">*</span></label>
            <input
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.name@clarku.edu"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Year <span className="text-danger">*</span></label>
            {["Freshman", "Sophomore", "Junior", "Senior", "Grad Student"].map((year, i) => (
              <div key={i} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="year"
                  value={year}
                  checked={formData.year === year}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={year}>{year}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Tracks of Interest <span className="text-danger">*</span></label>
            {["Programming", "2D Art", "3D Art", "Design", "Production", "Audio", "Writing", "Other"].map((t, i) => (
              <div key={i} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.tracks.includes(t)}
                  onChange={() => handleCheckbox(t)}
                />
                <label className="form-check-label" htmlFor={t}>{t}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Other Commitments</label>
            <textarea
              className="form-control"
              name="commitments"
              value={formData.commitments}
              onChange={handleChange}
              rows="2"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Prior Experience</label>
            <textarea
              className="form-control"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="2"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Why do you want to join IGDA? <span className="text-danger">*</span></label>
            <textarea
              className="form-control"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows="2"
              required
            />
          </div>

          <button className="btn btn-danger w-100 mt-3" disabled={submitting}>{submitting ? "Submitting..." : "Submit Application"}</button>
          <p className="text-center text-muted small mt-3">
            Questions? Reach out to a current E-Board member on Discord.
          </p>
        </form>
      </div>
    </>
  );
}

export default EBoardApplicationForm;
