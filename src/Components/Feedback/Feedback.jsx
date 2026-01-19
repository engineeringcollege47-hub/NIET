'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Feedback() {
  const feedbacks = [
    {
      name: 'Amit Sharma',
      course: 'B.Tech Computer Science',
      rating: 5,
      message:
        'The faculty is very supportive and industry oriented. I gained real practical knowledge.',
    },
    {
      name: 'Neha Verma',
      course: 'MBA',
      rating: 4,
      message:
        'Great learning environment with modern infrastructure and strong placement support.',
    },
    {
      name: 'Rahul Singh',
      course: 'Diploma Engineering',
      rating: 5,
      message:
        'Best institute for technical education. Concepts are explained very clearly.',
    },
    {
      name: 'Pooja Patel',
      course: 'BBA',
      rating: 4,
      message:
        'Amazing overall experience. Helped me build confidence and communication skills.',
    },
  ];

  return (
    <section className="py-8 md:py-16 ">
      <div className="max-w-6xl mx-auto px-2 md:px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block mb-2 px-4 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full">
            Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Student Feedback
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {feedbacks.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="
                h-full bg-white/80 backdrop-blur
                rounded-xl border border-slate-200
                p-5 transition-all duration-300
             
              ">

                {/* Quote */}
                <div className="text-3xl text-orange-500/30 leading-none mb-2">“</div>

                {/* Message */}
                <p className="text-slate-700 text-sm leading-relaxed line-clamp-4 mb-4">
                  {item.message}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < item.rating ? 'text-orange-500' : 'text-slate-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* User */}
                <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                  <div className="
                    w-9 h-9 rounded-full
                    bg-gradient-to-br from-orange-500 to-orange-600
                    text-white flex items-center justify-center
                    text-sm font-semibold
                  ">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.course}
                    </p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
