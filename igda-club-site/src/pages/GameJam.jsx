import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../css/GameJam.css";
import GenericHeader from "../components/GenericHeader";
import Jam from "../components/JamRegister/Jam";

function GameJam() {
    const [yearFilter, setYearFilter] = useState("All Years");
    const [jams, setJams] = useState([]);
    const [filteredJams, setFilteredJams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSubmission, setFilterSubmission] = useState("All Game Jams");
    const [filterAwards, setFilterAwards] = useState("All Games");
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
            filteredJams = filteredJams.filter((jam) => {
                const submissionMatch = jam.gameName?.toLowerCase().includes(lowerSearch);
                const devMatch = jam.developers?.toLowerCase().includes(lowerSearch);
                const nameMatch = jam.jamSubmission?.toLowerCase().includes(lowerSearch);
                return submissionMatch || devMatch || nameMatch;
            });
        }

        if (filterSubmission !== "All Game Jams") {
            filteredJams = filteredJams.filter((jam) => jam.gameName === filterSubmission);
        }
        if (yearFilter !== "All Years") {
            filteredJams = filteredJams.filter((jam) => jam.gameName.includes(yearFilter));
        }
        if (filterAwards !== "All Games") {
            filteredJams = filteredJams.filter((jam) => jam.awards[0] === filterAwards);
        }
        setFilteredJams(filteredJams);
    }, [searchTerm, filterSubmission, filterAwards, yearFilter, jams]);

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
                value={filterSubmission}
                onChange={(e) => setFilterSubmission(e.target.value)}
            >
                <option>All Game Jams</option>
                <option>2023 Revival Jam</option>
                <option>2023 Harvest Game Jam</option>
                <option>2023 Halloween Game Jam</option>
                <option>2023 December Dash Game Jam</option>
                <option>2024 January Game Jamboree</option>
                <option>2024 February Frenzy Game Jam</option>
                <option>2024 Harvest Game Jam</option>
                <option>2024 Halloween Game Jam</option>
                <option>2025 Winter Game Jam</option>
                <option>2025 February Frenzy Game Jam</option>
                <option>2025 March Madness Game Jam</option>
                <option>2025 Harvest Game Jam</option>
                <option>2025 Halloween Game Jam</option>
            </select>

          <select
            className="form-select w-auto"
            value={filterAwards}
            onChange={(e) => setFilterAwards(e.target.value)}
          >
              <option>All Games</option>
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
          {filteredJams.map((jam) => (
            <Jam event={jam} />
          ))}
        </div>
      </div>
    </>
  );
}

export default GameJam;
