import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Certificate from "@/app/model/CertificateModel";
import AdmissionModel from "@/app/model/AdmissionModel";

/* =========================
   RANDOM CERTIFICATE NUMBER HELPERS
========================= */
function generateRandomCertificateNumber(length = 6) {
  const min = Math.pow(10, length - 1); // e.g. 100000
  const max = Math.pow(10, length) - 1; // e.g. 999999

  const number = Math.floor(min + Math.random() * (max - min + 1));
  return `CERT-${number}`;
}


async function getUniqueCertificateNumber() {
  let certificateNumber;
  let exists = true;

  while (exists) {
    certificateNumber = generateRandomCertificateNumber();
    exists = await Certificate.exists({ certificateNumber });
  }

  return certificateNumber;
}

/* =========================
   POST → CREATE / UPDATE CERTIFICATE
========================= */
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    /* =========================
       REQUIRED FIELDS
    ========================= */
    const requiredFields = [
      "enrollmentNo",
      "name",
      "tradename",
      "fatherName",
      "dob",
      "institute",
      "year",
      "issueDate",
      "place",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    /* =========================
       CHECK EXISTING CERTIFICATE
    ========================= */
    const existingCert = await Certificate.findOne({
      enrollmentNo: data.enrollmentNo,
    });

    /* =========================
       PREPARE PAYLOAD
    ========================= */
    const payload = {
      enrollmentNo: data.enrollmentNo,
      tradename:data.tradename,
      name: data.name,
      fatherName: data.fatherName,
      motherName: data.motherName || "",
      dob: new Date(data.dob),
      institute: data.institute,
      profileimage: data.profileimage || "",
      district: data.district || "",
      state: data.state || "",
      year: data.year,
      issueDate: new Date(data.issueDate),
      place: data.place,
      status: data.status || "PUBLISHED",
    };

    // 🔑 Generate RANDOM certificate number ONLY on create
    if (!existingCert) {
      payload.certificateNumber = await getUniqueCertificateNumber();
    }

    /* =========================
       SAVE / UPDATE CERTIFICATE
    ========================= */
    const certificate = await Certificate.findOneAndUpdate(
      { enrollmentNo: data.enrollmentNo },
      { $set: payload },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    /* =========================
       UPDATE ADMISSION STATUS
    ========================= */
    await AdmissionModel.findOneAndUpdate(
      { enrollmentNumber: data.enrollmentNo },
      { $set: { certificateStatus: true } }
    );

    /* =========================
       SUCCESS RESPONSE
    ========================= */
    return NextResponse.json(
      {
        message: "✅ Certificate saved successfully",
        id: certificate._id,
        certificateNumber: certificate.certificateNumber,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Certificate save error:", error);

    // 🔐 Handle duplicate key error safely
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Duplicate certificate number. Please retry." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Failed to save certificate" },
      { status: 500 }
    );
  }
}
