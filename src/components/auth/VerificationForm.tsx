'use client';

import { useState, useEffect } from 'react';
import { FiMail, FiCheckCircle, FiArrowRight, FiClock, FiRefreshCw } from 'react-icons/fi';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useVerifyEmail, useResendVerificationEmail } from '@/hooks/api/useAuth';

type VerificationFormProps = {
  email: string;
  onVerificationComplete?: () => void;
};

export default function VerificationForm({ email, onVerificationComplete }: VerificationFormProps) {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const verifyEmail = useVerifyEmail();
  const resendVerification = useResendVerificationEmail();

  // Handle verification code input
  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d*$/.test(value)) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`verification-code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace for better UX
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`verification-code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle verification
  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      await verifyEmail.mutateAsync({ token: code });
      setIsVerified(true);
      if (onVerificationComplete) onVerificationComplete();
    } catch (err) {
      setError('Invalid or expired verification code. Please try again.');
      // Clear the code on error
      setVerificationCode(['', '', '', '', '', '']);
      // Focus first input
      const firstInput = document.getElementById('verification-code-0');
      if (firstInput) firstInput.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle resend verification email
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    try {
      await resendVerification.mutateAsync({ email });
      setResendCooldown(60); // 60 seconds cooldown
      setError('');
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
    }
  };

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Auto-submit when all digits are entered
  useEffect(() => {
    if (verificationCode.every(digit => digit !== '')) {
      handleVerify();
    }
  }, [verificationCode]);

  if (isVerified) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <FiCheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Email Verified!</h2>
        <p className="text-foreground/70 mb-6">
          Your email has been successfully verified. You can now log in to your account.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
        >
          Go to Login
          <FiArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
          <FiMail className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Verify Your Email</h2>
        <p className="text-foreground/70">
          We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="mb-6">
        <label htmlFor="verification-code" className="block text-sm font-medium text-foreground/80 mb-2">
          Enter Verification Code
        </label>
        <div className="flex justify-between space-x-2 mb-4">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              id={`verification-code-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={verificationCode[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isVerifying}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70 focus:outline-none transition-colors"
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
        
        {isVerifying && (
          <p className="mt-2 text-sm text-foreground/70">Verifying code...</p>
        )}
      </div>

      <div className="text-center text-sm text-foreground/70">
        <p className="mb-2">
          Didn't receive a code?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0 || resendVerification.isPending}
            className="font-medium text-primary hover:text-primary/80 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendVerification.isPending ? (
              <span className="flex items-center justify-center">
                <FiRefreshCw className="animate-spin h-4 w-4 mr-1" />
                Sending...
              </span>
            ) : resendCooldown > 0 ? (
              `Resend in ${resendCooldown}s`
            ) : (
              'Resend code'
            )}
          </button>
        </p>
        
        <p className="text-xs text-foreground/50 mt-4">
          Check your spam folder if you don't see the email in your inbox.
        </p>
      </div>
    </div>
  );
}
