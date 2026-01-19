"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    label: "",
    addressText: "",
    mapEmbedUrl: "",
    isLive: false,
  });

  const fetchAddresses = async () => {
    const res = await fetch("/api/Address");
    const data = await res.json();
    setAddresses(data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("/api/Address", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ label: "", addressText: "", mapEmbedUrl: "", isLive: false });
    fetchAddresses();
  };

  const makeLive = async index => {
    await fetch("/api/Address", {
      method: "PUT",
      body: JSON.stringify({ index }),
    });
    fetchAddresses();
  };

  const deleteAddress = async index => {
    await fetch("/api/Address", {
      method: "DELETE",
      body: JSON.stringify({ index }),
    });
    fetchAddresses();
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-orange-600 mb-4">
        Address Manager
      </h1>

      {/* ADD ADDRESS */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg p-4 mb-6"
      >
        <h2 className="text-sm font-semibold mb-3 text-gray-700">
          Add New Address
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Label (Home / Office)"
            value={form.label}
            onChange={e => setForm({ ...form, label: e.target.value })}
          />

          <textarea
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Address text"
            rows="2"
            required
            value={form.addressText}
            onChange={e => setForm({ ...form, addressText: e.target.value })}
          />

          <textarea
            className="md:col-span-2 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Google Maps Embed URL"
            rows="2"
            required
            value={form.mapEmbedUrl}
            onChange={e => setForm({ ...form, mapEmbedUrl: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={form.isLive}
              onChange={e => setForm({ ...form, isLive: e.target.checked })}
              className="accent-orange-600"
            />
            Set as live
          </label>

          <button className="text-xs px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
            Save
          </button>
        </div>
      </form>

      {/* ADDRESS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {addresses.map((addr, i) => (
          <div
            key={i}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition"
          >
            <iframe
              src={addr.mapEmbedUrl}
              className="w-full h-36"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="p-3">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-semibold">
                  {addr.label || "Address"}
                </h3>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    addr.isLive
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {addr.isLive ? "LIVE" : "INACTIVE"}
                </span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                {addr.addressText}
              </p>

              <div className="flex gap-2">
                {!addr.isLive && (
                  <button
                    onClick={() => makeLive(i)}
                    className="text-[11px] px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
                  >
                    Make Live
                  </button>
                )}

                <button
                  onClick={() => deleteAddress(i)}
                  className="text-[11px] px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
