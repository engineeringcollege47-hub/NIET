"use client";

import React, { useState } from "react";

export default function Page() {
  const [enrollment, setEnrollment] = useState("");
  const [dob, setDob] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  /* ======================
     SUBMIT HANDLER
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!enrollment || !dob) {
      setError("Please enter Enrollment Number and Date of Birth");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `/api/Registerdetail?enrollmentNumber=${encodeURIComponent(
          enrollment
        )}&dob=${dob}`,
        { cache: "no-store" }
      );

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Record not found");
      } else {
        setData(json.data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-24">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
          Student Registration Details
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-6 mb-8">

          <input
            type="text"
            placeholder="Enrollment Number"
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
            className="border rounded-md px-4 py-3 focus:ring-1 focus:ring-orange-500"
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border rounded-md px-4 py-3 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 text-white py-3 rounded-md font-medium
                       hover:bg-orange-700 transition disabled:opacity-50"
          >
            {loading ? "Fetching..." : "Get Details"}
          </button>
        </form>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* RESULT CARD */}
        {data && (
          <div className="border rounded-xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-orange-600 text-white px-6 py-4">
              <h2 className="text-lg font-semibold">
                Registration Information
              </h2>
              <p className="text-sm opacity-90">
                Enrollment No: {data.enrollmentNumber}
              </p>
            </div>

            {/* CONTENT */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

              <Detail label="Name" value={data.name} />
              <Detail label="Roll Number" value={data.rollNumber} />
              <Detail label="Programme" value={data.programme} />
              <Detail label="Father Name" value={data.fatherName} />
              <Detail label="Mother Name" value={data.motherName} />
              <Detail label="Date of Birth" value={formatDate(data.dob)} />
              <Detail label="Admission Date" value={formatDate(data.admissionDate)} />
              <Detail label="Mobile" value={data.mobile} />
              <Detail label="Email" value={data.email} />
              <Detail label="Address" value={data.presentAddress} />

              <Detail
                label="Payment Status"
                value={
                  data.paymentStatus ? (
                    <span className="text-green-600 font-medium">Paid</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )
                }
              />

              <Detail
                label="Enrollment Status"
                value={
                  data.enrollStatus ? (
                    <span className="text-blue-600 font-medium">Enrolled</span>
                  ) : (
                    <span className="text-slate-500">Not Enrolled</span>
                  )
                }
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ======================
   REUSABLE COMPONENTS
====================== */
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-slate-500 mb-1">{label}</p>
      <p className="font-medium text-slate-800">{value}</p>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
