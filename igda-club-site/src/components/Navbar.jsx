import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/igda_clark_logo.png`}
                        alt="IGDA Logo"
                        width="40px"
                        max-width="40px"
                        height="40px"
                        className="me-2"
                    />
                    IGDA at Clark University
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/calendar">
                                Calendar
                            </Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#!"
                                id="eventsDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Events
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="eventsDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/events/game-jams">
                                        Game Jams
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/events/talks">
                                        Talks / Workshops
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/events/expo">
                                        Game Expo
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
