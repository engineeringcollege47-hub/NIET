'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
    const [liveAddress, setLiveAddress] = useState(null);
    const [livenumber, setLiveNumber] = useState(null);

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
    return (
        <footer className="footerbg text-gray-300 pt-14">
            <div className="max-w-7xl mx-auto px-3 md:px-4">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">


                    <div>
                        <h4 className=" text-lg font-semibold mb-4">
                            Quick Menu
                        </h4>

                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-orange-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-orange-500">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link href="/Courses" className="hover:text-orange-500">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-orange-500">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>



                    </div>

                    {/* CONTACT */}
                    <div>
                        <h4 className=" text-lg font-semibold mb-4">
                            Contact
                        </h4>

                        <p className="flex items-center gap-2 text-sm mb-3">
                            <Mail size={18} className="text-orange-500" />
                            engineeringCollege47@gmail.com
                        </p>

                        <p className="flex items-center gap-2 text-sm mb-2">
                            <Phone size={18} className="text-orange-500" />
                            {livenumber?.mobileNumber || ''}
                        </p>
                        <p className="flex items-center gap-2 text-sm mb-2">
                            <Phone size={18} className="text-orange-500" />
                          011 8151 3645
                        </p>
                    </div>

                    {/* ABOUT */}
                    <div>
                        <h4 className=" text-lg font-semibold mb-4">
                            About Us
                        </h4>
                        <p className="text-sm leading-relaxed">
                            The National Institute of Engineering & Technology is an autonomous institute
                            dedicated to excellence in technical and professional education. It provides
                            a strong foundation for career success through innovative and flexible
                            learning programs.
                        </p>

                    </div>

                    {/* QUICK LINKS */}

                    <div>
                        <h4 className=" text-lg font-semibold mb-4">
                            Location
                        </h4>
                        <div className="rounded-xl overflow-hidden border border-gray-700">
                            {liveAddress?.mapEmbedUrl && (
                                <iframe
                                    src={liveAddress.mapEmbedUrl}
                                    width="100%"
                                    height="130"
                                    loading="lazy"
                                    className="border-0"
                                ></iframe>
                            )}
                        </div>
                    </div>

                </div>



                {/* BOTTOM BAR */}
                <div className="border-t border-gray-700 mt-12 py-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} The National Institute of engineering & technology
                    All Rights Reserved.
                </div>

            </div>
        </footer>
    );
}
