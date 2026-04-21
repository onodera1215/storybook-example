import type { CSSProperties } from 'react';
import { Button } from '../Button/Button';

export interface ArticleBodyProps {
  paragraphs: string[];
  locked?: boolean; // When true, shows a paywall CTA at the end
}

export function ArticleBody({ paragraphs, locked = false }: ArticleBodyProps) {
  const bodyStyle: CSSProperties = {
    fontSize: 15,
    lineHeight: 1.75,
    color: 'var(--color-text)',
    marginBottom: 32,
  };

  const paragraphStyle: CSSProperties = {
    marginBottom: 16,
  };

  const paywallStyle: CSSProperties = {
    marginTop: 24,
    padding: 24,
    background: 'var(--color-bg-subtle)',
    border: '1px dashed var(--color-border)',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center',
  };

  const paywallTitleStyle: CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
  };

  const paywallDescStyle: CSSProperties = {
    fontSize: 14,
    color: 'var(--color-text-muted)',
    marginBottom: 16,
  };

  return (
    <div style={bodyStyle}>
      {paragraphs.map((p, i) => (
        <p key={i} style={paragraphStyle}>
          {p}
        </p>
      ))}
      {locked && (
        <div style={paywallStyle}>
          <div style={paywallTitleStyle}>続きはプレミアム会員限定です</div>
          <div style={paywallDescStyle}>
            プレミアムプランにアップグレードして続きを読む
          </div>
          <Button variant="primary" size="md">
            プレミアムに登録
          </Button>
        </div>
      )}
    </div>
  );
}
