"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  GraduationCap,
  BookOpen,
  MessageCircle,
  FileText,
  LogOut,
  Users,
  MapPin,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    approvedAdmissions: 0,
    pendingAdmissions: 0,
    totalCourses: 0,
    totalEnquiries: 0,
    totalMarksheets: 0,
    totalAddresses: 0,
  });

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // =====================
  // FETCH DASHBOARD DATA
  // =====================
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("/api/counting");
        const data = await res.json();

        if (data.success) {
          setCounts(data.data);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage admissions, courses & students easily 🎓
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium shadow"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Stats Section */}
      {loading ? (
        <p className="text-center text-gray-500">Loading dashboard data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
          <StatCard
            title="Approved Admissions"
            value={counts.approvedAdmissions}
            icon={<Users />}
          />
          <StatCard
            title="Pending Admissions"
            value={counts.pendingAdmissions}
            icon={<Clock />}
          />
          <StatCard
            title="Courses"
            value={counts.totalCourses}
            icon={<BookOpen />}
          />
          <StatCard
            title="Enquiries"
            value={counts.totalEnquiries}
            icon={<MessageCircle />}
          />
          <StatCard
            title="Marksheets"
            value={counts.totalMarksheets}
            icon={<FileText />}
          />
          <StatCard
            title="Addresses"
            value={counts.totalAddresses}
            icon={<MapPin />}
          />
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          href="/admin/Admission"
          title="Approved Admissions"
          desc="View & manage approved students"
          icon={<GraduationCap />}
          color="from-orange-400 to-orange-600"
        />

        <DashboardCard
          href="/admin/Courses"
          title="Courses"
          desc="Create & manage courses"
          icon={<BookOpen />}
          color="from-blue-400 to-blue-600"
        />

        <DashboardCard
          href="/admin/Enquiry"
          title="Enquiries"
          desc="View student enquiries"
          icon={<MessageCircle />}
          color="from-green-400 to-green-600"
        />

        <DashboardCard
          href="/admin/msheet"
          title="Marksheets"
          desc="Generate & manage marksheets"
          icon={<FileText />}
          color="from-purple-400 to-purple-600"
        />

        <DashboardCard
          href="/admin/Address"
          title="Addresses"
          desc="Manage institute addresses"
          icon={<MapPin />}
          color="from-gray-400 to-gray-600"
        />

        <DashboardCard
          href="/admin/Allquery"
          title="Pending Queries"
          desc="Review unresolved queries"
          icon={<Clock />}
          color="from-red-400 to-red-600"
        />
      </div>
    </section>
  );
}

/* ======================
   REUSABLE COMPONENTS
====================== */

function DashboardCard({ href, title, desc, icon, color }) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
    >
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      <div className="p-6">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl text-white bg-gradient-to-r ${color} mb-4`}
        >
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>
    </Link>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}
