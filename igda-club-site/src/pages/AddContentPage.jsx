import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddContentForm from "../components/AddContentForm";
import "../css/AdminPages.css";

export default function AddContentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = !!location.state?.item;
  const type = location.state?.type || "event";

  useEffect(() => {
  async function checkAuth() {
    try {
      const res = await fetch(process.env.PUBLIC_URL+'/admin/check', {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
    } catch (err) {
      navigate("/admin"); 
    }
  }
  checkAuth();
}, [navigate]);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>{isEdit ? "Edit" : "Add"} {type === "event" ? "Event" : "Announcement"}</h1>
          <p>Clark University IGDA Admin Portal</p>
        </div>
        <button className="logout-btn" onClick={() => navigate("/admindashboard")}>
          ← Back
        </button>
      </header>

      <section className="section add-content">
        <AddContentForm editData={location.state?.item} editType={type} />
      </section>
    </div>
  );
}
