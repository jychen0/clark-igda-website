import React from "react";

function AnnouncementCard({ title, date, description, tag }) {
    const tagColors = {
        Event: "bg-red-500",
        Social: "bg-blue-500",
        Important: "bg-yellow-500",
        Resources: "bg-green-500",
        General: "bg-gray-400",
    };

    const tagColor = tagColors[tag] || "bg-gray-400";

    return (
        <div className="border rounded-xl p-4 mb-4 shadow-sm bg-white hover:shadow-md transition">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {tag && (
                    <span
                        className={`text-xs text-white px-2 py-1 rounded-md ${tagColor}`}
                    >
            {tag}
          </span>
                )}
            </div>
            <p className="text-sm text-gray-500 mb-2">{date}</p>
            <p className="text-gray-700">{description}</p>
        </div>
    );
}

export default AnnouncementCard;
