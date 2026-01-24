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
        `/api/studentresult?enrollmentNumber=${enrollment}`
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

  

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-32">
      <div className="max-w-4xl mx-auto">

        {/* 🔹 SEARCH FORM */}
        {!marksheet && (
          <div className="bg-white rounded shadow-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Find Result
            </h1>

            {error && (
              <p className="mb-4 text-red-600 font-medium">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Enrollment Number"
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
          <div className="bg-[#fffaf3] border border-gray-300 rounded shadow-xl p-8">

            {/* HEADER */}
            <div className="text-center mb-6">
             <h2 className="text-3xl font-bold text-[#d95f02] uppercase">
                National Institute
                Engineering & Technology
              </h2>

              <p className="mt-2 font-semibold">Examination Result</p>
            </div>

            {/* STUDENT INFO */}
            <div className="grid md:grid-cols-[1fr_180px] gap-6 mb-6">
              <div className="space-y-2 text-sm">
                <p><b>Name:</b> {marksheet.name}</p>
                <p><b>Father Name:</b> {marksheet.fatherName}</p>
                <p><b>Enrollment No:</b> {marksheet.enrollment}</p>
                <p><b>Roll No:</b> {marksheet.rollNumber}</p>
                <p><b>Session:</b> {marksheet.session}</p>
                <p><b>Semester:</b> {marksheet.semester}</p>
                <p><b>Grade:</b> <span className="font-bold">{marksheet.grade}</span></p>
                <p><b>Percentage:</b> {marksheet.percentage}%</p>
              </div>

              {/* PHOTO */}
              <div className="flex justify-center">
                {marksheet.profileImage && (
                  <img
                    src={marksheet.profileImage}
                    alt="Student"
                    className="w-40 h-44 object-cover border"
                  />
                )}
              </div>
            </div>

            {/* SUBJECT TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-2 py-2">Subject</th>
                    <th className="border px-2 py-2">Min</th>
                    <th className="border px-2 py-2">Max</th>
                    <th className="border px-2 py-2">Practicle</th>
                    <th className="border px-2 py-2">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {marksheet.subjects.map((sub, i) => (
                    <tr key={i} className="text-center">
                      <td className="border px-2 py-2 text-left">{sub.subject}</td>
                      <td className="border px-2 py-2">{sub.min}</td>
                      <td className="border px-2 py-2">{sub.max}</td>
                      <td className="border px-2 py-2">{sub.practicle}</td>
                      <td className="border px-2 py-2 font-semibold">
                        {sub.marks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>



            <div className="flex justify-end mt-2">
              <div className="inline-block border border-[#5c3a21]/30 rounded-md overflow-hidden">

                {/* HEADER */}
                <div className="flex text-[11px] font-semibold text-gray-800">
                  {marksheet.semestersmark.map((s, i) => (
                    <div
                      key={i}
                      className="min-w-[90px] px-2 py-1 text-center border-r border-[#5c3a21]/30"
                    >
                      {s.name}
                    </div>
                  ))}

                </div>

                {/* VALUES */}
                <div className="flex text-[11px] font-semibold text-gray-700 border-t border-[#5c3a21]/30">
                  {marksheet.semestersmark.map((s, i) => (
                    <div
                      key={i}
                      className="min-w-[90px] px-2 py-1 text-center border-r border-[#5c3a21]/30"
                    >
                      {s.totalMarks}
                    </div>
                  ))}

                
                </div>

              </div>
            </div>

            {/* TOTAL */}
            <div className="mt-4 text-sm font-semibold">
              <p>Total: {marksheet.total} / {marksheet.maxTotal}</p>
              <p>Marks in Words: {marksheet.marksInWords}</p>
            </div>



            {/* BACK */}
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setMarksheet(null);
                  setEnrollment('');
                }}
                className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-black"
              >
                Search Another Result
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
