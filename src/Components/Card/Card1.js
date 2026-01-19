import React from "react";

const options = [
  { title: "PUBLICATION / AWARDS", icon: "📢", color: "from-blue-500 to-cyan-400" },
  { title: "RESEARCH", icon: "🔍", color: "from-purple-500 to-indigo-500" },
  { title: "SEMINARS & WORKSHOPS", icon: "👨‍🏫", color: "from-orange-400 to-red-500" },
  { title: "COLLABORATION", icon: "🤝", color: "from-green-400 to-emerald-600" },
  { title: "ALUMNI", icon: "🎓", color: "from-pink-500 to-rose-500" },
  { title: "E-CONTENT", icon: "📄", color: "from-amber-400 to-yellow-600" },
  { title: "STUDENT GRIEVANCE", icon: "📝", color: "from-teal-400 to-cyan-600" },
  { title: "ONLINE SERVICES", icon: "💻", color: "from-blue-600 to-indigo-700" },
  { title: "RTI CELL", icon: "👥", color: "from-slate-500 to-slate-700" },
  { title: "IQAC / NAAC / NIRF", icon: "🎥", color: "from-violet-500 to-fuchsia-600" },
  { title: "EXTENSION ACTIVITY", icon: "🖼️", color: "from-orange-500 to-amber-600" },
  { title: "GALLERY", icon: "📷", color: "from-rose-400 to-orange-400" },
];

export default function Card1() {
  return (
    <div className=" bg-[#f8fafc] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
        
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Explore Our <span className="text-transparent bg-clip-text bg-orange-600 ">Resources</span>
          </h1>
          <div className="h-1.5 w-20 bg-orange-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {options.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center 
                         border border-slate-100 shadow-sm transition-all duration-300 ease-out
                         hover:shadow-2xl hover:-translate-y-2 hover:border-orange-200"
            >
              {/* Floating Background Accent on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Icon Container */}
              <div className="relative z-10 w-16 h-16 mb-4 flex items-center justify-center rounded-2xl bg-slate-50 
                              group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-inner">
                <span className="text-4xl filter drop-shadow-sm">{item.icon}</span>
              </div>

              {/* Title */}
              <p className="relative z-10 text-xs md:text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-300 uppercase tracking-wide">
                {item.title}
              </p>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-orange-500 transition-all duration-300 group-hover:w-1/2 rounded-t-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}