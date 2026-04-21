import type { CSSProperties } from 'react';
import type { Comment } from '../../api/articleApi';

export interface CommentsSectionProps {
  comments: Comment[];
}

export function CommentsSection({ comments }: CommentsSectionProps) {
  const wrapperStyle: CSSProperties = {
    marginBottom: 32,
  };

  const titleStyle: CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
  };

  const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  };

  const itemStyle: CSSProperties = {
    padding: 12,
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
    fontSize: 13,
  };

  const authorStyle: CSSProperties = {
    fontWeight: 600,
  };

  const dateStyle: CSSProperties = {
    color: 'var(--color-text-muted)',
  };

  const contentStyle: CSSProperties = {
    fontSize: 14,
    lineHeight: 1.5,
  };

  return (
    <section style={wrapperStyle}>
      <h2 style={titleStyle}>コメント ({comments.length})</h2>
      <div style={listStyle}>
        {comments.map((c) => (
          <article key={c.id} style={itemStyle}>
            <div style={headerStyle}>
              <span style={authorStyle}>{c.author}</span>
              <span style={dateStyle}>{c.createdAt}</span>
            </div>
            <div style={contentStyle}>{c.content}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
