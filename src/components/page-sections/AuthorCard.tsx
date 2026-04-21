import type { CSSProperties } from 'react';
import type { Author } from '../../api/articleApi';

export interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const wrapperStyle: CSSProperties = {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    padding: 16,
    background: 'var(--color-bg-subtle)',
    borderRadius: 'var(--radius-md)',
    marginBottom: 32,
  };

  const avatarStyle: CSSProperties = {
    width: 64,
    height: 64,
    borderRadius: '50%',
    objectFit: 'cover',
    flexShrink: 0,
  };

  const nameStyle: CSSProperties = {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 4,
  };

  const bioStyle: CSSProperties = {
    fontSize: 13,
    color: 'var(--color-text-muted)',
    lineHeight: 1.5,
  };

  return (
    <section style={wrapperStyle}>
      <img src={author.avatarUrl} alt={author.name} style={avatarStyle} />
      <div>
        <div style={nameStyle}>{author.name}</div>
        <div style={bioStyle}>{author.bio}</div>
      </div>
    </section>
  );
}
