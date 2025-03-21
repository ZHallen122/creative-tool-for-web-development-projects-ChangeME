import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface CallToActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content of the button.
   */
  children: ReactNode;
  /**
   * Optional icon to display left of the button text.
   */
  icon?: ReactNode;
  /**
   * Additional class names for custom styling.
   */
  className?: string;
}

/**
 * CallToActionButton Component
 *
 * This component renders a prominently styled call-to-action button that adheres to the
 * Modern Minimalist theme. It uses Tailwind CSS for styling with inline class names to ensure
 * responsiveness and smooth hover transitions. The primary color (#3498db) is used for the
 * button background with a lighter shade (#5dade2) on hover. The button text is white,
 * and the text uses the "Arial" font as specified by the theme.
 *
 * Usage Example:
 *
 *   import { ArrowRight } from 'lucide-react';
 *
 *   <CallToActionButton icon={<ArrowRight size={16} />}>
 *     Create New Project
 *   </CallToActionButton>
 *
 */
const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  children,
  icon,
  className = '',
  type = 'button',
  ...rest
}) => {
  // Base class names following the Modern Minimalist theme and responsive design principles.
  const baseClasses = [
    'flex',
    'items-center',
    'justify-center',
    // Primary button style: primary color background with white text.
    'bg-[#3498db]',
    'hover:bg-[#5dade2]',
    'transition-colors',
    'duration-300',
    'ease-in-out',
    'text-white',
    // Rounded corners for the button.
    'rounded-md',
    // Height set to 44px (h-11 equals 44px in Tailwind with base 4px scale).
    'h-11',
    // Padding: 12px vertical (py-3) and 24px horizontal (px-6).
    'px-6',
    // Responsive width: full width on mobile (w-full) and auto on small+ screens.
    'w-full',
    'sm:w-auto',
    // Typography: using declared font family for headings as per theme.
    'font-arial',
    // Focus styles for accessibility.
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-[#3498db]'
  ].join(' ');

  return (
    <button type={type} className={`${baseClasses} ${className}`} {...rest}>
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default CallToActionButton;