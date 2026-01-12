import React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-[#222222]">
            {label}
          </label>
        )}
        <textarea
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

Textarea.displayName = 'Textarea';
