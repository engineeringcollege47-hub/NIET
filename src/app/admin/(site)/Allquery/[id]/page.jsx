"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [edit, setEdit] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const fetchCourses = async () => {
    const res = await fetch("/api/courses/findlist"); // ✅ your modified API
    const result = await res.json();
    setCourses(result);
  };

  /* ======================
     FETCH
  ====================== */
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`/api/findsingleadmisison/${id}`);
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchCourses();
  }, [id]);


  /* ======================
     UPDATE
  ====================== */
  const handleUpdate = async () => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "profileImage") {
        formData.append(key, data[key]);
      }
    });

    if (newImage) {
      formData.append("profileImage", newImage);
    }

    const res = await fetch("/api/findsingleadmisison/update", {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Admission updated successfully");
      setEdit(false);
      setNewImage(null);
      fetchData();
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Admission Details</h1>
          <p className="text-sm text-gray-500">
            Enrollment: <span className="font-medium">{data.enrollmentNumber}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setEdit(!edit)}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      {/* Profile Image */}
      <div className="flex flex-wrap items-center gap-6 mb-10">
        <img
          src={newImage ? URL.createObjectURL(newImage) : data.profileImage}
          className="w-28 h-28 rounded-full object-cover border"
        />

        {edit && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
        )}
      </div>



      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Field label="Approvel Status">
          {edit ? (
            <select
              value={data.isActive || ""}
              onChange={(e) =>
                setData({ ...data, isActive: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            >
              <option disabled>Select</option>
              <option value="true">Not Approve</option>
              <option value="false">Approve</option>
            </select>
          ) : (
            <View>{data.isActive ? "Not Approve" : "Approveed"}</View>
          )}
        </Field>


        {/* Programme */}
        <Field label="Programme">
          {edit ? (
            <select
              value={data.programme}
              onChange={(e) =>
                setData({ ...data, programme: e.target.value })
              }
              className="border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            >
              <option value="">Select Programme</option>

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
          ) : (
            <View>{data.programme}</View>
          )}
        </Field>


        <Field label="Date of Admission">
          {edit ? (
            <input
              type="date"
              value={data.admissionDate?.slice(0, 10)}
              onChange={(e) => setData({ ...data, admissionDate: e.target.value })}
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{new Date(data.admissionDate).toLocaleDateString()}</View>
          )}
        </Field>

        <Field label="Name" >
          {edit ? (
            <input
              type="text"
              value={data.name}
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{data.name}</View>
          )}
        </Field>
        {/* Marital */}
        <Field label="Marital Status">
          {edit ? (
            <select
              value={data.maritalStatus || ""}
              onChange={(e) =>
                setData({ ...data, maritalStatus: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            >
              <option value="">Select</option>
              <option>Single</option>
              <option>Married</option>
            </select>
          ) : (
            <View>{data.maritalStatus || "-"}</View>
          )}
        </Field>

        <Field label="Father Name" >
          {edit ? (
            <input
              type="text"
              value={data.fatherName}
              onChange={(e) =>
                setData({ ...data, fatherName: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{data.fatherName}</View>
          )}
        </Field>



        <Field label="Mother Name" >
          {edit ? (
            <input
              type="text"
              value={data.motherName}
              onChange={(e) =>
                setData({ ...data, motherName: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{data.motherName}</View>
          )}

        </Field>

        <Field label="Mobile Number" >
          {edit ? (
            <input
              type="text"
              value={data.mobile}
              onChange={(e) =>
                setData({ ...data, mobile: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{data.mobile}</View>
          )}

        </Field>


        <Field label="Email Id" >
          {edit ? (
            <input
              type="email"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{data.email}</View>
          )}

        </Field>


        <Field label="Date of Birth">
          {edit ? (
            <input
              type="date"
              value={data.dob?.slice(0, 10)}
              onChange={(e) => setData({ ...data, dob: e.target.value })}
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{new Date(data.dob).toLocaleDateString()}</View>
          )}
        </Field>
        {/* Gender */}
        <Field label="Gender">
          {edit ? (
            <select
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          ) : (
            <View>{data.gender}</View>
          )}
        </Field>






        {/* Addresses */}
        <Field label="Present Address" full>
          {edit ? (
            <textarea
              value={data.presentAddress}
              onChange={(e) =>
                setData({ ...data, presentAddress: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{data.presentAddress}</View>
          )}
        </Field>

        <Field label="Academic Details" full>
          {edit ? (
            <textarea
              value={data.academicDetails}
              onChange={(e) =>
                setData({ ...data, academicDetails: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{data.academicDetails}</View>
          )}
        </Field>


        <Field label="Highest Qualification">
          {edit ? (
            <select
              value={data.highestQualification}
              onChange={(e) => setData({ ...data, highestQualification: e.target.value })}
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            >
              <option>Graduation</option>
              <option>12th</option>
              <option>10th</option>
              <option>None</option>
            </select>
          ) : (
            <View>{data.highestQualification}</View>
          )}
        </Field>

        <Field label="Work Experience" full>
          {edit ? (
            <textarea
              value={data.workExperience}
              onChange={(e) =>
                setData({ ...data, workExperience: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            />
          ) : (
            <View>{data.workExperience}</View>
          )}
        </Field>

        {/* Exam Option */}
        <Field label="Exam Option">
          {edit ? (
            <select
              value={data.examOption || ""}
              onChange={(e) =>
                setData({ ...data, examOption: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            >
              <option value="">Select</option>
              <option>Assignment Base</option>
              <option>Online Exam</option>
              <option>Centre Based</option>
            </select>
          ) : (
            <View>{data.examOption || "-"}</View>
          )}
        </Field>

        {/* Payment Option */}
        <Field label="Payment Option">
          {edit ? (
            <select
              value={data.paymentOption || ""}
              onChange={(e) =>
                setData({ ...data, paymentOption: e.target.value })
              }
              className=" border border-orange-600 focus:ring-orange-600 rounded px-3 py-2 w-full"
            >
              <option value="">Select</option>
              <option>Online</option>
              <option>Cash</option>
              <option>Cheque</option>
            </select>
          ) : (
            <View>{data.paymentOption || "-"}</View>
          )}
        </Field>
      </div>

      {/* SAVE */}
      {edit && (
        <div className="mt-10 text-right">
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-orange-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

/* ======================
   UI HELPERS
====================== */

const Field = ({ label, children, full }) => (
  <div className={full ? "md:col-span-2 flex flex-col" : " flex flex-col"}>
    <label className="text-sm text-gray-500">{label}</label>
    {children}
  </div>
);

const View = ({ children }) => (
  <div className="mt-1 px-3 py-2 bg-gray-100 rounded border text-gray-800">
    {children}
  </div>
);
