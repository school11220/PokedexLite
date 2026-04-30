"use client";

import { SignIn, UserProfile, useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { isSignedIn } = useUser();

  return (
    <main className="min-h-screen px-4 py-10 text-on-background sm:px-6 lg:px-10">
      <div className="glass-panel rim-light mx-auto w-full max-w-4xl rounded-2xl border border-white/10 p-4 shadow-lg sm:p-6">
        {isSignedIn ? (
          <UserProfile routing="hash" />
        ) : (
          <div className="mx-auto max-w-md">
            <SignIn routing="hash" />
          </div>
        )}
      </div>
    </main>
  );
}
