import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationRow from "../components/ApplicationRow";

function EBoardApplications() {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("/admin/check", { credentials: "include" })
      .then(res => {
        if (!res.ok) navigate("/admin");
      });
  }, [navigate]);

  useEffect(() => {
    fetch("/admin/applications", { credentials: "include" })
      .then(res => res.json())
      .then(data => setApps(data.data || []));
  }, []);

  return (
    <div className="admin-page">
      <h1>E-Board Applications</h1>

      <div className="applications-list">
        {apps.map(app => (
          <ApplicationRow key={app._id} application={app} />
        ))}
      </div>
    </div>
  );
}

export default EBoardApplications;
