import React from "react";

function AnnouncementCard({ id, title, tag, date, desc }) {
    const tagColors = {
        Event: "bg-danger",
        Social: "bg-primary",
        Important: "bg-warning",
        Resources: "bg-primary",
        Internship: "bg-success",
        General: "bg-secondary",
    };

    const dateObj = new Date(date);

    const formattedDate = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });


    const tagColor = tagColors[tag] || "bg-gray-400";

    return (
        <div className="border rounded-xl p-4 mb-4 shadow-sm bg-white hover:shadow-md transition">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {tag && (
                    <span className={`badge mb-2 text-xs text-white px-2 py-1 ${tagColor}`}>
                        {tag}
                    </span>)}
            </div>
            <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
            <p className="text-gray-700">{desc}</p>
        </div>
    );
}

export default AnnouncementCard;
