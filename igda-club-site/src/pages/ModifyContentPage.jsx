import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminPages.css";

export default function ModifyContentPage() {
    const [content, setContent] = useState([]);
    const [filteredContent, setFilteredContent] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [sortOrder, setSortOrder] = useState("desc"); // most recent first by default
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("http://localhost:3001/admin/check", {
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Not authenticated");
            } catch (err) {
                navigate("/admin");
            }
        }
        checkAuth();
    }, [navigate]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [eventsRes, announcementsRes] = await Promise.all([
                    fetch("http://localhost:3001/get-all-events"),
                    fetch("http://localhost:3001/get-all-announcements"),
                ]);

                const eventsData = await eventsRes.json();
                const announcementsData = await announcementsRes.json();

                // Normalize data (so both have consistent fields)
                const combined = [
                    ...(eventsData.data || []).map((e) => ({
                        ...e,
                        _type: "event",
                        _date: e.date?.start ? new Date(e.date.start) : new Date(0),
                    })),
                    ...(announcementsData.data || []).map((a) => ({
                        ...a,
                        _type: "announcement",
                        _date: a.createdAt ? new Date(a.createdAt) : new Date(0),
                    })),
                ];

                setContent(combined);
                setFilteredContent(sortContent(combined, "desc"));
            } catch (err) {
                console.error("Error loading data:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const sortContent = (data, order) => {
        return [...data].sort((a, b) => {
            const dateA = a._date || new Date(0);
            const dateB = b._date || new Date(0);
            return order === "asc" ? dateA - dateB : dateB - dateA;
        });
    };

    const applyFilters = (newFilterType = filterType, newSortOrder = sortOrder) => {
        let data = [...content];
        if (newFilterType !== "all") {
            data = data.filter((item) => item._type === newFilterType);
        }
        const sorted = sortContent(data, newSortOrder);
        setFilteredContent(sorted);
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterType(value);
        applyFilters(value, sortOrder);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
        applyFilters(filterType, value);
    };

    const handleDelete = async (item) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (!confirmDelete) return;

        const url =
            item._type === "event"
                ? `http://localhost:3001/admin/delete-event/${item._id}`
                : `http://localhost:3001/admin/delete-announcement/${item._id}`;

        try {
            const res = await fetch(url, { method: "DELETE" });
            if (res.ok) {
                setContent(content.filter((c) => c._id !== item._id));
                setFilteredContent(filteredContent.filter((c) => c._id !== item._id));
            } else {
                alert("Failed to delete item.");
            }
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    const handleEdit = (item) => {
        navigate("/admin/add-content", { state: { type: item._type, item } });
    };

    if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div>
                    <h1>Modify Current Events / Announcements</h1>
                    <p>View, edit, or delete entries</p>
                </div>
                <button className="logout-btn" onClick={() => navigate("/admindashboard")}>
                    ← Back
                </button>
            </header>

            <section className="section">
                <div className="filter-bar">
                    <div className="filter-group">
                        <label>Filter by Type:</label>
                        <select value={filterType} onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="event">Events</option>
                            <option value="announcement">Announcements</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Sort by Date:</label>
                        <select value={sortOrder} onChange={handleSortChange}>
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </div>

                <div className="list-container">
                    {filteredContent.length === 0 && <p>No entries found.</p>}

                    {filteredContent.map((item) => (
                        <div key={item._id} className="list-item">
                            <div>
                                <strong>{item._type === "event" ? item.eventName : item.title}</strong>
                                <span className="type-tag">
                                    {item._type === "event"
                                        ? item.eventType || "Event"
                                        : "Announcement"}
                                </span>
                                <div className="date-text">
                                    {item._type === "event"
                                        ? item.date?.start
                                            ? new Date(item.date.start).toLocaleDateString()
                                            : "No date"
                                        : item._date
                                            ? new Date(item.date).toLocaleDateString()
                                            : "No date"}
                                </div>
                            </div>

                            <div className="list-actions">
                                <button className="edit-btn" onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                                <button className="remove-btn" onClick={() => handleDelete(item)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
