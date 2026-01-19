'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: true,
            callbackUrl: "/admin",
        });

        // Error handling (only for NOT_ADMIN)
        if (res?.error === "NOT_ADMIN") {
            setError("You are not authorized to access admin panel");
        }

        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8">

                {/* Header */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Login to continue
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email address"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5
                  focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />

                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5
                  focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />

                    {error && (
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 text-white py-3 rounded-lg
            font-semibold hover:bg-orange-700 transition
            disabled:opacity-60"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

            </div>
        </main>
    );
}
