import React from "react";

function Jam({ event }) {
    let theme;
    let year;
    let color;
    //idk when this happened but gameName & jamSubmission got mixed up
    switch (event.gameName) {
        case "2023 Revival Jam": theme = "E-Waste"; year = 2023; color = '#4f698f'; break;
        case "2023 Harvest Game Jam": theme = "Harvest"; year = 2023; color = '#cf855d'; break;
        case "2023 Halloween Game Jam": theme = "Enchant"; year = 2023; color = '#cf855d'; break;
        case "2023 December Dash Game Jam": theme = "Off The Wall"; year = 2023; color = '#6d5f94'; break;
        case "2024 January Game Jamboree": theme = "Escape"; year = 2024; color = '#DF946C'; break;
        case "2024 February Frenzy Game Jam": theme = "Retro"; year = 2024; color = '#e0adbb'; break;
        case "2024 Harvest Game Jam": theme = "It's Time to Wake Up"; year = 2024; color = '#6E9770'; break;
        case "2024 Halloween Game Jam": theme = "Break the Curse"; year = 2024; color = '#FFB05C'; break;
        case "2025 Winter Game Jam": theme = "Meltdown"; year = 2025; color = '#93c9c6'; break;
        case "2025 February Frenzy Game Jam": theme = "Out of Power"; year = 2025; color = '#f5ec69'; break;
        case "2025 March Madness Game Jam": theme = "Break Through"; year = 2025; color = '#E3BFE8'; break;
        case "2025 Harvest Game Jam": theme = "Look Out!"; year = 2025; color = '#855434'; break;
        case "2025 Halloween Game Jam": theme = "Under Control"; year = 2025; color = '#d68b51'; break;
        default: theme = ""; year = 2026; color = '#FFFFFF'; break;
    }

    let prize = !!event.awards[0] ? "🏆 " + event.awards[0] + " Winner" : "";

    return (
                <div className="col-md-3 col-lg-3 mb-4">
                    <div className="card shadow-sm jam-entry h-100" style={{ backgroundColor: color }}>
                        <div className="card-img-top">
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/jam_posters/${event.image}`}
                                alt={event.image}
                                className="img-fluid object-fit-cover"
                                style={{ width: 400, maxHeight: 300 }}
                            />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <span className="badge bg-danger mb-2">{prize}</span>
                            <h6 className="fw-bold">{event.jamSubmission}</h6>
                            <p className="small text-muted mb-1">{event.gameName}</p>
                            <p className="small text-muted mb-1">Theme: {theme}</p>
                            <p className="small text-muted mb-3">{event.developers}</p>
                            <ul id="myList">
                                {event.developers.map((dev, index) => (
                                    <li key={index}>{dev}</li>
                                ))}
                            </ul>
                            <a href={event.itchLink} className="btn btn btn-dark mt-auto">
                                Go to itch page: 
                            </a>
                        </div>
                    </div>
                </div>
    );
}

export default Jam;