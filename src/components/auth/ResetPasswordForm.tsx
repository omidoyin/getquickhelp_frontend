'use client';

import { useState } from 'react';
import { FiLock, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPassword } from '@/hooks/api/useAuth';

type PasswordRequirements = {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
};

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email') || 'your account';
  const router = useRouter();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const passwordRequirements: PasswordRequirements = {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = password === confirmPassword;
  
  const resetPassword = useResetPassword({
    onSuccess: () => {
      setIsSubmitted(true);
    },
    onError: (error: Error) => {
      setError(error.message || 'Failed to reset password. Please try again.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate token
    if (!token) {
      setError('Invalid or expired reset link. Please request a new one.');
      return;
    }
    
    // Validate passwords
    if (!isPasswordValid) {
      setError('Please ensure your password meets all requirements.');
      return;
    }
    
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }
    
    setError('');
    resetPassword.mutate({ token, newPassword: password });
  };
  
  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <FiCheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Password Updated!</h2>
        <p className="text-foreground/70 mb-6">
          Your password has been successfully reset. You can now log in with your new password.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Reset Your Password</h2>
        <p className="text-foreground/70">
          Create a new password for {email}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-1">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              )}
            </button>
          </div>
          
          {/* Password Requirements */}
          <div className="mt-2 space-y-1 text-xs text-foreground/60">
            <div className={`flex items-center ${passwordRequirements.minLength ? 'text-green-600' : ''}`}>
              <span className="mr-1">•</span>
              <span>At least 8 characters long</span>
            </div>
            <div className={`flex items-center ${passwordRequirements.hasNumber ? 'text-green-600' : ''}`}>
              <span className="mr-1">•</span>
              <span>Contains a number</span>
            </div>
            <div className={`flex items-center ${passwordRequirements.hasSpecialChar ? 'text-green-600' : ''}`}>
              <span className="mr-1">•</span>
              <span>Contains a special character</span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground/80 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`block w-full pl-10 pr-10 py-2 border ${
                confirmPassword && !passwordsMatch ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70 focus:outline-none transition-colors`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              )}
            </button>
          </div>
          {confirmPassword && !passwordsMatch && (
            <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={resetPassword.isPending || !isPasswordValid || !passwordsMatch}
            className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
              resetPassword.isPending || !isPasswordValid || !passwordsMatch
                ? 'bg-primary/70 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors`}
          >
            {resetPassword.isPending ? 'Updating...' : 'Reset Password'}
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
