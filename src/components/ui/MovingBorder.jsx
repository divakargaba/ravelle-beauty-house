import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function MovingBorder({
  children,
  className = '',
  containerClassName = '',
  borderClassName = '',
  as: Component = 'button',
  ...props
}) {
  const btnRef = useRef(null);

  return (
    <Component
      ref={btnRef}
      className={`relative inline-flex overflow-hidden rounded-full p-[2px] ${containerClassName}`}
      {...props}
    >
      <motion.span
        className={`absolute inset-[-100%] ${borderClassName}`}
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0 340deg, #C9A96E 360deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <span
        className={`inline-flex h-full w-full items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium backdrop-blur-3xl ${className}`}
      >
        {children}
      </span>
    </Component>
  );
}
