'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/* 🔹 Skeleton Card */
const CourseSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-64 bg-gray-300 relative">
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
          <div className="h-6 w-3/4 mx-auto bg-gray-400 rounded"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        <div className="h-4 w-1/2 mx-auto bg-gray-300 rounded"></div>
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses', { cache: 'no-store' });
        const data = await res.json();
        setCourses(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="bg-gray-50">

      {/* HERO */}
      <section className="footerbg whychoose text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Courses
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-orange-100">
            Discover career-oriented diploma, bachelor, and master programs
            designed to help you achieve professional success.
          </p>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* 🔹 Skeleton */}
            {loading &&
              [...Array(6)].map((_, i) => <CourseSkeleton key={i} />)}

            {/* 🔹 No Data */}
            {!loading && courses.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No courses available right now.
              </p>
            )}

            {/* 🔹 Courses */}
            {!loading &&
              courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  {/* IMAGE */}
                  <div className="relative w-full h-64 bg-gray-200">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />

                    {/* TITLE BAR */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-4 py-4 text-center">
                      <h3 className="text-xl font-bold text-white">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h4 className="text-center font-semibold text-gray-800 mb-4">
                      COURSE DETAILS
                    </h4>

                    <ul className="space-y-3 text-sm text-gray-800">
                      {course.descriptionPoints?.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-red-600">👉</span>
                          <span>
                            <span className="font-medium">{point.title}:</span>{" "}
                          </span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>

    </main>
  );
}
