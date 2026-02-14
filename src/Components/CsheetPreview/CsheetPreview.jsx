import React from 'react';
import Image from 'next/image';
export default function CsheetPreview({ data }) {
    // --- STATIC RESOURCES ---
    const emblemUrl = "/images/mainmain.png";

    // --- STATIC DATA (From PDF Source) ---
    const staticData = {
        certTitleHindi: "राष्ट्रीय संस्थान इंजीनियरिंग और प्रौद्योगिकी",
        certTitleEng: "National Institute of Engineering & Technology",
        certifyTextHindi: "प्रमाणित किया जाता है कि",
        certifyTextEng: "This is to certify that",
        ncvetText: "National Institute of Engineering & Technology is an educational institution committed to academic excellence and skill development.",
        disclaimer: "This is a digitally generated certificate issued by National Institute of Engineering & Technology. For verification, please contact the institute administration."

    };

    // Safe defaults if props are missing
    const safeData = {
        name: data?.name || "",
        enrollmentNo: data?.enrollmentNo || "",
        tradename: data?.tradename || "",
        profileimage: data?.profileimage || "",
        fatherName: data?.fatherName || "",
        motherName: data?.motherName || "",
        dob: data?.dob || "",
        institute: data?.institute || "",
        district: data?.district || "",
        state: data?.state || "",
        year: data?.year || "",
        place: data?.place || "",
        issueDate: data?.issueDate || new Date().toLocaleDateString('en-GB'),
        certificateNumber: data?.certificateNumber || "",
    };
    const handlePrint = () => {
        window.print();
    };
    return (
        <>
            <button className='print:hidden' onClick={handlePrint}>Print</button>
            <div className="w-full relative overflow-auto bg-gray-200 py-8 flex justify-center">
                <div className="absolute top-0 bottom-0 left-0 right-0 inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
                    <Image
                        src="/images/mainmain.png"
                        alt="Watermark Seal"
                        className="object-contain opacity-10 grayscale"
                        height={600}
                        width={600}
                    />
                </div>
                {/* FIXED SIZE A4 LANDSCAPE CONTAINER: 1123px x 794px */}
                <div
                    className="bg-white shadow-xl relative mx-auto flex-none"
                    style={{ width: '1123px', height: '794px' }}
                >

                    {/* Border Layer (Orange) */}
                    <div className="w-full h-full p-2">
                        <div className="w-full h-full border-[6px] border-[#d95f02] p-1">
                            {/* Inner Border (Gray) */}
                            <div className="w-full h-full border border-gray-400 p-6 flex flex-col justify-between relative">

                                {/* Background Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none z-0">
                                    <img src={emblemUrl} alt="Watermark" className="w-[400px]" />
                                </div>

                                {/* --- HEADER --- */}
                                <div className="relative z-10 flex justify-between items-start">
                                    {/* Left: Emblem */}
                                    <div className="w-[15%] flex flex-col items-center pt-2">
                                        <img src={safeData.profileimage} alt="Emblem" className="h-36 object-contain" />

                                        {safeData.certificateNumber && (
                                            <p className="text-[11px] font-semibold text-gray-700 mt-2">
                                                Certificate No:{" "}
                                                <p className="text-[#d95f02] font-bold tracking-wide">
                                                    {safeData.certificateNumber}
                                                </p>
                                            </p>
                                        )}
                                    </div>


                                    {/* Center: Titles */}
                                    <div className="w-[70%] text-center flex  flex-col items-center justify-center  h-full pt-1">


                                        {/* Sub-titles / Department Info */}
                                        <h3 className="text-[13px] font-semibold text-gray-800 leading-tight">
                                            तकनीकी एवं व्यावसायिक प्रशिक्षण विभाग
                                        </h3>
                                        <h3 className="text-[11px] font-semibold text-gray-800 uppercase leading-tight mb-2">
                                            Department of Technical and Vocational Training
                                        </h3>

                                        <h3 className="text-[13px] font-bold text-gray-700 leading-tight">
                                            परीक्षा एवं प्रमाणन बोर्ड
                                        </h3>
                                        <h3 className="text-[11px] font-bold text-gray-700 uppercase leading-tight">
                                            Board of Examination and Certification
                                        </h3>
                                    </div>



                                    <div className="w-[15%] flex flex-col items-center pt-2">
                                        <img src={emblemUrl} alt="Emblem" className="h-36 object-contain" />
                                        {safeData.enrollmentNo && (
                                            <p className="text-[11px] font-semibold text-gray-700 mt-2">
                                                Enrollment No:{" "}
                                                <p className="text-[#d95f02] font-bold tracking-wide">
                                                    {safeData.enrollmentNo}
                                                </p>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* --- CERTIFICATE TITLE --- */}
                                <div className="relative z-10 text-center mt-2 mb-2">
                                    <h1 className="text-2xl font-bold text-[#d95f02] uppercase tracking-wide leading-tight">
                                        {staticData.certTitleHindi} <br /> {staticData.certTitleEng}
                                    </h1>
                                </div>

                                {/* --- BODY --- */}
                                <div className="relative z-10 flex-grow px-8 mt-2">

                                    <div className="text-center text-sm italic text-gray-600 mb-4">
                                        {staticData.certifyTextHindi} / {staticData.certifyTextEng}
                                    </div>

                                    {/* Personal Details Grid (Fixed Layout) */}
                                    <div className="grid grid-cols-2 gap-x-16 gap-y-3 mb-4">
                                        {/* Name */}
                                        <div className="flex items-end border-b border-gray-300 pb-1">
                                            <div className="text-xs text-gray-600 w-48 leading-tight">
                                                श्री/श्रीमती/कुमारी<br />Shri/Smt/Kumari
                                            </div>
                                            <div className="font-bold text-lg text-blue-900 uppercase flex-grow">
                                                {safeData.name}
                                            </div>
                                        </div>

                                        {/* Father Name */}
                                        <div className="flex items-end border-b border-gray-300 pb-1">
                                            <div className="text-xs text-gray-600 w-48 leading-tight">
                                                पुत्र/पत्नी/पुत्री श्री<br />Son/Wife/Daughter of Shri
                                            </div>
                                            <div className="font-bold text-base text-gray-900 uppercase flex-grow">
                                                {safeData.fatherName}
                                            </div>
                                        </div>

                                        {/* Mother Name */}
                                        <div className="flex items-end border-b border-gray-300 pb-1">
                                            <div className="text-xs text-gray-600 w-48 leading-tight">
                                                माता का नाम श्रीमती<br />Mother's name Smt.
                                            </div>
                                            <div className="font-bold text-base text-gray-900 uppercase flex-grow">
                                                {safeData.motherName}
                                            </div>
                                        </div>

                                        {/* DOB */}
                                        <div className="flex items-end border-b border-gray-300 pb-1">
                                            <div className="text-xs text-gray-600 w-48 leading-tight">
                                                जन्म तिथि<br />Date of Birth
                                            </div>
                                            <div className="font-bold text-base text-gray-900 uppercase flex-grow">
                                                {safeData?.dob
                                                    ? (() => {
                                                        const date = new Date(safeData.dob);
                                                        const months = [
                                                            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                                                        ];

                                                        const day = String(date.getDate()).padStart(2, "0");
                                                        const month = months[date.getMonth()];
                                                        const year = date.getFullYear();

                                                        return `${day} ${month} ${year}`;
                                                    })()
                                                    : ""}
                                            </div>




                                        </div>

                                    </div>


                                    {/* Institute Details */}
                                    <div className="space-y-3 mt-4">
                                        <div className="flex items-end border-b border-gray-300 pb-1">
                                            <div className="text-xs text-gray-600 whitespace-nowrap mr-2"> व्यवसाय का नाम / Trade Name</div>
                                            <div className="font-bold text-sm text-gray-900 uppercase flex-grow"> {safeData.tradename}</div>
                                        </div>

                                        <div className="flex items-end border-b border-gray-300 pb-1">
                                            <div className="text-xs text-gray-600 whitespace-nowrap mr-2">संस्था का नाम / Name of the Institute:</div>
                                            <div className="font-bold text-sm text-gray-900 uppercase flex-grow">{safeData.institute}</div>
                                        </div>

                                        <div className="flex gap-8">
                                            <div className="flex-1 flex items-end border-b border-gray-300 pb-1">
                                                <div className="text-xs text-gray-600 whitespace-nowrap mr-2">पता / Address (District):</div>
                                                <div className="font-bold text-sm text-gray-900 uppercase flex-grow">{safeData.district}</div>
                                            </div>
                                            <div className="w-1/3 flex items-end border-b border-gray-300 pb-1">
                                                <div className="text-xs text-gray-600 whitespace-nowrap mr-2">राज्य / State:</div>
                                                <div className="font-bold text-sm text-gray-900 uppercase flex-grow">{safeData.state}</div>
                                            </div>
                                        </div>


                                    </div>

                                    {/* Certification Statement */}
                                    <div className="mt-5 text-sm text-justify leading-relaxed text-gray-800">
                                        <p>
                                            को परीक्षा <strong>{safeData.year}</strong> में उत्तीर्ण होने पर यह  प्रमाण-पत्र प्रदान किया गया है।
                                        </p>
                                        <p className="italic text-gray-600 text-xs mt-1">
                                            having passed <strong>{safeData.year}</strong> is hereby awarded this  Certificate.
                                        </p>
                                    </div>
                                </div>

                                {/* --- FOOTER --- */}
                                <div className="relative z-10 mt-auto pt-4">
                                    <div className="flex justify-between items-end px-4">
                                        {/* Left: Place/Date */}
                                        <div className="text-center w-1/4">
                                            <p className="font-bold text-sm mb-4">{safeData.place}</p>
                                            <div className="border-t border-gray-400 pt-1">
                                                <p className="text-[10px] text-gray-500">दिनांक / Date</p>
                                                <p className="font-bold text-sm">
                                                    {(() => {
                                                        const date = new Date(safeData.issueDate);
                                                        const day = date.getDate();
                                                        const year = date.getFullYear();
                                                        const month = date.toLocaleString("en-GB", { month: "short" }).slice(0, 3);
                                                        return `${day} ${month} ${year}`;
                                                    })()}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Right: Controller Signature */}
                                        <div className="text-center w-1/4">
                                            <div className="h-12 w-full flex items-end justify-center mb-1">
                                                {/* <span className="font-script text-blue-900 text-xl opacity-70">Controller.Sig</span> */}
                                            </div>
                                            <div className="border-t border-gray-400 pt-1">
                                                <p className="font-bold text-sm">परीक्षा नियंत्रक</p>
                                                <p className="font-bold text-xs uppercase">Controller of Examination</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="mt-4 pt-2 border-t border-gray-200 text-center">
                                        <p className="text-[9px] font-semibold text-gray-600">{staticData.ncvetText}</p>
                                        <p className="text-[9px] text-gray-400 mt-1">* {staticData.disclaimer}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Print Styles */}
                    <style>{`
          @media print {
            @page { size: landscape; margin: 0; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
          .font-script { font-family: 'Brush Script MT', cursive; }
        `}</style>
                </div>
            </div>
        </>
    );
}