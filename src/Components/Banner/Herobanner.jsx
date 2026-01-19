'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';

export default function Herobanner() {
    const slides = [
        {
            title: 'ADMISSION OPEN',
            desc: 'Enroll now for Engineering (BE / ME), Polytechnic (Diploma), ITI Trades, and Skill-Based Professional Courses. Limited seats with practical training & industry exposure.',
            img: '/images/1111.jpeg',
        },
        {
            title: 'ADMISSION OPEN 2026',
            desc: 'Enroll now for Engineering (BE / ME), Polytechnic (Diploma), ITI Trades, and Skill-Based Professional Courses. Limited seats with practical training & industry exposure.',
            img: '/images/3.jpg',
        },
        {
            title: 'Polytechnic & ITI – Learn Skills, Build Career',
            desc: 'Hands-on training, modern labs, certified instructors, and job-oriented programs designed for Polytechnic & ITI students to succeed in real-world industries.',
            img: '/images/1-2-1920x500.jpg',
        },
        {
            title: 'Engineering Excellence for a Strong Future',
            desc: 'Advanced engineering education with experienced faculty, industry projects, internships, and placement-focused learning for tomorrow’s professionals.',
            img: '/images/501-1920x500.jpg',
        },
    ];

    return (
        <section className="relative w-full h-[30vh] md:h-[90vh] overflow-hidden">
            <Swiper
                modules={[Autoplay]}
                speed={1200}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop
                allowTouchMove={false}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative w-full h-full flex items-center bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            <div className="absolute inset-0 bg-black/70"></div>

                            <div className="relative z-10 container mx-auto px-6">
                                <div className="max-w-3xl mx-auto text-center text-white">
                                    <h1 className="text-xl md:text-4xl font-bold mb-4">
                                        {slide.title}
                                    </h1>

                                    <p className="text-base md:text-lg mb-8 text-gray-200 hidden md:block">
                                        {slide.desc}
                                    </p>

                                    <Link
                                        href="/services/applynow"
                                        className="px-9 py-3 bg-orange-500 hover:bg-orange-600 transition-all duration-300 rounded-xl font-semibold shadow-xl"
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
