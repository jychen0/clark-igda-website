import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/GameJam.css";
import GenericHeader from "../components/GenericHeader";

function GameJam() {
  const [yearFilter, setYearFilter] = useState("All Years");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const jams = [
    {
      title: "Fall 2024 Game Jam",
      theme: "Chaos & Order",
      date: "October 12-14, 2024",
      category: "Best Overall",
      winner: "Balance Breaker",
      team: "Team Entropy",
      description:
        "A puzzle platformer where you switch between chaotic and ordered dimensions to solve challenges.",
    },
    {
      title: "Fall 2024 Game Jam",
      theme: "Chaos & Order",
      date: "October 12-14, 2024",
      category: "Best Art",
      winner: "Pixel Pandemonium",
      team: "The Glitch Squad",
      description:
        "A visually stunning arcade game featuring hand-drawn chaotic creatures.",
    },
    {
      title: "Spring 2024 Game Jam",
      theme: "Growth",
      date: "March 8-10, 2024",
      category: "Best Overall",
      winner: "Seedling",
      team: "Green Thumbs",
      description:
        "A peaceful gardening sim where you cultivate magical plants that affect the game world.",
    },
    {
      title: "Spring 2024 Game Jam",
      theme: "Growth",
      date: "March 8-10, 2024",
      category: "Best Gameplay",
      winner: "Overgrown",
      team: "Code Vines",
      description:
        "A strategy game where plants grow in real-time and you must manage their expansion.",
    },
    {
      title: "Fall 2023 Game Jam",
      theme: "Time Loop",
      date: "November 3-5, 2023",
      category: "Best Overall",
      winner: "Groundhog Hour",
      team: "Temporal Coders",
      description:
        "A detective game where you relive the same hour to solve a mystery.",
    },
    {
      title: "Fall 2023 Game Jam",
      theme: "Time Loop",
      date: "November 3-5, 2023",
      category: "Best Audio",
      winner: "Loop Symphony",
      team: "Sound Waves",
      description:
        "A rhythm game where each loop adds new musical layers.",
    },
    {
      title: "Spring 2023 Game Jam",
      theme: "Connection",
      date: "April 14-16, 2023",
      category: "Best Overall",
      winner: "Link & Sync",
      team: "The Networkers",
      description:
        "A cooperative puzzle game about connecting circuits to power up systems.",
    },
    {
      title: "Spring 2023 Game Jam",
      theme: "Connection",
      date: "April 14-16, 2023",
      category: "Most Creative",
      winner: "Social Nodes",
      team: "Graph Theory",
      description:
        "A narrative experience about building relationships in a digital world.",
    },
  ];

  const filtered = jams.filter(
    (j) =>
      (yearFilter === "All Years" || j.date.includes(yearFilter)) &&
      (categoryFilter === "All Categories" || j.category === categoryFilter)
  );

  return (
    <>
      <GenericHeader
        title="Game Jams"
        subtitle="48 hours of creativity, collaboration, and caffeine. Join us for our next game jam and bring your ideas to life!"
        gradientColors={["#550100", "#A11812", "#550100"]}
      />

      <div className="container my-5 gamejam-page">
        <div className="text-center mb-5">
          <div className="card shadow-sm border-0 jam-card mx-auto">
            <div className="card-body">
              <h5 className="text-danger">Next Game Jam</h5>
              <h4 className="fw-bold">Spring 2025 Game Jam</h4>
              <p className="text-muted mb-1">Theme: TBA</p>
              <p className="text-muted">
                March 14–16, 2025 • 5:00 PM – 5:00 PM
              </p>
              <p className="text-muted">
                Location: Clark University Center for Media Arts, Computing, and Design (MACD)
              </p>
              <Link to="/events/game-jams/register" className="btn btn-danger mt-3">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>

        <h4 className="text-center mb-4">Previous Game Jams</h4>
        <div className="filters d-flex justify-content-center gap-3 mb-4">
          <select
            className="form-select w-auto"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option>All Years</option>
            <option>2024</option>
            <option>2023</option>
          </select>

          <select
            className="form-select w-auto"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All Categories</option>
            <option>Best Overall</option>
            <option>Best Art</option>
            <option>Best Gameplay</option>
            <option>Best Audio</option>
            <option>Most Creative</option>
          </select>
        </div>

        <div className="row">
          {filtered.map((jam, i) => (
            <div key={i} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm jam-entry h-100">
                <div className="card-body">
                  <span className="badge bg-danger mb-2">{jam.category}</span>
                  <h6 className="fw-bold">{jam.title}</h6>
                  <p className="small text-muted mb-1">Theme: {jam.theme}</p>
                  <p className="small text-muted mb-3">{jam.date}</p>
                  <p className="fw-semibold text-danger mb-1">
                    🏆 Winner: {jam.winner}
                  </p>
                  <p className="small text-muted mb-2">{jam.team}</p>
                  <p className="small">{jam.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GameJam;
