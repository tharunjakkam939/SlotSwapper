import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getToken } from "../utils/auth";
import { apiGet, apiPost } from "../utils/api";

export default function Marketplace() {
  const token = getToken();
  const [events, setEvents] = useState([]);
  const [err, setErr] = useState("");

  async function load() {
    try {
      const data = await apiGet("/marketplace", token); // backend should return swappable events with ownerName
      setEvents(data);
    } catch (e) {
      setErr("Load failed: " + e.message);
    }
  }

  useEffect(()=>{ load(); }, []);

  async function requestSwap(theirSlotId) {
    // You should pick your slot (mySlotId) from user's own events — for demo we ask prompt
    const mySlotId = parseInt(prompt("Enter your event id to offer (mySlotId):"), 10);
    if (!mySlotId) return;
    try {
      await apiPost("/requests", { mySlotId, theirSlotId }, token);
      alert("Request sent");
    } catch (e) {
      alert("Request failed: " + e.message);
    }
  }

  return (
    <div>
      <h1>Marketplace</h1>
      {err && <div className="error">{err}</div>}
      {events.length===0 && <p>No swappable slots available.</p>}
      <div>
        {events.map(ev => (
          <EventCard key={ev.id} event={ev}>
            <button className="btn-green" onClick={()=>requestSwap(ev.id)}>Request Swap</button>
          </EventCard>
        ))}
      </div>
    </div>
  );
}
