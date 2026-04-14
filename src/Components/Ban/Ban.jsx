"use client"
import React, { useState } from 'react';

export default function Ban() {
    const [showDetails, setShowDetails] = useState(false);

    // Simple Error Handler for the "Back to Safety" logic
    const handleBackToSafety = () => {
        try {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'https://www.google.com';
            }
        } catch (error) {
            console.error("Navigation failed", error);
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen bg-[#d93025] text-white flex flex-col justify-center items-center px-8 font-sans selection:bg-white selection:text-[#d93025]">
            <div className="max-w-[620px] w-full">

                {/* Warning Icon - Standard browser size */}
                <div className="mb-6">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z" />
                    </svg>
                </div>

                {/* Main Header */}
                <h1 className="text-[32px] leading-tight font-normal mb-5">
                    Deceptive site ahead
                </h1>

                {/* Professional Body Text */}
                <div className="text-[15px] leading-relaxed mb-8 opacity-95">
                    <p className="mb-4">
                        Attackers on <span className="font-bold">this-website.com</span> may trick you into doing
                        something dangerous like installing software or revealing your personal information
                        (for example, passwords, phone numbers, or credit cards).
                        <a href="#" className="underline ml-1 hover:text-gray-200">Learn more</a>
                    </p>

                    {/* Checkbox Section (Professional Detail) */}
                    <div className="flex items-start gap-3 mt-6">
                        <input
                            type="checkbox"
                            id="report"
                            className="mt-1 accent-white h-4 w-4 rounded border-none outline-none"
                            defaultChecked
                        />
                        <label htmlFor="report" className="text-[13px] opacity-80 leading-snug cursor-pointer">
                            Automatically report details of possible security incidents to Google.
                            <a href="https://safebrowsing.google.com/" className="underline ml-1">Privacy policy</a>
                        </label>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center mt-10">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-[13px] font-medium opacity-80 hover:opacity-100 transition-opacity uppercase tracking-wider"
                    >
                        {showDetails ? 'Hide Details' : 'Details'}
                    </button>

                    <button
                        onClick={handleBackToSafety}
                        className="bg-white text-[#d93025] px-6 py-2 rounded-[4px] text-[14px] font-medium shadow-sm hover:bg-gray-100 active:bg-gray-200 transition-all"
                    >
                        Back to safety
                    </button>
                </div>

                {/* Hidden Details Section (Error Handle UI) */}
                {showDetails && (
                    <div className="mt-8 pt-6 border-t border-white/20 text-[13px] opacity-80 animate-fade-in">
                        <p>
                            Google Safe Browsing recently detected phishing on this site. Phishing sites
                            pretend to be other websites to deceive you.
                        </p>
                        <p className="mt-2 text-[11px] font-mono uppercase">
                            Error Code: ERR_CERT_COMMON_NAME_INVALID
                        </p>
                    </div>
                )}
            </div>

            {/* Very small footer text */}
            <div className="absolute bottom-6 text-[11px] opacity-40">
                &copy; {new Date().getFullYear()} Google Safe Browsing
            </div>
        </div>
    );
}