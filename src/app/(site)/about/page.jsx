import React from 'react'
import Welcome from '@/Components/Welcome/Welcome'
import Link from 'next/link'

export default function page() {
  return (
    <div>
      <main>

        {/* HERO SECTION */}
        <section className="relative footerbg whychoose">
          <div className="max-w-7xl mx-auto px-2 md:px-4 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Our Institute
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-orange-100">
              The National Institute of Engineering & Technology is committed to
              shaping future engineers and professionals through quality education
              and innovative learning methods.
            </p>
          </div>
        </section>

        {/* ABOUT INTRO */}
        <section className="md:py-20 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* LEFT CONTENT */}
              <div>
                <span className="inline-block mb-3 px-4 py-1 text-xs font-semibold 
                text-orange-600 bg-orange-100 rounded-full">
                  About NIEAT
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
                  Who We Are
                </h2>

                <p className="text-slate-600 leading-relaxed md:mb-4 mb-2">
                  The National Institute of Engineering & Technology is an autonomous
                  institution focused on delivering excellence in engineering,
                  technical, and professional education. We emphasize skill-based,
                  industry-aligned learning to meet modern career demands.
                </p>

                <p className="text-slate-600 leading-relaxed">
                  Our goal is to empower students with strong technical knowledge,
                  practical exposure, and career-ready skills that enable long-term
                  professional growth and success.
                </p>
              </div>

              {/* RIGHT CARD */}
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-10">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                  <span className="text-orange-600">Key</span> Highlights
                </h3>

                <ul className="space-y-4">
                  {[
                    'Autonomous Engineering Institute',
                    'Modern Technical Programs',
                    'Industry-Oriented Curriculum',
                    'Experienced Faculty',
                    'Career-Focused Learning Environment',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-600">
                      <span className="w-6 h-6 flex items-center justify-center 
                      rounded-full bg-orange-100 text-orange-600 text-sm font-bold">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-orange-50 py-16">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ['15+', 'Years of Academic Excellence'],
              ['40K+', 'Students Trained'],
              ['80+', 'Technical Programs'],
              ['Nationwide', 'Student Presence'],
            ].map(([value, label], i) => (
              <div key={i}>
                <p className="text-2xl md:text-4xl font-bold text-orange-600">{value}</p>
                <p className="text-slate-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="footerbg123 flex flex-col justify-center items-center text-black py-20 text-center">
          <h2 className="text-3xl text-white font-bold mb-4 px-3 py-1 rounded-lg   inline bg-black/80">
            Build Your Future with NIEAT
          </h2>
          <p className="text-white px-3 py-1 rounded-lg   inline  bg-black/80 mb-8">
            Join The National Institute of Engineering & Technology and take the
            next step toward a successful technical career.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-orange-600 px-8 py-3 rounded-full font-semibold text-white"
          >
            Contact Admissions
          </Link>
        </section>

        {/* VISION & MISSION */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-orange-600 text-sm font-semibold">
                Our Purpose
              </span>
              <h2 className="text-3xl font-bold mt-2">
                Vision & Mission
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-8 rounded-2xl shadow bg-slate-50">
                <h3 className="text-xl font-semibold mb-3">
                  <span className="text-orange-600">Our</span> Vision
                </h3>
                <p className="text-slate-600">
                  To be a nationally recognized institute in engineering and
                  technology education by fostering innovation, research, and
                  academic excellence.
                </p>
              </div>

              <div className="p-8 rounded-2xl shadow bg-slate-50">
                <h3 className="text-xl font-semibold mb-3">
                  <span className="text-orange-600">Our</span> Mission
                </h3>
                <p className="text-slate-600">
                  To provide industry-relevant education, hands-on technical
                  training, and a supportive learning environment that prepares
                  students for global career opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
