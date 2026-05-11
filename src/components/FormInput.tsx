import React from 'react';
import { cn } from '@/src/lib/utils';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  onValueChange, 
  className, 
  value, 
  onChange, 
  type,
  required,
  ...props 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value.toUpperCase();
    if (onValueChange) {
      onValueChange(newVal);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase font-bold text-natural-muted tracking-wider">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-sm border border-natural-border bg-white px-3 py-1 text-sm font-mono tracking-tight text-natural-text placeholder:text-[#94a3b8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-natural-accent disabled:cursor-not-allowed disabled:opacity-50 transition-colors uppercase",
          className
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
