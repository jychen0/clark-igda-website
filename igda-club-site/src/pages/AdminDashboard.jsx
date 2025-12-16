import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminPages.css";
import EBoardMember from "../components/EBoardMember";

function AdminDashboard() {
    const navigate = useNavigate();
    const [eboard, setEboard] = useState([]);
    const [applicationsOpen, setApplicationsOpen] = useState(true);


    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/admin/check', { credentials: "include" })
            .then((res) => {
                if (!res.ok) {
                    navigate("/admin");
                }
            })
            .catch(() => navigate("/admin"));
    }, [navigate]);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/get-all-eboard')
            .then((res) => res.json())
            .then((data) => setEboard(data.data || []))
            .catch(() => setEboard([]));
    }, []);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/applications/status")
            .then(res => res.json())
            .then(data => setApplicationsOpen(data.open));
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch(process.env.PUBLIC_URL + '/admin/logout', {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                navigate("/");
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    const handleAddMember = async () => {
        const newMember = {
            name: "IGDA E-Board Member",
            position: "E-Board Member",
            image: "",
        };
        await fetch(process.env.PUBLIC_URL + '/admin/add-eboard', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMember),
        });
        const res = await fetch(process.env.PUBLIC_URL + '/get-all-eboard');
        const data = await res.json();
        setEboard(data.data);
    };

    const handleSaveMember = async (updatedMember) => {
        await fetch(`${process.env.PUBLIC_URL}/admin/edit-eboard/${updatedMember._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMember),
        });
        const res = await fetch(process.env.PUBLIC_URL + '/get-all-eboard');
        const data = await res.json();
        setEboard(data.data);
    };

    const handleRemoveMember = async (id) => {
        await fetch(`${process.env.PUBLIC_URL}/admin/delete-eboard/${id}`, {
            method: "DELETE",
        });
        const res = await fetch(process.env.PUBLIC_URL + '/get-all-eboard');
        const data = await res.json();
        setEboard(data.data);
    };

    const toggleApplications = async () => {
        const res = await fetch("/admin/applications/toggle", {
            method: "PUT",
            credentials: "include",
        });
        const data = await res.json();
        setApplicationsOpen(data.open);
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Clark University IGDA Management</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>

            {/* ---- CONTENT MANAGEMENT ---- */}
            <section className="section content-management">
                <h2>Content Management</h2>

                <div className="card-grid">
                    <ActionCard
                        title="Add Event / Announcement"
                        desc="Create a new event or announcement for the site."
                        color="red"
                        onClick={() => navigate("/admin/add-content")}
                    />
                    <ActionCard
                        title="Modify Current Events / Announcements"
                        desc="View, edit, or delete existing entries."
                        color="orange"
                        onClick={() => navigate("/admin/modify-content")}
                    />
                </div>
            </section>

            {/* -------- E-BOARD MANAGEMENT -------- */}
            <section className="section eboard-management">
                <div className="eboard-header">
                    <h2>👥 E-Board Management</h2>
                    <div className="eboard-actions">
                        <button className="add-btn" onClick={handleAddMember}>
                            + Add Member
                        </button>

                        <button
                            className="add-btn secondary"
                            onClick={() => navigate("/admin/applications")}
                        >
                            View Applications
                        </button>

                        <button
                            className={`add-btn ${applicationsOpen ? "open" : "closed"}`}
                            onClick={toggleApplications}
                        >
                            Application Form: {applicationsOpen ? "Open" : "Closed"}
                        </button>
                    </div>
                </div>

                <div className="eboard-grid">
                    {eboard.map((member) => (
                        <EBoardMember
                            key={member._id}
                            member={member}
                            onSave={handleSaveMember}
                            onRemove={handleRemoveMember}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

function ActionCard({ title, desc, color, onClick }) {
    return (
        <div className="action-card" onClick={onClick} style={{ cursor: "pointer" }}>
            <h3>{title}</h3>
            <p>{desc}</p>
            <button
                type="button"
                className={`action-btn ${color}`}
                onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
}


export default AdminDashboard;
