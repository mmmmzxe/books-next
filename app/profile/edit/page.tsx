"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession, useUpdateProfile, updateProfileSchema, type UpdateProfileFormData } from '@/domains/auth';
import { Button, Input, LoadingState, ErrorState, useToast } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/core';
import { ArrowLeft, User, Mail, Save, X } from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();
  const { data: user, isLoading: isLoadingUser } = useSession();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    values: user
      ? {
          name: user.name,
          email: user.email,
        }
      : undefined,
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        addToast('Profile updated successfully!', 'success');
        router.push(ROUTES.PROFILE);
      },
      onError: (error) => {
        addToast(error.message || 'Failed to update profile', 'error');
      },
    });
  };

  if (isLoadingUser) return <LoadingState message="Loading account settings..." />;
  if (!user) return <ErrorState error="User not found" />;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 pt-12">
      <div className="container mx-auto max-w-2xl px-6">
        
        <div className="mb-12 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Discard Changes
          </button>
          <span className="text-xs font-bold uppercase tracking-widest text-[#74642F]">Account Settings</span>
        </div>

        <div className="rounded-4xl bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-neutral-100">
          <div className="mb-12 text-center">
             <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#111111] text-3xl font-serif text-white shadow-xl">
               {user.name.charAt(0)}
             </div>
             <h1 className="font-serif text-3xl font-medium text-[#111111]">Update Information</h1>
             <p className="mt-2 text-neutral-500">Keep your account details up to date.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-13 text-neutral-400">
                  <User size={18} />
                </div>
                <Input
                  {...register('name')}
                  label="Display Name"
                  placeholder="Your full name"
                  error={errors.name?.message}
                  className="pl-12 h-14 rounded-2xl border-neutral-200 focus:border-[#111111]"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-13 text-neutral-400">
                  <Mail size={18} />
                </div>
                <Input
                  {...register('email')}
                  type="email"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  error={errors.email?.message}
                  className="pl-12 h-14 rounded-2xl border-neutral-200 focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <Button 
                type="submit" 
                isLoading={isPending}
                className="h-16 w-full rounded-full bg-[#74642F] text-white hover:bg-[#5d4f25] text-lg shadow-lg"
              >
                <Save className="mr-2 h-5 w-5" />
                Save Preferences
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-16 w-full rounded-full border-neutral-200 text-neutral-500 hover:text-red-500 hover:border-red-500"
              >
                <X className="mr-2 h-5 w-5" />
                Cancel
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center text-xs text-neutral-400 uppercase tracking-widest">
          Your information is encrypted and secure.
        </div>
      </div>
    </div>
  );
}
