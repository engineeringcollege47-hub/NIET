import Link from "next/link";
import React from "react";

export default function Card2() {
    return (
        <section className="relative footerbg whychoose">
            {/* TOP HERO SECTION */}
            <div
                className="relative  h-[420px] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/admission-bg.jpg')",
                }}
            >


                {/* Text Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
                        ADMISSION ENQUIRY
                    </h2>

                    <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                        Initially the student is granted only provisional admission which is
                        confirmed after the receipt of valid Transfer Certificate / Migration
                        Certificate and on completion of other relevant admission
                        formalities.
                    </p>

                    <Link href="/contact">
                        <button className="mt-6 px-10 py-3 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
                            CLICK HERE
                        </button>
                    </Link>
                </div>
            </div>

            {/* BOOM / BOTTOM OVERLAP DIV */}
            <div className="relative hidden md:block mt-5">
                <div className="absolute left-1/2 -translate-x-1/2 -top-28 w-[92%] max-w-6xl bg-black/60 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] z-20">

                    <div className="grid grid-cols-5 divide-x divide-gray-100 py-10 px-6 text-center">

                        {/* CARD */}
                        <div className="group px-4 transition-all duration-300 ">
                            <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl shadow-lg group-hover:shadow-orange-300/60">
                                🧪
                                <span className="absolute inset-0 rounded-full ring-4 ring-orange-100 group-hover:ring-orange-200 transition"></span>
                            </div>
                            <p className="font-semibold text-sm tracking-wide text-white group-hover:text-orange-600 transition">
                                INCUBATION CENTER
                            </p>
                        </div>

                        <div className="group px-4 transition-all duration-300 ">
                            <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl shadow-lg group-hover:shadow-orange-300/60">
                                🎓
                                <span className="absolute inset-0 rounded-full ring-4 ring-orange-100 group-hover:ring-orange-200 transition"></span>
                            </div>
                            <p className="font-semibold text-sm tracking-wide text-white group-hover:text-orange-600 transition">
                                SCHOLARSHIP INFORMATION
                            </p>
                        </div>

                        <div className="group px-4 transition-all duration-300 ">
                            <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl shadow-lg group-hover:shadow-orange-300/60">
                                💻
                                <span className="absolute inset-0 rounded-full ring-4 ring-orange-100 group-hover:ring-orange-200 transition"></span>
                            </div>
                            <p className="font-semibold text-sm tracking-wide text-white group-hover:text-orange-600 transition">
                                IIRS OUTREACH PROGRAMS
                            </p>
                        </div>

                        <div className="group px-4 transition-all duration-300 ">
                            <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl shadow-lg group-hover:shadow-orange-300/60">
                                💡
                                <span className="absolute inset-0 rounded-full ring-4 ring-orange-100 group-hover:ring-orange-200 transition"></span>
                            </div>
                            <p className="font-semibold text-sm tracking-wide text-white group-hover:text-orange-600 transition">
                                SKILL BASED PROGRAMS
                            </p>
                        </div>

                        <div className="group px-4 transition-all duration-300 ">
                            <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl shadow-lg group-hover:shadow-orange-300/60">
                                🌱
                                <span className="absolute inset-0 rounded-full ring-4 ring-orange-100 group-hover:ring-orange-200 transition"></span>
                            </div>
                            <p className="font-semibold text-sm tracking-wide text-white group-hover:text-orange-600 transition">
                                ENVIRONMENTAL CONCERN & INNOVATIONS
                            </p>
                        </div>

                    </div>
                </div>
            </div>


            {/* Spacer so content below doesn't overlap */}
            <div className="h-32 hidden md:block"></div>
        </section>
    );
}
