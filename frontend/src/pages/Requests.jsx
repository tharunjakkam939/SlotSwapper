import React, { useEffect, useState } from "react";
import { getToken } from "../utils/auth";
import { apiGet, apiPut } from "../utils/api";

export default function Requests() {
  const token = getToken();
  const [reqs, setReqs] = useState([]);
  const [err, setErr] = useState("");

  async function load() {
    try {
      const data = await apiGet("/requests", token);
      setReqs(data);
    } catch (e) {
      setErr("Load failed: " + e.message);
    }
  }

  useEffect(()=>{ load(); }, []);

  async function accept(id) {
    try {
      await apiPut(`/requests/${id}/accept`, null, token);
      load();
    } catch (e) {
      alert("Accept failed: " + e.message);
    }
  }

  async function decline(id) {
    try {
      await apiPut(`/requests/${id}/decline`, null, token);
      load();
    } catch (e) {
      alert("Decline failed: " + e.message);
    }
  }

  return (
    <div>
      <h1>Swap Requests</h1>
      {err && <div className="error">{err}</div>}
      {reqs.length===0 ? <p>No swap requests yet.</p> : null}
      {reqs.map(r => (
        <div className="card" key={r.id}>
          <div><strong>Request ID:</strong> {r.id}</div>
          <div><strong>From (requesterId):</strong> {r.requesterId}</div>
          <div><strong>My slot:</strong> {r.mySlotId} — their slot: {r.theirSlotId}</div>
          <div className="card-actions">
            {r.status === "PENDING" && (
              <>
                <button className="btn-green" onClick={()=>accept(r.id)}>Accept</button>
                <button className="btn-red" onClick={()=>decline(r.id)}>Decline</button>
              </>
            )}
            <span className="muted">Status: {r.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
