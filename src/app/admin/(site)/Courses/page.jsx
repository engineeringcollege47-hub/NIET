'use client';

import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    image: null,
    descriptionPoints: [{ title: "", code: "" }],
  });

  // ================= FETCH =================
  const fetchCourses = async () => {
    const res = await fetch("/api/courses");
    const data = await res.json();
    setCourses(data || []);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ================= CREATE / UPDATE =================
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);

      if (form.image) {
        data.append("image", form.image);
      }

      data.append(
        "descriptionPoints",
        JSON.stringify(
          form.descriptionPoints.filter(
            (d) => d.title.trim() && d.code.trim()
          )
        )
      );

      if (editing) data.append("_id", editing);

      await fetch("/api/courses", {
        method: editing ? "PUT" : "POST",
        body: data,
      });

      closeModal();
      fetchCourses();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT =================
  const editCourse = (c) => {
    setEditing(c._id);
    setForm({
      title: c.title,
      image: null,
      descriptionPoints: c.descriptionPoints?.length
        ? c.descriptionPoints
        : [{ title: "", code: "" }],
    });
    setImagePreview(c.image);
    setShowModal(true);
  };

  // ================= DELETE =================
  const deleteCourse = async () => {
    if (loading) return;
    if (!confirm("Are you sure you want to delete this course?")) return;

    setLoading(true);
    try {
      await fetch("/api/courses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: editing }),
      });

      closeModal();
      fetchCourses();
    } finally {
      setLoading(false);
    }
  };

  // ================= CLOSE MODAL =================
  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setImagePreview(null);
    setForm({
      title: "",
      image: null,
      descriptionPoints: [{ title: "", code: "" }],
    });
  };

  return (
    <div className="p-4 md:p-6 bg-slate-100 min-h-screen flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Courses</h1>
        <button
          disabled={loading}
          onClick={() => setShowModal(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          + Add Course
        </button>
      </div>

      {/* COURSE LIST */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {courses.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-xl shadow overflow-hidden flex flex-col"
            >
              <img
                src={c.image}
                alt={c.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold">{c.title}</h3>

                <ul className="list-disc ml-4 text-sm text-slate-600 mt-2 flex-1">
                  {c.descriptionPoints?.map((d, i) => (
                    <li key={i}>
                      <span className="font-medium">{d.title}:</span>{" "}
                      <span className="text-slate-500">{d.code}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => editCourse(c)}
                  className="mt-4 text-sm bg-slate-800 text-white px-3 py-1 rounded self-end"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2">
          <div className="bg-white w-full max-w-lg rounded-xl flex flex-col max-h-[90vh]">

            {/* MODAL HEADER */}
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                {editing ? "Update Course" : "Add Course"}
              </h2>
            </div>

            {/* MODAL BODY */}
            <div className="p-4 overflow-y-auto space-y-3">
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Course Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              {/* IMAGE */}
              <label className="block border-2 border-dashed rounded-xl p-3 cursor-pointer text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="h-36 w-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-slate-500">Click to upload image</span>
                )}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setForm({ ...form, image: file });
                    setImagePreview(URL.createObjectURL(file));
                  }}
                />
              </label>

              {/* DESCRIPTION POINTS */}
              {form.descriptionPoints.map((d, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <input
                    className="border rounded-lg p-2"
                    placeholder="Course Name"
                    value={d.title}
                    onChange={(e) => {
                      const arr = [...form.descriptionPoints];
                      arr[i].title = e.target.value;
                      setForm({ ...form, descriptionPoints: arr });
                    }}
                  />
                  <input
                    className="border rounded-lg p-2"
                    placeholder="Course Code"
                    value={d.code}
                    onChange={(e) => {
                      const arr = [...form.descriptionPoints];
                      arr[i].code = e.target.value;
                      setForm({ ...form, descriptionPoints: arr });
                    }}
                     readOnly={!!editing}
                  />
                </div>
              ))}

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    descriptionPoints: [
                      ...form.descriptionPoints,
                      { title: "", code: "" },
                    ],
                  })
                }
                className="text-orange-600 text-sm"
              >
                + Add Point
              </button>
            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 border-t flex justify-between items-center">
              {editing && (
                <button
                  disabled={loading}
                  onClick={deleteCourse}
                  className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Delete
                </button>
              )}

              <div className="flex gap-2 ml-auto">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-slate-200 rounded"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50"
                >
                  {loading
                    ? editing
                      ? "Updating..."
                      : "Creating..."
                    : editing
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
