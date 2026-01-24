"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MarksheetPreview from "@/Components/MarksheetPreview/MarksheetPreview";
export default function MarksheetPage() {
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const SEMESTER_OPTIONS = [
    "1st Sem",
    "2nd Sem",
    "3rd Sem",
    "4th Sem",
    "5th Sem",
    "6th Sem",
    "7th Sem",
    "8th Sem",
  ];

  /* ======================
     MAIN SINGLE OBJECT
  ====================== */
  const [marksheet, setMarksheet] = useState({
    name: "",
    fatherName: "",
    dob: "",
    rollNumber: "",
    profileImage: "",
    enrollment: "",
    session: "",
    semester: "Final Year",
    examiner: "",
    issueDate: new Date().toISOString().split("T")[0],
    title1: "",   // ✅ NEW
    title2: "",   // ✅ NEW
    city: "",   // ✅ NEW
    status: "",   // ✅ NEW
    subjects: [],
    semestersmark: [],
    total: 0,
    maxTotal: 0,
    percentage: 0,
    grade: "",
    marksInWords: "",
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const handleSaveMarksheet = async () => {
    try {
      setSaving(true);

      const res = await fetch("/api/marksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(marksheet),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save");
        return;
      }

      alert("✅ Marksheet saved successfully");
    } catch (err) {
      alert("❌ Error saving marksheet");
    } finally {
      setSaving(false);
    }
  };
  /* ======================
     FETCH COURSES
  ====================== */
  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(course => ({
          _id: course._id,
          title: course.title,
          subjects: course.descriptionPoints.map(sub => ({
            title: sub.title,
            code: sub.code,
          }))

        }));
        setCourses(formatted);
      });
  }, []);

  /* ======================
     FETCH STUDENT
  ====================== */
  useEffect(() => {
    fetch(`/api/findsingleadmisison/${id}`)
      .then(res => res.json())
      .then(data => {
        setMarksheet(prev => ({
          ...prev,
          name: data.name,
          fatherName: data.fatherName,
          dob: data.dob,
          rollNumber: data.rollNumber,
          profileImage: data.profileImage,
          enrollment: data.enrollmentNumber,
        }));
      });
  }, [id]);

  /* ======================
     NUMBER → WORDS
  ====================== */
  const numberToWords = (num) => {
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
      "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
      "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (num === 0) return "Zero";
    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
    if (num < 1000)
      return a[Math.floor(num / 100)] + " Hundred" +
        (num % 100 ? " " + numberToWords(num % 100) : "");
    return num.toString();
  };

  /* ======================
     UPDATE SUBJECT MARKS
  ====================== */
  const updateSubject = (code, field, value) => {
    setMarksheet(prev => {
      const updatedSubjects = prev.subjects.map(s =>
        s.code === code ? { ...s, [field]: Number(value) } : s
      );

      const total = updatedSubjects.reduce((t, s) => t + s.marks, 0);
      const maxTotal = updatedSubjects.reduce((t, s) => t + s.max, 0);
      const percentage = maxTotal
        ? ((total / maxTotal) * 100).toFixed(2)
        : 0;

      const grade =
        percentage >= 75 ? "A" :
          percentage >= 60 ? "B" :
            percentage >= 45 ? "C" : "D";

      return {
        ...prev,
        subjects: updatedSubjects,
        total,
        maxTotal,
        percentage,
        grade,
        marksInWords: numberToWords(total),
      };
    });
  };


  /* ======================
     PREPARE SUBJECTS
  ====================== */
  useEffect(() => {
    const subjects = [];

    selectedCourseIds.forEach(courseId => {
      const course = courses.find(c => c._id === courseId);
      const subs = selectedSubjects[courseId] || [];

      subs.forEach(sub => {
        if (!subjects.find(s => s.subject === sub)) {
          subjects.push({
            subject: sub.title,
            code: sub.code,
            min: 40,
            max: 100,
            practicle: 0,
            marks: 0,
          });

        }
      });
    });

    setMarksheet(prev => ({ ...prev, subjects }));
  }, [selectedCourseIds, selectedSubjects]);


  const addSemester = () => {
    setMarksheet(prev => ({
      ...prev,
      semestersmark: [
        ...prev.semestersmark,
        { name: "", totalMarks: "" },
      ],
    }));
  };

  const updateSemester = (index, field, value) => {
    setMarksheet(prev => {
      const updated = [...prev.semestersmark];
      updated[index][field] =
        field === "totalMarks" ? Number(value) : value;

      return { ...prev, semestersmark: updated };
    });
  };

  const removeSemester = (index) => {
    setMarksheet(prev => ({
      ...prev,
      semestersmark: prev.semestersmark.filter((_, i) => i !== index),
    }));
  };


  /* ======================
     UI
  ====================== */
  return (
    <div className="grid md:grid-cols-2 gap-8 p-8 bg-slate-100 min-h-screen">

      {/* LEFT PANEL */}
      <div className="space-y-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSaveMarksheet}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold
               hover:bg-orange-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Marksheet"}
          </button>
        </div>

        {/* ADDITIONAL DETAILS */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-5 text-gray-800">
            Marksheet Details
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Session */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Academic Session
              </label>

              <input
                type="text"
                placeholder="e.g. 2024-25"
                value={marksheet.session}
                maxLength={7}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9]/g, "");

                  // Auto add dash after 4 digits
                  if (value.length > 4) {
                    value = value.slice(0, 4) + "-" + value.slice(4, 6);
                  }

                  setMarksheet({ ...marksheet, session: value });
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
               focus:outline-none focus:ring-2 focus:ring-orange-400
               focus:border-orange-400"
              />
            </div>


            {/* Semester */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Semester
              </label>
              <input
                type="text"
                placeholder="e.g. 5th Semester"
                value={marksheet.semester}
                onChange={(e) =>
                  setMarksheet({ ...marksheet, semester: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-orange-400
                   focus:border-orange-400"
              />
            </div>
            {/* SEMESTER MARKS */}


            {/* Examiner */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Controller of examination
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. R. K. Sharma"
                value={marksheet.examiner}
                onChange={(e) =>
                  setMarksheet({ ...marksheet, examiner: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-orange-400
                   focus:border-orange-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                value={marksheet.city}
                onChange={(e) =>
                  setMarksheet({ ...marksheet, city: e.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            {/* Issue Date */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Date of Issue
              </label>
              <input
                type="date"
                value={marksheet.issueDate}
                onChange={(e) =>
                  setMarksheet({ ...marksheet, issueDate: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-orange-400
                   focus:border-orange-400"
              />
            </div>
            {/* Title 1 */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Title 1
              </label>
              <input
                type="text"
                placeholder="e.g. BOARD OF TECHNICAL EDUCATION"
                value={marksheet.title1}
                onChange={(e) =>
                  setMarksheet({ ...marksheet, title1: e.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            {/* Title 2 */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Title 2
              </label>
              <input
                type="text"
                placeholder="e.g. STATEMENT OF MARKS"
                value={marksheet.title2}
                onChange={(e) =>
                  setMarksheet({ ...marksheet, title2: e.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Semester / Year
            </label>

            <select
              value={marksheet.status}
              onChange={(e) =>
                setMarksheet({ ...marksheet, status: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="">Select</option>
              <option value="PUBLISHED">Semester</option>
              <option value="DRAFT">Year</option>
            </select>
          </div>

          <div className="bg-white p-6 rounded-2xl border mt-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Semester-wise Total Marks
              </h2>

              <button
                onClick={addSemester}
                className="px-4 py-1.5 text-sm rounded-lg
      bg-green-600 text-white hover:bg-green-700"
              >
                + Add Semester / Year
              </button>
            </div>

            <div className="space-y-4">
              {marksheet.semestersmark.map((sem, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-3 items-end border p-3 rounded-lg"
                >
                  {/* Semester Name */}
                  <div className="col-span-5">
                    <label className="text-sm text-gray-600">Semester/Year</label>
                    <select
                      value={sem.name}
                      onChange={(e) =>
                        updateSemester(index, "name", e.target.value)
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm
            focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">Select Semester/Year</option>
                      {SEMESTER_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Total Marks */}
                  <div className="col-span-5">
                    <label className="text-sm text-gray-600">Total Marks</label>
                    <input
                      type="number"
                      min="0"
                      value={sem.totalMarks}
                      onChange={(e) =>
                        updateSemester(index, "totalMarks", e.target.value)
                      }
                      className="w-full border rounded-lg px-3 py-2 text-sm
            focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  {/* Remove */}
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={() => removeSemester(index)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {marksheet.semestersmark.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  No semester/Year added yet
                </p>
              )}
            </div>
          </div>
        </div>


        {/* COURSE SELECT */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Select Subjects</h2>

          {courses.map(course => (
            <div key={course._id} className="border p-3 mb-2 rounded">
              <label className="font-semibold flex gap-2">
                <input
                  type="checkbox"
                  checked={selectedCourseIds.includes(course._id)}
                  onChange={e =>
                    setSelectedCourseIds(prev =>
                      e.target.checked
                        ? [...prev, course._id]
                        : prev.filter(id => id !== course._id)
                    )
                  }
                />
                {course.title}
              </label>

              {selectedCourseIds.includes(course._id) && (
                <div className="ml-5 mt-2">
                  {course.subjects.map(sub => (
                    <label key={sub.code} className="flex gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={
                          selectedSubjects[course._id]?.some(s => s.code === sub.code) || false
                        }
                        onChange={e => {
                          const prev = selectedSubjects[course._id] || [];
                          const updated = e.target.checked
                            ? [...prev, sub]
                            : prev.filter(s => s.code !== sub.code);

                          setSelectedSubjects({
                            ...selectedSubjects,
                            [course._id]: updated,
                          });
                        }}
                      />
                      {sub.code} - {sub.title}
                    </label>
                  ))}

                </div>
              )}
            </div>
          ))}
        </div>

        {/* MARKS INPUT */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold text-sm mb-3 text-gray-800">
            Enter Subject Marks
          </h2>

          {/* TABLE HEADER */}
          <div className="grid grid-cols-5 gap-2 text-[11px] font-semibold text-gray-600 mb-2">
            <div>Subject</div>
            <div className="text-center">Min</div>
            <div className="text-center">Max</div>
            <div className="text-center">Prac</div>
            <div className="text-center">Marks</div>
            <div></div>
          </div>

          {marksheet.subjects.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-2 items-center mb-2"
            >
              {/* Subject */}
              <input
                value={`${s.code} - ${s.subject}`}
                disabled
                className="border rounded-md px-2 py-1 text-[11px]
        bg-gray-100 text-gray-700"
              />

              {/* Min */}
              <input
                type="number"
                value={s.min}
                onChange={e => updateSubject(s.code, "min", e.target.value)}
                className="border rounded-md px-2 py-1 text-[11px]
        text-center focus:ring-1 focus:ring-orange-400"
              />

              {/* Max */}
              <input
                type="number"
                value={s.max}
                onChange={e => updateSubject(s.code, "max", e.target.value)}
                className="border rounded-md px-2 py-1 text-[11px]
        text-center focus:ring-1 focus:ring-orange-400"
              />

              {/* Practical */}
              <input
                type="number"
                value={s.practicle || ""}
                onChange={e => updateSubject(s.code, "practicle", e.target.value)}
                className="border rounded-md px-2 py-1 text-[11px]
        text-center focus:ring-1 focus:ring-orange-400"
              />

              {/* Marks */}
              <input
                type="number"
                value={s.marks}
                onChange={e => updateSubject(s.code, "marks", e.target.value)}
                className="border rounded-md px-2 py-1 text-[11px]
        text-center font-medium focus:ring-1 focus:ring-orange-400"
              />


            </div>
          ))}
        </div>

      </div>

      <MarksheetPreview marksheet={marksheet} />
    </div>
  );
}
