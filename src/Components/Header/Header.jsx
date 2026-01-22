"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
export default function Header() {
    const pathname = usePathname();
    const [livenumber, setLiveNumber] = useState(null);

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);


    useEffect(() => {
        const fetchLiveAddress = async () => {
            try {
                const res = await axios.get('/api/mobile/live');
                setLiveNumber(res.data);
                console.log(res.data)
            } catch (err) {
                console.log('No live Mobile found');
            }
        };

        fetchLiveAddress();
    }, []);
    const isActive = (path) =>
        pathname === path ? "text-orange-600" : "text-gray-800";

    return (
        <>

            <header
                className="fixed  top-0 w-full z-50 transition-all duration-300  bg-orange-100 border-b border-orange-00 shadow-md"
            >
                <div className="w-full hidden sm:block bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className=" py-1 flex items-center justify-between text-sm text-gray-700">


                            <div className="flex items-center gap-6 tracking-wide">
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-600">🕘</span>
                                    <span>9 AM to 6 PM</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-orange-600">📞</span>
                                    <span>{livenumber?.mobileNumber || ''}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-600">toll free</span>
                                    <span>011 8151 3645</span>
                                </div>

                            </div>


                            <div className="hidden md:flex items-center gap-4 text-orange-600">
                                <a href="#" className="hover:text-orange-700 transition">𝕏</a>
                                <a href="#" className="hover:text-orange-700 transition">f</a>
                                <a href="#" className="hover:text-orange-700 transition">in</a>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 ">
                    <div className="h-16 flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/images/mainmain.png"
                                alt="NIET Logo"
                                width={60}
                                height={60}
                                className="object-contain"
                            />

                            <div className="leading-tight ">
                                <h1 className="text-lg font-bold text-orange-600">
                                   National Institute
                                </h1>
                                <p className="text-xs text-gray-600">
                                    Engineering & Technology
                                </p>
                            </div>
                        </Link>


                        {/* DESKTOP MENU (RIGHT SIDE) */}
                        <nav className="hidden md:flex items-center gap-8 font-medium">

                            <Link href="/" className={`${isActive("/")} hover:text-orange-600`}>
                                Home
                            </Link>

                            <Link href="/about" className={`${isActive("/about")} hover:text-orange-600`}>
                                About
                            </Link>
                            <Link href="/Courses" className={`${isActive("/Courses")} hover:text-orange-600`}>
                                Courses
                            </Link>

                            {/* Desktop Dropdown */}
                            {/* Desktop Dropdown */}
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center gap-1 hover:text-orange-600">
                                    Student Zone <ChevronDown size={16} />
                                </div>

                                {/* Main Dropdown */}
                                <div
                                    className="absolute right-0 top-full w-56
        bg-white/90 shadow-lg opacity-0 invisible
        group-hover:opacity-100 group-hover:visible
        transition-all duration-200 overflow-visible"
                                >

                                    <Link
                                        href="/services/applynow"
                                        className="block border-b border-orange-200 px-4 py-3 hover:bg-gray-100"
                                    >
                                        Online Admission
                                    </Link>

                                    <Link
                                        href="/services/registration"
                                        className="block border-b border-orange-200 px-4 py-3 hover:bg-gray-100"
                                    >
                                        Registration Details
                                    </Link>

                                    {/* RESULT WITH RIGHT SIDE SUBMENU */}
                                    <div className="relative group/result">
                                        <div
                                            className="flex items-center justify-between 
                px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Result
                                            <ChevronDown size={14} className="-rotate-90" />
                                        </div>

                                        {/* Right Side Submenu */}
                                        <div
                                            className="absolute overflow-hidden left-full top-0 ml-1 w-48
                bg-white/90  shadow-lg opacity-0 invisible
                group-hover/result:opacity-100 group-hover/result:visible
                transition-all duration-200"
                                        >
                                            <Link
                                                href="/services/result"
                                                className="block border-b border-orange-200 px-4 py-3 hover:bg-gray-100"
                                            >
                                                Marksheet
                                            </Link>

                                            <Link
                                                href="/services/certificate"
                                                className="block px-4 py-3 hover:bg-gray-100"
                                            >
                                                Certificate
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <Link href="/contact" className={`${isActive("/contact")} hover:text-orange-600`}>
                                Contact
                            </Link>

                            <Link
                                href="/admin"
                                className="bg-orange-600 text-white px-5 py-2 rounded-full hover:bg-orange-700"
                            >
                                Admin
                            </Link>
                        </nav>

                        {/* Mobile Toggle */}
                        <button className="md:hidden" onClick={() => setOpen(true)}>
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </header>

            {/* OVERLAY */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setOpen(false)}
            />

            {/* MOBILE SLIDE MENU (RIGHT) */}
            <aside
                className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-5 flex items-center justify-between border-b">
                    <span className="text-lg font-bold text-orange-600">Menu</span>
                    <button onClick={() => setOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-5 flex flex-col gap-5 font-medium">

                    <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                    <Link href="/Courses" onClick={() => setOpen(false)}>Courses</Link>

                    {/* Mobile Services Dropdown */}
                    <div>
                        <button
                            onClick={() => setServiceOpen(!serviceOpen)}
                            className="w-full flex items-center justify-between"
                        >
                            <span>Services</span>
                            <ChevronDown
                                size={18}
                                className={`transition-transform ${serviceOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {serviceOpen && (
                            <div className="mt-3  flex flex-col gap-3 text-sm pl-3 border-l border-orange-600">
                                <Link href="/services/applynow" onClick={() => setOpen(false)} className="  p-1">
                                    Online Admission
                                </Link>
                                <Link href="/services/registration" onClick={() => setOpen(false)} className="  p-1">
                                    Registration Details
                                </Link>
                                <Link href="/services/result" onClick={() => setOpen(false)} className="  p-1">
                                    Result
                                </Link>
                                <Link href="/services/certificate" onClick={() => setOpen(false)} className="  p-1">
                                    Certificate
                                </Link>

                            </div>
                        )}
                    </div>

                    <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

                    <Link
                        href="/admin"
                        className="bg-orange-600 text-white text-center py-2 rounded-lg"
                        onClick={() => setOpen(false)}
                    >
                        Admin
                    </Link>
                </nav>
            </aside>


            <div className="h-16" />
        </>
    );
}
