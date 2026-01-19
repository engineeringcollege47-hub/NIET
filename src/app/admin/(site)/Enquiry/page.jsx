'use client';

import { useEffect, useState } from 'react';

export default function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 10;

  const fetchContacts = async (pageNumber = page) => {
    setLoading(true);

    const res = await fetch(
      `/api/contact?page=${pageNumber}&limit=${LIMIT}`,
      { cache: 'no-store' }
    );

    const result = await res.json();

    setContacts(result.data || []);
    setTotalPages(result.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  const deleteContact = async (id) => {
    const ok = confirm('Are you sure you want to delete this enquiry?');
    if (!ok) return;

    await fetch('/api/contact', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    fetchContacts(page);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-800">
          Contact Enquiries
        </h1>
        <span className="text-sm text-slate-500">
          Page {page} of {totalPages}
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-slate-500">
          Loading enquiries...
        </div>
      )}

      {/* Empty */}
      {!loading && contacts.length === 0 && (
        <div className="text-center py-10 bg-white rounded-xl shadow">
          <p className="text-slate-500">No enquiries found.</p>
        </div>
      )}

      {/* Desktop Table */}
      {!loading && contacts.length > 0 && (
        <div className="hidden lg:block bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4">{c.phone}</td>
                  <td className="p-4 max-w-xs truncate">
                    {c.message}
                  </td>
                  <td className="p-4">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteContact(c._id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Cards */}
      {!loading && contacts.length > 0 && (
        <div className="grid gap-4 lg:hidden">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-xl shadow p-4"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm text-slate-500">{c.email}</p>
                </div>
                <button
                  onClick={() => deleteContact(c._id)}
                  className="text-red-600 text-sm font-semibold"
                >
                  Delete
                </button>
              </div>

              <p className="text-sm mt-2">
                <strong>Phone:</strong> {c.phone}
              </p>

              <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                {c.message}
              </p>

              <p className="text-xs text-slate-400 mt-2">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg border text-sm
                ${
                  page === i + 1
                    ? 'bg-slate-900 text-white'
                    : 'bg-white hover:bg-slate-200'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
