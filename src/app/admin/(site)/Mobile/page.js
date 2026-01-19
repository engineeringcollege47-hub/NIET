"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [mobiles, setMobiles] = useState([]);
  const [form, setForm] = useState({
    label: "",
    mobileNumber: "",
    isPrimary: false,
  });

  const fetchMobiles = async () => {
    const res = await fetch("/api/mobile");
    const data = await res.json();
    setMobiles(data);
  };

  useEffect(() => {
    fetchMobiles();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch("/api/mobile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ label: "", mobileNumber: "", isPrimary: false });
    fetchMobiles();
  };

  const makePrimary = async index => {
    await fetch("/api/mobile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });
    fetchMobiles();
  };

  const deleteMobile = async index => {
    await fetch("/api/mobile", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });
    fetchMobiles();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-orange-600 mb-4">
        Mobile Number Manager
      </h1>

      {/* ADD MOBILE */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg p-4 mb-6"
      >
        <h2 className="text-sm font-semibold mb-3 text-gray-700">
          Add New Mobile Number
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Label (Primary / WhatsApp)"
            value={form.label}
            onChange={e => setForm({ ...form, label: e.target.value })}
          />

          <input
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Mobile Number"
            required
            value={form.mobileNumber}
            onChange={e =>
              setForm({ ...form, mobileNumber: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={form.isPrimary}
              onChange={e =>
                setForm({ ...form, isPrimary: e.target.checked })
              }
              className="accent-orange-600"
            />
            Set as primary
          </label>

          <button className="text-xs px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
            Save
          </button>
        </div>
      </form>

      {/* MOBILE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mobiles.map((num, i) => (
          <div
            key={i}
            className="bg-white border rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-semibold">
                {num.label || "Mobile"}
              </h3>

              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  num.isPrimary
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {num.isPrimary ? "PRIMARY" : "INACTIVE"}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-3">
              📞 {num.mobileNumber}
            </p>

            <div className="flex gap-2">
              {!num.isPrimary && (
                <button
                  onClick={() => makePrimary(i)}
                  className="text-[11px] px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Make Primary
                </button>
              )}

              <button
                onClick={() => deleteMobile(i)}
                className="text-[11px] px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
