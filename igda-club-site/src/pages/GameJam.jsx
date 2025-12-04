import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../css/GameJam.css";
import GenericHeader from "../components/GenericHeader";
import Jam from "../components/JamRegister/Jam";

function GameJam() {
    const [yearFilter, setYearFilter] = useState("All Years");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");

    // const jams = [
    // {
    //   title: "2023 Harvest Game Jam",
    //   theme: "Chaos & Order",
    //   date: "October 12-14, 2024",
    //   category: "Best Overall",
    //   winner: "Balance Breaker",
    //   team: "Team Entropy",
    //   description:
    //     "A puzzle platformer where you switch between chaotic and ordered dimensions to solve challenges.",
    // },
    // ];

    const [jams, setJams] = useState([]);
    const [filteredJams, setFilteredJams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSubmission, setFilterSubmission] = useState("All");
    const [filterAwards, setFilterAwards] = useState("All");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJams = async () => {
            try {
                const res = await fetch("/get-all-jams");
                if (!res.ok) throw new Error("Failed fetching Jams");
                const data = await res.json();
                if (data.message === "success") {
                    setJams(data.data);
                    setFilteredJams(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchJams();
    }, []);

    useEffect(() => {
        let filteredJams = jams;

        if (searchTerm.trim()) {
            const lowerSearch = searchTerm.toLowerCase();
            filteredJams = filteredJams.filter((event) => {
                const nameMatch = event.eventName?.toLowerCase().includes(lowerSearch);
                const overviewMatch = event.overview?.toLowerCase().includes(lowerSearch);
                const locationMatch = event.location?.location?.toLowerCase().includes(lowerSearch);
                return nameMatch || overviewMatch || locationMatch;
            });
        }

        if (filterSubmission !== "All") {
            filteredJams = filteredJams.filter((jam) => jam.jamSubmission === filterSubmission);
        }

        if (filterAwards !== "All") {
            filteredJams = filteredJams.filter((jam) => !!jam.awards);
        }
        if (yearFilter !== "All Years") {
            filteredJams = filteredJams.filter((jam) => jam.date.includes(yearFilter));
        }
        if (categoryFilter !== "All Categories") {
            filteredJams = filteredJams.filter((jam) => jam.category === categoryFilter);
        }


        setFilteredJams(filteredJams);
    }, [searchTerm, filterSubmission, filterAwards, yearFilter, categoryFilter, jams]);

  // const filtered = jams.filter(
  //   (j) =>
  //     (yearFilter === "All Years" || j.date.includes(yearFilter)) &&
  //     (categoryFilter === "All Categories" || j.category === categoryFilter)
  // );

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
              <h4 className="fw-bold">2025 Winter Game Jam</h4>
              <p className="text-muted mb-1">Theme: TBA</p>
              <p className="text-muted">
                January 30th-February 1st, 2025 • 5:00 PM – 5:00 PM
              </p>
              <p className="text-muted">
                Location: Clark University Center for Media Arts, Computing, and Design (CMACD) Second Floor Lobby
              </p>
              <Link to="/events/game-jams/register" className="btn btn-danger mt-3">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>

        <h4 className="text-center mb-4">Previous Game Jam Entries</h4>
        <div className="filters d-flex justify-content-center gap-3 mb-4">
          <select
            className="form-select w-auto"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option>All Years</option>
              {/*<option>2026</option>*/}
              <option>2025</option>
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
              <option>Worst Overall</option>
              <option>Best Visuals</option>
              <option>Best Art Direction</option>
              <option>Best Mechanics</option>
              <option>Most Unique Gameplay Loop</option>
              <option>Most Unique Mechanics</option>
              <option>Most Out of The Box</option>
          </select>
        </div>

        <div className="row">
          {filteredJams.map((jam, i) => (
            <Jam event={jam} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default GameJam;
