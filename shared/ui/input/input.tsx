import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-[#222222]">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-[#222222] placeholder:text-neutral-400 transition-all focus:border-[#74642F] focus:outline-none focus:ring-1 focus:ring-[#74642F] disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : ''
          } ${className}`}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
