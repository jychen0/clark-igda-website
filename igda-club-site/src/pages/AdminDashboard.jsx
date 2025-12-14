import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/admin/check", {
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) navigate("/admin");
        });
    }, [navigate]);

    const logout = async () => {
        await fetch("http://localhost:3001/admin/logout", {
            credentials: "include"
        });
        navigate("/");
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <button onClick={logout}>Logout</button>

            <hr />

            <h2>Events</h2>
            <button>Add Event</button>

            <h2>Announcements</h2>
            <button>Add Announcement</button>
        </div>
    );
}

export default AdminDashboard;
