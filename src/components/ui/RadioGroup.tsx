import React from 'react'
import { cn } from '@/lib/utils'

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  className, 
  children, 
  value,
  onValueChange,
  ...props 
}) => {
  return (
    <div
      className={cn('grid gap-2', className)}
      role="radiogroup"
      {...props}
    >
      {children}
    </div>
  )
}

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ 
  className, 
  value,
  ...props 
}) => {
  return (
    <input
      type="radio"
      value={value}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}