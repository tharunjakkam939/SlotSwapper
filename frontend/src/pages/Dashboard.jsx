import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getToken } from "../utils/auth";
import { apiGet, apiPost, apiDelete, apiPut } from "../utils/api";

export default function Dashboard() {
  const token = getToken();
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet("/events", token); // expects events owned by user
      setEvents(data);
    } catch (e) {
      setErr("Failed to load events: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function addEvent(e) {
    e.preventDefault();
    setErr("");
    try {
      const body = { title, startTime, endTime };
      await apiPost("/events", body, token);
      setTitle(""); setStartTime(""); setEndTime("");
      await load();
    } catch (e) {
      setErr("Add failed: " + e.message);
    }
  }

  async function removeEvent(id) {
    try {
      await apiDelete(`/events/${id}`, token);
      setEvents((s)=>s.filter(x=>x.id !== id));
    } catch (e) {
      setErr("Delete failed: " + e.message);
    }
  }

  async function toggleSwappable(id) {
    try {
      const updated = await apiPut(`/events/${id}/status`, null, token);
      setEvents((s)=>s.map(ev=> ev.id===id ? {...ev, status: updated.status || ev.status} : ev));
    } catch (e) {
      setErr("Toggle failed: " + e.message);
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <section className="card form-card">
        <h3>Create New Event</h3>
        <form onSubmit={addEvent} className="inline-form">
          <input placeholder="Event title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
          <input type="datetime-local" value={startTime} onChange={(e)=>setStartTime(e.target.value)} required />
          <input type="datetime-local" value={endTime} onChange={(e)=>setEndTime(e.target.value)} required />
          <button className="btn">Add Event</button>
        </form>
        {err && <div className="error">{err}</div>}
      </section>

      <h2>My Events</h2>
      {loading ? <p>Loading...</p> : events.length===0 ? <p>No events yet.</p> : null}

      <div>
        {events.map(ev => (
          <EventCard key={ev.id} event={ev}>
            <button className="btn-green" disabled={ev.status === "SWAPPABLE"} onClick={()=>toggleSwappable(ev.id)}>
              {ev.status === "SWAPPABLE" ? "Swappable" : "Make Swappable"}
            </button>
            <button className="btn-red" onClick={()=>removeEvent(ev.id)}>Delete</button>
          </EventCard>
        ))}
      </div>
    </div>
  );
}
