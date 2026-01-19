"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminHeader() {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/", // logout ke baad redirect
        });
    };


    const isActive = (path) =>
        pathname === path ? "text-orange-600" : "text-gray-800";

    return (
        <>

            <header
                className="fixed top-0 w-full z-50 transition-all duration-300  bg-white/80 backdrop-blur-md shadow-md"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="h-16 flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/admin" className="text-2xl font-bold text-orange-600">
                            Dashboard
                        </Link>

                        {/* DESKTOP MENU (RIGHT SIDE) */}
                        <nav className="hidden md:flex items-center gap-8 font-medium">

                            <Link href="/admin/Admission" className={`${isActive("/admin/Admission")} hover:text-orange-600`}>
                                Admission
                            </Link>

                            <Link href="/admin/Courses" className={`${isActive("/admin/Courses")} hover:text-orange-600`}>
                                Courses
                            </Link>
                            <Link href="/admin/Enquiry" className={`${isActive("/admin/Enquiry")} hover:text-orange-600`}>
                                Enquiry
                            </Link>

                            <Link href="/admin/msheet" className={`${isActive("/admin/msheet")} hover:text-orange-600`}>
                                Marksheet
                            </Link>
                            <Link href="/admin/csheet" className={`${isActive("/admin/csheet")} hover:text-orange-600`}>
                                Certificate
                            </Link>
                            <Link href="/admin/Address" className={`${isActive("/admin/Address")} hover:text-orange-600`}>
                                Address
                            </Link>
                             <Link href="/admin/Mobile" className={`${isActive("/admin/Mobile")} hover:text-orange-600`}>
                                Mobile
                            </Link>
                            

                            <Link href="/admin/Allquery" className={`${isActive("/admin/Allquery")} hover:text-orange-600`}>
                                Pending
                            </Link>


                            <button
                                onClick={handleLogout}
                                className="bg-orange-600 text-white px-5 py-2 rounded-full hover:bg-orange-700"
                            >
                                Logout
                            </button>
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

                    <Link href="/admin/Admission" onClick={() => setOpen(false)}>Admission</Link>
                    <Link href="/admin/Courses" onClick={() => setOpen(false)}>Courses</Link>
                    <Link href="/admin/Enquiry" onClick={() => setOpen(false)}>Enquiry</Link>
                    <Link href="/admin/msheet" onClick={() => setOpen(false)}>Marksheet</Link>
                    <Link href="/admin/csheet" onClick={() => setOpen(false)}>Certificate</Link>
                    <Link href="/admin/Address" onClick={() => setOpen(false)}>Address</Link>
                    <Link href="/admin/Allquery" onClick={() => setOpen(false)}>Pending</Link>

                    <button
                        onClick={async () => {
                            await handleLogout();
                            setOpen(false);
                        }}
                        className="bg-orange-600 text-white text-center py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </nav>
            </aside>


            <div className="h-16" />
        </>
    );
}
