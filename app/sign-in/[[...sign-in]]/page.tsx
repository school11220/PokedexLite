"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen px-4 py-10 text-on-background sm:px-6 lg:px-10">
      <div className="glass-panel rim-light mx-auto w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-lg">
        <SignIn routing="hash" />
      </div>
    </main>
  );
}
