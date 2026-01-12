'use client';

import { useSession } from '@/domains/auth';
import { LoadingState, ErrorState } from '@/shared/ui';
import { Shield, CheckCircle2, XCircle, Info } from 'lucide-react';

export default function AuthStatusPage() {
  const { data: user, isLoading, error } = useSession();

  if (isLoading) return <LoadingState message="Checking security status..." />;
  if (error) return <ErrorState error={error} />;

  const isAuthenticated = !!user;

  return (
    <div className="container mx-auto max-w-2xl px-6 py-24">
      <div className="rounded-2xl bg-white p-8 shadow-xl border border-neutral-100">
        <div className="mb-8 flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isAuthenticated ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            <Shield size={24} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-medium text-neutral-900">Security Status</h1>
            <p className="text-sm text-neutral-500">Verification of your current session and cookies</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-100">
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <CheckCircle2 className="text-green-600" size={20} />
              ) : (
                <XCircle className="text-red-600" size={20} />
              )}
              <span className="font-medium text-neutral-900">Authentication State</span>
            </div>
            <span className={`text-sm font-bold uppercase tracking-widest ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
              {isAuthenticated ? 'Authenticated' : 'Unauthenticated'}
            </span>
          </div>

          {isAuthenticated && user && (
            <div className="space-y-4">
              <div className="px-2">
                <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                  <Info size={14} /> Session Details
                </h3>
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between border-b border-neutral-50 pb-2">
                    <span className="text-neutral-500">User ID</span>
                    <span className="font-mono text-neutral-900">{user.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-50 pb-2">
                    <span className="text-neutral-500">Name</span>
                    <span className="text-neutral-900">{user.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-50 pb-2">
                    <span className="text-neutral-500">Email</span>
                    <span className="text-neutral-900">{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-blue-50/50 p-4 border border-blue-100">
                <p className="text-xs text-blue-700 leading-relaxed">
                  Your session is secured by a HttpOnly JWT cookie set by the server. 
                  This token is automatically included in your requests to verify your identity.
                </p>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="rounded-lg bg-neutral-50 p-6 text-center">
              <p className="text-neutral-500 text-sm mb-4">You are currently browsing as a guest.</p>
              <a href="/login" className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                Log In to Verify Session
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
