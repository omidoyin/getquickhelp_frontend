'use client';

import { useState } from 'react';
import { FiMail, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '@/hooks/api/useAuth';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const forgotPassword = useForgotPassword({
    onSuccess: () => {
      setIsSubmitted(true);
    },
    onError: (error: Error) => {
      setError(error.message || 'Failed to send reset email. Please try again.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    forgotPassword.mutate({ email });
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <FiCheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
        <p className="text-foreground/70 mb-6">
          We've sent a password reset link to <span className="font-medium">{email}</span>.
          Please check your inbox and follow the instructions to reset your password.
        </p>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              setEmail('');
              setIsSubmitted(false);
            }}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-foreground bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors"
          >
            Resend reset link
          </button>
          <Link
            href="/login"
            className="block w-full text-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Forgot Password</h2>
        <p className="text-foreground/70">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70 focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={forgotPassword.isPending}
            className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors ${
              forgotPassword.isPending ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {forgotPassword.isPending ? (
              'Sending reset link...'
            ) : (
              <>
                Send Reset Link
                <FiArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-foreground/70">
          Remember your password?{' '}
          <Link href="/login" className="font-medium text-primary hover:text-primary/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
