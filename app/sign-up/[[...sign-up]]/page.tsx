"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen px-4 py-10 text-on-background sm:px-6 lg:px-10">
      <div className="glass-panel rim-light mx-auto w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-lg">
        <SignUp routing="hash" />
      </div>
    </main>
  );
}
