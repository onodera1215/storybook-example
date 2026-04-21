import type { CSSProperties, ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'bordered';

export interface CardProps {
  variant?: CardVariant;
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, CSSProperties> = {
  default: {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
  },
  elevated: {
    background: 'var(--color-bg)',
    border: 'none',
    boxShadow: 'var(--shadow-md)',
  },
  bordered: {
    background: 'var(--color-bg-subtle)',
    border: '2px solid var(--color-primary)',
  },
};

export function Card({
  variant = 'default',
  title,
  footer,
  children,
}: CardProps) {
  const cardStyle: CSSProperties = {
    ...variantStyles[variant],
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    maxWidth: 400,
    fontFamily: 'var(--font-sans)',
  };

  const headerStyle: CSSProperties = {
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-border)',
    fontWeight: 600,
    fontSize: 16,
  };

  const bodyStyle: CSSProperties = {
    padding: 16,
    fontSize: 14,
    color: 'var(--color-text)',
    lineHeight: 1.5,
  };

  const footerStyle: CSSProperties = {
    padding: '12px 16px',
    borderTop: '1px solid var(--color-border)',
    background: 'var(--color-bg-subtle)',
  };

  return (
    <div style={cardStyle}>
      {title && <div style={headerStyle}>{title}</div>}
      <div style={bodyStyle}>{children}</div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
}
