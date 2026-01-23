'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/* 🔹 Skeleton Card */
const CourseSkeleton = () => {
  return (
    <div className="h-[320px] rounded-md overflow-hidden shadow-lg bg-gray-200 animate-pulse relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      <div className="absolute bottom-0 left-0 right-0 px-6 py-3">
        <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/activecourses', { cache: 'no-store' });
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
    <section className="py-8 md:py-20 from-white to-gray-50">
      <div className="container mx-auto px-3 md:px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-2 md:mb-5">
          <h2 className="text-xl md:text-4xl font-extrabold">
            Explore Our Courses
          </h2>

          <Link
            href="/Courses"
            className="flex items-center gap-2 py-1 text-orange-500 font-semibold"
          >
            View All <span className="text-lg">→</span>
          </Link>
        </div>

        {/* 🔹 Skeleton Loader */}
        {loading && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <CourseSkeleton key={i} />
            ))}
          </div>
        )}

        {/* 🔹 Slider */}
        {!loading && courses.length > 0 && (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {courses.map((course, index) => (
              <SwiperSlide key={course._id}>
                <div className="group relative h-[320px] rounded-md overflow-hidden shadow-lg">

                  {/* Image */}
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={index === 0}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20"></div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/90 px-6 py-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1">
                      {course.title}
                    </h3>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
}
