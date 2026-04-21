import type { CSSProperties } from 'react';
import { Badge } from '../Badge/Badge';
import type { Tier } from '../../api/articleApi';

export interface ArticleHeaderProps {
  title: string;
  tier: Tier;
  publishedAt: string;
  tags: string[];
}

const tierBadgeColor: Record<Tier, 'gray' | 'blue' | 'yellow'> = {
  free: 'gray',
  premium: 'blue',
  enterprise: 'yellow',
};

const tierLabel: Record<Tier, string> = {
  free: '無料',
  premium: 'プレミアム',
  enterprise: 'エンタープライズ',
};

export function ArticleHeader({
  title,
  tier,
  publishedAt,
  tags,
}: ArticleHeaderProps) {
  const headerStyle: CSSProperties = {
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: 24,
    marginBottom: 24,
  };

  const metaStyle: CSSProperties = {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  };

  const dateStyle: CSSProperties = {
    color: 'var(--color-text-muted)',
    fontSize: 13,
  };

  const titleStyle: CSSProperties = {
    fontSize: 28,
    fontWeight: 700,
    margin: '0 0 16px 0',
    lineHeight: 1.3,
  };

  const tagsStyle: CSSProperties = {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  };

  return (
    <header style={headerStyle}>
      <div style={metaStyle}>
        <Badge color={tierBadgeColor[tier]}>{tierLabel[tier]}</Badge>
        <span style={dateStyle}>公開日: {publishedAt}</span>
      </div>
      <h1 style={titleStyle}>{title}</h1>
      <div style={tagsStyle}>
        {tags.map((tag) => (
          <Badge key={tag} color="gray" size="sm">
            #{tag}
          </Badge>
        ))}
      </div>
    </header>
  );
}
