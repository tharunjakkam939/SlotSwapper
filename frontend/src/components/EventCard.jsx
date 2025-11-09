import React from "react";

export default function EventCard({ event, children }) {
  const start = new Date(event.startTime).toLocaleString();
  const end = new Date(event.endTime).toLocaleString();
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <div className="muted">{start} → {end}</div>
      <div className="muted"><strong>Owner:</strong> {event.ownerName ?? event.ownerId}</div>
      <div className="muted"><strong>Status:</strong> {event.status}</div>
      <div className="card-actions">{children}</div>
    </div>
  );
}
