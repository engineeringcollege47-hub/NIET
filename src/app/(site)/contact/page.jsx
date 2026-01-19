'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Contactus from '@/Components/Contactus/Contactus'
export default function page() {
  const [liveAddress, setLiveAddress] = useState(null);

  useEffect(() => {
    const fetchLiveAddress = async () => {
      try {
        const res = await axios.get('/api/Address/live');
        setLiveAddress(res.data);
      } catch (err) {
        console.log('No live address found');
      }
    };

    fetchLiveAddress();
  }, []);

  return (
    <div>
      <main className="bg-gray-50">

        {/* HERO */}
        <section className=" footerbg whychoose text-white">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-orange-100">
              We’re here to help you with admissions, courses, and any questions
              you may have.
            </p>
          </div>
        </section>


        <Contactus />

        {/* MAP */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="rounded-xl overflow-hidden shadow">
            {liveAddress?.mapEmbedUrl && (
              <iframe
                 src={liveAddress.mapEmbedUrl}
                width="100%"
                height="350"
                loading="lazy"
                className="border-0"
              ></iframe>
            )}
          </div>
        </section>



      </main>
    </div>
  )
}
