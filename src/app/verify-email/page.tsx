'use client';

import { useState, useEffect } from 'react';
import { FiMail, FiCheckCircle, FiArrowRight, FiClock, FiRefreshCw } from 'react-icons/fi';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';

  // Auto-submit when all digits are entered
  useEffect(() => {
    if (verificationCode.every(digit => digit !== '')) {
      handleVerify();
    }
  }, [verificationCode]);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Move to next input
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
      // Move to previous input on backspace
      const prevInput = document.getElementById(`digit-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const numbers = paste.replace(/\D/g, ''); // Remove non-digits
    
    if (numbers.length === 6) {
      const newCode = numbers.split('').slice(0, 6);
      setVerificationCode([...newCode, ...Array(6 - newCode.length).fill('')]);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setError('');
    
    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the code to your backend for verification
      const code = verificationCode.join('');
      console.log('Verifying code:', code);
      
      // For demo purposes, any 6-digit code will work
      if (code.length === 6) {
        setIsVerified(true);
      } else {
        setError('Please enter a valid 6-digit code');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = () => {
    if (resendCooldown > 0) return;
    
    // Reset code and set cooldown
    setVerificationCode(Array(6).fill(''));
    setResendCooldown(30); // 30 seconds cooldown
    setError('');
    
    // In a real app, you would request a new verification code from your backend
    console.log('Resending verification code to:', email);
    
    // Focus first input
    const firstInput = document.getElementById('digit-0') as HTMLInputElement;
    if (firstInput) firstInput.focus();
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-green-500" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Email Verified!</h1>
          <p className="text-foreground/70 mb-6">
            Your email has been successfully verified. You can now enjoy all the features of QuickHelp.
          </p>
          <Link
            href="/"
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors inline-block"
          >
            Continue to Dashboard
            <FiArrowRight className="inline ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary">QuickHelp</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-primary" size={24} />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Verify Your Email</h2>
              <p className="text-foreground/70">
                We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground/80 mb-3">
                Enter verification code
              </label>
              <div className="flex justify-between space-x-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`digit-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={isVerifying}
                    className="w-12 h-14 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-foreground/60 mb-4">
                Didn't receive a code?{' '}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0}
                  className={`font-medium ${
                    resendCooldown > 0 ? 'text-foreground/50' : 'text-primary hover:underline'
                  }`}
                >
                  {resendCooldown > 0 ? (
                    <>
                      <FiClock className="inline mr-1" />
                      Resend in {resendCooldown}s
                    </>
                  ) : (
                    'Resend code'
                  )}
                </button>
              </p>

              {isVerifying && (
                <div className="flex items-center justify-center text-primary">
                  <FiRefreshCw className="animate-spin mr-2" />
                  <span>Verifying...</span>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-foreground/60 text-center">
                Having trouble?{' '}
                <a href="mailto:support@quickhelp.com" className="text-primary hover:underline">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
