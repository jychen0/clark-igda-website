import React from "react";

function Jam({ event }) {
    let theme;
    let year;
    let color;
    let jamLink;
    //idk when this happened but gameName & jamSubmission got mixed up
    switch (event.gameName) {
        case "2023 Revival Jam": theme = "E-Waste"; year = 2023; color = '#1C448E'; jamLink = 'https://itch.io/jam/igda-harvest-jam'; break;
        case "2023 Harvest Game Jam": theme = "Harvest"; year = 2023; color = '#E9C46A'; jamLink = 'https://itch.io/jam/igda-harvest-jam'; break;
        case "2023 Halloween Game Jam": theme = "Enchant"; year = 2023; color = '#EB8B47'; jamLink = 'https://itch.io/jam/igda-clark-halloween-game-jam-2023'; break;
        case "2023 December Dash Game Jam": theme = "Off The Wall"; year = 2023; color = '#9298DD'; jamLink = 'https://itch.io/jam/december-dash'; break;
        case "2024 January Game Jamboree": theme = "Escape"; year = 2024; color = '#83B5D1'; jamLink = 'https://itch.io/jam/jamboree'; break;
        case "2024 February Frenzy Game Jam": theme = "Retro"; year = 2024; color = '#C05D73'; jamLink = 'https://itch.io/jam/february-frenzy'; break;
        case "2024 Harvest Game Jam": theme = "It's Time to Wake Up"; year = 2024; color = '#E9C46A'; jamLink = 'https://itch.io/jam/2024-harvest-game-jam'; break;
        case "2024 Halloween Game Jam": theme = "Break the Curse"; year = 2024; color = '#EB8B47'; jamLink = 'https://itch.io/jam/2024-igda-clark-halloween-game-jam'; break;
        case "2025 Winter Game Jam": theme = "Meltdown"; year = 2025; color = '#83B5D1'; jamLink = 'https://itch.io/jam/2025-clark-january-game-jam'; break;
        case "2025 February Frenzy Game Jam": theme = "Out of Power"; year = 2025; color = '#C05D73'; jamLink = 'https://itch.io/jam/2025-igda-clark-february-frenzy-game-jam'; break;
        case "2025 March Madness Game Jam": theme = "Break Through"; year = 2025; color = '#B5BFA1'; jamLink = 'https://itch.io/jam/igda-march-madness-game-jam'; break;
        case "2025 Harvest Game Jam": theme = "Look Out!"; year = 2025; color = '#E9C46A'; jamLink = 'https://itch.io/jam/2025-igda-clark-harvest-game-jam'; break;
        case "2025 Halloween Game Jam": theme = "Under Control"; year = 2025; color = '#EB8B47'; jamLink = 'https://itch.io/jam/2025-igda-clark-halloween-game-jam'; break;
        default: theme = ""; year = 2026; color = '#FFFFFF'; jamLink = ''; break;
    }

    let prize = !!event.awards[0] ? "🏆 " + event.awards[0] + "" : "";

    return (
                <div className="col-md-4 col-lg-4 mb-4">
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
                            <h4 className="fw-bold" style={{textAlign: 'center'}}>{event.jamSubmission}</h4>
                            <span className="badge bg-danger mb-2">
                                {prize}
                            </span>
                            <a href={jamLink} style={{textDecoration: 'none'}}
                               target="_blank" rel="noopener noreferrer">
                                <p className="small text-muted mb-1">{event.gameName} ⟶</p>
                            </a>
                            <p className="small text-muted mb-1">Theme: {theme}</p>
                            <ol id="myList" style={{listStyleType: '1'}}>
                                {event.developers.map((dev, index) => (
                                    <li key={index}>{dev}</li>
                                ))}
                            </ol>
                            <a href={event.itchLink}
                               target="_blank" rel="noopener noreferrer"
                               className="btn btn btn-dark mt-auto">
                                Go to Itch.io page ⟶
                            </a>
                        </div>
                    </div>
                </div>
    );
}

export default Jam;