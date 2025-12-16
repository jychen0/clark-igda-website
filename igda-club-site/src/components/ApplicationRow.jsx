import { useState } from "react";

function ApplicationRow({ application }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="application-row">
      <div className="application-summary" onClick={() => setOpen(!open)}>
        <div>
          <strong>{application.name}</strong>
          <div className="muted">{application.email}</div>
        </div>
        <span>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="application-details">
          {Object.entries(application.responses).map(([q, a]) => (
            <div key={q} className="response">
              <strong>{q}</strong>
              <p>{a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationRow;
