import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../css/GameJam.css";
import GenericHeader from "../components/GenericHeader";
import Jam from "../components/JamRegister/Jam";
import Accordion from 'react-bootstrap/Accordion';

function GameJam() {
    const [jams, setJams] = useState([]);
    const [filteredJams, setFilteredJams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [error, setError] = useState(null);

    // Track active filters using 2D array
    const [activeFilters, setActiveFilters] = useState([
        ['2023', '2024', '2025'],
        ["2023 Revival Jam", "2023 Harvest Game Jam", "2023 Halloween Game Jam", "2023 December Dash Game Jam",
            "2024 January Game Jamboree", "2024 February Frenzy Game Jam", "2024 Harvest Game Jam", "2024 Halloween Game Jam",
            "2025 Winter Game Jam", "2025 February Frenzy Game Jam", "2025 March Madness Game Jam", "2025 Harvest Game Jam", "2025 Halloween Game Jam"
        ],
        ["Best Overall",
            "Best Visuals", "Best Art Direction",
            "Best Mechanics", "Most Unique Mechanics", "Most Unique Gameplay Loop",
            "Most Out of The Box",
            "None"
        ],
    ]);

    // Filter control logic
    const toggleFilter = (filterCondition, idx) => {
        if (activeFilters[idx].includes(filterCondition)) {
            //setActiveFilters(activeFilters.filter((t) => t !== filterCondition));
            setActiveFilters(Object.assign([...activeFilters], { [idx]: activeFilters[idx].filter((t) => t !== filterCondition) }))
        } else {
            setActiveFilters(Object.assign([...activeFilters], { [idx]: [...activeFilters[idx], filterCondition] }));
        }
        console.log(activeFilters)
    };

    const selectAll = (key) => {
        switch (key) {
            case 0:
                setActiveFilters(Object.assign([...activeFilters], { [key]: ['2023', '2024', '2025'] }));
                break;
            case 1:
                setActiveFilters(Object.assign([...activeFilters], { [key]:
                        ["2023 Revival Jam", "2023 Harvest Game Jam", "2023 Halloween Game Jam", "2023 December Dash Game Jam",
                        "2024 January Game Jamboree", "2024 February Frenzy Game Jam", "2024 Harvest Game Jam", "2024 Halloween Game Jam",
                        "2025 Winter Game Jam", "2025 February Frenzy Game Jam", "2025 March Madness Game Jam", "2025 Harvest Game Jam", "2025 Halloween Game Jam"
                    ] }));
                break;
            case 2:
                setActiveFilters(Object.assign([...activeFilters], { [key]:
                        ["Best Overall",
                        "Best Visuals", "Best Art Direction",
                        "Best Mechanics", "Most Unique Mechanics", "Most Unique Gameplay Loop",
                        "Most Out of The Box",
                        "None"
                    ] }));
                break;
        }
    };

    const clearAll = (key) => {
        switch (key) {
            case 0:setActiveFilters(Object.assign([...activeFilters], { [key]: [] }));break;
            case 1:setActiveFilters(Object.assign([...activeFilters], { [key]: [] }));break;
            case 2:setActiveFilters(Object.assign([...activeFilters], { [key]: [] }));break;
        }
    };

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value);
    }

    useEffect(() => {
        let filteredJams = jams;
        filteredJams = filteredJams.filter((jam) => activeFilters[0].includes(jam.gameName.split(" ", 1)[0]));
        filteredJams = filteredJams.filter((jam) => activeFilters[1].includes(jam.gameName));
        filteredJams = filteredJams.filter((jam) => jam.awards[0] !== "" ? activeFilters[2].includes(jam.awards[0]) : activeFilters[2].includes("None"));

        if (searchTerm.trim()) {
            const lowerSearch = searchTerm.toLowerCase();
            filteredJams = filteredJams.filter((jam) => {
                const submissionMatch = jam.gameName?.toLowerCase().includes(lowerSearch);
                const devMatch = jam.developers?.map(dev => dev.toLowerCase().includes(lowerSearch)).includes(true);
                const nameMatch = jam.jamSubmission?.toLowerCase().includes(lowerSearch);
                return submissionMatch || nameMatch || devMatch;
            });
        }
        setFilteredJams(filteredJams);
    }, [searchTerm, activeFilters, jams]);

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
              <h4 className="fw-bold">
                  <a href={'https://itch.io/jam/2025-igda-clark-halloween-game-jam'}
                     style={{textDecoration: 'none', color: 'black'}}
                     target="_blank" rel="noopener noreferrer">
                      2025 Winter Game Jam ⟶
                  </a>
              </h4>
              <p className="text-muted mb-1">Theme: TBA</p>
              <p className="text-muted">
                January 30th-February 1st, 2025 • 5:00 PM – 5:00 PM
              </p>
              <p className="text-muted">
                  <a href={'https://www.google.com/maps/place/Clark+University+Center+for+Media+Arts,+Computing,+and+Design/@42.2520511,-71.8234891,17z/data=!3m1!4b1!4m6!3m5!1s0x89e407453d81d4db:0xe52ccf58849345d1!8m2!3d42.2520472!4d-71.8209142!16s%2Fg%2F11vf1slnz3'}
                     target="_blank" rel="noopener noreferrer"
                     className="btn btn btn-dark mt-auto">
                      Location: Clark University Center for Media Arts, Computing, and Design (CMACD) Second Floor Lobby
                  </a>
              </p>
              <Link to="/events/game-jams/register" className="btn btn-danger mt-3">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>

          <h2 className="text-center mb-4">Previous Game Jam Entries</h2>

          {/* Filters */}
          <div className="row ">
              <div className="col-md-3 col-lg-3 mb-4" id="accordion">
                  <div className="form-group">
                      <textarea className="form-control" id="exampleFormControlTextarea1"
                                rows="1" maxLength="256" placeholder="Search" style={{resize: "none"}}
                                onChange={handleSearch}

                      ></textarea>
                  </div>
                  <Accordion defaultActiveKey={['0']} alwaysOpen>
                      <Accordion.Item eventKey="0">
                          <Accordion.Header>Year</Accordion.Header>
                          <Accordion.Body>
                              <div>
                                  <button className="btn btn-outline-danger btn-sm"
                                          style={{marginRight: 5, marginBottom: 8}} onClick={() => selectAll(0)}>
                                      Select All
                                  </button>
                                  <button className="btn btn-outline-secondary btn-sm"
                                          style={{marginLeft: 5, marginBottom: 8}} onClick={() => clearAll(0)}>
                                      Clear All
                                  </button>
                              </div>
                              <ul className="list-unstyled">
                                  {["2023", "2024", "2025"
                                  ].map((type) => (
                                      <li key={type} className="mb-2">
                                          <label>
                                              <input
                                                  type="checkbox"
                                                  checked={activeFilters[0].includes(type)}
                                                  onChange={() => toggleFilter(type, 0)}
                                                  className="me-2"
                                              />
                                              {type}
                                          </label>
                                      </li>
                                  ))}
                              </ul>
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                          <Accordion.Header>Game Jams</Accordion.Header>
                          <Accordion.Body>
                              <div>
                                  <button className="btn btn-outline-danger btn-sm"
                                          style={{marginRight: 5, marginBottom: 8}} onClick={() => selectAll(1)}>
                                      Select All
                                  </button>
                                  <button className="btn btn-outline-secondary btn-sm"
                                          style={{marginLeft: 5, marginBottom: 8}} onClick={() => clearAll(1)}>
                                      Clear All
                                  </button>
                              </div>
                              <ul className="list-unstyled">
                                  {["2023 Revival Jam", "2023 Harvest Game Jam", "2023 Halloween Game Jam", "2023 December Dash Game Jam",
                                      "2024 January Game Jamboree", "2024 February Frenzy Game Jam", "2024 Harvest Game Jam", "2024 Halloween Game Jam",
                                      "2025 Winter Game Jam", "2025 February Frenzy Game Jam", "2025 March Madness Game Jam", "2025 Harvest Game Jam", "2025 Halloween Game Jam"
                                  ].map((type) => (
                                      <li key={type} className="mb-2">
                                          <label>
                                              <input
                                                  type="checkbox"
                                                  checked={activeFilters[1].includes(type)}
                                                  onChange={() => toggleFilter(type, 1)}
                                                  className="me-2"
                                              />
                                              {type}
                                          </label>
                                      </li>
                                  ))}
                              </ul>
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                          <Accordion.Header>Awards</Accordion.Header>
                          <Accordion.Body>
                              <div>
                                  <button className="btn btn-outline-danger btn-sm"
                                          style={{marginRight: 5, marginBottom: 8}} onClick={() => selectAll(2)}>
                                      Select All
                                  </button>
                                  <button className="btn btn-outline-secondary btn-sm"
                                          style={{marginLeft: 5, marginBottom: 8}} onClick={() => clearAll(2)}>
                                      Clear All
                                  </button>
                              </div>
                              <ul className="list-unstyled">
                                  {["Best Overall",
                                      "Best Visuals", "Best Art Direction",
                                      "Best Mechanics", "Most Unique Mechanics", "Most Unique Gameplay Loop",
                                      "Most Out of The Box",
                                      "None"
                                  ].map((type) => (
                                      <li key={type} className="mb-2">
                                          <label>
                                              <input
                                                  type="checkbox"
                                                  checked={activeFilters[2].includes(type)}
                                                  onChange={() => toggleFilter(type, 2)}
                                                  className="me-2"
                                              />
                                              {type}
                                          </label>
                                      </li>
                                  ))}
                              </ul>
                          </Accordion.Body>
                      </Accordion.Item>
                  </Accordion>
              </div>

              {/*<div className="filters d-flex justify-content-center gap-3 mb-4">*/}
              {/*  <select*/}
              {/*    className="form-select w-auto"*/}
              {/*    value={yearFilter}*/}
              {/*    onChange={(e) => setYearFilter(e.target.value)}*/}
              {/*  >*/}
              {/*    <option>All Years</option>*/}
              {/*      /!*<option>2026</option>*!/*/}
              {/*      <option>2025</option>*/}
              {/*    <option>2024</option>*/}
              {/*    <option>2023</option>*/}
              {/*  </select>*/}

              {/*    <select*/}
              {/*        className="form-select w-auto"*/}
              {/*        value={filterSubmission}*/}
              {/*        onChange={(e) => setFilterSubmission(e.target.value)}*/}
              {/*    >*/}
              {/*        <option>All Game Jams</option>*/}
              {/*        <option>2023 Revival Jam</option>*/}
              {/*        <option>2023 Harvest Game Jam</option>*/}
              {/*        <option>2023 Halloween Game Jam</option>*/}
              {/*        <option>2023 December Dash Game Jam</option>*/}
              {/*        <option>2024 January Game Jamboree</option>*/}
              {/*        <option>2024 February Frenzy Game Jam</option>*/}
              {/*        <option>2024 Harvest Game Jam</option>*/}
              {/*        <option>2024 Halloween Game Jam</option>*/}
              {/*        <option>2025 Winter Game Jam</option>*/}
              {/*        <option>2025 February Frenzy Game Jam</option>*/}
              {/*        <option>2025 March Madness Game Jam</option>*/}
              {/*        <option>2025 Harvest Game Jam</option>*/}
              {/*        <option>2025 Halloween Game Jam</option>*/}
              {/*    </select>*/}

              {/*  <select*/}
              {/*    className="form-select w-auto"*/}
              {/*    value={filterAwards}*/}
              {/*    onChange={(e) => setFilterAwards(e.target.value)}*/}
              {/*  >*/}
              {/*      <option>All Games</option>*/}
              {/*      <option>Best Overall</option>*/}
              {/*      <option>Worst Overall</option>*/}
              {/*      <option>Best Visuals</option>*/}
              {/*      <option>Best Art Direction</option>*/}
              {/*      <option>Best Mechanics</option>*/}
              {/*      <option>Most Unique Gameplay Loop</option>*/}
              {/*      <option>Most Unique Mechanics</option>*/}
              {/*      <option>Most Out of The Box</option>*/}
              {/*  </select>*/}
              {/*</div>*/}

              <div className="col-md-9 col-lg-9 mb-4">
                  <div className="row">
                      {filteredJams.map((jam) => (
                          <Jam event={jam}/>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}

export default GameJam;
