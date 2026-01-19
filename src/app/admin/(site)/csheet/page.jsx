'use client';

import { useEffect, useState } from "react";
import CsheetPreview from "@/Components/CsheetPreview/CsheetPreview";
export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarksheet, setSelectedMarksheet] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ======================
     FETCH DATA
  ====================== */
  const fetchData = async (reset = false) => {
    setLoading(true);

    const res = await fetch(
      `/api/certificate/find?page=${page}&limit=10&search=${search}&status=${status}`,
      { cache: "no-store" }
    );

    const result = await res.json();
    setData(result.data || []);
    setTotalPages(result.pagination?.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  /* ======================
     APPLY FILTER
  ====================== */
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  /* ======================
     REMOVE FILTER
  ====================== */
  const handleReset = () => {
    setSearch("");
    setStatus("");
    setPage(1);

    // fetch without filters
    setTimeout(() => fetchData(), 0);
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Certificate Records</h1>

      {/* 🔍 Filters */}
      <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search name / enrollment"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-64"
        />
        {/* 
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select> */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded"
        >
          Apply
        </button>

        {/* ❌ REMOVE FILTER */}
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-200 text-gray-800 px-6 rounded hover:bg-gray-300"
        >
          Remove Filter
        </button>
      </form>

      {/* 📋 Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        {loading ? (
          <p className="p-6">Loading...</p>
        ) : data.length === 0 ? (
          <p className="p-6">No records found</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Certificate Number</th>
                <th className="p-3">fatherName</th>
                <th className="p-3">DOB</th>
                <th className="p-3">Rnrollment No</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((m) => (
                <tr key={m._id} className="border-t">
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3 font-medium">{m.certificateNumber}</td>
                  <td className="p-3">{m.fatherName}</td>
                  <td className="p-3">
                    {m.dob ? new Date(m.dob).toLocaleDateString("en-GB") : "-"}
                  </td>

                  <td className="p-3">{m.enrollmentNo}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${m.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedMarksheet(m);
                        setOpenPreview(true);
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Check
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* 🔍 MARKSHEET PREVIEW MODAL */}
      {openPreview && selectedMarksheet && (
        <div className="fixed inset-0 z-50 bg-gray-100 overflow-auto">

          {/* ❌ Floating Close Button */}
          <button
            onClick={() => setOpenPreview(false)}
            className="fixed print:hidden top-4 right-4 z-50 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100"
          >
            ✕
          </button>

          {/* 📄 FULL PAGE MARKSHEET */}
          <div className=" flex justify-center border ">
            <CsheetPreview data={selectedMarksheet} />
          </div>

        </div>
      )}


      {/* 📄 Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page <b>{page}</b> of <b>{totalPages}</b>
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
