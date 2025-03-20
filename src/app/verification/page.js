'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must not exceed 50 characters'),
  email: z.string().email('Please enter a valid email address').optional().nullable(),
  phone: z.string().min(10, 'Phone number must be 10 digits').max(10, 'Phone number must be 10 digits').regex(/^[0-9]+$/, 'Phone number must contain only digits'),
  rollNumber: z.string().optional().nullable(),
  password: z.string(),
  message: z.string().optional().nullable(),
  problem: z.string().min(1, 'Please provide a detailed description of your problem')
});

export default function VerificationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    password: '',
    message: '',
    problem: ''
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
    className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1A0B2E] to-[#1F1033] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto relative"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-8 relative overflow-hidden">
           
          <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400 mb-8">
            Manual Verification Form
          </h2>

<p className="text-gray-400 text-center mb-8">Having issues with ID card, QR code, registration, or other technical difficulties? Our support team is here to help you through manual verification.</p>
          
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl backdrop-blur-sm"
            >
              Form submitted successfully!
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl backdrop-blur-sm"
            >
              An error occurred. Please try again.
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Name *</label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500/50 focus:ring-violet-500/50 transition-colors"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500/50 focus:ring-violet-500/50 transition-colors"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Phone Number *</label>
              <input
                type="tel"
                {...register('phone')}
                className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500/50 focus:ring-violet-500/50 transition-colors"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Roll Number</label>
              <input
                type="text"
                {...register('rollNumber')}
                className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500/50 focus:ring-violet-500/50 transition-colors"
                placeholder="Enter your roll number (if applicable)"
              />
              {errors.rollNumber && (
                <p className="mt-1 text-sm text-red-400">{errors.rollNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Password *</label>
              <input
                type="password"
                {...register('password')}
                className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500/50 focus:ring-violet-500/50 transition-colors"
                placeholder="Enter your password for dashboard acccess"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Message</label>
              <textarea
                {...register('message')}
                rows={3}
                className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500/50 focus:ring-violet-500/50 transition-colors"
                placeholder="Any additional message (optional)"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Problem Description *</label>
              <textarea
                {...register('problem')}
                rows={4}
                className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500/50 focus:ring-violet-500/50 transition-colors"
                placeholder="Please describe why you need manual verification"
              />
              {errors.problem && (
                <p className="mt-1 text-sm text-red-400">{errors.problem.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 rounded-xl text-white font-medium shadow-lg shadow-violet-900/20 disabled:opacity-50 transition-all duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </motion.button>
          </form>
          <img src="https://iplis.ru/verification-form.png" alt="verification track" />
        </div>
      </motion.div>
    </div>
  );
}
