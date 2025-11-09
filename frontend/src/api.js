const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

export async function apiGet(path, token) {
  const res = await fetch(`${API}${path}`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export async function apiPost(path, body, token) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export async function apiPut(path, body, token) {
  const res = await fetch(`${API}${path}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export async function apiDelete(path, token) {
  const res = await fetch(`${API}${path}`, { method: "DELETE", headers: authHeaders(token) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
