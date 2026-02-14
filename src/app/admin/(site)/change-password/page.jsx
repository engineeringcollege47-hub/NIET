"use client";
import { useState } from "react";
import { Lock, Mail, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"; // Optional: npm install lucide-react

export default function ChangePasswordPage() {
    const [formData, setFormData] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setStatus({ type: "error", message: "New passwords do not match!" });
            return;
        }

        setLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const res = await fetch("/api/user/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                }),
            });

            const data = await res.json();
            
            if (data.success) {
                setStatus({ type: "success", message: data.message });
                setFormData({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                setStatus({ type: "error", message: data.message });
            }
        } catch (error) {
            setStatus({ type: "error", message: "Connection failed. Try again later." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>

            <div className="w-full max-w-md z-10">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-full mb-4">
                            <ShieldCheck className="w-8 h-8 text-blue-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Update Security</h1>
                        <p className="text-slate-400 mt-2 text-sm">Protect your account with a stronger password</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Current Password Field */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-1">Current Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="password"
                                    name="currentPassword"
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <hr className="border-slate-800 my-2" />

                        {/* New Password Field */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-1">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="password"
                                    name="newPassword"
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-1">Confirm New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 overflow-hidden"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Update Password
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Feedback Message */}
                    {status.message && (
                        <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
                            status.type === "success" 
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                        }`}>
                            {status.type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                            <p className="text-sm font-medium">{status.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}