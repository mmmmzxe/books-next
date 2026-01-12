"use client";

import { Button, LoadingState, ErrorState } from '@/shared/ui';
import Link from 'next/link';
import { ROUTES } from '@/core';
import { useProfile } from './use-profile';
import { User, Shield, BookOpen, Settings, ChevronRight, LogOut, Heart } from 'lucide-react';
import { useLogout } from '@/domains/auth';

export default function ProfilePage() {
  const { user, isLoading, error, initial, hasUser } = useProfile();
  const { mutate: logout } = useLogout();

  if (isLoading) return <LoadingState message="Fetching your profile..." />;
  if (error) return <ErrorState error={error} />;
  if (!hasUser) return <ErrorState error="User not found" />;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 pt-12">
      <div className="container mx-auto max-w-5xl px-6">
        
        <header className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-[#111111] text-5xl font-serif text-white shadow-2xl">
              {initial}
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-serif text-4xl font-medium text-[#111111] md:text-5xl">{user?.name}</h1>
              <p className="mt-2 text-neutral-500">{user?.email}</p>
              <div className="mt-4 flex items-center justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Premium Member
                </span>
              </div>
            </div>
          </div>
          <Link href={ROUTES.EDIT_PROFILE}>
            <Button className="h-12 rounded-full px-8 bg-white border-neutral-200 text-neutral-900! hover:bg-neutral-50 shadow-sm border">
              <Settings className="mr-2 h-4 w-4" />
              Edit Account
            </Button>
          </Link>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <section className="rounded-4xl bg-white p-8 border border-neutral-100 shadow-sm">
              <h3 className="mb-8 font-serif text-2xl font-medium text-[#111111]">Personal Details</h3>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</p>
                  <p className="text-lg font-medium text-neutral-900">{user?.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</p>
                  <p className="text-lg font-medium text-neutral-900">{user?.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Account Type</p>
                  <p className="text-lg font-medium text-neutral-900">Bibliophile</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Member Since</p>
                  <p className="text-lg font-medium text-neutral-900">January 2026</p>
                </div>
              </div>
            </section>

            <section className="rounded-4xl bg-white p-8 text-black border border-neutral-100 shadow-sm">
              <h3 className="mb-8 font-serif text-2xl font-medium ">Account Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
                      <Shield className="h-5 w-5 text-neutral-500" />
                    </div>
                    <div>
                      <p className="font-medium">Password Management</p>
                      <p className="text-xs text-neutral-500">Update your account credentials</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-neutral-300" />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
                      <User className="h-5 w-5 text-neutral-500" />
                    </div>
                    <div>
                      <p className="font-medium">Session History</p>
                      <p className="text-xs text-neutral-500">Manage your active devices</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-neutral-300" />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-4 space-y-8">
            <div className="grid grid-cols-2 gap-4">
               <div className="rounded-3xl bg-[#111111] p-6 text-white text-center">
                  <BookOpen className="mx-auto mb-3 h-6 w-6 opacity-50" />
                  <p className="text-2xl font-serif font-medium">12</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">My Books</p>
               </div>
               <div className="rounded-3xl bg-[#F5F5F3] p-6 text-[#111111] text-center border border-neutral-100">
                  <Heart className="mx-auto mb-3 h-6 w-6 text-[#74642F]" />
                  <p className="text-2xl font-serif font-medium">24</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Wishlist</p>
               </div>
            </div>

            <div className="rounded-4xl bg-white p-8 border text-[#111111]! border-neutral-100 shadow-sm overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3F2EC] rounded-full -mr-16 -mt-16 -z-1" />
               <h4 className="font-serif text-lg mb-4 relative z-10">Quick Actions</h4>
               <nav className="space-y-2 relative z-10">
                 <Link href={ROUTES.MY_BOOKS} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F3F2EC] text-sm font-medium transition-all group">
                    <BookOpen className="h-4 w-4 text-neutral-400 group-hover:text-[#74642F]" />
                    Manage Inventory
                 </Link>
                 <Link href={ROUTES.FAVORITES} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F3F2EC] text-sm font-medium transition-all group">
                    <Heart className="h-4 w-4 text-neutral-400 group-hover:text-[#74642F]" />
                    View Favorites
                 </Link>
                 <button 
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-sm font-medium transition-all text-red-500 group"
                 >
                    <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Sign Out
                 </button>
               </nav>
            </div>

            <div className="rounded-4xl bg-[#74642F] p-8 text-white">
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Need Help?</p>
              <h4 className="font-serif text-xl mb-4 leading-tight">Our support team is here for you.</h4>
               <Link href="/contact">
                <Button className="w-full h-12 rounded-full bg-white text-black! hover:bg-neutral-100 font-bold text-xs uppercase tracking-widest">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
