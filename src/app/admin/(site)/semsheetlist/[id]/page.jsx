"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SemmarksheetPreview from "@/Components/SemmarksheetPreview/SemmarksheetPreview";
import Link from "next/link";
export default function Page() {
    const { id } = useParams();

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
            `/api/semstersheet/findallbyuser?enrollment=${id}`,
            { cache: "no-store" }
        );

        const result = await res.json();
        setData(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [id]);

  

const handleDelete = async (enrollment, semester) => {
    const confirmed = window.confirm(
        `Are you sure you want to delete Semester ${semester} marksheet?`
    );

    if (!confirmed) return;

    try {
        setLoading(true);

        const res = await fetch(
            `/api/semstersheet/delete/?enrollment=${enrollment}&semester=${semester}`,
            { method: "DELETE" }
        );

        const result = await res.json();

        if (!res.ok) {
            alert(result.message || "Failed to delete marksheet");
            return;
        }

        alert("Marksheet deleted successfully");
        fetchData(); // refresh list
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="p-6 bg-slate-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Semester Marksheet Records</h1>


            <Link href={`/admin/semsheet/${id}`} className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Create New Marksheet
            </Link>
            {/* 🔍 Filters */}


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
                                <th className="p-3">Roll</th>
                                <th className="p-3">Enrollment</th>
                                <th className="p-3">Semester</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">%</th>
                                <th className="p-3">Grade</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((m) => (
                                <tr key={m._id} className="border-t">
                                    <td className="p-3 font-medium">{m.name}</td>
                                    <td className="p-3">{m.rollNumber}</td>
                                    <td className="p-3">{m.enrollment}</td>
                                    <td className="p-3">{m.semester}</td>
                                    <td className="p-3">{m.total}</td>
                                    <td className="p-3">{m.percentage}%</td>
                                    <td className="p-3 font-semibold">{m.grade}</td>

                                  <td className="p-3 flex gap-3">
    <button
        onClick={() => {
            setSelectedMarksheet(m);
            setOpenPreview(true);
        }}
        className="text-blue-600 hover:underline font-medium"
    >
        Check
    </button>

    <button
        onClick={() => handleDelete(m.enrollment, m.semester)}
        className="text-red-600 hover:underline font-medium"
    >
        Delete
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
                        <SemmarksheetPreview marksheet={selectedMarksheet} />
                    </div>

                </div>
            )}


            {/* 📄 Pagination */}
       
        </div>
    );
}
