import type { CSSProperties } from 'react';
import { Card } from '../Card/Card';
import type { RelatedArticle } from '../../api/articleApi';

export interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  const wrapperStyle: CSSProperties = {
    marginBottom: 32,
  };

  const titleStyle: CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 16,
  };

  return (
    <section style={wrapperStyle}>
      <h2 style={titleStyle}>関連記事</h2>
      <div style={gridStyle}>
        {articles.map((a) => (
          <Card key={a.id} variant="default" title={a.title}>
            {a.excerpt}
          </Card>
        ))}
      </div>
    </section>
  );
}
