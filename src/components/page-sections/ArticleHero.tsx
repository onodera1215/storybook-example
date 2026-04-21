import type { CSSProperties } from 'react';

export interface ArticleHeroProps {
  imageUrl: string;
  alt?: string;
}

export function ArticleHero({ imageUrl, alt = '' }: ArticleHeroProps) {
  const wrapperStyle: CSSProperties = {
    width: '100%',
    marginBottom: 24,
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    aspectRatio: '2 / 1',
    background: 'var(--color-bg-subtle)',
  };

  const imgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  return (
    <div style={wrapperStyle}>
      <img src={imageUrl} alt={alt} style={imgStyle} />
    </div>
  );
}
