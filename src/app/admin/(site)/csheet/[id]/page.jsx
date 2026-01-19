"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import CsheetPreview from "@/Components/CsheetPreview/CsheetPreview";

export default function Page() {
  const params = useParams();
  const enrollmentNo = params.id;

  const [data, setData] = useState({
    enrollmentNo: "",
    name: "",
    fatherName: "",
    tradename: "",
    motherName: "",
    dob: "",
    institute: "",
    profileimage: "",
    district: "",
    state: "",
    year: new Date().getFullYear().toString(),
    issueDate: "",
    place: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH ADMISSION DATA
  ========================= */
  useEffect(() => {
    fetch(`/api/findsingleadmisison/${enrollmentNo}`)
      .then(res => res.json())
      .then(data => {
        setData(prev => ({
          ...prev,
          enrollmentNo: data.enrollmentNumber,
          name: data.name,
          fatherName: data.fatherName,
          tradename: data.tradename,
          motherName: data.motherName,
          dob: data.dob ? data.dob.split("T")[0] : "",
          profileimage: data.profileImage,
        }));
      });
  }, [enrollmentNo]);

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  /* =========================
     VALIDATION
  ========================= */
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "fatherName",
      "tradename",
      "dob",
      "institute",
      "district",
      "state",
      "place",
      "issueDate",
      "year",
    ];

    requiredFields.forEach(field => {
      if (!data[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);

    // Scroll to first error
    const firstError = Object.keys(newErrors)[0];
    if (firstError) {
      document.getElementsByName(firstError)[0]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SAVE
  ========================= */
  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post("/api/certificate", data);
      alert("✅ Certificate Saved Successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "❌ Failed to save certificate"
      );
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const inputClass = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2
    ${errors[field]
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-300 focus:ring-orange-400"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 p-6 gap-6">

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-6">Edit Certificate Details</h2>

        {/* Enrollment */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase">
            Enrollment No
          </label>
          <input
            type="text"
            value={data.enrollmentNo}
            readOnly
            className="w-full bg-gray-100 border rounded-lg px-3 py-2 text-sm font-semibold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

          {["name", "fatherName", "tradename", "motherName", "institute", "district", "state", "place"].map((key) => (
            <div key={key}>
              <label className="block text-xs font-bold uppercase text-gray-500">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={key}
                value={data[key]}
                onChange={handleChange}
                className={inputClass(key)}
              />
              {errors[key] && (
                <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
              )}
            </div>
          ))}

          {["dob", "issueDate"].map((key) => (
            <div key={key}>
              <label className="block text-xs font-bold uppercase text-gray-500">
                {key === "dob" ? "Date of Birth" : "Issue Date"}
              </label>
              <input
                type="date"
                name={key}
                value={data[key]}
                onChange={handleChange}
                className={inputClass(key)}
              />
              {errors[key] && (
                <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500">
              Passing Year
            </label>
            <select
              name="year"
              value={data.year}
              onChange={handleChange}
              className={inputClass("year")}
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            {errors.year && (
              <p className="text-xs text-red-500 mt-1">{errors.year}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg font-bold text-white ${loading ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
            }`}
        >
          {loading ? "Saving..." : "Save Certificate"}
        </button>
      </div>

      {/* PREVIEW */}
      <div className="sticky top-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <div className="bg-white p-2 rounded-xl shadow-lg">
          <CsheetPreview data={data} />
        </div>
      </div>
    </div>
  );
}
