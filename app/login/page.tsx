'use client';

import { Button, Input, Card, CardContent } from '@/shared/ui';
import { useLoginPage } from './use-login-page';
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { register, errors, isPending, onSubmit } = useLoginPage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F8F8] px-4 selection:bg-[#EBEBE4]">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="w-full max-w-lg z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#111111] text-white shadow-2xl mb-6">
            <LogIn size={28} />
          </div>
          <h1 className="font-serif text-4xl font-medium text-[#111111] md:text-5xl">Welcome Back</h1>
          <p className="mt-4 text-neutral-500 max-w-xs mx-auto">
            Experience the finest collection of literature curated for true enthusiasts.
          </p>
        </div>

        <Card className="rounded-[2.5rem] border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] bg-white overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-13 items-center flex pointer-events-none text-neutral-400">
                  <Mail size={18} />
                </div>
                <Input
                  {...register('email')}
                  type="email"
                  label="Email Address"
                  placeholder="name@example.com"
                  error={errors.email?.message}
                  className="pl-12 h-14 rounded-2xl border-neutral-200 focus:border-[#111111] bg-neutral-50/50"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-13 items-center flex pointer-events-none text-neutral-400">
                  <Lock size={18} />
                </div>
                <Input
                  {...register('password')}
                  type="password"
                  label="Security Password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  className="pl-12 h-14 rounded-2xl border-neutral-200 focus:border-[#111111] bg-neutral-50/50"
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-[#111111] focus:ring-[#111111]" />
                  <span className="text-sm text-neutral-500 group-hover:text-neutral-800 transition-colors">Remember me</span>
                </label>
                <Link href="#" className="text-sm font-medium text-[#111111] hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-[#111111] text-white hover:bg-neutral-800 shadow-xl transition-all active:scale-[0.98]" 
                isLoading={isPending}
              >
                Sign In to Collection
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-neutral-100">
              <div className="rounded-3xl bg-[#FBFBF8] p-5 border border-[#EBEBE4]">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#74642F]">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#74642F]">Professional Access</p>
                    <div className="flex flex-col gap-0.5 mt-2">
                       <p className="text-sm text-neutral-600">Email: <span className="font-medium text-[#111111]">admin@books.com</span></p>
                       <p className="text-sm text-neutral-600">Key: <span className="font-medium text-[#111111]">admin123</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-center text-sm text-neutral-500">
          Not a member yet? {' '}
          <Link href="#" className="font-bold text-[#111111] hover:underline underline-offset-4">
            Create Premium Account
          </Link>
        </p>
      </div>
    </div>
  );
}
