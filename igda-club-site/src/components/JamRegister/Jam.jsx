import React from "react";

function Jam({ event, key }) {
    let theme;
    switch (event.jamSubmission) {
        case "2023 Revival Jam": theme = "E-Waste"; break;
        case "2023 Harvest Game Jam": theme = "Harvest"; break;
        case "2023 Halloween Game Jam": theme = "Enchant"; break;
        case "2023 December Dash Game Jam": theme = "Off The Wall"; break;
        case "2024 January Game Jamboree": theme = "Escape"; break;
        case "2024 February Frenzy Game Jam": theme = "Retro"; break;
        case "2024 Harvest Game Jam": theme = "It's Time to Wake Up"; break;
        case "2024 Halloween Game Jam": theme = "Break the Curse"; break;
        case "2025 Winter Game Jam": theme = "Meltdown"; break;
        case "2025 February Frenzy Game Jam": theme = "Out of Power"; break;
        case "2025 March Madness Game Jam": theme = "Break Through"; break;
        case "2025 Harvest Game Jam": theme = "Look Out!"; break;
        case "2025 Halloween Game Jam": theme = "Under Control"; break;
        default: theme = "";
    }

    return (
                <div key={key} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm jam-entry h-100">
                        <div className="card-img-top">
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/jam_posters/${event.image}`}
                                alt={event.image}
                                className="img-fluid object-fit-cover"
                                style={{ maxHeight: 300 }}
                            />
                        </div>
                        <div className="card-body">
                            <span className="badge bg-danger mb-2">🏆 {event.awards} Winner</span>
                            <h6 className="fw-bold">{event.gameName}</h6>
                            <p className="small text-muted mb-1">{event.jamSubmission}</p>
                            <p className="small text-muted mb-1">Theme: {theme}</p>
                            <p className="small text-muted mb-3">{event.developers}</p>
                        </div>
                    </div>
                </div>
    );
}

export default Jam;