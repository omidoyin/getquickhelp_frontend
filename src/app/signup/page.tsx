'use client';

import SignupForm from './SignupForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary">QuickHelp</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <SignupForm />
      </main>
    </div>
  );
}
