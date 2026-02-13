'use client';

import React, { useState } from 'react';

export default function ResultPage() {
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
      // The API now checks both Marksheet and Semster models
      const res = await fetch(
        `/api/studentresult?enrollmentNumber=${enrollment.trim()}`
      );

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Result not found');
        setMarksheet(null);
      } else {
        setMarksheet(result.data);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMarksheet(null);
    setEnrollment('');
    setError('');
  };

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        
        {/* 🔹 SEARCH FORM (Shown only when no marksheet is loaded) */}
        {!marksheet && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Find Student Result</h1>
            <p className="text-gray-500 mb-6">Enter your enrollment number to view your marksheet or semester result.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                <input
                  type="text"
                  placeholder="roll number"
                  value={enrollment}
                  onChange={(e) => setEnrollment(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors disabled:opacity-60 shadow-md"
              >
                {loading ? 'Searching Database...' : 'View Result'}
              </button>
            </form>
          </div>
        )}

        {/* 🔹 RESULT / MARKSHEET DISPLAY */}
        {marksheet && (
          <div className="bg-[#fffaf3] border-2 border-gray-300 rounded-lg shadow-2xl p-4 md:p-10 relative overflow-hidden">
            {/* Decorative Watermark or Border could go here */}
            
            {/* HEADER */}
            <div className="text-center mb-8 border-b-2 border-orange-100 pb-6">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#d95f02] uppercase tracking-tight">
                National Institute of <br /> Engineering & Technology
              </h2>
              <div className="mt-2 inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold tracking-widest uppercase">
                Statement of Marks
              </div>
            </div>

            {/* STUDENT DETAILS SECTION */}
            <div className="grid md:grid-cols-[1fr_180px] gap-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm md:text-base">
                <p><b>Name:</b> <span className="uppercase">{marksheet.name}</span></p>
                <p><b>Father&apos;s Name:</b> <span className="uppercase">{marksheet.fatherName}</span></p>
                <p><b>Enrollment No:</b> {marksheet.enrollment}</p>
                <p><b>Roll No:</b> {marksheet.rollNumber}</p>
                <p><b>Session:</b> {marksheet.session}</p>
                <p><b>Semester/Year:</b> {marksheet.semester}</p>
                <p><b>Date of Issue:</b> {marksheet.issueDate ? new Date(marksheet.issueDate).toLocaleDateString() : 'N/A'}</p>
                <p><b>City/Center:</b> {marksheet.city || 'N/A'}</p>
              </div>

              {/* PHOTO */}
              <div className="flex justify-center md:justify-end">
                <div className="w-36 h-44 border-4 border-white shadow-md overflow-hidden bg-gray-200">
                  {marksheet.profileImage ? (
                    <img
                      src={marksheet.profileImage}
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs text-center p-2">
                      Photo Not Available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SUBJECTS TABLE */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-400 bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-400 px-3 py-2 text-left">Subject Name</th>
                    <th className="border border-gray-400 px-2 py-2 text-center">Min</th>
                    <th className="border border-gray-400 px-2 py-2 text-center">Max</th>
                    <th className="border border-gray-400 px-2 py-2 text-center">Theory/Prac</th>
                    <th className="border border-gray-400 px-2 py-2 text-center">Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {marksheet.subjects?.map((sub, i) => (
                    <tr key={i} className="hover:bg-orange-50 transition-colors">
                      <td className="border border-gray-400 px-3 py-2 font-medium">{sub.subject}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">{sub.min}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">{sub.max}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">{sub.practicle || '—'}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center font-bold text-blue-800">
                        {sub.marks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 🔹 SEMESTER MARKS SUMMARY (Only shows if semestersmark exists) */}
            {marksheet.semestersmark && marksheet.semestersmark.length > 0 && (
              <div className="flex justify-end mt-4 mb-6">
                <div className="inline-block border border-gray-400 rounded-md overflow-hidden bg-white shadow-sm">
                  <div className="flex bg-gray-100 text-[10px] md:text-xs font-bold text-gray-800 border-b border-gray-400">
                    {marksheet.semestersmark.map((s, i) => (
                      <div key={i} className="min-w-[80px] md:min-w-[100px] px-2 py-2 text-center border-r border-gray-400 last:border-0">
                        {s.name}
                      </div>
                    ))}
                  </div>
                  <div className="flex text-[10px] md:text-xs font-bold text-blue-900">
                    {marksheet.semestersmark.map((s, i) => (
                      <div key={i} className="min-w-[80px] md:min-w-[100px] px-2 py-2 text-center border-r border-gray-400 last:border-0">
                        {s.totalMarks}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TOTALS & GRADES */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm"><b>Aggregate Total:</b> {marksheet.total} / {marksheet.maxTotal}</p>
                <p className="text-sm italic"><b>In Words:</b> {marksheet.marksInWords}</p>
              </div>
              <div className="md:text-right space-y-1">
                <p className="text-sm"><b>Percentage:</b> {marksheet.percentage}%</p>
                <p className="text-lg"><b>Final Grade:</b> <span className="font-black text-orange-700">{marksheet.grade}</span></p>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center no-print">
              
              <button
                onClick={handleReset}
                className="px-8 py-2 bg-gray-800 text-white rounded-full font-semibold hover:bg-black transition shadow-lg"
              >
                Search Another
              </button>
            </div>
            
            <p className="mt-8 text-[10px] text-center text-gray-400 uppercase tracking-widest">
              Digital copy generated for verification purposes only.
            </p>
          </div>
        )}
      </div>

      {/* Tailwind Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          section { padding: 0 !important; }
          .shadow-2xl { shadow: none !important; }
        }
      `}</style>
    </section>
  );
}