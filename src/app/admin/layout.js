import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AdminHeader from "@/Components/AdminHeader/AdminHeader";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Panel",
  description: "Admin Dashboard",
};

export default function AdminLayout({ children }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100 min-h-screen`}
    >
      <AdminHeader/>
      {children}
    </div>
  );
}
