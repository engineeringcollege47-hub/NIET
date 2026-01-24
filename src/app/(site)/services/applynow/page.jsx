'use client';

import { useState, useEffect } from "react";

export default function ApplyNowPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const formData = new FormData(e.target);

    const res = await fetch("/api/admission", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setEnrollment(data.enrollmentNumber);
      setShowModal(true);
      setSuccess("Query Added Successfully!");
      e.target.reset();
    }



    setLoading(false);
  };
  const fetchCourses = async () => {
    const res = await fetch("/api/activecourses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="min-h-screen bg-[#f4f4f4] py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 text-center relative animate-scaleIn">

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                Admission Successful 🎉
              </h2>

              <p className="text-sm text-slate-500 mb-4">
                Please save your enrollment number for future reference
              </p>

              <div className="border rounded-lg bg-slate-50 p-4 mb-4">
                <p className="text-xs text-slate-500 mb-1">
                  Enrollment Number
                </p>

                <div className="flex justify-center items-center gap-2">
                  <span className="font-mono text-lg font-semibold tracking-wider">
                    {enrollment}
                  </span>

                  <button
                    onClick={() => navigator.clipboard.writeText(enrollment)}
                    className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-2 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6">
          Online Admission
        </h1>

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} >
          <fieldset
            disabled={loading}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Programme */}
            <div>
              <label className="label">Select Programme *</label>

              <select name="programme" required className="input">
                <option value="">-- Select Programme --</option>

                {courses.map((course, i) => (
                  <optgroup key={i} label={course.title}>
                    {course.descriptionPoints.map((dp, j) => (
                      <option
                        key={j}
                        value={`${course.title} - ${dp.title}`}
                      >
                        {dp.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>


            <div>
              <label className="label">Date of Admission *</label>
              <input type="date" name="admissionDate" required className="input" />
            </div>

            <div>
              <label className="label">Name *</label>
              <input name="name" required className="input" />
            </div>

            <div>
              <label className="label">Marital Status</label>
              <select name="maritalStatus" required className="input">
                <option value="">-- Select one --</option>
                <option>Single</option>
                <option>Married</option>
              </select>
            </div>

            <div>
              <label className="label">Father's Name *</label>
              <input name="fatherName" required className="input" />
            </div>



            <div>
              <label className="label">Mother's Name *</label>
              <input name="motherName" required className="input" />
            </div>
            <div>
              <label className="label">Mobile *</label>
              <input name="mobile" required className="input" />
            </div>
            <div>
              <label className="label">Email *</label>
              <input type="email" name="email" required className="input" />
            </div>

            <div>
              <label className="label">Date of Birth *</label>
              <input type="date" name="dob" required className="input" />
            </div>
            <div>
              <label className="label">Gender *</label>
              <select name="gender" required className="input">
                <option value="">-- Select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="label">Profile Image</label>
              <input type="file" required name="profileImage" className="input" />
            </div>

            <div className="md:col-span-2">
              <label className="label">Present Address *</label>
              <textarea name="presentAddress" required className="input h-24" />
            </div>

            <div className="md:col-span-2">
              <label className="label">Academic Details *</label>
              <textarea name="academicDetails" placeholder="Enter Academic Details" required className="input h-24" />
            </div>


            <div>
              <label className="label">Highest Qualification</label>
              <select name="highestQualification" required className="input">
                <option value="">-- Select one --</option>
                <option value="Graduation">Graduation</option>
                <option value="12th">12th</option>
                <option value="10th">10th</option>
                <option value="None">None</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="label">Work Experience</label>
              <input name="workExperience" required className="input" placeholder="Enter Your Work Experience" />
            </div>

            <div>
              <label className="label">Exam Option</label>
              <select name="examOption" required className="input">
                <option value="">-- Select one --</option>
                <option value="Assignment Base">Assignment Base</option>
                <option value="Online Exam">Online Exam</option>
                <option value="Centre Based">Centre Based</option>
              </select>
            </div>

            <div>
              <label className="label">Payment Option</label>
              <select name="paymentOption" required className="input">
                <option value="">-- Select one --</option>
                <option value="Online">Online</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <div className="md:col-span-2 text-center mt-4">
              <button
                disabled={loading}
                className="px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold  cursor-pointer disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      {/* Reusable styles */}
      <style jsx>{`
        .label {
          display: block;
          font-size: 14px;
          margin-bottom: 6px;
          font-weight: 600;
        }
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
        }
          @keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scaleIn {
  animation: scaleIn 0.25s ease-out;
}

      `}</style>
    </section>
  );
}
