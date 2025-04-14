'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'none';
  clickEffect?: 'pulse' | 'ripple' | 'none';
  delay?: number;
  duration?: number;
  initialAnimation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'none';
}

export const AnimatedContainer = React.forwardRef<HTMLDivElement, AnimatedContainerProps>(
  ({ 
    children, 
    className, 
    hoverEffect = 'none', 
    clickEffect = 'none', 
    delay = 0,
    duration = 300,
    initialAnimation = 'none',
    ...props 
  }, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (clickEffect !== 'none') {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
      }
      
      if (props.onClick) {
        props.onClick(e);
      }
    };

    const getHoverClass = () => {
      switch (hoverEffect) {
        case 'lift':
          return 'hover:-translate-y-1 hover:shadow-lg';
        case 'glow':
          return 'hover:shadow-[0_0_15px_rgba(159,126,250,0.5)]';
        case 'scale':
          return 'hover:scale-[1.02]';
        default:
          return '';
      }
    };

    const getClickClass = () => {
      switch (clickEffect) {
        case 'pulse':
          return isClicked ? 'animate-pulse' : '';
        case 'ripple':
          return isClicked ? 'animate-ripple' : '';
        default:
          return '';
      }
    };

    const getInitialAnimationClass = () => {
      switch (initialAnimation) {
        case 'fadeIn':
          return `opacity-0 animate-fadeIn`;
        case 'slideUp':
          return `translate-y-4 opacity-0 animate-slideUp`;
        case 'slideDown':
          return `translate-y-[-1rem] opacity-0 animate-slideDown`;
        case 'slideLeft':
          return `translate-x-4 opacity-0 animate-slideLeft`;
        case 'slideRight':
          return `translate-x-[-1rem] opacity-0 animate-slideRight`;
        default:
          return '';
      }
    };

    const animationStyle = {
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'transition-all duration-300 ease-in-out',
          getHoverClass(),
          getClickClass(),
          getInitialAnimationClass(),
          className
        )}
        onClick={handleClick}
        style={animationStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimatedContainer.displayName = 'AnimatedContainer';
