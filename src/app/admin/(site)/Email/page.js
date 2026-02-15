"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [emails, setEmails] = useState([]);
  const [form, setForm] = useState({ label: "", email: "", isPrimary: false });

  const fetchEmails = async () => {
    const res = await fetch("/api/email");
    const data = await res.json();
    setEmails(data);
  };

  useEffect(() => { fetchEmails(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ label: "", email: "", isPrimary: false });
    fetchEmails();
  };

  const makePrimary = async (index) => {
    await fetch("/api/email", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });
    fetchEmails();
  };

  const deleteEmail = async (index) => {
    await fetch("/api/email", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });
    fetchEmails();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-orange-600 mb-4">Email Manager</h1>

      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500"
            placeholder="Label (e.g. Work)"
            value={form.label}
            onChange={e => setForm({ ...form, label: e.target.value })}
          />
          <input
            className="border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500"
            placeholder="Email Address"
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input 
              type="checkbox" 
              checked={form.isPrimary} 
              onChange={e => setForm({...form, isPrimary: e.target.checked})} 
            />
            Set as primary
          </label>
          <button className="text-xs px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
            Save Email
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emails.map((item, i) => (
          <div key={i} className="bg-white border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-semibold">{item.label || "Email"}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.isPrimary ? "bg-orange-600 text-white" : "bg-gray-200"}`}>
                {item.isPrimary ? "PRIMARY" : "SECONDARY"}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-3">✉️ {item.email}</p>
            <div className="flex gap-2">
              {!item.isPrimary && (
                <button onClick={() => makePrimary(i)} className="text-[11px] px-3 py-1 bg-orange-600 text-white rounded">
                  Make Primary
                </button>
              )}
              <button onClick={() => deleteEmail(i)} className="text-[11px] px-3 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}