"use client";
import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118] flex items-center justify-center py-20 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to access your festival pass</p>
        </div>

        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-4 shadow-xl">
          <SignIn
            routing="path"
            path="/login"
            signUpUrl="/signup"
            redirectUrl="/dashboard"
            appearance={{
              layout: {
                socialButtonsVariant: "blockButton",
                privacyPageUrl: "/privacy",
                termsPageUrl: "/terms"
              },
              elements: {
                formButtonPrimary: 'bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-400',
                socialButtonsBlockButton: 'border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200',
                socialButtonsBlockButtonText: 'text-white',
                dividerText: 'text-gray-500',
                formFieldLabel: 'text-gray-300',
                formFieldInput: 'bg-white/5 border-white/10 text-white',
                footerActionText: 'text-gray-400',
                footerActionLink: 'text-violet-400 hover:text-violet-300'
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
