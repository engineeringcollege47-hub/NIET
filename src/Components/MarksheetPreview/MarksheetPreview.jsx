"use client";

import React, { useState } from "react";

import Image from 'next/image';




const numberToWords = (num) => {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (num === 0) return "Zero";

  if (num < 20) return a[num];
  if (num < 100)
    return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
  if (num < 1000)
    return a[Math.floor(num / 100)] + " Hundred " + (num % 100 ? numberToWords(num % 100) : "");
  if (num < 100000)
    return numberToWords(Math.floor(num / 1000)) + " Thousand " + (num % 1000 ? numberToWords(num % 1000) : "");

  return num.toString();
};

export default function MarksheetPreview({ marksheet }) {
  const [view, setView] = useState("front"); // front | back

  if (!marksheet) return null;

  // Default values to ensure the preview looks good even without full data
  const subjects = marksheet.subjects || [
    { code: "ES501", subject: "Industrial Devices & Control", max: 100, min: 40, practicle: 0, marks: 66 },
  ];

  // 🔹 Dynamic Calculations
  const maxTotal = subjects.reduce((sum, s) => sum + Number(s.max || 0), 0);
  const practicleTotal = subjects.reduce((sum, s) => sum + Number(s.practicle || 0), 0);
  const minTotal = subjects.reduce((sum, s) => sum + Number(s.min || 0), 0);
  const grandTotal = subjects.reduce((sum, s) => sum + Number(s.marks || 0), 0);

  const data = {
    rollNumber: marksheet.rollNumber || "-----",
    dob: marksheet.dob || "-----",
    enrollment: marksheet.enrollment || "",
    examiner: marksheet.examiner || "",
    semester: marksheet.semester || "--",
    title1: marksheet.title1 || "----",
    title2: marksheet.title2 || "---",
    city: marksheet.city || "---",
    status: marksheet.status || "---",
    session: marksheet.session || "---",
    name: marksheet.name || "---",
    fatherName: marksheet.fatherName || "--",
    issueDate: marksheet.issueDate || "-",

    subjects,
    semestersmark: marksheet.semestersmark || "",

    maxTotal,
    practicleTotal,
    minTotal,
    grandTotal,

    result: marksheet.result || (grandTotal >= minTotal ? "PASS" : "FAIL"),
    grade: marksheet.grade || "A",
    marksInWords:
      marksheet.marksInWords ||
      `${numberToWords(grandTotal)}`,

    description:
      marksheet.description ||
      "This marksheet is issued based on the performance of the student in the above-mentioned examination. All information has been compiled from the records maintained by the institution. Any tampering, overwriting, or unauthorised alteration will render this marksheet null and void. The marks and results are subject to verification from the original records held with the Controller of Examination."
  };
  const handlePrint = () => {
    window.print();
  };
  const finalSemMarks = data.grandTotal;

  const semesterTotal = data.semestersmark.reduce(
    (sum, s) => sum + Number(s.totalMarks || 0),
    0
  );

  const pgrandTotal = semesterTotal + finalSemMarks;

  const semesterCount = data.semestersmark.length;
  const finalMaxTotal = data.maxTotal * semesterCount + data.maxTotal;

  return (
    <>
      <div
        className="w-full  max-w-[210mm]  mx-auto  relative z-0"
      >
        <div className="flex gap-2 justify-center mb-4 print:hidden">
          <button
            onClick={() => setView("front")}
            className={`px-4 py-1.5 text-sm font-semibold rounded 
      ${view === "front" ? "bg-orange-600 text-white" : "bg-gray-200"}`}
          >
            Front
          </button>

          <button
            onClick={() => setView("back")}
            className={`px-4 py-1.5 text-sm font-semibold rounded 
      ${view === "back" ? "bg-orange-600 text-white" : "bg-gray-200"}`}
          >
            Back
          </button>
        </div>

        <button className='print:hidden' onClick={handlePrint}>Print</button>
        {view === "front" && (
          <div className="print-page"
            style={{
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            }}
          >
            <div className="bg-[#5c3a21b7] p-0.5 rounded-sm shadow-[0_4px_15px_rgba(0,0,0,0.3)]">

              <div className="bg-[#cba35800] p-0.75 border border-[#8c6239]">

                <div className="bg-[#fbf9ea] p-0.5 border border-[#5c3a21]">
                  <div className="border-[3px] border-double border-[#8c6239]/60 relative overflow-hidden">
                    <div className="absolute top-0 font-bold right-1 text-[8px] text-gray-800">
                      Sr.NO: <span className='text-[12px] '> {marksheet?._id?.replace(/\D/g, "").slice(0, 6)}</span>
                    </div>
                    <div className="absolute bottom-0 font-semibold right-0 left-0 text-center text-xs text-gray-800">
                      To verify your mark sheet please send details on: nieat.in
                    </div>

                    <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                      <div
                        className="
      
      flex flex-wrap
    "

                      >
                        {Array.from({ length: 1400 }).map((_, i) => (
                          <span key={i} className="m-1 text-xs select-none text-gray-400">
                            NIET
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className='absolute bottom-15 flex items-center justify-center font-semibold right-0 left-0'>
                      <Image
                        src="/img/rcvt.png"
                        alt="Watermark Seal"
                        className="object-contain "
                        height={80}
                        width={80}
                      />
                    </div>

                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
                      <Image
                        src="/images/mainmain.png"
                        alt="Watermark Seal"
                        className="object-contain opacity-20 "
                        height={600}
                        width={600}
                      />
                    </div>

                    <div className="p-6 relative z-10 font-serif text-[#332211]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>

                      <div className="text-center mb-5 relative">
                        <div className="relative flex items-center mb-4">

                          <div className="absolute left-0 flex items-center mt-8">
                            <Image
                              src="/images/mainmain.png"
                              alt="Watermark Seal"
                              height={150}
                              width={150}
                              className=' opacity-80'
                            />
                          </div>

                          <div className="mx-auto text-center">
                            <h1
                              className="text-xl sm:text-2xl font-bold text-[#3d2616] tracking-wide uppercase leading-tight"

                            >
                              national Institute of <br></br> engineering & technology
                            </h1>
                            <p className="text-[9px] sm:text-[10px] font-bold text-[#1a365d] mt-1 tracking-wider">
                              ISO 9001 : 2015 CERTIFIED INTERNATIONAL B-SCHOOL
                            </p>
                          </div>

                        </div>


                        <div className="flex justify-center mt-4 relative z-20">
                          <div className="bg-linear-to-b from-[#e67e22] to-[#d35400] text-white font-bold px-14 py-1.5 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.2)] border-b-2 border-[#a04000] uppercase tracking-[0.2em] text-sm">
                            Marksheet
                          </div>
                        </div>
                      </div>

                      {/* STUDENT DETAILS GRID (Top) */}
                      <div className="border-[1.5px] border-[#5c3a21] text-[11px] font-bold mb-5 shadow-sm bg-[#fffdfa]/40">
                        <div className="grid grid-cols-4 text-center divide-x-[1.5px] divide-[#5c3a21] border-b-[1.5px] border-[#5c3a21] bg-[#f3e5d0] text-[#5c3a21] tracking-wider">
                          <div className="py-1.5">ROLL NO.</div>
                          <div className="py-1.5">ENROLLMENT NO</div>
                          <div className="py-1.5">YEAR</div>
                          <div className="py-1.5">SESSION EXAMINATION</div>
                        </div>
                        <div className="grid grid-cols-4 text-center divide-x-[1.5px] divide-[#5c3a21] font-semibold">
                          <div className="py-2">{data.rollNumber}</div>
                          <div className="py-2">{data.enrollment}</div>
                          <div className="py-2">{data.semester}</div>
                          <div className="py-2">{data.session}</div>
                        </div>
                      </div>

                      {/* COURSE TITLE */}
                      <div className="text-center mb-5">
                        <h2 className="text-lg font-bold text-[#3d2616] underline decoration-[1.5px] underline-offset-4">
                          {data.title1} <br /> ({data.title2})
                        </h2>
                      </div>

                      {/* NAME SECTION */}
                      <div className="flex justify-between text-[11px] font-bold mb-4 uppercase px-1 tracking-wide">
                        <div>

                          <div className="flex items-end">
                            <span className="text-[#5c3a21] mr-2 whitespace-nowrap">NAME :</span>
                            <span className="border-b-[1.5px] border-dotted border-[#5c3a21] min-w-55 inline-block text-center pb-0.5 text-[12px]">{data.name}</span>
                          </div>
                          <div className="flex items-end">
                            <span className="text-[#5c3a21] mr-2 whitespace-nowrap">FATHER:</span>
                            <span className="border-b-[1.5px] border-dotted border-[#5c3a21] min-w-55 inline-block text-center pb-0.5 text-[12px]">{data.fatherName}</span>
                          </div>
                        </div>
                        <div className="flex items-end">
                          <span className="text-[#5c3a21] mr-2 whitespace-nowrap">DOB :</span>
                          <span className="border-b-[1.5px] border-dotted border-[#5c3a21] min-w-55 inline-block text-center pb-0.5 text-[12px]">
                            {data?.dob
                              ? new Date(data.dob).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              : ""}
                          </span>
                        </div>


                      </div>

                      <table className="w-full border-collapse border-[1.5px] border-[#5c3a21] text-[10px] font-medium mb-0 bg-[#fffdfa]/40 table-fixed">
                        <thead>
                          <tr className="bg-[#f3e5d0] text-center font-bold text-[#5c3a21] tracking-wider uppercase">
                            <th className="border-[1.5px] border-[#5c3a21] py-2 w-[8%]">S.No</th>
                            <th className="border-[1.5px] border-[#5c3a21] py-2 w-[12%]">Code</th>
                            <th className="border-[1.5px] border-[#5c3a21] py-2 text-left pl-4 w-[40%]">Subject (s) / Paper (s)</th>
                            <th className="border-[1.5px] border-[#5c3a21] py-2 w-[12%] leading-tight text-[9px]">Max<br />Marks</th>
                            <th className="border-[1.5px] border-[#5c3a21] py-2 w-[12%] leading-tight text-[9px]">Min<br />Passing</th>
                            <th className="border-[1.5px] border-[#5c3a21] py-2 w-[12%] leading-tight text-[9px]">Practicle</th>
                            <th className="border-[1.5px] border-[#5c3a21] py-2 w-[16%] leading-tight text-[9px]">Marks<br />Obtained</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.subjects.map((s, i) => (
                            <tr key={i} className="text-center h-9 hover:bg-orange-50/30 transition-colors">
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/30 border-l-[1.5px] border-l-[#5c3a21] py-1 font-bold">
                                {String(i + 1).padStart(2, '0')}.
                              </td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/30 py-1 tracking-tighter">
                                {s.code}
                              </td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/30 py-1 text-left font-semibold pl-4 uppercase text-[11px] truncate">
                                {s.subject}
                              </td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/30 py-1 bg-[#f3e5d0]/20 font-semibold">
                                {s.max}
                              </td>

                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/30 py-1">
                                {s.min}
                              </td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/30 py-1 bg-[#f3e5d0]/20 font-semibold">
                                {s.practicle}
                              </td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/30 py-1 font-bold text-[12px] ">
                                {s.marks}
                              </td>
                            </tr>
                          ))}

                          {[...Array(Math.max(0, 10 - data.subjects.length))].map((_, i) => (
                            <tr key={`empty-${i}`} className="h-9">
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/10 border-l-[1.5px] border-l-[#5c3a21]"></td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/10"></td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/10"></td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/10 bg-[#f3e5d0]/10"></td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/10"></td>
                              <td className="border-r-[1.5px] border-b border-[#5c3a21]/10"></td>
                            </tr>
                          ))}

                          {/* TOTALS SECTION */}
                          <tr className="border-[1.5px] border-[#5c3a21] font-bold bg-[#f3e5d0] shadow-inner">
                            <td colSpan={3} className="text-right py-2.5 pr-4 border-r-[1.5px] border-[#5c3a21] uppercase text-[10px] tracking-widest">
                              Grand Total (Current Semester / Year)
                            </td>
                            <td className="border-r-[1.5px] border-[#5c3a21] text-center text-[12px]">
                              {data.maxTotal}
                            </td>
                            <td className="border-r-[1.5px] border-[#5c3a21] text-center text-[12px]">
                              {data.minTotal}
                            </td>
                            <td className="border-r-[1.5px] border-[#5c3a21] text-center text-[12px]">
                              {data.practicleTotal}
                            </td>
                            <td className="text-center text-[14px]  text-[#5c3a21]">
                              {data.grandTotal}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="border-[1.5px] border-t-0 border-[#5c3a21] text-[10px] font-bold p-1.5 flex justify-between items-center bg-[#f3e5d0] mb-2 shadow-sm">
                        <div className="flex gap-6 uppercase tracking-wider">
                          <span>RESULT : <span className="text-black">{data.result}</span></span>
                          <span className="ml-6">GRADE : <span className="text-black">"{data.grade}"</span></span>
                        </div>
                        <span className="uppercase italic text-black text-[11px]">
                          {data.marksInWords} Only
                        </span>

                      </div>
                      <div className="flex justify-end">
                        <div className="inline-block border border-[#5c3a21]/30 rounded-md overflow-hidden">

                          {/* HEADER */}
                          <div className="flex text-[11px] font-semibold text-gray-800">
                            {data.semestersmark.map((s, i) => (
                              <div
                                key={i}
                                className="min-w-[90px] px-2 py-1 text-center border-r border-[#5c3a21]/30"
                              >
                                {data.status === "PUBLISHED"
                                  ? s.name.replace(/Year/i, "Sem")
                                  : s.name.replace(/Sem/i, "Year")}
                              </div>
                            ))}


                            <div className="min-w-[90px] px-2 py-1 text-center border-r border-[#5c3a21]/30">
                              {data.status === "PUBLISHED" ? "Final Sem" : "Final Year"}
                            </div>

                            <div className="min-w-[100px] px-2 py-1 text-center font-bold">
                              Total
                            </div>
                          </div>

                          {/* VALUES */}
                          <div className="flex text-[11px] font-semibold text-gray-700 border-t border-[#5c3a21]/30">
                            {data.semestersmark.map((s, i) => (
                              <div
                                key={i}
                                className="min-w-[90px] px-2 py-1 text-center border-r border-[#5c3a21]/30"
                              >
                                {s.totalMarks}
                              </div>
                            ))}

                            {/* FINAL SEM MARKS */}
                            <div className="min-w-[90px] px-2 py-1 text-center border-r border-[#5c3a21]/30">
                              {finalSemMarks}
                            </div>

                            {/* GRAND TOTAL */}
                            <div className="min-w-[100px] px-2 py-1 text-center font-bold text-black">
                              {pgrandTotal} / {finalMaxTotal}
                            </div>
                          </div>

                        </div>
                      </div>


                      <div className="flex justify-between items-end text-[11px] mt-20 py-20 px-2 relative">
                        <div>
                          <p className="font-bold mb-1 text-[#5c3a21] uppercase tracking-wider">{data.city} Date of Issue :</p>
                          <p className="font-semibold pl-2">
                            {new Date(data.issueDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>

                        </div>

                        <div className="flex flex-col items-center justify-end relative min-w-37.5">
                          <p className="font-bold border-t-[1.5px] border-[#5c3a21] pt-1 text-[#5c3a21] uppercase tracking-wider w-full text-center">Controller of Examination</p>
                          <p className="font-bold border-t-[1.5px] border-[#5c3a21] pt-1 text-[#5c3a21] uppercase tracking-wider w-full text-center">{data.examiner},{data.city}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {view === "back" && (

          <div className="print-page page-break"
            style={{
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            }}
          >
            <div
              className="w-full max-w-[210mm] h-[297mm]  mx-auto relative z-0"
              style={{
                WebkitPrintColorAdjust: "exact",
                printColorAdjust: "exact",
                pageBreakBefore: "always",
              }}
            >
              <div className="bg-[#5c3a21] p-0.5  rounded-sm shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                <div className="bg-[#cba35800] p-0.75  border border-[#8c6239]">
                  <div className="bg-[#fbf9ea]  p-0.5 border border-[#5c3a21]">
                    <div className="border-[3px] h-[297mm] border-double border-[#8c6239]/60 relative overflow-hidden">

                      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                        <div
                          className="
      
      flex flex-wrap
    "

                        >
                          {Array.from({ length: 1400 }).map((_, i) => (
                            <span key={i} className="m-1 text-xs select-none text-gray-400">
                              NIET
                            </span>
                          ))}
                        </div>
                      </div>


                      <div className="absolute inset-0 z-[-1] flex items-center justify-center pointer-events-none overflow-hidden">
                        <Image
                          src="/images/1600w-Aro9ea9TDP4-removebg-preview.png"
                          alt="Watermark Seal"
                          className=" w-48 h-48 sm:w-64 sm:h-64 object-contain"
                          height={50}
                          width={50}
                        />
                      </div>

                      <div
                        className="p-6 h-full relative z-10 font-serif text-[#332211]"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                      >
                        <div className="py-16 flex flex-col justify-between h-full">

                          {/* HEADER */}
                          <div>
                            <div className="text-center mb-10">
                              <h2 className="text-xl font-bold text-[#3d2616] uppercase tracking-[0.15em]">
                                Important Information, Rules & Regulations
                              </h2>
                              <p className="text-xs mt-3 text-[#5c3a21] tracking-wide leading-relaxed">
                                This page constitutes an essential and legally binding component of the official
                                Statement of Marks issued by the institution.
                              </p>
                            </div>

                            {/* BODY */}
                            <div className="text-[11px] leading-relaxed text-justify space-y-5">

                              <p className="indent-8">
                                {data.description}
                              </p>

                              {/* I */}
                              <div>
                                <h3 className="font-bold uppercase tracking-wide text-[#3d2616] mb-1">
                                  I. Examination & Evaluation Process
                                </h3>
                                <ul className="list-decimal pl-6 space-y-1">
                                  <li>
                                    The assessment of candidates has been conducted strictly in accordance with
                                    the curriculum, examination ordinances, and academic regulations approved by
                                    the competent academic authorities of the institution.
                                  </li>
                                  <li>
                                    The marks indicated include theory, practical, internal assessment, and
                                    continuous evaluation components, wherever applicable.
                                  </li>
                                  <li>
                                    Moderation, grace marks, or scaling, if any, have been applied as per approved
                                    institutional norms.
                                  </li>
                                </ul>
                              </div>

                              {/* II */}
                              <div>
                                <h3 className="font-bold uppercase tracking-wide text-[#3d2616] mb-1">
                                  II. Declaration of Result
                                </h3>
                                <ul className="list-decimal pl-6 space-y-1">
                                  <li>
                                    The result displayed herein is provisional at the time of publication and is
                                    subject to verification with institutional records.
                                  </li>
                                  <li>
                                    The declaration of pass, fail, distinction, or division is governed by the
                                    prevailing examination rules of the institution.
                                  </li>
                                  <li>
                                    Successful completion of the examination does not by itself confer any right
                                    to admission, employment, or award of degree unless formally notified.
                                  </li>
                                </ul>
                              </div>

                              {/* III */}
                              <div>
                                <h3 className="font-bold uppercase tracking-wide text-[#3d2616] mb-1">
                                  III. Revaluation, Rechecking & Grievance Redressal
                                </h3>
                                <ul className="list-decimal pl-6 space-y-1">
                                  <li>
                                    Applications for revaluation, rechecking, or scrutiny of answer scripts shall be
                                    entertained only within the stipulated timeframe and subject to prescribed fees.
                                  </li>
                                  <li>
                                    The outcome of revaluation shall be final and binding, and no further
                                    correspondence shall be entertained in this regard.
                                  </li>
                                  <li>
                                    Any grievance related to result publication must be submitted through official
                                    channels only.
                                  </li>
                                </ul>
                              </div>

                              {/* IV */}
                              <div>
                                <h3 className="font-bold uppercase tracking-wide text-[#3d2616] mb-1">
                                  IV. Authenticity, Verification & Digital Records
                                </h3>
                                <ul className="list-decimal pl-6 space-y-1">
                                  <li>
                                    The digitally stored examination records maintained by the institution shall be
                                    deemed authentic and shall supersede all printed copies in case of discrepancy.
                                  </li>
                                  <li>
                                    Result verification may be carried out through official portals, QR codes, or
                                    authorised verification mechanisms provided by the institution.
                                  </li>
                                  <li>
                                    This marksheet remains invalid if found mutilated, altered, or tampered with in
                                    any manner whatsoever.
                                  </li>
                                </ul>
                              </div>

                              {/* V */}
                              <div>
                                <h3 className="font-bold uppercase tracking-wide text-[#3d2616] mb-1">
                                  V. Issuance of Duplicate & Transcript
                                </h3>
                                <ul className="list-decimal pl-6 space-y-1">
                                  <li>
                                    Duplicate marksheets or academic transcripts shall be issued only upon receipt
                                    of a formal written request along with supporting documents and prescribed fees.
                                  </li>
                                  <li>
                                    The institution shall not be responsible for loss or misuse of this document
                                    after its lawful issuance.
                                  </li>
                                </ul>
                              </div>



                            </div>
                          </div>

                          {/* SIGNATURE */}
                          <div className="flex justify-end mt-24 pr-6">
                            <div className="text-center text-[11px] min-w-[240px]">
                              <p className="border-t-[1.5px] border-[#5c3a21] pt-1 font-bold text-[#5c3a21] uppercase tracking-widest">
                                Signature of candidate
                              </p>

                            </div>
                          </div>

                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}