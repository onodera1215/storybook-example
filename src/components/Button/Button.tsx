import type { CSSProperties, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: 'var(--color-primary)',
    color: '#ffffff',
    border: '1px solid var(--color-primary)',
  },
  secondary: {
    background: 'var(--color-secondary)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
  },
  danger: {
    background: 'var(--color-danger)',
    color: '#ffffff',
    border: '1px solid var(--color-danger)',
  },
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: { padding: '4px 12px', fontSize: 12 },
  md: { padding: '8px 16px', fontSize: 14 },
  lg: { padding: '12px 24px', fontSize: 16 },
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  children,
}: ButtonProps) {
  const style: CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    fontWeight: 500,
    fontFamily: 'var(--font-sans)',
    width: fullWidth ? '100%' : 'auto',
    transition: 'background 0.15s ease',
  };

  return (
    <button style={style} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
