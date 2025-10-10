'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FiLock, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';

type PasswordRequirements = {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
};

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email') || 'your account';
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Password requirements
  const [requirements, setRequirements] = useState<PasswordRequirements>({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  
  // Check password requirements
  useEffect(() => {
    setRequirements({
      minLength: password.length >= 8,
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);
  
  const allRequirementsMet = Object.values(requirements).every(Boolean);
  const passwordsMatch = password === confirmPassword && password !== '';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!allRequirementsMet) {
      setError('Please ensure your password meets all requirements');
      return;
    }
    
    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API endpoint to reset the password
      console.log('Resetting password for token:', token);
      console.log('New password:', password);
      
      // Show success state
      setIsSuccess(true);
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('Failed to reset password. The link may have expired or is invalid.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-primary">QuickHelp</h1>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="text-green-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Password Updated</h2>
              <p className="text-foreground/70 mb-6">
                Your password has been successfully updated. You can now sign in with your new password.
              </p>
              <Link
                href="/login"
                className="inline-block w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // If no token is provided, show an error
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-primary">QuickHelp</h1>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Invalid Link</h2>
              <p className="text-foreground/70 mb-6">
                The password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link
                href="/forgot-password"
                className="inline-block w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Request New Link
              </Link>
              <div className="mt-4">
                <Link 
                  href="/login" 
                  className="text-sm text-foreground/70 hover:text-primary hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary">QuickHelp</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Reset Password</h2>
              <p className="text-foreground/70">
                Create a new password for {email}
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg mb-6">
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
                    <FiLock className="text-foreground/40" size={18} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-foreground/40" size={18} />
                    ) : (
                      <FiEye className="text-foreground/40" size={18} />
                    )}
                  </button>
                </div>
                
                {/* Password requirements */}
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-foreground/60">Password must contain:</p>
                  <ul className="text-xs space-y-1">
                    <li className={`flex items-center ${requirements.minLength ? 'text-green-500' : 'text-foreground/60'}`}>
                      <span className="mr-1">•</span>
                      At least 8 characters
                    </li>
                    <li className={`flex items-center ${requirements.hasNumber ? 'text-green-500' : 'text-foreground/60'}`}>
                      <span className="mr-1">•</span>
                      At least one number
                    </li>
                    <li className={`flex items-center ${requirements.hasSpecialChar ? 'text-green-500' : 'text-foreground/60'}`}>
                      <span className="mr-1">•</span>
                      At least one special character (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground/80 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-foreground/40" size={18} />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 border ${
                      confirmPassword
                        ? passwordsMatch
                          ? 'border-green-300'
                          : 'border-red-300'
                        : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="text-foreground/40" size={18} />
                    ) : (
                      <FiEye className="text-foreground/40" size={18} />
                    )}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                )}
                {confirmPassword && passwordsMatch && (
                  <p className="mt-1 text-xs text-green-500">Passwords match</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || !allRequirementsMet || !passwordsMatch}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                    isLoading || !allRequirementsMet || !passwordsMatch
                      ? 'bg-primary/50 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary-dark'
                  } transition-colors`}
                >
                  {isLoading ? 'Updating...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-6 text-center text-sm text-foreground/60">
            <p>Remember your password?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
