import type { CSSProperties, ReactNode } from 'react';

export type BadgeColor = 'gray' | 'blue' | 'green' | 'red' | 'yellow';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  color?: BadgeColor;
  size?: BadgeSize;
  children: ReactNode;
}

const colorStyles: Record<BadgeColor, CSSProperties> = {
  gray: { background: '#f3f4f6', color: '#374151' },
  blue: { background: '#dbeafe', color: '#1e40af' },
  green: { background: '#dcfce7', color: '#166534' },
  red: { background: '#fee2e2', color: '#991b1b' },
  yellow: { background: '#fef3c7', color: '#92400e' },
};

const sizeStyles: Record<BadgeSize, CSSProperties> = {
  sm: { padding: '2px 6px', fontSize: 11 },
  md: { padding: '4px 8px', fontSize: 12 },
};

export function Badge({
  color = 'gray',
  size = 'md',
  children,
}: BadgeProps) {
  const style: CSSProperties = {
    ...colorStyles[color],
    ...sizeStyles[size],
    borderRadius: '9999px',
    fontWeight: 500,
    display: 'inline-block',
    fontFamily: 'var(--font-sans)',
    lineHeight: 1.4,
  };

  return <span style={style}>{children}</span>;
}
