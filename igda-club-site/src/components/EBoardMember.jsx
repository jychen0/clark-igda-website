import { useState } from "react";
import "../css/AdminPages.css";

export default function EBoardMember({ member, onSave, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState(member);

  const handleSave = () => {
    onSave(editedMember);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="eboard-card edit-mode">
        <input
          placeholder="Name"
          value={editedMember.name}
          onChange={(e) => setEditedMember({ ...editedMember, name: e.target.value })}
        />
        <input
          placeholder="Position"
          value={editedMember.position}
          onChange={(e) => setEditedMember({ ...editedMember, position: e.target.value })}
        />
        <input
          placeholder="Image URL"
          value={editedMember.image || ""}
          onChange={(e) => setEditedMember({ ...editedMember, image: e.target.value })}
        />
        <div className="card-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="eboard-card">
      <div className="image-placeholder">
        {member.image ? <img src={member.image} alt={member.name} /> : "👥"}
      </div>
      <h4>{member.name}</h4>
      <p>{member.position}</p>
      <div className="card-buttons">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="remove-btn" onClick={() => onRemove(member.id)}>Remove</button>
      </div>
    </div>
  );
}
