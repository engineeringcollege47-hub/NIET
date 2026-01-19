'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Contactus() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [livenumber, setLiveNumber] = useState(null);

  const [liveAddress, setLiveAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchLiveAddress = async () => {
      try {
        const res = await axios.get('/api/Address/live');
        setLiveAddress(res.data);
        const res2 = await axios.get('/api/mobile/live');
        setLiveNumber(res2.data);
      } catch (err) {
        console.log('No live address found');
      }
    };

    fetchLiveAddress();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const res = await axios.post('/api/contact', formData);

      if (res.status === 200) {
        setSuccess('Your enquiry has been submitted successfully.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* CONTACT INFO */}
          <div>
            <span className="inline-block mb-3 px-4 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
              Contact Us
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Get In Touch
            </h2>

            <p className="text-slate-600 mb-10 max-w-md">
              Reach out using the details below or fill out the enquiry form.
              Our team will respond as soon as possible.
            </p>

            <div className="space-y-6 text-slate-700">
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-sm mt-1 leading-relaxed">
                  {liveAddress?.addressText || 'Address not available'}
                </p>
              </div>

              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm mt-1">engineeringCollege47@gmail.com</p>
              </div>

              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm mt-1">{livenumber?.mobileNumber || ''}</p>
              </div>
              <div>
                <p className="font-semibold">toll free:</p>
                <p className="text-sm mt-1">011 8151 3645</p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white rounded-2xl shadow-lg py-5 px-2 md:px-5 md:p-10">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Your Phone Number"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Feedback */}
              {success && (
                <p className="text-green-600 text-sm font-medium">{success}</p>
              )}
              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2
                bg-orange-600 text-white py-3 rounded-lg font-semibold
                hover:bg-orange-700 transition disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
