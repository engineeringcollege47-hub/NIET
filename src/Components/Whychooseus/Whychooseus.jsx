import Link from 'next/link'
import React from 'react'

export default function Whychooseus() {
    return (
        <div className=' footerbg whychoose  py-8 md:py-20'>
            <div className=' lg:w-[80%] mx-auto py-4 px-2 text-center'>
                <p className=' text-2xl lg:text-4xl  font-extrabold mb-4'>Why Choose us</p>
                <p>Further our Technical program courses include Civil, Mechanical, Electrical, Automobile, IT, Computer Science, Chemical, Electronics & Communication and others. The advance course curriculum is designed as to provide in depth knowledge of current industrial process which leads to excellent placement records among all Technical and Management institutes. Success is our commitment and we have been working towards it.</p>
                <Link href="/services/applynow">
                    <button className="px-9 py-3 bg-white hover:bg-orange-600 hover:text-white cursor-pointer mt-5 transition-all duration-300 rounded-xl font-semibold shadow-xl ">
                        Apply Now
                    </button>
                </Link>

            </div>
        </div>
    )
}
