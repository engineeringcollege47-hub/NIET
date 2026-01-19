"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ======================
   FILTER CONFIG
====================== */
const FILTER_FIELDS = [
  { key: "name", label: "Name", type: "text" },
  { key: "mobile", label: "Mobile", type: "text" },
  { key: "email", label: "Email", type: "text" },
  { key: "programme", label: "Programme", type: "text" },
  { key: "paymentStatus", label: "Payment Status", type: "boolean" },
  { key: "enrollStatus", label: "Enroll Status", type: "boolean" },
];

export default function Page() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔹 Applied Filters
  const [filters, setFilters] = useState({});

  // 🔹 Filter Builder
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  /* ======================
     FETCH DATA
  ====================== */
  const fetchAdmissions = async () => {
    setLoading(true);

    let url = `/api/admission?page=${page}&limit=10&isActive=false`;

    Object.entries(filters).forEach(([key, value]) => {
      url += `&${key}=${encodeURIComponent(value)}`;
    });

    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();

    setAdmissions(json.data || []);
    setTotalPages(json.pagination?.totalPages || 1);
    setLoading(false);
  };

  /* ======================
     AUTO FETCH (FIXED BUG)
  ====================== */
  useEffect(() => {
    fetchAdmissions();
  }, [page, filters]);

  /* ======================
     ADD FILTER
  ====================== */
  const addFilter = () => {
    if (!selectedField || selectedValue === "") return;

    setFilters((prev) => ({
      ...prev,
      [selectedField]: selectedValue,
    }));

    setSelectedField("");
    setSelectedValue("");
    setPage(1);
  };

  /* ======================
     REMOVE FILTER
  ====================== */
  const removeFilter = (key) => {
    setFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    setPage(1);
  };

  const activeField = FILTER_FIELDS.find(
    (f) => f.key === selectedField
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Admissions</h1>
        <p className="text-sm text-slate-500">
          Advanced filter & manage admissions
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border rounded-lg p-4 mb-6 flex flex-col lg:flex-row gap-4">

        {/* LEFT – FILTER BUILDER */}
        <div className="flex flex-wrap items-end gap-3">

          {/* FIELD */}
          <select
            value={selectedField}
            onChange={(e) => {
              setSelectedField(e.target.value);
              setSelectedValue("");
            }}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select Filter</option>
            {FILTER_FIELDS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>

          {/* VALUE */}
          {selectedField && activeField?.type === "text" && (
            <input
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              placeholder={`Enter ${activeField.label}`}
              className="border rounded-md px-3 py-2 text-sm"
            />
          )}

          {selectedField && activeField?.type === "boolean" && (
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          )}

          <button
            onClick={addFilter}
            className="px-4 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
          >
            Add Filter
          </button>
        </div>

        {/* RIGHT – ACTIVE FILTERS */}
        <div className="flex flex-wrap gap-2 lg:ml-auto">
          {Object.entries(filters).map(([key, value]) => {
            const label =
              FILTER_FIELDS.find((f) => f.key === key)?.label || key;

            return (
              <span
                key={key}
                className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-sm"
              >
                {label}:{" "}
                <strong>
                  {value === "true"
                    ? "Yes"
                    : value === "false"
                      ? "No"
                      : value}
                </strong>

                <button
                  onClick={() => removeFilter(key)}
                  className="ml-1 text-orange-600 hover:text-red-600"
                >
                  ✕
                </button>
              </span>
            );
          })}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Enrollment</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">DOB</th>
              <th className="px-4 py-3">Programme</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Enroll</th>
              <th className="px-4 py-3">Certificate</th>
              <th className="px-4 py-3">Marksheet</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && admissions.length === 0 && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  No records found
                </td>
              </tr>
            )}

            {admissions.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-3 font-medium">
                  {item.enrollmentNumber}
                </td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">
                  {item.dob
                    ? new Date(item.dob).toLocaleDateString("en-GB")
                    : "-"}
                </td>

                <td className="px-4 py-3">{item.programme}</td>
                <td className="px-4 py-3">{item.mobile}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${item.paymentStatus
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {item.paymentStatus ? "Paid" : "Pending"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${item.enrollStatus
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {item.enrollStatus ? "Enrolled" : "Not Enrolled"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {item.paymentStatus && item.enrollStatus ? (
                    item.certificateStatus ? (
                      <div className="flex gap-3">
                        {/* UPDATE LINK */}
                        <Link
                          href={`/admin/csheet/${item.enrollmentNumber}`}
                          className="text-green-600 font-medium hover:underline"
                        >
                          Update
                        </Link>

                        {/* CHECK LINK */}
                        <Link
                          href={`/admin/csheet`}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Check
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={`/admin/csheet/${item.enrollmentNumber}`}
                        className="text-green-600 font-medium hover:underline"
                      >
                        Generate Certificate
                      </Link>
                    )
                  ) : (
                    <span className="text-gray-400 cursor-not-allowed">
                      {item.certificateStatus ? "Certificate" : "Generate Certificate"}
                    </span>
                  )}
                </td>



                <td className="px-4 py-3">
                  {item.paymentStatus && item.enrollStatus ? (
                    item.marksheetStatus ? (
                      <div className="flex gap-3">
                        {/* UPDATE LINK */}
                        <Link
                          href={`/admin/msheet/${item.enrollmentNumber}`}
                          className="text-green-600 font-medium hover:underline"
                        >
                          Update
                        </Link>

                        {/* CHECK LINK */}
                        <Link
                          href={`/admin/msheet`}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Check
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={`/admin/msheet/${item.enrollmentNumber}`}
                        className="text-green-600 font-medium hover:underline"
                      >
                        Generate Marksheet
                      </Link>
                    )
                  ) : (
                    <span className="text-gray-400 cursor-not-allowed">
                      {item.marksheetStatus ? "Marksheet" : "Generate Marksheet"}
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <Link href={`./Admission/${item.enrollmentNumber}`} className="text-orange-600 hover:underline">
                    Action
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
