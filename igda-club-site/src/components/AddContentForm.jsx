import { useState, useEffect } from "react";
import "../css/AdminPages.css";

export default function AddContentForm({ editData, editType }) {
  const [type, setType] = useState(editType || "event");
  const [message, setMessage] = useState("");

  // For edit vs add
  const isEdit = !!editData;

  // Event form data
  const [eventData, setEventData] = useState(
    editType === "event" && editData
      ? editData
      : {
        eventName: "",
        eventType: "",
        posterIMG: "",
        overview: "",
        date: { semester: "", start: "", end: "" },
        location: { held: 1, location: "" },
        involvedClubs: [],
        targetTracks: [],
        speakers: [],
        capacity: "",
        attendance: "",
      }
  );

  // Announcement form data
  const [announcementData, setAnnouncementData] = useState(
    editType === "announcement" && editData
      ? editData
      : {
        title: "",
        desc: "",
        date: new Date().toISOString().split("T")[0], // default: today’s date
      }
  );


  // Options for multi-select & dropdowns
  const eventTypes = ["Game Jam", "Asset Jam", "Workshop", "Industry Talk", "Mixer", "Info Session", "Field Trip", "Other"];
  const trackOptions = ["Production", "Programming", "3D Art", "2D Art", "Audio", "Writing", "Design"];
  const semesters = ["Fall", "Spring"];

  // Update helper
  const update = (field, value) => setEventData({ ...eventData, [field]: value });

  const handleAddSpeaker = () => {
    setEventData({
      ...eventData,
      speakers: [...(eventData.speakers || []), { speakerName: "", speakerInfo: "", speakerPos: "", speakerCred: "" }],
    });
  };

  const handleSpeakerChange = (i, field, value) => {
    const updated = [...eventData.speakers];
    updated[i][field] = value;
    setEventData({ ...eventData, speakers: updated });
  };

  const handleRemoveSpeaker = (i) => {
    const updated = [...eventData.speakers];
    updated.splice(i, 1);
    setEventData({ ...eventData, speakers: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url =
      type === "event"
        ? isEdit
          ? `http://localhost:3001/admin/edit-event/${editData._id}`
          : "http://localhost:3001/admin/add-event"
        : isEdit
          ? `http://localhost:3001/admin/edit-announcement/${editData._id}`
          : "http://localhost:3001/admin/add-announcement";

    const body = type === "event" ? eventData : announcementData;

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage(`${type === "event" ? "Event" : "Announcement"} ${isEdit ? "updated" : "added"} successfully!`);
      } else {
        setMessage("Error saving entry.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="form-card">
      <h2>{isEdit ? "Edit" : "Add"} {type === "event" ? "Event" : "Announcement"}</h2>

      <div className="form-section">
        <label>Content Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="form-select"
          disabled={isEdit}
        >
          <option value="event">Event</option>
          <option value="announcement">Announcement</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        {type === "event" ? (
          <EventForm
            data={eventData}
            setData={setEventData}
            eventTypes={eventTypes}
            trackOptions={trackOptions}
            semesters={semesters}
            isEdit={isEdit}
            handleAddSpeaker={handleAddSpeaker}
            handleSpeakerChange={handleSpeakerChange}
            handleRemoveSpeaker={handleRemoveSpeaker}
          />
        ) : (
          <AnnouncementForm data={announcementData} setData={setAnnouncementData} />
        )}

        <button type="submit" className="save-btn full">
          {isEdit ? "Save Changes" : "Add Entry"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

function EventForm({
  data,
  setData,
  eventTypes,
  trackOptions,
  semesters,
  isEdit,
  handleAddSpeaker,
  handleSpeakerChange,
  handleRemoveSpeaker,
}) {
  const update = (field, value) => setData({ ...data, [field]: value });

  return (
    <div className="form-section">
      <h3>Event Details</h3>

      <label>Event Name</label>
      <input
        type="text"
        value={data.eventName}
        onChange={(e) => update("eventName", e.target.value)}
        required
      />

      <label>Event Type</label>
      <select
        value={data.eventType}
        onChange={(e) => update("eventType", e.target.value)}
        className="form-select"
      >
        <option value="">Select Type</option>
        {eventTypes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label>Poster URL</label>
      <input
        type="text"
        value={data.posterIMG}
        onChange={(e) => update("posterIMG", e.target.value)}
      />

      <label>Overview</label>
      <textarea
        rows="3"
        value={data.overview}
        onChange={(e) => update("overview", e.target.value)}
      />

      {/* Semester dropdowns */}
      <label>Semester</label>
      <div style={{ display: "flex", gap: "1rem" }}>
        <select
          value={data.date.semester.split(" ")[0] || ""}
          onChange={(e) =>
            setData({ ...data, date: { ...data.date, semester: `${e.target.value} ${data.date.semester.split(" ")[1] || ""}` } })
          }
        >
          <option value="">Select</option>
          {semesters.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year"
          value={data.date.semester.split(" ")[1] || ""}
          onChange={(e) =>
            setData({ ...data, date: { ...data.date, semester: `${data.date.semester.split(" ")[0] || ""} ${e.target.value}` } })
          }
        />
      </div>

      {/* Start/End */}
      <label>Start Time</label>
      <input
        type="datetime-local"
        value={data.date.start}
        onChange={(e) =>
          setData({ ...data, date: { ...data.date, start: e.target.value, end: data.date.end } })
        }
      />
      <label>End Time</label>
      <input
        type="datetime-local"
        value={data.date.end}
        onChange={(e) =>
          setData({ ...data, date: { ...data.date, start: data.date.start, end: e.target.value } })
        }
      />

      {/* Location */}
      <label>Location</label>
      <input
        type="text"
        value={data.location.location}
        onChange={(e) =>
          setData({ ...data, location: { ...data.location, location: e.target.value } })
        }
        placeholder="e.g., JC 220 or Discord"
      />

      {/* Target Tracks */}
      <label>Target Tracks</label>
      <div className="multiselect-grid">
        {trackOptions.map((track) => (
          <label key={track} className="checkbox-item">
            <input
              type="checkbox"
              checked={data.targetTracks?.includes(track)}
              onChange={(e) => {
                const checked = e.target.checked;
                const updated = checked
                  ? [...data.targetTracks, track]
                  : data.targetTracks.filter((t) => t !== track);
                update("targetTracks", updated);
              }}
            />
            <span>{track}</span>
          </label>
        ))}
      </div>

      {/* Speakers (Industry Talk only) */}
      {data.eventType === "Industry Talk" && (
        <div className="form-section">
          <h4>Speakers</h4>
          {data.speakers.map((spk, i) => (
            <div key={i} className="speaker-card">
              <input
                type="text"
                placeholder="Full Name *"
                value={spk.speakerName}
                onChange={(e) => handleSpeakerChange(i, "speakerName", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Speaker Socials"
                value={spk.speakerInfo}
                onChange={(e) => handleSpeakerChange(i, "speakerInfo", e.target.value)}
              />
              <input
                type="text"
                placeholder="Speaker Position"
                value={spk.speakerPos}
                onChange={(e) => handleSpeakerChange(i, "speakerPos", e.target.value)}
              />
              <input
                type="text"
                placeholder="Affiliation / Company"
                value={spk.speakerCred}
                onChange={(e) => handleSpeakerChange(i, "speakerCred", e.target.value)}
              />
              <button type="button" className="remove-btn" onClick={() => handleRemoveSpeaker(i)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={handleAddSpeaker}>
            + Add Speaker
          </button>
        </div>
      )}

      {/* Involved clubs */}
      <label>Involved Clubs</label>
      <textarea
        rows="2"
        value={data.involvedClubs?.join(", ")}
        placeholder="Separate with commas"
        onChange={(e) => update("involvedClubs", e.target.value.split(",").map((c) => c.trim()))}
      />

      {/* Capacity */}
      <label>Capacity (optional)</label>
      <input
        type="number"
        value={data.capacity}
        onChange={(e) => update("capacity", e.target.value)}
      />

      {/* Attendance (edit mode only) */}
      {isEdit && (
        <>
          <label>Attendance</label>
          <input
            type="number"
            value={data.attendance || ""}
            onChange={(e) => update("attendance", e.target.value)}
          />
        </>
      )}
    </div>
  );
}

function AnnouncementForm({ data, setData }) {
  const update = (field, value) => setData({ ...data, [field]: value });

  return (
    <div className="form-section">
      <h3>Announcement Details</h3>

      <label>Title</label>
      <input
        type="text"
        value={data.title}
        onChange={(e) => update("title", e.target.value)}
        required
      />

      <label>Date</label>
      <input
        type="date"
        value={data.date ? data.date.split("T")[0] : new Date().toISOString().split("T")[0]}
        onChange={(e) => update("date", e.target.value)}
        required
      />

      <label>Description</label>
      <textarea
        rows="3"
        value={data.desc}
        onChange={(e) => update("desc", e.target.value)}
        required
      />
    </div>
  );
}

