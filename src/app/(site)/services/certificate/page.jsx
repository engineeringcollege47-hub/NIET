'use client';

import React, { useState } from 'react';

export default function Page() {
  const [enrollment, setEnrollment] = useState('');
  const [loading, setLoading] = useState(false);
  const [marksheet, setMarksheet] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!enrollment) {
      setError('Please enter Enrollment Number');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `/api/studentcertificate?enrollmentNumber=${enrollment}`
      );

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Result not found');
        setLoading(false);
        return;
      }

      setMarksheet(result.data);
    } catch (err) {
      setError('Something went wrong');
    }

    setLoading(false);
  };
  const formatDateDDMMYYYY = (date) => {
    if (!date) return new Date().toLocaleDateString("en-GB");

    const d = new Date(date);
    if (isNaN(d)) return "";

    return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-32">
      <div className="max-w-4xl mx-auto">

        {/* 🔹 SEARCH FORM */}
        {!marksheet && (
          <div className="bg-white rounded shadow-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Find Certificate
            </h1>

            {error && (
              <p className="mb-4 text-red-600 font-medium">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Certificate Number"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white py-3 rounded-md font-medium
                           hover:bg-orange-700 transition disabled:opacity-60"
              >
                {loading ? 'Searching...' : 'Submit'}
              </button>
            </form>
          </div>
        )}

        {/* 🔹 RESULT / MARKSHEET */}
        {marksheet && (
          <div className="bg-[#fffaf3] border-2 border-[#d95f02] rounded-lg shadow-xl p-10 max-w-4xl mx-auto">

            {/* HEADER */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#d95f02] uppercase">
                National Institute
                Engineering & Technology
              </h2>
              <p className="text-sm font-semibold text-gray-700 mt-1">
                Certificate of Achievement
              </p>

              {marksheet.certificateNumber && (
                <p className="text-xs mt-2 font-semibold text-gray-600">
                  Certificate No:{" "}
                  <span className="font-bold text-gray-800">
                    {marksheet.certificateNumber}
                  </span>
                </p>
              )}
            </div>

            {/* BODY */}
            <div className="max-w-3xl mx-auto border-4 border-[#d95f02] p-8 bg-white shadow-lg">


              <div className="grid md:grid-cols-[1fr_180px] gap-8 mb-8">
                {/* STUDENT DETAILS */}
                <div className="space-y-3 text-sm leading-relaxed text-gray-800">
                  <p>
                    <span className="font-bold uppercase">{marksheet.name}</span>,
                    Son/Daughter of <span className="font-semibold uppercase">{marksheet.fatherName}</span>,
                    has successfully completed the examination. in {marksheet.tradename} 
                  </p>

                  <p>
                    Enrollment No: <b>{marksheet.enrollmentNo}</b>
                  </p>
                  <p>
                    Certificate No:{" "}
                    <span className="font-bold text-gray-800">
                      {marksheet.certificateNumber}
                    </span>
                  </p>

                  <p className="mt-4">
                    We hereby certify that the above-mentioned student has demonstrated excellence
                    in academic performance and is awarded this certificate on this day.
                  </p>
                </div>

                {/* STUDENT PHOTO */}
                <div className="flex justify-center items-start">
                  {marksheet.profileimage && (
                    <img
                      src={marksheet.profileimage}
                      alt="Student"
                      className="w-40 h-44 object-cover border-2 border-gray-400 rounded-md"
                    />
                  )}
                </div>
                <div className="flex justify-between items-end mt-10 text-sm">
                  <div>
                    <p className="font-semibold">Date:</p>
                    <p>{formatDateDDMMYYYY(marksheet.issueDate)}</p>

                  </div>

                </div>
              </div>

            </div>


            {/* FOOTER */}


            {/* BACK */}
            <div className="mt-10 text-center">
              <button
                onClick={() => {
                  setMarksheet(null);
                  setEnrollment("");
                }}
                className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-black"
              >
                Search Another Certificate
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
